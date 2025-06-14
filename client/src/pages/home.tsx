import Navigation from "@/components/navigation";
import HeroSection from "@/components/hero-section";
import UrgencySection from "@/components/urgency-section";
import HowItWorksSection from "@/components/how-it-works-section";
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
        <HowItWorksSection />
        <FAQSection />
        <TrustedBySection />
      </main>
      <Footer />
      <ChatWidget />
      <DiscoveryCallPopup />
    </div>
  );
}
