import { CTA } from "@/components/sections/CTA";
import { HeroParallaxSection } from "@/components/sections/HeroParallaxSection";
import { Partners } from "@/components/sections/Partners";
import { Services } from "@/components/sections/Services";
import { Team } from "@/components/sections/Team";
import { Testimonials } from "@/components/sections/Testimonials";
import { WhyUs } from "@/components/sections/WhyUs";
import { WhatWeBuild } from "@/components/sections/WhatWeBuild";

export default function Home() {
  return (
    <main>
      <HeroParallaxSection />
      <Services />
      <WhatWeBuild />
      <Partners />
      <WhyUs />
      <Team />
      <Testimonials />
      <CTA />
    </main>
  );
}
