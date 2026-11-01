"use client";

import {
  Map as MapLibreMap,
  setWorkerUrl,
} from "maplibre-gl";
import type { StyleSpecification } from "maplibre-gl";
import "maplibre-gl/dist/maplibre-gl.css";
import { useEffect, useRef, useState } from "react";

const MAP_STYLE_URL = "https://tiles.openfreemap.org/styles/liberty";

setWorkerUrl("/maplibre/maplibre-gl-worker.mjs");

function collapseLegalAttribution(container: HTMLElement) {
  const attribution = container.querySelector(".maplibregl-ctrl-attrib");
  attribution?.classList.remove("maplibregl-compact-show");
  attribution?.removeAttribute("open");
}

type MapLayer = StyleSpecification["layers"][number];

function getLayerKey(layer: MapLayer) {
  const sourceLayer =
    "source-layer" in layer && typeof layer["source-layer"] === "string"
      ? layer["source-layer"]
      : "";
  return `${layer.id} ${sourceLayer}`.toLowerCase();
}

function applyChapterStyle(map: MapLibreMap) {
  for (const layer of [...map.getStyle().layers].reverse()) {
    const key = getLayerKey(layer);
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
    if (layer.type === "fill" && isVegetation) {
      map.setPaintProperty(layer.id, "fill-color", "#bec2b5");
      map.setPaintProperty(layer.id, "fill-opacity", 0.72);
      continue;
    }
    if (layer.type === "fill" && isWater) {
      map.setPaintProperty(layer.id, "fill-color", "#dedfd9");
      map.setPaintProperty(layer.id, "fill-opacity", 0.78);
      continue;
    }
    if (layer.type === "fill") {
      map.setPaintProperty(layer.id, "fill-color", "#e1d8c8");
      map.setPaintProperty(layer.id, "fill-opacity", 0.32);
      continue;
    }
    if (layer.type === "line" && isBoundary) {
      map.setPaintProperty(layer.id, "line-color", "#0a0a0a");
      map.setPaintProperty(layer.id, "line-opacity", 0.32);
      map.setPaintProperty(layer.id, "line-width", 0.7);
      continue;
    }
    map.removeLayer(layer.id);
  }
}

export default function ChapterTwoMap() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [status, setStatus] = useState<"loading" | "ready" | "error">(
    "loading",
  );

  useEffect(() => {
    if (!containerRef.current) return;
    const container = containerRef.current;
    const map = new MapLibreMap({
      container,
      style: MAP_STYLE_URL,
      center: [-2.5, 12.5],
      zoom: 3.15,
      attributionControl: { compact: true },
      interactive: false,
      maplibreLogo: false,
    });
    collapseLegalAttribution(container);
    const observer = new ResizeObserver(() => map.resize());
    observer.observe(container);
    let loaded = false;
    map.on("load", () => {
      loaded = true;
      applyChapterStyle(map);
      collapseLegalAttribution(container);
      setStatus("ready");
    });
    map.on("error", () => {
      if (!loaded) setStatus("error");
    });

    return () => {
      observer.disconnect();
      map.remove();
    };
  }, []);

  return (
    <div className="overflow-hidden border border-black bg-white text-black">
      <div className="relative isolate overflow-hidden bg-white">
        <div
          ref={containerRef}
          aria-label="Carte du chapitre D’où je viens, sans point photographique publié"
          data-map-ready={status === "ready" ? "true" : "false"}
          className={`h-[42svh] min-h-[340px] max-h-[560px] w-full bg-white transition-opacity duration-700 ${status === "ready" ? "opacity-100" : "opacity-35"}`}
        />

        {status !== "ready" ? (
          <div className="pointer-events-none absolute inset-0 z-30 flex items-center justify-center px-6 text-center">
            <p className="border border-black bg-[#f4f3ef] px-4 py-3 text-[8px] uppercase tracking-[0.16em]">
              {status === "error"
                ? "Fond cartographique indisponible"
                : "Chargement du cadre géographique"}
            </p>
          </div>
        ) : null}
      </div>

    </div>
  );
}
