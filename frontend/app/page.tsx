import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import TechStack from "@/components/TechStack";
import GitHubActivitySection from "@/components/GitHubActivitySection";
import Projects from "@/components/Projects";
import Hackathons from "@/components/Hackathons";
import Experience from "@/components/Experience";
import QuotesSection from "@/components/QuotesSection";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="min-h-screen bg-bg">
      <Nav />
      <Hero />
      
      <Projects />
      <Experience />
      <TechStack />
      <Hackathons />
      <GitHubActivitySection />
      
      
      <QuotesSection />
      <Footer />
    </main>
  );
}