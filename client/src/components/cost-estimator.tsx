import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Calculator, Zap } from "lucide-react";
import { motion } from "framer-motion";

export default function CostEstimator() {
  const [siteType, setSiteType] = useState("");
  const [pages, setPages] = useState([5]);
  const [features, setFeatures] = useState<string[]>([]);
  const [urgency, setUrgency] = useState("");
  const [estimatedCost, setEstimatedCost] = useState(0);

  const basePrices = {
    "static": 299,
    "business": 599,
    "ecommerce": 999,
    "custom": 1499
  };

  const featurePrices = {
    "ai-chat": 200,
    "cms": 150,
    "seo": 100,
    "analytics": 75,
    "social": 50,
    "booking": 300,
    "payment": 250
  };

  const urgencyMultipliers = {
    "standard": 1,
    "rush": 1.5,
    "emergency": 2
  };

  const calculateCost = () => {
    if (!siteType) return;

    let cost = basePrices[siteType as keyof typeof basePrices] || 0;
    
    // Add page cost (additional pages beyond base)
    const additionalPages = Math.max(0, pages[0] - 3);
    cost += additionalPages * 50;

    // Add feature costs
    features.forEach(feature => {
      cost += featurePrices[feature as keyof typeof featurePrices] || 0;
    });

    // Apply urgency multiplier
    if (urgency) {
      cost *= urgencyMultipliers[urgency as keyof typeof urgencyMultipliers] || 1;
    }

    setEstimatedCost(cost);
  };

  const toggleFeature = (feature: string) => {
    setFeatures(prev => 
      prev.includes(feature) 
        ? prev.filter(f => f !== feature)
        : [...prev, feature]
    );
  };

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
          <h2 className="text-4xl lg:text-5xl font-bold mb-6">AI-Powered Cost Estimator</h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Get an instant estimate for your website project. Customize features and see real-time pricing.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Calculator className="w-5 h-5 mr-2" />
                  Project Configuration
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <Label>Website Type</Label>
                  <Select value={siteType} onValueChange={setSiteType}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select website type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="static">Static Website ($299)</SelectItem>
                      <SelectItem value="business">Business Website ($599)</SelectItem>
                      <SelectItem value="ecommerce">E-commerce Store ($999)</SelectItem>
                      <SelectItem value="custom">Custom Application ($1,499)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label>Number of Pages: {pages[0]}</Label>
                  <Slider
                    value={pages}
                    onValueChange={setPages}
                    max={20}
                    min={1}
                    step={1}
                    className="mt-2"
                  />
                  <div className="flex justify-between text-xs text-muted-foreground mt-1">
                    <span>1 page</span>
                    <span>20+ pages</span>
                  </div>
                </div>

                <div>
                  <Label>Additional Features</Label>
                  <div className="grid grid-cols-2 gap-3 mt-2">
                    {[
                      { id: "ai-chat", label: "AI Chatbot", price: 200 },
                      { id: "cms", label: "CMS", price: 150 },
                      { id: "seo", label: "SEO Package", price: 100 },
                      { id: "analytics", label: "Analytics", price: 75 },
                      { id: "social", label: "Social Media", price: 50 },
                      { id: "booking", label: "Booking System", price: 300 },
                      { id: "payment", label: "Payment Gateway", price: 250 }
                    ].map((feature) => (
                      <button
                        key={feature.id}
                        onClick={() => toggleFeature(feature.id)}
                        className={`p-3 text-left border rounded-lg transition-all ${
                          features.includes(feature.id)
                            ? "border-accent bg-accent/10 text-accent"
                            : "border-border hover:border-accent/50"
                        }`}
                      >
                        <div className="font-medium text-sm">{feature.label}</div>
                        <div className="text-xs text-muted-foreground">+${feature.price}</div>
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <Label>Project Urgency</Label>
                  <Select value={urgency} onValueChange={setUrgency}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select timeline" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="standard">Standard (2-3 weeks)</SelectItem>
                      <SelectItem value="rush">Rush (1 week) +50%</SelectItem>
                      <SelectItem value="emergency">Emergency (3-5 days) +100%</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <Button onClick={calculateCost} className="w-full" disabled={!siteType}>
                  <Zap className="w-4 h-4 mr-2" />
                  Calculate Estimate
                </Button>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
          >
            <Card className="sticky top-8">
              <CardHeader>
                <CardTitle>Your Estimate</CardTitle>
              </CardHeader>
              <CardContent>
                {estimatedCost > 0 ? (
                  <div className="space-y-4">
                    <div className="text-center">
                      <div className="text-4xl font-bold text-accent mb-2">
                        ${estimatedCost.toLocaleString()}
                      </div>
                      <p className="text-muted-foreground">Estimated Project Cost</p>
                    </div>

                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span>Base Website ({siteType})</span>
                        <span>${basePrices[siteType as keyof typeof basePrices]}</span>
                      </div>
                      {pages[0] > 3 && (
                        <div className="flex justify-between">
                          <span>Additional Pages ({pages[0] - 3})</span>
                          <span>${(pages[0] - 3) * 50}</span>
                        </div>
                      )}
                      {features.map(feature => (
                        <div key={feature} className="flex justify-between">
                          <span>{feature.replace('-', ' ').toUpperCase()}</span>
                          <span>${featurePrices[feature as keyof typeof featurePrices]}</span>
                        </div>
                      ))}
                      {urgency && urgency !== "standard" && (
                        <div className="flex justify-between text-orange-600">
                          <span>Urgency Multiplier</span>
                          <span>+{((urgencyMultipliers[urgency as keyof typeof urgencyMultipliers] - 1) * 100)}%</span>
                        </div>
                      )}
                    </div>

                    <div className="border-t pt-4">
                      <div className="bg-muted p-4 rounded-lg">
                        <h4 className="font-semibold mb-2">What's Included:</h4>
                        <ul className="text-sm space-y-1">
                          <li>• Free 1-year hosting & domain</li>
                          <li>• Mobile-responsive design</li>
                          <li>• SSL certificate</li>
                          <li>• Basic SEO setup</li>
                          <li>• 30 days free support</li>
                        </ul>
                      </div>
                    </div>

                    <Button className="w-full bg-accent hover:bg-accent/80">
                      Get Detailed Proposal
                    </Button>
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <Calculator className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
                    <p className="text-muted-foreground">
                      Configure your project above to see the estimated cost
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </section>
  );
}