import { Hero } from "@/components/solutions/ai-filmmaking/Hero";
import { Portfolio } from "@/components/solutions/ai-filmmaking/Portfolio";
import { About } from "@/components/solutions/ai-filmmaking/About";
import { Services } from "@/components/solutions/ai-filmmaking/Services";
import { Team } from "@/components/solutions/ai-filmmaking/Team";
import { Awards } from "@/components/solutions/ai-filmmaking/Awards";
import { Contact } from "@/components/solutions/ai-filmmaking/Contact";
import "./AiFilmmaking.css";

const AiFilmmaking = () => {
  return (
    <div className="ai-filmmaking-page min-h-screen bg-background text-foreground overflow-x-hidden">
      <main>
        <Hero />
        <Portfolio />
        <About />
        <Services />
        <Awards />
        <Team />
        <Contact />
      </main>
    </div>
  );
};

export default AiFilmmaking;
