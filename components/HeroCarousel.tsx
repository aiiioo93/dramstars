"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

type HeroCarouselProps = {
  images: string[];
};

export default function HeroCarousel({ images }: HeroCarouselProps) {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    if (images.length <= 1) return;

    const interval = window.setInterval(() => {
      setCurrent((previous) => (previous + 1) % images.length);
    }, 5000);

    return () => window.clearInterval(interval);
  }, [images.length]);

  const previousImage = () => {
    setCurrent((previous) =>
      previous === 0 ? images.length - 1 : previous - 1,
    );
  };

  const nextImage = () => {
    setCurrent((previous) => (previous + 1) % images.length);
  };

  return (
    <div className="relative h-full min-h-0 overflow-hidden bg-black text-white">
      {images.length > 0 ? (
        <>
          {images.map((image, index) => (
            <Image
              key={image}
              src={image}
              alt={`Photographie La dramstars ${index + 1}`}
              fill
              priority={index === 0}
              sizes="(max-width: 1024px) 100vw, 60vw"
              className={`object-cover transition-opacity duration-1000 ${
                index === current ? "opacity-100" : "opacity-0"
              }`}
            />
          ))}

          {/* Zones de navigation */}
          {images.length > 1 && (
            <>
              <button
                type="button"
                onClick={previousImage}
                aria-label="Photographie précédente"
                className="absolute bottom-1/2 left-0 top-0 z-20 w-1/2 cursor-w-resize"
              />

              <button
                type="button"
                onClick={nextImage}
                aria-label="Photographie suivante"
                className="absolute bottom-1/2 right-0 top-0 z-20 w-1/2 cursor-e-resize"
              />
            </>
          )}
        </>
      ) : (
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="-rotate-90 text-[9px] uppercase tracking-[0.3em] text-white/30 md:text-xs">
            Photographies à venir
          </span>
        </div>
      )}

      {/* INFOS — même logique qu'avant */}
      <div className="absolute left-5 top-4 z-30 text-[9px] uppercase tracking-[0.14em] md:left-8 md:top-8 md:text-[10px]">
        Image / {String(current + 1).padStart(3, "0")}
      </div>

      <div className="absolute bottom-4 left-5 right-5 z-30 flex justify-between border-t border-white/30 pt-2 text-[8px] uppercase tracking-[0.12em] md:bottom-8 md:left-8 md:right-8 md:pt-3 md:text-[9px]">
        <span>La dramstars</span>

        {images.length > 1 ? (
          <span>
            {String(current + 1).padStart(2, "0")} /{" "}
            {String(images.length).padStart(2, "0")}
          </span>
        ) : (
          <span>Photographie urbaine</span>
        )}
      </div>
    </div>
  );
}