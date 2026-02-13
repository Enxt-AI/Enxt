"use client";

import { usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";
import FuzzyText from "@/components/FuzzyText";
import { Button } from "@/components/ui/button";
import { Home, ArrowLeft } from "lucide-react";

const NotFound = () => {
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      pathname,
    );
  }, [pathname]);

  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-background">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-br from-background via-background to-primary/5" />

      {/* Animated Gradient Orbs */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-accent/10 rounded-full blur-3xl animate-pulse delay-1000" />

      {/* Content */}
      <div className="relative z-10 text-center px-6">
        {/* Fuzzy 404 Text */}
        <div className="mb-8 flex justify-center">
          <FuzzyText
            fontSize="clamp(8rem, 20vw, 16rem)"
            fontWeight={900}
            color="hsl(var(--primary))"
            enableHover={true}
            baseIntensity={0.3}
            hoverIntensity={0.8}
            fuzzRange={40}
            direction="both"
            transitionDuration={300}
            clickEffect={true}
            glitchMode={true}
            glitchInterval={3000}
            glitchDuration={200}
            letterSpacing={10}
            className="cursor-pointer"
          >
            404
          </FuzzyText>
        </div>

        {/* Error Message */}
        <div className="mb-8 space-y-2">
          <h2 className="text-2xl md:text-4xl font-bold text-foreground">
            Oops! Page Not Found
          </h2>
          <p className="text-base md:text-lg text-muted-foreground max-w-md mx-auto">
            The page you're looking for doesn't exist or has been moved.
          </p>
          <p className="text-sm text-muted-foreground/70">
            Path: <code className="text-primary">{pathname}</code>
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Button
            onClick={() => router.back()}
            variant="outline"
            size="lg"
            className="gap-2 min-w-[160px]"
          >
            <ArrowLeft className="w-4 h-4" />
            Go Back
          </Button>
          <Button
            onClick={() => router.push("/")}
            size="lg"
            className="gap-2 min-w-[160px] bg-primary hover:bg-primary/90"
          >
            <Home className="w-4 h-4" />
            Go Home
          </Button>
        </div>

        {/* Hover hint */}
        <p className="mt-12 text-xs text-muted-foreground/60 animate-pulse">
          💡 Hover over the 404 for a cool effect!
        </p>
      </div>
    </div>
  );
};

export default NotFound;
