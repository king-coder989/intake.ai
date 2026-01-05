import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Landing from "./pages/Landing";
import Intake from "./pages/Intake";
import AdminLayout from "./layouts/AdminLayout";
import ComplaintQueue from "./pages/admin/ComplaintQueue";
import ComplaintDetail from "./pages/admin/ComplaintDetail";
import Heatmap from "./pages/admin/Heatmap";
import Settings from "./pages/admin/Settings";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/intake" element={<Intake />} />
          <Route path="/admin" element={<AdminLayout />}>
            <Route index element={<ComplaintQueue />} />
            <Route path="complaint/:id" element={<ComplaintDetail />} />
            <Route path="heatmap" element={<Heatmap />} />
            <Route path="settings" element={<Settings />} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
