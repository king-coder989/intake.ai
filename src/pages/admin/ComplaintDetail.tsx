import { useParams, Link } from "react-router-dom";
import { ArrowLeft, Image, FileText, MapPin, ChevronDown, Shield } from "lucide-react";
import { useState } from "react";
import { mockComplaints, type Complaint } from "@/data/mockComplaints";

const statuses = ["pending", "in-progress", "resolved"] as const;
const statusLabels: Record<string, string> = { pending: "Pending", "in-progress": "In Progress", resolved: "Resolved" };

const ComplaintDetail = () => {
  const { id } = useParams<{ id: string }>();
  const complaint = mockComplaints.find((c) => c.id === id);
  const [status, setStatus] = useState<Complaint["status"]>(complaint?.status || "pending");
  const [isStatusOpen, setIsStatusOpen] = useState(false);

  if (!complaint) return <div className="text-center py-16"><h2 className="text-xl font-medium text-foreground mb-2">Complaint not found</h2><Link to="/admin" className="btn-secondary">Back to Queue</Link></div>;

  return (
    <div>
      <Link to="/admin" className="mb-6 inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground"><ArrowLeft className="h-4 w-4" />Back to Queue</Link>
      <div className="grid gap-8 lg:grid-cols-3">
        <div className="lg:col-span-2 space-y-6">
          <div className="card-base">
            <div className="mb-4 flex flex-wrap items-center gap-3">
              <span className={complaint.urgency === "high" ? "badge-high" : complaint.urgency === "medium" ? "badge-medium" : "badge-low"}>{complaint.urgency.charAt(0).toUpperCase() + complaint.urgency.slice(1)} Priority</span>
              <span className="rounded-full bg-secondary px-3 py-1 text-xs font-medium">{complaint.department}</span>
            </div>
            <h1 className="mb-2 text-2xl font-semibold text-foreground">{complaint.title}</h1>
            <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground"><span className="font-mono">{complaint.id}</span><span>{complaint.area}</span></div>
          </div>
          <div className="card-base"><h3 className="mb-4 text-sm font-medium uppercase tracking-wider text-muted-foreground">AI Summary</h3><p className="text-foreground">{complaint.description}</p></div>
          <div className="card-base"><h3 className="mb-4 text-sm font-medium uppercase tracking-wider text-muted-foreground">Original Complaint</h3><blockquote className="border-l-2 border-accent pl-4 italic text-muted-foreground">"{complaint.originalText}"</blockquote></div>
          {(complaint.hasImage || complaint.hasDocument) && <div className="card-base"><h3 className="mb-4 text-sm font-medium uppercase tracking-wider text-muted-foreground">Attachments</h3><div className="flex gap-4">{complaint.hasImage && <div className="flex h-32 w-48 items-center justify-center rounded-lg bg-secondary"><Image className="h-8 w-8 text-muted-foreground" /></div>}{complaint.hasDocument && <div className="flex h-32 w-48 items-center justify-center rounded-lg bg-secondary"><FileText className="h-8 w-8 text-muted-foreground" /></div>}</div></div>}
          {complaint.location && <div className="card-base"><h3 className="mb-4 text-sm font-medium uppercase tracking-wider text-muted-foreground">Location</h3><div className="mb-4 flex items-center gap-2"><MapPin className="h-4 w-4 text-accent" /><span>{complaint.location.address}</span></div><div className="flex h-48 items-center justify-center rounded-lg bg-secondary text-sm text-muted-foreground">Map Placeholder</div></div>}
        </div>
        <div className="space-y-6">
          <div className="card-base">
            <h3 className="mb-4 text-sm font-medium uppercase tracking-wider text-muted-foreground">Status</h3>
            <div className="relative">
              <button onClick={() => setIsStatusOpen(!isStatusOpen)} className="flex w-full items-center justify-between rounded-md border border-border px-4 py-3 text-sm hover:bg-secondary">{statusLabels[status]}<ChevronDown className="h-4 w-4" /></button>
              {isStatusOpen && <div className="absolute left-0 top-full z-10 mt-1 w-full rounded-md border border-border bg-card py-1 shadow-lg">{statuses.map((s) => <button key={s} onClick={() => { setStatus(s); setIsStatusOpen(false); }} className={`block w-full px-4 py-2 text-left text-sm hover:bg-secondary ${s === status ? "text-accent" : ""}`}>{statusLabels[s]}</button>)}</div>}
            </div>
          </div>
          <div className="card-base"><h3 className="mb-4 text-sm font-medium uppercase tracking-wider text-muted-foreground">Actions</h3><button className="flex w-full items-center justify-center gap-2 rounded-md border border-border px-4 py-3 text-sm hover:bg-secondary"><Shield className="h-4 w-4" />Write Hash</button><p className="mt-2 text-xs text-muted-foreground">Create an immutable audit record</p></div>
        </div>
      </div>
    </div>
  );
};

export default ComplaintDetail;
