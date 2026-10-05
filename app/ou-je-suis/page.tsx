import type { Metadata } from "next";

import RueMap, {
  type RueMapPoint,
  type RueMapReferencePoint,
} from "@/components/RueMap";
import { rueRecits } from "@/data/photos/rue";

const originPoint: RueMapReferencePoint = {
  lat: 48.9449,
  lng: 2.5157,
  previewSrc: "/Photos/profil.jpg",
  focalPoint: "50% 32%",
};

export const metadata: Metadata = {
  title: "Où je suis — Carte photographique",
  description:
    "Carte photographique des personnes et des récits de LADRAMSTARS.",
};

export default function OuJeSuisPage() {
  const points: RueMapPoint[] = rueRecits.map((recit, index) => ({
    index,
    slug: recit.slug,
    people: [recit.personne],
    lat: Number(recit.gps.lat.toFixed(4)),
    lng: Number(recit.gps.lng.toFixed(4)),
    kind: "story",
    series: "rue",
    href: `/series/rue/${recit.slug}`,
    previewSrc: `/Photos/series/rue/${recit.slug}/${recit.couverture}`,
  }));

  return (
    <main className="min-h-screen bg-[#f4f3ef] text-black">
      <section className="border-b border-black">
        <div className="mx-auto max-w-[1600px] px-5 py-8 md:px-10 md:py-10">
          <p className="mb-3 text-[8px] uppercase tracking-[0.2em] text-black/45">
            Chapitre I / Territoires / 35 MM
          </p>
          <h1 className="max-w-5xl text-3xl font-bold uppercase leading-[0.9] tracking-[-0.06em] md:text-5xl lg:text-6xl">
            Où je suis
          </h1>
          <div className="mt-8 grid gap-5 border-t border-black/20 pt-4 text-[8px] leading-5 tracking-[0.08em] text-black/55 md:grid-cols-[1fr_280px]">
            <p className="max-w-2xl">
              Les personnes sont nommées. Les lieux ne le sont pas. La carte
              montre les récits et les photographies sans exposer les adresses
              qui les ont fait naître.
            </p>
            <p className="uppercase tracking-[0.16em] text-black md:text-right">
              Carte photographique
            </p>
          </div>
        </div>
      </section>

      <section className="px-4 py-8 md:px-10 md:py-12">
        <div className="mx-auto max-w-[1500px]">
          <div className="mb-2 flex items-end justify-between border-b border-black/20 pb-2">
            <div>
              <p className="text-[7px] uppercase tracking-[0.2em] text-black/40">
                Carte épurée / MapLibre
              </p>
              <p className="mt-1 text-xs font-bold uppercase tracking-[0.08em]">
                Bâti et végétal
              </p>
            </div>
            <span className="text-right text-[7px] uppercase tracking-[0.18em] text-black/40">
              Zoom libre / Aucun lieu nommé
            </span>
          </div>

          <RueMap points={points} referencePoint={originPoint} />
        </div>
      </section>
    </main>
  );
}
