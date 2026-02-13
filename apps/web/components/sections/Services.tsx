"use client";

import { motion } from "framer-motion";
import { BentoGrid, BentoGridItem } from "@/components/ui/bento-grid";
import {
  IconBrain,
  IconChartBar,
  IconCpu,
  IconRobot,
  IconRocket,
  IconShieldLock,
  IconSpeakerphone,
  IconUsers,
} from "@tabler/icons-react";
import { cn } from "@/lib/utils";

// --- Visual Components for Bento Grid ---
// Each component now defaults to a light, colorful aesthetic.

function SkeletonOne() {
  return (
    <div className="flex flex-1 w-full h-full min-h-[6rem] rounded-xl bg-gradient-to-br from-violet-100 to-purple-50 p-4 border border-violet-100 flex-col items-center justify-center relative overflow-hidden group">
      <div className="absolute -right-10 -top-10 w-32 h-32 bg-violet-500/10 rounded-full blur-3xl group-hover:bg-violet-500/20 transition-all duration-500" />
      <IconBrain className="w-16 h-16 text-violet-500/40 group-hover:scale-110 transition-transform duration-300 relative z-10" />
      <div className="mt-4 flex gap-2 relative z-10">
        <div
          className="w-2 h-2 rounded-full bg-violet-400 animate-bounce"
          style={{ animationDelay: "0s" }}
        />
        <div
          className="w-2 h-2 rounded-full bg-violet-400 animate-bounce"
          style={{ animationDelay: "0.2s" }}
        />
        <div
          className="w-2 h-2 rounded-full bg-violet-400 animate-bounce"
          style={{ animationDelay: "0.4s" }}
        />
      </div>
    </div>
  );
}

function SkeletonTwo() {
  return (
    <div className="flex flex-1 w-full h-full min-h-[6rem] rounded-xl bg-gradient-to-br from-emerald-100 to-green-50 p-4 border border-emerald-100 items-end justify-between relative overflow-hidden group">
      <div className="flex items-end gap-1 h-2/3 w-full justify-center">
        <div className="w-1/5 bg-emerald-300 h-[40%] rounded-t-sm group-hover:h-[60%] transition-all duration-300" />
        <div className="w-1/5 bg-emerald-400 h-[70%] rounded-t-sm group-hover:h-[85%] transition-all duration-300" />
        <div className="w-1/5 bg-emerald-500 h-[50%] rounded-t-sm group-hover:h-[65%] transition-all duration-300" />
        <div className="w-1/5 bg-emerald-600 h-[90%] rounded-t-sm group-hover:h-[95%] transition-all duration-300" />
      </div>
    </div>
  );
}

function SkeletonThree() {
  return (
    <div className="flex flex-1 w-full h-full min-h-[6rem] rounded-xl bg-gradient-to-br from-rose-100 to-pink-50 p-4 border border-rose-100 items-center justify-center relative overflow-hidden group">
      <div className="w-12 h-12 rounded-full border-4 border-rose-400 flex items-center justify-center group-hover:scale-110 transition-transform duration-300 relative z-10">
        <div className="w-0 h-0 border-t-[8px] border-t-transparent border-l-[14px] border-l-rose-500 border-b-[8px] border-b-transparent ml-1" />
      </div>
      <div className="absolute inset-0 bg-rose-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      {/* Decorative waveform */}
      <div className="absolute bottom-0 left-0 right-0 h-8 flex items-end justify-center gap-1 opacity-50">
        {[...Array(10)].map((_, i) => (
          <div
            key={i}
            className="w-1 bg-rose-300 rounded-t-full animate-pulse"
            style={{
              height: `${Math.random() * 100}%`,
              animationDuration: `${0.5 + Math.random()}s`,
            }}
          />
        ))}
      </div>
    </div>
  );
}

function SkeletonFour() {
  return (
    <div className="flex flex-1 w-full h-full min-h-[6rem] rounded-xl bg-gradient-to-br from-amber-100 to-orange-50 p-4 border border-amber-100 flex-col justify-center relative overflow-hidden group">
      <div className="w-full h-2 bg-amber-200/50 rounded-full mb-3 overflow-hidden">
        <div className="h-full bg-amber-500 w-[60%] group-hover:w-[85%] transition-all duration-700 ease-out" />
      </div>
      <div className="w-3/4 h-2 bg-amber-200/50 rounded-full mb-3 overflow-hidden">
        <div className="h-full bg-amber-400 w-[40%] group-hover:w-[70%] transition-all duration-700 ease-out delay-100" />
      </div>
      <div className="w-1/2 h-2 bg-amber-200/50 rounded-full overflow-hidden">
        <div className="h-full bg-amber-600 w-[50%] group-hover:w-[90%] transition-all duration-700 ease-out delay-200" />
      </div>
    </div>
  );
}

function SkeletonFive() {
  return (
    <div className="flex flex-1 w-full h-full min-h-[6rem] rounded-xl bg-gradient-to-br from-blue-100 to-cyan-50 p-4 border border-blue-100 items-center justify-center relative overflow-hidden group">
      <div className="flex -space-x-4 relative z-10">
        {[1, 2, 3].map((_, i) => (
          <div
            key={i}
            className="w-10 h-10 rounded-full bg-white border-2 border-blue-200 flex items-center justify-center shadow-sm group-hover:-translate-y-2 transition-transform duration-300"
            style={{ transitionDelay: `${i * 100}ms` }}
          >
            <IconUsers className="w-5 h-5 text-blue-400" />
          </div>
        ))}
      </div>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-blue-200/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
    </div>
  );
}

export function Services() {
  const services = [
    {
      title: "Autonomous Agents",
      description:
        "Deploy intelligent agents that handle complex workflows autonomously.",
      header: <SkeletonOne />,
      icon: <IconRobot className="h-4 w-4 text-violet-500" />,
      className: "md:col-span-2",
    },
    {
      title: "Business Intelligence",
      description:
        "Unlock deep insights with our localized, secure language models.",
      header: <SkeletonTwo />,
      icon: <IconChartBar className="h-4 w-4 text-emerald-500" />,
      className: "md:col-span-1",
    },
    {
      title: "AI Filmmaking",
      description:
        "Create studio-quality video content from script to screen in minutes.",
      header: <SkeletonThree />,
      icon: <IconSpeakerphone className="h-4 w-4 text-rose-500" />,
      className: "md:col-span-1",
    },
    {
      title: "Fintech Solutions",
      description:
        "Advanced fraud detection and algorithmic trading strategies.",
      header: <SkeletonFour />,
      icon: <IconShieldLock className="h-4 w-4 text-amber-500" />,
      className: "md:col-span-1",
    },
    {
      title: "Digital Employees",
      description: "Scale your workforce with 24/7 digital avatars.",
      header: <SkeletonFive />,
      icon: <IconUsers className="h-4 w-4 text-blue-500" />,
      className: "md:col-span-1",
    },
  ];

  return (
    <section className="py-32 bg-background relative" id="services">
      {/* Background Decor */}
      <div className="absolute inset-0 h-full w-full bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] -z-10"></div>

      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-black mb-6 tracking-tight text-foreground">
            Our Core <span className="text-primary">Capabilities</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            From autonomous agents to generative media, we provide the full
            stack of AI solutions to power your growth.
          </p>
        </motion.div>

        <BentoGrid className="max-w-4xl mx-auto">
          {services.map((item, i) => (
            <BentoGridItem
              key={i}
              title={item.title}
              description={item.description}
              header={item.header}
              icon={item.icon}
              className={item.className}
            />
          ))}
        </BentoGrid>
      </div>
    </section>
  );
}
