"use client";
import { useState, useRef } from "react";
import { motion, useMotionTemplate, useMotionValue, useSpring } from "framer-motion";
import { cn } from "@/lib/utils";

export const MaskContainer = ({
  children,
  revealText,
  size = 10,
  revealSize = 250,
  className,
}: {
  children?: string | React.ReactNode;
  revealText?: string | React.ReactNode;
  size?: number;
  revealSize?: number;
  className?: string;
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  
  const springConfig = { stiffness: 300, damping: 30 };
  const springX = useSpring(mouseX, springConfig);
  const springY = useSpring(mouseY, springConfig);

  const maskSize = isHovered ? revealSize : size;

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    mouseX.set(e.clientX - rect.left);
    mouseY.set(e.clientY - rect.top);
  };

  // Create motion templates for mask position
  const maskPosition = useMotionTemplate`${springX}px ${springY}px`;

  return (
    <div
      ref={containerRef}
      className={cn("relative h-screen overflow-hidden", className)}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Masked reveal layer - circular shape */}
      <motion.div
        className="pointer-events-none absolute inset-0 z-20 flex h-full w-full items-center justify-center bg-foreground"
        style={{
          maskImage: `radial-gradient(circle, black 0%, black 40%, transparent 50%)`,
          WebkitMaskImage: `radial-gradient(circle, black 0%, black 40%, transparent 50%)`,
          maskSize: `${maskSize}px ${maskSize}px`,
          WebkitMaskSize: `${maskSize}px ${maskSize}px`,
          maskRepeat: "no-repeat",
          WebkitMaskRepeat: "no-repeat",
          maskPosition: maskPosition,
          WebkitMaskPosition: maskPosition as unknown as string,
        }}
        transition={{
          maskSize: { duration: 0.3 },
        }}
      >
        <div className="relative z-20 mx-auto max-w-4xl px-4 text-center text-2xl font-bold text-background md:text-4xl lg:text-5xl">
          {children}
        </div>
      </motion.div>

      {/* Base layer with reveal text */}
      <div className="flex h-full w-full items-center justify-center">
        {revealText}
      </div>
    </div>
  );
};
