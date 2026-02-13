import { SolutionHero } from "@/components/solutions/common/SolutionHero";
import { SolutionServices } from "@/components/solutions/common/SolutionServices";
import { SolutionProcess } from "@/components/solutions/common/SolutionProcess";
import { SolutionContact } from "@/components/solutions/common/SolutionContact";
import "../ai-filmmaking/AiFilmmaking.css";

const AiConsultation = () => {
  const services = [
    {
      title: "Strategy Workshops",
      description:
        "Executive sessions to identify high-impact AI opportunities.",
      image:
        "https://images.unsplash.com/photo-1552664730-d307ca884978?w=400&h=300&fit=crop",
    },
    {
      title: "Tech Stack Review",
      description: "Assessment of current infrastructure for AI readiness.",
      image:
        "https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=400&h=300&fit=crop",
    },
    {
      title: "Implementation Roadmap",
      description: "Detailed step-by-step plans for AI adoption.",
      image:
        "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=400&h=300&fit=crop",
    },
  ];

  const processSteps = [
    {
      number: "01",
      title: "Discovery",
      description: "Understanding business goals and pain points.",
      color: "accent-blue",
    },
    {
      number: "02",
      title: "Assessment",
      description: "Evaluating data and technical maturity.",
      color: "accent-emerald",
    },
    {
      number: "03",
      title: "Use Case Select",
      description: "Prioritizing projects by ROI.",
      color: "accent-purple",
    },
    {
      number: "04",
      title: "Prototyping",
      description: "Quick proofs of concept to validate value.",
      color: "accent-blue",
    },
    {
      number: "05",
      title: "Scaling",
      description: "Plan for enterprise-wide rollout.",
      color: "accent-emerald",
    },
  ];

  return (
    <div className="ai-filmmaking-page min-h-screen bg-background text-foreground overflow-x-hidden">
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

export default AiConsultation;
