import assert from "node:assert/strict";
import test from "node:test";

import {
  coordinateKey,
  getSequenceNumber,
  parseExifDateTime,
  roundCoordinate,
  sortSourceFiles,
  applyPhotoRegistry,
  createInitialPhotoRegistry,
} from "../lib/photo-import.mjs";

test("arrondit les coordonnées publiques à quatre décimales", () => {
  assert.equal(roundCoordinate(48.939197), 48.9392);
  assert.equal(roundCoordinate(2.507081), 2.5071);
  assert.equal(coordinateKey(48.947, 2.51), "48.9470,2.5100");
});

test("initialise la suite Sang titre dans l'ordre chronologique avec égalité déterministe", () => {
  const registry = createInitialPhotoRegistry([
    { id: "b", sortableDateTime: "2015-01-01T10:00:00" },
    { id: "a", sortableDateTime: "2015-01-01T10:00:00" },
    { id: "c", sortableDateTime: "2014-01-01T10:00:00" },
  ]);
  assert.deepEqual(registry, { c: 1, a: 2, b: 3 });
});

test("ne renumérote pas les publications et exige l'attribution d'une photo ancienne ajoutée", () => {
  const published = [
    { id: "later", sortableDateTime: "2018-01-01T00:00:00" },
    { id: "latest", sortableDateTime: "2019-01-01T00:00:00" },
  ];
  assert.deepEqual(
    applyPhotoRegistry(published, { later: 7, latest: 9 }).map((item) => item.sangTitleNumber),
    [7, 9],
  );
  assert.throws(
    () => applyPhotoRegistry([...published, { id: "older", sortableDateTime: "2010-01-01T00:00:00" }], { later: 7, latest: 9 }),
    /Attribution explicite requise/,
  );
});

test("préserve la date EXIF sans inventer de fuseau horaire", () => {
  assert.deepEqual(parseExifDateTime("2018:02:07 20:12:03"), {
    date: "07/02/2018",
    time: "20:12",
    raw: "2018:02:07 20:12:03",
    sortable: "2018-02-07T20:12:03",
  });
  assert.equal(parseExifDateTime("2018-02-07T20:12:03Z"), null);
});

test("ordonne les exports Lightroom avec le fichier sans suffixe en premier", () => {
  const files = ["ZUP-10.jpg", "ZUP-2.jpg", "ZUP.jpg"];
  assert.deepEqual(sortSourceFiles(files), [
    "ZUP.jpg",
    "ZUP-2.jpg",
    "ZUP-10.jpg",
  ]);
  assert.equal(getSequenceNumber("LSB.jpg"), 1);
  assert.equal(getSequenceNumber("LSB-12.jpg"), 12);
});
