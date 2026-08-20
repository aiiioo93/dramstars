import fs from "node:fs";
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

export function getPhotoRoot(): PhotoRoot {
  const possibilities: PhotoRoot[] = [
    {
      directory: path.join(process.cwd(), "public", "Photos"),
      publicPath: "/Photos",
    },
    {
      directory: path.join(process.cwd(), "public", "photos"),
      publicPath: "/photos",
    },
  ];

  const existing = possibilities.find((item) =>
    fs.existsSync(item.directory),
  );

  return existing ?? possibilities[0];
}

export function findPhoto(baseName: string): string | null {
  const root = getPhotoRoot();

  if (!fs.existsSync(root.directory)) {
    return null;
  }

  const file = fs.readdirSync(root.directory).find((item) => {
    const extension = path.extname(item).toLowerCase();
    const name = path.basename(item, extension).toLowerCase();

    return (
      allowedExtensions.includes(extension) &&
      name === baseName.toLowerCase()
    );
  });

  if (!file) {
    return null;
  }

  return `${root.publicPath}/${encodeURIComponent(file)}`;
}

function getSeriesFolder(acronym: string, slug: string) {
  const root = getPhotoRoot();

  const folders = [
    {
      directory: path.join(root.directory, "series", slug),
      publicPath: `${root.publicPath}/series/${slug}`,
    },
    {
      directory: path.join(root.directory, "series", acronym),
      publicPath: `${root.publicPath}/series/${acronym}`,
    },
    {
      directory: path.join(root.directory, acronym),
      publicPath: `${root.publicPath}/${acronym}`,
    },
    {
      directory: path.join(root.directory, slug),
      publicPath: `${root.publicPath}/${slug}`,
    },
  ];

  return folders.find((item) =>
    fs.existsSync(item.directory),
  );
}

export function getSeriesPhotos(
  acronym: string,
  slug: string,
): SeriesPhoto[] {
  const folder = getSeriesFolder(acronym, slug);

  if (!folder) {
    return [];
  }

  return fs
    .readdirSync(folder.directory)
    .filter((file) =>
      allowedExtensions.includes(path.extname(file).toLowerCase()),
    )
    .sort((a, b) =>
      a.localeCompare(b, undefined, { numeric: true }),
    )
    .map((file) => {
      const extension = path.extname(file);

      return {
        src: `${folder.publicPath}/${encodeURIComponent(file)}`,
        slug: path.basename(file, extension),
        filename: file,
      };
    });
}

export function getSeriesGallery(
  acronym: string,
  slug: string,
): string[] {
  return getSeriesPhotos(acronym, slug).map(
    (photo) => photo.src,
  );
}

export function getSeriesPhoto(
  acronym: string,
  seriesSlug: string,
  photoSlug: string,
): SeriesPhoto | null {
  const photos = getSeriesPhotos(acronym, seriesSlug);

  return (
    photos.find(
      (photo) =>
        photo.slug.toLowerCase() === photoSlug.toLowerCase(),
    ) ?? null
  );
}