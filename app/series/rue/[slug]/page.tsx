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

          <div className="grid gap-8 md:grid-cols-[1fr_auto] md:items-end">
            <h1 className="max-w-5xl text-4xl font-bold uppercase leading-[0.9] tracking-[-0.06em] md:text-6xl lg:text-7xl">
              {recit.personne}
            </h1>

            <div className="text-[8px] uppercase leading-5 tracking-[0.17em] text-black/45 md:text-right">
              <p>
                {formatGps(
                  recit.gps.lat,
                  recit.gps.lng,
                )}
              </p>

              <p>{recit.date}</p>
              <p>{recit.heure}</p>
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
              {String(recit.photos.length).padStart(
                2,
                "0",
              )}
            </span>
          </div>

          <div className="grid gap-[4px] sm:grid-cols-2">
            {recit.photos.map((photo, index) => (
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
            ))}
          </div>
        </div>
      </section>

      {/* ================================================= */}
      {/* PAROLE DE LA PERSONNE */}
      {/* ================================================= */}

      <section className="border-t border-black bg-black px-5 py-16 text-[#f4f3ef] md:px-10 md:py-24">
        <div className="mx-auto grid max-w-[1200px] gap-10 md:grid-cols-[180px_1fr]">
          <div className="text-[8px] uppercase leading-5 tracking-[0.18em] text-white/40">
            <p>RUE</p>
            <p>
              {formatGps(
                recit.gps.lat,
                recit.gps.lng,
              )}
            </p>
            <p>{recit.date}</p>
          </div>

          <div className="max-w-3xl space-y-8">
            {recit.parole.map(
              (paragraph, index) => (
                <p
                  key={index}
                  className="text-lg leading-8 text-white/90 md:text-2xl md:leading-10"
                >
                  {paragraph}
                </p>
              ),
            )}
          </div>
        </div>
      </section>
    </main>
  );
}