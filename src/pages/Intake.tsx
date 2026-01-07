import { useState } from "react";
import { Image, FileText, Video, Mic, MapPin, ChevronDown, Check } from "lucide-react";
import { Logo } from "@/components/ui/Logo";
import { Link } from "react-router-dom";
import { db } from "@/firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { analyzeComplaint } from "@/lib/gemini";
import { recordAuditOnChain } from "@/lib/ethers";
import { LocationPicker } from "@/components/LocationPicker";

const languages = [{ code: "en", label: "English" }, { code: "hi", label: "हिंदी" }];

const Intake = () => {
  const [complaint, setComplaint] = useState("");
  const [language, setLanguage] = useState("en");
  const [isLanguageOpen, setIsLanguageOpen] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [complaintId, setComplaintId] = useState("");
  const [submittedAt, setSubmittedAt] = useState<Date | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showLocationPicker, setShowLocationPicker] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState<{ lat: number; lng: number } | null>(null);

  const handleSubmit = async () => {
    if (!complaint.trim() || isSubmitting) return;
    setIsSubmitting(true);
    
    try {
      // Analyze complaint with Gemini AI
      let analysis: { category: string; urgency: string; summary: string } = { category: "Other", urgency: "medium", summary: "" };
      try {
        analysis = await analyzeComplaint(complaint.trim());
      } catch (aiError) {
        console.error("AI analysis failed, using defaults:", aiError);
      }

      const docRef = await addDoc(collection(db, "complaints"), {
        text: complaint.trim(),
        status: "received",
        language,
        category: analysis.category,
        urgency: analysis.urgency,
        summary: analysis.summary,
        location: selectedLocation ? { lat: selectedLocation.lat, lng: selectedLocation.lng } : null,
        createdAt: serverTimestamp()
      });
      
      // Record audit on blockchain (non-blocking, graceful failure)
      recordAuditOnChain(docRef.id, complaint.trim(), "Complaint intake logged").catch(() => {});
      
      setComplaintId(docRef.id);
      setSubmittedAt(new Date());
      setIsSubmitted(true);
    } catch (error) {
      console.error("Error submitting complaint:", error);
      alert("Failed to submit complaint. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const attachments = [
    { icon: Image, label: "Image", onClick: () => {} },
    { icon: FileText, label: "Document", onClick: () => {} },
    { icon: Video, label: "Video", onClick: () => {} },
    { icon: Mic, label: "Voice", onClick: () => {} },
    { icon: MapPin, label: "Location", onClick: () => setShowLocationPicker(true) },
  ];

  const handleLocationSelect = (location: { lat: number; lng: number }) => {
    setSelectedLocation(location);
  };

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <header className="border-b border-border/50">
         <div className="mx-auto flex h-14 max-w-6xl items-center justify-between px-6">
            <div className="flex items-center [&_img]:max-h-14 [&_img]:w-auto [&_img]:object-contain">
              <Logo size="md" />
            </div>
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
                {selectedLocation && (
                  <div className="mb-2 flex items-center gap-2 rounded-md bg-accent/10 px-3 py-2 text-sm text-accent">
                    <MapPin className="h-4 w-4" />
                    <span>Location: {selectedLocation.lat.toFixed(4)}, {selectedLocation.lng.toFixed(4)}</span>
                    <button onClick={() => setSelectedLocation(null)} className="ml-auto text-accent hover:text-accent/80">×</button>
                  </div>
                )}
                <div className="flex items-center justify-between border-t border-border px-4 py-3">
                  <div className="flex items-center gap-1">
                    {attachments.map((btn) => (
                      <button 
                        key={btn.label} 
                        onClick={btn.onClick}
                        className={`rounded-md p-2 hover:bg-secondary ${btn.label === "Location" && selectedLocation ? "text-accent" : "text-muted-foreground"}`} 
                        title={btn.label}
                      >
                        <btn.icon className="h-5 w-5" strokeWidth={1.5} />
                      </button>
                    ))}
                  </div>
                  <button onClick={handleSubmit} disabled={!complaint.trim() || isSubmitting} className="btn-primary disabled:opacity-50">{isSubmitting ? "Submitting..." : "Submit"}</button>
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
      {showLocationPicker && (
        <LocationPicker
          onLocationSelect={handleLocationSelect}
          onClose={() => setShowLocationPicker(false)}
        />
      )}
    </div>
  );
};

export default Intake;
