"use client";

import { motion } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Spotlight } from "@/components/ui/spotlight";

export function CTA() {
  return (
    <section id="contact" className="py-32 relative overflow-hidden bg-white">
      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="relative bg-zinc-900 rounded-[3rem] p-12 md:p-24 text-center max-w-6xl mx-auto overflow-hidden shadow-2xl"
        >
          {/* Spotlight Effect inside the card */}
          <Spotlight
            className="-top-40 left-0 md:left-60 md:-top-20"
            fill="white"
          />

          <div className="relative z-10 max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-zinc-800 border border-zinc-700 mb-8">
              <Sparkles className="w-4 h-4 text-violet-400" />
              <span className="text-xs font-medium text-zinc-300">
                Limited Availability for New Projects
              </span>
            </div>

            <h2 className="text-4xl md:text-6xl font-bold mb-6 text-white tracking-tighter leading-tight">
              Ready to architect the <br />{" "}
              <span className="text-violet-400">next generation</span> of your
              business?
            </h2>
            <p className="text-zinc-400 text-lg md:text-xl mb-12 max-w-2xl mx-auto leading-relaxed">
              More than just AI integration. We build the intelligent backbone
              that powers your future growth. Schedule a strategic consultation
              today.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Button
                size="lg"
                className="bg-white text-black hover:bg-zinc-200 h-14 px-8 rounded-full text-base font-semibold group"
              >
                Book a Consultation
                <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="h-14 px-8 rounded-full text-base border-zinc-700 text-zinc-300 hover:bg-zinc-800 hover:text-white bg-transparent"
              >
                View Case Studies
              </Button>
            </div>

            <p className="mt-8 text-sm text-zinc-500">
              No credit card required. Free 30-minute discovery call.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
