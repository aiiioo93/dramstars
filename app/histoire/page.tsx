import Image from "next/image";
import Link from "next/link";

import { findPhoto } from "@/lib/photo-files";

export const metadata = {
  title: "Mon histoire",
  description:
    "L’histoire de Madou, photographe derrière La dramstars.",
};

export default function HistoirePage() {
  const profilePhoto = findPhoto("profil");

  return (
    <main className="min-h-[calc(100svh-64px)] bg-black text-[#f4f3ef]">
      {/* TITRE */}
      <section className="border-b border-white/20 px-5 py-16 md:px-10 md:py-24">
        <div className="mx-auto max-w-[1600px]">
          <div className="mb-8 flex justify-between text-[9px] uppercase tracking-[0.18em] text-white/45">
            <span>LADRAMSTARS</span>
            <span>Madou / 1984</span>
          </div>

          <h1 className="text-[clamp(4rem,11vw,10rem)] font-bold uppercase leading-[0.8] tracking-[-0.08em]">
            Mon
            <br />
            histoire.
          </h1>
        </div>
      </section>

      {/* HISTOIRE */}
      <section className="px-5 py-20 md:px-10 md:py-28">
        <div className="mx-auto grid max-w-[1400px] gap-16 lg:grid-cols-[0.75fr_1.25fr] lg:gap-28">
          {/* PORTRAIT */}
          <div>
            <div className="sticky top-24">
              <div className="relative aspect-[4/5] overflow-hidden bg-[#111]">
                {profilePhoto ? (
                  <Image
                    src={profilePhoto}
                    alt="Portrait de Madou, photographe La dramstars"
                    fill
                    priority
                    sizes="(max-width: 1024px) 100vw, 40vw"
                    className="object-cover"
                  />
                ) : (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="-rotate-90 text-[9px] uppercase tracking-[0.25em] text-white/25">
                      Portrait à venir
                    </span>
                  </div>
                )}

                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/90 to-transparent px-4 pb-4 pt-24">
                  <div className="flex justify-between border-t border-white/30 pt-3 text-[8px] uppercase tracking-[0.14em] text-white/70">
                    <span>Madou / LADRAMSTARS</span>
                    <span>© Camille Haddad</span>
                  </div>
                </div>
              </div>

              <div className="mt-4 flex justify-between text-[8px] uppercase tracking-[0.15em] text-white/40">
                <span>Seine-Saint-Denis</span>
                <span>Sénégal</span>
              </div>
            </div>
          </div>

          {/* TEXTE */}
          <article className="max-w-3xl">
            <p className="mb-14 text-3xl font-bold leading-[1.1] tracking-[-0.045em] md:text-5xl">
              Une rupture et une confrontation directe avec deux mondes que je
              ne connaissais pas.
            </p>

            <div className="space-y-10 text-sm leading-8 text-white/70 md:text-lg md:leading-9">
              <p>
                Je m&apos;appelle Madou et je suis né en 1984. Je raconte mon
                histoire. J&apos;ai vécu en Seine-Saint-Denis jusqu&apos;à mes
                14 ans. Puis mes parents ont décidé de m&apos;envoyer vivre au
                Sénégal, mon pays d&apos;ascendance.
              </p>

              <p>
                L&apos;intégration passe par une longue phase d&apos;observation
                réciproque. Je découvre alors une nouvelle façon de vivre.
              </p>

              <p>
                Je commence à documenter ma vie avec des appareils photo
                jetables envoyés par ma famille restée en France.
              </p>

              <p>
                Cette période m&apos;a façonné et, à mon retour en
                Seine-Saint-Denis, je continue à photographier.
              </p>

              <p>
                Après un premier parcours professionnel fait de petits jobs, en
                2009 je deviens animateur socioculturel tout en développant un
                travail photographique autobiographique.
              </p>

              <p className="text-xl font-bold leading-8 text-white md:text-3xl md:leading-10">
                Mon travail est essentiellement axé sur les questions
                identitaires en banlieue et ailleurs.
              </p>
            </div>

            <div className="mt-20 border-t border-white/20 pt-6">
              <Link
                href="/"
                className="text-[9px] uppercase tracking-[0.18em] text-white/60 transition-colors hover:text-white"
              >
                ← Retour à l&apos;accueil
              </Link>
            </div>
          </article>
        </div>
      </section>
    </main>
  );
}