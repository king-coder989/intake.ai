import { AnimatedSection } from "./AnimatedSection";
import { LampAmbient } from "@/components/ui/lamp-ambient";

const problems = [
  "Complaints arrive as free-text, calls, images, and messages",
  "Different portals, departments, and formats",
  "Same issue logged multiple times",
  "Staff spend time sorting instead of solving",
];

export const ProblemSection = () => {
  return (
    <LampAmbient intensity="subtle" direction="top">
      <section className="relative py-32 md:py-40 overflow-hidden">
      <div className="relative section-container-sm">
        <AnimatedSection className="text-center mb-16">
          <h2 className="text-foreground max-w-3xl mx-auto">
            The problem is not lack of complaints.
            <br />
            <span className="text-muted-foreground">It's lack of organisation.</span>
          </h2>
        </AnimatedSection>

        <div className="max-w-2xl mx-auto">
          {problems.map((problem, i) => (
            <AnimatedSection key={i} delay={i * 100} className="mb-6">
              <div className="flex items-start gap-4 p-5 rounded-xl border border-border bg-card transition-colors duration-200 hover:border-muted-foreground/30">
                <div className="flex-shrink-0 w-8 h-8 rounded-lg bg-secondary flex items-center justify-center">
                  <span className="text-muted-foreground text-sm font-medium">✕</span>
                </div>
                <p className="text-foreground text-lg leading-relaxed">{problem}</p>
              </div>
            </AnimatedSection>
          ))}
        </div>

        <AnimatedSection delay={500} className="mt-16 text-center">
          <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto">
            When complaints are unorganised, 
            <span className="text-foreground font-medium"> critical issues get buried.</span>
          </p>
        </AnimatedSection>
      </div>
    </section>
    </LampAmbient>
  );
};
