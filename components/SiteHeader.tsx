"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";

const seriesLabels = ["ZUP", "LSB", "RUE"];

export default function SiteHeader() {
  const desktopMenuRef = useRef<HTMLDivElement>(null);
  const mobileMenuRef = useRef<HTMLDetailsElement>(null);
  const [desktopMenuOpen, setDesktopMenuOpen] = useState(false);

  useEffect(() => {
    const handleOutsideClick = (event: PointerEvent) => {
      const target = event.target as Node;

      if (
        desktopMenuOpen &&
        desktopMenuRef.current &&
        !desktopMenuRef.current.contains(target)
      ) {
        setDesktopMenuOpen(false);
      }

      if (
        mobileMenuRef.current?.open &&
        !mobileMenuRef.current.contains(target)
      ) {
        mobileMenuRef.current.open = false;
      }
    };

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key !== "Escape") {
        return;
      }

      setDesktopMenuOpen(false);
      if (mobileMenuRef.current) {
        mobileMenuRef.current.open = false;
      }
    };

    document.addEventListener("pointerdown", handleOutsideClick);
    document.addEventListener("keydown", handleEscape);

    return () => {
      document.removeEventListener("pointerdown", handleOutsideClick);
      document.removeEventListener("keydown", handleEscape);
    };
  }, [desktopMenuOpen]);

  const closeMenus = () => {
    setDesktopMenuOpen(false);
    if (mobileMenuRef.current) {
      mobileMenuRef.current.open = false;
    }
  };

  return (
    <header className="sticky top-0 z-50 h-16 border-b border-black bg-[#f4f3ef]">
      <div className="mx-auto flex h-full max-w-[1600px] items-center justify-between px-5 md:px-10">
        <Link
          href="/"
          className="relative text-lg font-bold tracking-[-0.04em] md:text-xl"
          onClick={closeMenus}
        >
          LADRAMSTARS
          <span className="absolute -right-3 top-0 h-[5px] w-[5px] rounded-full bg-black" />
        </Link>

        <nav className="hidden h-full items-center gap-8 text-xs md:flex">
          <div
            ref={desktopMenuRef}
            className="group relative flex h-full items-center"
          >
            <button
              type="button"
              aria-expanded={desktopMenuOpen}
              aria-controls="desktop-explorer-menu"
              onClick={() => setDesktopMenuOpen((open) => !open)}
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

            <div
              id="desktop-explorer-menu"
              className={`absolute right-0 top-full w-[520px] pt-2 transition-all duration-300 group-hover:pointer-events-auto group-hover:opacity-100 ${
                desktopMenuOpen
                  ? "pointer-events-auto opacity-100"
                  : "pointer-events-none opacity-0"
              }`}
            >
              <div
                className={`border border-black bg-[#d8d4ca] p-3 text-black shadow-[12px_12px_0_rgba(0,0,0,0.16)] transition-transform duration-300 group-hover:translate-y-0 ${
                  desktopMenuOpen ? "translate-y-0" : "translate-y-2"
                }`}
              >
                <div className="mb-3 flex justify-between">
                  {Array.from({ length: 13 }).map((_, index) => (
                    <span key={index} className="h-[5px] w-[13px] bg-black" />
                  ))}
                </div>

                <div className="flex items-center justify-between border-y border-black/20 py-2.5 text-[7px] uppercase tracking-[0.22em] text-black/40">
                  <span>LADRAMSTARS</span>
                  <span>Index photographique</span>
                  <span>35 MM</span>
                </div>

                <div className="grid grid-cols-[1.35fr_0.65fr]">
                  <div className="border-r border-black/20 pr-3 pt-3">
                    <Link
                      href="/ou-je-suis"
                      onClick={closeMenus}
                      className="group/map relative flex min-h-[170px] flex-col justify-between overflow-hidden border border-black p-4 transition-colors duration-300 hover:bg-black hover:text-[#f4f3ef]"
                    >
                      <div className="flex items-start justify-between">
                        <span className="text-[7px] uppercase tracking-[0.2em] text-black/40 transition-colors group-hover/map:text-white/45">
                          Chapitre I
                        </span>
                        <span className="transition-all duration-300 group-hover/map:translate-x-1 group-hover/map:text-[#f4f3ef]">
                          →
                        </span>
                      </div>
                      <div>
                        <span className="block text-2xl font-bold uppercase leading-[0.9] tracking-[-0.055em] transition-colors group-hover/map:text-[#f4f3ef]">
                          Où je suis
                        </span>
                        <span className="mt-2 block text-[8px] uppercase tracking-[0.16em] text-black/45 transition-colors group-hover/map:text-white/55">
                          Carte photographique
                        </span>
                      </div>
                    </Link>

                    <div className="mt-2 flex gap-1.5" aria-label="Séries disponibles comme filtres sur la carte">
                      {seriesLabels.map((label) => (
                        <span
                          key={label}
                          className="flex-1 border border-black/20 px-2 py-2 text-center text-[7px] font-bold tracking-[0.16em]"
                        >
                          {label}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="pl-3 pt-3">
                    <Link
                      href="/histoire"
                      onClick={closeMenus}
                      className="group/about flex min-h-[170px] flex-col justify-between border border-black p-3 transition-colors duration-300 hover:bg-black hover:text-[#f4f3ef]"
                    >
                      <span className="text-[7px] uppercase tracking-[0.18em] text-black/40 transition-colors group-hover/about:text-white/45">
                        Portrait
                      </span>
                      <span className="text-xl font-bold uppercase tracking-[-0.05em] transition-colors group-hover/about:text-[#f4f3ef]">
                        À propos
                      </span>
                      <span className="self-end transition-all duration-300 group-hover/about:translate-x-1 group-hover/about:text-[#f4f3ef]">
                        →
                      </span>
                    </Link>
                  </div>
                </div>

                <div className="mt-3 flex items-center justify-between border-t border-black/20 pt-2.5 text-[7px] uppercase tracking-[0.18em] text-black/30">
                  <span>Personnes nommées</span>
                  <span>Lieux non nommés</span>
                  <span>ISO 400</span>
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

        <details ref={mobileMenuRef} className="group relative md:hidden">
          <summary
            aria-label="Ouvrir la navigation"
            className="relative flex h-10 w-10 cursor-pointer list-none items-center justify-center [&::-webkit-details-marker]:hidden"
          >
            <span className="absolute inset-[4px] rounded-full border border-black/30 transition-all duration-500 group-open:scale-75 group-open:opacity-0" />
            <span className="absolute inset-[8px] border border-black transition-all duration-500 group-open:rotate-45 group-open:scale-90" />
            <span className="absolute h-px w-5 bg-black transition-all duration-500 group-open:w-6 group-open:rotate-45" />
            <span className="absolute h-5 w-px bg-black transition-all duration-500 group-open:h-6 group-open:rotate-45" />
            <span className="relative z-10 h-1.5 w-1.5 rounded-full bg-black transition-all duration-300 group-open:scale-0 group-open:opacity-0" />
          </summary>

          <div className="absolute right-0 top-12 w-[min(91vw,350px)] origin-top-right border border-black bg-[#d8d4ca] p-3 text-black shadow-[8px_8px_0_rgba(0,0,0,0.18)]">
            <div className="mb-2 flex justify-between">
              {Array.from({ length: 10 }).map((_, index) => (
                <span key={index} className="h-[4px] w-[13px] bg-black" />
              ))}
            </div>

            <div className="flex items-center justify-between border-y border-black/20 py-2 text-[6px] uppercase tracking-[0.2em] text-black/40">
              <span>LADRAMSTARS</span>
              <span>35 MM / INDEX</span>
              <span>84</span>
            </div>

            <Link
              href="/ou-je-suis"
              onClick={closeMenus}
              className="group/mobile-map mt-2 flex min-h-[92px] items-end justify-between border border-black p-3 transition-colors duration-200 hover:bg-black hover:text-[#f4f3ef] active:bg-black active:text-[#f4f3ef] focus-visible:bg-black focus-visible:text-[#f4f3ef]"
            >
              <div>
                <span className="block text-[6px] uppercase tracking-[0.18em] text-black/40 transition-colors group-hover/mobile-map:text-white/45">
                  Chapitre I / Carte
                </span>
                <span className="mt-2 block text-lg font-bold uppercase tracking-[-0.05em] transition-colors group-hover/mobile-map:text-[#f4f3ef]">
                  Où je suis
                </span>
              </div>
              <span className="transition-all group-hover/mobile-map:translate-x-1 group-hover/mobile-map:text-[#f4f3ef]">
                →
              </span>
            </Link>

            <div className="mt-1.5 grid grid-cols-3 gap-1.5">
              {seriesLabels.map((label) => (
                <span
                  key={label}
                  className="border border-black/20 px-2 py-2 text-center text-[7px] font-bold tracking-[0.16em]"
                >
                  {label}
                </span>
              ))}
            </div>

            <Link
              href="/histoire"
              onClick={closeMenus}
              className="mt-2 flex items-center justify-between border border-black/20 px-3 py-3 text-[11px] font-bold transition-colors hover:bg-black hover:text-[#f4f3ef] active:bg-black active:text-[#f4f3ef]"
            >
              À propos <span>→</span>
            </Link>

            <div className="mt-3 flex items-center justify-between border-t border-black/20 pt-2 text-[6px] uppercase tracking-[0.17em] text-black/30">
              <span>Personnes nommées</span>
              <span>Lieux non nommés</span>
            </div>
          </div>
        </details>
      </div>
    </header>
  );
}
