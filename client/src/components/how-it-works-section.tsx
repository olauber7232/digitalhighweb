import { Card, CardContent } from "@/components/ui/card";
import { motion } from "framer-motion";
import { Search, Palette, Code, Wrench, Check } from "lucide-react";

export default function HowItWorksSection() {
  const steps = [
    {
      number: "01",
      title: "Discovery Stage",
      icon: Search,
      description: "We analyze your business needs and goals",
      details: [
        "Understanding your business requirements and target audience",
        "Researching your industry and competitors",
        "Defining project scope and objectives",
        "Creating a strategic roadmap for your website"
      ]
    },
    {
      number: "02", 
      title: "Design & Prototyping",
      icon: Palette,
      description: "Creating stunning designs that convert",
      details: [
        "Developing wireframes and user experience architecture",
        "Creating business process optimization plans",
        "Designing responsive layouts for all devices", 
        "Building interactive prototypes for testing"
      ]
    },
    {
      number: "03",
      title: "Development Stage", 
      icon: Code,
      description: "Building your powerful website",
      details: [
        "Converting designs into functional websites",
        "Implementing advanced features and integrations",
        "Optimizing for speed and search engines",
        "Rigorous testing across all platforms"
      ]
    },
    {
      number: "04",
      title: "Launch & Support",
      icon: Wrench, 
      description: "Going live with ongoing maintenance",
      details: [
        "Smooth website deployment and launch",
        "Training on content management system",
        "Ongoing technical support and updates",
        "Performance monitoring and optimization"
      ]
    }
  ];

  return (
    <section className="py-20 bg-muted">
      <div className="container mx-auto px-6">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl lg:text-5xl font-bold mb-6">How It Works</h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Our proven 4-step process ensures your website is delivered on time, within budget, and exceeds your expectations.
          </p>
        </motion.div>

        {/* Process Steps */}
        <div className="grid lg:grid-cols-4 gap-8 mb-16">
          {steps.map((step, index) => (
            <motion.div
              key={step.number}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="relative"
            >
              <Card className="bg-background border-border hover:border-accent/50 transition-all duration-300 h-full">
                <CardContent className="p-6 text-center">
                  <div className="text-6xl font-bold text-accent/20 mb-4">{step.number}</div>
                  <div className="w-16 h-16 bg-accent/10 rounded-xl flex items-center justify-center mx-auto mb-4">
                    <step.icon className="w-8 h-8 text-accent" />
                  </div>
                  <h3 className="text-xl font-bold mb-3">{step.title}</h3>
                  <p className="text-muted-foreground text-sm">{step.description}</p>
                </CardContent>
              </Card>
              
              {/* Arrow connector */}
              {index < steps.length - 1 && (
                <div className="hidden lg:block absolute top-1/2 -right-4 transform -translate-y-1/2">
                  <div className="w-8 h-0.5 bg-accent/30"></div>
                  <div className="absolute -right-1 -top-1 w-3 h-3 border-r-2 border-t-2 border-accent/30 transform rotate-45"></div>
                </div>
              )}
            </motion.div>
          ))}
        </div>

        {/* Detailed Process */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
        >
          <Card className="bg-background border-border">
            <CardContent className="p-8">
              <div className="grid lg:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-2xl font-bold mb-6 text-accent">Design & Prototyping</h3>
                  <div className="space-y-4">
                    {steps[1].details.map((detail, index) => (
                      <div key={index} className="flex items-start">
                        <Check className="w-5 h-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                        <span className="text-muted-foreground">{detail}</span>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div className="bg-muted rounded-xl p-6">
                  <h4 className="font-semibold mb-4">What You Get:</h4>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li>• Custom wireframes and mockups</li>
                    <li>• Interactive prototype for testing</li>
                    <li>• Responsive design for all devices</li>
                    <li>• Brand-consistent visual elements</li>
                    <li>• User experience optimization</li>
                    <li>• Performance-focused architecture</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </section>
  );
}