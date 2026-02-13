'use client'

import { useEffect, useState } from 'react'

interface ProcessStep {
    number: string;
    title: string;
    description: string;
    color: string;
}

interface SolutionProcessProps {
    title: string;
    description: string;
    steps: ProcessStep[];
}

export function SolutionProcess({ title, description, steps }: SolutionProcessProps) {
  const [activeFrame, setActiveFrame] = useState(-1)
  const [animationStarted, setAnimationStarted] = useState(false)

  useEffect(() => {
    setTimeout(() => {
      setAnimationStarted(true)
      steps.forEach((_, index) => {
        setTimeout(() => {
          setActiveFrame(index)
        }, index * 2000 + 1000)
      })
    }, 1000)
  }, [steps])

  return (
    <section id="about" className="relative py-20 bg-background overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-background via-card/20 to-background" />
      <div className="absolute inset-0 opacity-[0.02] pointer-events-none">
        <div className="w-full h-full" style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, rgba(0,0,0,0.8) 1px, transparent 0)`,
          backgroundSize: '3px 3px',
          animation: 'filmGrain 8s infinite'
        }} />
      </div>

      <div className="container mx-auto px-6 sm:px-8 lg:px-12 relative z-10">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-3 mb-6">
            <div className="w-3 h-3 bg-accent-emerald rounded-full animate-pulse" />
            <span className="text-sm font-semibold text-muted-foreground">Process</span>
            <div className="w-3 h-3 bg-accent-blue rounded-full animate-pulse" />
          </div>
          <h2 className="text-5xl sm:text-6xl lg:text-7xl font-black leading-tight mb-6 text-foreground">{title}</h2>
          <p className="text-xl text-muted-foreground leading-relaxed max-w-3xl mx-auto">{description}</p>
        </div>

        <div className="relative max-w-7xl mx-auto">
          <div className="relative bg-gradient-to-r from-gray-950 via-gray-900 to-gray-950 rounded-xl overflow-hidden shadow-2xl">
            <div className="absolute top-0 left-0 right-0 h-6 bg-black z-20 overflow-hidden">
              <div className={`flex items-center justify-between px-12 h-full ${animationStarted ? 'perforations-scroll-animation' : ''}`} style={{ width: '200%' }}>
                {[...Array(40)].map((_, i) => (
                  <div key={`top-${i}`} className="w-4 h-3 bg-gray-800 rounded-sm border border-gray-700 flex-shrink-0" />
                ))}
              </div>
            </div>

            <div className="relative py-12 px-8 overflow-hidden h-80 max-w-full">
               <div className={`flex transition-transform hover:pause items-center ${animationStarted ? 'film-scroll-animation' : ''}`} style={{ width: 'max-content', gap: '32px' }}>
                <div className="flex-shrink-0 w-80 h-52 bg-gray-800 rounded-lg border-2 border-gray-700 opacity-60 flex items-center justify-center">
                  <div className="text-gray-400 font-mono tracking-wider">● START</div>
                </div>
                {steps.map((step, index) => (
                  <div key={step.number} className={`flex-shrink-0 w-80 h-52 bg-background rounded-lg border-4 ${activeFrame >= index ? `border-${step.color}` : 'border-gray-600'}`}>
                    <div className="relative h-full p-6 flex flex-col justify-between">
                      <div className="absolute -top-4 -left-4 w-12 h-12 bg-foreground text-background rounded-full flex items-center justify-center font-black z-10 border-3 border-white text-lg shadow-lg">
                        {step.number}
                      </div>
                      <div className="opacity-100 mt-2">
                        <h3 className="font-black text-xl leading-tight mb-2 text-foreground">{step.title}</h3>
                        <p className="text-sm text-muted-foreground leading-relaxed">{step.description}</p>
                      </div>
                    </div>
                  </div>
                ))}
                
                 {/* Duplicate for loop */}
                 {steps.map((step, index) => (
                  <div key={`dup-${step.number}`} className={`flex-shrink-0 w-80 h-52 bg-background rounded-lg border-4 ${activeFrame >= index ? `border-${step.color}` : 'border-gray-600'}`}>
                    <div className="relative h-full p-6 flex flex-col justify-between">
                      <div className="absolute -top-4 -left-4 w-12 h-12 bg-foreground text-background rounded-full flex items-center justify-center font-black z-10 border-3 border-white text-lg shadow-lg">
                        {step.number}
                      </div>
                      <div className="opacity-100 mt-2">
                        <h3 className="font-black text-xl leading-tight mb-2 text-foreground">{step.title}</h3>
                        <p className="text-sm text-muted-foreground leading-relaxed">{step.description}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="absolute bottom-0 left-0 right-0 h-6 bg-black z-20 overflow-hidden">
               <div className={`flex items-center justify-between px-12 h-full ${animationStarted ? 'perforations-scroll-animation' : ''}`} style={{ width: '200%' }}>
                {[...Array(40)].map((_, i) => (
                  <div key={`bottom-${i}`} className="w-4 h-3 bg-gray-800 rounded-sm border border-gray-700 flex-shrink-0" />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
