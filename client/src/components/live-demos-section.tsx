import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ExternalLink, Monitor, Smartphone, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Dialog, DialogContent } from "@/components/ui/dialog";

export default function LiveDemosSection() {
  const [selectedDemo, setSelectedDemo] = useState<any>(null);
  const [viewMode, setViewMode] = useState("desktop");

  const demos = [
    {
      id: 1,
      title: "Modern Restaurant",
      category: "Restaurant",
      description: "Full-featured restaurant website with online menu and reservations",
      image: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
      url: "https://demo-restaurant.webcraftpro.com",
      features: ["Online Menu", "Reservations", "Gallery", "Contact"],
      tech: ["React", "Node.js", "Stripe"]
    },
    {
      id: 2,
      title: "E-commerce Store",
      category: "E-commerce",
      description: "Complete online store with shopping cart and payment processing",
      image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
      url: "https://demo-store.webcraftpro.com",
      features: ["Shopping Cart", "Payment Gateway", "Inventory", "Admin Panel"],
      tech: ["Next.js", "Stripe", "PostgreSQL"]
    },
    {
      id: 3,
      title: "Professional Services",
      category: "Business",
      description: "Clean business website for consulting and professional services",
      image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
      url: "https://demo-business.webcraftpro.com",
      features: ["Service Pages", "Team Profiles", "Blog", "Contact Forms"],
      tech: ["WordPress", "Custom Theme", "SEO"]
    },
    {
      id: 4,
      title: "Creative Portfolio",
      category: "Portfolio",
      description: "Stunning portfolio website for artists and creative professionals",
      image: "https://images.unsplash.com/photo-1558655146-d09347e92766?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
      url: "https://demo-portfolio.webcraftpro.com",
      features: ["Gallery", "Project Showcase", "Client Testimonials", "Contact"],
      tech: ["Vue.js", "Nuxt", "Headless CMS"]
    },
    {
      id: 5,
      title: "Healthcare Clinic",
      category: "Healthcare",
      description: "Medical practice website with appointment booking system",
      image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
      url: "https://demo-healthcare.webcraftpro.com",
      features: ["Appointment Booking", "Doctor Profiles", "Services", "Patient Portal"],
      tech: ["React", "Express", "MongoDB"]
    },
    {
      id: 6,
      title: "Tech Startup",
      category: "Technology",
      description: "Modern SaaS landing page with user authentication and dashboard",
      image: "https://images.unsplash.com/photo-1551650975-87deedd944c3?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
      url: "https://demo-saas.webcraftpro.com",
      features: ["User Dashboard", "Subscription Plans", "API Integration", "Analytics"],
      tech: ["React", "Node.js", "Stripe", "AWS"]
    }
  ];

  const categories = ["All", ...Array.from(new Set(demos.map(demo => demo.category)))];
  const [activeCategory, setActiveCategory] = useState("All");

  const filteredDemos = demos.filter(demo => 
    activeCategory === "All" || demo.category === activeCategory
  );

  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-6">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl lg:text-5xl font-bold mb-6">Live Website Previews</h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Explore our ready-to-go demo websites. Click any demo to see it in action and imagine your business with a similar design.
          </p>
        </motion.div>

        {/* Category Filter */}
        <motion.div 
          className="flex flex-wrap justify-center gap-4 mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
        >
          {categories.map((category) => (
            <Button
              key={category}
              variant={activeCategory === category ? "default" : "secondary"}
              className={`${
                activeCategory === category 
                  ? "bg-accent text-accent-foreground" 
                  : "bg-muted hover:bg-accent hover:text-accent-foreground"
              } transition-all`}
              onClick={() => setActiveCategory(category)}
            >
              {category}
            </Button>
          ))}
        </motion.div>

        {/* Demos Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredDemos.map((demo, index) => (
            <motion.div
              key={demo.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <Card className="group cursor-pointer overflow-hidden border-border hover:border-accent/50 transition-all duration-300 transform hover:-translate-y-2 h-full">
                <div className="relative overflow-hidden">
                  <img 
                    src={demo.image} 
                    alt={demo.title}
                    className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <div className="absolute top-4 left-4">
                    <Badge variant="secondary" className="bg-accent text-accent-foreground">
                      {demo.category}
                    </Badge>
                  </div>
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <Button 
                      onClick={() => setSelectedDemo(demo)}
                      className="bg-white text-black hover:bg-gray-100"
                    >
                      <ExternalLink className="w-4 h-4 mr-2" />
                      Preview Demo
                    </Button>
                  </div>
                </div>
                
                <CardHeader className="pb-3">
                  <CardTitle className="text-xl">{demo.title}</CardTitle>
                  <p className="text-muted-foreground text-sm">{demo.description}</p>
                </CardHeader>
                
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-medium text-sm mb-2">Key Features:</h4>
                      <div className="flex flex-wrap gap-1">
                        {demo.features.map((feature) => (
                          <Badge key={feature} variant="outline" className="text-xs">
                            {feature}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    
                    <div>
                      <h4 className="font-medium text-sm mb-2">Technology:</h4>
                      <div className="flex flex-wrap gap-1">
                        {demo.tech.map((tech) => (
                          <Badge key={tech} variant="secondary" className="text-xs">
                            {tech}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    <Button 
                      className="w-full" 
                      variant="outline"
                      onClick={() => setSelectedDemo(demo)}
                    >
                      View Live Demo
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Demo Preview Modal */}
        <AnimatePresence>
          {selectedDemo && (
            <Dialog open={!!selectedDemo} onOpenChange={() => setSelectedDemo(null)}>
              <DialogContent className="max-w-6xl w-full h-[90vh] p-0">
                <div className="flex flex-col h-full">
                  {/* Header */}
                  <div className="flex items-center justify-between p-4 border-b">
                    <div className="flex items-center space-x-4">
                      <h3 className="text-lg font-semibold">{selectedDemo.title}</h3>
                      <Badge>{selectedDemo.category}</Badge>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Button
                        size="sm"
                        variant={viewMode === "desktop" ? "default" : "outline"}
                        onClick={() => setViewMode("desktop")}
                      >
                        <Monitor className="w-4 h-4 mr-1" />
                        Desktop
                      </Button>
                      <Button
                        size="sm"
                        variant={viewMode === "mobile" ? "default" : "outline"}
                        onClick={() => setViewMode("mobile")}
                      >
                        <Smartphone className="w-4 h-4 mr-1" />
                        Mobile
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => window.open(selectedDemo.url, '_blank')}
                      >
                        <ExternalLink className="w-4 h-4 mr-1" />
                        Open in New Tab
                      </Button>
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => setSelectedDemo(null)}
                      >
                        <X className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>

                  {/* Preview Frame */}
                  <div className="flex-1 p-4 bg-gray-100">
                    <div className={`mx-auto bg-white rounded-lg shadow-lg overflow-hidden ${
                      viewMode === "mobile" ? "max-w-sm" : "w-full"
                    }`}>
                      <iframe
                        src={selectedDemo.url}
                        className={`w-full border-0 ${
                          viewMode === "mobile" ? "h-[600px]" : "h-[600px]"
                        }`}
                        title={`${selectedDemo.title} Demo`}
                      />
                    </div>
                  </div>

                  {/* Footer */}
                  <div className="p-4 border-t bg-muted">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-muted-foreground">
                          Like this design? We can build something similar for your business.
                        </p>
                      </div>
                      <Button className="bg-accent hover:bg-accent/80">
                        Build Similar Website
                      </Button>
                    </div>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}