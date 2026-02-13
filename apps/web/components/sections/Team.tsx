"use client";

import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { Users, Trophy, Star, Globe2, Sparkles, UserCheck } from "lucide-react";
import { CometCard } from "@/components/ui/comet-card";

const stats = [
  {
    icon: Users,
    value: "50+",
    label: "Experts",
    bg: "bg-blue-50",
    color: "text-blue-600",
  },
  {
    icon: Trophy,
    value: "100+",
    label: "Projects",
    bg: "bg-amber-50",
    color: "text-amber-600",
  },
  {
    icon: Star,
    value: "4.9",
    label: "Rating",
    bg: "bg-violet-50",
    color: "text-violet-600",
  },
  {
    icon: Globe2,
    value: "15+",
    label: "Countries",
    bg: "bg-emerald-50",
    color: "text-emerald-600",
  },
];

export function Team() {
  const [teamImage, setTeamImage] = useState("/group.jpeg");

  useEffect(() => {
    const fetchTeamImage = async () => {
      try {
        const res = await fetch("/api/team");
        const data = await res.json();
        if (data && data.imageUrl) {
          setTeamImage(data.imageUrl);
        }
      } catch (error) {
        console.error("Failed to fetch team image:", error);
      }
    };
    fetchTeamImage();
  }, []);

  return (
    <section className="py-32 relative overflow-hidden bg-background" id="team">
      {/* Decorative blobs */}
      <div className="absolute top-20 -left-20 w-96 h-96 bg-violet-200/30 rounded-full blur-3xl -z-10" />
      <div className="absolute bottom-20 -right-20 w-96 h-96 bg-blue-200/30 rounded-full blur-3xl -z-10" />

      <div className="container mx-auto px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left Visual - Interactive 3D Card */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="w-full max-w-md mx-auto lg:max-w-none"
          >
            <CometCard className="rounded-3xl cursor-pointer">
              <div className="relative rounded-3xl overflow-hidden shadow-2xl p-1 bg-gradient-to-br from-violet-100 to-white">
                <div className="relative rounded-2xl overflow-hidden">
                  <img
                    src={teamImage}
                    alt="EnxtAI Team"
                    className="w-full h-auto object-cover transform hover:scale-105 transition-transform duration-700"
                  />
                  {/* Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-80" />

                  <div className="absolute bottom-6 left-6 text-white p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <Sparkles className="w-5 h-5 text-yellow-400 fill-yellow-400" />
                      <span className="font-semibold tracking-wide text-sm opacity-90">
                        VISIONARIES
                      </span>
                    </div>
                    <p className="text-2xl font-bold leading-tight">
                      Shaping the future <br /> of Intelligence
                    </p>
                    <p className="text-sm font-medium mt-2 text-white/80">
                      Innovators, Engineers, Dreamers
                    </p>
                  </div>
                </div>
              </div>
            </CometCard>
          </motion.div>

          {/* Right Content */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h2 className="text-4xl md:text-5xl font-black mb-6 tracking-tight text-foreground">
              Meet the <span className="text-primary">Minds</span> Behind the
              Magic
            </h2>
            <p className="text-muted-foreground text-lg mb-10 leading-relaxed">
              We are a diverse collective of engineers, data scientists, and
              strategists united by a single mission: to democratize Artificial
              Intelligence for businesses worldwide.
            </p>

            {/* Dynamic Stats Grid */}
            <div className="grid grid-cols-2 gap-5 mb-10">
              {stats.map((stat, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: 0.4 + i * 0.1 }}
                  whileHover={{ y: -5 }}
                  className="bg-white border border-gray-100 p-5 rounded-2xl shadow-sm hover:shadow-md transition-all flex items-center gap-4 group"
                >
                  <div
                    className={`p-3 rounded-xl ${stat.bg} ${stat.color} group-hover:scale-110 transition-transform`}
                  >
                    <stat.icon className="w-6 h-6" />
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-gray-900">
                      {stat.value}
                    </div>
                    <div className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">
                      {stat.label}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Culture Tags */}
            <div className="flex flex-wrap gap-3">
              {[
                "Innovation First",
                "User Centric",
                "Deep Tech",
                "Agile",
                "Collaborative",
              ].map((tag, i) => (
                <span
                  key={i}
                  className="px-4 py-2 rounded-full bg-gray-100 text-gray-600 text-sm font-medium hover:bg-violet-100 hover:text-violet-700 transition-colors cursor-default"
                >
                  {tag}
                </span>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
