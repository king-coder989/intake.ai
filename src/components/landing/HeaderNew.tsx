import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Logo } from "@/components/ui/Logo";
import { Menu, X } from "lucide-react";

const navLinks = [
  { href: "#problem", label: "Problem" },
  { href: "#solution", label: "Solution" },
  { href: "#impact", label: "Impact" },
];

export const HeaderNew = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
      setIsMobileMenuOpen(false);
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-background border-b border-border"
          : "bg-transparent"
      }`}
    >
      <nav className="mx-auto max-w-7xl px-6 py-4 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center [&_img]:max-h-8 [&_img]:w-auto [&_img]:object-contain">
          <Logo size="md" />
        </div>
        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={(e) => scrollToSection(e, link.href)}
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              {link.label}
            </a>
          ))}
        </div>

        {/* CTAs */}
        <div className="hidden md:flex items-center gap-4">
          <Link
            to="/admin"
            className="text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            Admin Demo
          </Link>
          <Link
            to="/intake"
            className="px-5 py-2.5 rounded-lg bg-foreground text-background text-sm font-medium transition-colors hover:bg-foreground/90"
          >
            Register Complaint
          </Link>
        </div>

        {/* Mobile menu button */}
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="md:hidden p-2 text-foreground"
        >
          {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </nav>

      {/* Mobile menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-background border-b border-border animate-fade-in">
          <div className="px-6 py-6 space-y-4">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => scrollToSection(e, link.href)}
                className="block text-lg text-muted-foreground hover:text-foreground transition-colors"
              >
                {link.label}
              </a>
            ))}
            <div className="pt-4 border-t border-border space-y-3">
              <Link
                to="/admin"
                className="block text-lg text-muted-foreground hover:text-foreground transition-colors"
              >
                Admin Demo
              </Link>
              <Link
                to="/intake"
                className="block w-full text-center px-5 py-3 rounded-lg bg-foreground text-background font-medium"
              >
                Register Complaint
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
