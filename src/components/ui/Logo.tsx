import { Link } from "react-router-dom";
import logoImage from "@/assets/logo.png";

interface LogoProps {
  size?: "sm" | "md" | "lg";
}

export const Logo = ({ size = "md" }: LogoProps) => {
  const sizeClasses = {
    sm: "h-6",
    md: "h-7",
    lg: "h-8",
  };

  return (
    <Link to="/" className="block">
      <img src={logoImage} alt="intake.ai" className={sizeClasses[size]} />
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
