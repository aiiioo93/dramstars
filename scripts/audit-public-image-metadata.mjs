import { readdir } from "node:fs/promises";
import path from "node:path";

import exifr from "exifr";

const publicRoot = path.resolve("public");
const supportedExtensions = new Set([".jpg", ".jpeg", ".png", ".webp"]);

async function collectImages(directory) {
  const entries = await readdir(directory, { withFileTypes: true });
  const nested = await Promise.all(
    entries.map(async (entry) => {
      const absolutePath = path.join(directory, entry.name);
      if (entry.isDirectory()) return collectImages(absolutePath);
      return supportedExtensions.has(path.extname(entry.name).toLowerCase())
        ? [absolutePath]
        : [];
    }),
  );
  return nested.flat();
}

function findLocationFields(metadata) {
  if (!metadata) return [];
  return Object.entries(metadata)
    .filter(([key, value]) => {
      if (value === undefined || value === null || value === "") return false;
      return /^(gps|latitude$|longitude$)|location|sublocation/i.test(key);
    })
    .map(([key]) => key);
}

const images = await collectImages(publicRoot);
const findings = [];

for (const imagePath of images) {
  try {
    const metadata = await exifr.parse(imagePath, {
      exif: true,
      gps: true,
      iptc: true,
      xmp: true,
      reviveValues: false,
    });
    const fields = findLocationFields(metadata);
    if (fields.length) {
      findings.push({
        file: path.relative(publicRoot, imagePath).replaceAll("\\", "/"),
        fields,
      });
    }
  } catch (error) {
    throw new Error(
      `Impossible d’auditer ${path.relative(publicRoot, imagePath)} : ${error.message}`,
    );
  }
}

if (findings.length) {
  console.error(JSON.stringify(findings, null, 2));
  throw new Error(
    `${findings.length} image(s) publique(s) contiennent encore des champs de localisation.`,
  );
}

console.log(
  `Audit réussi : ${images.length} images publiques sans champ de localisation EXIF/XMP/IPTC détecté.`,
);
