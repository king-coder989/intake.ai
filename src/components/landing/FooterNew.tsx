import { Logo } from "@/components/ui/Logo";
import { Github, Instagram, Twitter, Linkedin } from "lucide-react";

const socialLinks = [
  { icon: Github, href: "https://github.com/guptajiengineer", label: "GitHub" },
  { icon: Instagram, href: "https://www.instagram.com/cm_guptaji/", label: "Instagram" },
  { icon: Twitter, href: "https://x.com/gupta_arpit24", label: "X" },
  { icon: Linkedin, href: "https://www.linkedin.com/in/the-arpit/", label: "LinkedIn" },
];

export const FooterNew = () => {
  return (
    <footer className="relative border-t border-border bg-card">
      <div className="section-container py-16">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
          {/* Logo & tagline */}
          <div className="text-center md:text-left">
            <Logo size="lg" />
            <p className="text-muted-foreground mt-3 max-w-xs">
              Organising civic complaints at scale for Indian municipalities.
            </p>
          </div>

          {/* Social links */}
          <div className="flex items-center gap-3">
            {socialLinks.map((social) => (
              <a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className="w-12 h-12 rounded-full border border-border bg-secondary/50 flex items-center justify-center text-muted-foreground hover:text-accent hover:border-accent/50 transition-all hover:scale-110"
                aria-label={social.label}
              >
                <social.icon className="w-5 h-5" />
              </a>
            ))}
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 pt-8 border-t border-border flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} INTAKE.ai — Built with purpose.
          </p>
          <div className="flex items-center gap-6">
            <a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              Privacy
            </a>
            <a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              Terms
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};
