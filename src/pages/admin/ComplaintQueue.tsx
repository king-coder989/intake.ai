import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { ChevronDown, Image, FileText, ArrowRight, Loader2 } from "lucide-react";
import { mockComplaints, departments, areas, type Complaint } from "@/data/mockComplaints";
import { db } from "@/firebase";
import { collection, query, orderBy, onSnapshot, Timestamp } from "firebase/firestore";

const UrgencyBadge = ({ urgency }: { urgency: Complaint["urgency"] }) => <span className={urgency === "high" ? "badge-high" : urgency === "medium" ? "badge-medium" : "badge-low"}>{urgency.charAt(0).toUpperCase() + urgency.slice(1)}</span>;
const StatusBadge = ({ status }: { status: Complaint["status"] }) => <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${status === "pending" ? "bg-muted text-muted-foreground" : status === "in-progress" ? "bg-accent/10 text-accent" : "bg-urgency-low/10 text-urgency-low"}`}>{status === "in-progress" ? "In Progress" : status.charAt(0).toUpperCase() + status.slice(1)}</span>;

interface FirestoreComplaint {
  id: string;
  text: string;
  status: string;
  language?: string;
  category?: string;
  urgency?: string;
  createdAt: Timestamp | null;
}

const CategoryBadge = ({ category }: { category?: string }) => (
  <span className="inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium bg-primary/10 text-primary">
    {category || "Unclassified"}
  </span>
);

const FirestoreUrgencyBadge = ({ urgency }: { urgency?: string }) => {
  const level = urgency?.toLowerCase() || "normal";
  const styles: Record<string, string> = {
    high: "bg-destructive/10 text-destructive",
    medium: "bg-yellow-500/10 text-yellow-600 dark:text-yellow-400",
    low: "bg-muted text-muted-foreground",
    normal: "bg-muted text-muted-foreground",
  };
  const displayText = urgency ? urgency.charAt(0).toUpperCase() + urgency.slice(1).toLowerCase() : "Normal";
  return <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${styles[level] || styles.normal}`}>{displayText}</span>;
};

const ComplaintQueue = () => {
  const [dept, setDept] = useState("All Departments");
  const [area, setArea] = useState("All Areas");
  const [deptOpen, setDeptOpen] = useState(false);
  const [areaOpen, setAreaOpen] = useState(false);
  const [firestoreComplaints, setFirestoreComplaints] = useState<FirestoreComplaint[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const q = query(collection(db, "complaints"), orderBy("createdAt", "desc"));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const complaints = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data()
      })) as FirestoreComplaint[];
      setFirestoreComplaints(complaints);
      setLoading(false);
      console.log("Firestore complaints:", complaints);
    }, (error) => {
      console.error("Error fetching complaints:", error);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const filtered = mockComplaints.filter((c) => (dept === "All Departments" || c.department === dept) && (area === "All Areas" || c.area === area));
  const sorted = [...filtered].sort((a, b) => ({ high: 0, medium: 1, low: 2 }[a.urgency] - { high: 0, medium: 1, low: 2 }[b.urgency]));

  return (
    <div>
      <div className="mb-8">
        <h1 className="mb-2 text-3xl font-semibold text-foreground">Complaint Queue</h1>
        <p className="text-muted-foreground">{sorted.length} complaints pending review</p>
      </div>
      <div className="mb-6 flex flex-wrap gap-4">
        <div className="relative">
          <button onClick={() => { setDeptOpen(!deptOpen); setAreaOpen(false); }} className="flex items-center gap-2 rounded-md border border-border bg-card px-4 py-2 text-sm hover:bg-secondary">{dept}<ChevronDown className="h-4 w-4" /></button>
          {deptOpen && <div className="absolute left-0 top-full z-10 mt-1 w-48 rounded-md border border-border bg-card py-1 shadow-lg">{departments.map((d) => <button key={d} onClick={() => { setDept(d); setDeptOpen(false); }} className="block w-full px-4 py-2 text-left text-sm hover:bg-secondary">{d}</button>)}</div>}
        </div>
        <div className="relative">
          <button onClick={() => { setAreaOpen(!areaOpen); setDeptOpen(false); }} className="flex items-center gap-2 rounded-md border border-border bg-card px-4 py-2 text-sm hover:bg-secondary">{area}<ChevronDown className="h-4 w-4" /></button>
          {areaOpen && <div className="absolute left-0 top-full z-10 mt-1 w-48 rounded-md border border-border bg-card py-1 shadow-lg">{areas.map((a) => <button key={a} onClick={() => { setArea(a); setAreaOpen(false); }} className="block w-full px-4 py-2 text-left text-sm hover:bg-secondary">{a}</button>)}</div>}
        </div>
      </div>
      {/* Firestore Complaints Section */}
      {loading ? (
        <div className="flex items-center justify-center py-12">
          <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
        </div>
      ) : firestoreComplaints.length > 0 && (
        <div className="mb-8">
          <h2 className="mb-4 text-lg font-medium text-foreground">Live Complaints ({firestoreComplaints.length})</h2>
          <div className="space-y-3">
            {firestoreComplaints.map((c) => (
              <div key={c.id} className="group block rounded-lg border border-border bg-card p-5">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1 min-w-0">
                    <div className="mb-2 flex flex-wrap items-center gap-2">
                      <CategoryBadge category={c.category} />
                      <FirestoreUrgencyBadge urgency={c.urgency} />
                      <span className="inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium bg-accent/10 text-accent">{c.status}</span>
                      {c.language && <span className="text-xs text-muted-foreground uppercase">{c.language}</span>}
                    </div>
                    <p className="mb-3 text-sm text-foreground">{c.text}</p>
                    <div className="flex items-center gap-4 text-xs text-muted-foreground">
                      <span className="font-mono">{c.id.slice(0, 8)}...</span>
                      {c.createdAt && <span>{c.createdAt.toDate().toLocaleString()}</span>}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Mock Complaints Section */}
      <h2 className="mb-4 text-lg font-medium text-foreground">Sample Queue</h2>
      <div className="space-y-3">
        {sorted.map((c) => (
          <Link key={c.id} to={`/admin/complaint/${c.id}`} className="group block rounded-lg border border-border bg-card p-5 transition-all hover:border-accent/30">
            <div className="flex items-start justify-between gap-4">
              <div className="flex-1 min-w-0">
                <div className="mb-2 flex flex-wrap items-center gap-2"><UrgencyBadge urgency={c.urgency} /><StatusBadge status={c.status} /><span className="text-xs text-muted-foreground">{c.department}</span></div>
                <h3 className="mb-1 text-base font-medium text-foreground group-hover:text-accent">{c.title}</h3>
                <p className="mb-3 text-sm text-muted-foreground line-clamp-2">{c.description}</p>
                <div className="flex items-center gap-4 text-xs text-muted-foreground">
                  <span className="font-mono">{c.id}</span><span>{c.area}</span>
                  {(c.hasImage || c.hasDocument) && <div className="flex gap-2">{c.hasImage && <Image className="h-3.5 w-3.5" />}{c.hasDocument && <FileText className="h-3.5 w-3.5" />}</div>}
                </div>
              </div>
              <ArrowRight className="h-5 w-5 text-muted-foreground/50 group-hover:text-accent" />
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default ComplaintQueue;
