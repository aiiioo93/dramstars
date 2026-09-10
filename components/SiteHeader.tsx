"use client";

import Link from "next/link";
import {
  useEffect,
  useRef,
  useState,
} from "react";

import { photoSeries } from "@/lib/series";

type MobileSection =
  | "series"
  | "chapter"
  | null;

export default function SiteHeader() {
  const desktopMenuRef =
    useRef<HTMLDivElement>(null);
  const mobileMenuRef =
    useRef<HTMLDetailsElement>(null);

  const [desktopMenuOpen, setDesktopMenuOpen] =
    useState(false);
  const [mobileSection, setMobileSection] =
    useState<MobileSection>(null);

  useEffect(() => {
    const handleOutsideClick = (
      event: PointerEvent,
    ) => {
      const menu = mobileMenuRef.current;
      const desktopMenu = desktopMenuRef.current;
      const target = event.target as Node;

      if (
        desktopMenuOpen &&
        desktopMenu &&
        !desktopMenu.contains(target)
      ) {
        setDesktopMenuOpen(false);
      }

      if (
        menu?.open &&
        !menu.contains(target)
      ) {
        menu.open = false;
        setMobileSection(null);
      }
    };

    const handleEscape = (
      event: KeyboardEvent,
    ) => {
      if (
        event.key === "Escape"
      ) {
        setDesktopMenuOpen(false);

        if (mobileMenuRef.current) {
          mobileMenuRef.current.open = false;
        }

        setMobileSection(null);
      }
    };

    document.addEventListener(
      "pointerdown",
      handleOutsideClick,
    );

    document.addEventListener(
      "keydown",
      handleEscape,
    );

    return () => {
      document.removeEventListener(
        "pointerdown",
        handleOutsideClick,
      );

      document.removeEventListener(
        "keydown",
        handleEscape,
      );
    };
  }, [desktopMenuOpen]);

  const closeMobileMenu = () => {
    if (mobileMenuRef.current) {
      mobileMenuRef.current.open = false;
    }

    setMobileSection(null);
  };

  const toggleMobileSection = (
    section: Exclude<MobileSection, null>,
  ) => {
    setMobileSection((current) =>
      current === section ? null : section,
    );
  };

  return (
    <header className="sticky top-0 z-50 h-16 border-b border-black bg-[#f4f3ef]">
      <div className="mx-auto flex h-full max-w-[1600px] items-center justify-between px-5 md:px-10">
        {/* ================================================= */}
        {/* LOGO */}
        {/* ================================================= */}

        <Link
          href="/"
          className="relative text-lg font-bold tracking-[-0.04em] md:text-xl"
          onClick={closeMobileMenu}
        >
          LADRAMSTARS

          <span className="absolute -right-3 top-0 h-[5px] w-[5px] rounded-full bg-[#ff3b18]" />
        </Link>

        {/* ================================================= */}
        {/* DESKTOP */}
        {/* ================================================= */}

        <nav className="hidden h-full items-center gap-8 text-xs md:flex">
          <div
            ref={desktopMenuRef}
            className="group relative flex h-full items-center"
          >
            <button
              type="button"
              aria-expanded={desktopMenuOpen}
              aria-controls="desktop-explorer-menu"
              onClick={() =>
                setDesktopMenuOpen((open) => !open)
              }
              className="flex items-center gap-2 tracking-[0.08em] transition-opacity duration-300 hover:opacity-60"
            >
              Explorer

              <span
                className={`text-[8px] transition-transform duration-300 group-hover:rotate-180 ${
                  desktopMenuOpen ? "rotate-180" : ""
                }`}
              >
                ↓
              </span>
            </button>

            {/* ================================================= */}
            {/* DROPDOWN DESKTOP */}
            {/* ================================================= */}

            <div
              id="desktop-explorer-menu"
              onClick={() => setDesktopMenuOpen(false)}
              className={`absolute right-0 top-full w-[560px] pt-2 transition-all duration-300 group-hover:pointer-events-auto group-hover:opacity-100 ${
                desktopMenuOpen
                  ? "pointer-events-auto opacity-100"
                  : "pointer-events-none opacity-0"
              }`}
            >
              <div
                className={`border border-black bg-[#f4f3ef] p-3 text-black shadow-[12px_12px_0_rgba(0,0,0,0.16)] transition-transform duration-300 group-hover:translate-y-0 ${
                  desktopMenuOpen
                    ? "translate-y-0"
                    : "translate-y-2"
                }`}
              >
                {/* PERFORATIONS */}

                <div className="mb-3 flex justify-between">
                  {Array.from({
                    length: 14,
                  }).map((_, index) => (
                    <span
                      key={index}
                      className="h-[5px] w-[13px] bg-black"
                    />
                  ))}
                </div>

                {/* ENTÊTE */}

                <div className="flex items-center justify-between border-y border-black/20 py-2.5 text-[7px] uppercase tracking-[0.22em] text-black/40">
                  <span>LADRAMSTARS</span>
                  <span>Index photographique</span>
                  <span>35 MM</span>
                </div>

                {/* CONTENU */}

                <div className="grid grid-cols-[1.35fr_0.65fr]">
                  {/* ============================================= */}
                  {/* COLONNE GAUCHE — CHAPITRE I */}
                  {/* ============================================= */}

                  <div className="border-r border-black/20 pr-3 pt-3">
                    <Link
                      href="/ou-je-suis"
                      className="group/index mb-2 flex items-center justify-between border-b border-black/15 px-2 py-3 transition-colors hover:bg-black/[0.045]"
                    >
                      <div>
                        <span className="block text-[7px] uppercase tracking-[0.2em] text-black/35">
                          Chapitre I
                        </span>

                        <span className="mt-1 block text-sm font-bold">
                          Où je suis
                        </span>
                      </div>

                      <span className="transition-transform duration-300 group-hover/index:translate-x-1">
                        →
                      </span>
                    </Link>

                    <div className="grid grid-cols-3 gap-1.5">
                      {photoSeries.map(
                        (serie) => (
                          <Link
                            key={serie.slug}
                            href={`/series/${serie.slug}`}
                            className="group/serie relative min-h-[118px] overflow-hidden border border-black/15 p-3 transition-colors duration-300 hover:bg-black"
                          >
                            <span className="text-[7px] uppercase tracking-[0.18em] text-black/35 transition-colors duration-300 group-hover/serie:text-white/40">
                              {serie.number}
                            </span>

                            <div className="absolute bottom-3 left-3 right-3">
                              <span className="block text-xl font-bold uppercase tracking-[-0.06em] transition-colors duration-300 group-hover/serie:text-white">
                                {serie.acronym}
                              </span>

                              <span className="mt-1 block line-clamp-2 text-[7px] leading-4 text-black/40 transition-colors duration-300 group-hover/serie:text-white/45">
                                {serie.title}
                              </span>
                            </div>

                            <span className="absolute right-2 top-2 h-[5px] w-[5px] rounded-full bg-[#ff3b18] opacity-0 transition-opacity duration-300 group-hover/serie:opacity-100" />
                          </Link>
                        ),
                      )}
                    </div>

                    <Link
                      href="/series/rue/carte"
                      className="group/map mt-2 flex items-center justify-between border border-black/15 px-3 py-3 transition-colors duration-300 hover:bg-black"
                    >
                      <div>
                        <span className="block text-[7px] uppercase tracking-[0.18em] text-black/35 transition-colors group-hover/map:text-white/40">
                          RUE / GPS
                        </span>

                        <span className="mt-1 block text-[11px] font-bold transition-colors group-hover/map:text-white">
                          Carte des récits
                        </span>
                      </div>

                      <span className="transition-all duration-300 group-hover/map:translate-x-1 group-hover/map:text-white">
                        →
                      </span>
                    </Link>
                  </div>

                  {/* ============================================= */}
                  {/* COLONNE DROITE */}
                  {/* ============================================= */}

                  <div className="pl-3 pt-3">
                    <p className="mb-2 px-2 text-[7px] uppercase tracking-[0.2em] text-black/35">
                      Chapitre II
                    </p>

                    <Link
                      href="/d-ou-je-viens"
                      className="group/origin relative block min-h-[124px] overflow-hidden border border-black/15 p-3 transition-colors duration-300 hover:bg-[#713126]"
                    >
                      <span className="text-[7px] uppercase tracking-[0.18em] text-black/35 transition-colors group-hover/origin:text-white/40">
                        02 / Origines
                      </span>

                      <div className="absolute bottom-3 left-3 right-3">
                        <span className="block text-xl font-bold uppercase leading-[0.9] tracking-[-0.055em] transition-colors group-hover/origin:text-white">
                          D&apos;où
                          <br />
                          je viens
                        </span>
                      </div>

                      <span className="absolute right-3 top-3 h-[6px] w-[6px] rounded-full bg-[#ff3b18]" />
                    </Link>

                    <Link
                      href="/d-ou-je-viens/lettre"
                      className="group/letter mt-2 flex items-center justify-between border border-black/15 px-3 py-3 transition-colors duration-300 hover:bg-black"
                    >
                      <div>
                        <span className="block text-[7px] uppercase tracking-[0.18em] text-black/35 transition-colors group-hover/letter:text-white/40">
                          Document
                        </span>

                        <span className="mt-1 block text-[11px] font-bold transition-colors group-hover/letter:text-white">
                          La lettre
                        </span>
                      </div>

                      <span className="transition-all duration-300 group-hover/letter:translate-x-1 group-hover/letter:text-white">
                        →
                      </span>
                    </Link>

                    <Link
                      href="/histoire"
                      className="group/about mt-2 flex items-center justify-between border border-black/15 px-3 py-3 transition-colors duration-300 hover:bg-black"
                    >
                      <div>
                        <span className="block text-[7px] uppercase tracking-[0.18em] text-black/35 transition-colors group-hover/about:text-white/40">
                          Portrait
                        </span>

                        <span className="mt-1 block text-[11px] font-bold transition-colors group-hover/about:text-white">
                          À propos
                        </span>
                      </div>

                      <span className="transition-all duration-300 group-hover/about:translate-x-1 group-hover/about:text-white">
                        →
                      </span>
                    </Link>
                  </div>
                </div>

                {/* PIED */}

                <div className="mt-3 flex items-center justify-between border-t border-black/20 pt-2.5 text-[7px] uppercase tracking-[0.18em] text-black/30">
                  <span>Archive photographique</span>

                  <span className="flex items-center gap-2">
                    <span className="h-[5px] w-[5px] rounded-full bg-[#ff3b18]" />
                    Seine-Saint-Denis
                  </span>

                  <span>ISO 400</span>
                </div>

                {/* PERFORATIONS BASSES */}

                <div className="mt-3 flex justify-between">
                  {Array.from({
                    length: 14,
                  }).map((_, index) => (
                    <span
                      key={index}
                      className="h-[5px] w-[13px] bg-black"
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>

          <Link
            href="/histoire"
            className="tracking-[0.08em] transition-opacity duration-300 hover:opacity-50"
          >
            À propos
          </Link>
        </nav>

        {/* ================================================= */}
        {/* MOBILE — VISEUR */}
        {/* ================================================= */}

        <details
          ref={mobileMenuRef}
          className="group relative md:hidden"
        >
          <summary
            aria-label="Ouvrir la navigation"
            className="relative flex h-10 w-10 cursor-pointer list-none items-center justify-center [&::-webkit-details-marker]:hidden"
          >
            <span className="absolute inset-[4px] rounded-full border border-black/30 transition-all duration-500 ease-out group-open:scale-75 group-open:opacity-0" />

            <span className="absolute inset-[8px] border border-black transition-all duration-500 ease-out group-open:rotate-45 group-open:scale-90" />

            <span className="absolute h-px w-5 bg-black transition-all duration-500 ease-out group-open:w-6 group-open:rotate-45" />

            <span className="absolute h-5 w-px bg-black transition-all duration-500 ease-out group-open:h-6 group-open:rotate-45" />

            <span className="relative z-10 h-1.5 w-1.5 rounded-full bg-black transition-all duration-300 group-open:scale-0 group-open:opacity-0" />
          </summary>

          {/* ================================================= */}
          {/* PANNEAU MOBILE */}
          {/* ================================================= */}

          <div className="absolute right-0 top-12 w-[min(91vw,350px)] origin-top-right border border-black bg-[#f4f3ef] p-3 text-black shadow-[8px_8px_0_rgba(0,0,0,0.18)]">
            {/* PERFORATIONS */}

            <div className="mb-2 flex justify-between">
              {Array.from({
                length: 10,
              }).map((_, index) => (
                <span
                  key={index}
                  className="h-[4px] w-[13px] bg-black"
                />
              ))}
            </div>

            {/* ENTÊTE */}

            <div className="flex items-center justify-between border-y border-black/20 py-2 text-[6px] uppercase tracking-[0.2em] text-black/40">
              <span>LADRAMSTARS</span>
              <span>35 MM / INDEX</span>
              <span>84</span>
            </div>

            {/* ============================================= */}
            {/* OÙ JE SUIS */}
            {/* ============================================= */}

            <Link
              href="/ou-je-suis"
              onClick={closeMobileMenu}
              className="group/home flex items-center justify-between border-b border-black/15 px-2 py-3"
            >
              <div className="flex items-center gap-3">
                <span className="flex h-7 w-7 items-center justify-center border border-black/20 text-[7px] text-black/40">
                  01
                </span>

                <div>
                  <span className="block text-[6px] uppercase tracking-[0.18em] text-black/35">
                    Chapitre I
                  </span>

                  <span className="mt-0.5 block text-[12px] font-bold">
                    Où je suis
                  </span>
                </div>
              </div>

              <span className="text-black/40 transition-transform group-hover/home:translate-x-1">
                →
              </span>
            </Link>

            {/* ============================================= */}
            {/* ACCORDÉON SÉRIES */}
            {/* ============================================= */}

            <div className="border-b border-black/15">
              <button
                type="button"
                aria-expanded={
                  mobileSection === "series"
                }
                onClick={() =>
                  toggleMobileSection("series")
                }
                className="flex w-full items-center justify-between px-2 py-3 text-left"
              >
                <div className="flex items-center gap-3">
                  <span className="flex h-7 w-7 items-center justify-center border border-black/20">
                    <span className="h-[5px] w-[5px] rounded-full bg-[#ff3b18]" />
                  </span>

                  <div>
                    <span className="block text-[6px] uppercase tracking-[0.18em] text-black/35">
                      Archive
                    </span>

                    <span className="mt-0.5 block text-[12px] font-bold">
                      Les séries
                    </span>
                  </div>
                </div>

                <span
                  className={`text-lg font-light transition-transform duration-300 ${
                    mobileSection === "series"
                      ? "rotate-45"
                      : ""
                  }`}
                >
                  +
                </span>
              </button>

              {mobileSection === "series" && (
                <div className="grid grid-cols-2 gap-1.5 px-2 pb-3">
                  {photoSeries.map(
                    (serie) => (
                      <Link
                        key={serie.slug}
                        href={`/series/${serie.slug}`}
                        onClick={closeMobileMenu}
                        className="group/serie relative min-h-[68px] border border-black/15 p-2.5 transition-colors active:bg-black active:text-white"
                      >
                        <span className="text-[6px] uppercase tracking-[0.16em] text-black/35 group-active/serie:text-white/40">
                          {serie.number}
                        </span>

                        <span className="absolute bottom-2.5 left-2.5 text-base font-bold uppercase tracking-[-0.05em]">
                          {serie.acronym}
                        </span>
                      </Link>
                    ),
                  )}

                  <Link
                    href="/series/rue/carte"
                    onClick={closeMobileMenu}
                    className="col-span-2 flex items-center justify-between border border-black/15 px-3 py-2.5 active:bg-black active:text-white"
                  >
                    <div>
                      <span className="block text-[6px] uppercase tracking-[0.16em] text-black/35">
                        RUE / GPS
                      </span>

                      <span className="mt-0.5 block text-[10px] font-bold">
                        Carte des récits
                      </span>
                    </div>

                    <span>→</span>
                  </Link>
                </div>
              )}
            </div>

            {/* ============================================= */}
            {/* ACCORDÉON CHAPITRE II */}
            {/* ============================================= */}

            <div className="border-b border-black/15">
              <button
                type="button"
                aria-expanded={
                  mobileSection === "chapter"
                }
                onClick={() =>
                  toggleMobileSection("chapter")
                }
                className="flex w-full items-center justify-between px-2 py-3 text-left"
              >
                <div className="flex items-center gap-3">
                  <span className="flex h-7 w-7 items-center justify-center border border-black/20 text-[7px] text-black/40">
                    02
                  </span>

                  <div>
                    <span className="block text-[6px] uppercase tracking-[0.18em] text-black/35">
                      Origines
                    </span>

                    <span className="mt-0.5 block text-[12px] font-bold">
                      D&apos;où je viens
                    </span>
                  </div>
                </div>

                <span
                  className={`text-lg font-light transition-transform duration-300 ${
                    mobileSection === "chapter"
                      ? "rotate-45"
                      : ""
                  }`}
                >
                  +
                </span>
              </button>

              {mobileSection === "chapter" && (
                <div className="grid grid-cols-2 gap-1.5 px-2 pb-3">
                  <Link
                    href="/d-ou-je-viens"
                    onClick={closeMobileMenu}
                    className="relative min-h-[70px] border border-black bg-[#713126] p-2.5 text-white"
                  >
                    <span className="text-[6px] uppercase tracking-[0.16em] text-white/45">
                      Chapitre II
                    </span>

                    <span className="absolute bottom-2.5 left-2.5 text-[11px] font-bold">
                      Le récit
                    </span>

                    <span className="absolute right-2.5 top-2.5 h-[5px] w-[5px] rounded-full bg-[#ff3b18]" />
                  </Link>

                  <Link
                    href="/d-ou-je-viens/lettre"
                    onClick={closeMobileMenu}
                    className="relative min-h-[70px] border border-black/15 p-2.5 active:bg-black active:text-white"
                  >
                    <span className="text-[6px] uppercase tracking-[0.16em] text-black/35">
                      Document
                    </span>

                    <span className="absolute bottom-2.5 left-2.5 text-[11px] font-bold">
                      La lettre
                    </span>
                  </Link>
                </div>
              )}
            </div>

            {/* ============================================= */}
            {/* À PROPOS */}
            {/* ============================================= */}

            <Link
              href="/histoire"
              onClick={closeMobileMenu}
              className="group/about flex items-center justify-between px-2 py-3"
            >
              <div className="flex items-center gap-3">
                <span className="flex h-7 w-7 items-center justify-center border border-black/20 text-[7px] text-black/40">
                  84
                </span>

                <div>
                  <span className="block text-[6px] uppercase tracking-[0.18em] text-black/35">
                    Portrait
                  </span>

                  <span className="mt-0.5 block text-[12px] font-bold">
                    À propos
                  </span>
                </div>
              </div>

              <span className="text-black/40 transition-transform group-hover/about:translate-x-1">
                →
              </span>
            </Link>

            {/* PIED */}

            <div className="flex items-center justify-between border-t border-black/20 py-2 text-[6px] uppercase tracking-[0.16em] text-black/30">
              <span>ISO 400</span>

              <span className="flex items-center gap-1.5">
                <span className="h-[4px] w-[4px] rounded-full bg-[#ff3b18]" />
                SSD
              </span>

              <span>ARCHIVE</span>
            </div>

            {/* PERFORATIONS BASSES */}

            <div className="flex justify-between">
              {Array.from({
                length: 10,
              }).map((_, index) => (
                <span
                  key={index}
                  className="h-[4px] w-[13px] bg-black"
                />
              ))}
            </div>
          </div>
        </details>
      </div>
    </header>
  );
}
