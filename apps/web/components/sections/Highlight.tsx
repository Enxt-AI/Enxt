"use client";
import { MaskContainer } from "@/components/ui/svg-mask-effect";

export const Highlight = () => {
  return (
    <section className="w-full bg-background">
      <MaskContainer
        revealText={
          <p className="mx-auto max-w-4xl px-4 text-center text-2xl font-bold text-muted-foreground md:text-4xl lg:text-5xl">
            We don't just build AI solutions. We craft intelligent systems that
            understand your business, predict your needs, and drive real results.
          </p>
        }
        revealSize={350}
        className="h-[32rem] md:h-[40rem]"
      >
        <span className="text-background">
          Transform your business with{" "}
          <span className="text-primary">AI that thinks</span>,{" "}
          <span className="text-primary">learns</span>, and{" "}
          <span className="text-primary">evolves</span> with you.
        </span>
      </MaskContainer>
    </section>
  );
};
