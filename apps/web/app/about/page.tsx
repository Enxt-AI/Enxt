"use client";

import { motion } from "framer-motion";
import { Users, Target, Lightbulb, Rocket } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const values = [
  {
    icon: Lightbulb,
    title: "Innovation",
    description:
      "We push the boundaries of what's possible with AI, constantly exploring new frontiers in technology.",
  },
  {
    icon: Target,
    title: "Excellence",
    description:
      "We deliver world-class solutions with meticulous attention to detail and uncompromising quality.",
  },
  {
    icon: Users,
    title: "Collaboration",
    description:
      "We believe the best results come from diverse teams working together toward a shared vision.",
  },
  {
    icon: Rocket,
    title: "Impact",
    description:
      "We measure success by the real-world impact our solutions create for businesses and communities.",
  },
];

const About = () => {
  return (
    <div className="min-h-screen bg-background">
      <main className="pt-32 pb-20">
        <div className="container mx-auto px-6">
          {/* Hero Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-6">
              About <span className="gradient-text">EnxtAI</span>
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              We are a team of innovators, engineers, and dreamers building the
              next generation of intelligent systems that transform how
              businesses operate.
            </p>
          </motion.div>

          {/* Mission Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mb-20"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl font-bold text-foreground mb-4">
                  Our Mission
                </h2>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  At EnxtAI, we believe artificial intelligence should be
                  accessible, ethical, and transformative. Our mission is to
                  empower businesses of all sizes with cutting-edge AI solutions
                  that drive growth, efficiency, and innovation.
                </p>
                <p className="text-muted-foreground leading-relaxed">
                  Founded with a vision to bridge the gap between complex AI
                  technology and practical business applications, we've grown
                  into a team of passionate experts dedicated to delivering
                  solutions that make a real difference.
                </p>
              </div>
              <div className="bg-gradient-to-br from-primary/10 to-accent/10 rounded-2xl p-8 border border-primary/20">
                <h3 className="text-2xl font-bold text-foreground mb-4">
                  Our Vision
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  To be the global leader in AI-driven transformation, creating
                  a future where intelligent systems seamlessly enhance every
                  aspect of business and life — responsibly and sustainably.
                </p>
              </div>
            </div>
          </motion.div>

          {/* Values Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mb-20"
          >
            <h2 className="text-3xl font-bold text-foreground text-center mb-12">
              Our Core Values
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {values.map((value, index) => (
                <motion.div
                  key={value.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.1 * index }}
                >
                  <Card className="border-primary/20 h-full hover:shadow-lg hover:shadow-primary/10 transition-all duration-300">
                    <CardHeader>
                      <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                        <value.icon className="w-6 h-6 text-primary" />
                      </div>
                      <CardTitle className="text-xl">{value.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground">
                        {value.description}
                      </p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Stats Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="bg-gradient-to-r from-primary/10 to-accent/10 rounded-2xl p-12"
          >
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
              {[
                { number: "50+", label: "Projects Delivered" },
                { number: "30+", label: "Team Members" },
                { number: "20+", label: "Happy Clients" },
                { number: "5+", label: "Years Experience" },
              ].map((stat) => (
                <div key={stat.label}>
                  <p className="text-4xl font-bold text-primary mb-2">
                    {stat.number}
                  </p>
                  <p className="text-muted-foreground text-sm">{stat.label}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </main>
    </div>
  );
};

export default About;
