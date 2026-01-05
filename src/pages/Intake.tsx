import { useState } from "react";
import { Image, FileText, Video, Mic, MapPin, ChevronDown, Check } from "lucide-react";
import { Logo } from "@/components/ui/Logo";
import { Link } from "react-router-dom";

const languages = [{ code: "en", label: "English" }, { code: "hi", label: "हिंदी" }];

const Intake = () => {
  const [complaint, setComplaint] = useState("");
  const [language, setLanguage] = useState("en");
  const [isLanguageOpen, setIsLanguageOpen] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [complaintId, setComplaintId] = useState("");
  const [submittedAt, setSubmittedAt] = useState<Date | null>(null);

  const handleSubmit = () => {
    if (!complaint.trim()) return;
    setComplaintId(`INT-${Date.now().toString(36).toUpperCase()}-${Math.random().toString(36).substring(2, 6).toUpperCase()}`);
    setSubmittedAt(new Date());
    setIsSubmitted(true);
  };

  const attachments = [{ icon: Image, label: "Image" }, { icon: FileText, label: "Document" }, { icon: Video, label: "Video" }, { icon: Mic, label: "Voice" }, { icon: MapPin, label: "Location" }];

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <header className="border-b border-border/50">
        <div className="mx-auto flex h-14 max-w-6xl items-center justify-between px-6">
          <Logo size="md" />
          <div className="relative">
            <button onClick={() => setIsLanguageOpen(!isLanguageOpen)} className="flex items-center gap-2 rounded-md px-3 py-1.5 text-sm text-muted-foreground hover:bg-secondary">
              {languages.find((l) => l.code === language)?.label}
              <ChevronDown className="h-4 w-4" />
            </button>
            {isLanguageOpen && (
              <div className="absolute right-0 top-full mt-1 rounded-md border border-border bg-card py-1 shadow-lg">
                {languages.map((lang) => (
                  <button key={lang.code} onClick={() => { setLanguage(lang.code); setIsLanguageOpen(false); }} className="block w-full px-4 py-2 text-left text-sm hover:bg-secondary">{lang.label}</button>
                ))}
              </div>
            )}
          </div>
        </div>
      </header>
      <main className="flex flex-1 items-center justify-center px-6 py-16">
        <div className="w-full max-w-2xl">
          {!isSubmitted ? (
            <div className="animate-fade-in">
              <div className="card-base mb-4 p-0">
                <textarea value={complaint} onChange={(e) => setComplaint(e.target.value)} placeholder="Describe your civic issue..." className="min-h-[160px] w-full resize-none rounded-t-lg border-none bg-transparent p-6 text-lg text-foreground placeholder:text-muted-foreground focus:outline-none" />
                <div className="flex items-center justify-between border-t border-border px-4 py-3">
                  <div className="flex items-center gap-1">
                    {attachments.map((btn) => (<button key={btn.label} className="rounded-md p-2 text-muted-foreground hover:bg-secondary" title={btn.label}><btn.icon className="h-5 w-5" strokeWidth={1.5} /></button>))}
                  </div>
                  <button onClick={handleSubmit} disabled={!complaint.trim()} className="btn-primary disabled:opacity-50">Submit</button>
                </div>
              </div>
              <p className="text-center text-sm text-muted-foreground">Your complaint will be processed securely.</p>
            </div>
          ) : (
            <div className="card-base text-center animate-fade-in">
              <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-accent/10"><Check className="h-8 w-8 text-accent" /></div>
              <h2 className="mb-2 text-foreground">Complaint Submitted</h2>
              <p className="mb-8 text-muted-foreground">Your complaint has been received.</p>
              <div className="mb-8 rounded-lg bg-secondary p-6">
                <p className="mb-1 text-sm text-muted-foreground">Complaint ID</p>
                <p className="font-mono text-lg font-semibold text-foreground">{complaintId}</p>
                <p className="mt-4 mb-1 text-sm text-muted-foreground">Submitted</p>
                <p className="text-foreground">{submittedAt?.toLocaleString()}</p>
              </div>
              <Link to="/" className="btn-secondary">Return Home</Link>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default Intake;
