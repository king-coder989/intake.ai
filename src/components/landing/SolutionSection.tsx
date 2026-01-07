import { AnimatedSection } from "./AnimatedSection";
import { Layers, Tag, LayoutList, ArrowRight } from "lucide-react";
import { LampAmbient } from "@/components/ui/lamp-ambient";

const features = [
  {
    icon: Layers,
    title: "Structured Records",
    description: "Converts unstructured complaints — text, voice, images — into clean, searchable data.",
  },
  {
    icon: Tag,
    title: "Auto-Classification",
    description: "Assigns category, priority level, and responsible department automatically.",
  },
  {
    icon: LayoutList,
    title: "Ordered Queues",
    description: "Creates prioritised queues so authorities start from clarity, not randomness.",
  },
  {
    icon: ArrowRight,
    title: "System Compatibility",
    description: "Works alongside existing municipal portals. No replacement needed.",
  },
];

export const SolutionSection = () => {
  return (
    <LampAmbient intensity="medium" direction="top">
      <section className="relative py-32 md:py-40 overflow-hidden">
      <div className="relative section-container">
        <AnimatedSection className="text-center mb-20">
          <span className="inline-block px-4 py-2 rounded-full border border-border text-muted-foreground text-sm font-medium mb-8">
            The Solution
          </span>
          <h2 className="text-foreground max-w-3xl mx-auto">
            A system for organising complaints,
            <br />
            <span className="text-muted-foreground">not replacing governments.</span>
          </h2>
        </AnimatedSection>

        <div className="grid md:grid-cols-2 gap-6 lg:gap-8">
          {features.map((feature, i) => (
            <AnimatedSection key={i} delay={i * 100}>
              <div className="card-glass group h-full">
                <div className="w-12 h-12 rounded-xl bg-secondary flex items-center justify-center mb-6 transition-colors group-hover:bg-muted">
                  <feature.icon className="w-6 h-6 text-foreground" />
                </div>
                <h3 className="text-foreground mb-3">{feature.title}</h3>
                <p className="text-muted-foreground leading-relaxed">
                  {feature.description}
                </p>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
    </LampAmbient>
  );
};
