import { useState } from "react";
import { Button } from "@/components/ui/button";
import { MessageCircle, X, Send } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "wouter";

export default function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [messages, setMessages] = useState([
    { type: 'bot', text: 'Hi! I\'m here to help you with your website needs. What would you like to know?' }
  ]);

  const predefinedQuestions = [
    "How much does a website cost?",
    "How long does it take to build?",
    "Do you provide hosting?",
    "Can I update content myself?",
    "Do you offer mobile-responsive design?"
  ];

  const answers = {
    "How much does a website cost?": "Our websites start from $299 for basic sites. E-commerce sites start from $799. All packages include free hosting and domain for 1 year!",
    "How long does it take to build?": "Most websites are completed within 7 days! Complex e-commerce sites may take 10-14 days. We provide daily updates throughout the process.",
    "Do you provide hosting?": "Yes! Every website includes free hosting and domain registration for the first year. After that, hosting is just $10/month.",
    "Can I update content myself?": "Absolutely! We provide an easy-to-use admin panel where you can update text, images, and content without any technical knowledge.",
    "Do you offer mobile-responsive design?": "Yes, all our websites are fully responsive and optimized for mobile devices, tablets, and desktops."
  };

  const toggleChat = () => {
    setIsOpen(!isOpen);
  };

  const handleQuestionClick = (question: string) => {
    setMessages(prev => [
      ...prev,
      { type: 'user', text: question },
      { type: 'bot', text: answers[question as keyof typeof answers] }
    ]);
    setCurrentStep(currentStep + 1);
  };

  const handleGetProposal = () => {
    setMessages(prev => [
      ...prev,
      { type: 'bot', text: 'Great! I\'ll redirect you to our proposal form where you can tell us more about your project.' }
    ]);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            className="mb-4 bg-card border border-border rounded-lg shadow-lg w-80 h-96 flex flex-col"
          >
            <div className="p-4 border-b border-border flex items-center justify-between bg-accent text-accent-foreground rounded-t-lg">
              <h3 className="font-semibold">Digital High Web Assistant</h3>
              <Button variant="ghost" size="icon" onClick={toggleChat} className="text-accent-foreground hover:bg-accent-foreground/10">
                <X className="w-4 h-4" />
              </Button>
            </div>
            
            <div className="flex-1 p-4 overflow-y-auto space-y-3">
              {messages.map((message, index) => (
                <div key={index} className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[80%] p-3 rounded-lg text-sm ${
                    message.type === 'user' 
                      ? 'bg-accent text-accent-foreground' 
                      : 'bg-muted text-foreground'
                  }`}>
                    {message.text}
                  </div>
                </div>
              ))}
              
              {currentStep < 3 && (
                <div className="space-y-2">
                  <p className="text-xs text-muted-foreground">Choose a question:</p>
                  {predefinedQuestions.slice(currentStep, currentStep + 2).map((question, index) => (
                    <Button
                      key={index}
                      variant="outline"
                      size="sm"
                      className="w-full text-left justify-start text-xs"
                      onClick={() => handleQuestionClick(question)}
                    >
                      {question}
                    </Button>
                  ))}
                </div>
              )}
              
              {currentStep >= 2 && (
                <div className="space-y-2">
                  <p className="text-xs text-muted-foreground">Ready to get started?</p>
                  <Link href="/contact" onClick={toggleChat}>
                    <Button
                      size="sm"
                      className="w-full bg-accent text-accent-foreground"
                      onClick={handleGetProposal}
                    >
                      Get Free Proposal →
                    </Button>
                  </Link>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      
      <motion.div
        animate={{ y: [0, -10, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
      >
        <Button
          onClick={toggleChat}
          size="icon"
          className="w-14 h-14 rounded-full bg-accent hover:bg-accent/80 text-accent-foreground shadow-lg"
        >
          <MessageCircle className="w-6 h-6" />
        </Button>
      </motion.div>
    </div>
  );
}
