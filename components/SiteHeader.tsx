import Link from "next/link";
import { photoSeries } from "@/lib/series";

export default function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 h-16 border-b border-black bg-[#f4f3ef]">
      <div className="mx-auto flex h-full max-w-[1600px] items-center justify-between px-5 md:px-10">
        <Link
          href="/"
          className="text-lg font-bold tracking-[-0.04em] md:text-xl"
        >
          LADRAMSTARS
        </Link>

        {/* DESKTOP */}
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

            {/* DROPDOWN */}
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

                <div className="flex items-center justify-between border-y border-white/25 py-3 text-[8px] uppercase tracking-[0.22em] text-white/50">
                  <span>LADRAMSTARS</span>

                  <span>35 mm</span>
                </div>

                <div className="py-2">
                  {photoSeries.map((serie) => (
                    <Link
                      key={serie.slug}
                      href={`/series/${serie.slug}`}
                      className="group/item grid grid-cols-[48px_1fr_30px] items-center gap-4 border-b border-white/15 px-2 py-4 text-white transition-colors duration-200 last:border-b-0 hover:bg-[#1d1d1d]"
                    >
                      {/* FAUX CADRE PELLICULE */}
                      <div className="flex h-12 w-12 items-center justify-center border border-white/30 bg-[#111] text-[9px] text-white/50 transition-colors group-hover/item:border-white/70 group-hover/item:text-white">
                        {serie.number}
                      </div>

                      <div>
                        <p className="text-[12px] font-bold leading-5 text-white">
                          {serie.title}
                        </p>

                        <p className="mt-1 text-[8px] uppercase tracking-[0.2em] text-white/45 group-hover/item:text-white/65">
                          {serie.acronym} / Seine-Saint-Denis
                        </p>
                      </div>

                      <span className="text-right text-sm text-white/50 transition-all group-hover/item:translate-x-1 group-hover/item:text-white">
                        →
                      </span>
                    </Link>
                  ))}
                </div>

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

        {/* MOBILE */}
        <details className="relative md:hidden">
          <summary className="cursor-pointer list-none text-[10px] uppercase tracking-[0.15em]">
            Menu
          </summary>

          <div className="absolute right-0 top-8 w-[300px] border border-white/20 bg-black p-2 text-white shadow-xl">
            <Link
              href="/ou-je-suis"
              className="block border-b border-white/20 px-3 py-4 text-xs"
            >
              Chapitre I — Où je suis
            </Link>

            {photoSeries.map((serie) => (
              <Link
                key={serie.slug}
                href={`/series/${serie.slug}`}
                className="flex items-center justify-between border-b border-white/15 px-3 py-4 text-[10px]"
              >
                <div>
                  <span className="block font-bold">{serie.title}</span>
                  <span className="mt-1 block text-[8px] text-white/45">
                    {serie.acronym}
                  </span>
                </div>

                <span>→</span>
              </Link>
            ))}

            <Link
              href="/histoire"
              className="block px-3 py-4 text-xs"
            >
              À propos
            </Link>
          </div>
        </details>
      </div>
    </header>
  );
}