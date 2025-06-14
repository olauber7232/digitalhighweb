import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ExternalLink } from "lucide-react";
import { motion } from "framer-motion";
import { portfolioItems } from "@/data/portfolio";

const categories = ["All Projects", "E-commerce", "Business", "Portfolio", "Restaurant"];

export default function PortfolioSection() {
  const [activeFilter, setActiveFilter] = useState("All Projects");

  const filteredItems = portfolioItems.filter(item => 
    activeFilter === "All Projects" || item.category === activeFilter
  );

  return (
    <section id="portfolio" className="py-20 bg-background">
      <div className="container mx-auto px-6">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl lg:text-5xl font-bold mb-6">Our Portfolio</h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Explore our latest projects and see how we've helped businesses transform their online presence.
          </p>
        </motion.div>

        {/* Portfolio Filter */}
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
              variant={activeFilter === category ? "default" : "secondary"}
              className={`${
                activeFilter === category 
                  ? "bg-accent text-accent-foreground" 
                  : "bg-secondary hover:bg-accent hover:text-accent-foreground"
              } transition-all transform hover:scale-105`}
              onClick={() => setActiveFilter(category)}
            >
              {category}
            </Button>
          ))}
        </motion.div>

        {/* Portfolio Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredItems.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <Card className="group cursor-pointer overflow-hidden border-border hover:border-accent/50 transition-all duration-300 transform hover:-translate-y-2">
                <div className="relative overflow-hidden">
                  <img 
                    src={item.image} 
                    alt={item.title}
                    className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="text-xl font-bold">{item.title}</h3>
                    <Badge variant="secondary" className={`${item.categoryColor} text-white`}>
                      {item.category}
                    </Badge>
                  </div>
                  <p className="text-muted-foreground mb-4 text-sm">
                    {item.description}
                  </p>
                  <div className="flex items-center justify-between">
                    <div className="flex space-x-2">
                      {item.tech.map((tech) => (
                        <Badge key={tech} variant="outline" className="text-xs">
                          {tech}
                        </Badge>
                      ))}
                    </div>
                    <Button variant="ghost" size="sm" className="text-accent hover:text-accent-foreground hover:bg-accent/10">
                      <ExternalLink className="w-4 h-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* View More Button */}
        <motion.div 
          className="text-center mt-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
        >
          <Button variant="outline" size="lg" className="border-accent text-accent hover:bg-accent hover:text-accent-foreground">
            View All Projects
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
