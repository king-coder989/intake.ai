import { Link } from "react-router-dom";
import { Logo } from "@/components/ui/Logo";

export const Header = () => {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 border-b border-border/50 bg-background/80 backdrop-blur-sm">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
        <div className="flex items-center [&_img]:max-h-14 [&_img]:w-auto [&_img]:object-contain">
          <Logo size="md" />
        </div>
        <Link
          to="/admin"
          className="btn-secondary text-sm"
        >
          Admin Login
        </Link>
      </div>
    </header>
  );
};
