import { AnimatedSection } from "./AnimatedSection";
import { LayoutList, Tag, MapPin, Shield, Zap } from "lucide-react";

const features = [
  { icon: LayoutList, label: "Prioritised queues" },
  { icon: Tag, label: "Clear categorisation" },
  { icon: MapPin, label: "Location context" },
  { icon: Shield, label: "Optional audit trail" },
  { icon: Zap, label: "No learning curve" },
];

export const AdminSection = () => {
  return (
    <section className="relative py-32 md:py-40 overflow-hidden">
      <div className="relative section-container">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Content */}
          <div>
            <AnimatedSection>
              <span className="inline-block px-4 py-2 rounded-full border border-accent/30 bg-accent/5 text-accent text-sm font-medium mb-8">
                For Administrators
              </span>
            </AnimatedSection>

            <AnimatedSection delay={100}>
              <h2 className="text-foreground mb-6">
                Built for the people
                <br />
                <span className="text-muted-foreground">who handle complaints.</span>
              </h2>
            </AnimatedSection>

            <AnimatedSection delay={200}>
              <p className="lead mb-10">
                The interface is designed for municipal staff. Clean, focused, and 
                ready from day one.
              </p>
            </AnimatedSection>

            <div className="grid grid-cols-2 gap-4">
              {features.map((feature, i) => (
                <AnimatedSection key={i} delay={i * 50 + 300}>
                  <div className="flex items-center gap-3 p-3 rounded-lg border border-border/30 bg-card/20">
                    <feature.icon className="w-5 h-5 text-accent" />
                    <span className="text-sm text-foreground/80">{feature.label}</span>
                  </div>
                </AnimatedSection>
              ))}
            </div>
          </div>

          {/* Dashboard mockup */}
          <AnimatedSection delay={200} animation="scale-in">
            <div className="relative">
              {/* Glow behind */}
              <div className="absolute inset-0 bg-accent/10 blur-[60px] rounded-3xl" />
              
              {/* Dashboard frame */}
              <div className="relative rounded-2xl border border-border/50 bg-card/80 backdrop-blur-sm overflow-hidden shadow-2xl">
                {/* Header bar */}
                <div className="flex items-center gap-2 px-4 py-3 border-b border-border/50 bg-secondary/50">
                  <div className="w-3 h-3 rounded-full bg-destructive/60" />
                  <div className="w-3 h-3 rounded-full bg-urgency-medium/60" />
                  <div className="w-3 h-3 rounded-full bg-urgency-low/60" />
                  <span className="ml-4 text-xs text-muted-foreground">INTAKE.ai — Admin Dashboard</span>
                </div>
                
                {/* Content area */}
                <div className="p-6 space-y-4">
                  {/* Stats row */}
                  <div className="grid grid-cols-3 gap-3">
                    {["24 High", "56 Medium", "112 Low"].map((stat, i) => (
                      <div key={i} className="p-3 rounded-lg bg-secondary/30 text-center">
                        <span className="text-sm font-medium text-foreground">{stat}</span>
                      </div>
                    ))}
                  </div>
                  
                  {/* Queue items */}
                  {[
                    { priority: "high", title: "Water supply disruption — Ward 14", time: "2h ago" },
                    { priority: "medium", title: "Street light malfunction — Ring Road", time: "4h ago" },
                    { priority: "low", title: "Park maintenance request — Dharampeth", time: "1d ago" },
                  ].map((item, i) => (
                    <div key={i} className="flex items-center gap-4 p-4 rounded-lg bg-secondary/20 border border-border/30">
                      <div className={`w-2 h-2 rounded-full ${
                        item.priority === "high" ? "bg-destructive" : 
                        item.priority === "medium" ? "bg-urgency-medium" : "bg-urgency-low"
                      }`} />
                      <div className="flex-1 min-w-0">
                        <p className="text-sm text-foreground truncate">{item.title}</p>
                      </div>
                      <span className="text-xs text-muted-foreground">{item.time}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </div>
    </section>
  );
};
