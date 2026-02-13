import { SolutionHero } from "@/components/solutions/common/SolutionHero";
import { SolutionServices } from "@/components/solutions/common/SolutionServices";
import { SolutionProcess } from "@/components/solutions/common/SolutionProcess";
import { SolutionContact } from "@/components/solutions/common/SolutionContact";
import "../ai-filmmaking/AiFilmmaking.css";

const BusinessIntelligence = () => {
  const services = [
    {
      title: "Predictive Analytics",
      description:
        "Forecast market trends and consumer behavior with high accuracy.",
      image:
        "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=300&fit=crop",
    },
    {
      title: "Data Visualization",
      description:
        "Transform complex datasets into intuitive, interactive dashboards.",
      image:
        "https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?w=400&h=300&fit=crop",
    },
    {
      title: "Real-time Reporting",
      description: "Instant access to critical KPIs and operational metrics.",
      image:
        "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=300&fit=crop",
    },
  ];

  const processSteps = [
    {
      number: "01",
      title: "Data Collection",
      description: "Aggregating data from siloed sources.",
      color: "accent-blue",
    },
    {
      number: "02",
      title: "Cleaning & Prep",
      description: "Ensuring data integrity and quality.",
      color: "accent-emerald",
    },
    {
      number: "03",
      title: "Modeling",
      description: "Applying AI models to uncover insights.",
      color: "accent-purple",
    },
    {
      number: "04",
      title: "Visualization",
      description: "Designing clear, actionable interfaces.",
      color: "accent-blue",
    },
    {
      number: "05",
      title: "Action",
      description: "Translating insights into business decisions.",
      color: "accent-emerald",
    },
  ];

  return (
    <div className=" min-h-screen bg-background text-foreground overflow-x-hidden">
      <main>
        <SolutionHero
          title={
            <>
              BUSINESS <br /> INTELLIGENCE
            </>
          }
          subtitle="Turn raw data into actionable strategic insights."
          videoSrc="https://assets.mixkit.co/videos/preview/mixkit-stock-market-digital-graph-39694-large.mp4"
        />

        <SolutionContact />
      </main>
    </div>
  );
};

export default BusinessIntelligence;
