import { useEffect, useRef } from "react";

export const SunlightEffect = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Check for reduced motion preference
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) return;

    const handleMouseMove = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth) * 100;
      const y = (e.clientY / window.innerHeight) * 100;
      container.style.setProperty("--mouse-x", `${x}%`);
      container.style.setProperty("--mouse-y", `${y}%`);
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <div
      ref={containerRef}
      className="sunlight-container"
      aria-hidden="true"
      style={{
        ["--mouse-x" as string]: "50%",
        ["--mouse-y" as string]: "30%",
      }}
    >
      {/* SVG Filters for organic effects */}
      <svg className="absolute w-0 h-0" aria-hidden="true">
        <defs>
          <filter id="leaf-shadow-filter">
            <feTurbulence
              type="fractalNoise"
              baseFrequency="0.015"
              numOctaves="3"
              seed="5"
            >
              <animate
                attributeName="baseFrequency"
                values="0.015;0.018;0.015"
                dur="20s"
                repeatCount="indefinite"
              />
            </feTurbulence>
            <feDisplacementMap in="SourceGraphic" scale="30" />
            <feGaussianBlur stdDeviation="8" />
          </filter>
          <filter id="beam-blur">
            <feGaussianBlur stdDeviation="15" />
          </filter>
        </defs>
      </svg>

      {/* Layer 1: Base warm glow */}
      <div className="sunlight-base-glow" />

      {/* Layer 2: Window light beams */}
      <div className="sunlight-beams" />

      {/* Layer 3: Organic leaf shadows */}
      <div className="sunlight-leaves" />

      {/* Layer 4: Cursor-reactive light */}
      <div className="sunlight-cursor-glow" />

      {/* Layer 5: Dust particles */}
      <div className="sunlight-dust">
        {Array.from({ length: 12 }).map((_, i) => (
          <span key={i} className="dust-particle" style={{
            left: `${10 + (i * 7.5)}%`,
            top: `${15 + ((i * 23) % 70)}%`,
            animationDelay: `${i * 1.2}s`,
            animationDuration: `${8 + (i % 4) * 2}s`,
          }} />
        ))}
      </div>
    </div>
  );
};
