import { AnimatedSection } from "./AnimatedSection";
import { Clock, Copy, AlertTriangle, LayoutList } from "lucide-react";

const impacts = [
  {
    icon: Clock,
    number: "60%",
    title: "Less sorting time",
    description: "Reduced administrative overhead",
  },
  {
    icon: Copy,
    number: "80%",
    title: "Fewer duplicates",
    description: "Eliminate repeated complaints",
  },
  {
    icon: AlertTriangle,
    number: "3x",
    title: "Faster response",
    description: "Critical issues surface early",
  },
  {
    icon: LayoutList,
    number: "100%",
    title: "Structured data",
    description: "Start from order, not chaos",
  },
];

export const ImpactSection = () => {
  return (
    <section id="impact" className="relative py-32 md:py-40 overflow-hidden bg-secondary/30">
      <div className="section-container">
        <AnimatedSection className="text-center mb-20">
          <span className="badge mb-8">Impact</span>
          <h2 className="text-foreground">
            What changes when
            <br />
            <span className="text-accent">complaints are organised.</span>
          </h2>
        </AnimatedSection>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {impacts.map((impact, i) => (
            <AnimatedSection key={i} delay={i * 100}>
              <div className="group relative text-center p-8 rounded-3xl border border-border bg-card overflow-hidden transition-all duration-500 hover:-translate-y-2 hover:shadow-xl hover:shadow-accent/5">
                {/* Hover gradient */}
                <div className="absolute inset-0 bg-gradient-to-b from-accent/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                
                <div className="relative">
                  <div className="w-16 h-16 rounded-2xl bg-accent/10 flex items-center justify-center mx-auto mb-6 group-hover:bg-accent/20 transition-colors">
                    <impact.icon className="w-8 h-8 text-accent" />
                  </div>
                  
                  <div className="text-4xl font-bold text-foreground mb-2">{impact.number}</div>
                  <h4 className="text-foreground font-semibold mb-2">{impact.title}</h4>
                  <p className="text-sm text-muted-foreground">{impact.description}</p>
                </div>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
};
