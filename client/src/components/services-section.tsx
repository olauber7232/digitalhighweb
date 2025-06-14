import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { services } from "@/data/services";

export default function ServicesSection() {
  return (
    <section id="services" className="py-20 bg-muted">
      <div className="container mx-auto px-6">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl lg:text-5xl font-bold mb-6">Services We Offer</h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Complete web solutions designed to grow your business and convert visitors into customers.
          </p>
        </motion.div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <Card className="card-gradient border-border hover:border-accent/50 transition-all duration-300 transform hover:-translate-y-2 h-full">
                <CardHeader>
                  <div className={`w-16 h-16 ${service.iconBg} rounded-xl flex items-center justify-center mb-4`}>
                    <service.icon className={`${service.iconColor} text-2xl w-8 h-8`} />
                  </div>
                  <CardTitle className="text-xl">{service.title}</CardTitle>
                  <CardDescription className="text-muted-foreground">
                    {service.description}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-sm text-muted-foreground mb-6">
                    {service.features.map((feature) => (
                      <li key={feature} className="flex items-center">
                        <div className="w-1.5 h-1.5 bg-green-500 rounded-full mr-3" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                  <Button variant="ghost" className="text-accent hover:text-accent-foreground hover:bg-accent/10 p-0">
                    Add to Quote →
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
