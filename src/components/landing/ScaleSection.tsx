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
    <span ref={ref} className="stat-number text-foreground">
      {count.toLocaleString()}{suffix}
    </span>
  );
};

const stats = [
  { value: 15, suffix: "M+", label: "Grievances registered nationally per year" },
  { value: 500, suffix: "K+", label: "Pending at any given time" },
  { value: 0, suffix: "", label: "Unified national municipal dataset", isZero: true },
  { value: 4000, suffix: "+", label: "Urban local bodies operating independently" },
];

export const ScaleSection = () => {
  return (
    <section className="relative py-32 md:py-40 overflow-hidden">
      <div className="relative section-container">
        <AnimatedSection className="text-center mb-20">
          <span className="inline-block px-4 py-2 rounded-full border border-border text-muted-foreground text-sm font-medium mb-8">
            National Scale
          </span>
          <h2 className="text-foreground">
            This is a scale problem.
          </h2>
        </AnimatedSection>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
          {stats.map((stat, i) => (
            <AnimatedSection key={i} delay={i * 100}>
              <div className="card-glass group text-center md:text-left">
                {stat.isZero ? (
                  <span className="stat-number text-destructive">Zero</span>
                ) : (
                  <Counter end={stat.value} suffix={stat.suffix} />
                )}
                <p className="mt-4 text-lg text-muted-foreground">{stat.label}</p>
              </div>
            </AnimatedSection>
          ))}
        </div>

        <AnimatedSection delay={500} className="mt-16 text-center">
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Cities operate independently, multiplying administrative overhead.
          </p>
        </AnimatedSection>
      </div>
    </section>
  );
};
