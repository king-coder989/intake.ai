import { useState, lazy, Suspense } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { mockComplaints } from "@/data/mockComplaints";

// Lazy load 3D component for performance
const Heatmap3D = lazy(() => import("@/components/admin/Heatmap3D"));

const Heatmap = () => {
  const [show3D, setShow3D] = useState(false);

  // Calculate stats from mock data
  const complaintsWithLocation = mockComplaints.filter((c) => c.location);
  const hotspotAreas = new Set(complaintsWithLocation.map((c) => c.area)).size;
  const highDensityZone = mockComplaints
    .reduce((acc, c) => {
      acc[c.area] = (acc[c.area] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);
  const topZone = Object.entries(highDensityZone).sort((a, b) => b[1] - a[1])[0]?.[0] || "N/A";
  const coverage = Math.round((complaintsWithLocation.length / mockComplaints.length) * 100);

  return (
    <div>
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="mb-2 text-3xl font-semibold text-foreground">Complaint Heatmap</h1>
          <p className="text-muted-foreground">Geographic distribution of complaints</p>
        </div>
        <button
          onClick={() => setShow3D(!show3D)}
          className="px-4 py-2 text-sm font-medium rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 transition-colors"
        >
          {show3D ? "Hide 3D View" : "Show 3D View"}
        </button>
      </div>

      {/* 2D Placeholder (existing) */}
      {!show3D && (
        <div className="card-base">
          <div className="flex h-[500px] items-center justify-center rounded-lg bg-secondary">
            <div className="text-center">
              <p className="text-muted-foreground">Interactive heatmap visualization</p>
              <p className="text-sm text-muted-foreground/70">Click "Show 3D View" for advanced analysis</p>
            </div>
          </div>
        </div>
      )}

      {/* 3D Visualization (dynamic load) */}
      {show3D && (
        <Suspense
          fallback={
            <div className="card-base">
              <Skeleton className="h-[500px] w-full rounded-lg" />
            </div>
          }
        >
          <Heatmap3D className="card-base" />
        </Suspense>
      )}

      <div className="mt-8 grid gap-6 md:grid-cols-3">
        <div className="card-base">
          <p className="text-sm text-muted-foreground">Hotspot Areas</p>
          <p className="text-3xl font-semibold text-foreground">{hotspotAreas}</p>
        </div>
        <div className="card-base">
          <p className="text-sm text-muted-foreground">High Density Zone</p>
          <p className="text-3xl font-semibold text-foreground">{topZone}</p>
        </div>
        <div className="card-base">
          <p className="text-sm text-muted-foreground">Location Coverage</p>
          <p className="text-3xl font-semibold text-foreground">{coverage}%</p>
        </div>
      </div>
    </div>
  );
};

export default Heatmap;
