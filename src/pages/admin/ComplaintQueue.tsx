import { useState } from "react";
import { Link } from "react-router-dom";
import { ChevronDown, Image, FileText, ArrowRight } from "lucide-react";
import { mockComplaints, departments, areas, type Complaint } from "@/data/mockComplaints";

const UrgencyBadge = ({ urgency }: { urgency: Complaint["urgency"] }) => <span className={urgency === "high" ? "badge-high" : urgency === "medium" ? "badge-medium" : "badge-low"}>{urgency.charAt(0).toUpperCase() + urgency.slice(1)}</span>;
const StatusBadge = ({ status }: { status: Complaint["status"] }) => <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${status === "pending" ? "bg-muted text-muted-foreground" : status === "in-progress" ? "bg-accent/10 text-accent" : "bg-urgency-low/10 text-urgency-low"}`}>{status === "in-progress" ? "In Progress" : status.charAt(0).toUpperCase() + status.slice(1)}</span>;

const ComplaintQueue = () => {
  const [dept, setDept] = useState("All Departments");
  const [area, setArea] = useState("All Areas");
  const [deptOpen, setDeptOpen] = useState(false);
  const [areaOpen, setAreaOpen] = useState(false);

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
