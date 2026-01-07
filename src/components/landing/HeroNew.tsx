import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { LampContainer } from "@/components/ui/lamp";

export const HeroNew = () => {
  return (
    <LampContainer>
      <motion.div
        initial={{ opacity: 0.5, y: 100 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{
          delay: 0.3,
          duration: 0.8,
          ease: "easeInOut",
        }}
        className="flex flex-col items-center text-center"
      >
        {/* Eyebrow */}
        <div className="mb-8">
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-border text-sm text-muted-foreground">
            Civic Infrastructure Intelligence
          </span>
        </div>

        {/* Headline */}
        <h1 className="text-foreground mb-8 bg-gradient-to-br from-foreground to-muted-foreground bg-clip-text">
          Organising civic complaints
          <br />
          <span className="text-muted-foreground">before they become chaos.</span>
        </h1>

        {/* Subheadline */}
        <p className="lead max-w-2xl mb-12 text-muted-foreground">
          Cities receive thousands of complaints every day. Most are unstructured, 
          manually handled, and poorly prioritised. INTAKE.ai brings order at the 
          point where systems fail.
        </p>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row gap-4">
          <Link to="/intake" className="btn-primary group">
            Register a Complaint
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </Link>
          <Link to="/admin" className="btn-secondary">
            View Admin Demo
          </Link>
        </div>
      </motion.div>
    </LampContainer>
  );
};

// Abstract visualization component - silver/gray themed
const HeroVisualization = () => {
  return (
    <svg viewBox="0 0 400 600" className="w-full h-full" preserveAspectRatio="xMidYMid slice">
      {/* Floating data layers - silver/gray */}
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
            className="text-muted-foreground"
            opacity={0.25 - i * 0.04}
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
              className="fill-muted-foreground"
              opacity={0.15}
            />
          ))}
        </g>
      ))}
      
      {/* Connection lines - silver */}
      <path
        d="M200 100 L200 500"
        stroke="currentColor"
        strokeWidth={0.5}
        className="text-muted-foreground"
        opacity={0.15}
        strokeDasharray="4 4"
      />
      
      {/* Nodes - silver */}
      {[150, 250, 350, 450].map((y, i) => (
        <circle
          key={i}
          cx={200}
          cy={y}
          r={3}
          className="fill-muted-foreground"
          opacity={0.3}
        />
      ))}
    </svg>
  );
};
