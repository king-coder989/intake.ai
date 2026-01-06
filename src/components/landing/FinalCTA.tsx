import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { AnimatedSection } from "./AnimatedSection";

export const FinalCTA = () => {
  return (
    <section className="relative py-32 md:py-40 overflow-hidden bg-card">
      <div className="relative section-container-sm text-center">
        <AnimatedSection>
          <h2 className="text-foreground mb-6">
            Ready to bring order
            <br />
            <span className="text-muted-foreground">to civic complaints?</span>
          </h2>
        </AnimatedSection>

        <AnimatedSection delay={100}>
          <p className="lead max-w-xl mx-auto mb-12">
            See how INTAKE.ai transforms unstructured grievances into actionable, 
            prioritised queues.
          </p>
        </AnimatedSection>

        <AnimatedSection delay={200}>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/admin" className="btn-primary group">
              View Admin Demo
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </Link>
            <Link to="/intake" className="btn-secondary">
              Register a Complaint
            </Link>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
};
