"use client";

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
import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";

export type ArchivePointKind = "photograph" | "story";
export type ArchiveSeries = "zup" | "lsb" | "rue";

export type RueMapPoint = {
  index: number;
  slug: string;
  people: string[];
  lat: number;
  lng: number;
  kind: ArchivePointKind;
  series: ArchiveSeries;
  href: string;
  previewSrc?: string;
  focalPoint?: string;
};

export type RueMapReferencePoint = {
  lat: number;
  lng: number;
  previewSrc?: string;
  focalPoint?: string;
};

type RueMapProps = {
  points: RueMapPoint[];
  referencePoint: RueMapReferencePoint;
};

const MAP_STYLE_URL = "https://tiles.openfreemap.org/styles/liberty";
const DEFAULT_MAP_ZOOM = 13;
const SEARCH_RESULT_ZOOM = 13.5;
const CONNECTIONS_SOURCE_ID = "dramstars-connections";
const SELECTED_CONNECTION_SOURCE_ID = "dramstars-selected-connection";
const CONNECTIONS_LAYER_ID = "dramstars-connections-line";
const SELECTED_CONNECTION_LAYER_ID = "dramstars-selected-connection-line";

const SERIES_LABELS: Record<ArchiveSeries, string> = {
  zup: "ZUP",
  lsb: "LSB",
  rue: "RUE",
};

setWorkerUrl("/maplibre/maplibre-gl-worker.mjs");

function formatGps(lat: number, lng: number) {
  return `${lat.toFixed(4)}, ${lng.toFixed(4)}`;
}

function getDistanceKm(
  start: RueMapReferencePoint,
  end: Pick<RueMapPoint, "lat" | "lng">,
) {
  const toRadians = (value: number) => (value * Math.PI) / 180;
  const latitudeDelta = toRadians(end.lat - start.lat);
  const longitudeDelta = toRadians(end.lng - start.lng);
  const startLatitude = toRadians(start.lat);
  const endLatitude = toRadians(end.lat);
  const haversine =
    Math.sin(latitudeDelta / 2) ** 2 +
    Math.cos(startLatitude) *
      Math.cos(endLatitude) *
      Math.sin(longitudeDelta / 2) ** 2;

  return 6371.0088 * 2 * Math.asin(Math.sqrt(haversine));
}

function formatDistance(distanceKm: number) {
  if (distanceKm < 1) {
    return `${Math.round(distanceKm * 1000)} m`;
  }

  return `${distanceKm.toLocaleString("fr-FR", {
    minimumFractionDigits: 1,
    maximumFractionDigits: 1,
  })} km`;
}

function createConnectionFeature(
  point: RueMapPoint,
  referencePoint: RueMapReferencePoint,
): Feature<LineString, { pointKey: string }> {
  return {
    type: "Feature",
    properties: { pointKey: `${point.series}-${point.slug}` },
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
    features: points.map((point) =>
      createConnectionFeature(point, referencePoint),
    ),
  };
}

function createSelectedConnectionCollection(
  point: RueMapPoint | null,
  referencePoint: RueMapReferencePoint,
): FeatureCollection<LineString, { pointKey: string }> {
  return {
    type: "FeatureCollection",
    features: point
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

function createPointPopup(
  point: RueMapPoint,
  referencePoint: RueMapReferencePoint,
) {
  const content = document.createElement("div");
  content.className = "rue-map-popup rue-map-popup--with-preview";

  if (point.previewSrc) {
    const preview = document.createElement("div");
    preview.className = "rue-map-popup__preview";
    preview.style.backgroundImage = `url("${point.previewSrc}")`;
    preview.style.backgroundPosition = point.focalPoint ?? "50% 35%";
    preview.setAttribute("aria-hidden", "true");

    const previewLabel = document.createElement("span");
    previewLabel.className = "rue-map-popup__preview-label";
    previewLabel.textContent = `${SERIES_LABELS[point.series]} / ${String(point.index + 1).padStart(2, "0")}`;
    preview.append(previewLabel);
    content.append(preview);
  }

  const body = document.createElement("div");
  body.className = "rue-map-popup__body";

  const eyebrow = document.createElement("p");
  eyebrow.className = "rue-map-popup__eyebrow";
  eyebrow.textContent =
    point.kind === "story"
      ? `Récit / ${SERIES_LABELS[point.series]}`
      : `Photographie / ${SERIES_LABELS[point.series]}`;
  body.append(eyebrow);
  appendPeopleList(body, point.people);

  const coordinates = document.createElement("p");
  coordinates.className = "rue-map-popup__coordinates";
  coordinates.textContent = formatGps(point.lat, point.lng);

  const distance = document.createElement("div");
  distance.className = "rue-map-popup__distance";
  distance.hidden = true;

  const distanceLabel = document.createElement("span");
  distanceLabel.textContent = "Distance depuis zéro";

  const distanceValue = document.createElement("strong");
  distanceValue.textContent = formatDistance(
    getDistanceKm(referencePoint, point),
  );
  distance.append(distanceLabel, distanceValue);

  const link = document.createElement("a");
  link.className = "rue-map-popup__link";
  link.href = point.href;
  link.textContent =
    point.kind === "story" ? "Voir le récit →" : "Voir la photo →";

  body.append(coordinates, distance, link);
  content.append(body);

  return {
    content,
    setSelected(selected: boolean) {
      distance.hidden = !selected;
      content.classList.toggle("is-selected", selected);
    },
  };
}

function createReferencePopup(referencePoint: RueMapReferencePoint) {
  const content = document.createElement("div");
  content.className = "rue-map-popup rue-map-popup--origin";

  if (referencePoint.previewSrc) {
    content.classList.add("rue-map-popup--with-preview");
    const preview = document.createElement("div");
    preview.className = "rue-map-popup__preview";
    preview.style.backgroundImage = `url("${referencePoint.previewSrc}")`;
    preview.style.backgroundPosition = referencePoint.focalPoint ?? "50% 35%";
    preview.setAttribute("aria-hidden", "true");
    content.append(preview);
  }

  const body = document.createElement("div");
  body.className = "rue-map-popup__body";

  const eyebrow = document.createElement("p");
  eyebrow.className = "rue-map-popup__eyebrow";
  eyebrow.textContent = "Point zéro";

  const title = document.createElement("p");
  title.className = "rue-map-popup__title";
  title.textContent = "Point d’origine";

  const coordinates = document.createElement("p");
  coordinates.className =
    "rue-map-popup__coordinates rue-map-popup__coordinates--origin";
  coordinates.textContent = formatGps(
    referencePoint.lat,
    referencePoint.lng,
  );

  body.append(eyebrow, title, coordinates);
  content.append(body);
  return content;
}

function createMarkerElement({
  label,
  title,
  variant,
}: {
  label: string;
  title: string;
  variant: "origin" | ArchivePointKind;
}) {
  const marker = document.createElement("button");
  marker.type = "button";
  marker.className = `rue-map-marker rue-map-marker--${variant}`;
  marker.textContent = label;
  marker.title = title;
  marker.setAttribute("aria-label", title);
  marker.setAttribute("aria-expanded", "false");
  return marker;
}

type MapLayer = ReturnType<MapLibreMap["getStyle"]>["layers"][number];

function getLayerKey(layer: MapLayer) {
  const sourceLayer =
    "source-layer" in layer &&
    typeof layer["source-layer"] === "string"
      ? layer["source-layer"]
      : "";

  return `${layer.id} ${sourceLayer}`.toLowerCase();
}

function applyDramstarsStyle(map: MapLibreMap) {
  const animatedFillLayers: Array<{
    id: string;
    direction: 1 | -1;
  }> = [];
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
        map.setPaintProperty(layer.id, "fill-opacity", 0.78);
        animatedFillLayers.push({ id: layer.id, direction: -1 });
        continue;
      }

      if (isVegetation) {
        map.setPaintProperty(layer.id, "fill-color", "#bfc3b8");
        map.setPaintProperty(layer.id, "fill-opacity", 0.82);
        animatedFillLayers.push({ id: layer.id, direction: 1 });
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

  return animatedFillLayers;
}

function addPopupInteractions(
  markerElement: HTMLElement,
  popup: Popup,
  map: MapLibreMap,
  options: {
    centerOnOpen?: [number, number];
    onPinnedChange?: (pinned: boolean) => void;
  } = {},
) {
  let pinned = false;
  const open = () => {
    if (options.centerOnOpen) {
      map.stop();
      map.jumpTo({ center: options.centerOnOpen });
    }

    popup.addTo(map);
  };
  const setPinned = (nextPinned: boolean) => {
    pinned = nextPinned;
    markerElement.classList.toggle("is-selected", pinned);
    markerElement.setAttribute("aria-expanded", String(pinned));
    options.onPinnedChange?.(pinned);

    if (pinned) {
      open();
    } else {
      popup.remove();
    }
  };
  const toggle = (event: MouseEvent) => {
    event.stopPropagation();
    setPinned(!pinned);
  };

  markerElement.addEventListener("click", toggle);

  return {
    setPinned,
    cleanup() {
      markerElement.removeEventListener("click", toggle);
    },
  };
}

function RueMapCanvas({ points, referencePoint }: RueMapProps) {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const [loadError, setLoadError] = useState(false);
  const [mapReady, setMapReady] = useState(false);

  useEffect(() => {
    const mapContainer = mapContainerRef.current;

    if (!mapContainer) {
      return;
    }

    setLoadError(false);
    setMapReady(false);

    let loaded = false;
    let animationFrame = 0;
    let initialResizeFrame = 0;
    const cleanupPopupInteractions: Array<() => void> = [];
    const markers: Marker[] = [];
    const initialCenter: [number, number] =
      points.length === 1
        ? [points[0].lng, points[0].lat]
        : [referencePoint.lng, referencePoint.lat];
    const map = new MapLibreMap({
      container: mapContainer,
      style: MAP_STYLE_URL,
      center: initialCenter,
      zoom: points.length === 1 ? SEARCH_RESULT_ZOOM : DEFAULT_MAP_ZOOM,
      minZoom: 2,
      attributionControl: { compact: true },
      cooperativeGestures: false,
      scrollZoom: false,
      dragRotate: false,
      pitchWithRotate: false,
      maplibreLogo: true,
    });
    const resizeMap = () => map.resize();
    const resizeObserver = new ResizeObserver(resizeMap);
    let activePointInteraction: ReturnType<
      typeof addPopupInteractions
    > | null = null;
    let selectedPoint: RueMapPoint | null = null;
    const updateSelectedConnection = () => {
      const source = map.getSource(
        SELECTED_CONNECTION_SOURCE_ID,
      ) as GeoJSONSource | undefined;

      source?.setData(
        createSelectedConnectionCollection(
          selectedPoint,
          referencePoint,
        ),
      );
    };

    resizeObserver.observe(mapContainer);
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

    const referenceElement = createMarkerElement({
      label: "O",
      title: `Point d’origine — ${formatGps(referencePoint.lat, referencePoint.lng)}`,
      variant: "origin",
    });
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
    const referenceInteraction = addPopupInteractions(
      referenceElement,
      referencePopup,
      map,
      { centerOnOpen: referenceLngLat },
    );
    cleanupPopupInteractions.push(referenceInteraction.cleanup);

    for (const point of points) {
      const pointLngLat: [number, number] = [point.lng, point.lat];
      const peopleLabel = point.people.join(", ");
      const element = createMarkerElement({
        label: String(point.index + 1).padStart(2, "0"),
        title: `${peopleLabel} — ${formatGps(point.lat, point.lng)}`,
        variant: point.kind,
      });
      const popupCard = createPointPopup(point, referencePoint);
      const popup = new Popup({
        anchor: "bottom",
        closeButton: false,
        closeOnClick: false,
        focusAfterOpen: false,
        offset: 18,
        maxWidth: "280px",
      })
        .setLngLat(pointLngLat)
        .setDOMContent(popupCard.content);
      const marker = new Marker({ element, anchor: "center" })
        .setLngLat(pointLngLat)
        .addTo(map);

      markers.push(marker);
      const pointInteraction = addPopupInteractions(element, popup, map, {
        onPinnedChange(pinned) {
          popupCard.setSelected(pinned);

          if (pinned) {
            if (
              activePointInteraction &&
              activePointInteraction !== pointInteraction
            ) {
              activePointInteraction.setPinned(false);
            }
            activePointInteraction = pointInteraction;
            selectedPoint = point;
          } else if (activePointInteraction === pointInteraction) {
            activePointInteraction = null;
            selectedPoint = null;
          }

          updateSelectedConnection();
        },
      });
      cleanupPopupInteractions.push(pointInteraction.cleanup);
    }

    map.on("load", () => {
      loaded = true;
      map.resize();
      map.jumpTo({
        center: initialCenter,
        zoom:
          points.length === 1 ? SEARCH_RESULT_ZOOM : DEFAULT_MAP_ZOOM,
      });
      const animatedFillLayers = applyDramstarsStyle(map);
      map.addSource(CONNECTIONS_SOURCE_ID, {
        type: "geojson",
        data: createConnectionCollection(points, referencePoint),
      });
      map.addLayer({
        id: CONNECTIONS_LAYER_ID,
        type: "line",
        source: CONNECTIONS_SOURCE_ID,
        layout: {
          "line-cap": "round",
          "line-join": "round",
        },
        paint: {
          "line-color": "#0a0a0a",
          "line-width": 1,
          "line-opacity": 0.28,
          "line-dasharray": [1.2, 2.6],
        },
      });
      map.addSource(SELECTED_CONNECTION_SOURCE_ID, {
        type: "geojson",
        data: createSelectedConnectionCollection(
          selectedPoint,
          referencePoint,
        ),
      });
      map.addLayer({
        id: SELECTED_CONNECTION_LAYER_ID,
        type: "line",
        source: SELECTED_CONNECTION_SOURCE_ID,
        layout: {
          "line-cap": "round",
          "line-join": "round",
        },
        paint: {
          "line-color": "#713126",
          "line-width": 2.6,
          "line-opacity": 0.92,
        },
      });
      const reduceMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)",
      ).matches;
      const hasDesktopViewport = window.matchMedia(
        "(min-width: 768px)",
      ).matches;

      if (
        !reduceMotion &&
        hasDesktopViewport &&
        animatedFillLayers.length > 0
      ) {
        const startedAt = performance.now();
        let lastPaintAt = 0;
        const animate = (time: number) => {
          if (time - lastPaintAt >= 80) {
            lastPaintAt = time;
            const shift = Math.sin((time - startedAt) / 4200) * 0.65;

            for (const layer of animatedFillLayers) {
              if (map.getLayer(layer.id)) {
                map.setPaintProperty(layer.id, "fill-translate", [
                  shift * layer.direction,
                  shift * -layer.direction * 0.45,
                ]);
              }
            }
          }

          animationFrame = window.requestAnimationFrame(animate);
        };

        animationFrame = window.requestAnimationFrame(animate);
      }

      setMapReady(true);
    });

    map.on("error", () => {
      if (!loaded) {
        setLoadError(true);
      }
    });

    return () => {
      if (animationFrame) {
        window.cancelAnimationFrame(animationFrame);
      }
      if (initialResizeFrame) {
        window.cancelAnimationFrame(initialResizeFrame);
      }
      resizeObserver.disconnect();
      window.removeEventListener("resize", resizeMap);
      cleanupPopupInteractions.forEach((cleanup) => cleanup());
      markers.forEach((marker) => marker.remove());
      map.remove();
    };
  }, [points, referencePoint]);

  if (loadError) {
    return (
      <div className="flex h-[62svh] min-h-[520px] items-center justify-center border border-black bg-[#f4f3ef] px-6 text-center lg:h-[72svh] lg:min-h-[650px]">
        <div className="max-w-xl">
          <span className="mx-auto block h-3 w-3 rounded-full border border-black bg-[#f4f3ef]" />
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

  return (
    <div className="rue-maplibre border border-black bg-[#f4f3ef] p-1">
      <div className="flex flex-col gap-2 border-b border-black bg-[#f4f3ef] px-3 py-2 text-[8px] uppercase tracking-[0.1em] sm:flex-row sm:items-center sm:justify-between">
        <span className="flex items-center gap-2 font-bold text-black">
          <span className="h-2.5 w-2.5 shrink-0 rounded-full border-2 border-black bg-[#f4f3ef]" />
          Point d’origine — {formatGps(referencePoint.lat, referencePoint.lng)}
        </span>
        <span className="text-black/45">Bâti / végétal / frontières</span>
      </div>
      <div
        ref={mapContainerRef}
        aria-label={`Carte photographique interactive présentant ${points.length} point${points.length > 1 ? "s" : ""}`}
        className={`relative h-[62svh] min-h-[520px] w-full overflow-visible bg-[#f4f3ef] transition-opacity duration-700 lg:h-[72svh] lg:min-h-[650px] ${
          mapReady ? "opacity-100" : "opacity-0"
        }`}
      />
    </div>
  );
}

export default function RueMap({ points, referencePoint }: RueMapProps) {
  const [activeSeries, setActiveSeries] = useState<
    "all" | ArchiveSeries
  >("all");
  const [query, setQuery] = useState("");

  const seriesCounts = useMemo(() => {
    const counts: Record<ArchiveSeries, number> = { zup: 0, lsb: 0, rue: 0 };

    for (const point of points) {
      counts[point.series] += 1;
    }

    return counts;
  }, [points]);

  const visiblePoints = useMemo(() => {
    const normalizedQuery = query.trim().toLocaleLowerCase("fr");

    return points.filter((point) => {
      const matchesSeries =
        activeSeries === "all" || point.series === activeSeries;
      const matchesQuery =
        normalizedQuery.length === 0 ||
        point.people.some((person) =>
          person.toLocaleLowerCase("fr").includes(normalizedQuery),
        );

      return matchesSeries && matchesQuery;
    });
  }, [activeSeries, points, query]);

  return (
    <div>
      <div className="mb-5 grid gap-3 border-y border-black py-4 lg:grid-cols-[1fr_auto] lg:items-center">
        <div className="flex flex-wrap gap-2" aria-label="Filtres par série">
          <button
            type="button"
            onClick={() => setActiveSeries("all")}
            aria-pressed={activeSeries === "all"}
            className={`border border-black px-3 py-2 text-[8px] font-bold uppercase tracking-[0.14em] transition-colors ${
              activeSeries === "all"
                ? "bg-black text-[#f4f3ef]"
                : "bg-[#f4f3ef] text-black hover:bg-black hover:text-[#f4f3ef]"
            }`}
          >
            Tous
          </button>

          {(Object.keys(SERIES_LABELS) as ArchiveSeries[]).map((series) => {
            const unavailable = seriesCounts[series] === 0;

            return (
              <button
                key={series}
                type="button"
                onClick={() => setActiveSeries(series)}
                disabled={unavailable}
                aria-pressed={activeSeries === series}
                title={unavailable ? "Coordonnées en attente" : undefined}
                className={`border border-black px-3 py-2 text-[8px] font-bold uppercase tracking-[0.14em] transition-colors ${
                  activeSeries === series
                    ? "bg-black text-[#f4f3ef]"
                    : "bg-[#f4f3ef] text-black hover:bg-black hover:text-[#f4f3ef]"
                } disabled:cursor-not-allowed disabled:border-black/20 disabled:text-black/25 disabled:hover:bg-[#f4f3ef] disabled:hover:text-black/25`}
              >
                {SERIES_LABELS[series]}
                {unavailable ? " — à venir" : ""}
              </button>
            );
          })}
        </div>

        <label className="flex min-h-10 items-center border border-black bg-[#f4f3ef] px-3 lg:min-w-[320px]">
          <span className="sr-only">Rechercher une personne</span>
          <span className="mr-3 text-[8px] uppercase tracking-[0.14em] text-black/40">
            Nom
          </span>
          <input
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Rechercher une personne"
            className="min-w-0 flex-1 bg-transparent text-[10px] font-bold uppercase tracking-[0.08em] outline-none placeholder:font-normal placeholder:text-black/30"
          />
        </label>
      </div>

      <RueMapCanvas points={visiblePoints} referencePoint={referencePoint} />

      <div className="mt-10 border-t border-black pt-4">
        <div className="mb-5">
          <div>
            <p className="text-[7px] uppercase tracking-[0.2em] text-black/40">
              Index des personnes
            </p>
            <h2 className="mt-1 text-lg font-bold uppercase tracking-[-0.04em]">
              Personnes visibles
            </h2>
          </div>
        </div>

        {visiblePoints.length > 0 ? (
          <div className="grid border-l border-t border-black/20 sm:grid-cols-2 lg:grid-cols-3">
            {visiblePoints.map((point) => (
              <Link
                key={`${point.series}-${point.slug}`}
                href={point.href}
                className="group/index flex min-h-20 items-center gap-3 border-b border-r border-black/20 px-3 py-3 transition-colors hover:bg-black hover:text-[#f4f3ef]"
              >
                <span
                  className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full border text-[8px] font-bold transition-colors ${
                    point.kind === "story"
                      ? "border-black bg-black text-[#f4f3ef] group-hover/index:border-[#f4f3ef]"
                      : "border-black bg-[#f4f3ef] text-black"
                  }`}
                >
                  {String(point.index + 1).padStart(2, "0")}
                </span>

                <span className="min-w-0">
                  {point.people.map((person) => (
                    <span
                      key={person}
                      className="block truncate text-[10px] font-bold uppercase tracking-[0.06em] transition-colors group-hover/index:text-[#f4f3ef]"
                    >
                      {person}
                    </span>
                  ))}
                  <span className="mt-1 block text-[7px] uppercase tracking-[0.16em] text-black/40 transition-colors group-hover/index:text-white/55">
                    {SERIES_LABELS[point.series]} / {point.kind === "story" ? "Récit" : "Photo"}
                  </span>
                </span>

                <span className="ml-auto transition-all duration-300 group-hover/index:translate-x-1 group-hover/index:text-[#f4f3ef]">
                  →
                </span>
              </Link>
            ))}
          </div>
        ) : (
          <p className="border border-black/20 px-4 py-12 text-center text-[9px] uppercase tracking-[0.16em] text-black/45">
            Aucun point ne correspond à cette recherche.
          </p>
        )}
      </div>
    </div>
  );
}
