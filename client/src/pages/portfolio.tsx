import Navigation from "@/components/navigation";
import PortfolioSection from "@/components/portfolio-section";
import Footer from "@/components/footer";
import ChatWidget from "@/components/chat-widget";

export default function Portfolio() {
  return (
    <div className="min-h-screen">
      <Navigation />
      <main className="pt-20">
        <PortfolioSection />
      </main>
      <Footer />
      <ChatWidget />
    </div>
  );
}