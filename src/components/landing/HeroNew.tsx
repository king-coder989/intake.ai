import { Link } from "react-router-dom";
import { ArrowRight, Sparkles } from "lucide-react";

export const HeroNew = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-background">
      {/* Decorative orbs */}
      <div className="orb w-[600px] h-[600px] -top-40 -right-40" />
      <div className="orb w-[400px] h-[400px] bottom-20 -left-20 opacity-20" />
      
      {/* Floating elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 rounded-full bg-accent/40"
            style={{
              left: `${15 + i * 15}%`,
              top: `${20 + (i % 3) * 25}%`,
              animation: `float ${4 + i}s ease-in-out infinite`,
              animationDelay: `${i * 0.3}s`,
            }}
          />
        ))}
      </div>

      {/* Content */}
      <div className="relative z-10 section-container pt-32 pb-20">
        <div className="max-w-5xl">
          {/* Badge */}
          <div className="animate-fade-up opacity-0 mb-10">
            <span className="badge">
              <Sparkles className="w-4 h-4" />
              Civic Infrastructure Intelligence
            </span>
          </div>

          {/* Headline with accent */}
          <h1 className="animate-fade-up opacity-0 delay-100 text-foreground mb-8">
            Organising civic
            <br />
            complaints{" "}
            <span className="relative inline-block">
              <span className="text-accent">before</span>
              <svg className="absolute -bottom-2 left-0 w-full" viewBox="0 0 200 12" fill="none">
                <path d="M2 8C50 2 150 2 198 8" stroke="hsl(var(--accent))" strokeWidth="3" strokeLinecap="round"/>
              </svg>
            </span>
            <br />
            they become chaos.
          </h1>

          {/* Subheadline */}
          <p className="animate-fade-up opacity-0 delay-200 lead max-w-2xl mb-14">
            Cities receive thousands of complaints every day. Most are unstructured, 
            manually handled, and poorly prioritised. 
            <span className="text-foreground font-medium"> INTAKE.ai brings order.</span>
          </p>

          {/* CTAs */}
          <div className="animate-fade-up opacity-0 delay-300 flex flex-col sm:flex-row gap-4">
            <Link to="/intake" className="btn-primary">
              Register a Complaint
              <ArrowRight className="w-5 h-5" />
            </Link>
            <Link to="/admin" className="btn-secondary">
              View Admin Demo
            </Link>
          </div>

          {/* Stats row */}
          <div className="animate-fade-up opacity-0 delay-500 mt-20 pt-10 border-t border-border">
            <div className="grid grid-cols-3 gap-8">
              {[
                { number: "15M+", label: "Grievances yearly" },
                { number: "4000+", label: "Urban bodies" },
                { number: "24/7", label: "Always active" },
              ].map((stat, i) => (
                <div key={i} className="text-center sm:text-left">
                  <div className="text-2xl sm:text-3xl font-bold text-foreground">{stat.number}</div>
                  <div className="text-sm text-muted-foreground mt-1">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-fade-in opacity-0 delay-700">
        <div className="flex flex-col items-center gap-3">
          <div className="w-6 h-10 rounded-full border-2 border-muted-foreground/30 flex items-start justify-center p-2">
            <div className="w-1 h-2 rounded-full bg-accent animate-bounce" />
          </div>
        </div>
      </div>
    </section>
  );
};
