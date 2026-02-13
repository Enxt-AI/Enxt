"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import {
  ArrowRight,
  Bot,
  Camera,
  BarChart3,
  Globe,
  Users,
  Brain,
  Workflow,
} from "lucide-react";

const solutions = [
  {
    title: "AI Consultation",
    description:
      "Strategic implementation of AI technologies tailored to your business needs.",
    icon: <Brain className="w-8 h-8" />,
    href: "/solution/ai-consultation",
    color: "from-blue-500 to-cyan-500",
  },
  {
    title: "AI Filmmaking",
    description:
      "Revolutionize your video content production with cutting-edge AI tools.",
    icon: <Camera className="w-8 h-8" />,
    href: "/solution/ai-filmmaking",
    color: "from-purple-500 to-pink-500",
  },
  {
    title: "Social Media Avatar",
    description:
      "Create engaging digital personas for your brand's social presence.",
    icon: <Users className="w-8 h-8" />,
    href: "/solution/social-media",
    color: "from-orange-500 to-red-500",
  },
  {
    title: "Business Automation",
    description:
      "Streamline operations and reduce manual workload with intelligent automation.",
    icon: <Workflow className="w-8 h-8" />,
    href: "/solution/business-automation",
    color: "from-green-500 to-emerald-500",
  },
  {
    title: "Business Intelligence",
    description:
      "Transform data into actionable insights for better decision making.",
    icon: <BarChart3 className="w-8 h-8" />,
    href: "/solution/business-intelligence",
    color: "from-indigo-500 to-violet-500",
  },
  {
    title: "Fintech Solutions",
    description:
      "Secure and scalable financial technology solutions for modern banking.",
    icon: <Globe className="w-8 h-8" />,
    href: "/solution/fintech",
    color: "from-yellow-500 to-amber-500",
  },
  {
    title: "Marketing",
    description:
      "Data-driven marketing strategies powered by artificial intelligence.",
    icon: <BarChart3 className="w-8 h-8" />, // Reusing BarChart3 or finding a better icon like Megaphone if available
    href: "/solution/marketing",
    color: "from-rose-500 to-red-500",
  },
];

export default function SolutionsPage() {
  return (
    <div className="min-h-screen bg-slate-950 relative flex flex-col antialiased">
      <main className="grow pt-32 pb-20 relative z-10">
        <div className="container mx-auto px-4">
          <div className="text-center mb-20">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-4xl md:text-7xl font-bold bg-clip-text text-transparent bg-gradient-to-b from-neutral-200 to-neutral-600 mb-6"
            >
              Our Solutions
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-neutral-500 max-w-2xl mx-auto text-lg md:text-xl"
            >
              Comprehensive AI-driven solutions to propel your business into the
              future. Explore our specialized services below.
            </motion.p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {solutions.map((solution, index) => (
              <motion.div
                key={solution.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Link href={solution.href} className="group block h-full">
                  <div className="relative h-full bg-slate-900 border border-slate-800 rounded-2xl p-8 hover:border-slate-700 transition-colors duration-300 overflow-hidden">
                    <div
                      className={`absolute inset-0 bg-linear-to-br ${solution.color} opacity-0 group-hover:opacity-5 transition-opacity duration-500`}
                    />

                    <div className="relative z-10">
                      <div
                        className={`w-12 h-12 rounded-lg bg-linear-to-br ${solution.color} p-2.5 mb-6 text-white shadow-lg`}
                      >
                        {solution.icon}
                      </div>

                      <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-slate-400 transition-all duration-300">
                        {solution.title}
                      </h3>

                      <p className="text-slate-400 mb-6 group-hover:text-slate-300 transition-colors duration-300">
                        {solution.description}
                      </p>

                      <div className="flex items-center text-sm font-medium text-slate-500 group-hover:text-white transition-colors duration-300">
                        Explore Solution{" "}
                        <ArrowRight className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1" />
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
