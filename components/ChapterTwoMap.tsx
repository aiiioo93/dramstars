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
      maplibreLogo: true,
    });
    const observer = new ResizeObserver(() => map.resize());
    observer.observe(container);
    let loaded = false;
    map.on("load", () => {
      loaded = true;
      applyChapterStyle(map);
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
    <div className="overflow-hidden border border-white/30 bg-[#f4f3ef] text-black shadow-[12px_12px_0_rgba(113,49,38,0.35)]">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-black px-4 py-3 text-[7px] uppercase tracking-[0.18em] md:px-5">
        <span className="font-bold">Cadre géographique / Afrique de l’Ouest</span>
        <span className="border border-black/25 px-2 py-1 text-black/50">
          0 point publié
        </span>
      </div>

      <div className="relative isolate overflow-hidden">
        <div
          ref={containerRef}
          aria-label="Carte du chapitre D’où je viens, sans point photographique publié"
          data-map-ready={status === "ready" ? "true" : "false"}
          className={`h-[42svh] min-h-[340px] max-h-[560px] w-full bg-[#e1d8c8] transition-opacity duration-700 ${status === "ready" ? "opacity-100" : "opacity-35"}`}
        />

        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 z-10 bg-[linear-gradient(rgba(10,10,10,0.045)_1px,transparent_1px),linear-gradient(90deg,rgba(10,10,10,0.045)_1px,transparent_1px)] bg-[size:42px_42px]"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 z-10 shadow-[inset_0_0_90px_rgba(244,243,239,0.72)]"
        />

        <div className="pointer-events-none absolute bottom-5 left-5 z-20 max-w-[270px] border border-black bg-[#f4f3ef]/90 p-4 backdrop-blur-[2px] md:bottom-7 md:left-7">
          <p className="text-[7px] uppercase tracking-[0.18em] text-[#713126]">
            Cartographie en préparation
          </p>
          <p className="mt-2 text-[9px] font-bold uppercase leading-5 tracking-[0.1em]">
            Aucun trajet ni lieu n’est encore publié.
          </p>
        </div>

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

      <div className="grid border-t border-black text-[7px] uppercase leading-5 tracking-[0.14em] sm:grid-cols-3">
        <div className="border-b border-black/20 px-4 py-3 sm:border-b-0 sm:border-r">
          <span className="block text-black/40">Périmètre</span>
          Afrique de l’Ouest
        </div>
        <div className="border-b border-black/20 px-4 py-3 sm:border-b-0 sm:border-r">
          <span className="block text-black/40">Origine du chapitre</span>
          À valider
        </div>
        <div className="px-4 py-3">
          <span className="block text-black/40">Données photographiques</span>
          En attente
        </div>
      </div>
    </div>
  );
}
