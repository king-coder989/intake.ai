import { useState } from "react";

const initialModules = [
  { id: "multimodal", name: "Multimodal Input", description: "Accept text, images, audio", enabled: true, category: "Input" },
  { id: "multilingual", name: "Multilingual Support", description: "Process 20+ languages", enabled: true, category: "Input" },
  { id: "auto-categorize", name: "Auto-Categorization", description: "AI department routing", enabled: true, category: "Processing" },
  { id: "sentiment", name: "Sentiment Analysis", description: "Detect urgency", enabled: false, category: "Processing" },
  { id: "encryption", name: "End-to-End Encryption", description: "Encrypt all data", enabled: true, category: "Security" },
];

const Settings = () => {
  const [modules, setModules] = useState(initialModules);
  const toggle = (id: string) => setModules((p) => p.map((m) => (m.id === id ? { ...m, enabled: !m.enabled } : m)));
  const categories = [...new Set(modules.map((m) => m.category))];

  return (
    <div>
      <div className="mb-8"><h1 className="mb-2 text-3xl font-semibold text-foreground">Settings</h1><p className="text-muted-foreground">Configure modules</p></div>
      <div className="space-y-8">
        {categories.map((cat) => (
          <div key={cat}>
            <h2 className="mb-4 text-lg font-medium text-foreground">{cat}</h2>
            <div className="space-y-3">
              {modules.filter((m) => m.category === cat).map((m) => (
                <div key={m.id} className="card-base flex items-center justify-between">
                  <div><h3 className="text-base font-medium text-foreground">{m.name}</h3><p className="text-sm text-muted-foreground">{m.description}</p></div>
                  <button onClick={() => toggle(m.id)} className={`relative inline-flex h-6 w-11 rounded-full transition-colors ${m.enabled ? "bg-accent" : "bg-border"}`}><span className={`inline-block h-5 w-5 transform rounded-full bg-card shadow-sm transition-transform ${m.enabled ? "translate-x-5" : "translate-x-0.5"} mt-0.5`} /></button>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
      <div className="mt-8"><button className="btn-primary">Save Changes</button></div>
    </div>
  );
};

export default Settings;
