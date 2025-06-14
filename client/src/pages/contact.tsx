import Navigation from "@/components/navigation";
import ContactSection from "@/components/contact-section";
import Footer from "@/components/footer";
import ChatWidget from "@/components/chat-widget";

export default function Contact() {
  return (
    <div className="min-h-screen">
      <Navigation />
      <main className="pt-20">
        <ContactSection />
      </main>
      <Footer />
      <ChatWidget />
    </div>
  );
}