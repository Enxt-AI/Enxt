'use client'

import { motion } from 'framer-motion'
import { Volume2, VolumeX } from 'lucide-react'
import { useState, useRef, useEffect, ReactNode } from 'react'

interface SolutionHeroProps {
    title: ReactNode;
    subtitle?: string;
    videoSrc: string;
}

export function SolutionHero({ title, subtitle, videoSrc }: SolutionHeroProps) {
  const [isMuted, setIsMuted] = useState(true)
  const videoRef = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.muted = true
      // Attempt autoplay
      const playPromise = videoRef.current.play()
      if (playPromise !== undefined) {
          playPromise.catch(error => console.error('Video autoplay failed:', error))
      }
    }
  }, [])

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.muted = isMuted
    }
  }, [isMuted])

  return (
    <div className="relative h-screen w-full overflow-hidden bg-black">
      <video
        ref={videoRef}
        className="absolute inset-0 w-full h-full object-cover scale-110 opacity-60"
        autoPlay
        muted
        loop
        playsInline
      >
        <source src={videoSrc} type="video/webm" />
        <source src={videoSrc} type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      {/* Mute Control - Positioned below the fixed header */}
      <div className="absolute top-24 right-6 sm:right-12 z-40">
        <div className="relative group">
          <button
            onClick={() => setIsMuted(!isMuted)}
            className="glass-effect p-3 rounded-full text-white hover:bg-white/20 gentle-animation cursor-pointer"
          >
            {isMuted ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
          </button>
          
          {isMuted && (
            <div className="absolute top-1 right-14 flex items-center text-white/80 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
              <span className="font-medium text-sm mr-2 text-shadow-medium">Unmute</span>
            </div>
          )}
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 1, delay: 0.5 }}
        className="absolute bottom-12 left-6 sm:left-8 lg:left-12 z-40 max-w-4xl"
      >
        <div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-black leading-tight text-white uppercase transform-style-3d">
            {title}
          </h1>
          {subtitle && (
             <p className="mt-4 text-xl sm:text-2xl text-white/90 font-medium max-w-2xl text-shadow-medium">
                 {subtitle}
             </p>
          )}
          
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
            className="mt-8 bg-red-600 backdrop-blur-sm text-white font-semibold px-8 py-4 rounded-full hover:bg-red-700 gentle-animation cursor-pointer shadow-lg"
          >
            Start Creating
          </motion.button>
        </div>
      </motion.div>
    </div>
  )
}
