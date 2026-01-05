const steps = [
  { number: "01", title: "Describe Your Issue", description: "Write or speak your complaint." },
  { number: "02", title: "Submit Securely", description: "Encrypted and assigned a unique ID." },
  { number: "03", title: "Track Progress", description: "Receive updates as resolved." },
];

export const QuickManual = () => (
  <section className="section-container">
    <div className="mb-16 text-center">
      <h2 className="mb-4 text-foreground">Quick User Manual</h2>
      <p className="mx-auto max-w-xl text-muted-foreground">Filing takes less than two minutes.</p>
    </div>
    <div className="mx-auto max-w-2xl">
      {steps.map((step, i) => (
        <div key={step.number} className="relative flex gap-6 pb-12 last:pb-0">
          {i < steps.length - 1 && <div className="absolute left-5 top-12 h-full w-px -translate-x-1/2 bg-border" />}
          <div className="relative z-10 flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary text-sm font-medium text-primary-foreground">{step.number}</div>
          <div className="pt-1">
            <h3 className="mb-1 text-foreground">{step.title}</h3>
            <p className="text-sm text-muted-foreground">{step.description}</p>
          </div>
        </div>
      ))}
    </div>
  </section>
);
