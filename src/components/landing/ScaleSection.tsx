import { AnimatedSection } from "./AnimatedSection";
import { useEffect, useState, useRef } from "react";

interface CounterProps {
  end: number;
  suffix?: string;
  duration?: number;
}

const Counter = ({ end, suffix = "", duration = 2000 }: CounterProps) => {
  const [count, setCount] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.5 }
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!isVisible) return;

    let startTime: number;
    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      const easeOut = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(easeOut * end));

      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };

    requestAnimationFrame(animate);
  }, [isVisible, end, duration]);

  return (
    <span ref={ref} className="stat-number">
      {count.toLocaleString()}{suffix}
    </span>
  );
};

const stats = [
  { value: 15, suffix: "M+", label: "Grievances registered nationally per year", highlight: false },
  { value: 500, suffix: "K+", label: "Pending at any given time", highlight: false },
  { value: 0, suffix: "", label: "Unified national municipal dataset", isZero: true, highlight: true },
  { value: 4000, suffix: "+", label: "Urban local bodies operating independently", highlight: false },
];

export const ScaleSection = () => {
  return (
    <section className="relative py-32 md:py-40 overflow-hidden bg-card">
      <div className="section-container">
        <AnimatedSection className="text-center mb-20">
          <span className="badge mb-8">Scale</span>
          <h2 className="text-foreground">
            This is a <span className="text-accent">national</span> problem.
          </h2>
        </AnimatedSection>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {stats.map((stat, i) => (
            <AnimatedSection key={i} delay={i * 100}>
              <div className={`card-stat ${stat.highlight ? 'border-destructive/30 bg-gradient-to-br from-destructive/5 to-destructive/10' : ''}`}>
                <div className="relative z-10">
                  {stat.isZero ? (
                    <span className="stat-number !text-destructive" style={{ WebkitTextFillColor: 'hsl(var(--destructive))' }}>
                      Zero
                    </span>
                  ) : (
                    <Counter end={stat.value} suffix={stat.suffix} />
                  )}
                  <p className="mt-4 text-lg text-muted-foreground">{stat.label}</p>
                </div>
                
                {/* Decorative corner */}
                <div className="absolute top-0 right-0 w-20 h-20 bg-accent/5 rounded-bl-[80px]" />
              </div>
            </AnimatedSection>
          ))}
        </div>

        <AnimatedSection delay={500} className="mt-16 text-center">
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Cities operate independently, multiplying administrative overhead 
            <span className="text-accent font-medium"> across the nation.</span>
          </p>
        </AnimatedSection>
      </div>
    </section>
  );
};
