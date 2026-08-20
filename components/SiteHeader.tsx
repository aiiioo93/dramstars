"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";

import { photoSeries } from "@/lib/series";

export default function SiteHeader() {
  const mobileMenuRef = useRef<HTMLDetailsElement>(null);

  useEffect(() => {
    const handleOutsideClick = (event: PointerEvent) => {
      const menu = mobileMenuRef.current;

      if (!menu || !menu.open) {
        return;
      }

      const target = event.target as Node;

      if (!menu.contains(target)) {
        menu.open = false;
      }
    };

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape" && mobileMenuRef.current?.open) {
        mobileMenuRef.current.open = false;
      }
    };

    document.addEventListener("pointerdown", handleOutsideClick);
    document.addEventListener("keydown", handleEscape);

    return () => {
      document.removeEventListener("pointerdown", handleOutsideClick);
      document.removeEventListener("keydown", handleEscape);
    };
  }, []);

  const closeMobileMenu = () => {
    if (mobileMenuRef.current) {
      mobileMenuRef.current.open = false;
    }
  };

  return (
    <header className="sticky top-0 z-50 h-16 border-b border-black bg-[#f4f3ef]">
      <div className="mx-auto flex h-full max-w-[1600px] items-center justify-between px-5 md:px-10">
        {/* ================================================= */}
        {/* LOGO */}
        {/* ================================================= */}

        <Link
          href="/"
          className="text-lg font-bold tracking-[-0.04em] md:text-xl"
          onClick={closeMobileMenu}
        >
          LADRAMSTARS
        </Link>

        {/* ================================================= */}
        {/* DESKTOP */}
        {/* ================================================= */}

        <nav className="hidden h-full items-center gap-8 text-xs md:flex">
          <div className="group relative flex h-full items-center">
            <Link
              href="/ou-je-suis"
              className="flex items-center gap-2 tracking-[0.08em] transition-opacity hover:opacity-60"
            >
              Où je suis

              <span className="text-[8px] transition-transform duration-300 group-hover:rotate-180">
                ▼
              </span>
            </Link>

            {/* DROPDOWN DESKTOP */}
            <div className="pointer-events-none absolute right-0 top-full w-[430px] translate-y-3 opacity-0 transition-all duration-300 group-hover:pointer-events-auto group-hover:translate-y-0 group-hover:opacity-100">
              <div className="border border-black bg-[#080808] p-3 text-white shadow-[10px_10px_0_rgba(0,0,0,0.18)]">
                {/* FILM TOP */}
                <div className="mb-3 flex justify-between">
                  {Array.from({ length: 12 }).map((_, index) => (
                    <span
                      key={index}
                      className="h-[5px] w-[13px] bg-[#f4f3ef]"
                    />
                  ))}
                </div>

                {/* ENTÊTE */}
                <div className="flex items-center justify-between border-y border-white/25 py-3 text-[8px] uppercase tracking-[0.22em] text-white/50">
                  <span>LADRAMSTARS</span>
                  <span>Archives</span>
                  <span>35 mm</span>
                </div>

                {/* SÉRIES */}
                <div className="py-2">
                  {photoSeries.map((serie) => (
                    <Link
                      key={serie.slug}
                      href={`/series/${serie.slug}`}
                      className="group/item grid grid-cols-[48px_1fr_30px] items-center gap-4 border-b border-white/15 px-2 py-4 text-white transition-colors duration-200 last:border-b-0 hover:bg-[#1d1d1d]"
                    >
                      <div className="flex h-12 w-12 items-center justify-center border border-white/30 bg-[#111] text-[9px] text-white/50 transition-colors duration-300 group-hover/item:border-white/70 group-hover/item:text-white">
                        {serie.number}
                      </div>

                      <div>
                        <p className="text-[12px] font-bold leading-5 text-white">
                          {serie.title}
                        </p>

                        <p className="mt-1 text-[8px] uppercase tracking-[0.2em] text-white/45 transition-colors group-hover/item:text-white/65">
                          {serie.acronym} / Seine-Saint-Denis
                        </p>
                      </div>

                      <span className="text-right text-sm text-white/50 transition-all duration-300 group-hover/item:translate-x-1 group-hover/item:text-white">
                        →
                      </span>
                    </Link>
                  ))}
                </div>

                {/* INFOS BAS */}
                <div className="flex justify-between border-t border-white/25 pt-3 text-[7px] uppercase tracking-[0.2em] text-white/40">
                  <span>Archive photographique</span>
                  <span>ISO 400</span>
                  <span>01 / 03</span>
                </div>

                {/* FILM BOTTOM */}
                <div className="mt-3 flex justify-between">
                  {Array.from({ length: 12 }).map((_, index) => (
                    <span
                      key={index}
                      className="h-[5px] w-[13px] bg-[#f4f3ef]"
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>

          <Link
            href="/histoire"
            className="tracking-[0.08em] transition-opacity hover:opacity-50"
          >
            À propos
          </Link>
        </nav>

        {/* ================================================= */}
        {/* MOBILE — VISEUR PHOTO */}
        {/* ================================================= */}

        <details
          ref={mobileMenuRef}
          className="group relative md:hidden"
        >
          <summary
            aria-label="Ouvrir la navigation"
            className="relative flex h-10 w-10 cursor-pointer list-none items-center justify-center [&::-webkit-details-marker]:hidden"
          >
            {/* CERCLE EXTÉRIEUR */}
            <span className="absolute inset-[4px] rounded-full border border-black/30 transition-all duration-500 ease-out group-open:scale-75 group-open:opacity-0" />

            {/* CADRE DE MISE AU POINT */}
            <span className="absolute inset-[8px] border border-black transition-all duration-500 ease-out group-open:rotate-45 group-open:scale-90" />

            {/* AXE HORIZONTAL */}
            <span className="absolute h-px w-5 bg-black transition-all duration-500 ease-out group-open:w-6 group-open:rotate-45" />

            {/* AXE VERTICAL */}
            <span className="absolute h-5 w-px bg-black transition-all duration-500 ease-out group-open:h-6 group-open:rotate-45" />

            {/* POINT DE FOCUS */}
            <span className="relative z-10 h-1.5 w-1.5 rounded-full bg-black transition-all duration-300 group-open:scale-0 group-open:opacity-0" />
          </summary>

          {/* ================================================= */}
          {/* PANNEAU MOBILE */}
          {/* ================================================= */}

                    <div className="absolute right-0 top-12 w-[min(86vw,330px)] origin-top-right border border-black bg-[#f4f3ef] p-3 text-black shadow-[8px_8px_0_rgba(0,0,0,0.18)]">
            {/* PERFORATIONS HAUTES */}
            <div className="mb-3 flex justify-between">
                {Array.from({ length: 9 }).map((_, index) => (
                <span
                    key={index}
                    className="h-[5px] w-[14px] bg-black"
                />
                ))}
            </div>

            {/* EN-TÊTE ARCHIVE */}
            <div className="flex items-center justify-between border-y border-black/20 py-3 text-[7px] uppercase tracking-[0.2em] text-black/45">
                <span>LADRAMSTARS</span>
                <span>35 MM / ARCHIVES</span>
            </div>

            {/* OÙ JE SUIS */}
            <Link
                href="/ou-je-suis"
                onClick={closeMobileMenu}
                className="group/link flex items-center justify-between border-b border-black/15 px-2 py-5 transition-colors duration-300 hover:bg-black/[0.05]"
            >
                <div>
                <span className="block text-[8px] uppercase tracking-[0.18em] text-black/40">
                    Index
                </span>

                <span className="mt-1 block text-sm font-bold text-black">
                    Où je suis
                </span>
                </div>

                <span className="text-black/45 transition-transform duration-300 group-hover/link:translate-x-1 group-hover/link:text-black">
                →
                </span>
            </Link>

            {/* SÉRIES */}
            {photoSeries.map((serie) => (
                <Link
                key={serie.slug}
                href={`/series/${serie.slug}`}
                onClick={closeMobileMenu}
                className="group/serie grid grid-cols-[38px_1fr_20px] items-center gap-3 border-b border-black/15 px-2 py-4 transition-colors duration-300 hover:bg-black/[0.05]"
                >
                <div className="flex h-9 w-9 items-center justify-center border border-black/25 text-[8px] text-black/45 transition-colors duration-300 group-hover/serie:border-black/70 group-hover/serie:text-black">
                    {serie.number}
                </div>

                <div>
                    <span className="block text-[10px] font-bold leading-4 text-black">
                    {serie.title}
                    </span>

                    <span className="mt-1 block text-[7px] uppercase tracking-[0.18em] text-black/40">
                    {serie.acronym}
                    </span>
                </div>

                <span className="text-[10px] text-black/40 transition-transform duration-300 group-hover/serie:translate-x-1 group-hover/serie:text-black">
                    →
                </span>
                </Link>
            ))}

            {/* À PROPOS */}
            <Link
                href="/histoire"
                onClick={closeMobileMenu}
                className="group/story flex items-center justify-between px-2 py-5 transition-colors duration-300 hover:bg-black/[0.05]"
            >
                <div>
                <span className="block text-[8px] uppercase tracking-[0.18em] text-black/40">
                    Portrait
                </span>

                <span className="mt-1 block text-sm font-bold text-black">
                    À propos
                </span>
                </div>

                <span className="text-black/45 transition-transform duration-300 group-hover/story:translate-x-1 group-hover/story:text-black">
                →
                </span>
            </Link>

            {/* PIED ARCHIVE */}
            <div className="mb-2 flex justify-between border-t border-black/20 pt-3 text-[7px] uppercase tracking-[0.18em] text-black/35">
                <span>ISO 400</span>
                <span>Seine-Saint-Denis</span>
                <span>84</span>
            </div>

            {/* PERFORATIONS BASSES */}
            <div className="flex justify-between">
                {Array.from({ length: 9 }).map((_, index) => (
                <span
                    key={index}
                    className="h-[5px] w-[14px] bg-black"
                />
                ))}
            </div>
            </div>
        </details>
      </div>
    </header>
  );
}