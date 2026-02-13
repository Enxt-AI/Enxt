'use client'

import { Trophy, Star, Award, Crown } from 'lucide-react'

export function Awards() {
  const awards = [
    {
      icon: <Trophy className="w-12 h-12 text-yellow-500 mb-4" />,
      title: "Cannes Lion",
      category: "Innovation in AI",
      year: "2024"
    },
    {
      icon: <Star className="w-12 h-12 text-yellow-500 mb-4" />,
      title: "Clio Award",
      category: "Best Visual Effects",
      year: "2023"
    },
    {
      icon: <Award className="w-12 h-12 text-yellow-500 mb-4" />,
      title: "D&AD Pencil",
      category: "Digital Design",
      year: "2023"
    },
    {
      icon: <Crown className="w-12 h-12 text-yellow-500 mb-4" />,
      title: "Webby Award",
      category: "Technical Achievement",
      year: "2024"
    }
  ]

  return (
    <section className="py-24 bg-black/5">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4 font-bagel">Recognition</h2>
          <p className="text-muted-foreground">Celebrating excellence in AI filmmaking</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {awards.map((award, index) => (
            <div 
              key={index}
              className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow border border-gray-100 text-center group hover:-translate-y-1 duration-300"
            >
              <div className="flex justify-center group-hover:scale-110 transition-transform duration-300">
                {award.icon}
              </div>
              <h3 className="font-bold text-xl mb-2">{award.title}</h3>
              <p className="text-primary font-medium mb-1">{award.category}</p>
              <p className="text-sm text-gray-500">{award.year}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
