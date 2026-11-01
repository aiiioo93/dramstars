import assert from "node:assert/strict";

import { chromium } from "playwright-core";

const baseUrl = process.env.DRAMSTARS_TEST_URL ?? "http://localhost:3000";
const executablePath =
  "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe";

async function waitForCount(locator, expected, label) {
  const deadline = Date.now() + 12_000;
  while (Date.now() < deadline) {
    const count = await locator.count();
    if (count === expected) return;
    await new Promise((resolve) => setTimeout(resolve, 120));
  }
  assert.equal(await locator.count(), expected, label);
}

const browser = await chromium.launch({
  executablePath,
  headless: true,
});

try {
  const desktop = await browser.newContext({
    viewport: { width: 1440, height: 1000 },
  });
  const desktopPage = await desktop.newPage();
  const pageErrors = [];
  desktopPage.on("pageerror", (error) => pageErrors.push(error.message));

  await desktopPage.goto(`${baseUrl}/ou-je-suis`, {
    waitUntil: "domcontentloaded",
  });
  await desktopPage.waitForSelector(".rue-map-marker--photograph");
  await waitForCount(
    desktopPage.locator(".rue-map-marker--photograph"),
    28,
    "28 marqueurs ZUP/LSB attendus",
  );
  await waitForCount(
    desktopPage.locator(".rue-map-marker--story"),
    17,
    "17 marqueurs RUE attendus",
  );
  await waitForCount(
    desktopPage.locator(".rue-map-marker--umc"),
    1,
    "une UMC attendue",
  );
  assert.deepEqual(
    await desktopPage.evaluate(() => ({
      frame: getComputedStyle(document.querySelector(".rue-maplibre")).overflow,
      map: getComputedStyle(document.querySelector("[data-map-ready]")).overflow,
    })),
    { frame: "hidden", map: "hidden" },
    "les marqueurs doivent être découpés aux limites de la PsychoKarta",
  );
  assert.equal(
    await desktopPage.evaluate(() => {
      const header = document.querySelector("[data-map-header]").getBoundingClientRect();
      const map = document.querySelector("[data-map-ready]").getBoundingClientRect();
      return map.top >= header.bottom - 1;
    }),
    true,
    "la zone des marqueurs doit commencer sous la bande du point d’origine",
  );
  assert.equal(
    await desktopPage.locator(".maplibregl-ctrl-logo").count(),
    0,
    "le logo MapLibre ne doit pas être affiché",
  );
  assert.equal(
    await desktopPage.locator(".maplibregl-ctrl-attrib.maplibregl-compact-show").count(),
    0,
    "les attributions légales doivent être repliées par défaut",
  );

  const firstPhotoMarker = desktopPage
    .locator(".rue-map-marker--photograph")
    .first();
  assert.deepEqual(
    await desktopPage.evaluate(() => ({
      hoverNone: window.matchMedia("(hover: none)").matches,
      coarse: window.matchMedia("(pointer: coarse)").matches,
    })),
    { hoverNone: false, coarse: false },
    "le parcours ordinateur doit exposer un pointeur fin",
  );
  assert.equal(
    await desktopPage.locator(".rue-map-popup--preview").count(),
    0,
    "aucune fiche ne doit s’ouvrir au survol",
  );
  await firstPhotoMarker.dispatchEvent("click");
  await desktopPage.waitForSelector(".rue-map-popup--full");
  assert.match(
    await desktopPage.locator(".rue-map-popup--full").innerText(),
    /VOIR LA PHOTO/i,
  );
  await desktopPage.screenshot({
    path: ".next/test-desktop-map.png",
    fullPage: false,
  });

  await desktopPage.getByRole("button", { name: /^ZUP$/i }).click();
  await waitForCount(
    desktopPage.locator(".rue-map-marker--photograph"),
    16,
    "le filtre ZUP doit montrer 16 photographies",
  );
  await waitForCount(
    desktopPage.locator(".rue-map-marker--story"),
    0,
    "le filtre ZUP doit masquer RUE",
  );

  await desktopPage.getByRole("button", { name: /^RUE$/i }).click();
  const search = desktopPage.getByRole("searchbox", {
    name: /Rechercher un blase/i,
  });
  assert.equal(await search.isEnabled(), true);
  await search.fill("Fresh");
  await waitForCount(
    desktopPage.locator(".rue-map-marker--story"),
    1,
    "la recherche RUE doit filtrer les blases",
  );
  await desktopPage.getByRole("button", { name: /^UMC$/i }).click();
  await desktopPage.getByRole("button", { name: "Église Saint-Paul", exact: true }).click();
  await waitForCount(
    desktopPage.locator(".rue-map-marker--photograph"),
    8,
    "l’UMC doit révéler ses huit photographies",
  );
  assert.match(await desktopPage.locator("main").innerText(), /VUE GÉNÉRALE/i);

  await desktopPage.goto(`${baseUrl}/lieux/eglise-saint-paul`, {
    waitUntil: "domcontentloaded",
  });
  assert.equal(
    await desktopPage.locator('a[href^="/photographies/"]').count(),
    8,
    "l’album Saint Paul doit contenir huit photographies",
  );

  await desktopPage.goto(`${baseUrl}/photographies/zup/01`, {
    waitUntil: "domcontentloaded",
  });
  assert.match(await desktopPage.locator("main").innerText(), /03\/06\/2011/);
  assert.match(await desktopPage.locator("main").innerText(), /09h14/i);
  assert.match(await desktopPage.locator("main").innerText(), /SANG TITRE 1/i);

  await desktopPage.goto(`${baseUrl}/series/rue/carte`, {
    waitUntil: "domcontentloaded",
  });
  await desktopPage.waitForURL(/\/ou-je-suis\?series=rue$/);
  assert.equal(
    await desktopPage
      .getByRole("button", { name: /^RUE$/i })
      .getAttribute("aria-pressed"),
    "true",
    "l’ancienne carte RUE doit ouvrir la carte commune filtrée sur RUE",
  );

  await desktopPage.goto(`${baseUrl}/d-ou-je-viens`, {
    waitUntil: "domcontentloaded",
  });
  await desktopPage.waitForSelector(
    '[aria-label*="Carte du chapitre D’où je viens"]',
  );
  assert.equal(
    await desktopPage.locator(".rue-map-marker").count(),
    0,
    "le chapitre II ne doit contenir aucun faux point",
  );
  const desktopChapterMap = desktopPage.getByLabel(
    "Emplacement de la carte du chapitre II",
  );
  await desktopChapterMap.scrollIntoViewIfNeeded();
  await desktopChapterMap.screenshot({
    path: ".next/chapter-two-desktop.png",
  });
  assert.equal(pageErrors.length, 0, `Erreurs navigateur: ${pageErrors.join(" | ")}`);
  await desktop.close();

  const mobile = await browser.newContext({
    viewport: { width: 390, height: 844 },
    hasTouch: true,
    isMobile: true,
  });
  const mobilePage = await mobile.newPage();
  await mobilePage.goto(`${baseUrl}/ou-je-suis`, {
    waitUntil: "domcontentloaded",
  });
  await mobilePage.waitForSelector(".rue-map-marker--photograph");
  await mobilePage
    .locator(".rue-map-marker--photograph")
    .first()
    .dispatchEvent("click");
  await mobilePage.waitForSelector(".rue-map-mobile-panel");
  assert.match(
    await mobilePage.locator(".rue-map-mobile-panel").innerText(),
    /VOIR LA PHOTO/i,
  );
  assert.equal(
    await mobilePage.locator(".rue-map-popup--full").count(),
    0,
    "sur support tactile la fiche doit être un panneau bas",
  );
  await mobilePage.getByRole("button", { name: "Point suivant" }).click();
  assert.match(
    await mobilePage.locator(".rue-map-mobile-panel").innerText(),
    /16\/06\/2011/,
  );
  await mobilePage.screenshot({
    path: ".next/test-mobile-map.png",
    fullPage: false,
  });
  await mobilePage.goto(`${baseUrl}/d-ou-je-viens`, {
    waitUntil: "domcontentloaded",
  });
  const mobileChapterMap = mobilePage.getByLabel(
    "Emplacement de la carte du chapitre II",
  );
  await mobileChapterMap.scrollIntoViewIfNeeded();
  await mobileChapterMap.screenshot({
    path: ".next/chapter-two-mobile.png",
  });
  await mobile.close();

  console.log("Vérification navigateur réussie (ordinateur + tactile). ");
} finally {
  await browser.close();
}
