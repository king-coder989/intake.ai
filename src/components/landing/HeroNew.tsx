import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

export const HeroNew = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background layers */}
      <div className="absolute inset-0 bg-background" />
      
      {/* Grid pattern */}
      <div className="absolute inset-0 grid-pattern opacity-40" />
      
      {/* Gradient orbs */}
      <div className="absolute top-1/4 left-1/4 w-[600px] h-[600px] rounded-full bg-accent/5 blur-[120px] animate-glow-pulse" />
      <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] rounded-full bg-accent/3 blur-[100px]" />
      
      {/* Hero visual - abstract data visualization */}
      <div className="absolute right-0 top-1/2 -translate-y-1/2 w-1/2 h-[80vh] opacity-20 md:opacity-30">
        <HeroVisualization />
      </div>

      {/* Content */}
      <div className="relative z-10 section-container pt-32 pb-20">
        <div className="max-w-4xl">
          {/* Eyebrow */}
          <div className="animate-fade-up opacity-0 mb-8">
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-border/50 bg-secondary/50 text-sm text-muted-foreground">
              <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
              Civic Infrastructure Intelligence
            </span>
          </div>

          {/* Headline */}
          <h1 className="animate-fade-up opacity-0 delay-100 text-foreground mb-8">
            Organising civic complaints
            <br />
            <span className="gradient-text-accent">before they become chaos.</span>
          </h1>

          {/* Subheadline */}
          <p className="animate-fade-up opacity-0 delay-200 lead max-w-2xl mb-12">
            Cities receive thousands of complaints every day. Most are unstructured, 
            manually handled, and poorly prioritised. INTAKE.ai brings order at the 
            point where systems fail.
          </p>

          {/* CTAs */}
          <div className="animate-fade-up opacity-0 delay-300 flex flex-col sm:flex-row gap-4">
            <Link to="/intake" className="btn-primary group">
              Register a Complaint
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </Link>
            <Link to="/admin" className="btn-secondary">
              View Admin Demo
            </Link>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-fade-in opacity-0 delay-700">
        <div className="flex flex-col items-center gap-2 text-muted-foreground">
          <span className="text-xs uppercase tracking-widest">Scroll</span>
          <div className="w-px h-12 bg-gradient-to-b from-accent to-transparent" />
        </div>
      </div>
    </section>
  );
};

// Abstract visualization component
const HeroVisualization = () => {
  return (
    <svg viewBox="0 0 400 600" className="w-full h-full" preserveAspectRatio="xMidYMid slice">
      {/* Floating data layers */}
      {[0, 1, 2, 3, 4].map((i) => (
        <g key={i} style={{ animation: `float ${6 + i}s ease-in-out infinite`, animationDelay: `${i * 0.5}s` }}>
          <rect
            x={50 + i * 30}
            y={80 + i * 100}
            width={280 - i * 20}
            height={60}
            rx={8}
            fill="none"
            stroke="currentColor"
            strokeWidth={0.5}
            className="text-accent"
            opacity={0.3 - i * 0.05}
          />
          {/* Data lines inside */}
          {[0, 1, 2].map((j) => (
            <rect
              key={j}
              x={70 + i * 30}
              y={95 + i * 100 + j * 15}
              width={100 + Math.random() * 100}
              height={4}
              rx={2}
              className="fill-accent"
              opacity={0.2}
            />
          ))}
        </g>
      ))}
      
      {/* Connection lines */}
      <path
        d="M200 100 L200 500"
        stroke="currentColor"
        strokeWidth={0.5}
        className="text-accent"
        opacity={0.2}
        strokeDasharray="4 4"
      />
      
      {/* Nodes */}
      {[150, 250, 350, 450].map((y, i) => (
        <circle
          key={i}
          cx={200}
          cy={y}
          r={4}
          className="fill-accent"
          opacity={0.4}
        />
      ))}
    </svg>
  );
};
