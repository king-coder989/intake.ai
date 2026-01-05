import { AnimatedSection } from "./AnimatedSection";
import { X } from "lucide-react";

const problems = [
  {
    title: "Unstructured Input",
    desc: "Complaints arrive as free-text, calls, images, and voice messages with no standard format.",
  },
  {
    title: "Fragmented Systems", 
    desc: "Different portals, departments, and formats create information silos.",
  },
  {
    title: "Duplicate Overload",
    desc: "Same issues logged multiple times across channels waste valuable resources.",
  },
  {
    title: "Manual Sorting",
    desc: "Staff spend time categorizing instead of solving actual problems.",
  },
];

export const ProblemSection = () => {
  return (
    <section id="problem" className="relative py-32 md:py-40 overflow-hidden bg-secondary/30">
      <div className="section-container">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left - Heading */}
          <div>
            <AnimatedSection>
              <div className="accent-line mb-8" />
              <h2 className="text-foreground">
                The problem isn't
                <br />
                <span className="text-accent">lack of complaints.</span>
              </h2>
              <p className="lead mt-6 max-w-md">
                It's lack of organisation. Critical issues get buried in noise.
              </p>
            </AnimatedSection>
          </div>

          {/* Right - Problem cards */}
          <div className="space-y-4">
            {problems.map((problem, i) => (
              <AnimatedSection key={i} delay={i * 100}>
                <div className="group flex items-start gap-5 p-6 rounded-2xl bg-card border border-border transition-all duration-300 hover:border-destructive/30 hover:bg-card/80">
                  <div className="flex-shrink-0 w-10 h-10 rounded-xl bg-destructive/10 flex items-center justify-center group-hover:bg-destructive/20 transition-colors">
                    <X className="w-5 h-5 text-destructive" />
                  </div>
                  <div>
                    <h4 className="text-foreground font-semibold mb-1">{problem.title}</h4>
                    <p className="text-muted-foreground text-sm leading-relaxed">{problem.desc}</p>
                  </div>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
