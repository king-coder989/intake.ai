import { HeaderNew } from "@/components/landing/HeaderNew";
import { HeroNew } from "@/components/landing/HeroNew";
import { ProblemSection } from "@/components/landing/ProblemSection";
import { ScaleSection } from "@/components/landing/ScaleSection";
import { SolutionSection } from "@/components/landing/SolutionSection";
import { AdminSection } from "@/components/landing/AdminSection";
import { ImpactSection } from "@/components/landing/ImpactSection";
import { FinalCTA } from "@/components/landing/FinalCTA";
import { FooterNew } from "@/components/landing/FooterNew";

const Landing = () => {
  return (
    <div className="min-h-screen bg-background">
      <HeaderNew />
      <main>
        <HeroNew />
        <ProblemSection />
        <SolutionSection />
        <ScaleSection />
        <AdminSection />
        <ImpactSection />
        <FinalCTA />
      </main>
      <FooterNew />
    </div>
  );
};

export default Landing;
