export const metadata = {
  title: "À propos",
};

export default function AProposPage() {
  return (
    <main className="min-h-[calc(100svh-64px)] bg-black text-[#f4f3ef]">
      <section className="mx-auto max-w-[1600px] px-5 py-16 md:px-10 md:py-24">
        <div className="border-b border-white/30 pb-8">
          <div className="mb-6 flex justify-between text-[9px] uppercase tracking-[0.18em] text-white/50">
            <span>La dramstars</span>
            <span>Madou / 1984</span>
          </div>

          <h1 className="text-5xl font-bold uppercase leading-[0.85] tracking-[-0.07em] md:text-8xl lg:text-9xl">
            À propos
          </h1>
        </div>

        <div className="mt-16 grid gap-16 lg:grid-cols-[0.65fr_1.35fr]">
          {/* FUTUR PORTRAIT */}
          <div>
            <div className="sticky top-24 aspect-[4/5] overflow-hidden border border-white/25 bg-[#111]">
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="-rotate-90 text-[9px] uppercase tracking-[0.25em] text-white/25">
                  Portrait à venir
                </span>
              </div>

              <div className="absolute bottom-4 left-4 right-4 flex justify-between border-t border-white/20 pt-3 text-[8px] uppercase tracking-[0.15em] text-white/40">
                <span>Madou</span>
                <span>La dramstars</span>
              </div>
            </div>
          </div>

          {/* TEXTE */}
          <div className="max-w-3xl">
            <p className="mb-12 text-2xl font-bold leading-[1.2] tracking-[-0.04em] md:text-4xl">
              Une rupture et une confrontation directe avec deux mondes que je
              ne connaissais pas.
            </p>

            <div className="space-y-8 text-sm leading-7 text-white/70 md:text-base md:leading-8">
              <p>
                Je m&apos;appelle Madou et je suis né en 1984. Je raconte mon
                histoire. J&apos;ai vécu en Seine-Saint-Denis jusqu&apos;à mes
                14 ans. puis mes parents ont décidé de m&apos;envoyer vivre au
                Sénégal, mon pays d&apos;ascendance.
              </p>

              <p>
                L&apos;intégration passe par une longue phase d&apos;observation
                réciproque. Je découvre alors de une nouvelle façon de vivre.
              </p>

              <p>
                Je commence à documenter ma vie avec des appareils photo
                jetables envoyés par ma famille restée en France. Cette période
                m&apos;a façonné et à mon retour en Seine-Saint-Denis je
                continue à photographier.
              </p>

              <p>
                Après un premier parcours professionnel fait de petits jobs, en
                2009 je deviens animateur socioculturel tout en développant un
                travail photographique autobiographique.
              </p>

              <p className="border-l border-white pl-6 text-white">
                Mon travail est essentiellement axé sur les questions
                identitaires en banlieue et ailleurs.
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}