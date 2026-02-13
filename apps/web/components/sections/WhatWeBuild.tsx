"use client";
import { motion } from "framer-motion";
import dynamic from "next/dynamic";

const PdfCarousel = dynamic(() => import("./PdfCarousel"), {
  ssr: false,
  loading: () => (
    <div className="h-[600px] w-full flex items-center justify-center text-muted-foreground">
      Loading Presentation...
    </div>
  ),
});

export function WhatWeBuild() {
  return (
    <section
      className="py-24 bg-background relative overflow-hidden"
      id="what-we-build"
    >
      {/* Dynamic Background */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-white via-gray-50 to-white -z-10" />
      <div className="absolute top-0 left-0 w-full h-full bg-[url('/grid.svg')] opacity-[0.03] -z-10 invert" />

      <div className="container mx-auto px-6 mb-16 text-left">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          {/* Badge Removed */}
          <h2 className="text-4xl md:text-7xl font-black bg-clip-text text-transparent bg-gradient-to-r from-gray-900 via-gray-700 to-gray-900 mb-6 tracking-tight">
            Our Capabilities
          </h2>
          <p className="text-xl md:text-2xl text-muted-foreground mr-auto leading-relaxed max-w-2xl font-light">
            A comprehensive look at our AI transformation strategies.
            <span className="md:hidden block mt-2 text-sm text-primary/80">
              Swipe to explore
            </span>
          </p>
        </motion.div>
      </div>

      <PdfCarousel />
    </section>
  );
}
