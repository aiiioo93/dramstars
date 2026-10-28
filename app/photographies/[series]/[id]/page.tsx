import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

import {
  getPersonalPhotoPoint,
  personalPhotoPoints,
} from "@/data/photo-map";

type PhotoPageProps = {
  params: Promise<{ series: string; id: string }>;
};

export function generateStaticParams() {
  return personalPhotoPoints.map((point) => ({
    series: point.series,
    id: String(point.photoNumber).padStart(2, "0"),
  }));
}

export async function generateMetadata({
  params,
}: PhotoPageProps): Promise<Metadata> {
  const { series, id } = await params;
  const point = getPersonalPhotoPoint(series, id);

  if (!point) {
    return {};
  }

  return {
    title: `Photographie ${point.series.toUpperCase()} ${id}`,
    description: `Photographie ${point.series.toUpperCase()} prise le ${point.date} à ${point.time}.`,
  };
}

export default async function PersonalPhotoPage({
  params,
}: PhotoPageProps) {
  const { series, id } = await params;
  const point = getPersonalPhotoPoint(series, id);

  if (!point) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-[#f4f3ef] text-black">
      <section className="px-5 py-8 md:px-10 md:py-12">
        <div className="mx-auto max-w-[1100px]">
          <div className="mb-8 flex items-center justify-between border-b border-black/20 pb-3 text-[8px] uppercase tracking-[0.17em] text-black/50">
            <Link
              href="/ou-je-suis"
              className="transition-opacity hover:opacity-55"
            >
              ← Retour à la carte
            </Link>
            <span>
              {point.series.toUpperCase()} / {id}
            </span>
          </div>

          <header className="mb-7">
            <p className="text-[8px] uppercase tracking-[0.2em] text-black/45">
              Archive photographique
            </p>
            <h1 className="mt-2 text-2xl font-bold uppercase tracking-[-0.045em] md:text-4xl">
              Photographie {point.series.toUpperCase()} / {id}
            </h1>
          </header>

          <figure>
            <div className="relative overflow-hidden border border-black bg-black">
              <Image
                src={point.src}
                alt={`Photographie ${point.series.toUpperCase()} ${id}, archive DRAMSTARS`}
                width={point.width}
                height={point.height}
                priority
                sizes="(max-width: 1200px) 100vw, 1100px"
                className="h-auto max-h-[76svh] w-full object-contain"
              />
              <span className="absolute left-3 top-3 h-2 w-2 rounded-full bg-[#ff3b18]" />
            </div>
            <figcaption className="mt-4 flex flex-wrap justify-between gap-2 border-b border-black/20 pb-4 text-[9px] uppercase tracking-[0.16em] text-black/60">
              <span>{point.date}</span>
              <span>{point.time}</span>
            </figcaption>
          </figure>
        </div>
      </section>
    </main>
  );
}
