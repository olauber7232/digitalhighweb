import Navigation from "@/components/navigation";
import ServicesSection from "@/components/services-section";
import ComparisonSection from "@/components/comparison-section";
import Footer from "@/components/footer";
import ChatWidget from "@/components/chat-widget";

export default function Services() {
  return (
    <div className="min-h-screen">
      <Navigation />
      <main className="pt-20">
        <ServicesSection />
        <ComparisonSection />
      </main>
      <Footer />
      <ChatWidget />
    </div>
  );
}