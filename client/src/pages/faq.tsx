import { useState } from "react";
import Navigation from "@/components/navigation";
import Footer from "@/components/footer";
import ChatWidget from "@/components/chat-widget";
import { Card, CardContent } from "@/components/ui/card";
import { ChevronDown, ChevronUp, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { motion, AnimatePresence } from "framer-motion";

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const [searchTerm, setSearchTerm] = useState("");

  const faqs = [
    {
      category: "General",
      question: "How long does it take to build a website?",
      answer: "Our standard delivery time is 7 days for most websites. Complex e-commerce or custom functionality may take 10-14 days. We provide a detailed timeline during your free consultation."
    },
    {
      category: "Pricing",
      question: "Do I really get free hosting and domain for 1 year?",
      answer: "Yes! Every website package includes free hosting and domain registration for the first year. After that, hosting is just $10/month and domain renewal is $15/year."
    },
    {
      category: "Technical",
      question: "Can I update the website content myself?",
      answer: "Absolutely! Every website comes with an easy-to-use admin panel where you can update text, images, and content without any technical knowledge. We also provide training videos."
    },
    {
      category: "General",
      question: "What if I don't like the design?",
      answer: "We offer unlimited revisions during the design phase. We work closely with you to ensure the final design perfectly matches your vision and brand requirements."
    },
    {
      category: "Technical",
      question: "Will my website work on mobile devices?",
      answer: "Yes, all our websites are fully responsive and optimized for mobile devices. We test on various screen sizes to ensure perfect functionality across all devices."
    },
    {
      category: "Pricing",
      question: "Are there any hidden costs?",
      answer: "No hidden costs! We provide transparent pricing upfront. The only ongoing costs after the first year are hosting ($10/month) and domain renewal ($15/year)."
    },
    {
      category: "Technical",
      question: "Do you provide SEO optimization?",
      answer: "Yes, every website includes basic SEO optimization including meta tags, proper URL structure, sitemap generation, and Google Analytics integration."
    },
    {
      category: "Support",
      question: "What kind of support do you provide after launch?",
      answer: "We provide 30 days of free support after launch, plus ongoing support plans starting at $25/month for updates, security monitoring, and technical assistance."
    },
    {
      category: "General",
      question: "Can you integrate with my existing business tools?",
      answer: "Yes, we can integrate with CRM systems, payment gateways, email marketing tools, social media platforms, and most popular business applications."
    },
    {
      category: "Technical",
      question: "Will I own the website and code?",
      answer: "Yes, you will have full ownership of your website, domain, and all source code. We provide complete access and documentation."
    }
  ];

  const filteredFAQs = faqs.filter(faq => 
    faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
    faq.answer.toLowerCase().includes(searchTerm.toLowerCase()) ||
    faq.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="min-h-screen">
      <Navigation />
      <main className="pt-20">
        <section className="py-20 bg-background">
          <div className="container mx-auto px-6">
            <motion.div 
              className="text-center mb-16"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h1 className="text-4xl lg:text-6xl font-bold mb-6">Frequently Asked Questions</h1>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                Find answers to common questions about our web development services, pricing, and process.
              </p>
            </motion.div>

            {/* Search */}
            <motion.div 
              className="max-w-2xl mx-auto mb-12"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
                <Input
                  type="text"
                  placeholder="Search FAQs..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 bg-muted border-border focus:border-accent"
                />
              </div>
            </motion.div>

            {/* FAQs */}
            <div className="max-w-4xl mx-auto">
              <div className="space-y-4">
                {filteredFAQs.map((faq, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.05 }}
                  >
                    <Card className="bg-muted border-border hover:border-accent/50 transition-all duration-300">
                      <CardContent className="p-0">
                        <button
                          onClick={() => toggleFAQ(index)}
                          className="w-full p-6 text-left flex items-center justify-between hover:bg-accent/5 transition-colors"
                        >
                          <div className="flex-1 pr-4">
                            <div className="text-xs text-accent font-medium mb-1">{faq.category}</div>
                            <h3 className="text-lg font-semibold">{faq.question}</h3>
                          </div>
                          {openIndex === index ? (
                            <ChevronUp className="w-5 h-5 text-accent flex-shrink-0" />
                          ) : (
                            <ChevronDown className="w-5 h-5 text-muted-foreground flex-shrink-0" />
                          )}
                        </button>
                        
                        <AnimatePresence>
                          {openIndex === index && (
                            <motion.div
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: "auto", opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              transition={{ duration: 0.3 }}
                              className="overflow-hidden"
                            >
                              <div className="px-6 pb-6 pt-0">
                                <p className="text-muted-foreground leading-relaxed">{faq.answer}</p>
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>

              {filteredFAQs.length === 0 && (
                <motion.div 
                  className="text-center py-12"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.6 }}
                >
                  <p className="text-muted-foreground">No FAQs found matching your search.</p>
                </motion.div>
              )}
            </div>
          </div>
        </section>
      </main>
      <Footer />
      <ChatWidget />
    </div>
  );
}