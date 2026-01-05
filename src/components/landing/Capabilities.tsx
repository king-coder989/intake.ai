import { useState } from "react";

const modules = [
  { id: "multimodal", name: "Multimodal Input", description: "Accept text, images, audio, and documents", defaultOn: true },
  { id: "multilingual", name: "Multilingual Support", description: "Process complaints in 20+ languages", defaultOn: true },
  { id: "auto-categorize", name: "Auto-Categorization", description: "AI-powered department routing", defaultOn: true },
  { id: "sentiment", name: "Sentiment Analysis", description: "Detect urgency and emotional context", defaultOn: false },
  { id: "dedup", name: "Deduplication", description: "Identify similar complaints", defaultOn: false },
  { id: "blockchain", name: "Audit Trail", description: "Immutable record keeping", defaultOn: false },
];

export const Capabilities = () => {
  const [states, setStates] = useState<Record<string, boolean>>(Object.fromEntries(modules.map((m) => [m.id, m.defaultOn])));

  return (
    <section className="section-container bg-secondary/30">
      <div className="mb-16 text-center">
        <h2 className="mb-4 text-foreground">Modular Capabilities</h2>
        <p className="mx-auto max-w-xl text-muted-foreground">Enable only what you need.</p>
      </div>
      <div className="mx-auto grid max-w-3xl gap-4">
        {modules.map((m) => (
          <div key={m.id} className="card-base flex items-center justify-between">
            <div>
              <h3 className="text-base font-medium text-foreground">{m.name}</h3>
              <p className="text-sm text-muted-foreground">{m.description}</p>
            </div>
            <button onClick={() => setStates((p) => ({ ...p, [m.id]: !p[m.id] }))} className={`relative inline-flex h-6 w-11 rounded-full transition-colors ${states[m.id] ? "bg-accent" : "bg-border"}`}>
              <span className={`inline-block h-5 w-5 transform rounded-full bg-card shadow-sm transition-transform ${states[m.id] ? "translate-x-5" : "translate-x-0.5"} mt-0.5`} />
            </button>
          </div>
        ))}
      </div>
    </section>
  );
};
