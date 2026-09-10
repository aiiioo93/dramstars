import Link from "next/link";

import { rueRecits } from "@/data/photos/rue";

type IndexedRecit = {
  index: number;
  recit: (typeof rueRecits)[number];
};

type PositionedRecit = {
  index: number;
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

function positionRecits(
  entries: IndexedRecit[],
  padding = 9,
): PositionedRecit[] {
  if (entries.length === 0) {
    return [];
  }

  const latitudes = entries.map(
    ({ recit }) => recit.gps.lat,
  );
  const longitudes = entries.map(
    ({ recit }) => recit.gps.lng,
  );

  const minLat = Math.min(...latitudes);
  const maxLat = Math.max(...latitudes);
  const minLng = Math.min(...longitudes);
  const maxLng = Math.max(...longitudes);
  const latRange = maxLat - minLat;
  const lngRange = maxLng - minLng;
  const usableArea = 100 - padding * 2;

  return entries.map(({ recit, index }) => ({
    index,
    slug: recit.slug,
    personne: recit.personne,
    lat: recit.gps.lat,
    lng: recit.gps.lng,
    x:
      lngRange === 0
        ? 50
        : padding +
          ((recit.gps.lng - minLng) / lngRange) *
            usableArea,
    y:
      latRange === 0
        ? 50
        : 100 -
          padding -
          ((recit.gps.lat - minLat) / latRange) *
            usableArea,
  }));
}

function AbstractTerritory({
  burgundy = false,
}: {
  burgundy?: boolean;
}) {
  const line = burgundy
    ? "rgb(244 243 239 / 8%)"
    : "rgb(10 10 10 / 6%)";

  return (
    <>
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage: `linear-gradient(to right, ${line} 1px, transparent 1px), linear-gradient(to bottom, ${line} 1px, transparent 1px)`,
          backgroundSize: "44px 44px",
        }}
      />

      <svg
        aria-hidden="true"
        viewBox="0 0 900 700"
        preserveAspectRatio="none"
        className="pointer-events-none absolute inset-0 h-full w-full"
      >
        <path
          d="M-55 180C90 71 237 105 344 183C467 272 568 212 680 115C775 32 885 68 955 151"
          fill="none"
          stroke={burgundy ? "#f4f3ef" : "#713126"}
          strokeWidth="1.2"
          opacity={burgundy ? "0.16" : "0.2"}
        />
        <path
          d="M-30 535C96 408 219 430 327 505C440 585 552 574 646 466C754 342 870 376 944 468"
          fill="none"
          stroke={burgundy ? "#f4f3ef" : "#713126"}
          strokeWidth="1"
          opacity={burgundy ? "0.12" : "0.16"}
        />
        <path
          d="M150 745C197 597 302 506 455 446C615 383 689 263 718-54"
          fill="none"
          stroke="#ff3b18"
          strokeDasharray="3 12"
          strokeWidth="1"
          opacity="0.3"
        />
        <path
          d="M184 235C244 170 350 158 419 205C491 254 493 351 431 413C364 480 243 463 184 388C143 336 143 280 184 235Z"
          fill={burgundy ? "#f4f3ef" : "#713126"}
          opacity={burgundy ? "0.025" : "0.045"}
        />
      </svg>
    </>
  );
}

function MapPoint({
  point,
  inverted = false,
}: {
  point: PositionedRecit;
  inverted?: boolean;
}) {
  const horizontal =
    point.x > 62 ? "right-7" : "left-7";
  const vertical =
    point.y > 76
      ? "bottom-0"
      : "top-1/2 -translate-y-1/2";

  return (
    <Link
      href={`/series/rue/${point.slug}`}
      aria-label={`${point.personne} — ${formatGps(point.lat, point.lng)}`}
      className="group absolute z-10 -translate-x-1/2 -translate-y-1/2 rounded-full outline-none hover:z-30 focus-visible:z-30"
      style={{
        left: `${point.x}%`,
        top: `${point.y}%`,
      }}
    >
      <span
        className={`relative flex h-7 w-7 items-center justify-center rounded-full border text-[7px] font-bold transition-all duration-300 group-hover:scale-125 group-focus-visible:scale-125 ${
          inverted
            ? "border-[#f4f3ef]/60 bg-[#ff3b18] text-black"
            : "border-black/60 bg-[#f4f3ef] text-black"
        }`}
      >
        <span className="absolute inset-[3px] rounded-full border border-[#ff3b18]" />
        {String(point.index + 1).padStart(2, "0")}
      </span>

      <span
        className={`pointer-events-none invisible absolute ${horizontal} ${vertical} w-max max-w-[210px] border border-black bg-[#f4f3ef] px-3 py-2 text-black opacity-0 shadow-[5px_5px_0_rgba(0,0,0,0.16)] transition-all duration-200 group-hover:visible group-hover:opacity-100 group-focus-visible:visible group-focus-visible:opacity-100`}
      >
        <span className="block text-[9px] font-bold uppercase tracking-[0.08em]">
          {point.personne}
        </span>
        <span className="mt-1 block text-[8px] tracking-[0.08em] text-black/55">
          {formatGps(point.lat, point.lng)}
        </span>
      </span>
    </Link>
  );
}

export const metadata = {
  title: "Carte psychogéographique — RUE",
  description:
    "Représentation psychogéographique des récits de la série Récits Urbains Extérieurs.",
};

export default function RueCartePage() {
  const indexedRecits = rueRecits.map((recit, index) => ({
    recit,
    index,
  }));
  const points = positionRecits(indexedRecits);
  const denseEntries = indexedRecits.filter(
    ({ recit }) =>
      recit.gps.lat > 48.94 && recit.gps.lng > 2.49,
  );
  const densePoints = positionRecits(denseEntries, 13);

  return (
    <main className="min-h-screen bg-[#f4f3ef] text-black">
      <section className="border-b border-black">
        <div className="mx-auto max-w-[1600px] px-5 py-8 md:px-10 md:py-10">
          <div className="flex items-start justify-between gap-8">
            <div>
              <p className="mb-3 text-[8px] uppercase tracking-[0.2em] text-black/45">
                RUE / Dérive / 35 MM
              </p>

              <h1 className="max-w-4xl text-3xl font-bold uppercase leading-[0.9] tracking-[-0.06em] md:text-5xl">
                Carte psychogéographique
              </h1>
            </div>

            <Link
              href="/series/rue"
              className="group/return shrink-0 border border-black px-3 py-2 text-[8px] uppercase tracking-[0.17em] text-black transition-colors hover:bg-black"
            >
              <span className="transition-colors group-hover/return:text-white">
                ← Retour RUE
              </span>
            </Link>
          </div>

          <div className="mt-8 grid gap-5 border-t border-black/20 pt-4 text-[8px] leading-5 tracking-[0.08em] text-black/55 md:grid-cols-[1fr_280px]">
            <p className="max-w-2xl">
              Une lecture sensible du territoire à partir des lieux choisis par les personnes photographiées. Les positions suivent les coordonnées réelles ; les formes indiquent une dérive, pas des routes.
            </p>

            <div className="flex items-center gap-3 md:justify-end">
              <span className="relative flex h-3 w-3 items-center justify-center">
                <span className="absolute h-full w-full rounded-full border border-[#ff3b18] motion-safe:animate-ping" />
                <span className="h-[6px] w-[6px] rounded-full bg-[#ff3b18]" />
              </span>
              <span className="font-bold uppercase tracking-[0.16em] text-black">
                {String(points.length).padStart(2, "0")} récits situés
              </span>
            </div>
          </div>
        </div>
      </section>

      <section className="px-4 py-8 md:px-10 md:py-12">
        <div className="mx-auto max-w-[1500px]">
          {points.length > 0 ? (
            <>
              <div className="grid gap-4 lg:grid-cols-[minmax(0,1.45fr)_minmax(330px,0.55fr)]">
                <div>
                  <div className="mb-2 flex items-end justify-between border-b border-black/20 pb-2">
                    <div>
                      <p className="text-[7px] uppercase tracking-[0.2em] text-black/40">
                        Planche 01 / Territoire étendu
                      </p>
                      <p className="mt-1 text-xs font-bold uppercase tracking-[0.08em]">
                        Distances relatives
                      </p>
                    </div>
                    <span className="text-[7px] uppercase tracking-[0.18em] text-black/40">
                      Nord ↑
                    </span>
                  </div>

                  <div
                    className="relative h-[62svh] min-h-[520px] overflow-hidden border border-black/30 bg-[#f4f3ef] lg:h-[70svh] lg:min-h-[620px]"
                    style={{
                      backgroundImage:
                        "radial-gradient(circle at 76% 18%, rgb(113 49 38 / 11%), transparent 24%), radial-gradient(circle at 28% 72%, rgb(255 59 24 / 6%), transparent 30%)",
                    }}
                  >
                    <AbstractTerritory />

                    <span className="absolute left-3 top-3 text-[8px] font-bold uppercase tracking-[0.18em]">
                      N
                    </span>
                    <span className="absolute bottom-3 left-3 text-[7px] uppercase tracking-[0.18em] text-black/35">
                      O / Ouest
                    </span>
                    <span className="absolute bottom-3 right-3 text-[7px] uppercase tracking-[0.18em] text-black/35">
                      Est / E
                    </span>

                    <div className="pointer-events-none absolute right-[7%] top-[7%] h-[18%] w-[18%] border border-dashed border-[#713126]/35 bg-[#713126]/[0.03]">
                      <span className="absolute -top-5 right-0 text-[6px] uppercase tracking-[0.16em] text-[#713126]">
                        Zone dense / détail 02
                      </span>
                    </div>

                    {points.map((point) => (
                      <MapPoint
                        key={point.slug}
                        point={point}
                      />
                    ))}

                    <span className="pointer-events-none absolute bottom-7 right-5 text-[11vw] font-bold uppercase leading-none tracking-[-0.1em] text-black/[0.025]">
                      RUE
                    </span>
                  </div>
                </div>

                <div>
                  <div className="mb-2 flex items-end justify-between border-b border-black/20 pb-2">
                    <div>
                      <p className="text-[7px] uppercase tracking-[0.2em] text-black/40">
                        Planche 02 / Agrandissement
                      </p>
                      <p className="mt-1 text-xs font-bold uppercase tracking-[0.08em]">
                        Zone dense — Sevran
                      </p>
                    </div>
                    <span className="text-[7px] uppercase tracking-[0.18em] text-black/40">
                      × Focus
                    </span>
                  </div>

                  <div
                    className="relative h-[520px] overflow-hidden border border-black bg-[#713126] text-[#f4f3ef] lg:h-[70svh] lg:min-h-[620px]"
                    style={{
                      backgroundImage:
                        "radial-gradient(circle at 70% 20%, rgb(255 59 24 / 12%), transparent 24%)",
                    }}
                  >
                    <AbstractTerritory burgundy />

                    <span className="absolute left-3 top-3 text-[8px] font-bold uppercase tracking-[0.18em]">
                      N
                    </span>
                    <span className="absolute bottom-3 right-3 text-[7px] uppercase tracking-[0.18em] text-white/45">
                      Échelle locale / {densePoints.length} récits
                    </span>

                    {densePoints.map((point) => (
                      <MapPoint
                        key={point.slug}
                        point={point}
                        inverted
                      />
                    ))}
                  </div>
                </div>
              </div>

              <div className="mt-10 border-t border-black pt-4">
                <div className="mb-5 flex items-center justify-between">
                  <div>
                    <p className="text-[7px] uppercase tracking-[0.2em] text-black/40">
                      Index de localisation
                    </p>
                    <h2 className="mt-1 text-lg font-bold uppercase tracking-[-0.04em]">
                      17 points / 17 récits
                    </h2>
                  </div>
                  <span className="hidden text-[7px] uppercase tracking-[0.18em] text-black/40 sm:block">
                    Toucher un point pour ouvrir le récit
                  </span>
                </div>

                <div className="grid border-l border-t border-black/20 sm:grid-cols-2 lg:grid-cols-3">
                  {points.map((point) => (
                    <Link
                      key={point.slug}
                      href={`/series/rue/${point.slug}`}
                      className="group/index flex min-h-20 items-center gap-3 border-b border-r border-black/20 px-3 py-3 transition-colors hover:bg-black"
                    >
                      <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-[#ff3b18] text-[8px] font-bold text-black transition-colors group-hover/index:bg-[#ff3b18] group-hover/index:text-white">
                        {String(point.index + 1).padStart(2, "0")}
                      </span>

                      <span className="min-w-0">
                        <span className="block truncate text-[10px] font-bold uppercase tracking-[0.06em] text-black transition-colors group-hover/index:text-white">
                          {point.personne}
                        </span>
                        <span className="mt-1 block text-[8px] tracking-[0.08em] text-black/45 transition-colors group-hover/index:text-white/65">
                          {formatGps(point.lat, point.lng)}
                        </span>
                      </span>

                      <span className="ml-auto text-black transition-all duration-300 group-hover/index:translate-x-1 group-hover/index:text-white">
                        →
                      </span>
                    </Link>
                  ))}
                </div>
              </div>
            </>
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
