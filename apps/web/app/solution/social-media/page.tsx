import { SolutionHero } from "@/components/solutions/common/SolutionHero";
import { SolutionServices } from "@/components/solutions/common/SolutionServices";
import { SolutionProcess } from "@/components/solutions/common/SolutionProcess";
import { SolutionContact } from "@/components/solutions/common/SolutionContact";
import "../ai-filmmaking/AiFilmmaking.css";

const SocialMediaAvatar = () => {
  const services = [
    {
      title: "Custom Avatar Creation",
      description:
        "Photorealistic or stylized 3D avatars representing your brand persona.",
      image:
        "https://images.unsplash.com/photo-1620641788421-7f1c9dd7509e?w=400&h=300&fit=crop",
    },
    {
      title: "Automated Content",
      description:
        "Generate video content with avatars speaking your scripts instantly.",
      image:
        "https://images.unsplash.com/photo-1617042375876-a06e677a900a?w=400&h=300&fit=crop",
    },
    {
      title: "Interactive Engagement",
      description:
        "Avatars that can respond to comments and live chats in real-time.",
      image:
        "https://images.unsplash.com/photo-1535223289827-42f1e9919769?w=400&h=300&fit=crop",
    },
  ];

  const processSteps = [
    {
      number: "01",
      title: "Character Design",
      description: "Defining the look and voice of your avatar.",
      color: "accent-blue",
    },
    {
      number: "02",
      title: "3D Modeling",
      description: "Building the high-fidelity 3D assets.",
      color: "accent-emerald",
    },
    {
      number: "03",
      title: "Voice Synthesis",
      description: "Cloning or generating the perfect voice.",
      color: "accent-purple",
    },
    {
      number: "04",
      title: "Animation Rigging",
      description: "Setting up motion capture and expressions.",
      color: "accent-blue",
    },
    {
      number: "05",
      title: "Content Pipeline",
      description: "Setting up the automated production workflow.",
      color: "accent-emerald",
    },
  ];

  return (
    <div className="ai-filmmaking-page min-h-screen bg-background text-foreground overflow-x-hidden">
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
