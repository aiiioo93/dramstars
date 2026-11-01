"use client";

import type { LineLayerSpecification, StyleSpecification } from "maplibre-gl";
import {
  FullscreenControl,
  type GeoJSONSource,
  Map as MapLibreMap,
  Marker,
  NavigationControl,
  Popup,
  ScaleControl,
  setWorkerUrl,
} from "maplibre-gl";
import type { Feature, FeatureCollection, LineString } from "geojson";
import "maplibre-gl/dist/maplibre-gl.css";
import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { formatPhotoDateTime, formatSangTitle } from "@/lib/photo-display";

export type ArchivePointKind = "photograph" | "story" | "umc";
export type ArchiveSeries = "zup" | "lsb" | "rue";

export type RueMapPoint = {
  id: string;
  index: number;
  markerLabel: string;
  sangTitleNumber?: number;
  slug: string;
  people: string[];
  title?: string;
  date?: string;
  time?: string;
  lat: number;
  lng: number;
  kind: ArchivePointKind;
  series?: ArchiveSeries;
  href: string;
  previewSrc?: string;
  focalPoint?: string;
  memberPointIds?: string[];
};

export type RueMapReferencePoint = {
  lat: number;
  lng: number;
};

type RueMapProps = {
  points: RueMapPoint[];
  referencePoint: RueMapReferencePoint;
  initialSeries?: "all" | ArchiveSeries;
};

const MAP_STYLE_URL = "https://tiles.openfreemap.org/styles/liberty";
const DEFAULT_MAP_ZOOM = 13;
const CONNECTIONS_SOURCE_ID = "dramstars-connections";
const SELECTED_CONNECTION_SOURCE_ID = "dramstars-selected-connection";
const CONNECTIONS_LAYER_ID = "dramstars-connections-line";
const SELECTED_CONNECTION_LAYER_ID = "dramstars-selected-connection-line";
const POPUP_EDGE_PADDING = 18;
const MOBILE_SWIPE_THRESHOLD = 52;

const SERIES_LABELS: Record<ArchiveSeries, string> = {
  zup: "ZUP",
  lsb: "LSB",
  rue: "RUE",
};

setWorkerUrl("/maplibre/maplibre-gl-worker.mjs");

function formatGps(lat: number, lng: number) {
  return `${lat.toFixed(4)}, ${lng.toFixed(4)}`;
}

function collapseLegalAttribution(container: HTMLElement) {
  const attribution = container.querySelector(".maplibregl-ctrl-attrib");
  attribution?.classList.remove("maplibregl-compact-show");
  attribution?.removeAttribute("open");
}

function getPointSeriesLabel(point: RueMapPoint) {
  return point.series ? SERIES_LABELS[point.series] : "UMC";
}

function createConnectionFeature(
  point: RueMapPoint,
  referencePoint: RueMapReferencePoint,
): Feature<LineString, { pointKey: string }> {
  return {
    type: "Feature",
    properties: { pointKey: point.id },
    geometry: {
      type: "LineString",
      coordinates: [
        [referencePoint.lng, referencePoint.lat],
        [point.lng, point.lat],
      ],
    },
  };
}

function createConnectionCollection(
  points: RueMapPoint[],
  referencePoint: RueMapReferencePoint,
): FeatureCollection<LineString, { pointKey: string }> {
  return {
    type: "FeatureCollection",
    features: points
      .filter((point) => point.kind !== "umc")
      .map((point) => createConnectionFeature(point, referencePoint)),
  };
}

function createSelectedConnectionCollection(
  point: RueMapPoint | null,
  referencePoint: RueMapReferencePoint,
): FeatureCollection<LineString, { pointKey: string }> {
  return {
    type: "FeatureCollection",
    features:
      point && point.kind !== "umc"
        ? [createConnectionFeature(point, referencePoint)]
        : [],
  };
}

function appendPeopleList(content: HTMLElement, people: string[]) {
  const peopleList = document.createElement("div");
  peopleList.className = "rue-map-popup__people";

  for (const person of people.slice(0, 4)) {
    const name = document.createElement("p");
    name.className = "rue-map-popup__title";
    name.textContent = person;
    peopleList.append(name);
  }

  if (people.length > 4) {
    const more = document.createElement("p");
    more.className = "rue-map-popup__more";
    more.textContent = `+${people.length - 4}`;
    peopleList.append(more);
  }

  content.append(peopleList);
}

function appendDateTime(content: HTMLElement, point: RueMapPoint) {
  const value = formatPhotoDateTime(point.date, point.time);
  if (!value) return;
  const date = document.createElement("p");
  date.className = "rue-map-popup__datetime";
  date.textContent = value;
  content.append(date);
}

function createPreviewPopup(point: RueMapPoint) {
  const content = document.createElement("div");
  content.className = "rue-map-popup rue-map-popup--preview";

  if (point.previewSrc) {
    const preview = document.createElement("div");
    preview.className = "rue-map-popup__preview";
    preview.style.backgroundImage = `url("${point.previewSrc}")`;
    preview.style.backgroundPosition = point.focalPoint ?? "50% 35%";
    preview.setAttribute("aria-hidden", "true");
    content.append(preview);
  }

  const body = document.createElement("div");
  body.className = "rue-map-popup__body";
  if (point.kind === "story") {
    appendPeopleList(body, point.people);
  } else if (point.kind === "umc" && point.title) {
    const title = document.createElement("p");
    title.className = "rue-map-popup__title";
    title.textContent = point.title;
    body.append(title);
  } else {
    const eyebrow = document.createElement("p");
    eyebrow.className = "rue-map-popup__eyebrow";
    eyebrow.textContent = `Photographie / ${getPointSeriesLabel(point)}`;
    body.append(eyebrow);
  }
  appendDateTime(body, point);
  content.append(body);
  return content;
}

function createFullPopup(
  point: RueMapPoint,
) {
  const content = document.createElement("div");
  content.className = `rue-map-popup rue-map-popup--full rue-map-popup--${point.kind}`;
  const body = document.createElement("div");
  body.className = "rue-map-popup__body rue-map-popup__body--photographic";

  if (point.previewSrc) {
    body.style.setProperty("--rue-popup-image", `url("${point.previewSrc}")`);
    body.style.setProperty(
      "--rue-popup-position",
      point.focalPoint ?? "50% 35%",
    );
  }

  const eyebrow = document.createElement("p");
  eyebrow.className = "rue-map-popup__eyebrow";
  eyebrow.textContent =
    point.kind === "story"
      ? `Récit / ${getPointSeriesLabel(point)}`
      : point.kind === "umc"
        ? "UMC / Unité de mémoire collective"
        : `Photographie / ${getPointSeriesLabel(point)}`;
  body.append(eyebrow);

  if (point.kind === "story") {
    appendPeopleList(body, point.people);
  } else if (point.kind === "umc" && point.title) {
    const title = document.createElement("p");
    title.className = "rue-map-popup__title";
    title.textContent = point.title;
    body.append(title);
  }
  appendDateTime(body, point);

  if (point.kind !== "photograph") {
    const coordinates = document.createElement("p");
    coordinates.className = "rue-map-popup__coordinates";
    coordinates.textContent = formatGps(point.lat, point.lng);
    body.append(coordinates);
  }

  const link = document.createElement("a");
  link.className = "rue-map-popup__link";
  link.href = point.href;
  link.textContent =
    point.kind === "story"
      ? "Voir le récit →"
      : point.kind === "umc"
        ? "Ouvrir l’album →"
        : "Voir la photo →";
  body.append(link);
  content.append(body);
  return content;
}

function createReferencePopup(referencePoint: RueMapReferencePoint) {
  const content = document.createElement("div");
  content.className = "rue-map-popup rue-map-popup--origin";
  const body = document.createElement("div");
  body.className = "rue-map-popup__body";
  const eyebrow = document.createElement("p");
  eyebrow.className = "rue-map-popup__eyebrow";
  eyebrow.textContent = "Point d’origine";
  const coordinates = document.createElement("p");
  coordinates.className =
    "rue-map-popup__coordinates rue-map-popup__coordinates--origin";
  coordinates.textContent = formatGps(referencePoint.lat, referencePoint.lng);
  body.append(eyebrow, coordinates);
  content.append(body);
  return content;
}

function getMarkerAccessibleLabel(point: RueMapPoint) {
  if (point.kind === "story") {
    return `${point.people.join(", ")} — ${formatGps(point.lat, point.lng)}`;
  }
  if (point.kind === "umc") {
    return `${point.title ?? "UMC"} — Unité de mémoire collective`;
  }
  return `${point.sangTitleNumber ? formatSangTitle(point.sangTitleNumber) : `Photographie ${getPointSeriesLabel(point)}`} — ${formatPhotoDateTime(point.date, point.time) || "date inconnue"}`;
}

function createMarkerElement(point: RueMapPoint) {
  const marker = document.createElement("button");
  const title = getMarkerAccessibleLabel(point);
  marker.type = "button";
  marker.className = `rue-map-marker rue-map-marker--${point.kind} rue-map-marker--series-${point.series ?? "umc"}`;
  marker.textContent = "";
  marker.title = title;
  marker.setAttribute("aria-label", title);
  marker.setAttribute("aria-expanded", "false");
  return marker;
}

type MapLayer = StyleSpecification["layers"][number];

function getLayerKey(layer: MapLayer) {
  const sourceLayer =
    "source-layer" in layer && typeof layer["source-layer"] === "string"
      ? layer["source-layer"]
      : "";
  return `${layer.id} ${sourceLayer}`.toLowerCase();
}

function applyDramstarsStyle(map: MapLibreMap) {
  const vegetationBoundaries: LineLayerSpecification[] = [];
  const layers = [...map.getStyle().layers].reverse();

  for (const layer of layers) {
    const key = getLayerKey(layer);
    const isBuilding = key.includes("building");
    const isVegetation =
      /park|wood|forest|grass|vegetation|landcover|scrub|green|nature|farmland|meadow/.test(
        key,
      );
    const isBoundary = /boundary|admin/.test(key);
    const isWater = /water/.test(key);

    if (layer.type === "background") {
      map.setPaintProperty(layer.id, "background-color", "#f4f3ef");
      continue;
    }
    if (layer.type === "fill") {
      if (isBuilding) {
        map.setPaintProperty(layer.id, "fill-color", "#c9c6bd");
        map.setPaintProperty(layer.id, "fill-opacity", 0.76);
        continue;
      }
      if (isVegetation) {
        map.setPaintProperty(layer.id, "fill-color", "#c1c4ba");
        map.setPaintProperty(layer.id, "fill-opacity", 0.78);
        if (typeof layer.source === "string") {
          const boundary: LineLayerSpecification = {
            id: `dramstars-material-boundary-${vegetationBoundaries.length}`,
            type: "line",
            source: layer.source,
            paint: {
              "line-color": "#713126",
              "line-opacity": 0.2,
              "line-width": 0.75,
            },
          };
          if (layer["source-layer"]) boundary["source-layer"] = layer["source-layer"];
          if (layer.filter) boundary.filter = layer.filter;
          if (layer.minzoom !== undefined) boundary.minzoom = layer.minzoom;
          if (layer.maxzoom !== undefined) boundary.maxzoom = layer.maxzoom;
          vegetationBoundaries.push(boundary);
        }
        continue;
      }
      if (isWater) {
        map.setPaintProperty(layer.id, "fill-color", "#e4e3dd");
        map.setPaintProperty(layer.id, "fill-opacity", 0.65);
        continue;
      }
      map.removeLayer(layer.id);
      continue;
    }
    if (layer.type === "line" && isBoundary) {
      map.setPaintProperty(layer.id, "line-color", "#0a0a0a");
      map.setPaintProperty(layer.id, "line-opacity", 0.22);
      map.setPaintProperty(layer.id, "line-width", 0.7);
      continue;
    }
    map.removeLayer(layer.id);
  }

  const boundaryIds: string[] = [];
  for (const boundary of vegetationBoundaries) {
    try {
      map.addLayer(boundary);
      boundaryIds.push(boundary.id);
    } catch {
      // Une source de style peut ne pas être disponible à ce zoom.
    }
  }
  return boundaryIds;
}

function keepPopupInsideMap(map: MapLibreMap, popup: Popup) {
  window.requestAnimationFrame(() => {
    const popupRect = popup.getElement().getBoundingClientRect();
    const mapRect = map.getContainer().getBoundingClientRect();
    let horizontalOffset = 0;
    let verticalOffset = 0;

    if (popupRect.left < mapRect.left + POPUP_EDGE_PADDING) {
      horizontalOffset = popupRect.left - mapRect.left - POPUP_EDGE_PADDING;
    } else if (popupRect.right > mapRect.right - POPUP_EDGE_PADDING) {
      horizontalOffset = popupRect.right - mapRect.right + POPUP_EDGE_PADDING;
    }
    if (popupRect.top < mapRect.top + POPUP_EDGE_PADDING) {
      verticalOffset = popupRect.top - mapRect.top - POPUP_EDGE_PADDING;
    } else if (popupRect.bottom > mapRect.bottom - POPUP_EDGE_PADDING) {
      verticalOffset = popupRect.bottom - mapRect.bottom + POPUP_EDGE_PADDING;
    }
    if (horizontalOffset || verticalOffset) {
      map.panBy([horizontalOffset, verticalOffset], { duration: 320 });
    }
  });
}

type PointInteraction = {
  setPinned: (pinned: boolean) => void;
  cleanup: () => void;
};

function addPointInteractions({
  markerElement,
  previewPopup,
  fullPopup,
  map,
  touchInterface,
  onPinnedChange,
}: {
  markerElement: HTMLElement;
  previewPopup: Popup;
  fullPopup: Popup;
  map: MapLibreMap;
  touchInterface: boolean;
  onPinnedChange: (pinned: boolean) => void;
}): PointInteraction {
  let pinned = false;
  const setPinned = (nextPinned: boolean) => {
    pinned = nextPinned;
    previewPopup.remove();
    markerElement.classList.toggle("is-selected", pinned);
    markerElement.setAttribute("aria-expanded", String(pinned));
    onPinnedChange(pinned);
    if (touchInterface) {
      fullPopup.remove();
    } else if (pinned) {
      fullPopup.addTo(map);
      keepPopupInsideMap(map, fullPopup);
    } else {
      fullPopup.remove();
    }
  };
  const toggle = (event: MouseEvent) => {
    event.stopPropagation();
    setPinned(!pinned);
  };
  const handleKeyDown = (event: KeyboardEvent) => {
    if (event.key === "Escape" && pinned) {
      event.stopPropagation();
      setPinned(false);
    }
  };

  markerElement.addEventListener("click", toggle);
  markerElement.addEventListener("keydown", handleKeyDown);
  return {
    setPinned,
    cleanup() {
      markerElement.removeEventListener("click", toggle);
      markerElement.removeEventListener("keydown", handleKeyDown);
    },
  };
}

function MobilePointPanel({
  point,
  onClose,
  onPrevious,
  onNext,
}: {
  point: RueMapPoint;
  onClose: () => void;
  onPrevious: () => void;
  onNext: () => void;
}) {
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const touchStartX = useRef<number | null>(null);
  useEffect(() => {
    closeButtonRef.current?.focus({ preventScroll: true });
  }, [point.id]);

  return (
    <aside
      role="dialog"
      aria-modal="false"
      aria-label={getMarkerAccessibleLabel(point)}
      className="rue-map-mobile-panel fixed inset-x-0 bottom-0 z-[80] border-t border-black bg-[#f4f3ef] shadow-[0_-12px_40px_rgba(0,0,0,0.22)]"
      onTouchStart={(event) => {
        touchStartX.current = event.touches[0]?.clientX ?? null;
      }}
      onTouchEnd={(event) => {
        if (touchStartX.current === null) return;
        const delta =
          (event.changedTouches[0]?.clientX ?? touchStartX.current) -
          touchStartX.current;
        touchStartX.current = null;
        if (delta > MOBILE_SWIPE_THRESHOLD) onPrevious();
        else if (delta < -MOBILE_SWIPE_THRESHOLD) onNext();
      }}
    >
      <div className="mx-auto h-1 w-12 translate-y-2 rounded-full bg-black/20" />
      <div className="mx-auto max-w-2xl px-4 pb-[max(14px,env(safe-area-inset-bottom))] pt-5">
        <div className="grid grid-cols-[112px_1fr] gap-4">
          <div className="relative aspect-[3/2] self-start overflow-hidden border border-black bg-black">
            {point.previewSrc ? (
              <Image
                src={point.previewSrc}
                alt=""
                fill
                sizes="112px"
                className="object-cover"
                style={{ objectPosition: point.focalPoint ?? "50% 35%" }}
              />
            ) : null}
          </div>
          <div className="min-w-0">
            <div className="flex items-start justify-between gap-3">
              <p className="text-[7px] font-bold uppercase tracking-[0.16em] text-black/45">
                {point.kind === "story"
                  ? `Récit / ${getPointSeriesLabel(point)}`
                  : point.kind === "umc"
                    ? "UMC / Unité de mémoire collective"
                    : `Photographie / ${getPointSeriesLabel(point)}`}
              </p>
              <button
                ref={closeButtonRef}
                type="button"
                onClick={onClose}
                className="-mt-1 flex h-8 w-8 shrink-0 items-center justify-center border border-black text-sm focus-visible:bg-black focus-visible:text-white"
                aria-label="Fermer la fiche"
              >
                ×
              </button>
            </div>
            {point.kind === "story" ? (
              <div className="mt-2 max-h-14 overflow-y-auto text-[11px] font-bold uppercase tracking-[0.06em]">
                {point.people.map((person) => (
                  <p key={person}>{person}</p>
                ))}
              </div>
            ) : point.kind === "umc" ? (
              <p className="mt-2 text-[11px] font-bold uppercase tracking-[0.06em]">
                {point.title}
              </p>
            ) : null}
            {formatPhotoDateTime(point.date, point.time) ? (
              <p className="mt-2 text-[9px] uppercase tracking-[0.12em] text-black/60">
                {formatPhotoDateTime(point.date, point.time)}
              </p>
            ) : null}
          </div>
        </div>
        <div className="mt-4 grid grid-cols-[42px_1fr_42px] gap-2">
          <button
            type="button"
            onClick={onPrevious}
            className="border border-black text-sm"
            aria-label="Point précédent"
          >
            ←
          </button>
          <Link
            href={point.href}
            className="border border-black bg-black px-3 py-3 text-center text-[8px] font-bold uppercase tracking-[0.14em] !text-[#f4f3ef]"
          >
            {point.kind === "story"
              ? "Voir le récit"
              : point.kind === "umc"
                ? "Ouvrir l’album"
                : "Voir la photo"}
          </Link>
          <button
            type="button"
            onClick={onNext}
            className="border border-black text-sm"
            aria-label="Point suivant"
          >
            →
          </button>
        </div>
      </div>
    </aside>
  );
}

function RueMapCanvas({
  points,
  referencePoint,
  focusedUmc,
  onUmcSelect,
}: RueMapProps & {
  focusedUmc?: RueMapPoint | null;
  onUmcSelect?: (point: RueMapPoint) => void;
}) {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<MapLibreMap | null>(null);
  const interactionByPointIdRef = useRef(new Map<string, PointInteraction>());
  const [loadError, setLoadError] = useState(false);
  const [mapReady, setMapReady] = useState(false);
  const [mobileSelectedId, setMobileSelectedId] = useState<string | null>(null);
  const mobileSelectedIndex = points.findIndex(
    (point) => point.id === mobileSelectedId,
  );
  const mobileSelectedPoint =
    mobileSelectedIndex >= 0 ? points[mobileSelectedIndex] : null;

  useEffect(() => {
    const mapContainer = mapContainerRef.current;
    if (!mapContainer) return;
    const interactionByPointId = interactionByPointIdRef.current;
    setLoadError(false);
    setMapReady(false);
    setMobileSelectedId(null);
    interactionByPointId.clear();

    let loaded = false;
    let boundaryAnimationFrame = 0;
    let initialResizeFrame = 0;
    let mapIsVisible = true;
    let lastPaintAt = 0;
    const cleanupInteractions: Array<() => void> = [];
    const markers: Marker[] = [];
    const map = new MapLibreMap({
      container: mapContainer,
      style: MAP_STYLE_URL,
      center: [referencePoint.lng, referencePoint.lat],
      zoom: DEFAULT_MAP_ZOOM,
      minZoom: 2,
      attributionControl: { compact: true },
      cooperativeGestures: false,
      scrollZoom: false,
      dragRotate: false,
      pitchWithRotate: false,
      maplibreLogo: false,
    });
    mapRef.current = map;
    collapseLegalAttribution(mapContainer);
    const touchInterface = window.matchMedia(
      "(hover: none), (pointer: coarse)",
    ).matches;
    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    const resizeMap = () => map.resize();
    const resizeObserver = new ResizeObserver(resizeMap);
    const visibilityObserver = new IntersectionObserver(
      ([entry]) => {
        mapIsVisible = entry?.isIntersecting ?? false;
      },
      { threshold: 0.05 },
    );
    let activeInteraction: PointInteraction | null = null;
    let selectedPoint: RueMapPoint | null = null;
    const updateSelectedConnection = () => {
      const source = map.getSource(
        SELECTED_CONNECTION_SOURCE_ID,
      ) as GeoJSONSource | undefined;
      source?.setData(
        createSelectedConnectionCollection(selectedPoint, referencePoint),
      );
    };

    resizeObserver.observe(mapContainer);
    visibilityObserver.observe(mapContainer);
    window.addEventListener("resize", resizeMap);
    initialResizeFrame = window.requestAnimationFrame(resizeMap);
    map.addControl(
      new NavigationControl({ showCompass: false, showZoom: true }),
      "top-right",
    );
    map.addControl(new FullscreenControl(), "top-right");
    map.addControl(
      new ScaleControl({ maxWidth: 90, unit: "metric" }),
      "bottom-right",
    );

    const referenceLngLat: [number, number] = [
      referencePoint.lng,
      referencePoint.lat,
    ];
    const referenceElement = document.createElement("button");
    referenceElement.type = "button";
    referenceElement.className = "rue-map-marker rue-map-marker--origin";
    referenceElement.textContent = "O";
    referenceElement.setAttribute(
      "aria-label",
      `Point d’origine — ${formatGps(referencePoint.lat, referencePoint.lng)}`,
    );
    referenceElement.setAttribute("aria-expanded", "false");
    const referencePopup = new Popup({
      anchor: "bottom",
      closeButton: false,
      closeOnClick: false,
      focusAfterOpen: false,
      offset: 28,
      maxWidth: "260px",
    })
      .setLngLat(referenceLngLat)
      .setDOMContent(createReferencePopup(referencePoint));
    const referenceMarker = new Marker({
      element: referenceElement,
      anchor: "center",
    })
      .setLngLat(referenceLngLat)
      .addTo(map);
    markers.push(referenceMarker);

    let referenceOpen = false;
    const toggleReference = (event: MouseEvent) => {
      event.stopPropagation();
      referenceOpen = !referenceOpen;
      referenceElement.classList.toggle("is-selected", referenceOpen);
      referenceElement.setAttribute("aria-expanded", String(referenceOpen));
      if (referenceOpen) {
        referencePopup.addTo(map);
        keepPopupInsideMap(map, referencePopup);
      } else referencePopup.remove();
    };
    referenceElement.addEventListener("click", toggleReference);
    cleanupInteractions.push(() =>
      referenceElement.removeEventListener("click", toggleReference),
    );

    for (const point of points) {
      const pointLngLat: [number, number] = [point.lng, point.lat];
      const element = createMarkerElement(point);
      const previewPopup = new Popup({
        className: "rue-map-preview-shell",
        anchor: "bottom",
        closeButton: false,
        closeOnClick: false,
        focusAfterOpen: false,
        offset: 18,
        maxWidth: "230px",
      })
        .setLngLat(pointLngLat)
        .setDOMContent(createPreviewPopup(point));
      const fullPopup = new Popup({
        anchor: "bottom",
        closeButton: false,
        closeOnClick: false,
        focusAfterOpen: false,
        offset: 18,
        maxWidth: "290px",
      })
        .setLngLat(pointLngLat)
        .setDOMContent(createFullPopup(point));
      const marker = new Marker({ element, anchor: "center" })
        .setLngLat(pointLngLat)
        .addTo(map);
      markers.push(marker);

      const interaction = addPointInteractions({
        markerElement: element,
        previewPopup,
        fullPopup,
        map,
        touchInterface,
        onPinnedChange(pinned) {
          if (pinned) {
            if (activeInteraction && activeInteraction !== interaction) {
              activeInteraction.setPinned(false);
            }
            activeInteraction = interaction;
            selectedPoint = point;
            if (point.kind === "umc") onUmcSelect?.(point);
            if (touchInterface) setMobileSelectedId(point.id);
          } else if (activeInteraction === interaction) {
            activeInteraction = null;
            selectedPoint = null;
            if (touchInterface) setMobileSelectedId(null);
          }
          updateSelectedConnection();
        },
      });
      interactionByPointId.set(point.id, interaction);
      cleanupInteractions.push(interaction.cleanup);
    }

    const closeActive = () => {
      activeInteraction?.setPinned(false);
      if (referenceOpen) {
        referenceOpen = false;
        referenceElement.classList.remove("is-selected");
        referenceElement.setAttribute("aria-expanded", "false");
        referencePopup.remove();
      }
    };
    map.on("click", closeActive);

    map.on("load", () => {
      loaded = true;
      map.resize();
      map.jumpTo({
        center: [referencePoint.lng, referencePoint.lat],
        zoom: DEFAULT_MAP_ZOOM,
      });
      collapseLegalAttribution(mapContainer);
      const boundaryLayerIds = applyDramstarsStyle(map);
      map.addSource(CONNECTIONS_SOURCE_ID, {
        type: "geojson",
        data: createConnectionCollection(points, referencePoint),
      });
      map.addLayer({
        id: CONNECTIONS_LAYER_ID,
        type: "line",
        source: CONNECTIONS_SOURCE_ID,
        layout: { "line-cap": "round", "line-join": "round" },
        paint: {
          "line-color": "#0a0a0a",
          "line-width": 1,
          "line-opacity": 0.24,
          "line-dasharray": [1.2, 2.6],
        },
      });
      map.addSource(SELECTED_CONNECTION_SOURCE_ID, {
        type: "geojson",
        data: createSelectedConnectionCollection(null, referencePoint),
      });
      map.addLayer({
        id: SELECTED_CONNECTION_LAYER_ID,
        type: "line",
        source: SELECTED_CONNECTION_SOURCE_ID,
        layout: { "line-cap": "round", "line-join": "round" },
        paint: {
          "line-color": "#713126",
          "line-width": 2.6,
          "line-opacity": 0.92,
        },
      });

      if (!reduceMotion && boundaryLayerIds.length) {
        const startedAt = performance.now();
        const animateBoundaries = (time: number) => {
          if (mapIsVisible && !document.hidden && time - lastPaintAt >= 120) {
            lastPaintAt = time;
            const shift = Math.sin((time - startedAt) / 900) * 2.2;
            for (const layerId of boundaryLayerIds) {
              if (map.getLayer(layerId)) {
                map.setPaintProperty(layerId, "line-translate", [
                  shift,
                  shift * -0.35,
                ]);
              }
            }
          }
          boundaryAnimationFrame =
            window.requestAnimationFrame(animateBoundaries);
        };
        boundaryAnimationFrame =
          window.requestAnimationFrame(animateBoundaries);
      }
      setMapReady(true);
    });
    map.on("error", () => {
      if (!loaded) setLoadError(true);
    });

    return () => {
      if (boundaryAnimationFrame) {
        window.cancelAnimationFrame(boundaryAnimationFrame);
      }
      if (initialResizeFrame) window.cancelAnimationFrame(initialResizeFrame);
      resizeObserver.disconnect();
      visibilityObserver.disconnect();
      window.removeEventListener("resize", resizeMap);
      cleanupInteractions.forEach((cleanup) => cleanup());
      interactionByPointId.clear();
      markers.forEach((marker) => marker.remove());
      map.remove();
      mapRef.current = null;
    };
  }, [points, referencePoint, onUmcSelect]);

  useEffect(() => {
    if (!focusedUmc) return;
    mapRef.current?.flyTo({
      center: [focusedUmc.lng, focusedUmc.lat],
      zoom: 16,
      duration: 700,
      essential: true,
    });
  }, [focusedUmc]);

  const selectRelativeMobilePoint = (direction: -1 | 1) => {
    if (!points.length) return;
    const current = mobileSelectedIndex >= 0 ? mobileSelectedIndex : 0;
    const next = (current + direction + points.length) % points.length;
    interactionByPointIdRef.current.get(points[next].id)?.setPinned(true);
  };

  const closeMobileSelection = () => {
    if (!mobileSelectedId) return;
    interactionByPointIdRef.current.get(mobileSelectedId)?.setPinned(false);
  };

  if (loadError) {
    return (
      <div className="flex h-[62svh] min-h-[520px] items-center justify-center border border-black bg-[#f4f3ef] px-6 text-center lg:h-[72svh] lg:min-h-[650px]">
        <div className="max-w-xl">
          <span className="mx-auto block h-3 w-3 rounded-full border-2 border-black bg-[#f4f3ef]" />
          <p className="mt-5 text-sm font-bold uppercase tracking-[0.08em]">
            La carte n’a pas pu se charger
          </p>
          <p className="mt-3 text-[10px] leading-5 tracking-[0.06em] text-black/55">
            Vérifiez votre connexion internet puis rechargez la page.
          </p>
        </div>
      </div>
    );
  }

  const mapPointCount = points.filter(
    (point) => point.kind !== "umc",
  ).length;
  return (
    <>
      <div className="rue-maplibre border border-black bg-[#f4f3ef] p-1">
        <div data-map-header className="relative z-40 grid gap-2 border-b border-black bg-[#f4f3ef] px-3 py-2 text-[8px] uppercase tracking-[0.1em] sm:grid-cols-2 sm:items-center">
          <span className="flex items-center gap-2 font-bold text-black">
            <span className="h-2.5 w-2.5 shrink-0 rounded-full border-2 border-black bg-[#f4f3ef]" />
            Point d’origine — {formatGps(referencePoint.lat, referencePoint.lng)}
          </span>
          <span className="text-black/50 sm:text-right">
            {mapPointCount} départs depuis le point d’origine
          </span>
        </div>
        <div
          ref={mapContainerRef}
          data-map-ready={mapReady ? "true" : "false"}
          aria-label={`PsychoKarta interactive présentant ${mapPointCount} points et une UMC`}
          className={`relative z-0 h-[62svh] min-h-[520px] w-full overflow-hidden bg-[#f4f3ef] transition-opacity duration-700 [contain:paint] [isolation:isolate] lg:h-[72svh] lg:min-h-[650px] ${
            mapReady ? "opacity-100" : "opacity-0"
          }`}
        />
      </div>
      {mobileSelectedPoint
        ? createPortal(
            <MobilePointPanel
              point={mobileSelectedPoint}
              onClose={closeMobileSelection}
              onPrevious={() => selectRelativeMobilePoint(-1)}
              onNext={() => selectRelativeMobilePoint(1)}
            />,
            document.body,
          )
        : null}
    </>
  );
}

export default function RueMap({
  points,
  referencePoint,
  initialSeries = "all",
}: RueMapProps) {
  const [activeSeries, setActiveSeries] = useState<"all" | ArchiveSeries>(
    initialSeries,
  );
  const [query, setQuery] = useState("");
  const [umcMenuOpen, setUmcMenuOpen] = useState(false);
  const [selectedUmcId, setSelectedUmcId] = useState<string | null>(null);
  const umcPoints = useMemo(() => points.filter((point) => point.kind === "umc"), [points]);
  const selectedUmc = umcPoints.find((point) => point.id === selectedUmcId) ?? null;
  const visiblePoints = useMemo(() => {
    if (selectedUmc) {
      const members = new Set(selectedUmc.memberPointIds ?? []);
      return points.filter((point) => point.kind === "umc" || members.has(point.id));
    }
    const normalizedQuery = query.trim().toLocaleLowerCase("fr");
    return points.filter((point) => {
      if (point.kind === "umc") return true;
      if (activeSeries !== "all" && point.series !== activeSeries) return false;
      if (
        activeSeries === "rue" &&
        normalizedQuery.length > 0 &&
        !point.people.some((person) =>
          person.toLocaleLowerCase("fr").includes(normalizedQuery),
        )
      ) {
        return false;
      }
      return true;
    });
  }, [activeSeries, points, query, selectedUmc]);

  const setSeries = (series: ArchiveSeries) => {
    setSelectedUmcId(null);
    setUmcMenuOpen(false);
    setActiveSeries((current) => (current === series ? "all" : series));
    if (series !== "rue") setQuery("");
  };

  const selectUmc = useCallback((point: RueMapPoint) => {
    setActiveSeries("all");
    setQuery("");
    setSelectedUmcId(point.id);
    setUmcMenuOpen(false);
  }, []);

  const resetView = () => {
    setSelectedUmcId(null);
    setActiveSeries("all");
  };

  return (
    <div>
      <div className="mb-5 grid gap-3 border-y border-black py-4 lg:grid-cols-[1fr_auto] lg:items-center">
        <div className="flex flex-wrap gap-2" aria-label="Filtres par série">
          {(Object.keys(SERIES_LABELS) as ArchiveSeries[]).map((series) => (
            <button
              key={series}
              type="button"
              onClick={() => setSeries(series)}
              aria-pressed={activeSeries === series}
              className={`border border-black px-3 py-2 text-[8px] font-bold uppercase tracking-[0.14em] transition-colors ${
                activeSeries === series
                  ? "bg-black text-[#f4f3ef]"
                  : "bg-[#f4f3ef] text-black hover:bg-black hover:text-[#f4f3ef]"
              }`}
            >
              {SERIES_LABELS[series]}
            </button>
          ))}
          <div className="relative">
            <button type="button" aria-expanded={umcMenuOpen} aria-controls="umc-list" onClick={() => setUmcMenuOpen((open) => !open)} className={`border border-black px-3 py-2 text-[8px] font-bold uppercase tracking-[0.14em] transition-colors ${selectedUmc ? "bg-[#963a2c] text-white" : "bg-[#f4f3ef] text-black hover:bg-[#963a2c] hover:text-white"}`}>UMC</button>
            {umcMenuOpen ? (
              <div id="umc-list" className="absolute left-0 top-full z-40 mt-1 max-h-56 min-w-[260px] overflow-y-auto border border-black bg-[#f4f3ef] p-2 shadow-[6px_6px_0_rgba(0,0,0,.18)]">
                {umcPoints.map((point) => <button key={point.id} type="button" onClick={() => selectUmc(point)} className="block w-full border-b border-black/20 px-3 py-3 text-left text-[9px] font-bold uppercase tracking-[0.08em] last:border-b-0 hover:bg-[#963a2c] hover:text-white focus-visible:bg-[#963a2c] focus-visible:text-white">{point.title}</button>)}
              </div>
            ) : null}
          </div>
        </div>
        <label className="flex min-h-10 items-center border border-black bg-[#f4f3ef] px-3 lg:min-w-[320px]">
          <span className="mr-3 text-[8px] uppercase tracking-[0.14em] text-black/40">
            RUE
          </span>
          <input
            type="search"
            value={query}
            disabled={activeSeries !== "rue"}
            onChange={(event) => setQuery(event.target.value)}
            placeholder={
              activeSeries === "rue"
                ? "Rechercher un blase"
                : "Choisir le filtre RUE"
            }
            aria-label="Rechercher un blase dans la série RUE"
            className="min-w-0 flex-1 bg-transparent text-[10px] font-bold uppercase tracking-[0.08em] outline-none placeholder:font-normal placeholder:text-black/30 disabled:cursor-not-allowed disabled:opacity-45"
          />
        </label>
      </div>

      <div className="mb-3 flex flex-wrap gap-x-5 gap-y-2 text-[7px] uppercase tracking-[0.14em] text-black/55">
        <span className="flex items-center gap-2">
          <span className="h-3 w-3 rounded-full border border-black bg-black" /> ZUP
        </span>
        <span className="flex items-center gap-2">
          <span className="h-3 w-3 rounded-full border border-black bg-[#65345f]" /> LSB
        </span>
        <span className="flex items-center gap-2">
          <span className="h-3 w-3 border border-black bg-[#ad681f]" /> RUE
        </span>
        <span className="flex items-center gap-2"><span className="h-3 w-3 rotate-45 border border-black bg-[#963a2c]" /> UMC</span>
      </div>

      <div className="relative">
        {selectedUmc ? <div className="pointer-events-none absolute inset-x-3 top-16 z-20 break-words text-[clamp(2.2rem,10vw,8rem)] font-bold uppercase leading-[0.78] tracking-[-0.07em] text-[#963a2c]/90">{selectedUmc.title}</div> : null}
        {selectedUmc ? <button type="button" onClick={resetView} className="absolute bottom-5 left-5 z-30 border border-black bg-[#f4f3ef] px-4 py-3 text-[8px] font-bold uppercase tracking-[0.14em] hover:bg-black hover:text-white">← Vue générale</button> : null}
        <RueMapCanvas points={visiblePoints} referencePoint={referencePoint} focusedUmc={selectedUmc} onUmcSelect={selectUmc} />
      </div>
    </div>
  );
}
