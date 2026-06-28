import { Header } from "./components/Header";
import { HeroSection } from "./components/HeroSection";
import { AboutSection } from "./components/AboutSection";
import { ProjectsSection } from "./components/ProjectsSection";
import { ServicesSection } from "./components/ServicesSection";
import { ReviewsSection } from "./components/ReviewsSection";
import { ContactSection } from "./components/ContactSection";
import { Footer } from "./components/Footer";

export default function Home() {
  return (
    <main className="min-h-screen bg-white text-[#241f1a]">
      <Header />
      <HeroSection />
      <AboutSection />
      <ProjectsSection />
      <ServicesSection />
      <ReviewsSection />
      <ContactSection />
      <Footer />
    </main>
  );
}
