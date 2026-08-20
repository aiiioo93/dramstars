import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

import { getSeriesPhotos } from "@/lib/photo-files";
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

  /*
   * =========================================================
   * PHOTOS DE LA SÉRIE ACTUELLE
   * =========================================================
   */

  const galleryPhotos = getSeriesPhotos(
    serie.acronym,
    serie.slug,
  );

  /*
   * =========================================================
   * APERÇUS SÉRIE PRÉCÉDENTE / SUIVANTE
   * =========================================================
   */

  const previousSeriePhotos = getSeriesPhotos(
    previousSerie.acronym,
    previousSerie.slug,
  );

  const nextSeriePhotos = getSeriesPhotos(
    nextSerie.acronym,
    nextSerie.slug,
  );

  const previousSeriePreview =
    previousSeriePhotos.length > 0
      ? previousSeriePhotos[0]
      : null;

  const nextSeriePreview =
    nextSeriePhotos.length > 0
      ? nextSeriePhotos[0]
      : null;

  return (
    <main className="min-h-screen bg-[#f4f3ef] text-black">
      {/* ================================================= */}
      {/* EN-TÊTE MINIMAL */}
      {/* ================================================= */}

      <section className="border-b border-black">
        <div className="mx-auto max-w-[1600px] px-5 py-8 md:px-10 md:py-10">
          <div className="flex items-start justify-between gap-8">
            <div>
              <p className="mb-3 text-[8px] uppercase tracking-[0.2em] text-black/45">
                {serie.number} / 03 — {serie.acronym}
              </p>

              <h1 className="max-w-4xl text-3xl font-bold uppercase leading-[0.9] tracking-[-0.06em] md:text-5xl">
                {serie.title}
              </h1>
            </div>

            <div className="hidden text-right text-[8px] uppercase leading-5 tracking-[0.17em] text-black/45 sm:block">
              <p>{serie.location}</p>
              <p>Photographie urbaine</p>
            </div>
          </div>
        </div>
      </section>

      {/* ================================================= */}
      {/* PLANCHE CONTACT */}
      {/* ================================================= */}

      <section className="px-3 py-8 sm:px-5 md:py-12">
        <div className="mx-auto max-w-[760px] lg:max-w-[820px]">
          {galleryPhotos.length > 0 ? (
            <>
              {/* INFOS ARCHIVE */}

              <div className="mb-3 flex items-center justify-between border-b border-black/20 pb-2 text-[7px] uppercase tracking-[0.18em] text-black/40">
                <span>
                  Archive / {serie.acronym}
                </span>

                <span>
                  {String(galleryPhotos.length).padStart(
                    2,
                    "0",
                  )}{" "}
                  photographies
                </span>
              </div>

              {/* ================================================= */}
              {/* GALERIE */}
              {/* ================================================= */}
              {/* ORDRE : GAUCHE → DROITE */}

              <div className="grid grid-cols-1 gap-[4px] sm:grid-cols-2 lg:grid-cols-3">
                {galleryPhotos.map((photo, index) => (
                  <Link
                    key={photo.src}
                    href={`/series/${
                      serie.slug
                    }/${encodeURIComponent(
                      photo.slug,
                    )}`}
                    className="group relative block overflow-hidden bg-black"
                  >
                    {/* PHOTO */}

                    <Image
                      src={photo.src}
                      alt={`${serie.title} — photographie ${
                        index + 1
                      }`}
                      width={1200}
                      height={1600}
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 270px"
                      className="h-auto w-full object-cover transition-all duration-500 ease-out group-hover:scale-[1.02] group-hover:opacity-90"
                    />

                    {/* PETIT REPÈRE ROUGE */}

                    <span className="pointer-events-none absolute left-2 top-2 h-[6px] w-[6px] rounded-full bg-[#ff3b18]" />

                    {/* VOILE AU HOVER */}

                    <div className="pointer-events-none absolute inset-0 bg-black/0 transition-colors duration-300 group-hover:bg-black/10" />

                    {/* TEXTE CENTRAL AU HOVER */}

                    <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
                      <span className="translate-y-2 text-[8px] uppercase tracking-[0.18em] text-white opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
                        Voir la photographie →
                      </span>
                    </div>

                    {/* NUMÉRO AU HOVER */}

                    <div className="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/60 to-transparent px-2 pb-2 pt-8 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                      <span className="text-[7px] uppercase tracking-[0.16em] text-white/70">
                        {serie.acronym} /{" "}
                        {String(index + 1).padStart(
                          3,
                          "0",
                        )}
                      </span>
                    </div>
                  </Link>
                ))}
              </div>
            </>
          ) : (
            /* ================================================= */
            /* AUCUNE PHOTO */
            /* ================================================= */

            <div className="flex min-h-[60svh] items-center justify-center border border-black/20">
              <div className="text-center">
                <p className="text-[9px] uppercase tracking-[0.22em] text-black/35">
                  Aucune photographie
                </p>

                <p className="mt-3 text-[8px] uppercase tracking-[0.15em] text-black/30">
                  /Photos/series/{serie.slug}
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
            <p>{serie.number} / 03</p>
            <p>{serie.acronym}</p>
            <p>{serie.location}</p>
          </div>

          <p className="max-w-3xl text-xl font-bold leading-[1.25] tracking-[-0.035em] md:text-3xl">
            {serie.description}
          </p>
        </div>
      </section>

      {/* ================================================= */}
      {/* NAVIGATION ENTRE LES SÉRIES */}
      {/* ================================================= */}

      <nav className="border-t border-black bg-[#f4f3ef]">
        {/* TOUJOURS 2 BOUTONS SUR UNE LIGNE */}
        <div className="mx-auto grid max-w-[1600px] grid-cols-2">
          {/* ================================================= */}
          {/* SÉRIE PRÉCÉDENTE */}
          {/* ================================================= */}

          <Link
            href={`/series/${previousSerie.slug}`}
            className="group relative min-h-[140px] overflow-hidden border-r border-black p-4 text-black md:min-h-[250px] md:p-10"
          >
            {/* APERÇU PHOTO */}

            {previousSeriePreview && (
              <Image
                src={previousSeriePreview.src}
                alt={`Aperçu ${previousSerie.title}`}
                fill
                sizes="50vw"
                className="pointer-events-none object-cover opacity-0 grayscale transition-all duration-700 ease-out group-hover:scale-[1.025] group-hover:opacity-40 group-active:scale-[1.025] group-active:opacity-40"
              />
            )}

            {/* OVERLAY BORDEAUX */}

            <div className="pointer-events-none absolute inset-0 z-10 bg-[#713126]/0 transition-colors duration-500 ease-out group-hover:bg-[#713126]/85 group-active:bg-[#713126]/85" />

            {/* DÉGRADÉ */}

            <div className="pointer-events-none absolute inset-0 z-10 bg-gradient-to-r from-black/0 to-transparent transition-all duration-500 group-hover:from-black/25 group-active:from-black/25" />

            {/* CONTENU */}

            <div className="relative z-20 flex min-h-[108px] flex-col justify-between md:min-h-[170px]">
              <div>
                <span className="inline-block text-[7px] uppercase tracking-[0.14em] text-black/45 transition-all duration-500 group-hover:-translate-x-1 group-hover:text-white/65 group-active:-translate-x-1 group-active:text-white/65 md:text-[8px]">
                  ← Précédente
                </span>

                <p className="mt-3 text-lg font-bold uppercase tracking-[-0.04em] text-black transition-colors duration-500 group-hover:text-white group-active:text-white md:mt-4 md:text-2xl">
                  {previousSerie.acronym}
                </p>

                <p className="mt-1 line-clamp-2 text-[8px] leading-4 text-black/45 transition-colors duration-500 group-hover:text-white/60 group-active:text-white/60 md:text-[9px] md:uppercase md:tracking-[0.14em]">
                  {previousSerie.title}
                </p>
              </div>

              {/* DESCRIPTION TABLETTE / DESKTOP */}

              <p className="hidden max-w-md translate-y-4 text-sm leading-6 text-white/85 opacity-0 transition-all duration-700 ease-out group-hover:translate-y-0 group-hover:opacity-100 group-active:translate-y-0 group-active:opacity-100 md:block">
                {previousSerie.description}
              </p>
            </div>

            {/* PETIT POINT ROUGE */}

            <span className="pointer-events-none absolute bottom-4 left-4 z-20 h-[5px] w-[5px] rounded-full bg-[#ff3b18] opacity-0 transition-opacity duration-500 group-hover:opacity-100 group-active:opacity-100 md:bottom-10 md:left-10 md:h-[6px] md:w-[6px]" />
          </Link>

          {/* ================================================= */}
          {/* SÉRIE SUIVANTE */}
          {/* ================================================= */}

          <Link
            href={`/series/${nextSerie.slug}`}
            className="group relative min-h-[140px] overflow-hidden p-4 text-right text-black md:min-h-[250px] md:p-10"
          >
            {/* APERÇU PHOTO */}

            {nextSeriePreview && (
              <Image
                src={nextSeriePreview.src}
                alt={`Aperçu ${nextSerie.title}`}
                fill
                sizes="50vw"
                className="pointer-events-none object-cover opacity-0 grayscale transition-all duration-700 ease-out group-hover:scale-[1.025] group-hover:opacity-40 group-active:scale-[1.025] group-active:opacity-40"
              />
            )}

            {/* OVERLAY BORDEAUX */}

            <div className="pointer-events-none absolute inset-0 z-10 bg-[#713126]/0 transition-colors duration-500 ease-out group-hover:bg-[#713126]/85 group-active:bg-[#713126]/85" />

            {/* DÉGRADÉ */}

            <div className="pointer-events-none absolute inset-0 z-10 bg-gradient-to-l from-black/0 to-transparent transition-all duration-500 group-hover:from-black/25 group-active:from-black/25" />

            {/* CONTENU */}

            <div className="relative z-20 flex min-h-[108px] flex-col items-end justify-between md:min-h-[170px]">
              <div>
                <span className="inline-block text-[7px] uppercase tracking-[0.14em] text-black/45 transition-all duration-500 group-hover:translate-x-1 group-hover:text-white/65 group-active:translate-x-1 group-active:text-white/65 md:text-[8px]">
                  Suivante →
                </span>

                <p className="mt-3 text-lg font-bold uppercase tracking-[-0.04em] text-black transition-colors duration-500 group-hover:text-white group-active:text-white md:mt-4 md:text-2xl">
                  {nextSerie.acronym}
                </p>

                <p className="mt-1 line-clamp-2 text-[8px] leading-4 text-black/45 transition-colors duration-500 group-hover:text-white/60 group-active:text-white/60 md:text-[9px] md:uppercase md:tracking-[0.14em]">
                  {nextSerie.title}
                </p>
              </div>

              {/* DESCRIPTION TABLETTE / DESKTOP */}

              <p className="hidden max-w-md translate-y-4 text-sm leading-6 text-white/85 opacity-0 transition-all duration-700 ease-out group-hover:translate-y-0 group-hover:opacity-100 group-active:translate-y-0 group-active:opacity-100 md:block">
                {nextSerie.description}
              </p>
            </div>

            {/* PETIT POINT ROUGE */}

            <span className="pointer-events-none absolute bottom-4 right-4 z-20 h-[5px] w-[5px] rounded-full bg-[#ff3b18] opacity-0 transition-opacity duration-500 group-hover:opacity-100 group-active:opacity-100 md:bottom-10 md:right-10 md:h-[6px] md:w-[6px]" />
          </Link>
        </div>
      </nav>
    </main>
  );
}