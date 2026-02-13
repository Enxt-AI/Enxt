"use client";

import { motion } from "framer-motion";
import { Check } from "lucide-react";
import { WobbleCard } from "@/components/ui/wobble-card";

const reasons = [
  {
    title: "Data-Driven Approach",
    description:
      "Every decision backed by analytics and real-world insights, not guesswork.",
  },
  {
    title: "Results That Matter",
    description:
      "We focus on measurable outcomes that directly impact your bottom line.",
  },
  {
    title: "Rapid Deployment",
    description: "Get from concept to production in weeks, not months.",
  },
  {
    title: "Continuous Evolution",
    description:
      "Our AI systems learn and improve, delivering increasing value over time.",
  },
];

export function WhyUs() {
  return (
    <section
      id="why-us"
      className="py-32 relative overflow-hidden bg-background"
    >
      {/* Background Accent */}
      <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-primary/5 to-transparent -z-10" />

      <div className="container mx-auto px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl md:text-5xl font-black mb-6 tracking-tight text-foreground">
              Why Choose <span className="text-primary">EnxtAI</span>?
            </h2>
            <p className="text-muted-foreground text-lg mb-10 leading-relaxed font-medium">
              We don't just implement AI—we architect transformation. Our team
              combines deep technical expertise with strategic business thinking
              to deliver solutions that actually work.
            </p>

            <div className="space-y-6">
              {reasons.map((reason, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="flex gap-4 group"
                >
                  <div className="flex-shrink-0 w-8 h-8 rounded-xl bg-violet-100 flex items-center justify-center mt-1 group-hover:scale-110 transition-transform duration-300">
                    <Check className="w-5 h-5 text-violet-600" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-foreground mb-1">
                      {reason.title}
                    </h3>
                    <p className="text-muted-foreground">
                      {reason.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Right Visual - Interactive Wobble Card */}
          <div className="h-[500px] w-full relative">
            <WobbleCard containerClassName="bg-white border border-gray-100 shadow-[0_8px_30px_rgb(0,0,0,0.04)] h-full">
              <div className="relative z-10 space-y-8 p-1">
                {/* Mock Dashboard Element 1 */}
                <div className="bg-gradient-to-br from-violet-50 to-indigo-50 rounded-2xl p-6 border border-violet-100 shadow-sm relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-20 h-20 bg-indigo-500/5 rounded-full blur-2xl" />
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-3 h-3 rounded-full bg-violet-500 animate-[pulse_3s_infinite]" />
                    <span className="text-sm font-semibold text-violet-700">
                      AI Model Training
                    </span>
                    <span className="ml-auto text-xs font-mono text-violet-400">
                      v4.2.0
                    </span>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-xs font-medium text-slate-500">
                      <span>Accuracy</span>
                      <span>98.4%</span>
                    </div>
                    <div className="h-2 bg-white rounded-full overflow-hidden border border-white/50">
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: "98.4%" }}
                        transition={{ duration: 1.5, ease: "easeOut" }}
                        className="h-full bg-violet-500"
                      />
                    </div>
                  </div>
                </div>

                {/* Mock Dashboard Element 2 (Grid) */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm flex flex-col items-center justify-center py-6 group hover:border-violet-100 transition-colors">
                    <span className="text-3xl mb-2">🚀</span>
                    <h4 className="font-bold text-gray-900 text-lg">2.4x</h4>
                    <p className="text-xs text-gray-500 uppercase tracking-wider font-semibold">
                      Efficiency
                    </p>
                  </div>
                  <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm flex flex-col items-center justify-center py-6 group hover:border-violet-100 transition-colors">
                    <span className="text-3xl mb-2">📉</span>
                    <h4 className="font-bold text-gray-900 text-lg">-45%</h4>
                    <p className="text-xs text-gray-500 uppercase tracking-wider font-semibold">
                      Costs
                    </p>
                  </div>
                </div>

                {/* Mock Dashboard Element 3 (Graph) */}
                <div className="bg-gradient-to-t from-gray-50 to-white rounded-2xl p-6 border border-gray-100 relative">
                  <div className="flex items-center gap-2 mb-4">
                    <div className="w-2 h-2 rounded-sm bg-emerald-400" />
                    <h5 className="text-sm font-semibold text-gray-700">
                      Projected Growth
                    </h5>
                  </div>
                  <div className="flex items-end gap-2 h-24 justify-between px-2">
                    {[35, 45, 40, 60, 55, 70, 85].map((h, i) => (
                      <motion.div
                        key={i}
                        initial={{ height: 0 }}
                        whileInView={{ height: `${h}%` }}
                        transition={{ duration: 0.5, delay: i * 0.1 }}
                        className="w-full bg-emerald-400 rounded-t-sm hover:bg-emerald-500 transition-colors"
                      />
                    ))}
                  </div>
                </div>
              </div>
            </WobbleCard>
          </div>
        </div>
      </div>
    </section>
  );
}
