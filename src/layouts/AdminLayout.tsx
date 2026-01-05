import { useState } from "react";
import { Outlet, NavLink, useLocation } from "react-router-dom";
import { LayoutList, Map, Settings, Menu, X } from "lucide-react";
import logoImage from "@/assets/logo.png";

const navItems = [
  { to: "/admin", icon: LayoutList, label: "Queue", end: true },
  { to: "/admin/heatmap", icon: Map, label: "Heatmap", end: false },
  { to: "/admin/settings", icon: Settings, label: "Settings", end: false },
];

const AdminLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const location = useLocation();

  return (
    <div className="flex min-h-screen bg-background">
      <aside className={`fixed left-0 top-0 z-40 flex h-screen flex-col border-r border-sidebar-border bg-sidebar transition-all duration-200 ${sidebarOpen ? "w-60" : "w-[72px]"}`}>
        <div className="flex h-16 items-center justify-between px-4">
          <div className="flex items-center gap-3">
            <img src={logoImage} alt="intake.ai" className={`transition-all duration-200 ${sidebarOpen ? "h-7" : "h-6"}`} />
          </div>
          <button onClick={() => setSidebarOpen(!sidebarOpen)} className="rounded-md p-1.5 text-sidebar-foreground/70 hover:bg-sidebar-accent">
            {sidebarOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
        <nav className="flex-1 px-3 py-4">
          <ul className="space-y-1">
            {navItems.map((item) => {
              const isActive = item.end ? location.pathname === item.to : location.pathname.startsWith(item.to);
              return (
                <li key={item.to}>
                  <NavLink to={item.to} end={item.end} className={`flex items-center gap-3 rounded-md px-3 py-2.5 text-sm font-medium transition-colors ${isActive ? "bg-sidebar-accent text-sidebar-primary" : "text-sidebar-foreground/70 hover:bg-sidebar-accent"}`}>
                    <item.icon className="h-5 w-5 shrink-0" strokeWidth={1.5} />
                    {sidebarOpen && <span>{item.label}</span>}
                  </NavLink>
                </li>
              );
            })}
          </ul>
        </nav>
      </aside>
      <main className={`flex-1 transition-all duration-200 ${sidebarOpen ? "ml-60" : "ml-[72px]"}`}>
        <div className="min-h-screen p-8"><Outlet /></div>
      </main>
    </div>
  );
};

export default AdminLayout;
