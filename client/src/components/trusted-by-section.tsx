
import { motion } from "framer-motion";

export default function TrustedBySection() {
  const companies = [
    {
      name: "Microsoft",
      logo: "/api/placeholder/120/60",
      logoSvg: (
        <svg viewBox="0 0 120 60" className="w-full h-full">
          <rect x="10" y="10" width="18" height="18" fill="#f25022"/>
          <rect x="32" y="10" width="18" height="18" fill="#7fba00"/>
          <rect x="10" y="32" width="18" height="18" fill="#00a4ef"/>
          <rect x="32" y="32" width="18" height="18" fill="#ffb900"/>
          <text x="60" y="35" fill="currentColor" fontSize="16" fontWeight="600">Microsoft</text>
        </svg>
      ),
      width: "140px"
    },
    {
      name: "Google",
      logoSvg: (
        <svg viewBox="0 0 120 60" className="w-full h-full">
          <text x="10" y="35" fontSize="18" fontWeight="500">
            <tspan fill="#4285f4">G</tspan>
            <tspan fill="#ea4335">o</tspan>
            <tspan fill="#fbbc05">o</tspan>
            <tspan fill="#4285f4">g</tspan>
            <tspan fill="#34a853">l</tspan>
            <tspan fill="#ea4335">e</tspan>
          </text>
        </svg>
      ),
      width: "120px"
    },
    {
      name: "Amazon",
      logoSvg: (
        <svg viewBox="0 0 120 60" className="w-full h-full">
          <text x="10" y="30" fill="currentColor" fontSize="16" fontWeight="700">amazon</text>
          <path d="M15 40 Q60 50 105 40" stroke="#ff9900" strokeWidth="3" fill="none"/>
          <circle cx="100" cy="40" r="2" fill="#ff9900"/>
        </svg>
      ),
      width: "120px"
    },
    {
      name: "Apple",
      logoSvg: (
        <svg viewBox="0 0 120 60" className="w-full h-full">
          <path d="M45 15c-2 0-4 1-5 3-1 2 0 4 1 5 2 0 4-1 5-3 1-2 0-4-1-5z" fill="currentColor"/>
          <path d="M50 25c-3 0-6 2-7 5-2 6 4 14 6 17 1 1 2 2 3 2 1 0 2-1 3-2 2-3 8-11 6-17-1-3-4-5-7-5" fill="currentColor"/>
          <text x="65" y="35" fill="currentColor" fontSize="16" fontWeight="500">Apple</text>
        </svg>
      ),
      width: "100px"
    },
    {
      name: "Meta",
      logoSvg: (
        <svg viewBox="0 0 120 60" className="w-full h-full">
          <circle cx="25" cy="30" r="12" fill="#1877f2"/>
          <circle cx="35" cy="30" r="12" fill="#42a5f5"/>
          <text x="55" y="35" fill="currentColor" fontSize="16" fontWeight="600">Meta</text>
        </svg>
      ),
      width: "120px"
    },
    {
      name: "Netflix",
      logoSvg: (
        <svg viewBox="0 0 120 60" className="w-full h-full">
          <rect x="15" y="15" width="4" height="30" fill="#e50914"/>
          <rect x="23" y="15" width="4" height="30" fill="#e50914"/>
          <rect x="31" y="15" width="4" height="30" fill="#e50914"/>
          <text x="45" y="35" fill="currentColor" fontSize="14" fontWeight="700">NETFLIX</text>
        </svg>
      ),
      width: "140px"
    }
  ];

  return (
    <section className="py-16 bg-gradient-to-br from-muted via-background to-muted border-t border-border">
      <div className="container mx-auto px-6">
        <motion.div 
          className="text-center mb-12"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl lg:text-4xl font-bold mb-4">Trusted & Supported By</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Join industry leaders who trust technologies similar to what we implement in our solutions
          </p>
        </motion.div>

        <motion.div 
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 items-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
        >
          {companies.map((company, index) => (
            <motion.div
              key={company.name}
              className="flex items-center justify-center p-6 bg-background/80 backdrop-blur-sm rounded-xl border border-border/50 hover:border-accent/50 hover:bg-background transition-all duration-300 min-h-[80px]"
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.05, y: -2 }}
            >
              <div 
                style={{ width: company.width, height: "40px" }}
                className="opacity-70 hover:opacity-100 transition-opacity duration-300 flex items-center justify-center"
              >
                {company.logoSvg}
              </div>
            </motion.div>
          ))}
        </motion.div>

        <motion.div 
          className="text-center mt-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
        >
          <p className="text-sm text-muted-foreground">
            These companies use technologies and frameworks similar to what we implement in our solutions
          </p>
        </motion.div>
      </div>
    </section>
  );
}
