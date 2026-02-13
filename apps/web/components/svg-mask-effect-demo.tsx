"use client";
import { MaskContainer } from "@/components/ui/svg-mask-effect";

export default function SVGMaskEffectDemo() {
  return (
    <div className="flex h-[40rem] w-full items-center justify-center overflow-hidden bg-background">
      <MaskContainer
        revealText={
          <p className="mx-auto max-w-4xl text-center text-4xl font-bold text-muted-foreground">
            The first rule of MRR Club is you do not talk about MRR Club. The
            second rule of MRR Club is you DO NOT talk about MRR Club.
          </p>
        }
        className="h-[40rem] rounded-md border border-border"
      >
        Discover the power of{" "}
        <span className="text-primary">Tailwind CSS v4</span> with native CSS
        variables and container queries with
        <span className="text-primary"> advanced animations</span>.
      </MaskContainer>
    </div>
  );
}
