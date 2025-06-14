import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { X, Calendar, Users, Target, Lightbulb, TrendingUp } from "lucide-react";
import { motion } from "framer-motion";
import { Link } from "wouter";

export default function DiscoveryCallPopup() {
  const [isOpen, setIsOpen] = useState(false);
  const [hasShown, setHasShown] = useState(false);

  useEffect(() => {
    const hasPopupShown = localStorage.getItem('discovery-popup-shown');
    if (!hasPopupShown) {
      const timer = setTimeout(() => {
        setIsOpen(true);
        setHasShown(true);
        localStorage.setItem('discovery-popup-shown', 'true');
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, []);

  const benefits = [
    {
      icon: Users,
      text: "Meet with our product strategists"
    },
    {
      icon: Target, 
      text: "Talk through your vision"
    },
    {
      icon: TrendingUp,
      text: "Define major product goals"
    },
    {
      icon: Lightbulb,
      text: "Challenge critical assumptions"
    },
    {
      icon: Calendar,
      text: "Learn more about our process"
    }
  ];

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="sm:max-w-md bg-background border-border">
        <DialogTitle className="sr-only">Book a Free Discovery Call</DialogTitle>
        <DialogDescription className="sr-only">Schedule a consultation to discuss your web development needs</DialogDescription>
        <div className="relative p-6">

          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.3 }}
            className="text-center"
          >
            <h2 className="text-2xl font-bold mb-2">
              Book a Free
            </h2>
            <div className="inline-block bg-gradient-to-r from-pink-500 to-purple-600 text-white px-4 py-2 rounded-lg font-bold text-xl mb-6">
              Discovery Call
            </div>

            <div className="space-y-4 mb-6 text-left">
              {benefits.map((benefit, index) => (
                <motion.div
                  key={index}
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                  className="flex items-center space-x-3"
                >
                  <div className="w-8 h-8 bg-accent/10 rounded-full flex items-center justify-center">
                    <benefit.icon className="w-4 h-4 text-accent" />
                  </div>
                  <span className="text-sm text-muted-foreground">{benefit.text}</span>
                </motion.div>
              ))}
            </div>

            <p className="text-sm text-muted-foreground mb-6 leading-relaxed">
              Learn how to kick-off your product journey—schedule a call with us today!
            </p>

            <Link href="/contact" onClick={() => setIsOpen(false)}>
              <Button 
                size="lg" 
                className="w-full bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white font-semibold"
              >
                Book a Call →
              </Button>
            </Link>

            <div className="mt-4">
              <img 
                src="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=200" 
                alt="Professional consultation meeting"
                className="w-full h-32 object-cover rounded-lg opacity-80"
              />
            </div>
          </motion.div>
        </div>
      </DialogContent>
    </Dialog>
  );
}