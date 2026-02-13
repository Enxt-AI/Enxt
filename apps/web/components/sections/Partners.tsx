"use client";

import { useEffect, useState } from "react";

interface Partner {
  id: string;
  name: string;
  logoUrl: string;
  color: string;
  order: number;
}

export const Partners = () => {
  const [partners, setPartners] = useState<Partner[]>([]);
  const [failedImages, setFailedImages] = useState<Set<string>>(new Set());

  useEffect(() => {
    fetch("/api/partners")
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) setPartners(data);
      })
      .catch((err) => console.error("Failed to load partners:", err));
  }, []);

  if (partners.length === 0) return null;

  const scrollItems = [...partners, ...partners, ...partners];

  return (
    <section className="py-24 bg-background border-t border-border/40 relative overflow-hidden">
      <div className="container mx-auto px-6 mb-16 text-center">
        <h2 className="text-5xl md:text-7xl font-black bg-clip-text text-transparent bg-gradient-to-r from-gray-900 via-gray-700 to-gray-900 mb-6 tracking-tight">
          Trusted Partners
        </h2>
        <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto font-light">
          Collaborating with industry leaders to deliver breakdown AI solutions.
        </p>
      </div>

      <div className="relative flex overflow-hidden group py-10">
        <div className="flex animate-scroll gap-16 group-hover:[animation-play-state:paused] w-max items-center whitespace-nowrap px-12">
          {scrollItems.map((partner, idx) => (
            <div
              key={`${partner.id}-${idx}`}
              className="flex items-center gap-4 group/item cursor-pointer shrink-0"
            >
              <div
                className={`p-4 rounded-2xl ${partner.color} transition-transform duration-300 group-hover/item:scale-110 shadow-sm flex items-center justify-center w-[72px] h-[72px]`}
              >
                {!failedImages.has(partner.id) ? (
                  <img
                    src={partner.logoUrl}
                    alt={partner.name}
                    className="w-10 h-10 object-contain"
                    onError={() =>
                      setFailedImages((prev) => new Set(prev).add(partner.id))
                    }
                  />
                ) : (
                  <span className="text-2xl font-bold">
                    {partner.name.charAt(0)}
                  </span>
                )}
              </div>
              <span className="text-2xl font-bold text-gray-800 group-hover/item:text-primary transition-colors">
                {partner.name}
              </span>
            </div>
          ))}
        </div>

        {/* Fade Edges */}
        <div className="pointer-events-none absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-background to-transparent" />
        <div className="pointer-events-none absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-background to-transparent" />
      </div>
    </section>
  );
};
