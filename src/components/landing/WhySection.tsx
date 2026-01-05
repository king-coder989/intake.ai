import { AnimatedSection } from "./AnimatedSection";
import { Check } from "lucide-react";

const points = [
  "Existing portals focus on submission, not organisation",
  "Structure and prioritisation remain manual everywhere",
  "Improving complaint organisation improves every downstream process",
];

export const WhySection = () => {
  return (
    <section className="relative py-32 md:py-40 overflow-hidden">
      {/* Gradient background */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-secondary/20 to-background" />
      
      <div className="relative section-container-sm">
        <AnimatedSection className="text-center mb-16">
          <h2 className="text-foreground max-w-2xl mx-auto">
            Fixing the layer 
            <span className="text-accent"> every system </span>
            depends on.
          </h2>
        </AnimatedSection>

        <div className="max-w-2xl mx-auto space-y-6">
          {points.map((point, i) => (
            <AnimatedSection key={i} delay={i * 100}>
              <div className="flex items-start gap-4 p-6 rounded-xl border border-border/30 bg-card/30 backdrop-blur-sm">
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-accent/10 flex items-center justify-center">
                  <Check className="w-4 h-4 text-accent" />
                </div>
                <p className="text-foreground/90 text-lg leading-relaxed">{point}</p>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
};
