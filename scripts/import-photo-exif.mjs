import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

import exifr from "exifr";
import sharp from "sharp";

import {
  coordinateKey,
  getSequenceNumber,
  parseExifDateTime,
  roundCoordinate,
  sortSourceFiles,
} from "../lib/photo-import.mjs";

const projectRoot = path.resolve(
  path.dirname(fileURLToPath(import.meta.url)),
  "..",
);
const sourceRoot = path.join(projectRoot, "NewFiles");
const publicRoot = path.join(projectRoot, "public", "Photos", "map");
const dataRoot = path.join(projectRoot, "data", "generated");
const reportPath = path.join(
  projectRoot,
  "RAPPORT_IMPORT_EXIF_2026-10-28.md",
);

const CONTROL_COORDINATES = {
  zup: [
    [48.8814, 2.403],
    [48.9374, 2.5114],
    [48.9383, 2.5098],
    [48.9414, 2.5126],
    [48.9434, 2.5122],
    [48.9453, 2.5161],
    [48.9463, 2.5089],
    [48.947, 2.5089],
    [48.947, 2.5095],
    [48.9471, 2.5093],
    [48.9471, 2.5098],
    [48.9475, 2.5092],
    [48.9489, 2.5077],
    [48.949, 2.5106],
    [48.9491, 2.5097],
    [48.9524, 2.5211],
  ],
  lsb: [
    [48.9284, 2.5095],
    [48.9377, 2.5128],
    [48.9392, 2.5071],
    [48.9437, 2.5075],
    [48.9469, 2.5089],
    [48.947, 2.5095],
    [48.9471, 2.51],
    [48.9484, 2.5064],
    [48.9505, 2.5181],
    [48.951, 2.5176],
    [48.9513, 2.5166],
    [48.9514, 2.5069],
  ],
};

const SERIES = [
  { key: "zup", folder: "ZUP", expected: 16 },
  { key: "lsb", folder: "LSB", expected: 12 },
];

function getPublicFilename(sequence) {
  return `${String(sequence).padStart(2, "0")}.jpg`;
}

async function readSourceMetadata(filePath) {
  const [metadata, rawExif] = await Promise.all([
    exifr.parse(filePath, {
      gps: true,
      exif: true,
      tiff: true,
      xmp: true,
      iptc: true,
    }),
    exifr.parse(filePath, {
      pick: ["DateTimeOriginal"],
      reviveValues: false,
    }),
  ]);

  return {
    latitude: metadata?.latitude,
    longitude: metadata?.longitude,
    dateTimeOriginal: rawExif?.DateTimeOriginal,
  };
}

async function createSanitizedDerivative(sourcePath, destinationPath) {
  await sharp(sourcePath)
    .rotate()
    .resize({
      width: 1600,
      height: 1600,
      fit: "inside",
      withoutEnlargement: true,
    })
    .toColourspace("srgb")
    .jpeg({ quality: 86, mozjpeg: true })
    .toFile(destinationPath);

  const [sharpMetadata, exifMetadata] = await Promise.all([
    sharp(destinationPath).metadata(),
    exifr.parse(destinationPath, {
      gps: true,
      xmp: true,
      iptc: true,
      exif: true,
    }),
  ]);

  const hasPrivateMetadata = Boolean(
    sharpMetadata.exif ||
      sharpMetadata.xmp ||
      sharpMetadata.iptc ||
      exifMetadata?.latitude ||
      exifMetadata?.longitude ||
      exifMetadata?.GPSLatitude ||
      exifMetadata?.GPSLongitude,
  );

  if (hasPrivateMetadata) {
    throw new Error(
      `Le dérivé ${destinationPath} contient encore des métadonnées privées.`,
    );
  }

  return {
    width: sharpMetadata.width,
    height: sharpMetadata.height,
    colourSpace: sharpMetadata.space,
  };
}

function validateAgainstControl(series, points) {
  const imported = new Set(
    points.map((point) => coordinateKey(point.lat, point.lng)),
  );
  const expected = new Set(
    CONTROL_COORDINATES[series].map(([lat, lng]) =>
      coordinateKey(lat, lng),
    ),
  );

  return {
    missing: [...expected].filter((key) => !imported.has(key)),
    unexpected: [...imported].filter((key) => !expected.has(key)),
  };
}

async function importSeries(config) {
  const sourceDirectory = path.join(sourceRoot, config.folder);
  const outputDirectory = path.join(publicRoot, config.key);
  const allFiles = await fs.readdir(sourceDirectory);
  const sourceFiles = sortSourceFiles(
    allFiles.filter((file) => /\.jpe?g$/i.test(file)),
  );

  if (sourceFiles.length !== config.expected) {
    throw new Error(
      `${config.folder}: ${sourceFiles.length} fichiers trouvés, ${config.expected} attendus.`,
    );
  }

  await fs.mkdir(outputDirectory, { recursive: true });
  const points = [];
  const anomalies = [];

  for (const sourceFile of sourceFiles) {
    const sequence = getSequenceNumber(sourceFile);
    const sourcePath = path.join(sourceDirectory, sourceFile);
    const outputFilename = getPublicFilename(sequence);
    const destinationPath = path.join(outputDirectory, outputFilename);
    const metadata = await readSourceMetadata(sourcePath);
    const dateTime = parseExifDateTime(metadata.dateTimeOriginal);

    if (
      !Number.isFinite(metadata.latitude) ||
      !Number.isFinite(metadata.longitude)
    ) {
      anomalies.push(`${sourceFile}: coordonnées GPS manquantes`);
      continue;
    }

    if (!dateTime) {
      anomalies.push(`${sourceFile}: DateTimeOriginal manquant ou invalide`);
      continue;
    }

    const image = await createSanitizedDerivative(
      sourcePath,
      destinationPath,
    );

    points.push({
      id: `${config.key}-${String(sequence).padStart(2, "0")}`,
      series: config.key,
      photoNumber: sequence,
      lat: roundCoordinate(metadata.latitude),
      lng: roundCoordinate(metadata.longitude),
      date: dateTime.date,
      time: dateTime.time,
      dateTimeOriginal: dateTime.raw,
      sortableDateTime: dateTime.sortable,
      src: `/Photos/map/${config.key}/${outputFilename}`,
      href: `/photographies/${config.key}/${String(sequence).padStart(2, "0")}`,
      width: image.width,
      height: image.height,
    });
  }

  const control = validateAgainstControl(config.key, points);

  if (control.missing.length || control.unexpected.length) {
    anomalies.push(
      `Contrôle GPS: manquants [${control.missing.join(", ") || "aucun"}], inattendus [${control.unexpected.join(", ") || "aucun"}]`,
    );
  }

  return { points, anomalies, sourceFiles };
}

function renderReport(results) {
  const allAnomalies = results.flatMap(({ series, anomalies }) =>
    anomalies.map((anomaly) => `${series.toUpperCase()} — ${anomaly}`),
  );
  const rows = results.flatMap(({ points }) =>
    points.map(
      (point) =>
        `| ${point.id} | ${point.date} | ${point.time} | ${point.lat.toFixed(4)}, ${point.lng.toFixed(4)} | ${point.width} × ${point.height} |`,
    ),
  );

  return `# DRAMSTARS — Rapport d’import EXIF

Date de contrôle : 28 octobre 2026

## Résultat

- ZUP : ${results.find((item) => item.series === "zup")?.points.length ?? 0} / 16 photographies importées.
- LSB : ${results.find((item) => item.series === "lsb")?.points.length ?? 0} / 12 photographies importées.
- Les coordonnées publiques ont été arrondies à quatre décimales avant l’écriture des données.
- Les dates et heures proviennent de \`DateTimeOriginal\`. Aucun fuseau horaire n’a été ajouté.
- Les JPEG publics ont été reconvertis en sRGB et vérifiés sans EXIF, GPS, XMP ni IPTC.
- Format de vignette cartographique provisoire : 480 × 320 px (rapport 3:2), réglable dans le composant de carte.

## Contrôle des fichiers

| Identifiant public | Date | Heure | Coordonnées publiques | Dérivé web |
|---|---:|---:|---:|---:|
${rows.join("\n")}

## Anomalies

${allAnomalies.length ? allAnomalies.map((item) => `- ${item}`).join("\n") : "- Aucune anomalie détectée dans les 28 fichiers fournis."}

## Confidentialité

Les originaux restent dans \`NewFiles/\`, dossier ignoré par Git. Ils ne sont pas copiés dans \`public/\`. Seuls les dérivés nettoyés sont publiables.
`;
}

async function main() {
  await fs.mkdir(dataRoot, { recursive: true });
  await fs.mkdir(publicRoot, { recursive: true });

  const results = [];

  for (const config of SERIES) {
    const result = await importSeries(config);
    results.push({ series: config.key, ...result });
  }

  const points = results.flatMap((result) => result.points);
  const anomalies = results.flatMap((result) => result.anomalies);

  if (points.length !== 28) {
    throw new Error(`${points.length} photographies importées, 28 attendues.`);
  }

  if (anomalies.length) {
    throw new Error(`Import interrompu: ${anomalies.join(" | ")}`);
  }

  await fs.writeFile(
    path.join(dataRoot, "photo-map-points.json"),
    `${JSON.stringify({ points }, null, 2)}\n`,
    "utf8",
  );
  await fs.writeFile(reportPath, renderReport(results), "utf8");

  console.log(
    `Import terminé: ${points.length} photographies, données arrondies et dérivés web nettoyés.`,
  );
}

await main();
