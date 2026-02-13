import { SolutionHero } from "@/components/solutions/common/SolutionHero";

import { SolutionContact } from "@/components/solutions/common/SolutionContact";

const Consultation = () => {
  return (
    <div className=" min-h-screen bg-background text-foreground overflow-x-hidden">
      <main>
        <SolutionHero
          title={
            <>
              STRATEGIC <br /> CONSULTING
            </>
          }
          subtitle="Navigate the AI revolution with expert guidance and proven strategies."
          videoSrc="https://assets.mixkit.co/videos/preview/mixkit-brain-with-electric-circuits-4171-large.mp4"
        />
        <SolutionContact />
      </main>
    </div>
  );
};

export default Consultation;
