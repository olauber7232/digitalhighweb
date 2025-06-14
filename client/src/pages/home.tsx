import Navigation from "@/components/navigation";
import HeroSection from "@/components/hero-section";
import UrgencySection from "@/components/urgency-section";
import ServicesSection from "@/components/services-section";
import DemoBuilder from "@/components/demo-builder";
import LiveDemosSection from "@/components/live-demos-section";
import HowItWorksSection from "@/components/how-it-works-section";
import ComparisonSection from "@/components/comparison-section";
import FAQSection from "@/components/faq-section";
import TrustedBySection from "@/components/trusted-by-section";
import Footer from "@/components/footer";
import ChatWidget from "@/components/chat-widget";
import DiscoveryCallPopup from "@/components/discovery-call-popup";

export default function Home() {
  return (
    <div className="min-h-screen">
      <Navigation />
      <main>
        <HeroSection />
        <UrgencySection />
        <ServicesSection />
        <DemoBuilder />
        <LiveDemosSection />
        <HowItWorksSection />
        <ComparisonSection />
        <FAQSection />
        <TrustedBySection />
      </main>
      <Footer />
      <ChatWidget />
      <DiscoveryCallPopup />
    </div>
  );
}