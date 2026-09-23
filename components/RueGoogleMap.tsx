"use client";

import {
  importLibrary,
  setOptions,
} from "@googlemaps/js-api-loader";
import { useEffect, useRef, useState } from "react";

export type RueMapPoint = {
  index: number;
  slug: string;
  personne: string;
  lat: number;
  lng: number;
};

type RueGoogleMapProps = {
  apiKey: string;
  mapId?: string;
  points: RueMapPoint[];
};

let configuredApiKey: string | null = null;

function configureLoader(apiKey: string) {
  if (configuredApiKey === apiKey) {
    return;
  }

  setOptions({
    key: apiKey,
    v: "weekly",
    language: "fr",
    region: "FR",
  });
  configuredApiKey = apiKey;
}

function formatGps(lat: number, lng: number) {
  return `${lat.toFixed(4)}, ${lng.toFixed(4)}`;
}

function createInfoContent(point: RueMapPoint) {
  const content = document.createElement("div");
  content.className = "min-w-[190px] px-1 py-1 text-black";

  const title = document.createElement("p");
  title.className =
    "text-[11px] font-bold uppercase tracking-[0.06em]";
  title.textContent = point.personne;

  const coordinates = document.createElement("p");
  coordinates.className =
    "mt-1 text-[9px] tracking-[0.08em] text-black/55";
  coordinates.textContent = formatGps(point.lat, point.lng);

  const link = document.createElement("a");
  link.className =
    "mt-3 inline-flex border border-black bg-[#f4f3ef] px-3 py-2 text-[9px] font-bold uppercase tracking-[0.08em] transition-colors hover:bg-[#713126] hover:text-white";
  link.href = `/series/rue/${point.slug}`;
  link.textContent = "Voir le récit →";

  content.append(title, coordinates, link);
  return content;
}

export default function RueGoogleMap({
  apiKey,
  mapId,
  points,
}: RueGoogleMapProps) {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const [loadError, setLoadError] = useState(false);

  useEffect(() => {
    if (!apiKey || !mapContainerRef.current) {
      return;
    }

    let cancelled = false;
    const markers: google.maps.marker.AdvancedMarkerElement[] = [];

    async function initialiseMap() {
      try {
        configureLoader(apiKey);

        const [mapsLibrary, markerLibrary] = await Promise.all([
          importLibrary(
            "maps",
          ) as Promise<google.maps.MapsLibrary>,
          importLibrary(
            "marker",
          ) as Promise<google.maps.MarkerLibrary>,
        ]);

        if (cancelled || !mapContainerRef.current) {
          return;
        }

        const { InfoWindow, Map } = mapsLibrary;
        const { AdvancedMarkerElement, PinElement } =
          markerLibrary;
        const map = new Map(mapContainerRef.current, {
          center: { lat: 48.92, lng: 2.4 },
          zoom: 10,
          minZoom: 2,
          mapId: mapId || "DEMO_MAP_ID",
          mapTypeId: "roadmap",
          mapTypeControl: true,
          fullscreenControl: true,
          streetViewControl: false,
          zoomControl: true,
          scaleControl: true,
          gestureHandling: "cooperative",
        });
        const bounds = new google.maps.LatLngBounds();
        const infoWindow = new InfoWindow();

        points.forEach((point) => {
          const position = {
            lat: point.lat,
            lng: point.lng,
          };
          const pin = new PinElement({
            background: "#ff3b18",
            borderColor: "#713126",
            glyph: String(point.index + 1).padStart(2, "0"),
            glyphColor: "#f4f3ef",
            scale: 1.08,
          });
          const marker = new AdvancedMarkerElement({
            map,
            position,
            title: `${point.personne} — ${formatGps(point.lat, point.lng)}`,
            content: pin.element,
            gmpClickable: true,
          });

          marker.addListener("click", () => {
            infoWindow.setContent(createInfoContent(point));
            infoWindow.open({
              anchor: marker,
              map,
              shouldFocus: false,
            });
          });

          markers.push(marker);
          bounds.extend(position);
        });

        if (points.length > 0) {
          map.fitBounds(bounds, 56);
        }
      } catch {
        if (!cancelled) {
          setLoadError(true);
        }
      }
    }

    void initialiseMap();

    return () => {
      cancelled = true;
      markers.forEach((marker) => {
        marker.map = null;
      });
    };
  }, [apiKey, mapId, points]);

  if (!apiKey) {
    return (
      <div className="flex h-[62svh] min-h-[520px] items-center justify-center border border-black bg-[#e6e3dc] px-6 text-center lg:h-[72svh] lg:min-h-[650px]">
        <div className="max-w-xl">
          <span className="mx-auto block h-3 w-3 rounded-full bg-[#ff3b18]" />
          <p className="mt-5 text-sm font-bold uppercase tracking-[0.08em]">
            Clé Google Maps requise
          </p>
          <p className="mt-3 text-[10px] leading-5 tracking-[0.06em] text-black/55">
            Ajoutez la variable{" "}
            <code>NEXT_PUBLIC_GOOGLE_MAPS_API_KEY</code>{" "}
            pour afficher la carte interactive et ses {points.length} repères.
          </p>
        </div>
      </div>
    );
  }

  if (loadError) {
    return (
      <div className="flex h-[62svh] min-h-[520px] items-center justify-center border border-black bg-[#e6e3dc] px-6 text-center lg:h-[72svh] lg:min-h-[650px]">
        <div className="max-w-xl">
          <span className="mx-auto block h-3 w-3 rounded-full bg-[#ff3b18]" />
          <p className="mt-5 text-sm font-bold uppercase tracking-[0.08em]">
            Google Maps n’a pas pu se charger
          </p>
          <p className="mt-3 text-[10px] leading-5 tracking-[0.06em] text-black/55">
            Vérifiez la clé API, l’activation de Maps JavaScript API et les domaines autorisés.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div
      ref={mapContainerRef}
      aria-label={`Carte Google Maps interactive présentant ${points.length} récits RUE`}
      className="h-[62svh] min-h-[520px] w-full border border-black bg-[#e6e3dc] lg:h-[72svh] lg:min-h-[650px]"
    />
  );
}
