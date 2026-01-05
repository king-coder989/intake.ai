import { AnimatedSection } from "./AnimatedSection";
import { Clock, Copy, AlertTriangle, LayoutList } from "lucide-react";

const impacts = [
  {
    icon: Clock,
    title: "Less time wasted",
    description: "Reduced administrative overhead nationally",
  },
  {
    icon: Copy,
    title: "Fewer duplicates",
    description: "Eliminate misrouted and repeated complaints",
  },
  {
    icon: AlertTriangle,
    title: "Earlier visibility",
    description: "Critical issues surface before escalation",
  },
  {
    icon: LayoutList,
    title: "Start from order",
    description: "Authorities begin from structure, not chaos",
  },
];

export const ImpactSection = () => {
  return (
    <section className="relative py-32 md:py-40 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-secondary/20 to-background" />
      
      <div className="relative section-container">
        <AnimatedSection className="text-center mb-20">
          <span className="inline-block px-4 py-2 rounded-full border border-accent/30 bg-accent/5 text-accent text-sm font-medium mb-8">
            Impact
          </span>
          <h2 className="text-foreground">
            What changes when complaints
            <br />
            <span className="text-accent">are organised.</span>
          </h2>
        </AnimatedSection>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {impacts.map((impact, i) => (
            <AnimatedSection key={i} delay={i * 100}>
              <div className="text-center p-8 rounded-2xl border border-border bg-card transition-colors duration-200 hover:border-accent/50 group">
                <div className="w-14 h-14 rounded-2xl bg-accent/10 flex items-center justify-center mx-auto mb-6 transition-colors group-hover:bg-accent/20">
                  <impact.icon className="w-7 h-7 text-accent" />
                </div>
                <h4 className="text-foreground mb-2">{impact.title}</h4>
                <p className="text-sm text-muted-foreground">{impact.description}</p>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
};
