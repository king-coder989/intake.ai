import { AnimatedSection } from "./AnimatedSection";
import { Layers, Tag, LayoutList, Zap } from "lucide-react";

const features = [
  {
    icon: Layers,
    title: "Structure",
    description: "Converts unstructured complaints into clean, searchable, actionable data.",
    color: "from-orange-500/20 to-red-500/20",
  },
  {
    icon: Tag,
    title: "Classify",
    description: "Auto-assigns category, priority level, and responsible department.",
    color: "from-blue-500/20 to-cyan-500/20",
  },
  {
    icon: LayoutList,
    title: "Prioritise",
    description: "Creates ordered queues so authorities start from clarity, not chaos.",
    color: "from-green-500/20 to-emerald-500/20",
  },
  {
    icon: Zap,
    title: "Integrate",
    description: "Works alongside existing municipal portals. No replacement needed.",
    color: "from-purple-500/20 to-pink-500/20",
  },
];

export const SolutionSection = () => {
  return (
    <section id="solution" className="relative py-32 md:py-40 overflow-hidden">
      {/* Background accent */}
      <div className="orb w-[500px] h-[500px] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-10" />
      
      <div className="relative section-container">
        <AnimatedSection className="text-center mb-20">
          <span className="badge mb-8">How It Works</span>
          <h2 className="text-foreground max-w-3xl mx-auto">
            A system for <span className="text-accent">organising</span>,
            <br />
            not replacing governments.
          </h2>
        </AnimatedSection>

        <div className="grid md:grid-cols-2 gap-6">
          {features.map((feature, i) => (
            <AnimatedSection key={i} delay={i * 100}>
              <div className="card-feature group h-full">
                {/* Gradient background on hover */}
                <div className={`absolute inset-0 rounded-3xl bg-gradient-to-br ${feature.color} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
                
                <div className="relative">
                  <div className="w-14 h-14 rounded-2xl bg-accent/10 flex items-center justify-center mb-6 group-hover:bg-accent/20 transition-colors">
                    <feature.icon className="w-7 h-7 text-accent" />
                  </div>
                  
                  <h3 className="text-foreground mb-3 text-2xl">{feature.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
};
