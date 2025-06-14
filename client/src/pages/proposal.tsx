
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { CheckCircle, Rocket } from "lucide-react";
import { motion } from "framer-motion";
import { useToast } from "@/hooks/use-toast";
import Navigation from "@/components/navigation";
import Footer from "@/components/footer";

export default function Proposal() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    businessType: "",
    budget: "",
    requirements: ""
  });
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Proposal Request Submitted!",
      description: "We will send your custom proposal within 24 hours.",
    });
    setFormData({ name: "", email: "", businessType: "", budget: "", requirements: "" });
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="min-h-screen">
      <Navigation />
      <main className="pt-20">
        <section className="py-20 bg-gradient-to-br from-background via-muted to-background">
          <div className="container mx-auto px-6">
            <motion.div 
              className="text-center mb-16"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h1 className="text-4xl lg:text-6xl font-bold mb-6">
                Get Your <span className="gradient-text">Free Proposal</span>
              </h1>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                Tell us about your project and receive a detailed proposal with timeline, 
                features, and transparent pricing within 24 hours.
              </p>
            </motion.div>

            <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <Card className="h-full">
                  <CardHeader>
                    <CardTitle className="text-2xl">What You'll Get</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {[
                      "Detailed project timeline and milestones",
                      "Custom design mockups and wireframes",
                      "Complete feature breakdown and specifications",
                      "Transparent pricing with no hidden costs",
                      "Free hosting and domain for 1 year",
                      "24/7 support and maintenance included"
                    ].map((item, index) => (
                      <motion.div 
                        key={index}
                        className="flex items-center space-x-3"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
                      >
                        <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                        <span>{item}</span>
                      </motion.div>
                    ))}
                    
                    
                  </CardContent>
                </Card>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
              >
                <Card>
                  <CardHeader>
                    <CardTitle className="text-2xl">Project Details</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <form onSubmit={handleSubmit} className="space-y-6">
                      <div className="grid md:grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="name">Full Name *</Label>
                          <Input
                            id="name"
                            value={formData.name}
                            onChange={(e) => handleInputChange('name', e.target.value)}
                            placeholder="John Doe"
                            required
                          />
                        </div>
                        <div>
                          <Label htmlFor="email">Email Address *</Label>
                          <Input
                            id="email"
                            type="email"
                            value={formData.email}
                            onChange={(e) => handleInputChange('email', e.target.value)}
                            placeholder="john@example.com"
                            required
                          />
                        </div>
                      </div>
                      
                      <div>
                        <Label htmlFor="businessType">Business Type *</Label>
                        <Select value={formData.businessType} onValueChange={(value) => handleInputChange('businessType', value)}>
                          <SelectTrigger>
                            <SelectValue placeholder="Select your business type" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="restaurant">Restaurant & Food</SelectItem>
                            <SelectItem value="retail">Retail & E-commerce</SelectItem>
                            <SelectItem value="healthcare">Healthcare & Medical</SelectItem>
                            <SelectItem value="professional">Professional Services</SelectItem>
                            <SelectItem value="technology">Technology & SaaS</SelectItem>
                            <SelectItem value="nonprofit">Non-profit & NGO</SelectItem>
                            <SelectItem value="other">Other</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div>
                        <Label htmlFor="budget">Project Budget *</Label>
                        <Select value={formData.budget} onValueChange={(value) => handleInputChange('budget', value)}>
                          <SelectTrigger>
                            <SelectValue placeholder="Select your budget range" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="500-1000">$500 - $1,000</SelectItem>
                            <SelectItem value="1000-2500">$1,000 - $2,500</SelectItem>
                            <SelectItem value="2500-5000">$2,500 - $5,000</SelectItem>
                            <SelectItem value="5000+">$5,000+</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div>
                        <Label htmlFor="requirements">Project Requirements *</Label>
                        <Textarea
                          id="requirements"
                          value={formData.requirements}
                          onChange={(e) => handleInputChange('requirements', e.target.value)}
                          placeholder="Describe your project requirements, features you need, target audience, and any specific goals..."
                          rows={4}
                          required
                        />
                      </div>

                      <Button type="submit" size="lg" className="w-full bg-gradient-to-r from-accent to-primary hover:from-accent/80 hover:to-primary/80">
                        <Rocket className="w-5 h-5 mr-2" />
                        Get My Free Proposal
                      </Button>
                    </form>
                  </CardContent>
                </Card>
              </motion.div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
