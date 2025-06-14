import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Check, X } from "lucide-react";
import { motion } from "framer-motion";

const comparisonData = [
  {
    feature: "Website Delivery Time",
    ourService: "7 Days",
    typical: "3–4 Weeks",
  },
  {
    feature: "Free Domain + Hosting",
    ourService: true,
    typical: false,
  },
  {
    feature: "AI Chat Assistant Included",
    ourService: true,
    typical: false,
  },
  {
    feature: "Admin Panel Included",
    ourService: true,
    typical: false,
  },
  {
    feature: "Instant PDF Proposal",
    ourService: true,
    typical: false,
  },
  {
    feature: "Transparent Pricing",
    ourService: true,
    typical: false,
  },
];

const stats = [
  { value: "100+", label: "Websites Delivered" },
  { value: "7", label: "Days Average Delivery" },
  { value: "99%", label: "Client Satisfaction" },
  { value: "24/7", label: "Support Available" },
];

export default function ComparisonSection() {
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
          <h2 className="text-4xl lg:text-5xl font-bold mb-6">Why Choose Digital High Web?</h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            We deliver results that matter to your business with transparent pricing and reliable service.
          </p>
        </motion.div>

        {/* Comparison Table */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
        >
          <Card className="bg-background rounded-2xl mb-16 overflow-hidden">
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-secondary">
                    <tr>
                      <th className="text-left py-4 px-6 text-lg font-semibold">Feature</th>
                      <th className="text-center py-4 px-6 text-lg font-semibold text-accent">Our Service</th>
                      <th className="text-center py-4 px-6 text-lg font-semibold text-muted-foreground">Typical Agencies</th>
                    </tr>
                  </thead>
                  <tbody>
                    {comparisonData.map((row, index) => (
                      <tr key={row.feature} className="border-b border-border">
                        <td className="py-4 px-6 font-medium">{row.feature}</td>
                        <td className="text-center py-4 px-6">
                          {typeof row.ourService === "boolean" ? (
                            row.ourService ? (
                              <Check className="w-6 h-6 text-green-500 mx-auto" />
                            ) : (
                              <X className="w-6 h-6 text-red-500 mx-auto" />
                            )
                          ) : (
                            <span className="text-accent font-semibold">{row.ourService}</span>
                          )}
                        </td>
                        <td className="text-center py-4 px-6">
                          {typeof row.typical === "boolean" ? (
                            row.typical ? (
                              <Check className="w-6 h-6 text-green-500 mx-auto" />
                            ) : (
                              <X className="w-6 h-6 text-red-500 mx-auto" />
                            )
                          ) : (
                            <span className="text-muted-foreground">{row.typical}</span>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Stats */}
        <motion.div 
          className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
        >
          {stats.map((stat, index) => (
            <div key={stat.label} className="text-center">
              <div className="text-4xl font-bold text-accent mb-2">{stat.value}</div>
              <div className="text-muted-foreground">{stat.label}</div>
            </div>
          ))}
        </motion.div>

        <motion.div 
          className="text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          viewport={{ once: true }}
        >
          <Button size="lg" className="bg-accent hover:bg-accent/80 text-accent-foreground">
            Let's Build Your Website the Right Way!
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
