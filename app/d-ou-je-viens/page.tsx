import Image from "next/image";
import Link from "next/link";

import { chapitreSections } from "@/data/d-ou-je-viens";

export const metadata = {
  title: "D'où je viens",
  description:
    "Chapitre autobiographique de Madou Dramé — La dramstars.",
  robots: {
    index: false,
    follow: false,
  },
};

export default function DOuJeViensPage() {
  return (
    <main className="overflow-hidden bg-[#f4f3ef] text-black">
      {/* ================================================= */}
      {/* 01 — LA LETTRE */}
      {/* ================================================= */}

      <section className="relative min-h-[calc(100svh-64px)] bg-black px-5 py-8 text-[#f4f3ef] md:px-10 md:py-12">
        {/* REPÈRES */}

        <div className="mx-auto flex max-w-[1500px] items-center justify-between border-b border-white/20 pb-3 text-[7px] uppercase tracking-[0.22em] text-white/40">
          <span>Archive personnelle / 001</span>

          <span>Chapitre II</span>
        </div>

        {/* DOCUMENT */}

        <div className="mx-auto grid min-h-[calc(100svh-150px)] max-w-[1500px] items-center gap-10 py-10 lg:grid-cols-[0.32fr_0.68fr]">
          {/* TEXTE LATÉRAL */}

          <div className="flex h-full flex-col justify-between">
            <div>
              <span className="mb-6 block h-[7px] w-[7px] rounded-full bg-[#ff3b18]" />

              <p className="max-w-[240px] text-[9px] uppercase leading-5 tracking-[0.18em] text-white/45">
                Un document retrouvé.
                <br />
                Une histoire qui commence
                avant les photographies.
              </p>
            </div>

            <div className="hidden lg:block">
              <p className="text-[7px] uppercase leading-5 tracking-[0.18em] text-white/30">
                LADRAMSTARS
                <br />
                ARCHIVES / 35 MM
                <br />
                SEINE-SAINT-DENIS
              </p>
            </div>
          </div>

          {/* FAUSSE FEUILLE */}

          <Link
            href="/d-ou-je-viens/lettre"
            className="group relative mx-auto block w-full max-w-[760px]"
          >
            <div className="absolute -left-3 -top-3 h-8 w-8 border-l border-t border-white/25" />
            <div className="absolute -bottom-3 -right-3 h-8 w-8 border-b border-r border-white/25" />

            <div className="relative aspect-[0.72] overflow-hidden bg-[#f4f3ef] text-black shadow-[0_30px_80px_rgba(0,0,0,0.45)] transition-transform duration-700 ease-out group-hover:-translate-y-1">
              <div className="absolute inset-x-0 top-0 flex items-center justify-between border-b border-black/10 px-5 py-4 text-[7px] uppercase tracking-[0.2em] text-black/35">
                <span>Document original</span>
                <span>Fac-similé</span>
              </div>

              <div className="flex h-full items-center justify-center px-8">
                <div className="text-center">
                  <p className="text-[9px] uppercase tracking-[0.25em] text-black/35">
                    Lettre à venir
                  </p>

                  <div className="mx-auto mt-8 h-px w-20 bg-black/20" />

                  <p className="mt-8 text-[8px] uppercase leading-5 tracking-[0.14em] text-black/25">
                    Scan haute résolution
                    <br />
                    archive familiale
                  </p>
                </div>
              </div>

              <div className="absolute bottom-5 left-5 right-5 flex items-end justify-between">
                <span className="h-[6px] w-[6px] rounded-full bg-[#ff3b18]" />

                <span className="text-[7px] uppercase tracking-[0.18em] text-black/35">
                  Ouvrir le document →
                </span>
              </div>
            </div>
          </Link>
        </div>
      </section>

      {/* ================================================= */}
      {/* 02 — TITRE */}
      {/* ================================================= */}

      <section className="relative border-b border-black px-5 py-20 md:px-10 md:py-28 lg:py-36">
        <div className="mx-auto max-w-[1500px]">
          <div className="mb-10 flex items-center justify-between text-[7px] uppercase tracking-[0.2em] text-black/35">
            <span>02 / Récit autobiographique</span>
            <span>1984 — …</span>
          </div>

          <h1 className="max-w-[1300px] text-[16vw] font-bold uppercase leading-[0.72] tracking-[-0.085em] sm:text-[13vw] lg:text-[11vw]">
            D&apos;où
            <br />
            je viens.
          </h1>

          <div className="mt-12 flex justify-end md:mt-16">
            <p className="max-w-[420px] border-t border-black pt-4 text-[9px] uppercase leading-6 tracking-[0.16em] text-black/45">
              Un récit construit à partir
              d&apos;archives, de silences,
              de départs et de retours.
            </p>
          </div>
        </div>
      </section>

      {/* ================================================= */}
      {/* 03 — OUVERTURE */}
      {/* ================================================= */}

      <section className="px-5 py-20 md:px-10 md:py-28">
        <div className="mx-auto grid max-w-[1400px] gap-12 lg:grid-cols-[260px_1fr]">
          <div>
            <span className="mb-5 block h-[6px] w-[6px] rounded-full bg-[#ff3b18]" />

            <p className="text-[8px] uppercase leading-5 tracking-[0.2em] text-black/40">
              Ouverture
              <br />
              Archive personnelle
            </p>
          </div>

          <div className="max-w-[850px]">
            <p className="text-2xl font-bold leading-[1.15] tracking-[-0.04em] text-black/20 md:text-4xl lg:text-5xl">
              Le texte d&apos;ouverture prendra
              place ici lorsque les archives et
              les mots auront été définitivement
              validés.
            </p>
          </div>
        </div>
      </section>

      {/* ================================================= */}
      {/* 04 — CHRONOLOGIE */}
      {/* ================================================= */}

      <section>
        {chapitreSections.map((section, index) => {
          const isSilence =
            section.id === "2001-2013";

          return (
            <section
              key={section.id}
              className={
                isSilence
                  ? "relative flex min-h-[90svh] items-center border-t border-white/20 bg-black px-5 py-24 text-[#f4f3ef] md:px-10 md:py-32"
                  : "relative border-t border-black px-5 py-20 md:px-10 md:py-28"
              }
            >
              <div className="mx-auto w-full max-w-[1500px]">
                {/* NUMÉRO SECTION */}

                <div
                  className={`mb-12 flex items-center justify-between text-[7px] uppercase tracking-[0.2em] ${
                    isSilence
                      ? "text-white/30"
                      : "text-black/35"
                  }`}
                >
                  <span>
                    {String(index + 1).padStart(
                      2,
                      "0",
                    )}{" "}
                    / Chronologie
                  </span>

                  <span>
                    {section.photos.length > 0
                      ? `${section.photos.length} archives`
                      : "—"}
                  </span>
                </div>

                <div className="grid gap-12 lg:grid-cols-[0.42fr_0.58fr]">
                  {/* GRANDE DATE */}

                  <div>
                    <h2
                      className={`text-[15vw] font-bold uppercase leading-[0.72] tracking-[-0.08em] lg:text-[7vw] ${
                        isSilence
                          ? "text-white"
                          : "text-black"
                      }`}
                    >
                      {section.periode}
                    </h2>

                    {isSilence && (
                      <p className="mt-8 text-[8px] uppercase tracking-[0.22em] text-white/30">
                        Le silence
                      </p>
                    )}
                  </div>

                  {/* CONTENU */}

                  <div className="lg:pt-3">
                    {section.texte.length > 0 && (
                      <div
                        className={`max-w-3xl space-y-8 ${
                          isSilence
                            ? "text-white/75"
                            : "text-black/70"
                        }`}
                      >
                        {section.texte.map(
                          (paragraph, paragraphIndex) => (
                            <p
                              key={paragraphIndex}
                              className="text-base leading-8 md:text-lg md:leading-9"
                            >
                              {paragraph}
                            </p>
                          ),
                        )}
                      </div>
                    )}

                    {/* LIEN */}

                    {section.lienInterne && (
                      <div className="mt-16">
                        <Link
                          href={
                            section.lienInterne.href
                          }
                          className={`group inline-flex items-center gap-4 border-b pb-2 text-[9px] uppercase tracking-[0.22em] transition-opacity duration-300 hover:opacity-50 ${
                            isSilence
                              ? "border-white/30 text-white"
                              : "border-black/30 text-black"
                          }`}
                        >
                          <span className="h-[6px] w-[6px] rounded-full bg-[#ff3b18]" />

                          {
                            section.lienInterne
                              .libelle
                          }

                          <span className="transition-transform duration-300 group-hover:translate-x-1">
                            →
                          </span>
                        </Link>
                      </div>
                    )}

                    {/* PHOTOS */}

                    {section.photos.length > 0 && (
                      <div className="mt-20 space-y-28 md:mt-28 md:space-y-40">
                        {section.photos.map(
                          (photo, photoIndex) => (
                            <figure
                              key={`${section.id}-${photo.src}-${photoIndex}`}
                              className="relative"
                            >
                              <div className="absolute -left-3 -top-3 z-10 text-[7px] uppercase tracking-[0.18em] text-black/35">
                                {String(
                                  photoIndex + 1,
                                ).padStart(
                                  2,
                                  "0",
                                )}
                              </div>

                              <Image
                                src={photo.src}
                                alt={photo.alt}
                                width={1600}
                                height={2000}
                                sizes="(max-width: 1200px) 100vw, 900px"
                                className="h-auto w-full"
                              />
                            </figure>
                          ),
                        )}
                      </div>
                    )}
                  </div>
                </div>

                {/* GRAND REPÈRE DE FOND SUR SILENCE */}

                {isSilence && (
                  <div className="pointer-events-none absolute bottom-6 right-5 text-[16vw] font-bold leading-none tracking-[-0.08em] text-white/[0.025] md:right-10">
                    12 ANS
                  </div>
                )}
              </div>
            </section>
          );
        })}
      </section>

      {/* ================================================= */}
      {/* FIN */}
      {/* ================================================= */}

      <section className="border-t border-black bg-[#713126] px-5 py-20 text-[#f4f3ef] md:px-10 md:py-28">
        <div className="mx-auto flex max-w-[1500px] items-end justify-between gap-10">
          <div>
            <p className="mb-4 text-[8px] uppercase tracking-[0.2em] text-white/45">
              LADRAMSTARS / Chapitre II
            </p>

            <p className="text-3xl font-bold uppercase leading-[0.9] tracking-[-0.05em] md:text-6xl">
              À suivre.
            </p>
          </div>

          <span className="h-[8px] w-[8px] shrink-0 rounded-full bg-[#ff3b18]" />
        </div>
      </section>
    </main>
  );
}