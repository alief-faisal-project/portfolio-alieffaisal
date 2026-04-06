import ParticleBackground from "@/components/ParticleBackground";
import HeroSection from "@/components/HeroSection";
import ProjectCards from "@/components/ProjectCards";

const Index = () => {
  return (
    <div className="relative min-h-screen bg-background">
      <ParticleBackground />
      <HeroSection />
      <ProjectCards />
    </div>
  );
};

export default Index;
