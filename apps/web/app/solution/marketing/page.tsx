import { SolutionHero } from "@/components/solutions/common/SolutionHero";
import { SolutionServices } from "@/components/solutions/common/SolutionServices";
import { SolutionProcess } from "@/components/solutions/common/SolutionProcess";
import { SolutionContact } from "@/components/solutions/common/SolutionContact";
import "../ai-filmmaking/AiFilmmaking.css";

const Marketing = () => {
  const services = [
    {
      title: "Personalized Copy",
      description:
        "AI-generated email and ad copy tailored to individual user segments.",
      image:
        "https://images.unsplash.com/photo-1557838923-2985c318be48?w=400&h=300&fit=crop",
    },
    {
      title: "Campaign Optimization",
      description: "Real-time budget allocation and A/B testing management.",
      image:
        "https://images.unsplash.com/photo-1432888498266-38ffec3eaf0a?w=400&h=300&fit=crop",
    },
    {
      title: "Visual Generation",
      description: "On-demand creation of social media posts and ad creatives.",
      image:
        "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=400&h=300&fit=crop",
    },
  ];

  const processSteps = [
    {
      number: "01",
      title: "Audience Analysis",
      description: "Deep dive into customer demographics.",
      color: "accent-blue",
    },
    {
      number: "02",
      title: "Content Strategy",
      description: "Defining tone, channels, and frequency.",
      color: "accent-emerald",
    },
    {
      number: "03",
      title: "AI Setup",
      description: "Configuring generation models for your brand.",
      color: "accent-purple",
    },
    {
      number: "04",
      title: "Campaign Launch",
      description: "Automated distribution across platforms.",
      color: "accent-blue",
    },
    {
      number: "05",
      title: "Analytics",
      description: "Measuring ROI and refining models.",
      color: "accent-emerald",
    },
  ];

  return (
    <div className=" min-h-screen bg-background text-foreground overflow-x-hidden">
      <main>
        <SolutionHero
          title={
            <>
              INTELLIGENT <br /> MARKETING
            </>
          }
          subtitle="Scale your marketing efforts with generative AI and automated insights."
          videoSrc="https://assets.mixkit.co/videos/preview/mixkit-digital-network-connection-lines-14068-large.mp4"
        />
        <SolutionContact />
      </main>
    </div>
  );
};

export default Marketing;
