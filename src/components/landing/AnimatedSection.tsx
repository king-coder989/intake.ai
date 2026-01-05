import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { cn } from "@/lib/utils";
import { ReactNode } from "react";

interface AnimatedSectionProps {
  children: ReactNode;
  className?: string;
  animation?: "fade-up" | "fade-in" | "slide-up" | "scale-in";
  delay?: number;
}

export const AnimatedSection = ({
  children,
  className,
  animation = "fade-up",
  delay = 0,
}: AnimatedSectionProps) => {
  const { ref, isVisible } = useScrollAnimation();

  const animationClasses = {
    "fade-up": "animate-fade-up",
    "fade-in": "animate-fade-in",
    "slide-up": "animate-slide-up",
    "scale-in": "animate-scale-in",
  };

  return (
    <div
      ref={ref}
      className={cn(
        "opacity-0",
        isVisible && animationClasses[animation],
        className
      )}
      style={{ animationDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
};
