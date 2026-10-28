import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

import { saintPaulPhotos } from "@/data/photo-map";

export const metadata: Metadata = {
  title: "Église Saint Paul — Album photographique",
  description:
    "Album chronologique des photographies réalisées à l’Église Saint Paul.",
};

export default function SaintPaulAlbumPage() {
  return (
    <main className="min-h-screen bg-[#f4f3ef] text-black">
      <section className="border-b border-black px-5 py-8 md:px-10 md:py-12">
        <div className="mx-auto max-w-[1500px]">
          <Link
            href="/ou-je-suis"
            className="text-[8px] uppercase tracking-[0.17em] text-black/50 transition-opacity hover:opacity-55"
          >
            ← Retour à la carte
          </Link>
          <p className="mt-10 text-[8px] uppercase tracking-[0.2em] text-black/45">
            Lieu collectif / Album chronologique
          </p>
          <h1 className="mt-3 max-w-5xl text-4xl font-bold uppercase leading-[0.9] tracking-[-0.06em] md:text-6xl">
            Église Saint Paul
          </h1>
          <div className="mt-8 flex flex-wrap justify-between gap-3 border-t border-black/20 pt-4 text-[8px] uppercase tracking-[0.16em] text-black/55">
            <span>48.9470, 2.5095</span>
            <span>{saintPaulPhotos.length} photographies</span>
          </div>
        </div>
      </section>

      <section className="px-4 py-10 md:px-10 md:py-14">
        <div className="mx-auto grid max-w-[1400px] gap-5 sm:grid-cols-2">
          {saintPaulPhotos.map((photo, index) => (
            <Link
              key={photo.id}
              href={photo.href}
              className="group border border-black bg-[#f4f3ef]"
            >
              <div className="relative aspect-[3/2] overflow-hidden bg-black">
                <Image
                  src={photo.src}
                  alt={`Archive ${photo.series.toUpperCase()} ${String(photo.photoNumber).padStart(2, "0")}`}
                  fill
                  sizes="(max-width: 640px) 100vw, 50vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-[1.02]"
                />
                <span className="absolute left-3 top-3 bg-black px-2 py-1 text-[7px] uppercase tracking-[0.16em] text-[#f4f3ef]">
                  {String(index + 1).padStart(2, "0")}
                </span>
              </div>
              <div className="flex justify-between gap-3 p-3 text-[8px] uppercase tracking-[0.14em]">
                <span>
                  {photo.series.toUpperCase()} / {String(photo.photoNumber).padStart(2, "0")}
                </span>
                <span className="text-black/55">
                  {photo.date} — {photo.time}
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}
