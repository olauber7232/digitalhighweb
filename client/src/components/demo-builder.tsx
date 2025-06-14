import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Palette, Type, Image, Layout, Eye, Download } from "lucide-react";
import { motion } from "framer-motion";

export default function DemoBuilder() {
  const [demoData, setDemoData] = useState({
    businessName: "",
    tagline: "",
    description: "",
    colorScheme: "blue",
    layout: "modern",
    industry: ""
  });

  const [previewMode, setPreviewMode] = useState("desktop");

  const colorSchemes = {
    blue: { primary: "#3B82F6", secondary: "#1E40AF", accent: "#60A5FA" },
    green: { primary: "#10B981", secondary: "#047857", accent: "#34D399" },
    purple: { primary: "#8B5CF6", secondary: "#7C3AED", accent: "#A78BFA" },
    orange: { primary: "#F59E0B", secondary: "#D97706", accent: "#FBBF24" }
  };

  const handleInputChange = (field: string, value: string) => {
    setDemoData(prev => ({ ...prev, [field]: value }));
  };

  const generateDemo = () => {
    // In a real implementation, this would generate an actual demo site
    console.log("Generating demo with:", demoData);
  };

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
          <h2 className="text-4xl lg:text-5xl font-bold mb-6">Try Our Demo Website Builder</h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Create a preview of your website instantly. No login required - see your vision come to life in seconds.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 max-w-7xl mx-auto">
          {/* Builder Controls */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Layout className="w-5 h-5 mr-2" />
                  Customize Your Demo
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="businessName">Business Name</Label>
                    <Input
                      id="businessName"
                      value={demoData.businessName}
                      onChange={(e) => handleInputChange("businessName", e.target.value)}
                      placeholder="Your Business Name"
                    />
                  </div>
                  <div>
                    <Label htmlFor="industry">Industry</Label>
                    <Select value={demoData.industry} onValueChange={(value) => handleInputChange("industry", value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select industry" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="restaurant">Restaurant</SelectItem>
                        <SelectItem value="retail">Retail</SelectItem>
                        <SelectItem value="healthcare">Healthcare</SelectItem>
                        <SelectItem value="technology">Technology</SelectItem>
                        <SelectItem value="professional">Professional Services</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div>
                  <Label htmlFor="tagline">Tagline</Label>
                  <Input
                    id="tagline"
                    value={demoData.tagline}
                    onChange={(e) => handleInputChange("tagline", e.target.value)}
                    placeholder="Your business tagline"
                  />
                </div>

                <div>
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    value={demoData.description}
                    onChange={(e) => handleInputChange("description", e.target.value)}
                    placeholder="Brief description of your business"
                    rows={3}
                  />
                </div>

                <div>
                  <Label>Color Scheme</Label>
                  <div className="grid grid-cols-4 gap-3 mt-2">
                    {Object.entries(colorSchemes).map(([name, colors]) => (
                      <button
                        key={name}
                        onClick={() => handleInputChange("colorScheme", name)}
                        className={`p-3 rounded-lg border-2 transition-all ${
                          demoData.colorScheme === name ? "border-accent" : "border-border"
                        }`}
                      >
                        <div className="flex space-x-1 mb-2">
                          <div 
                            className="w-4 h-4 rounded" 
                            style={{ backgroundColor: colors.primary }}
                          />
                          <div 
                            className="w-4 h-4 rounded" 
                            style={{ backgroundColor: colors.secondary }}
                          />
                          <div 
                            className="w-4 h-4 rounded" 
                            style={{ backgroundColor: colors.accent }}
                          />
                        </div>
                        <div className="text-xs font-medium capitalize">{name}</div>
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <Label>Layout Style</Label>
                  <Select value={demoData.layout} onValueChange={(value) => handleInputChange("layout", value)}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="modern">Modern & Clean</SelectItem>
                      <SelectItem value="classic">Classic & Professional</SelectItem>
                      <SelectItem value="creative">Creative & Bold</SelectItem>
                      <SelectItem value="minimal">Minimal & Simple</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <Button onClick={generateDemo} className="w-full">
                  <Eye className="w-4 h-4 mr-2" />
                  Generate Demo Preview
                </Button>
              </CardContent>
            </Card>
          </motion.div>

          {/* Preview Area */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
          >
            <Card className="h-full">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>Live Preview</CardTitle>
                  <div className="flex space-x-2">
                    <Button
                      size="sm"
                      variant={previewMode === "desktop" ? "default" : "outline"}
                      onClick={() => setPreviewMode("desktop")}
                    >
                      Desktop
                    </Button>
                    <Button
                      size="sm"
                      variant={previewMode === "mobile" ? "default" : "outline"}
                      onClick={() => setPreviewMode("mobile")}
                    >
                      Mobile
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className={`border rounded-lg overflow-hidden ${
                  previewMode === "mobile" ? "max-w-sm mx-auto" : "w-full"
                }`}>
                  {/* Mock Website Preview */}
                  <div 
                    className="bg-gradient-to-br from-blue-50 to-blue-100 p-6 text-center"
                    style={{
                      background: demoData.colorScheme ? 
                        `linear-gradient(135deg, ${colorSchemes[demoData.colorScheme as keyof typeof colorSchemes].primary}20, ${colorSchemes[demoData.colorScheme as keyof typeof colorSchemes].accent}20)` :
                        undefined
                    }}
                  >
                    <h1 className="text-2xl font-bold mb-2">
                      {demoData.businessName || "Your Business Name"}
                    </h1>
                    <p className="text-lg text-muted-foreground mb-4">
                      {demoData.tagline || "Your compelling tagline here"}
                    </p>
                    <div 
                      className="inline-block px-6 py-2 rounded-lg text-white font-medium"
                      style={{
                        backgroundColor: demoData.colorScheme ? 
                          colorSchemes[demoData.colorScheme as keyof typeof colorSchemes].primary :
                          "#3B82F6"
                      }}
                    >
                      Get Started
                    </div>
                  </div>
                  
                  <div className="p-6 bg-white">
                    <h2 className="text-xl font-semibold mb-3">About Us</h2>
                    <p className="text-muted-foreground text-sm leading-relaxed">
                      {demoData.description || "Your business description will appear here. Tell your customers what makes you special and why they should choose you."}
                    </p>
                  </div>

                  <div className="p-6 bg-gray-50">
                    <h2 className="text-xl font-semibold mb-3">Our Services</h2>
                    <div className="grid grid-cols-2 gap-4">
                      {[1, 2, 3, 4].map((i) => (
                        <div key={i} className="bg-white p-3 rounded-lg text-center">
                          <div className="w-8 h-8 bg-gray-200 rounded mx-auto mb-2"></div>
                          <div className="text-sm font-medium">Service {i}</div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="p-6 bg-white text-center">
                    <h2 className="text-xl font-semibold mb-3">Contact Us</h2>
                    <div className="space-y-2 text-sm text-muted-foreground">
                      <div>📧 contact@yourbusiness.com</div>
                      <div>📞 (555) 123-4567</div>
                      <div>📍 Your Business Address</div>
                    </div>
                  </div>
                </div>

                {demoData.businessName && (
                  <div className="mt-6 space-y-3">
                    <Button className="w-full" variant="outline">
                      <Download className="w-4 h-4 mr-2" />
                      Convert to Real Website
                    </Button>
                    <p className="text-xs text-center text-muted-foreground">
                      Like what you see? Convert this demo to a fully functional website!
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