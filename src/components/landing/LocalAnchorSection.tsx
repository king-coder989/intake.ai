import { AnimatedSection } from "./AnimatedSection";
import { MapPin } from "lucide-react";

const nagpurStats = [
  { value: "500+", label: "Civic complaints daily" },
  { value: "40+", label: "Municipal departments" },
  { value: "Weeks", label: "Average resolution time" },
];

export const LocalAnchorSection = () => {
  return (
    <section className="relative py-32 md:py-40 overflow-hidden">
      {/* Subtle gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-secondary/10 to-background" />
      
      <div className="relative section-container">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Content */}
          <div>
            <AnimatedSection>
              <div className="flex items-center gap-3 mb-8">
                <div className="w-10 h-10 rounded-xl bg-accent/10 flex items-center justify-center">
                  <MapPin className="w-5 h-5 text-accent" />
                </div>
                <span className="text-sm font-medium text-muted-foreground uppercase tracking-widest">
                  Case Study
                </span>
              </div>
            </AnimatedSection>

            <AnimatedSection delay={100}>
              <h2 className="text-foreground mb-6">
                Local problem.
                <br />
                <span className="text-muted-foreground">National pattern.</span>
              </h2>
            </AnimatedSection>

            <AnimatedSection delay={200}>
              <p className="lead mb-8">
                Nagpur serves as a grounded example of a challenge replicated across 
                thousands of cities. The scale varies, but the dysfunction is consistent.
              </p>
            </AnimatedSection>

            <AnimatedSection delay={300}>
              <blockquote className="border-l-2 border-accent pl-6 py-2">
                <p className="text-foreground/80 italic">
                  "We receive more complaints than we can categorise. Staff spend mornings 
                  just figuring out what went where."
                </p>
                <cite className="text-sm text-muted-foreground mt-2 block">
                  — Municipal Coordinator, NMC
                </cite>
              </blockquote>
            </AnimatedSection>
          </div>

          {/* Stats grid */}
          <div>
            <div className="grid gap-6">
              {nagpurStats.map((stat, i) => (
                <AnimatedSection key={i} delay={i * 100 + 200}>
                  <div className="card-glass flex items-center gap-6">
                    <div className="text-4xl md:text-5xl font-bold text-accent">
                      {stat.value}
                    </div>
                    <div className="text-lg text-muted-foreground">
                      {stat.label}
                    </div>
                  </div>
                </AnimatedSection>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
