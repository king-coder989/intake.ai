const Heatmap = () => (
  <div>
    <div className="mb-8"><h1 className="mb-2 text-3xl font-semibold text-foreground">Complaint Heatmap</h1><p className="text-muted-foreground">Geographic distribution of complaints</p></div>
    <div className="card-base"><div className="flex h-[500px] items-center justify-center rounded-lg bg-secondary"><div className="text-center"><p className="text-muted-foreground">Interactive heatmap visualization</p><p className="text-sm text-muted-foreground/70">Integration pending</p></div></div></div>
    <div className="mt-8 grid gap-6 md:grid-cols-3">
      <div className="card-base"><p className="text-sm text-muted-foreground">Hotspot Areas</p><p className="text-3xl font-semibold text-foreground">12</p></div>
      <div className="card-base"><p className="text-sm text-muted-foreground">High Density Zone</p><p className="text-3xl font-semibold text-foreground">Downtown</p></div>
      <div className="card-base"><p className="text-sm text-muted-foreground">Coverage</p><p className="text-3xl font-semibold text-foreground">87%</p></div>
    </div>
  </div>
);

export default Heatmap;
