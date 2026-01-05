import { Header } from "@/components/landing/Header";
import { Hero } from "@/components/landing/Hero";
import { HowItWorks } from "@/components/landing/HowItWorks";
import { Capabilities } from "@/components/landing/Capabilities";
import { QuickManual } from "@/components/landing/QuickManual";
import { About } from "@/components/landing/About";
import { Footer } from "@/components/landing/Footer";

const Landing = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <Hero />
        <HowItWorks />
        <Capabilities />
        <QuickManual />
        <About />
      </main>
      <Footer />
    </div>
  );
};

export default Landing;
