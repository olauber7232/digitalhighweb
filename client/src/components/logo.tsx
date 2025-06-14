
import { motion } from "framer-motion";
import { Zap } from "lucide-react";

export default function Logo({ size = "default" }: { size?: "default" | "large" | "small" }) {
  const sizeClasses = {
    small: "text-lg",
    default: "text-2xl",
    large: "text-4xl"
  };

  const iconSizes = {
    small: "w-5 h-5",
    default: "w-8 h-8", 
    large: "w-12 h-12"
  };

  return (
    <motion.div 
      className="flex items-center space-x-3"
      whileHover={{ scale: 1.05 }}
      transition={{ duration: 0.2 }}
    >
      <div className="relative">
        <motion.div 
          className="bg-gradient-to-br from-accent to-primary rounded-xl p-2"
          animate={{ 
            boxShadow: [
              "0 0 20px rgba(59, 130, 246, 0.3)",
              "0 0 30px rgba(59, 130, 246, 0.5)",
              "0 0 20px rgba(59, 130, 246, 0.3)"
            ]
          }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <Zap className={`${iconSizes[size]} text-white`} />
        </motion.div>
        <motion.div 
          className="absolute -top-1 -right-1 w-3 h-3 bg-green-500 rounded-full"
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        />
      </div>
      <div className="flex flex-col">
        <span className={`${sizeClasses[size]} font-bold bg-gradient-to-r from-accent via-primary to-accent bg-clip-text text-transparent`}>
          Digital High
        </span>
        <span className="text-xs text-muted-foreground -mt-1">Web Solutions</span>
      </div>
    </motion.div>
  );
}
