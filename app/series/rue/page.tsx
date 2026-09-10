import Image from "next/image";
import Link from "next/link";

import { rueRecits } from "@/data/photos/rue";
import { photoSeries } from "@/lib/series";

const rueSerie = photoSeries.find(
  (serie) => serie.slug === "rue",
);

export const metadata = {
  title: rueSerie?.title ?? "Récits Urbains Extérieurs",
  description:
    rueSerie?.description ??
    "Les personnes photographiées choisissent le lieu et racontent leur rapport à leur environnement.",
};

function getRecitOffsetClass(index: number) {
  const mobile =
    index % 2 === 1 ? "mt-[45%]" : "mt-0";

  const tablet =
    index % 3 === 1
      ? "sm:mt-[45%]"
      : "sm:mt-0";

  const desktop =
    index % 4 === 1 || index % 4 === 3
      ? "lg:mt-[45%]"
      : "lg:mt-0";

  return `${mobile} ${tablet} ${desktop}`;
}

export default function RuePage() {
  if (!rueSerie) {
    return null;
  }

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
                {rueSerie.number} / 03 — {rueSerie.acronym}
              </p>

              <h1 className="max-w-4xl text-3xl font-bold uppercase leading-[0.9] tracking-[-0.06em] md:text-5xl">
                {rueSerie.title}
              </h1>
            </div>

            <div className="hidden text-right text-[8px] uppercase leading-5 tracking-[0.17em] text-black/45 sm:block">
              <p>{rueSerie.location}</p>
              <p>Photographie urbaine</p>
            </div>
          </div>
        </div>
      </section>

      {/* ================================================= */}
      {/* INDEX DES RÉCITS */}
      {/* ================================================= */}

      <section className="px-3 py-8 sm:px-5 md:px-10 md:py-12">
        <div className="mx-auto max-w-[1400px]">
          <div className="mb-8 grid gap-3 border-b border-black/20 pb-5 sm:grid-cols-[1fr_auto] sm:items-end">
            <div className="flex items-end gap-4">
              <span className="text-4xl font-bold leading-none tracking-[-0.08em] md:text-5xl">
                {String(rueRecits.length).padStart(2, "0")}
              </span>

              <div className="pb-0.5">
                <p className="text-xs font-bold uppercase tracking-[0.12em]">
                  Récits publiés
                </p>

                <p className="mt-1 text-[7px] uppercase tracking-[0.18em] text-black/40">
                  Archive / {rueSerie.acronym}
                </p>
              </div>
            </div>

            <Link
              href="/series/rue/carte"
              className="group/map flex w-fit min-h-12 justify-self-end items-center justify-between gap-5 border border-black bg-[#d8d4ca] px-3 py-2.5 text-black transition-colors duration-300 hover:bg-[#ff3b18] sm:min-h-14 sm:min-w-[250px] sm:gap-8 sm:px-4 sm:py-3"
            >
              <span className="flex items-center gap-3">
                <span className="relative flex h-3 w-3 items-center justify-center">
                  <span className="absolute h-full w-full rounded-full border border-[#ff3b18] transition-colors motion-safe:animate-ping group-hover/map:border-black" />
                  <span className="relative h-[6px] w-[6px] rounded-full bg-[#ff3b18] transition-colors group-hover/map:bg-black" />
                </span>

                <span>
                  <span className="block text-[6px] uppercase tracking-[0.18em] text-black/55 transition-colors group-hover/map:text-black/60 sm:text-[7px] sm:tracking-[0.2em]">
                    Psychogéographie
                  </span>

                  <span className="mt-1 block text-xs font-bold uppercase tracking-[0.08em]">
                    Voir la carte
                  </span>
                </span>
              </span>

              <span className="text-lg transition-transform duration-300 group-hover/map:translate-x-1.5">
                →
              </span>
            </Link>
          </div>

          {rueRecits.length > 0 ? (
            <div className="grid grid-cols-2 gap-x-3 gap-y-10 sm:grid-cols-3 sm:gap-x-4 md:gap-y-14 lg:grid-cols-4 lg:gap-x-5">
              {rueRecits.map((recit, index) => (
                <Link
                  key={recit.slug}
                  href={`/series/rue/${recit.slug}`}
                  className={`group block ${getRecitOffsetClass(index)}`}
                >
                  <div className="relative aspect-[3/4] overflow-hidden bg-black">
                    <Image
                      src={`/Photos/series/rue/${recit.slug}/${recit.couverture}`}
                      alt={
                        recit.photos.find(
                          (photo) =>
                            photo.src === recit.couverture,
                        )?.alt ?? recit.personne
                      }
                      fill
                      sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                      className="object-cover transition-all duration-700 ease-out group-hover:scale-[1.02] group-hover:opacity-90"
                    />

                    <span className="pointer-events-none absolute left-2 top-2 h-[6px] w-[6px] rounded-full bg-[#ff3b18]" />

                    <div className="pointer-events-none absolute inset-0 bg-black/0 transition-colors duration-500 group-hover:bg-black/10" />
                  </div>

                  <div className="pt-3">
                    <p className="text-sm font-bold uppercase tracking-[-0.02em] md:text-base">
                      {recit.personne}
                    </p>

                    <div className="mt-3 flex items-center gap-2.5 border-t border-black/20 pt-2.5">
                      <span className="relative flex h-2.5 w-2.5 shrink-0 items-center justify-center">
                        <span className="absolute h-full w-full rounded-full border border-[#ff3b18]/60 motion-safe:animate-ping" />
                        <span className="relative h-[5px] w-[5px] rounded-full bg-[#ff3b18]" />
                      </span>

                      <p className="flex min-w-0 items-baseline whitespace-nowrap text-[13px] font-bold leading-none text-black sm:text-sm md:text-base">
                        <span className="rue-coordinate-number">
                          {recit.gps.lat.toFixed(4)}
                        </span>

                        <span className="mx-1 text-[#ff3b18]">
                          ,
                        </span>

                        <span className="rue-coordinate-number [animation-delay:450ms]">
                          {recit.gps.lng.toFixed(4)}
                        </span>
                      </p>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <div className="flex min-h-[55svh] items-center justify-center border border-black/20">
              <div className="max-w-sm px-6 text-center">
                <p className="text-[9px] uppercase tracking-[0.22em] text-black/35">
                  Aucun récit publié
                </p>

                <p className="mt-3 text-[8px] leading-5 tracking-[0.1em] text-black/30">
                  Les récits RUE apparaîtront ici une fois
                  leurs informations complètes.
                </p>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* ================================================= */}
      {/* TEXTE DE LA SÉRIE */}
      {/* ================================================= */}

      <section className="border-t border-black bg-black px-5 py-16 text-[#f4f3ef] md:px-10 md:py-20">
        <div className="mx-auto grid max-w-[1200px] gap-10 md:grid-cols-[180px_1fr]">
          <div className="text-[8px] uppercase leading-5 tracking-[0.18em] text-white/40">
            <p>{rueSerie.number} / 03</p>
            <p>{rueSerie.acronym}</p>
            <p>{rueSerie.location}</p>
          </div>

          <p className="max-w-3xl text-xl font-bold leading-[1.25] tracking-[-0.035em] md:text-3xl">
            {rueSerie.description}
          </p>
        </div>
      </section>
    </main>
  );
}
