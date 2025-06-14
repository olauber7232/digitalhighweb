import Navigation from "@/components/navigation";
import Footer from "@/components/footer";
import ChatWidget from "@/components/chat-widget";
import CostEstimator from "@/components/cost-estimator";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Check, Star, Zap } from "lucide-react";
import { motion } from "framer-motion";
import { Link } from "wouter";

export default function Pricing() {
  const plans = [
    {
      name: "Starter",
      price: 299,
      description: "Perfect for small businesses and personal websites",
      features: [
        "Up to 5 pages",
        "Mobile responsive design",
        "Basic SEO setup",
        "Contact form",
        "Free 1-year hosting",
        "Free domain registration",
        "SSL certificate",
        "30 days support"
      ],
      popular: false,
      cta: "Get Started"
    },
    {
      name: "Business",
      price: 599,
      description: "Ideal for growing businesses with advanced features",
      features: [
        "Up to 10 pages",
        "AI Chat Assistant",
        "Admin panel & CMS",
        "Advanced SEO",
        "Google Analytics",
        "Social media integration",
        "Blog functionality",
        "Free 1-year hosting",
        "Free domain registration",
        "90 days support"
      ],
      popular: true,
      cta: "Most Popular"
    },
    {
      name: "Premium",
      price: 999,
      description: "Complete solution for established businesses",
      features: [
        "Unlimited pages",
        "E-commerce functionality",
        "Payment gateway integration",
        "Inventory management",
        "Customer accounts",
        "Advanced analytics",
        "Email marketing integration",
        "Priority support",
        "Free 1-year hosting",
        "Free domain registration",
        "6 months support"
      ],
      popular: false,
      cta: "Go Premium"
    }
  ];

  const addOns = [
    {
      name: "AI Chat Assistant",
      price: 200,
      description: "24/7 automated customer support with lead generation"
    },
    {
      name: "Advanced SEO Package",
      price: 150,
      description: "Comprehensive SEO optimization for better search rankings"
    },
    {
      name: "E-commerce Integration",
      price: 300,
      description: "Full online store with payment processing"
    },
    {
      name: "Booking System",
      price: 250,
      description: "Online appointment and reservation system"
    },
    {
      name: "Monthly Maintenance",
      price: 25,
      description: "Ongoing updates, security monitoring, and support",
      recurring: true
    }
  ];

  return (
    <div className="min-h-screen">
      <Navigation />
      <main className="pt-20">
        {/* Hero Section */}
        <section className="py-20 bg-background">
          <div className="container mx-auto px-6">
            <motion.div 
              className="text-center mb-16"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h1 className="text-4xl lg:text-6xl font-bold mb-6">
                Transparent <span className="gradient-text">Pricing</span>
              </h1>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                No hidden fees, no surprises. Choose the perfect plan for your business and get started today.
              </p>
            </motion.div>

            {/* Pricing Cards */}
            <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto mb-20">
              {plans.map((plan, index) => (
                <motion.div
                  key={plan.name}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="relative"
                >
                  {plan.popular && (
                    <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                      <Badge className="bg-accent text-accent-foreground px-4 py-1">
                        <Star className="w-3 h-3 mr-1" />
                        Most Popular
                      </Badge>
                    </div>
                  )}
                  <Card className={`h-full ${plan.popular ? 'border-accent shadow-lg scale-105' : 'border-border'} transition-all duration-300 hover:shadow-lg`}>
                    <CardHeader className="text-center pb-6">
                      <CardTitle className="text-2xl">{plan.name}</CardTitle>
                      <div className="text-4xl font-bold text-accent mb-2">
                        ${plan.price}
                      </div>
                      <p className="text-muted-foreground text-sm">{plan.description}</p>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-3 mb-8">
                        {plan.features.map((feature, featureIndex) => (
                          <li key={featureIndex} className="flex items-center text-sm">
                            <Check className="w-4 h-4 text-green-500 mr-3 flex-shrink-0" />
                            {feature}
                          </li>
                        ))}
                      </ul>
                      <Link href="/proposal">
                        <Button 
                          className={`w-full ${plan.popular ? 'bg-accent hover:bg-accent/80' : ''}`}
                          variant={plan.popular ? "default" : "outline"}
                        >
                          {plan.cta}
                        </Button>
                      </Link>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>

            {/* Add-ons Section */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="max-w-4xl mx-auto"
            >
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold mb-4">Optional Add-ons</h2>
                <p className="text-muted-foreground">
                  Enhance your website with these powerful features
                </p>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                {addOns.map((addon, index) => (
                  <motion.div
                    key={addon.name}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.5 + index * 0.1 }}
                  >
                    <Card className="border-border hover:border-accent/50 transition-all duration-300">
                      <CardContent className="p-6">
                        <div className="flex items-center justify-between mb-3">
                          <h3 className="font-semibold">{addon.name}</h3>
                          <div className="text-right">
                            <div className="text-lg font-bold text-accent">
                              ${addon.price}
                              {addon.recurring && <span className="text-sm text-muted-foreground">/mo</span>}
                            </div>
                          </div>
                        </div>
                        <p className="text-muted-foreground text-sm">{addon.description}</p>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </section>

        {/* Cost Estimator */}
        <CostEstimator />

        {/* FAQ Section */}
        <section className="py-20 bg-muted">
          <div className="container mx-auto px-6">
            <motion.div 
              className="text-center mb-16"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl font-bold mb-6">Pricing FAQ</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Common questions about our pricing and what's included
              </p>
            </motion.div>

            <div className="max-w-3xl mx-auto space-y-6">
              {[
                {
                  question: "Are there any hidden costs?",
                  answer: "No hidden costs! The price you see is what you pay. After the first year, hosting is $10/month and domain renewal is $15/year."
                },
                {
                  question: "What's included in the free hosting?",
                  answer: "Free hosting includes SSL certificate, daily backups, 99.9% uptime guarantee, and basic support for one full year."
                },
                {
                  question: "Can I upgrade my plan later?",
                  answer: "Yes! You can upgrade your plan at any time. We'll apply the price difference and add any new features to your existing website."
                },
                {
                  question: "Do you offer refunds?",
                  answer: "We offer a 30-day money-back guarantee. If you're not satisfied with your website, we'll refund your payment in full."
                },
                {
                  question: "How long does it take to build my website?",
                  answer: "Most websites are completed within 7-10 business days. Complex projects may take 2-3 weeks. We'll provide a detailed timeline during consultation."
                }
              ].map((faq, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <Card>
                    <CardContent className="p-6">
                      <h3 className="font-semibold mb-3">{faq.question}</h3>
                      <p className="text-muted-foreground">{faq.answer}</p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
      <ChatWidget />
    </div>
  );
}