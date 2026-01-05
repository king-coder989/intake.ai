import { Logo } from "@/components/ui/Logo";
import { Github, Instagram, Twitter, Linkedin } from "lucide-react";

const socialLinks = [
  { href: "https://github.com/guptajiengineer", icon: Github, label: "GitHub" },
  { href: "https://www.instagram.com/cm_guptaji/", icon: Instagram, label: "Instagram" },
  { href: "https://x.com/gupta_arpit24", icon: Twitter, label: "X (Twitter)" },
  { href: "https://www.linkedin.com/in/the-arpit/", icon: Linkedin, label: "LinkedIn" },
];

export const FooterNew = () => {
  return (
    <footer className="relative border-t border-border/30 bg-card/30">
      <div className="section-container-sm py-16">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
          {/* Brand */}
          <div className="flex flex-col items-center md:items-start gap-3">
            <Logo size="md" />
            <p className="text-muted-foreground text-sm max-w-xs text-center md:text-left">
              Organising civic complaints at scale.
            </p>
          </div>

          {/* Social links */}
          <div className="flex items-center gap-4">
            {socialLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-lg border border-border/50 bg-secondary/30 flex items-center justify-center text-muted-foreground transition-all duration-200 hover:border-accent/50 hover:text-accent hover:bg-accent/10"
                aria-label={link.label}
              >
                <link.icon className="w-5 h-5" />
              </a>
            ))}
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 pt-8 border-t border-border/30 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-muted-foreground">
            © {new Date().getFullYear()} INTAKE.ai. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <a href="#" className="text-xs text-muted-foreground hover:text-foreground transition-colors">
              Privacy
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};
