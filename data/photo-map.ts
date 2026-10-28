import generatedData from "./generated/photo-map-points.json";

export type PersonalPhotoSeries = "zup" | "lsb";

export type PersonalPhotoPoint = {
  id: string;
  series: PersonalPhotoSeries;
  photoNumber: number;
  lat: number;
  lng: number;
  date: string;
  time: string;
  dateTimeOriginal: string;
  sortableDateTime: string;
  src: string;
  href: string;
  width: number;
  height: number;
};

export const personalPhotoPoints =
  generatedData.points as PersonalPhotoPoint[];

export const saintPaulPhotoIds = [
  "zup-12",
  "zup-09",
  "zup-04",
  "zup-02",
  "zup-03",
  "lsb-10",
  "lsb-06",
  "lsb-03",
] as const;

export const saintPaulPhotos = personalPhotoPoints
  .filter((point) =>
    saintPaulPhotoIds.includes(
      point.id as (typeof saintPaulPhotoIds)[number],
    ),
  )
  .sort((left, right) =>
    left.sortableDateTime.localeCompare(right.sortableDateTime),
  );

export function getPersonalPhotoPoint(
  series: string,
  id: string,
) {
  return personalPhotoPoints.find(
    (point) =>
      point.series === series &&
      String(point.photoNumber).padStart(2, "0") === id,
  );
}
