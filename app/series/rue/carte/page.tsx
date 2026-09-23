import Link from "next/link";

import RueGoogleMap, {
  type RueMapPoint,
} from "@/components/RueGoogleMap";
import { rueRecits } from "@/data/photos/rue";

function formatGps(lat: number, lng: number) {
  return `${lat.toFixed(4)}, ${lng.toFixed(4)}`;
}

export const metadata = {
  title: "Carte psychogéographique — RUE",
  description:
    "Carte interactive des récits de la série Récits Urbains Extérieurs.",
};

export default function RueCartePage() {
  const points: RueMapPoint[] = rueRecits.map(
    (recit, index) => ({
      index,
      slug: recit.slug,
      personne: recit.personne,
      lat: recit.gps.lat,
      lng: recit.gps.lng,
    }),
  );

  return (
    <main className="min-h-screen bg-[#f4f3ef] text-black">
      <section className="border-b border-black">
        <div className="mx-auto max-w-[1600px] px-5 py-8 md:px-10 md:py-10">
          <div className="flex flex-col items-start gap-5 lg:flex-row lg:justify-between lg:gap-8">
            <div>
              <p className="mb-3 text-[8px] uppercase tracking-[0.2em] text-black/45">
                RUE / Territoire / 35 MM
              </p>

              <h1 className="max-w-4xl text-[22px] font-bold uppercase leading-[0.9] tracking-[-0.06em] sm:text-3xl md:text-4xl lg:text-5xl">
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
              Les lieux choisis par les personnes photographiées sont positionnés sur une carte réelle. Zoomez, dézoomez et déplacez-vous librement pour situer chaque récit dans son territoire.
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
          <div className="mb-2 flex items-end justify-between border-b border-black/20 pb-2">
            <div>
              <p className="text-[7px] uppercase tracking-[0.2em] text-black/40">
                Territoire réel / Google Maps
              </p>
              <p className="mt-1 text-xs font-bold uppercase tracking-[0.08em]">
                Carte interactive
              </p>
            </div>
            <span className="text-right text-[7px] uppercase tracking-[0.18em] text-black/40">
              Zoom libre / Monde → rue
            </span>
          </div>

          <RueGoogleMap
            apiKey={
              process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY ??
              ""
            }
            mapId={
              process.env.NEXT_PUBLIC_GOOGLE_MAPS_MAP_ID
            }
            points={points}
          />

          <div className="mt-10 border-t border-black pt-4">
            <div className="mb-5 flex items-center justify-between">
              <div>
                <p className="text-[7px] uppercase tracking-[0.2em] text-black/40">
                  Index de localisation
                </p>
                <h2 className="mt-1 text-lg font-bold uppercase tracking-[-0.04em]">
                  {points.length} points / {points.length} récits
                </h2>
              </div>
              <span className="hidden text-[7px] uppercase tracking-[0.18em] text-black/40 sm:block">
                Toucher un repère pour ouvrir le récit
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
                    {String(point.index + 1).padStart(
                      2,
                      "0",
                    )}
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
        </div>
      </section>
    </main>
  );
}
