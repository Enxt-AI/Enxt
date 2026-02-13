import { SolutionHero } from "@/components/solutions/common/SolutionHero";
import { SolutionContact } from "@/components/solutions/common/SolutionContact";
import "../ai-filmmaking/AiFilmmaking.css";

const SocialMediaAvatar = () => {
  return (
    <div className=" min-h-screen bg-background text-foreground overflow-x-hidden">
      <main>
        <SolutionHero
          title={
            <>
              VIRTUAL <br /> INFLUENCERS
            </>
          }
          subtitle="Engage audiences with charismatic, AI-driven social media avatars."
          videoSrc="https://assets.mixkit.co/videos/preview/mixkit-abstract-visualization-of-a-human-face-9937-large.mp4"
        />
        <SolutionContact />
      </main>
    </div>
  );
};

export default SocialMediaAvatar;
