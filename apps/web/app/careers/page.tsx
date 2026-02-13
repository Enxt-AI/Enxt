"use client";

import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { FloatingNav } from "@/components/sections/FloatingNav";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";
import { MapPin, Clock, Briefcase } from "lucide-react";
import { useEffect, useState } from "react";

interface CareerOpening {
  id: string;
  title: string;
  department: string;
  location: string;
  type: string;
  description: string;
  requirements: string[];
  order: number;
}

const Careers = () => {
  const [jobOpenings, setJobOpenings] = useState<CareerOpening[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/careers")
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) setJobOpenings(data);
      })
      .catch((err) => console.error("Failed to load careers:", err))
      .finally(() => setLoading(false));
  }, []);

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
              Join Our <span className="gradient-text">Team</span>
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Be part of a team that's shaping the future with AI. We're looking
              for passionate individuals who want to make an impact.
            </p>
          </motion.div>

          {/* Why Join Us Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16"
          >
            <Card className="border-primary/20">
              <CardHeader>
                <CardTitle className="text-xl">🚀 Innovation First</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Work on cutting-edge AI projects that push boundaries.
                </p>
              </CardContent>
            </Card>
            <Card className="border-primary/20">
              <CardHeader>
                <CardTitle className="text-xl">🌍 Remote Friendly</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Flexible work arrangements with a global team.
                </p>
              </CardContent>
            </Card>
            <Card className="border-primary/20">
              <CardHeader>
                <CardTitle className="text-xl">
                  📈 Growth Opportunities
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Continuous learning and career development paths.
                </p>
              </CardContent>
            </Card>
          </motion.div>

          {/* Job Openings */}
          <div className="mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-8">
              Open Positions
            </h2>

            {loading ? (
              <div className="flex items-center justify-center py-20">
                <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
              </div>
            ) : jobOpenings.length === 0 ? (
              <div className="text-center py-20 text-muted-foreground">
                <p>No open positions at this time. Check back soon!</p>
              </div>
            ) : (
              <div className="space-y-6">
                {jobOpenings.map((job, index) => (
                  <motion.div
                    key={job.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                  >
                    <Card className="hover:shadow-lg hover:shadow-primary/10 transition-all duration-300">
                      <CardHeader>
                        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                          <div>
                            <CardTitle className="text-2xl mb-2">
                              {job.title}
                            </CardTitle>
                            <CardDescription className="text-base">
                              {job.description}
                            </CardDescription>
                          </div>
                          <Button className="bg-primary hover:bg-primary/90 w-full md:w-auto">
                            Apply Now
                          </Button>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <div className="flex flex-wrap gap-4 mb-4">
                          <div className="flex items-center gap-2 text-sm text-muted-foreground">
                            <Briefcase className="w-4 h-4" />
                            {job.department}
                          </div>
                          <div className="flex items-center gap-2 text-sm text-muted-foreground">
                            <MapPin className="w-4 h-4" />
                            {job.location}
                          </div>
                          <div className="flex items-center gap-2 text-sm text-muted-foreground">
                            <Clock className="w-4 h-4" />
                            {job.type}
                          </div>
                        </div>
                        <div className="flex flex-wrap gap-2">
                          {job.requirements.map((req, idx) => (
                            <Badge key={idx} variant="secondary">
                              {req}
                            </Badge>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            )}
          </div>

          {/* CTA Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-center bg-gradient-to-r from-primary/10 to-accent/10 rounded-2xl p-12"
          >
            <h2 className="text-3xl font-bold text-foreground mb-4">
              Don't see the right role?
            </h2>
            <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
              We're always looking for talented individuals. Send us your resume
              and we'll keep you in mind for future opportunities.
            </p>
            <Button size="lg" className="bg-primary hover:bg-primary/90">
              Send Your Resume
            </Button>
          </motion.div>
        </div>
      </main>
    </div>
  );
};

export default Careers;
