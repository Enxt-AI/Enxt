'use client'

import { ImageWithFallback } from './ImageWithFallback'

export function Team() {
  const wantedCriminals = [
    {
      name: "Marcus 'The Pixel Bandit'",
      crime: "ARMED CREATIVE ROBBERY",
      bounty: "$8,500",
      description: "Notorious for stealing ordinary footage and transforming it into extraordinary visual experiences.",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop",
      rotation: 'rotate-3',
      mustacheStyle: "artistic"
    },
    {
      name: "Sofia 'The Frame Thief'",
      crime: "GRAND THEFT OF IMAGINATION",
      bounty: "$6,200",
      description: "Wanted for stealing impossible creative briefs and turning them into award-winning masterpieces.",
      image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop",
      rotation: 'rotate-2',
      mustacheStyle: "handlebar"
    },
    {
      name: "Jake 'The Render Rogue'",
      crime: "MASTERMINDING TECHNICAL HEISTS",
      bounty: "$11,800",
      description: "Ringleader of rendering crimes, orchestrating elaborate computational operations.",
      image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop",
      rotation: 'rotate-2',
      mustacheStyle: "thick"
    },
    {
      name: "Maya 'The Code Crusher'",
      crime: "DIGITAL WIZARDRY & ALGORITHM SORCERY",
      bounty: "$9,300",
      description: "Wanted for conjuring flawless code from chaotic requirements using forbidden programming magic.",
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop",
      rotation: '-rotate-2',
      mustacheStyle: "curly"
    },
  ]

  const Mustache = ({ style, className }: { style: string, className?: string }) => {
    // Simplified SVG paths for example
    return (
      <svg className={`absolute ${className}`} width="24" height="24" viewBox="0 0 24 24" fill="none">
        <path d="M12 16c-2 0-3-1-4-1s-2 1-4 1c0-1 1-2 4-2s4 1 4 2z M12 16c2 0 3-1 4-1s2 1 4 1c0-1-1-2-4-2s-4 1-4 2z" fill="#2D1810"/>
      </svg>
    )
  }

  return (
    <section id="team" className="relative py-20 bg-[#f4f1ea] overflow-hidden" style={{
      backgroundImage: `url("https://www.transparenttextures.com/patterns/aged-paper.png")`,
      backgroundBlendMode: 'multiply'
    }}>
      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-5xl font-black font-serif text-[#2D1810] mb-4 tracking-widest uppercase" style={{ textShadow: '2px 2px 0px rgba(0,0,0,0.2)' }}>
            Wanted
          </h2>
          <p className="text-xl text-[#5D4037] font-serif italic">
            For Crimes Against Creative Mediocrity
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {wantedCriminals.map((member, index) => (
            <div key={index} className={`relative group transform transition-all duration-300 hover:scale-105 hover:z-10 ${member.rotation}`}>
              <div className="bg-[#f0e6d2] p-4 pt-8 pb-12 shadow-xl border border-[#d7c9b1] relative">
                {/* Pin */}
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 w-4 h-4 rounded-full bg-red-800 shadow-sm z-20 border border-red-900"></div>
                
                <div className="mb-4 relative border-2 border-[#2D1810] p-1 bg-white">
                  <ImageWithFallback src={member.image} alt={member.name} className="w-full h-64 object-cover filter sepia contrast-125" />
                  <Mustache style={member.mustacheStyle} className="bottom-[40%] left-1/2 transform -translate-x-1/2 w-16 h-8 opacity-80" />
                </div>
                
                <div className="text-center font-serif text-[#2D1810]">
                  <h3 className="font-bold text-xl mb-1 uppercase tracking-wide">{member.name}</h3>
                  <p className="text-xs font-bold text-red-800 mb-2 uppercase border-t border-b border-red-800/20 py-1 inline-block">{member.crime}</p>
                  <p className="text-2xl font-black mb-3 font-mono">{member.bounty}</p>
                  <p className="text-sm leading-relaxed opacity-80">{member.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
