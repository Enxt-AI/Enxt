"use client";

import { motion } from "framer-motion";
import { Volume2, VolumeX } from "lucide-react";
import { useState, useRef, useEffect } from "react";

interface HeroData {
  videoUrl: string;
  titleLine1: string;
  titleLine2: string;
  titleLine3: string;
  buttonText: string;
  buttonLink: string;
}

export function Hero() {
  const [isMuted, setIsMuted] = useState(true);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [heroData, setHeroData] = useState<HeroData | null>(null);

  useEffect(() => {
    (async () => {
      try {
        const res = await fetch("/api/ai-film/hero");
        const data = await res.json();
        if (data) setHeroData(data);
      } catch (err) {
        console.error("Failed to fetch hero data:", err);
      }
    })();
  }, []);

  useEffect(() => {
    if (videoRef.current && heroData) {
      videoRef.current.muted = true;
      const playPromise = videoRef.current.play();
      if (playPromise !== undefined) {
        playPromise.catch((error) =>
          console.error("Video autoplay failed:", error),
        );
      }
    }
  }, [heroData?.videoUrl]);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.muted = isMuted;
    }
  }, [isMuted]);

  const handleButtonClick = () => {
    if (!heroData) return;
    if (heroData.buttonLink.startsWith("#")) {
      document
        .getElementById(heroData.buttonLink.slice(1))
        ?.scrollIntoView({ behavior: "smooth" });
    } else {
      window.open(heroData.buttonLink, "_blank");
    }
  };

  if (!heroData) return <div className="h-screen w-full bg-black" />;

  return (
    <div className="relative h-screen w-full overflow-hidden bg-black">
      <video
        ref={videoRef}
        className="absolute inset-0 w-full h-full object-cover scale-110"
        autoPlay
        muted
        loop
        playsInline
      >
        <source src={heroData.videoUrl} type="video/webm" />
        Your browser does not support the video tag.
      </video>

      <div className="absolute top-24 right-6 sm:right-12 z-40">
        <div className="relative group">
          <button
            onClick={() => setIsMuted(!isMuted)}
            className="glass-effect p-3 rounded-full text-white hover:bg-white/20 gentle-animation cursor-pointer"
          >
            {isMuted ? (
              <VolumeX className="w-5 h-5" />
            ) : (
              <Volume2 className="w-5 h-5" />
            )}
          </button>
          {isMuted && (
            <div className="absolute top-1 right-14 flex items-center text-white/80 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
              <span className="font-medium text-sm mr-2 text-shadow-medium">
                Unmute
              </span>
            </div>
          )}
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 1, delay: 0.5 }}
        className="absolute bottom-12 left-6 sm:left-8 lg:left-12 z-40"
      >
        <div className="max-w-2xl">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-black leading-tight text-white">
            <span className="block">{heroData.titleLine1}</span>
            <span className="block">{heroData.titleLine2}</span>
            <span className="block">{heroData.titleLine3}</span>
          </h1>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleButtonClick}
            className="mt-8 bg-red-600 backdrop-blur-sm text-white font-semibold px-8 py-4 rounded-full hover:bg-red-700 gentle-animation cursor-pointer shadow-lg"
          >
            {heroData.buttonText}
          </motion.button>
        </div>
      </motion.div>
    </div>
  );
}
