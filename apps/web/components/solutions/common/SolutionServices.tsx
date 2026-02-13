'use client'

import { useState } from 'react'

interface ImageWithFallbackProps {
  src: string
  alt: string
  className?: string
  style?: React.CSSProperties
  fallback?: string
}

function ImageWithFallback({ 
  src, 
  alt, 
  className,
  style,
  fallback = "https://images.unsplash.com/photo-1560472355-536de3962603?w=400&h=300&fit=crop" 
}: ImageWithFallbackProps) {
  const [imgSrc, setImgSrc] = useState(src)
  const [hasError, setHasError] = useState(false)

  const handleError = () => {
    if (!hasError) {
      setHasError(true)
      setImgSrc(fallback)
    }
  }

  return (
    <img
      src={imgSrc}
      alt={alt}
      className={className}
      style={style}
      onError={handleError}
    />
  )
}

interface ServiceItem {
    id?: string;
    title: string;
    description: string;
    image: string;
}

interface SolutionServicesProps {
    title: string;
    subtitle?: string;
    services: ServiceItem[];
}

export function SolutionServices({ title, subtitle, services }: SolutionServicesProps) {
  return (
    <section id="services" className="relative py-20" style={{ background: 'linear-gradient(135deg, #2d1810 0%, #1a0f08 30%, #0f0704 60%, #1a0f08 100%)', overflow: 'hidden' }}>
      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-3 mb-6">
            <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse" />
            <span className="text-sm font-semibold text-amber-200/80">{subtitle || "Our Capabilities"}</span>
            <div className="w-3 h-3 bg-amber-500 rounded-full animate-pulse" />
          </div>
          <h2 className="text-5xl sm:text-6xl lg:text-7xl font-black leading-tight mb-6 text-amber-100">{title}</h2>
        </div>

        <div className="relative mb-24">
             {/* Rope */}
             <div className="absolute top-8 left-0 right-0 h-4 rope-sway">
                 <div className="w-full h-full bg-amber-900 rounded-full shadow-lg" />
             </div>
             
             <div className="flex flex-wrap justify-center gap-8 pt-20">
                 {services.map((service, i) => (
                     <div key={service.id || i} className={`transform transition-all duration-700 hover:scale-110 hover:-translate-y-4 ${i % 2 === 0 ? 'photo-sway-1' : 'photo-sway-2'}`}>
                         <div className="bg-white p-4 pb-12 shadow-2xl w-64 rotate-1 relative">
                            <div className="absolute -top-6 left-1/2 -translate-x-1/2 w-4 h-12 bg-amber-200/50 z-10 skew-x-12"></div>
                            <ImageWithFallback src={service.image} alt={service.title} className="w-full h-48 object-cover filter sepia-[.3]" />
                            <h3 className="font-black text-lg text-gray-800 mt-4">{service.title}</h3>
                            <p className="text-sm text-gray-600">{service.description}</p>
                         </div>
                     </div>
                 ))}
             </div>
        </div>
      </div>
    </section>
  )
}
