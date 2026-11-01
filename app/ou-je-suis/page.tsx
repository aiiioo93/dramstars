import type { Metadata } from "next";

import RueMap, {
  type RueMapPoint,
  type RueMapReferencePoint,
} from "@/components/RueMap";
import {
  personalPhotoPoints,
  saintPaulPhotos,
} from "@/data/photo-map";
import { rueRecits } from "@/data/photos/rue";

const originPoint: RueMapReferencePoint = {
  lat: 48.9449,
  lng: 2.5157,
};

export const metadata: Metadata = {
  title: "Où je suis — PsychoKarta",
  description:
    "PsychoKarta des photographies et des récits de Madou.",
};

type OuJeSuisPageProps = {
  searchParams: Promise<{ series?: string | string[] }>;
};

export default async function OuJeSuisPage({
  searchParams,
}: OuJeSuisPageProps) {
  const requestedSeries = (await searchParams).series;
  const initialSeries =
    requestedSeries === "zup" ||
    requestedSeries === "lsb" ||
    requestedSeries === "rue"
      ? requestedSeries
      : "all";
  const photoPoints: RueMapPoint[] = personalPhotoPoints.map(
    (photo, index) => ({
      id: photo.id,
      index,
      markerLabel: String(photo.photoNumber).padStart(2, "0"),
      sangTitleNumber: photo.sangTitleNumber,
      title: `Sang titre ${photo.sangTitleNumber}`,
      slug: photo.id,
      people: [],
      date: photo.date,
      time: photo.time,
      lat: photo.lat,
      lng: photo.lng,
      kind: "photograph",
      series: photo.series,
      href: photo.href,
      previewSrc: photo.src,
    }),
  );
  const storyPoints: RueMapPoint[] = rueRecits.map((recit, index) => ({
    id: `rue-${recit.slug}`,
    index: photoPoints.length + index,
    markerLabel: String(index + 1).padStart(2, "0"),
    slug: recit.slug,
    people: [recit.personne],
    date: recit.date,
    time: recit.heure,
    lat: Number(recit.gps.lat.toFixed(4)),
    lng: Number(recit.gps.lng.toFixed(4)),
    kind: "story",
    series: "rue",
    href: `/series/rue/${recit.slug}`,
    previewSrc: `/Photos/series/rue/${recit.slug}/${recit.couverture}`,
  }));
  const collectivePoint: RueMapPoint = {
    id: "umc-eglise-saint-paul",
    index: photoPoints.length + storyPoints.length,
    markerLabel: "",
    slug: "eglise-saint-paul",
    people: [],
    title: "Église Saint-Paul",
    lat: 48.947,
    lng: 2.5095,
    kind: "umc",
    memberPointIds: saintPaulPhotos.map((photo) => photo.id),
    href: "/lieux/eglise-saint-paul",
    previewSrc: saintPaulPhotos[0]?.src,
  };
  const points = [...photoPoints, ...storyPoints, collectivePoint];

  return (
    <main className="min-h-screen bg-[#f4f3ef] text-black">
      <section className="border-b border-black">
        <div className="mx-auto max-w-[1600px] px-5 py-8 md:px-10 md:py-10">
          <p className="mb-3 text-[8px] uppercase tracking-[0.2em] text-black/45">
            Chapitre I
          </p>
          <h1 className="max-w-5xl text-3xl font-bold uppercase leading-[0.9] tracking-[-0.06em] md:text-5xl lg:text-6xl">
            Où je suis
          </h1>
          <div className="mt-8 border-t border-black/20" />
        </div>
      </section>

      <section className="px-4 py-8 md:px-10 md:py-12">
        <div className="mx-auto max-w-[1500px]">
          <h2 className="mb-3 text-sm font-bold uppercase tracking-[0.12em]">PsychoKarta</h2>

          <RueMap
            points={points}
            referencePoint={originPoint}
            initialSeries={initialSeries}
          />
        </div>
      </section>
    </main>
  );
}
