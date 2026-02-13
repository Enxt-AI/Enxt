"use client";

import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { motion } from "framer-motion";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useEffect, useState } from "react";

interface Mentor {
  id: string;
  name: string;
  role: string;
  imageUrl: string;
  bio: string;
  expertise: string;
  order: number;
}

const Mentors = () => {
  const [mentors, setMentors] = useState<Mentor[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/mentors")
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) setMentors(data);
      })
      .catch((err) => console.error("Failed to load mentors:", err))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <main className="pt-32 pb-16">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h1 className="text-4xl md:text-5xl font-display font-bold mb-6 text-foreground">
              Our <span className="gradient-text">Board of Mentors</span>
            </h1>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Guiding our vision with decades of industry experience and
              leadership.
            </p>
          </motion.div>

          {loading ? (
            <div className="flex items-center justify-center py-20">
              <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
            </div>
          ) : mentors.length === 0 ? (
            <div className="text-center py-20 text-muted-foreground">
              <p>No mentors available at this time.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {mentors.map((mentor, index) => (
                <motion.div
                  key={mentor.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <Card className="h-full border-neutral-200 dark:border-neutral-800 bg-white/50 dark:bg-neutral-900/50 backdrop-blur-sm hover:shadow-lg transition-all duration-300">
                    <CardHeader className="text-center pt-8">
                      <div className="w-32 h-32 mx-auto mb-4 relative rounded-full overflow-hidden ring-4 ring-primary/10">
                        <Avatar className="w-full h-full">
                          <AvatarImage
                            src={mentor.imageUrl}
                            alt={mentor.name}
                            className="object-cover"
                          />
                          <AvatarFallback>
                            {mentor.name
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </AvatarFallback>
                        </Avatar>
                      </div>
                      <CardTitle className="text-xl font-bold">
                        {mentor.name}
                      </CardTitle>
                      <CardDescription className="text-primary font-medium">
                        {mentor.role}
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="text-center">
                      <p className="text-muted-foreground text-sm mb-4">
                        {mentor.bio}
                      </p>
                      <div className="inline-block px-3 py-1 bg-secondary rounded-full text-xs font-medium text-secondary-foreground">
                        {mentor.expertise}
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </main>
     
    </div>
  );
};

export default Mentors;
