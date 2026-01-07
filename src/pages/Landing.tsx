import { HeaderNew } from "@/components/landing/HeaderNew";
import { HeroNew } from "@/components/landing/HeroNew";
import { ProblemSection } from "@/components/landing/ProblemSection";
import { ScaleSection } from "@/components/landing/ScaleSection";
import { LocalAnchorSection } from "@/components/landing/LocalAnchorSection";
import { SolutionSection } from "@/components/landing/SolutionSection";
import { WhySection } from "@/components/landing/WhySection";
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
        <section id="problem">
          <ProblemSection />
        </section>
        <ScaleSection />
        <LocalAnchorSection />
        <section id="solution">
          <SolutionSection />
        </section>
        <WhySection />
        <AdminSection />
        <section id="impact">
          <ImpactSection />
        </section>
        <FinalCTA />
      </main>
      <FooterNew />
    </div>
  );
};

export default Landing;
