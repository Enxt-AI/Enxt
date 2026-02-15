"use client";

import { useEffect, useState } from "react";
import { Trophy, Star, Award, Crown } from "lucide-react";

interface AwardItem {
  id: string;
  title: string;
  category: string;
  year: string;
  icon: string;
}

const ICON_MAP: Record<string, React.ReactNode> = {
  Trophy: <Trophy className="w-12 h-12 text-yellow-500 mb-4" />,
  Star: <Star className="w-12 h-12 text-yellow-500 mb-4" />,
  Award: <Award className="w-12 h-12 text-yellow-500 mb-4" />,
  Crown: <Crown className="w-12 h-12 text-yellow-500 mb-4" />,
};

export function Awards() {
  const [awards, setAwards] = useState<AwardItem[]>([]);

  useEffect(() => {
    (async () => {
      try {
        const res = await fetch("/api/ai-film/awards");
        const data = await res.json();
        if (Array.isArray(data)) setAwards(data);
      } catch (err) {
        console.error("Failed to fetch awards:", err);
      }
    })();
  }, []);

  if (awards.length === 0) return null;

  return (
    <section className="py-24 bg-black/5">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4 font-bagel">Recognition</h2>
          <p className="text-muted-foreground">
            Celebrating excellence in AI filmmaking
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {awards.map((award) => (
            <div
              key={award.id}
              className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow border border-gray-100 text-center group hover:-translate-y-1 duration-300"
            >
              <div className="flex justify-center group-hover:scale-110 transition-transform duration-300">
                {ICON_MAP[award.icon] || ICON_MAP["Trophy"]}
              </div>
              <h3 className="font-bold text-xl mb-2">{award.title}</h3>
              <p className="text-primary font-medium mb-1">{award.category}</p>
              <p className="text-sm text-gray-500">{award.year}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
