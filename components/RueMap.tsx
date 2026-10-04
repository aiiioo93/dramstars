"use client";

import type { FeatureCollection, LineString } from "geojson";
import {
  FullscreenControl,
  LngLatBounds,
  Map as MapLibreMap,
  Marker,
  NavigationControl,
  Popup,
  ScaleControl,
  setWorkerUrl,
} from "maplibre-gl";
import "maplibre-gl/dist/maplibre-gl.css";
import { useEffect, useRef, useState } from "react";

export type RueMapPoint = {
  index: number;
  slug: string;
  personne: string;
  lat: number;
  lng: number;
};

export type RueMapReferencePoint = {
  address: string;
  lat: number;
  lng: number;
};

type RueMapProps = {
  points: RueMapPoint[];
  referencePoint: RueMapReferencePoint;
};

const MAP_STYLE_URL =
  "https://tiles.openfreemap.org/styles/liberty";

setWorkerUrl("/maplibre/maplibre-gl-worker.mjs");

function formatGps(lat: number, lng: number) {
  return `${lat.toFixed(4)}, ${lng.toFixed(4)}`;
}

function createStoryPopup(point: RueMapPoint) {
  const content = document.createElement("div");
  content.className = "rue-map-popup";

  const title = document.createElement("p");
  title.className = "rue-map-popup__title";
  title.textContent = point.personne;

  const coordinates = document.createElement("p");
  coordinates.className = "rue-map-popup__coordinates";
  coordinates.textContent = formatGps(point.lat, point.lng);

  const link = document.createElement("a");
  link.className = "rue-map-popup__link";
  link.href = `/series/rue/${point.slug}`;
  link.textContent = "Voir le récit →";

  content.append(title, coordinates, link);
  return content;
}

function createReferencePopup(
  referencePoint: RueMapReferencePoint,
) {
  const content = document.createElement("div");
  content.className = "rue-map-popup";

  const eyebrow = document.createElement("p");
  eyebrow.className = "rue-map-popup__eyebrow";
  eyebrow.textContent = "Point de repère principal";

  const address = document.createElement("p");
  address.className = "rue-map-popup__title";
  address.textContent = referencePoint.address;

  const coordinates = document.createElement("p");
  coordinates.className = "rue-map-popup__coordinates";
  coordinates.textContent = formatGps(
    referencePoint.lat,
    referencePoint.lng,
  );

  content.append(eyebrow, address, coordinates);
  return content;
}

function createMarkerElement({
  label,
  title,
  variant,
}: {
  label: string;
  title: string;
  variant: "reference" | "story";
}) {
  const marker = document.createElement("button");
  marker.type = "button";
  marker.className = `rue-map-marker rue-map-marker--${variant}`;
  marker.textContent = label;
  marker.title = title;
  marker.setAttribute("aria-label", title);
  return marker;
}

function applyDramstarsStyle(map: MapLibreMap) {
  for (const layer of map.getStyle().layers) {
    const id = layer.id.toLowerCase();

    if (layer.type === "background") {
      map.setPaintProperty(layer.id, "background-color", "#e8e3d9");
    }

    if (layer.type === "fill") {
      if (id.includes("water")) {
        map.setPaintProperty(layer.id, "fill-color", "#cbd2d0");
      } else if (
        id.includes("park") ||
        id.includes("landcover") ||
        id.includes("wood")
      ) {
        map.setPaintProperty(layer.id, "fill-color", "#d6ddd2");
      } else if (id.includes("building")) {
        map.setPaintProperty(layer.id, "fill-color", "#ddd9cf");
        map.setPaintProperty(layer.id, "fill-opacity", 0.72);
      }
    }

    if (layer.type === "line") {
      if (id.includes("motorway") || id.includes("trunk")) {
        map.setPaintProperty(layer.id, "line-color", "#a98c84");
      } else if (id.includes("road") || id.includes("street")) {
        map.setPaintProperty(layer.id, "line-color", "#c8beb7");
      }
    }

    if (layer.type === "symbol") {
      map.setPaintProperty(layer.id, "text-color", "#403936");
      map.setPaintProperty(layer.id, "text-halo-color", "#f4f3ef");
      map.setPaintProperty(layer.id, "text-halo-width", 1.5);
      map.setPaintProperty(layer.id, "icon-opacity", 0.58);
    }
  }
}

function addHoverPopup(
  markerElement: HTMLElement,
  popup: Popup,
  map: MapLibreMap,
) {
  const open = () => popup.addTo(map);
  const close = () => popup.remove();

  markerElement.addEventListener("mouseenter", open);
  markerElement.addEventListener("mouseleave", close);
  markerElement.addEventListener("focus", open);
  markerElement.addEventListener("blur", close);

  return () => {
    markerElement.removeEventListener("mouseenter", open);
    markerElement.removeEventListener("mouseleave", close);
    markerElement.removeEventListener("focus", open);
    markerElement.removeEventListener("blur", close);
  };
}

export default function RueMap({
  points,
  referencePoint,
}: RueMapProps) {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const [loadError, setLoadError] = useState(false);

  useEffect(() => {
    if (!mapContainerRef.current) {
      return;
    }

    let loaded = false;
    const cleanupHoverListeners: Array<() => void> = [];
    const markers: Marker[] = [];
    const map = new MapLibreMap({
      container: mapContainerRef.current,
      style: MAP_STYLE_URL,
      center: [referencePoint.lng, referencePoint.lat],
      zoom: 10,
      minZoom: 2,
      attributionControl: { compact: true },
      cooperativeGestures: true,
      dragRotate: false,
      pitchWithRotate: false,
      maplibreLogo: true,
    });

    map.addControl(
      new NavigationControl({
        showCompass: false,
        showZoom: true,
      }),
      "top-right",
    );
    map.addControl(new FullscreenControl(), "top-right");
    map.addControl(
      new ScaleControl({ maxWidth: 90, unit: "metric" }),
      "bottom-right",
    );

    const bounds = new LngLatBounds();
    const referenceLngLat: [number, number] = [
      referencePoint.lng,
      referencePoint.lat,
    ];
    bounds.extend(referenceLngLat);

    const referenceElement = createMarkerElement({
      label: "RUE",
      title: `Point de repère principal — ${referencePoint.address}`,
      variant: "reference",
    });
    const referencePopup = new Popup({
      closeButton: false,
      closeOnClick: true,
      offset: 24,
    })
      .setLngLat(referenceLngLat)
      .setDOMContent(createReferencePopup(referencePoint));
    const referenceMarker = new Marker({
      element: referenceElement,
      anchor: "center",
    })
      .setLngLat(referenceLngLat)
      .setPopup(referencePopup)
      .addTo(map);

    markers.push(referenceMarker);
    cleanupHoverListeners.push(
      addHoverPopup(referenceElement, referencePopup, map),
    );

    for (const point of points) {
      const pointLngLat: [number, number] = [point.lng, point.lat];
      const element = createMarkerElement({
        label: String(point.index + 1).padStart(2, "0"),
        title: `${point.personne} — ${formatGps(point.lat, point.lng)}`,
        variant: "story",
      });
      const popup = new Popup({
        closeButton: false,
        closeOnClick: true,
        offset: 18,
      })
        .setLngLat(pointLngLat)
        .setDOMContent(createStoryPopup(point));
      const marker = new Marker({ element, anchor: "center" })
        .setLngLat(pointLngLat)
        .setPopup(popup)
        .addTo(map);

      markers.push(marker);
      cleanupHoverListeners.push(addHoverPopup(element, popup, map));
      bounds.extend(pointLngLat);
    }

    const connections: FeatureCollection<LineString> = {
      type: "FeatureCollection",
      features: points.map((point) => ({
        type: "Feature",
        properties: { slug: point.slug },
        geometry: {
          type: "LineString",
          coordinates: [
            referenceLngLat,
            [point.lng, point.lat],
          ],
        },
      })),
    };

    map.on("load", () => {
      loaded = true;
      applyDramstarsStyle(map);
      map.addSource("rue-connections", {
        type: "geojson",
        data: connections,
      });
      map.addLayer({
        id: "rue-connections",
        type: "line",
        source: "rue-connections",
        layout: {
          "line-cap": "round",
          "line-join": "round",
        },
        paint: {
          "line-color": "#713126",
          "line-opacity": 0.78,
          "line-width": [
            "interpolate",
            ["linear"],
            ["zoom"],
            6,
            1,
            13,
            2.4,
          ],
        },
      });

      map.fitBounds(bounds, {
        padding: { top: 56, right: 56, bottom: 56, left: 56 },
        maxZoom: 12,
        duration: 0,
      });
    });

    map.on("error", () => {
      if (!loaded) {
        setLoadError(true);
      }
    });

    return () => {
      cleanupHoverListeners.forEach((cleanup) => cleanup());
      markers.forEach((marker) => marker.remove());
      map.remove();
    };
  }, [points, referencePoint]);

  if (loadError) {
    return (
      <div className="flex h-[62svh] min-h-[520px] items-center justify-center border border-black bg-[#e6e3dc] px-6 text-center lg:h-[72svh] lg:min-h-[650px]">
        <div className="max-w-xl">
          <span className="mx-auto block h-3 w-3 rounded-full bg-[#ff3b18]" />
          <p className="mt-5 text-sm font-bold uppercase tracking-[0.08em]">
            La carte MapLibre n’a pas pu se charger
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
          <span className="h-2.5 w-2.5 shrink-0 rounded-full bg-[#2563eb] ring-1 ring-black/20" />
          Point principal — {referencePoint.address}
        </span>
        <span className="flex items-center gap-2 text-black/55">
          <span className="h-px w-7 bg-[#713126]" />
          {points.length} liaisons territoriales
        </span>
      </div>
      <div
        ref={mapContainerRef}
        aria-label={`Carte MapLibre interactive présentant ${points.length} récits RUE`}
        className="h-[62svh] min-h-[520px] w-full bg-[#e8e3d9] lg:h-[72svh] lg:min-h-[650px]"
      />
    </div>
  );
}
