import Link from "next/link";

import { rueRecits } from "@/data/photos/rue";

type PositionedRecit = {
  slug: string;
  personne: string;
  lat: number;
  lng: number;
  x: number;
  y: number;
};

function formatGps(lat: number, lng: number) {
  return `${lat.toFixed(4)}, ${lng.toFixed(4)}`;
}

function positionRecits(): PositionedRecit[] {
  if (rueRecits.length === 0) {
    return [];
  }

  const latitudes = rueRecits.map(
    (recit) => recit.gps.lat,
  );

  const longitudes = rueRecits.map(
    (recit) => recit.gps.lng,
  );

  const minLat = Math.min(...latitudes);
  const maxLat = Math.max(...latitudes);

  const minLng = Math.min(...longitudes);
  const maxLng = Math.max(...longitudes);

  const latRange = maxLat - minLat;
  const lngRange = maxLng - minLng;

  return rueRecits.map((recit) => {
    const x =
      lngRange === 0
        ? 50
        : 10 +
          ((recit.gps.lng - minLng) / lngRange) * 80;

    const y =
      latRange === 0
        ? 50
        : 90 -
          ((recit.gps.lat - minLat) / latRange) * 80;

    return {
      slug: recit.slug,
      personne: recit.personne,
      lat: recit.gps.lat,
      lng: recit.gps.lng,
      x,
      y,
    };
  });
}

export const metadata = {
  title: "Carte — RUE",
  description:
    "Cartographie des récits de la série Récits Urbains Extérieurs.",
};

export default function RueCartePage() {
  const points = positionRecits();

  return (
    <main className="min-h-screen bg-[#f4f3ef] text-black">
      {/* ================================================= */}
      {/* EN-TÊTE */}
      {/* ================================================= */}

      <section className="border-b border-black">
        <div className="mx-auto max-w-[1600px] px-5 py-8 md:px-10 md:py-10">
          <div className="flex items-start justify-between gap-8">
            <div>
              <p className="mb-3 text-[8px] uppercase tracking-[0.2em] text-black/45">
                RUE / Cartographie
              </p>

              <h1 className="text-3xl font-bold uppercase leading-[0.9] tracking-[-0.06em] md:text-5xl">
                Carte des récits
              </h1>
            </div>

            <Link
              href="/series/rue"
              className="text-[8px] uppercase tracking-[0.17em] text-black/45 transition-opacity duration-300 hover:opacity-50"
            >
              ← Retour RUE
            </Link>
          </div>
        </div>
      </section>

      {/* ================================================= */}
      {/* CARTE ABSTRAITE */}
      {/* ================================================= */}

      <section className="px-4 py-8 md:px-10 md:py-12">
        <div className="mx-auto max-w-[1400px]">
          <div className="mb-3 flex items-center justify-between border-b border-black/20 pb-2 text-[7px] uppercase tracking-[0.18em] text-black/40">
            <span>Coordonnées / Archive</span>

            <span>
              {String(points.length).padStart(2, "0")} points
            </span>
          </div>

          {points.length > 0 ? (
            <div className="relative h-[70svh] min-h-[520px] overflow-hidden border border-black/20">
              {/* REPÈRES TECHNIQUES */}

              <span className="absolute left-3 top-3 text-[7px] uppercase tracking-[0.15em] text-black/25">
                N
              </span>

              <span className="absolute bottom-3 right-3 text-[7px] uppercase tracking-[0.15em] text-black/25">
                RUE / 93
              </span>

              {/* AXES VISUELS TRÈS DISCRETS */}

              <div className="pointer-events-none absolute left-1/2 top-0 h-full border-l border-black/5" />

              <div className="pointer-events-none absolute left-0 top-1/2 w-full border-t border-black/5" />

              {/* POINTS */}

              {points.map((point, index) => (
                <Link
                  key={point.slug}
                  href={`/series/rue/${point.slug}`}
                  className="group absolute -translate-x-1/2 -translate-y-1/2"
                  style={{
                    left: `${point.x}%`,
                    top: `${point.y}%`,
                  }}
                >
                  <div className="relative">
                    <span className="block h-3 w-3 rounded-full bg-[#ff3b18] transition-transform duration-500 group-hover:scale-150" />

                    <div className="absolute left-5 top-1/2 min-w-max -translate-y-1/2">
                      <p className="text-[7px] font-bold uppercase tracking-[0.12em]">
                        {String(index + 1).padStart(
                          2,
                          "0",
                        )}{" "}
                        / {point.personne}
                      </p>

                      <p className="mt-1 text-[7px] tracking-[0.12em] text-black/45">
                        {formatGps(
                          point.lat,
                          point.lng,
                        )}
                      </p>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <div className="flex min-h-[60svh] items-center justify-center border border-black/20">
              <div className="text-center">
                <p className="text-[9px] uppercase tracking-[0.22em] text-black/35">
                  Aucun point disponible
                </p>

                <p className="mt-3 text-[8px] tracking-[0.1em] text-black/30">
                  La carte sera alimentée par les récits publiés.
                </p>
              </div>
            </div>
          )}
        </div>
      </section>
    </main>
  );
}