"use client";

import { useEffect, useState } from "react";

interface PortfolioData {
  sectionTitle: string;
  description: string;
  videoUrl: string;
  videoTitle: string;
}

export function Portfolio() {
  const [data, setData] = useState<PortfolioData | null>(null);

  useEffect(() => {
    (async () => {
      try {
        const res = await fetch("/api/ai-film/portfolio");
        const json = await res.json();
        if (json) setData(json);
      } catch (err) {
        console.error("Failed to fetch portfolio data:", err);
      }
    })();
  }, []);

  if (!data) return null;

  return (
    <section id="portfolio" className="relative py-32 bg-background">
      <div className="container mx-auto px-6 sm:px-8 lg:px-12">
        <div className="text-center mb-20">
          <div className="inline-flex items-center gap-3 mb-6">
            <div className="w-3 h-3 bg-accent-emerald rounded-full animate-pulse" />
            <span className="text-sm font-semibold text-muted-foreground">
              Featured Work
            </span>
            <div className="w-3 h-3 bg-accent-blue rounded-full animate-pulse" />
          </div>
          <h2 className="text-5xl sm:text-6xl lg:text-7xl font-black leading-tight mb-8">
            {data.sectionTitle}
          </h2>
          <p className="text-2xl lg:text-3xl text-muted-foreground max-w-4xl mx-auto leading-relaxed">
            {data.description}
          </p>
        </div>

        <div className="max-w-6xl mx-auto">
          <div className="relative bg-card clean-border rounded-3xl overflow-hidden elevated-shadow">
            <div className="aspect-video relative">
              <iframe
                src={data.videoUrl}
                title={data.videoTitle}
                className="w-full h-full"
                allowFullScreen
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
