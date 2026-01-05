import { Link } from "react-router-dom";

interface LogoProps {
  variant?: "default" | "light";
  size?: "sm" | "md" | "lg";
}

export const Logo = ({ variant = "default", size = "md" }: LogoProps) => {
  const sizeClasses = {
    sm: "text-lg",
    md: "text-xl",
    lg: "text-2xl",
  };

  const colorClasses = {
    default: "text-foreground",
    light: "text-sidebar-foreground",
  };

  return (
    <Link to="/" className={`font-semibold tracking-tight ${sizeClasses[size]} ${colorClasses[variant]}`}>
      intake<span className="text-accent">.ai</span>
    </Link>
  );
};

export const LogoSymbol = ({ className = "" }: { className?: string }) => (
  <svg 
    width="28" 
    height="28" 
    viewBox="0 0 32 32" 
    fill="none" 
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    <path 
      d="M6 9h20M6 16h14M6 23h10" 
      stroke="currentColor" 
      strokeWidth="2.5" 
      strokeLinecap="round"
    />
  </svg>
);
