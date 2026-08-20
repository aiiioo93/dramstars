import fs from "node:fs";
import path from "node:path";

import Image from "next/image";
import Link from "next/link";

import HeroCarousel from "@/components/HeroCarousel";
import { photoSeries } from "@/lib/series";

const allowedExtensions = [".jpg", ".jpeg", ".png", ".webp", ".avif"];

type PhotosConfig = {
  directory: string;
  publicPath: string;
};

function getPhotosConfig(): PhotosConfig {
  const folders = [
    {
      directory: path.join(process.cwd(), "public", "Photos"),
      publicPath: "/Photos",
    },
    {
      directory: path.join(process.cwd(), "public", "photos"),
      publicPath: "/photos",
    },
  ];

  const existingFolder = folders.find((folder) =>
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

  const photo = fs.readdirSync(photosConfig.directory).find((file) => {
    const extension = path.extname(file).toLowerCase();
    const fileName = path.basename(file, extension).toLowerCase();

    return (
      allowedExtensions.includes(extension) &&
      fileName === photoName.toLowerCase()
    );
  });

  if (!photo) {
    return null;
  }

  return `${photosConfig.publicPath}/${encodeURIComponent(photo)}`;
}

function getHeroPhotos(photosConfig: PhotosConfig) {
  if (!fs.existsSync(photosConfig.directory)) {
    return [];
  }

  const reservedPhotos = ["profil", "zup", "lsb", "rue"];

  return fs
    .readdirSync(photosConfig.directory)
    .filter((file) => {
      const extension = path.extname(file).toLowerCase();
      const fileName = path.basename(file, extension).toLowerCase();

      return (
        allowedExtensions.includes(extension) &&
        !reservedPhotos.includes(fileName)
      );
    })
    .sort((a, b) => a.localeCompare(b, undefined, { numeric: true }))
    .map(
      (file) => `${photosConfig.publicPath}/${encodeURIComponent(file)}`,
    );
}

export default function Home() {
  const photosConfig = getPhotosConfig();

  const heroPhotos = getHeroPhotos(photosConfig);

  const profilePhoto = getPhotoByName(photosConfig, "profil");

  const seriesPhotos: Record<string, string | null> = {
    zup: getPhotoByName(photosConfig, "zup"),
    lsb: getPhotoByName(photosConfig, "lsb"),
    rue: getPhotoByName(photosConfig, "rue"),
  };

  return (
    <main className="bg-[#f4f3ef] text-[#0a0a0a]">
      {/* ================================================= */}
      {/* HERO */}
      {/* ================================================= */}

      <section className="mx-auto grid h-[calc(100svh-64px)] max-w-[1600px] grid-rows-[1.1fr_0.9fr] overflow-hidden lg:grid-cols-[0.85fr_1.15fr] lg:grid-rows-1">
        {/* TEXTE HERO */}
        <div className="flex min-h-0 flex-col justify-between border-black p-5 md:p-8 lg:border-r lg:p-10">
          <div className="flex justify-between text-[9px] leading-relaxed tracking-[0.14em] md:text-[10px]">
            <p>
              Photographie urbaine
              <br />
              La dramstars
            </p>

            <p className="text-right">
              Seine-Saint-Denis
              <br />
              France
            </p>
          </div>

          <div>
            <p className="mb-3 text-[9px] uppercase tracking-[0.18em] md:mb-5 md:text-xs">
              [ Regard urbain ]
            </p>

            <h1 className="text-[clamp(3.2rem,9vw,8rem)] font-bold uppercase leading-[0.77] tracking-[-0.08em]">
              La ville
              <br />
              en état
              <br />
              brut.
            </h1>
          </div>

          <div className="flex items-end justify-between gap-5">
            <p className="max-w-sm text-[10px] leading-4 md:text-sm md:leading-6">
              Une photographie autobiographique tournée vers les questions
              identitaires, la banlieue et les territoires traversés.
            </p>

            <a
              href="#madou"
              className="hidden shrink-0 text-[10px] uppercase tracking-[0.14em] underline underline-offset-4 sm:block md:text-xs"
            >
              Découvrir ↓
            </a>
          </div>
        </div>

        {/* CARROUSEL */}
        <HeroCarousel images={heroPhotos} />
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

              {/* INFORMATIONS SUR LA PHOTO */}
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent px-4 pb-4 pt-24">
                <div className="flex items-end justify-between gap-4 border-t border-white/30 pt-3 text-[8px] uppercase tracking-[0.15em] text-white/70">
                  <span>
                    Madou
                    <br />
                    LADRAMSTARS
                  </span>

                  <span className="text-right">© Camille Haddad</span>
                </div>
              </div>
            </div>
          </div>

          {/* BIOGRAPHIE */}
          <div className="flex flex-col justify-center">
            <p className="mb-10 max-w-3xl text-2xl font-bold leading-[1.15] tracking-[-0.04em] md:text-4xl">
              Une rupture et une confrontation directe avec deux mondes que je
              ne connaissais pas.
            </p>

            <div className="max-w-3xl space-y-6 text-sm leading-7 text-white/65 md:text-base md:leading-8">
              <p>
                Je m&apos;appelle Madou et je suis né en 1984. Je raconte mon
                histoire. J&apos;ai vécu en Seine-Saint-Denis jusqu&apos;à mes
                14 ans, puis mes parents ont décidé de m&apos;envoyer vivre au
                Sénégal, mon pays d&apos;ascendance.
              </p>

              <p>
                L&apos;intégration passe par une longue phase d&apos;observation
                réciproque. Je découvre alors une nouvelle façon de vivre.
              </p>

              <p>
                Je commence à documenter ma vie avec des appareils photo
                jetables envoyés par ma famille restée en France. Cette période
                m&apos;a façonné et, à mon retour en Seine-Saint-Denis, je
                continue à photographier.
              </p>

              <p>
                Après un premier parcours professionnel fait de petits jobs, en
                2009 je deviens animateur socioculturel tout en développant un
                travail photographique autobiographique.
              </p>

              <p>
                Mon travail est essentiellement axé sur les questions
                identitaires en banlieue et ailleurs.
              </p>
            </div>

            <Link
              href="/a-propos"
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
            {photoSeries.map((serie, index) => {
              const seriesPhoto = seriesPhotos[serie.slug];

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
                      {/* PHOTO DE LA SÉRIE */}
                      {seriesPhoto ? (
                        <Image
                          src={seriesPhoto}
                          alt={`${serie.title} — La dramstars`}
                          fill
                          sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                          className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
                        />
                      ) : (
                        <div className="absolute inset-0 flex items-center justify-center">
                          <span className="text-[9px] uppercase tracking-[0.22em] text-white/30">
                            Photographie à venir
                          </span>
                        </div>
                      )}

                      {/* VOILE */}
                      <div className="absolute inset-0 bg-black/10 transition-colors duration-500 group-hover:bg-black/20" />

                      {/* NUMÉRO */}
                      <span className="absolute left-4 top-4 z-10 bg-black/60 px-2 py-1 text-[9px] uppercase tracking-[0.15em] text-white backdrop-blur-sm">
                        {serie.number} / {serie.acronym}
                      </span>

                      {/* TITRE */}
                      <div className="absolute bottom-0 left-0 right-0 z-10 bg-gradient-to-t from-black/90 via-black/50 to-transparent p-4 pt-24 text-white">
                        <p className="text-lg font-bold leading-tight tracking-[-0.04em] md:text-xl">
                          {serie.title}
                        </p>

                        <div className="mt-3 flex justify-between text-[8px] uppercase tracking-[0.14em] text-white/65">
                          <span>{serie.acronym}</span>

                          <span className="transition-transform duration-300 group-hover:translate-x-1">
                            Ouvrir →
                          </span>
                        </div>
                      </div>
                    </div>
                  </article>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* ================================================= */}
      {/* FOOTER */}
      {/* ================================================= */}

      <footer className="border-t border-black px-5 md:px-10">
        <div className="mx-auto flex max-w-[1600px] items-center justify-between py-6 text-[9px] uppercase tracking-[0.14em]">
          <span>LADRAMSTARS © 2026</span>
          <span>Photographie urbaine</span>
        </div>
      </footer>
    </main>
  );
}