import { useEffect, useRef, useState } from "react";

export const SunlightEffect = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [windIntensity, setWindIntensity] = useState<"low" | "medium" | "high">("low");

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Check for reduced motion preference
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) return;

    // Cursor tracking
    const handleMouseMove = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth) * 100;
      const y = (e.clientY / window.innerHeight) * 100;
      container.style.setProperty("--mouse-x", `${x}%`);
      container.style.setProperty("--mouse-y", `${y}%`);
    };

    // Random wind intensity changes
    const windInterval = setInterval(() => {
      const random = Math.random();
      if (random < 0.4) setWindIntensity("low");
      else if (random < 0.75) setWindIntensity("medium");
      else setWindIntensity("high");
    }, 8000);

    window.addEventListener("mousemove", handleMouseMove);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      clearInterval(windInterval);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="sunlight-container"
      aria-hidden="true"
      data-wind={windIntensity}
      style={{
        ["--mouse-x" as string]: "50%",
        ["--mouse-y" as string]: "30%",
      }}
    >
      {/* SVG Filters */}
      <svg className="absolute w-0 h-0" aria-hidden="true">
        <defs>
          <filter id="curtain-wave">
            <feTurbulence
              type="fractalNoise"
              baseFrequency="0.01 0.02"
              numOctaves="3"
              seed="2"
            >
              <animate
                attributeName="baseFrequency"
                values="0.01 0.02;0.015 0.025;0.01 0.02"
                dur="8s"
                repeatCount="indefinite"
              />
            </feTurbulence>
            <feDisplacementMap in="SourceGraphic" scale="25" />
          </filter>
          <filter id="soft-glow">
            <feGaussianBlur stdDeviation="20" />
          </filter>
        </defs>
      </svg>

      {/* Window frame on left side */}
      <div className="window-frame">
        <div className="window-pane window-pane-1" />
        <div className="window-pane window-pane-2" />
        <div className="window-frame-border" />
        <div className="window-frame-divider-h" />
        <div className="window-frame-divider-v" />
      </div>

      {/* Light curtains flowing from window */}
      <div className="light-curtain light-curtain-1" />
      <div className="light-curtain light-curtain-2" />
      <div className="light-curtain light-curtain-3" />
      <div className="light-curtain light-curtain-4" />

      {/* Ambient glow matching accent color */}
      <div className="window-ambient-glow" />

      {/* Subtle dust particles in the light */}
      <div className="window-dust">
        {Array.from({ length: 15 }).map((_, i) => (
          <span
            key={i}
            className="dust-mote"
            style={{
              left: `${5 + (i * 4)}%`,
              top: `${10 + ((i * 17) % 80)}%`,
              animationDelay: `${i * 0.8}s`,
              animationDuration: `${6 + (i % 5) * 2}s`,
            }}
          />
        ))}
      </div>

      {/* Cursor-reactive warmth */}
      <div className="sunlight-cursor-glow" />
    </div>
  );
};
