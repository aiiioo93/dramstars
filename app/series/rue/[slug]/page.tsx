import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

import { rueRecits } from "@/data/photos/rue";

type RueRecitPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

function formatGps(lat: number, lng: number) {
  return `${lat.toFixed(4)}, ${lng.toFixed(4)}`;
}

/*
 * =========================================================
 * SEO
 * =========================================================
 */

export async function generateMetadata({
  params,
}: RueRecitPageProps) {
  const { slug } = await params;

  const recit = rueRecits.find(
    (item) => item.slug === slug,
  );

  if (!recit) {
    return {};
  }

  return {
    title: `${recit.personne} — RUE`,
    description: `Récit de ${recit.personne} dans la série Récits Urbains Extérieurs.`,
  };
}

/*
 * =========================================================
 * PAGE D'UN RÉCIT RUE
 * =========================================================
 */

export default async function RueRecitPage({
  params,
}: RueRecitPageProps) {
  const { slug } = await params;

  const recit = rueRecits.find(
    (item) => item.slug === slug,
  );

  if (!recit) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-[#f4f3ef] text-black">
      {/* ================================================= */}
      {/* EN-TÊTE */}
      {/* ================================================= */}

      <section className="border-b border-black px-5 py-8 md:px-10 md:py-10">
        <div className="mx-auto max-w-[1400px]">
          <div className="mb-10 flex items-center justify-between text-[8px] uppercase tracking-[0.17em] text-black/45">
            <Link
              href="/series/rue"
              className="transition-opacity duration-300 hover:opacity-50"
            >
              ← Retour RUE
            </Link>

            <span>Récit / Archive</span>
          </div>

          <div className="grid gap-10 md:grid-cols-[1fr_auto] md:items-end">
            {/* NOM */}

            <h1 className="max-w-5xl text-4xl font-bold uppercase leading-[0.9] tracking-[-0.06em] md:text-6xl lg:text-7xl">
              {recit.personne}
            </h1>

            {/* COORDONNÉES */}

            <div className="min-w-[230px] border-t border-black/25 pt-3 md:text-right">
              <div className="mb-3 flex items-center gap-2 md:justify-end">
                <span className="h-[6px] w-[6px] rounded-full bg-[#ff3b18]" />

                <span className="text-[7px] uppercase tracking-[0.22em] text-black/40">
                  Coordonnées
                </span>
              </div>

              <p className="text-lg font-bold tracking-[-0.035em] text-black md:text-xl">
                {formatGps(
                  recit.gps.lat,
                  recit.gps.lng,
                )}
              </p>

              {(recit.date || recit.heure) && (
                <div className="mt-2 text-[8px] uppercase tracking-[0.16em] text-black/40">
                  {recit.date && (
                    <span>{recit.date}</span>
                  )}

                  {recit.date &&
                    recit.heure && (
                      <span className="mx-2">
                        /
                      </span>
                    )}

                  {recit.heure && (
                    <span>{recit.heure}</span>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* ================================================= */}
      {/* PHOTOGRAPHIES DU SHOOTING */}
      {/* ================================================= */}

      <section className="px-3 py-8 sm:px-5 md:px-10 md:py-14">
        <div className="mx-auto max-w-[1200px]">
          <div className="mb-4 flex items-center justify-between border-b border-black/20 pb-2 text-[7px] uppercase tracking-[0.18em] text-black/40">
            <span>Photographies</span>

            <span>
              {String(
                recit.photos.length,
              ).padStart(2, "0")}
            </span>
          </div>

          <div className="grid gap-[4px] sm:grid-cols-2">
            {recit.photos.map(
              (photo, index) => (
                <figure
                  key={`${photo.src}-${index}`}
                  className={
                    index % 3 === 0
                      ? "sm:col-span-2"
                      : ""
                  }
                >
                  <div className="relative overflow-hidden bg-black">
                    <Image
                      src={`/Photos/series/rue/${recit.slug}/${photo.src}`}
                      alt={photo.alt}
                      width={1600}
                      height={2000}
                      sizes="(max-width: 640px) 100vw, (max-width: 1200px) 50vw, 1200px"
                      className="h-auto w-full object-cover"
                      priority={index === 0}
                    />

                    <span className="absolute left-3 top-3 h-[6px] w-[6px] rounded-full bg-[#ff3b18]" />
                  </div>
                </figure>
              ),
            )}
          </div>
        </div>
      </section>

      {/* ================================================= */}
      {/* PAROLE DE LA PERSONNE */}
      {/* ================================================= */}

      <section className="relative overflow-hidden border-t border-black bg-[#713126] px-5 py-20 text-[#f4f3ef] md:px-10 md:py-28">
        <div className="mx-auto grid max-w-[1200px] gap-12 md:grid-cols-[180px_1fr]">
          {/* REPÈRES */}

          <div className="text-[8px] uppercase leading-5 tracking-[0.18em] text-white/45">
            <div className="mb-4 flex items-center gap-2">
              <span className="h-[6px] w-[6px] rounded-full bg-[#ff3b18]" />

              <span>Parole / RUE</span>
            </div>

            <p>
              {formatGps(
                recit.gps.lat,
                recit.gps.lng,
              )}
            </p>

            {recit.date && (
              <p>{recit.date}</p>
            )}

            {recit.heure && (
              <p>{recit.heure}</p>
            )}
          </div>

          {/* PAROLE */}

          <div className="relative max-w-3xl">
            <span className="pointer-events-none absolute -left-2 -top-12 text-[110px] font-bold leading-none text-white/[0.08] md:-left-12 md:-top-16 md:text-[180px]">
              “
            </span>

            <div className="relative z-10 space-y-8">
              {recit.parole.map(
                (paragraph, index) => (
                  <p
                    key={index}
                    className="text-xl font-bold leading-[1.45] tracking-[-0.025em] text-white/95 md:text-3xl md:leading-[1.4]"
                  >
                    {paragraph}
                  </p>
                ),
              )}
            </div>

            <div className="mt-12 flex items-center gap-4 border-t border-white/25 pt-4">
              <span className="text-[7px] uppercase tracking-[0.2em] text-white/45">
                Récits Urbains Extérieurs
              </span>

              <span className="h-px flex-1 bg-white/15" />
            </div>
          </div>
        </div>

        {/* REPÈRE DÉCORATIF */}

        <div className="pointer-events-none absolute bottom-4 right-5 text-[12vw] font-bold uppercase leading-none tracking-[-0.08em] text-white/[0.025] md:right-10">
          RUE
        </div>
      </section>
    </main>
  );
}