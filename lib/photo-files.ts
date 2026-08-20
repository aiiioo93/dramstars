import fs from "node:fs";
import path from "node:path";

const allowedExtensions = [".jpg", ".jpeg", ".png", ".webp", ".avif"];

type PhotoRoot = {
  directory: string;
  publicPath: string;
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

export function getSeriesGallery(
  acronym: string,
  slug: string,
): string[] {
  const root = getPhotoRoot();

  const folders = [
    {
      directory: path.join(root.directory, acronym),
      publicPath: `${root.publicPath}/${acronym}`,
    },
    {
      directory: path.join(root.directory, slug),
      publicPath: `${root.publicPath}/${slug}`,
    },
    {
      directory: path.join(root.directory, "series", slug),
      publicPath: `${root.publicPath}/series/${slug}`,
    },
    {
      directory: path.join(root.directory, "series", acronym),
      publicPath: `${root.publicPath}/series/${acronym}`,
    },
  ];

  const folder = folders.find((item) =>
    fs.existsSync(item.directory),
  );

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
    .map(
      (file) =>
        `${folder.publicPath}/${encodeURIComponent(file)}`,
    );
}