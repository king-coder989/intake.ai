import { Link } from "react-router-dom";
import { ArrowRight, Sparkles } from "lucide-react";
import { AnimatedSection } from "./AnimatedSection";

export const FinalCTA = () => {
  return (
    <section className="relative py-32 md:py-40 overflow-hidden">
      {/* Decorative elements */}
      <div className="orb w-[600px] h-[600px] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-20" />
      
      <div className="relative section-container">
        <div className="max-w-4xl mx-auto text-center">
          <AnimatedSection>
            <div className="inline-flex items-center gap-2 px-5 py-3 rounded-full bg-accent/10 border border-accent/30 mb-10">
              <Sparkles className="w-5 h-5 text-accent" />
              <span className="text-accent font-medium">Ready to start?</span>
            </div>
          </AnimatedSection>

          <AnimatedSection delay={100}>
            <h2 className="text-foreground mb-8">
              Bring order to
              <br />
              <span className="relative inline-block">
                civic complaints
                <svg className="absolute -bottom-3 left-0 w-full" viewBox="0 0 300 12" fill="none">
                  <path d="M2 8C75 2 225 2 298 8" stroke="hsl(var(--accent))" strokeWidth="4" strokeLinecap="round"/>
                </svg>
              </span>
            </h2>
          </AnimatedSection>

          <AnimatedSection delay={200}>
            <p className="lead max-w-xl mx-auto mb-12">
              See how INTAKE.ai transforms unstructured grievances into 
              actionable, prioritised queues for your city.
            </p>
          </AnimatedSection>

          <AnimatedSection delay={300}>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/admin" className="btn-primary text-lg px-10 py-5">
                View Admin Demo
                <ArrowRight className="w-5 h-5" />
              </Link>
              <Link to="/intake" className="btn-secondary text-lg px-10 py-5">
                Register a Complaint
              </Link>
            </div>
          </AnimatedSection>

          {/* Trust indicators */}
          <AnimatedSection delay={500}>
            <div className="mt-16 pt-10 border-t border-border">
              <p className="text-sm text-muted-foreground mb-6">Designed for Indian municipalities</p>
              <div className="flex items-center justify-center gap-8 opacity-50">
                {["Nagpur", "Pune", "Mumbai", "Delhi", "Bangalore"].map((city, i) => (
                  <span key={i} className="text-sm font-medium text-muted-foreground">{city}</span>
                ))}
              </div>
            </div>
          </AnimatedSection>
        </div>
      </div>
    </section>
  );
};
