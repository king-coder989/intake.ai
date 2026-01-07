"use client";
import React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface LampAmbientProps {
  children: React.ReactNode;
  className?: string;
  intensity?: "subtle" | "medium" | "faint";
  direction?: "top" | "bottom";
}

export const LampAmbient = ({
  children,
  className,
  intensity = "subtle",
  direction = "top",
}: LampAmbientProps) => {
  const opacityMap = {
    subtle: 0.15,
    medium: 0.25,
    faint: 0.08,
  };

  const opacity = opacityMap[intensity];
  const isTop = direction === "top";

  return (
    <div className={cn("relative overflow-hidden", className)}>
      {/* Ambient glow effect */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: opacity }}
          transition={{ duration: 1.2, ease: "easeOut" }}
          viewport={{ once: true, margin: "-100px" }}
          className={cn(
            "absolute left-1/2 -translate-x-1/2 w-[60%] max-w-2xl aspect-[2/1]",
            isTop ? "top-0 -translate-y-1/2" : "bottom-0 translate-y-1/2"
          )}
          style={{
            background: `radial-gradient(ellipse at center, hsl(var(--primary)) 0%, transparent 70%)`,
            filter: "blur(60px)",
          }}
        />
      </div>

      {/* Subtle line accent */}
      <motion.div
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
        viewport={{ once: true, margin: "-100px" }}
        className={cn(
          "absolute left-1/2 -translate-x-1/2 h-px w-48 bg-gradient-to-r from-transparent via-primary/30 to-transparent",
          isTop ? "top-0" : "bottom-0"
        )}
      />

      {/* Content */}
      <div className="relative z-10">{children}</div>
    </div>
  );
};
