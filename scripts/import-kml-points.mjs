import { readFile, writeFile } from "node:fs/promises";
import path from "node:path";

const [, , inputPath, outputPath] = process.argv;

if (!inputPath) {
  throw new Error(
    "Usage : npm run import:kml -- chemin/points.kml [chemin/sortie.json]",
  );
}

function decodeXml(value) {
  return value
    .replaceAll("&amp;", "&")
    .replaceAll("&lt;", "<")
    .replaceAll("&gt;", ">")
    .replaceAll("&quot;", '"')
    .replaceAll("&apos;", "'")
    .trim();
}

function roundCoordinate(value) {
  return Number(Number(value).toFixed(4));
}

const absoluteInputPath = path.resolve(inputPath);
const kml = await readFile(absoluteInputPath, "utf8");
const placemarks = [...kml.matchAll(/<Placemark\b[^>]*>([\s\S]*?)<\/Placemark>/gi)];

const points = placemarks.flatMap((match) => {
  const placemark = match[1];
  const nameMatch = placemark.match(/<name\b[^>]*>([\s\S]*?)<\/name>/i);
  const coordinatesMatch = placemark.match(
    /<coordinates\b[^>]*>\s*([^<]+?)\s*<\/coordinates>/i,
  );

  if (!nameMatch || !coordinatesMatch) {
    return [];
  }

  const [lng, lat] = coordinatesMatch[1]
    .trim()
    .split(/\s+/)[0]
    .split(",")
    .map(Number);

  if (!Number.isFinite(lat) || !Number.isFinite(lng)) {
    return [];
  }

  return [
    {
      name: decodeXml(nameMatch[1].replace(/<!\[CDATA\[|\]\]>/g, "")),
      lat: roundCoordinate(lat),
      lng: roundCoordinate(lng),
    },
  ];
});

if (points.length === 0) {
  throw new Error("Aucun point nommé avec des coordonnées valides dans ce KML.");
}

const output = `${JSON.stringify(points, null, 2)}\n`;

if (outputPath) {
  const absoluteOutputPath = path.resolve(outputPath);
  await writeFile(absoluteOutputPath, output, "utf8");
  console.log(`${points.length} points écrits dans ${absoluteOutputPath}`);
} else {
  console.log(output);
}
