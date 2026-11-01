"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";

const series = ["zup", "lsb", "rue"] as const;

export default function SiteHeader() {
  const menuRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const closeOutside = (event: PointerEvent) => {
      if (open && !menuRef.current?.contains(event.target as Node)) setOpen(false);
    };
    const closeEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
        triggerRef.current?.focus();
      }
    };
    document.addEventListener("pointerdown", closeOutside);
    document.addEventListener("keydown", closeEscape);
    return () => {
      document.removeEventListener("pointerdown", closeOutside);
      document.removeEventListener("keydown", closeEscape);
    };
  }, [open]);

  const close = () => setOpen(false);

  return (
    <header className="sticky top-0 z-50 h-16 border-b border-black bg-[#f4f3ef]">
      <div className="mx-auto flex h-full max-w-[1600px] items-center justify-between px-5 md:px-10">
        <Link href="/" onClick={close} className="text-lg font-bold tracking-[-0.04em] md:text-xl">
          LADRAMSTARS
        </Link>
        <div ref={menuRef} className="relative">
          <button ref={triggerRef} type="button" aria-label={open ? "Fermer la navigation" : "Ouvrir la navigation"} aria-expanded={open} aria-controls="site-menu" onClick={() => setOpen((value) => !value)} className="relative flex h-10 w-10 items-center justify-center border border-black bg-[#f4f3ef] transition-colors hover:bg-[#713126] hover:text-white focus-visible:bg-[#713126] focus-visible:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black">
            <span className="h-px w-5 bg-current" />
            <span className={`absolute h-5 w-px bg-current transition-transform ${open ? "rotate-90" : ""}`} />
          </button>
          <div id="site-menu" hidden={!open} className="absolute right-0 top-12 w-[min(92vw,440px)] border border-black bg-[#c9c6bd] p-3 text-black shadow-[8px_8px_0_rgba(0,0,0,0.18)]">
            <p className="border-b border-black/25 pb-2 text-[7px] uppercase tracking-[0.2em] text-black/55">Chapitre I</p>
            <Link href="/ou-je-suis" onClick={close} className="group mt-3 flex min-h-28 items-end justify-between border border-black p-4 transition-colors hover:bg-black hover:text-white focus-visible:bg-black focus-visible:text-white">
              <span><span className="block text-[7px] uppercase tracking-[0.18em] opacity-55">PsychoKarta</span><span className="mt-2 block text-2xl font-bold uppercase tracking-[-0.05em]">Où je suis</span></span><span aria-hidden="true">→</span>
            </Link>
            <nav aria-label="Accès directs aux séries" className="mt-2 grid grid-cols-3 gap-2">
              {series.map((slug) => <Link key={slug} href={`/series/${slug}`} onClick={close} className="border border-black px-2 py-3 text-center text-[8px] font-bold uppercase tracking-[0.16em] transition-colors hover:bg-[#713126] hover:text-white focus-visible:bg-[#713126] focus-visible:text-white">{slug}</Link>)}
            </nav>
            <Link href="/histoire" onClick={close} className="mt-2 flex items-center justify-between border border-black px-3 py-4 text-xs font-bold uppercase tracking-[0.08em] transition-colors hover:bg-black hover:text-white focus-visible:bg-black focus-visible:text-white">Mon histoire <span aria-hidden="true">→</span></Link>
          </div>
        </div>
      </div>
    </header>
  );
}
