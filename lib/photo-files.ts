import path from "node:path";

const allowedExtensions = [".jpg", ".jpeg", ".png", ".webp", ".avif"];

type PhotoRoot = {
  directory: string;
  publicPath: string;
};

export type SeriesPhoto = {
  src: string;
  slug: string;
  filename: string;
};

const photoRoot: PhotoRoot = {
  directory: path.join(process.cwd(), "public", "Photos"),
  publicPath: "/Photos",
};

const rootPhotos: Record<string, string> = {
  profil: "profil.jpg",
};

const seriesFileManifest: Record<string, string[]> = {
  zup: [
    "01.jpg",
    "02.jpeg",
    "03.jpg",
    "04.jpg",
    "05.jpg",
    "06.jpg",
    "07.jpg",
    "8.jpg",
    "09.jpg",
    "10.jpg",
    "11.jpg",
    "12.jpg",
    "13.jpeg",
    "14.jpg",
    "15.jpeg",
    "16.jpg",
  ],
  lsb: Array.from({ length: 12 }, (_, index) =>
    `${String(index + 1).padStart(2, "0")}.jpg`,
  ),
  rue: [
    "RUE.jpg",
    ...Array.from({ length: 15 }, (_, index) => `RUE-${index + 2}.jpg`),
  ],
};

export function getPhotoRoot(): PhotoRoot {
  return photoRoot;
}

export function findPhoto(baseName: string): string | null {
  const filename = rootPhotos[baseName.toLowerCase()];
  return filename ? `${photoRoot.publicPath}/${filename}` : null;
}

export function getSeriesPhotos(
  acronym: string,
  slug: string,
): SeriesPhoto[] {
  const seriesKey = slug.toLowerCase() || acronym.toLowerCase();
  const filenames = seriesFileManifest[seriesKey] ?? [];

  return filenames
    .filter((filename) =>
      allowedExtensions.includes(path.extname(filename).toLowerCase()),
    )
    .map((filename) => {
      const extension = path.extname(filename);
      return {
        src: `${photoRoot.publicPath}/series/${seriesKey}/${encodeURIComponent(filename)}`,
        slug: path.basename(filename, extension),
        filename,
      };
    });
}

export function getSeriesGallery(acronym: string, slug: string) {
  return getSeriesPhotos(acronym, slug).map((photo) => photo.src);
}

export function getSeriesPhoto(
  acronym: string,
  seriesSlug: string,
  photoSlug: string,
) {
  return (
    getSeriesPhotos(acronym, seriesSlug).find(
      (photo) => photo.slug.toLowerCase() === photoSlug.toLowerCase(),
    ) ?? null
  );
}
