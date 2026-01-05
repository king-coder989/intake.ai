import { AnimatedSection } from "./AnimatedSection";
import { LayoutList, Tag, MapPin, Shield, Zap, Check } from "lucide-react";

const features = [
  { icon: LayoutList, label: "Prioritised queues" },
  { icon: Tag, label: "Clear categorisation" },
  { icon: MapPin, label: "Location context" },
  { icon: Shield, label: "Audit trail" },
  { icon: Zap, label: "Zero learning curve" },
];

export const AdminSection = () => {
  return (
    <section className="relative py-32 md:py-40 overflow-hidden">
      <div className="orb w-[400px] h-[400px] top-0 right-0 opacity-15" />
      
      <div className="relative section-container">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Dashboard mockup */}
          <AnimatedSection animation="scale-in">
            <div className="relative">
              {/* Browser frame */}
              <div className="rounded-3xl border border-border bg-card overflow-hidden shadow-2xl">
                {/* Header bar */}
                <div className="flex items-center gap-2 px-5 py-4 border-b border-border bg-secondary/50">
                  <div className="flex gap-2">
                    <div className="w-3 h-3 rounded-full bg-destructive/60" />
                    <div className="w-3 h-3 rounded-full bg-urgency-medium/60" />
                    <div className="w-3 h-3 rounded-full bg-urgency-low/60" />
                  </div>
                  <div className="flex-1 mx-4">
                    <div className="max-w-xs mx-auto h-6 rounded-lg bg-muted/50 flex items-center justify-center">
                      <span className="text-xs text-muted-foreground">intake.ai/admin</span>
                    </div>
                  </div>
                </div>
                
                {/* Content */}
                <div className="p-6 space-y-4 bg-background">
                  {/* Stats */}
                  <div className="grid grid-cols-3 gap-3">
                    {[
                      { label: "High", count: 24, color: "destructive" },
                      { label: "Medium", count: 56, color: "urgency-medium" },
                      { label: "Low", count: 112, color: "urgency-low" },
                    ].map((stat, i) => (
                      <div key={i} className="p-4 rounded-2xl bg-card border border-border text-center">
                        <div className={`text-2xl font-bold text-${stat.color}`}>{stat.count}</div>
                        <div className="text-xs text-muted-foreground mt-1">{stat.label} Priority</div>
                      </div>
                    ))}
                  </div>
                  
                  {/* Queue items */}
                  {[
                    { priority: "high", title: "Water supply disruption — Ward 14", time: "2h" },
                    { priority: "medium", title: "Street light malfunction — Ring Road", time: "4h" },
                    { priority: "low", title: "Park maintenance — Dharampeth", time: "1d" },
                  ].map((item, i) => (
                    <div key={i} className="flex items-center gap-4 p-4 rounded-2xl bg-card border border-border hover:border-accent/30 transition-colors cursor-pointer">
                      <div className={`w-3 h-3 rounded-full ${
                        item.priority === "high" ? "bg-destructive" : 
                        item.priority === "medium" ? "bg-urgency-medium" : "bg-urgency-low"
                      }`} />
                      <div className="flex-1 min-w-0">
                        <p className="text-sm text-foreground font-medium truncate">{item.title}</p>
                      </div>
                      <span className="text-xs text-muted-foreground bg-secondary px-2 py-1 rounded-full">{item.time}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </AnimatedSection>

          {/* Content */}
          <div>
            <AnimatedSection>
              <span className="badge mb-8">For Administrators</span>
            </AnimatedSection>

            <AnimatedSection delay={100}>
              <h2 className="text-foreground mb-6">
                Built for the people
                <br />
                <span className="text-accent">who handle complaints.</span>
              </h2>
            </AnimatedSection>

            <AnimatedSection delay={200}>
              <p className="lead mb-10">
                Clean interface designed for municipal staff. Start solving 
                problems from day one.
              </p>
            </AnimatedSection>

            <div className="space-y-4">
              {features.map((feature, i) => (
                <AnimatedSection key={i} delay={i * 50 + 300}>
                  <div className="flex items-center gap-4 p-4 rounded-2xl border border-border bg-card/50 hover:bg-card transition-colors">
                    <div className="w-10 h-10 rounded-xl bg-accent/10 flex items-center justify-center">
                      <Check className="w-5 h-5 text-accent" />
                    </div>
                    <span className="text-foreground font-medium">{feature.label}</span>
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
