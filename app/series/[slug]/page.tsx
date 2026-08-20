import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

import { findPhoto, getSeriesGallery } from "@/lib/photo-files";
import { photoSeries } from "@/lib/series";

type SeriesPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export function generateStaticParams() {
  return photoSeries.map((serie) => ({
    slug: serie.slug,
  }));
}

export async function generateMetadata({
  params,
}: SeriesPageProps) {
  const { slug } = await params;

  const serie = photoSeries.find(
    (item) => item.slug === slug,
  );

  if (!serie) {
    return {};
  }

  return {
    title: serie.title,
    description: serie.description,
  };
}

export default async function SeriesPage({
  params,
}: SeriesPageProps) {
  const { slug } = await params;

  const serieIndex = photoSeries.findIndex(
    (item) => item.slug === slug,
  );

  if (serieIndex === -1) {
    notFound();
  }

  const serie = photoSeries[serieIndex];

  const previousSerie =
    photoSeries[
      (serieIndex - 1 + photoSeries.length) %
        photoSeries.length
    ];

  const nextSerie =
    photoSeries[
      (serieIndex + 1) % photoSeries.length
    ];

  const coverPhoto = findPhoto(serie.acronym);

  const galleryPhotos = getSeriesGallery(
    serie.acronym,
    serie.slug,
  );

  return (
    <main className="bg-[#f4f3ef] text-black">
      {/* HERO DE LA SÉRIE */}
      <section className="mx-auto grid min-h-[calc(100svh-64px)] max-w-[1600px] lg:grid-cols-[0.75fr_1.25fr]">
        {/* INFORMATIONS */}
        <div className="flex flex-col justify-between border-b border-black p-5 md:p-10 lg:border-b-0 lg:border-r">
          <div className="flex justify-between text-[9px] uppercase tracking-[0.16em]">
            <span>
              Série {serie.number} / 03
            </span>

            <span>{serie.location}</span>
          </div>

          <div className="py-16 lg:py-10">
            <span className="text-[10px] uppercase tracking-[0.2em]">
              [{serie.acronym}]
            </span>

            <h1 className="mt-5 max-w-3xl text-[clamp(3.5rem,7vw,7rem)] font-bold uppercase leading-[0.82] tracking-[-0.075em]">
              {serie.title}
            </h1>
          </div>

          <div className="border-t border-black pt-5">
            <p className="max-w-lg text-xs leading-6 md:text-sm md:leading-7">
              {serie.description}
            </p>
          </div>
        </div>

        {/* PHOTO PRINCIPALE */}
        <div className="relative min-h-[65svh] overflow-hidden bg-black lg:min-h-0">
          {coverPhoto ? (
            <Image
              src={coverPhoto}
              alt={`${serie.title} — La dramstars`}
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 65vw"
              className="object-cover"
            />
          ) : (
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="-rotate-90 text-[10px] uppercase tracking-[0.3em] text-white/30">
                Photographie à venir
              </span>
            </div>
          )}

          <div className="absolute left-5 top-5 text-[9px] uppercase tracking-[0.16em] text-white md:left-8 md:top-8">
            {serie.number} / {serie.acronym}
          </div>

          <div className="absolute bottom-5 left-5 right-5 flex justify-between border-t border-white/40 pt-3 text-[8px] uppercase tracking-[0.14em] text-white/70 md:bottom-8 md:left-8 md:right-8">
            <span>LADRAMSTARS</span>
            <span>{serie.location}</span>
          </div>
        </div>
      </section>

      {/* TEXTE */}
      <section className="border-t border-white/20 bg-black px-5 py-20 text-[#f4f3ef] md:px-10 md:py-28">
        <div className="mx-auto grid max-w-[1400px] gap-12 md:grid-cols-[0.55fr_1.45fr]">
          <div className="text-[9px] uppercase leading-6 tracking-[0.18em] text-white/45">
            <p>{serie.number} / 03</p>
            <p>{serie.acronym}</p>
            <p>{serie.location}</p>
            <p>Photographie urbaine</p>
          </div>

          <div>
            <p className="max-w-4xl text-2xl font-bold leading-[1.15] tracking-[-0.04em] md:text-4xl">
              {serie.description}
            </p>
          </div>
        </div>
      </section>

      {/* GALERIE AUTOMATIQUE */}
      {galleryPhotos.length > 0 && (
        <section className="px-5 py-20 md:px-10 md:py-28">
          <div className="mx-auto max-w-[1600px]">
            <div className="mb-14 flex justify-between border-b border-black pb-4 text-[9px] uppercase tracking-[0.16em]">
              <span>Photographies</span>
              <span>
                {String(galleryPhotos.length).padStart(2, "0")} images
              </span>
            </div>

            <div className="grid gap-5 md:grid-cols-2">
              {galleryPhotos.map((photo, index) => (
                <div
                  key={photo}
                  className={`relative overflow-hidden bg-black ${
                    index % 3 === 0
                      ? "aspect-[4/5]"
                      : "aspect-[3/2]"
                  }`}
                >
                  <Image
                    src={photo}
                    alt={`${serie.title} — photographie ${index + 1}`}
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="object-cover"
                  />

                  <span className="absolute bottom-3 right-3 bg-black/60 px-2 py-1 text-[8px] tracking-[0.15em] text-white">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* NAVIGATION ENTRE LES SÉRIES */}
      <nav className="border-t border-black">
        <div className="mx-auto grid max-w-[1600px] md:grid-cols-2">
          <Link
            href={`/series/${previousSerie.slug}`}
            className="group border-b border-black p-6 transition-colors hover:bg-black hover:text-white md:border-b-0 md:border-r md:p-10"
          >
            <span className="text-[9px] uppercase tracking-[0.16em] opacity-50">
              ← Série précédente
            </span>

            <p className="mt-5 text-xl font-bold uppercase tracking-[-0.04em] md:text-2xl">
              {previousSerie.title}
            </p>
          </Link>

          <Link
            href={`/series/${nextSerie.slug}`}
            className="group p-6 text-right transition-colors hover:bg-black hover:text-white md:p-10"
          >
            <span className="text-[9px] uppercase tracking-[0.16em] opacity-50">
              Série suivante →
            </span>

            <p className="mt-5 text-xl font-bold uppercase tracking-[-0.04em] md:text-2xl">
              {nextSerie.title}
            </p>
          </Link>
        </div>
      </nav>
    </main>
  );
}