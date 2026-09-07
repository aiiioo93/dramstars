import Link from "next/link";

export const metadata = {
  title: "La lettre — D'où je viens",
  description:
    "Document d'archive du chapitre D'où je viens — La dramstars.",
  robots: {
    index: false,
    follow: false,
  },
};

export default function LettrePage() {
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
                Chapitre II / Archive
              </p>

              <h1 className="text-3xl font-bold uppercase leading-[0.9] tracking-[-0.06em] md:text-5xl">
                La lettre
              </h1>
            </div>

            <Link
              href="/d-ou-je-viens"
              className="text-[8px] uppercase tracking-[0.17em] text-black/45 transition-opacity duration-300 hover:opacity-50"
            >
              ← Retour
            </Link>
          </div>
        </div>
      </section>

      {/* ================================================= */}
      {/* DOCUMENT + TRANSCRIPTION */}
      {/* ================================================= */}

      <section className="px-5 py-10 md:px-10 md:py-16">
        <div className="mx-auto max-w-[1400px]">
          <div className="mb-5 flex items-center justify-between border-b border-black/20 pb-3 text-[7px] uppercase tracking-[0.18em] text-black/40">
            <span>Fac-similé / Transcription</span>
            <span>Document personnel</span>
          </div>

          <div className="grid gap-10 lg:grid-cols-2 lg:gap-14">
            {/* ================================================= */}
            {/* FAC-SIMILÉ */}
            {/* ================================================= */}

            <div>
              <p className="mb-3 text-[8px] uppercase tracking-[0.18em] text-black/40">
                Document original
              </p>

              <div className="flex min-h-[720px] items-center justify-center border border-black/15 bg-white">
                <div className="max-w-sm px-8 text-center">
                  <p className="text-[9px] uppercase tracking-[0.22em] text-black/35">
                    Fac-similé à venir
                  </p>

                  <p className="mt-4 text-[8px] leading-5 tracking-[0.1em] text-black/30">
                    Le scan haute résolution caviardé sera affiché ici.
                  </p>
                </div>
              </div>
            </div>

            {/* ================================================= */}
            {/* TRANSCRIPTION */}
            {/* ================================================= */}

            <div>
              <p className="mb-3 text-[8px] uppercase tracking-[0.18em] text-black/40">
                Transcription
              </p>

              <article className="min-h-[720px] border border-black/15 bg-[#f4f3ef] p-6 md:p-10">
                <div className="space-y-7 text-sm leading-7 text-black/70 md:text-base md:leading-8">
                  <p className="text-black/40">
                    La transcription définitive sera ajoutée à partir du document original.
                  </p>

                  {/* EXEMPLE DE CAVIARDAGE VISUEL */}

                  <div className="space-y-3 opacity-50">
                    <div className="h-4 w-40 bg-black" />
                    <div className="h-4 w-64 bg-black" />
                  </div>

                  <p className="text-black/35">
                    Les passages masqués dans le fac-similé seront également représentés
                    par des barres pleines dans la transcription.
                  </p>
                </div>

                {/* ================================================= */}
                {/* FIN DU DOCUMENT */}
                {/* ================================================= */}

                <div className="mt-20 border-t border-black/15 pt-5">
                  <p className="text-[8px] uppercase leading-5 tracking-[0.16em] text-black/35">
                    Le document s&apos;arrête au milieu d&apos;une phrase.
                    <br />
                    Aucun contenu ne sera reconstitué ou complété.
                  </p>
                </div>
              </article>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}