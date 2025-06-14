import { Button } from "@/components/ui/button";
import { AlertTriangle, TrendingDown } from "lucide-react";
import { motion } from "framer-motion";

export default function UrgencySection() {
  return (
    <section className="py-16 bg-gradient-to-r from-red-900/20 via-background to-red-900/20 border-y border-red-500/20">
      <div className="container mx-auto px-6">
        <motion.div 
          className="text-center max-w-4xl mx-auto"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <div className="flex items-center justify-center mb-6">
            <AlertTriangle className="w-8 h-8 text-red-500 mr-3" />
            <h2 className="text-3xl lg:text-4xl font-bold text-red-400">
              Still Offline? Your Competitors Are Taking Your Customers
            </h2>
          </div>
          
          <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
            Every day without a professional website means lost revenue, missed opportunities, and customers choosing your competitors. 
            In today's digital world, your business needs more than just an online presence—it needs a powerful, conversion-focused 
            website that works 24/7 to grow your business. Don't let another potential customer slip away to a competitor with a 
            better online strategy.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <div className="flex items-center text-red-400">
              <TrendingDown className="w-5 h-5 mr-2" />
              <span className="font-semibold">Lost Sales Every Hour</span>
            </div>
            <Button size="lg" className="bg-accent hover:bg-accent/80 text-accent-foreground">
              Stop Losing Customers - Get Online Now!
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}