import { SolutionHero } from "@/components/solutions/common/SolutionHero";
import { SolutionServices } from "@/components/solutions/common/SolutionServices";
import { SolutionProcess } from "@/components/solutions/common/SolutionProcess";
import { SolutionContact } from "@/components/solutions/common/SolutionContact";
import "../ai-filmmaking/AiFilmmaking.css";

const Fintech = () => {
  const services = [
    {
      title: "Fraud Detection",
      description: "Real-time transaction monitoring and anomaly detection.",
      image:
        "https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=400&h=300&fit=crop",
    },
    {
      title: "Algorithmic Trading",
      description:
        "High-frequency trading strategies powered by machine learning.",
      image:
        "https://images.unsplash.com/photo-1611974765270-ca12586343bb?w=400&h=300&fit=crop",
    },
    {
      title: "Risk Assessment",
      description: "Advanced credit scoring and portfolio risk analysis.",
      image:
        "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?w=400&h=300&fit=crop",
    },
  ];

  const processSteps = [
    {
      number: "01",
      title: "Security Audit",
      description: "Ensuring compliance and data safety.",
      color: "accent-blue",
    },
    {
      number: "02",
      title: "Data Integration",
      description: "Connecting to banking APIs and feeds.",
      color: "accent-emerald",
    },
    {
      number: "03",
      title: "Model Training",
      description: "Developing financial models with historical data.",
      color: "accent-purple",
    },
    {
      number: "04",
      title: "Testing",
      description: "Rigorous back-testing of financial algorithms.",
      color: "accent-blue",
    },
    {
      number: "05",
      title: "Launch",
      description: "Secure deployment to production environments.",
      color: "accent-emerald",
    },
  ];

  return (
    <div className="ai-filmmaking-page min-h-screen bg-background text-foreground overflow-x-hidden">
      <main>
        <SolutionHero
          title={
            <>
              FINTECH <br /> SOLUTIONS
            </>
          }
          subtitle="Modernize financial services with secure, high-performance AI integration."
          videoSrc="https://assets.mixkit.co/videos/preview/mixkit-digital-animation-of-financial-stats-9892-large.mp4"
        />
        <SolutionContact />
      </main>
    </div>
  );
};

export default Fintech;
