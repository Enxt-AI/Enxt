"use client";
import { HeroParallax } from "@/components/ui/hero-parallax";
import { FlipWords } from "@/components/ui/flip-words";
import { useEffect, useState } from "react";

// Fallback products in case the API is unreachable
const fallbackProducts = [
  {
    title: "AI Dashboard",
    link: "#",
    thumbnail:
      "https://aceternity.com/images/products/thumbnails/new/moonbeam.png",
  },
  {
    title: "Analytics Suite",
    link: "#",
    thumbnail:
      "https://aceternity.com/images/products/thumbnails/new/cursor.png",
  },
  {
    title: "Automation Hub",
    link: "#",
    thumbnail:
      "https://aceternity.com/images/products/thumbnails/new/rogue.png",
  },
  {
    title: "Data Platform",
    link: "#",
    thumbnail:
      "https://aceternity.com/images/products/thumbnails/new/editorially.png",
  },
  {
    title: "AI Assistant",
    link: "#",
    thumbnail:
      "https://aceternity.com/images/products/thumbnails/new/editrix.png",
  },
  {
    title: "Cloud Services",
    link: "#",
    thumbnail:
      "https://aceternity.com/images/products/thumbnails/new/pixelperfect.png",
  },
  {
    title: "ML Pipeline",
    link: "#",
    thumbnail:
      "https://aceternity.com/images/products/thumbnails/new/algochurn.png",
  },
  {
    title: "Integration API",
    link: "#",
    thumbnail:
      "https://aceternity.com/images/products/thumbnails/new/aceternityui.png",
  },
  {
    title: "Security Suite",
    link: "#",
    thumbnail:
      "https://aceternity.com/images/products/thumbnails/new/tailwindmasterkit.png",
  },
  {
    title: "Smart Reports",
    link: "#",
    thumbnail:
      "https://aceternity.com/images/products/thumbnails/new/smartbridge.png",
  },
  {
    title: "Workflow Engine",
    link: "#",
    thumbnail:
      "https://aceternity.com/images/products/thumbnails/new/renderwork.png",
  },
  {
    title: "Custom Solutions",
    link: "#",
    thumbnail:
      "https://aceternity.com/images/products/thumbnails/new/cremedigital.png",
  },
  {
    title: "Training Portal",
    link: "#",
    thumbnail:
      "https://aceternity.com/images/products/thumbnails/new/goldenbellsacademy.png",
  },
  {
    title: "Dev Tools",
    link: "#",
    thumbnail:
      "https://aceternity.com/images/products/thumbnails/new/invoker.png",
  },
  {
    title: "Enterprise AI",
    link: "#",
    thumbnail:
      "https://aceternity.com/images/products/thumbnails/new/efreeinvoice.png",
  },
];

export function HeroParallaxSection() {
  const [products, setProducts] = useState(fallbackProducts);

  useEffect(() => {
    fetch("/api/hero-products")
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data) && data.length > 0) {
          setProducts(data);
        }
      })
      .catch(() => {
        // Silently use fallback products
      });
  }, []);

  return (
    <div className="relative bg-background overflow-hidden">
      {/* Hero Text Overlay */}
      <div className="absolute top-0 left-0 right-0 z-20 pointer-events-none">
        <div className="container mx-auto px-4 pt-32 md:pt-40">
          <div className="max-w-4xl relative">
            <div className="relative pointer-events-auto">
              <h1 className="text-4xl font-bold text-gray-900 md:text-7xl lg:text-8xl tracking-tighter leading-[0.9]">
                Building the{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-600 to-indigo-600">
                  Future
                </span>{" "}
                <br /> of{" "}
                <FlipWords
                  words={[
                    "Intelligence",
                    "Automation",
                    "Innovation",
                    "Business",
                  ]}
                  duration={2000}
                  className="text-gray-900 font-light italic"
                />
              </h1>
              <p className="mt-8 max-w-2xl text-lg text-gray-500 md:text-xl leading-relaxed font-medium">
                We design independent, intelligent systems that scale. From{" "}
                <span className="text-gray-900 font-semibold">
                  LLM orchestration
                </span>{" "}
                to{" "}
                <span className="text-gray-900 font-semibold">
                  autonomous agents
                </span>
                , we architect the infrastructure of tomorrow.
              </p>

              {/* Metrics */}
              <div className="mt-10 flex flex-wrap gap-8 border-t border-gray-100 pt-8">
                <div>
                  <div className="text-3xl font-bold text-gray-900 tabular-nums">
                    98%
                  </div>
                  <div className="text-sm text-gray-500 font-medium">
                    Success Rate
                  </div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-gray-900 tabular-nums">
                    2.5M+
                  </div>
                  <div className="text-sm text-gray-500 font-medium">
                    Tasks Automations
                  </div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-gray-900 tabular-nums">
                    24/7
                  </div>
                  <div className="text-sm text-gray-500 font-medium">
                    Expert Support
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Parallax Images */}
      <HeroParallax products={products} />
    </div>
  );
}
