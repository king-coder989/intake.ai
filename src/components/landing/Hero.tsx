import { Link } from "react-router-dom";

export const Hero = () => {
  return (
    <section className="flex min-h-screen items-center justify-center px-6 pt-16">
      <div className="mx-auto max-w-4xl text-center">
        <h1 className="mb-6 text-foreground animate-fade-up">
          Civic Infrastructure
          <br />
          <span className="text-muted-foreground">Built for Intelligence</span>
        </h1>
        
        <p className="mx-auto mb-10 max-w-2xl text-lg text-muted-foreground animate-fade-up" style={{ animationDelay: "0.1s" }}>
          Modern complaint intake, AI-powered routing, and transparent governance. 
          Designed for municipalities ready to serve better.
        </p>
        
        <div className="flex flex-col items-center justify-center gap-4 sm:flex-row animate-fade-up" style={{ animationDelay: "0.2s" }}>
          <Link to="/intake" className="btn-primary">
            Register a Complaint
          </Link>
          <Link to="/admin" className="btn-secondary">
            View Admin Demo
          </Link>
        </div>
      </div>
    </section>
  );
};
