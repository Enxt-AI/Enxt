"use client";
import { useState, useRef } from "react";
import { Document, Page, pdfjs } from "react-pdf";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Loader2 } from "lucide-react";
import "react-pdf/dist/Page/AnnotationLayer.css";
import "react-pdf/dist/Page/TextLayer.css";

// Set worker source
pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;

export default function PdfCarousel() {
  const [numPages, setNumPages] = useState<number | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isHovering, setIsHovering] = useState(false);

  function onDocumentLoadSuccess({ numPages }: { numPages: number }) {
    setNumPages(numPages);
  }

  const scroll = (direction: "left" | "right") => {
    if (containerRef.current) {
      const scrollAmount = containerRef.current.clientWidth * 0.8;
      const currentScroll = containerRef.current.scrollLeft;
      const targetScroll =
        direction === "left"
          ? currentScroll - scrollAmount
          : currentScroll + scrollAmount;

      containerRef.current.scrollTo({
        left: targetScroll,
        behavior: "smooth",
      });
    }
  };

  return (
    <div
      className="w-full relative group pl-6 md:pl-12"
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      {/* Glow Effects - Adjusted for Light Mode */}
      <div className="absolute top-1/2 left-0 w-32 h-[500px] -translate-y-1/2 bg-gradient-to-r from-background to-transparent z-10 pointer-events-none" />
      <div className="absolute top-1/2 right-0 w-32 h-[500px] -translate-y-1/2 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none" />

      <div
        ref={containerRef}
        className="flex overflow-x-auto pb-16 pt-8 gap-8 px-4 snap-x snap-mandatory scrollbar-hide items-center justify-start"
        style={{
          scrollbarWidth: "none",
          msOverflowStyle: "none",
        }}
      >
        <Document
          file="/EnxtAI Pitch Deck.pdf"
          onLoadSuccess={onDocumentLoadSuccess}
          className="flex gap-8"
          loading={
            <div className="h-[500px] w-full flex flex-col items-center justify-center gap-4 text-gray-400">
              <Loader2 className="w-8 h-8 animate-spin text-primary" />
              <span className="text-sm font-light tracking-widest uppercase">
                Loading Deck...
              </span>
            </div>
          }
          error={
            <div className="h-[400px] w-full flex items-center justify-center text-red-500 bg-red-50 rounded-xl border border-red-200">
              Failed to load the presentation.
            </div>
          }
        >
          {numPages &&
            Array.from(new Array(numPages), (el, index) => {
              const pageNumber = index + 1;
              // Skip first 3 pages and the last page
              if (pageNumber <= 3 || pageNumber === numPages) return null;

              return (
                <motion.div
                  key={`page_${index + 1}`}
                  className="snap-center shrink-0 relative flex flex-col items-center justify-center perspective-1000"
                  initial={{ opacity: 0, scale: 0.9, rotateY: 5 }}
                  whileInView={{ opacity: 1, scale: 1, rotateY: 0 }}
                  transition={{ duration: 0.6, delay: 0.1 }}
                  viewport={{ margin: "-10%" }}
                >
                  <div className="relative group/page">
                    {/* Page Halo */}
                    <div className="absolute -inset-1 bg-gradient-to-r from-purple-500 to-blue-500 rounded-2xl opacity-0 group-hover/page:opacity-20 blur-xl transition-opacity duration-500" />

                    <div className="relative rounded-xl overflow-hidden shadow-2xl transition-all duration-300 ring-1 ring-black/5 bg-white">
                      <Page
                        pageNumber={index + 1}
                        height={600}
                        className="max-h-[50vh] md:max-h-[65vh] w-auto bg-white select-none"
                        renderTextLayer={false}
                        renderAnnotationLayer={false}
                        loading={
                          <div className="w-[450px] aspect-[4/3] bg-gray-100 animate-pulse flex items-center justify-center border border-gray-200"></div>
                        }
                      />

                      {/* Glass Overlay on Hover */}
                      <div className="absolute inset-0 bg-gradient-to-tr from-black/5 to-transparent opacity-0 group-hover/page:opacity-100 transition-opacity duration-300 pointer-events-none" />
                    </div>
                  </div>
                </motion.div>
              );
            })}
        </Document>
      </div>

      {/* Navigation Buttons */}
      <AnimatePresence>
        {numPages && (
          <>
            <motion.button
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              onClick={() => scroll("left")}
              className="absolute top-1/2 left-8 -translate-y-1/2 md:flex hidden items-center justify-center w-14 h-14 rounded-full bg-neutral-900/80 backdrop-blur-md border border-white/10 text-white shadow-2xl hover:bg-white hover:text-black transition-all duration-300 z-20 group/btn"
            >
              <ChevronLeft className="w-6 h-6 group-hover/btn:-translate-x-0.5 transition-transform" />
            </motion.button>

            <motion.button
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              onClick={() => scroll("right")}
              className="absolute top-1/2 right-8 -translate-y-1/2 md:flex hidden items-center justify-center w-14 h-14 rounded-full bg-neutral-900/80 backdrop-blur-md border border-white/10 text-white shadow-2xl hover:bg-white hover:text-black transition-all duration-300 z-20 group/btn"
            >
              <ChevronRight className="w-6 h-6 group-hover/btn:translate-x-0.5 transition-transform" />
            </motion.button>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
