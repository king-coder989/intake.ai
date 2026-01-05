import { FileText, Cpu, LayoutDashboard } from "lucide-react";

const steps = [
  { icon: FileText, title: "Intake", description: "Citizens submit complaints through a simple, accessible interface." },
  { icon: Cpu, title: "Intelligence", description: "AI processes submissions — categorizing, prioritizing automatically." },
  { icon: LayoutDashboard, title: "Admin", description: "Officials access a unified dashboard with real-time insights." },
];

export const HowItWorks = () => (
  <section className="section-container">
    <div className="mb-16 text-center">
      <h2 className="mb-4 text-foreground">How It Works</h2>
      <p className="mx-auto max-w-xl text-muted-foreground">Three steps from citizen complaint to administrative action.</p>
    </div>
    <div className="grid gap-8 md:grid-cols-3">
      {steps.map((step) => (
        <div key={step.title} className="card-base transition-all duration-200 hover:border-accent/30">
          <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-secondary">
            <step.icon className="h-6 w-6 text-accent" strokeWidth={1.5} />
          </div>
          <h3 className="mb-2 text-foreground">{step.title}</h3>
          <p className="text-sm text-muted-foreground">{step.description}</p>
        </div>
      ))}
    </div>
  </section>
);
