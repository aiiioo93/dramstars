import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

import { lsbPhotos } from "@/data/photos/lsb";
import { zupPhotos } from "@/data/photos/zup";

import {
  getSeriesPhoto,
  getSeriesPhotos,
} from "@/lib/photo-files";

import { photoSeries } from "@/lib/series";

type PhotoPageProps = {
  params: Promise<{
    slug: string;
    photo: string;
  }>;
};

type PhotoEditorialData = {
  title: string;
  legend: string;
  description: string;

  alt?: string;
  location?: string;
  date?: string;
  time?: string;
};

/*
 * =========================================================
 * DONNÉES ÉDITORIALES
 * =========================================================
 *
 * - ZUP → branché
 * - LSB → branché
 * - RUE → à venir
 */

function getPhotoEditorialData(
  seriesSlug: string,
  photoSlug: string,
): PhotoEditorialData | null {
  if (seriesSlug === "zup") {
    return zupPhotos[photoSlug] ?? null;
  }

  if (seriesSlug === "lsb") {
    return lsbPhotos[photoSlug] ?? null;
  }

  return null;
}

/*
 * =========================================================
 * MÉTADONNÉES SEO
 * =========================================================
 */

export async function generateMetadata({
  params,
}: PhotoPageProps) {
  const { slug, photo } = await params;

  const serie = photoSeries.find(
    (item) => item.slug === slug,
  );

  if (!serie) {
    return {};
  }

  const editorialData = getPhotoEditorialData(
    slug,
    photo,
  );

  return {
    title:
      editorialData?.title ??
      `Photographie ${photo} — ${serie.acronym}`,

    description:
      editorialData?.legend ??
      serie.description,
  };
}

/*
 * =========================================================
 * PAGE PHOTO
 * =========================================================
 */

export default async function PhotoPage({
  params,
}: PhotoPageProps) {
  const {
    slug,
    photo: photoSlug,
  } = await params;

  /*
   * =========================================================
   * SÉRIE
   * =========================================================
   */

  const serie = photoSeries.find(
    (item) => item.slug === slug,
  );

  if (!serie) {
    notFound();
  }

  /*
   * =========================================================
   * PHOTO
   * =========================================================
   */

  const photo = getSeriesPhoto(
    serie.acronym,
    serie.slug,
    photoSlug,
  );

  if (!photo) {
    notFound();
  }

  /*
   * =========================================================
   * TOUTES LES PHOTOS DE LA SÉRIE
   * =========================================================
   */

  const photos = getSeriesPhotos(
    serie.acronym,
    serie.slug,
  );

  const currentIndex = photos.findIndex(
    (item) => item.slug === photo.slug,
  );

  if (currentIndex === -1) {
    notFound();
  }

  /*
   * =========================================================
   * PHOTO PRÉCÉDENTE / SUIVANTE
   * =========================================================
   */

  const previousPhoto =
    currentIndex > 0
      ? photos[currentIndex - 1]
      : null;

  const nextPhoto =
    currentIndex < photos.length - 1
      ? photos[currentIndex + 1]
      : null;

  /*
   * =========================================================
   * INFORMATIONS DE LA PHOTO
   * =========================================================
   */

  const editorialData = getPhotoEditorialData(
    serie.slug,
    photo.slug,
  );

  const photoNumber = String(
    currentIndex + 1,
  ).padStart(2, "0");

  const totalPhotos = String(
    photos.length,
  ).padStart(2, "0");

  return (
    <main className="min-h-screen bg-[#f4f3ef] text-black">
      {/* ================================================= */}
      {/* PAGE PHOTO */}
      {/* ================================================= */}

      <section className="px-5 py-10 md:px-10 md:py-16">
        <div className="mx-auto max-w-[900px]">
          {/* ================================================= */}
          {/* NAVIGATION HAUTE */}
          {/* ================================================= */}

          <div className="mb-10 flex items-center justify-between border-b border-black/20 pb-3 text-[8px] uppercase tracking-[0.17em] text-black/45">
            <Link
              href={`/series/${serie.slug}`}
              className="transition-opacity duration-300 hover:opacity-50"
            >
              ← Retour {serie.acronym}
            </Link>

            <span>
              {photoNumber} / {totalPhotos}
            </span>
          </div>

          {/* ================================================= */}
          {/* TITRE */}
          {/* ================================================= */}

          <header className="mb-7 text-center">
            <p className="mb-3 text-[8px] uppercase tracking-[0.18em] text-black/40">
              {serie.acronym} / Archive{" "}
              {String(currentIndex + 1).padStart(
                3,
                "0",
              )}
            </p>

            <h1 className="mx-auto max-w-4xl text-3xl font-bold leading-[0.95] tracking-[-0.05em] md:text-5xl">
              {editorialData?.title ??
                `Photographie ${photoNumber}`}
            </h1>
          </header>

          {/* ================================================= */}
          {/* PHOTO */}
          {/* ================================================= */}

          <figure>
            <div className="relative overflow-hidden bg-black">
              <Image
                src={photo.src}
                alt={
                  editorialData?.alt ??
                  editorialData?.title ??
                  `${serie.title} — photographie ${
                    currentIndex + 1
                  }`
                }
                width={1600}
                height={2000}
                priority
                sizes="(max-width: 1024px) 100vw, 900px"
                className="h-auto w-full"
              />

              {/* REPÈRE PHOTO */}

              <span className="absolute left-3 top-3 h-2 w-2 rounded-full bg-[#ff3b18]" />
            </div>

            {/* ================================================= */}
            {/* LIEU + DATE + HEURE */}
            {/* ================================================= */}

            {editorialData?.location &&
              editorialData?.date &&
              editorialData?.time && (
                <figcaption className="mt-5 border-b border-black/15 pb-5 text-base italic leading-7 text-black/65 md:text-lg md:leading-8">
                  {editorialData.location} —{" "}
                  {editorialData.date} à{" "}
                  {editorialData.time}
                </figcaption>
              )}
          </figure>

          {/* ================================================= */}
          {/* DESCRIPTION */}
          {/* ================================================= */}

          {editorialData ? (
            <article className="mt-9 max-w-2xl">
              <div className="space-y-6 text-sm leading-7 text-black/70 md:text-base md:leading-8">
                {editorialData.description
                  .split("\n\n")
                  .filter(
                    (paragraph) =>
                      paragraph.trim().length > 0,
                  )
                  .map(
                    (
                      paragraph,
                      index,
                    ) => (
                      <p key={index}>
                        {paragraph}
                      </p>
                    ),
                  )}
              </div>
            </article>
          ) : (
            <article className="mt-9 max-w-2xl">
              <p className="text-sm leading-7 text-black/60">
                Les informations liées à cette
                photographie seront ajoutées
                prochainement.
              </p>
            </article>
          )}
        </div>
      </section>

      {/* ================================================= */}
      {/* NAVIGATION ENTRE LES PHOTOS */}
      {/* ================================================= */}

      <nav className="mt-16 border-t border-black">
        <div className="mx-auto grid max-w-[1200px] grid-cols-2">
          {/* ================================================= */}
          {/* PHOTO PRÉCÉDENTE */}
          {/* ================================================= */}

          <div className="border-r border-black">
            {previousPhoto ? (
              <Link
                href={`/series/${
                  serie.slug
                }/${encodeURIComponent(
                  previousPhoto.slug,
                )}`}
                className="group relative block min-h-[130px] overflow-hidden p-5 text-black md:min-h-[170px] md:p-8"
              >
                {/* APERÇU PHOTO */}

                <Image
                  src={previousPhoto.src}
                  alt=""
                  fill
                  sizes="(max-width: 768px) 50vw, 600px"
                  className="pointer-events-none object-cover opacity-0 grayscale transition-all duration-700 ease-out group-hover:scale-[1.03] group-hover:opacity-25 group-active:scale-[1.03] group-active:opacity-25"
                />

                {/* VOILE */}

                <div className="pointer-events-none absolute inset-0 bg-black opacity-0 transition-opacity duration-500 group-hover:opacity-75 group-active:opacity-75" />

                {/* CONTENU */}

                <div className="relative z-10 flex h-full min-h-[90px] flex-col justify-between">
                  <span className="text-[8px] uppercase tracking-[0.16em] text-black/45 transition-all duration-500 group-hover:-translate-x-1 group-hover:text-white/60 group-active:-translate-x-1 group-active:text-white/60">
                    ← Précédente
                  </span>

                  <p className="mt-5 max-w-[90%] text-xs font-bold uppercase leading-5 text-black transition-colors duration-500 group-hover:text-white group-active:text-white md:text-sm">
                    {getPhotoEditorialData(
                      serie.slug,
                      previousPhoto.slug,
                    )?.title ??
                      `Photographie ${String(
                        currentIndex,
                      ).padStart(
                        2,
                        "0",
                      )}`}
                  </p>
                </div>

                {/* PETIT REPÈRE */}

                <span className="pointer-events-none absolute bottom-5 left-5 z-10 h-[5px] w-[5px] rounded-full bg-[#ff3b18] opacity-0 transition-all duration-500 group-hover:opacity-100 group-active:opacity-100 md:bottom-8 md:left-8" />
              </Link>
            ) : (
              <div className="min-h-[130px] p-5 opacity-20 md:min-h-[170px] md:p-8">
                <span className="text-[8px] uppercase tracking-[0.16em]">
                  ← Précédente
                </span>
              </div>
            )}
          </div>

          {/* ================================================= */}
          {/* PHOTO SUIVANTE */}
          {/* ================================================= */}

          <div>
            {nextPhoto ? (
              <Link
                href={`/series/${
                  serie.slug
                }/${encodeURIComponent(
                  nextPhoto.slug,
                )}`}
                className="group relative block min-h-[130px] overflow-hidden p-5 text-right text-black md:min-h-[170px] md:p-8"
              >
                {/* APERÇU PHOTO */}

                <Image
                  src={nextPhoto.src}
                  alt=""
                  fill
                  sizes="(max-width: 768px) 50vw, 600px"
                  className="pointer-events-none object-cover opacity-0 grayscale transition-all duration-700 ease-out group-hover:scale-[1.03] group-hover:opacity-25 group-active:scale-[1.03] group-active:opacity-25"
                />

                {/* VOILE */}

                <div className="pointer-events-none absolute inset-0 bg-black opacity-0 transition-opacity duration-500 group-hover:opacity-75 group-active:opacity-75" />

                {/* CONTENU */}

                <div className="relative z-10 flex h-full min-h-[90px] flex-col items-end justify-between">
                  <span className="text-[8px] uppercase tracking-[0.16em] text-black/45 transition-all duration-500 group-hover:translate-x-1 group-hover:text-white/60 group-active:translate-x-1 group-active:text-white/60">
                    Suivante →
                  </span>

                  <p className="mt-5 max-w-[90%] text-xs font-bold uppercase leading-5 text-black transition-colors duration-500 group-hover:text-white group-active:text-white md:text-sm">
                    {getPhotoEditorialData(
                      serie.slug,
                      nextPhoto.slug,
                    )?.title ??
                      `Photographie ${String(
                        currentIndex + 2,
                      ).padStart(
                        2,
                        "0",
                      )}`}
                  </p>
                </div>

                {/* PETIT REPÈRE */}

                <span className="pointer-events-none absolute bottom-5 right-5 z-10 h-[5px] w-[5px] rounded-full bg-[#ff3b18] opacity-0 transition-all duration-500 group-hover:opacity-100 group-active:opacity-100 md:bottom-8 md:right-8" />
              </Link>
            ) : (
              <div className="min-h-[130px] p-5 text-right opacity-20 md:min-h-[170px] md:p-8">
                <span className="text-[8px] uppercase tracking-[0.16em]">
                  Suivante →
                </span>
              </div>
            )}
          </div>
        </div>
      </nav>
    </main>
  );
}