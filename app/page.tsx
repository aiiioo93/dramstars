import fs from "node:fs";
import path from "node:path";

import Image from "next/image";
import Link from "next/link";

import HeroCarousel from "@/components/HeroCarousel";
import { photoSeries } from "@/lib/series";

const allowedExtensions = [
  ".jpg",
  ".jpeg",
  ".png",
  ".webp",
  ".avif",
];

type PhotosConfig = {
  directory: string;
  publicPath: string;
};

function getPhotosConfig(): PhotosConfig {
  const folders = [
    {
      directory: path.join(
        process.cwd(),
        "public",
        "Photos",
      ),
      publicPath: "/Photos",
    },
    {
      directory: path.join(
        process.cwd(),
        "public",
        "photos",
      ),
      publicPath: "/photos",
    },
  ];

  const existingFolder = folders.find(
    (folder) =>
      fs.existsSync(folder.directory),
  );

  return existingFolder ?? folders[0];
}

function getPhotoByName(
  photosConfig: PhotosConfig,
  photoName: string,
): string | null {
  if (!fs.existsSync(photosConfig.directory)) {
    return null;
  }

  const photo = fs
    .readdirSync(photosConfig.directory)
    .find((file) => {
      const extension = path
        .extname(file)
        .toLowerCase();

      const fileName = path
        .basename(file, extension)
        .toLowerCase();

      return (
        allowedExtensions.includes(extension) &&
        fileName === photoName.toLowerCase()
      );
    });

  if (!photo) {
    return null;
  }

  return `${photosConfig.publicPath}/${encodeURIComponent(
    photo,
  )}`;
}

function getHeroPhotos(
  photosConfig: PhotosConfig,
) {
  if (!fs.existsSync(photosConfig.directory)) {
    return [];
  }

  const reservedPhotos = [
    "profil",
    "zup",
    "lsb",
    "rue",
  ];

  return fs
    .readdirSync(photosConfig.directory)
    .filter((file) => {
      const extension = path
        .extname(file)
        .toLowerCase();

      const fileName = path
        .basename(file, extension)
        .toLowerCase();

      return (
        allowedExtensions.includes(extension) &&
        !reservedPhotos.includes(fileName)
      );
    })
    .sort((a, b) =>
      a.localeCompare(b, undefined, {
        numeric: true,
      }),
    )
    .map(
      (file) =>
        `${photosConfig.publicPath}/${encodeURIComponent(
          file,
        )}`,
    );
}

export default function Home() {
  const photosConfig = getPhotosConfig();

  const heroPhotos =
    getHeroPhotos(photosConfig);

  const profilePhoto = getPhotoByName(
    photosConfig,
    "profil",
  );

  const seriesPhotos: Record<
    string,
    string | null
  > = {
    zup: getPhotoByName(
      photosConfig,
      "zup",
    ),
    lsb: getPhotoByName(
      photosConfig,
      "lsb",
    ),
    rue: getPhotoByName(
      photosConfig,
      "rue",
    ),
  };

  return (
    <main className="bg-[#f4f3ef] text-[#0a0a0a]">
      {/* ================================================= */}
      {/* HERO */}
      {/* ================================================= */}

      <section className="relative h-[calc(100svh-64px)] overflow-hidden lg:mx-auto lg:grid lg:max-w-[1600px] lg:grid-cols-[0.85fr_1.15fr]">
        {/* ================================================= */}
        {/* HERO MOBILE */}
        {/* ================================================= */}

        <div className="absolute inset-0 lg:hidden">
          <div className="h-full [&>div]:h-full">
            <HeroCarousel
              images={heroPhotos}
            />
          </div>

          <div className="pointer-events-none absolute inset-0 z-30 bg-gradient-to-b from-black/5 via-transparent via-50% to-black/75" />

          <div className="pointer-events-none absolute inset-0 z-30 bg-black/[0.04]" />

          <div className="pointer-events-none absolute bottom-24 left-5 right-5 z-40">


            <h1 className="max-w-[95%] text-[clamp(2.8rem,13vw,4.8rem)] font-bold uppercase leading-[0.82] tracking-[-0.07em] text-white/95 drop-shadow-[0_4px_20px_rgba(0,0,0,1)]">
              Ni vainqueur,
              <br />
              ni vaincu:
              <br />

              <span className="inline-block">
                <span className="block">
                  mon histoire.
                </span>

                <span className="mt-3 block text-right text-[9px] font-normal leading-normal tracking-[0.18em] text-white/70 drop-shadow-[0_2px_8px_rgba(0,0,0,0.95)]">
                  [ Madou Daraamé ]
                </span>
              </span>
            </h1>
          </div>
        </div>

        {/* ================================================= */}
        {/* HERO DESKTOP */}
        {/* ================================================= */}

        <div className="hidden min-h-0 flex-col justify-between border-black p-5 md:p-8 lg:flex lg:border-r lg:p-10">
          <div className="flex justify-between text-[9px] leading-relaxed tracking-[0.14em] md:text-[10px]">



          </div>

          <div>


            <h1 className="max-w-[620px] text-[clamp(2.8rem,5.2vw,5.4rem)] font-bold uppercase leading-[0.82] tracking-[-0.065em] text-black">
              Ni vainqueur,
              <br />
              ni vaincu:
              <br />

              <span className="inline-block">
                <span className="block">
                  mon histoire.
                </span>

                <span className="mt-3 block text-right text-[9px] font-normal leading-normal tracking-[0.18em] text-black md:text-xs">
                  [ Madou Daraamé ]
                </span>
              </span>
            </h1>
          </div>

          <div className="flex items-end justify-between gap-5">
            <p className="max-w-sm text-[10px] leading-4 md:text-sm md:leading-6">
              Une photographie
              autobiographique tournée vers les
              questions identitaires, la banlieue
              et les territoires traversés.
            </p>

            <a
              href="#madou"
              className="hidden shrink-0 text-[10px] uppercase tracking-[0.14em] underline underline-offset-4 sm:block md:text-xs"
            >
              Découvrir ↓
            </a>
          </div>
        </div>

        {/* CARROUSEL DESKTOP */}

        <div className="hidden min-h-0 lg:block">
          <div className="h-full [&>div]:h-full">
            <HeroCarousel
              images={heroPhotos}
            />
          </div>
        </div>
      </section>

      {/* ================================================= */}
      {/* MADOU — PHOTO + BIO */}
      {/* ================================================= */}

      <section
        id="madou"
        className="border-t border-black bg-black px-5 py-20 text-[#f4f3ef] md:px-10 md:py-28"
      >
        <div className="mx-auto grid max-w-[1400px] gap-12 md:grid-cols-[0.75fr_1.25fr] md:gap-20 lg:gap-28">
          {/* PORTRAIT */}

          <div>
            <div className="relative aspect-[4/5] overflow-hidden border border-white/20 bg-[#111]">
              {profilePhoto ? (
                <Image
                  src={profilePhoto}
                  alt="Portrait de Madou, photographe La dramstars"
                  fill
                  sizes="(max-width: 768px) 100vw, 40vw"
                  className="object-cover"
                />
              ) : (
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="-rotate-90 text-[9px] uppercase tracking-[0.25em] text-white/25">
                    Portrait à venir
                  </span>
                </div>
              )}

              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent px-4 pb-4 pt-24">
                <div className="flex items-end justify-between gap-4 border-t border-white/30 pt-3 text-[8px] uppercase tracking-[0.15em] text-white/70">
                  <span>
                    Madou
                    <br />
                    LADRAMSTARS
                  </span>

                  <span className="text-right">
                    © Camille Haddad
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* BIOGRAPHIE */}

          <div className="flex flex-col justify-center">
            <p className="mb-10 max-w-3xl text-2xl font-bold leading-[1.15] tracking-[-0.04em] md:text-4xl">
              Une rupture et une confrontation
              directe avec deux mondes que je ne
              connaissais pas.
            </p>

            <div className="max-w-3xl space-y-6 text-sm leading-7 text-white/65 md:text-base md:leading-8">
              <p>
                Je m&apos;appelle Madou et je
                suis né en 1984. Je raconte mon
                histoire. J&apos;ai vécu en
                Seine-Saint-Denis jusqu&apos;à
                mes 14 ans, puis mes parents ont
                décidé de m&apos;envoyer vivre
                au Sénégal, mon pays
                d&apos;ascendance.
              </p>

              <p>
                L&apos;intégration passe par une
                longue phase d&apos;observation
                réciproque. Je découvre alors
                une nouvelle façon de vivre.
              </p>

              <p>
                Je commence à documenter ma vie
                avec des appareils photo
                jetables envoyés par ma famille
                restée en France. Cette période
                m&apos;a façonné et, à mon
                retour en Seine-Saint-Denis, je
                continue à photographier.
              </p>

              <p>
                Après un premier parcours
                professionnel fait de petits
                jobs, en 2009 je deviens
                animateur socioculturel tout en
                développant un travail
                photographique autobiographique.
              </p>

              <p>
                Mon travail est essentiellement
                axé sur les questions
                identitaires en banlieue et
                ailleurs.
              </p>
            </div>

            <Link
              href="/histoire"
              className="mt-10 w-fit border-b border-white/50 pb-1 text-[9px] uppercase tracking-[0.16em] text-white/60 transition-colors hover:border-white hover:text-white"
            >
              Lire mon histoire →
            </Link>
          </div>
        </div>
      </section>

      {/* ================================================= */}
      {/* LES 3 SÉRIES */}
      {/* ================================================= */}

      <section
        id="travaux"
        className="border-t border-black px-5 py-20 md:px-10 md:py-28"
      >
        <div className="mx-auto max-w-[1600px]">
          <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-3">
            {photoSeries.map(
              (serie, index) => {
                const seriesPhoto =
                  seriesPhotos[serie.slug];

                return (
                  <Link
                    key={serie.slug}
                    href={`/series/${serie.slug}`}
                    className={`group block ${
                      index === 1
                        ? "md:mt-24"
                        : index === 2
                          ? "lg:mt-10"
                          : ""
                    }`}
                  >
                    <article>
                      <div className="relative aspect-[4/5] overflow-hidden bg-black text-white">
                        {/* ================================= */}
                        {/* PHOTO */}
                        {/* ================================= */}

                        {seriesPhoto ? (
                          <Image
                            src={seriesPhoto}
                            alt={`${serie.title} — La dramstars`}
                            fill
                            sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                            className="object-cover"
                          />
                        ) : (
                          <div className="absolute inset-0 flex items-center justify-center">
                            <span className="text-[9px] uppercase tracking-[0.22em] text-white/30">
                              Photographie à venir
                            </span>
                          </div>
                        )}

                        {/* ================================= */}
                        {/* NUMÉRO */}
                        {/* TOUJOURS VISIBLE */}
                        {/* ================================= */}

                        <span className="absolute left-4 top-4 z-40 bg-black/60 px-2 py-1 text-[9px] uppercase tracking-[0.15em] text-white backdrop-blur-sm">
                          {serie.number} /{" "}
                          {serie.acronym}
                        </span>

                        {/* ================================= */}
                        {/* SMARTPHONE + TABLETTE */}
                        {/* PAS D'OVERLAY */}
                        {/* ================================= */}

                        <div className="absolute inset-x-0 bottom-0 z-30 bg-gradient-to-t from-black via-black/85 via-65% to-transparent px-5 pb-5 pt-32 lg:hidden">
                          {/* TITRE */}

                          <p className="text-lg font-bold leading-tight tracking-[-0.04em] sm:text-xl">
                            {serie.title}
                          </p>

                          {/* DESCRIPTION */}

                          <p className="mt-3 max-w-lg text-[11px] leading-5 text-white/75 sm:text-xs sm:leading-5 md:text-sm md:leading-6">
                            {serie.description}
                          </p>

                          {/* SMARTPHONE UNIQUEMENT */}

                          <div className="mt-5 flex items-center justify-between border-t border-white/25 pt-4 sm:hidden">
                            <span className="text-[8px] uppercase tracking-[0.17em] text-white/75">
                              Découvrir la série
                            </span>

                            <span className="text-sm text-white">
                              →
                            </span>
                          </div>
                        </div>

                        {/* ================================= */}
                        {/* DESKTOP */}
                        {/* ÉTAT NORMAL */}
                        {/* ================================= */}

                        <div className="absolute inset-x-0 bottom-0 z-30 hidden bg-gradient-to-t from-black/90 via-black/50 to-transparent p-4 pt-24 text-white transition-opacity duration-500 group-hover:opacity-0 lg:block">
                          <p className="text-xl font-bold leading-tight tracking-[-0.04em]">
                            {serie.title}
                          </p>

                          <div className="mt-3 flex justify-between text-[8px] uppercase tracking-[0.14em] text-white/65">
                            <span>
                              {serie.acronym}
                            </span>

                            <span>
                              Ouvrir →
                            </span>
                          </div>
                        </div>

                        {/* ================================= */}
                        {/* DESKTOP */}
                        {/* OVERLAY AU HOVER */}
                        {/* ================================= */}

                        <div className="absolute inset-0 z-20 hidden items-center bg-[#713126]/0 px-7 opacity-0 backdrop-blur-0 transition-all duration-700 ease-out group-hover:bg-[#713126]/85 group-hover:opacity-100 group-hover:backdrop-blur-[1px] lg:flex">
                          <div className="translate-y-5 transition-transform duration-700 ease-out group-hover:translate-y-0">
                            <p className="mb-4 text-[8px] uppercase tracking-[0.2em] text-white/55">
                              {serie.number} /{" "}
                              {serie.acronym}
                            </p>

                            <p className="max-w-sm text-lg font-bold leading-7 tracking-[-0.025em] text-white">
                              {serie.description}
                            </p>

                            <div className="mt-6 flex items-center gap-3 text-[8px] uppercase tracking-[0.17em] text-white/65">
                              <span>
                                Découvrir la série
                              </span>

                              <span className="transition-transform duration-500 group-hover:translate-x-1">
                                →
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </article>
                  </Link>
                );
              },
            )}
          </div>
        </div>
      </section>

      {/* ================================================= */}
      {/* FOOTER */}
      {/* ================================================= */}

      <footer className="border-t border-black px-5 md:px-10">
        <div className="mx-auto flex max-w-[1600px] items-center justify-between py-6 text-[9px] uppercase tracking-[0.14em]">
          <span>
            LADRAMSTARS © 2026
          </span>

          <span>
            Photographie urbaine
          </span>
        </div>
      </footer>
    </main>
  );
}