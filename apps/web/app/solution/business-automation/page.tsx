import { SolutionHero } from "@/components/solutions/common/SolutionHero";
import { SolutionServices } from "@/components/solutions/common/SolutionServices";
import { SolutionProcess } from "@/components/solutions/common/SolutionProcess";
import { SolutionContact } from "@/components/solutions/common/SolutionContact";
import "../ai-filmmaking/AiFilmmaking.css"; // Reuse shared base styles

const BusinessAutomation = () => {
  // ... existing code ...
  const services = [
    {
      title: "Workflow Automation",
      description:
        "End-to-end automation of repetitive business processes using intelligent agents.",
      image:
        "https://images.unsplash.com/photo-1518432031352-d6fc5c10da5a?w=400&h=300&fit=crop",
    },
    {
      title: "Document Processing",
      description:
        "AI-powered extraction and analysis of data from invoices, contracts, and forms.",
      image:
        "https://images.unsplash.com/photo-1563986768609-322da13575f3?w=400&h=300&fit=crop",
    },
    {
      title: "Smart CRM Integration",
      description:
        "Automated customer data syncing, lead scoring, and personalized outreach.",
      image:
        "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=300&fit=crop",
    },
  ];

  const processSteps = [
    {
      number: "01",
      title: "Audit & Analysis",
      description: "Analyzing current workflows to identify bottlenecks.",
      color: "accent-blue",
    },
    {
      number: "02",
      title: "Strategy Design",
      description: "Mapping out the automation architecture.",
      color: "accent-emerald",
    },
    {
      number: "03",
      title: "Development",
      description: "Building custom bots and integration layers.",
      color: "accent-purple",
    },
    {
      number: "04",
      title: "Deployment",
      description: "Seamless rollout with minimal downtime.",
      color: "accent-blue",
    },
    {
      number: "05",
      title: "Optimization",
      description: "Continuous monitoring and performance tuning.",
      color: "accent-emerald",
    },
  ];

  return (
    <div className="ai-filmmaking-page min-h-screen bg-background text-foreground overflow-x-hidden">
      <main>
        <SolutionHero
          title={
            <>
              BUSINESS <br /> AUTOMATION
            </>
          }
          subtitle="Streamline operations and reduce costs with intelligent process automation."
          videoSrc="https://assets.mixkit.co/videos/preview/mixkit-factory-conveyor-belt-of-packages-41589-large.mp4"
        />
       
    
        <SolutionContact />
      </main>
    </div>
  );
};

export default BusinessAutomation;
