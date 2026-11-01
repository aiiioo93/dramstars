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

    </div>
  );
}
