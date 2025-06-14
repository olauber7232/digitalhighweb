import Navigation from "@/components/navigation";
import Footer from "@/components/footer";
import ChatWidget from "@/components/chat-widget";
import { Card, CardContent } from "@/components/ui/card";
import { motion } from "framer-motion";
import { Users, Award, Target, Heart } from "lucide-react";

export default function About() {
  const values = [
    {
      icon: Target,
      title: "Mission Driven",
      description: "We're dedicated to helping businesses succeed online with cutting-edge web solutions."
    },
    {
      icon: Heart,
      title: "Client First",
      description: "Your success is our priority. We build lasting partnerships through exceptional service."
    },
    {
      icon: Award,
      title: "Quality Excellence",
      description: "We deliver premium websites that exceed expectations and drive real results."
    },
    {
      icon: Users,
      title: "Team Spirit",
      description: "Our diverse team brings together creativity, technical expertise, and business insight."
    }
  ];

  return (
    <div className="min-h-screen">
      <Navigation />
      <main className="pt-20">
        {/* Hero Section */}
        <section className="py-20 bg-background">
          <div className="container mx-auto px-6">
            <motion.div 
              className="text-center mb-16"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h1 className="text-4xl lg:text-6xl font-bold mb-6">About WebCraft Pro</h1>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                We're a passionate team of web developers, designers, and digital strategists committed to transforming your online presence.
              </p>
            </motion.div>

            <div className="grid lg:grid-cols-2 gap-12 items-center mb-20">
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <img 
                  src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600" 
                  alt="WebCraft Pro team working together"
                  className="rounded-2xl shadow-lg w-full h-auto"
                />
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
              >
                <h2 className="text-3xl font-bold mb-6">Our Story</h2>
                <p className="text-muted-foreground mb-6 leading-relaxed">
                  Founded in 2020, WebCraft Pro emerged from a simple belief: every business deserves a website that not only looks amazing but drives real results. We've grown from a small startup to a trusted partner for over 100 businesses across the United States.
                </p>
                <p className="text-muted-foreground leading-relaxed">
                  Our approach combines cutting-edge technology with human-centered design, ensuring that every website we create tells your unique story and connects with your audience in meaningful ways.
                </p>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Values Section */}
        <section className="py-20 bg-muted">
          <div className="container mx-auto px-6">
            <motion.div 
              className="text-center mb-16"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl font-bold mb-6">Our Values</h2>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                These core principles guide everything we do and shape how we serve our clients.
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {values.map((value, index) => (
                <motion.div
                  key={value.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <Card className="bg-background border-border hover:border-accent/50 transition-all duration-300 text-center h-full">
                    <CardContent className="p-6">
                      <div className="w-16 h-16 bg-accent/10 rounded-xl flex items-center justify-center mx-auto mb-4">
                        <value.icon className="w-8 h-8 text-accent" />
                      </div>
                      <h3 className="text-xl font-bold mb-3">{value.title}</h3>
                      <p className="text-muted-foreground text-sm">{value.description}</p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Remote Work Section */}
        <section className="py-20 bg-accent/5">
          <div className="container mx-auto px-6">
            <motion.div 
              className="text-center mb-16"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl font-bold mb-6">Global Remote Team</h2>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                Our distributed team works across time zones to provide 24/7 support and lightning-fast delivery for our clients worldwide.
              </p>
            </motion.div>

            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                viewport={{ once: true }}
              >
                <h3 className="text-2xl font-bold mb-6">Why Remote Works for Us</h3>
                <div className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-accent rounded-full mt-2"></div>
                    <p className="text-muted-foreground">Access to global talent pool ensuring the best expertise for your project</p>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-accent rounded-full mt-2"></div>
                    <p className="text-muted-foreground">24/7 development cycle with teams in different time zones</p>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-accent rounded-full mt-2"></div>
                    <p className="text-muted-foreground">Faster delivery times and round-the-clock support</p>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-accent rounded-full mt-2"></div>
                    <p className="text-muted-foreground">Cultural diversity brings innovative solutions and perspectives</p>
                  </div>
                </div>
              </motion.div>

              <motion.div
                className="space-y-6"
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                viewport={{ once: true }}
              >
                {/* Office Locations */}
                <div className="grid md:grid-cols-2 gap-6">
                  {/* San Francisco Office */}
                  <div className="relative rounded-2xl overflow-hidden shadow-lg">
                    <img 
                      src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=500" 
                      alt="San Francisco Office"
                      className="w-full h-64 object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
                    <div className="absolute bottom-4 left-4 text-white">
                      <div className="flex items-center space-x-2 mb-2">
                        <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
                        <span className="font-bold text-lg">San Francisco, USA</span>
                      </div>
                      <p className="text-sm opacity-90">Strategic & Business Operations</p>
                      <p className="text-xs opacity-75 mt-1">Golden Gate Bridge Area</p>
                    </div>
                  </div>

                  {/* Gwalior Office */}
                  <div className="relative rounded-2xl overflow-hidden shadow-lg">
                    <img 
                      src="https://images.unsplash.com/photo-1582407947304-fd86f028f716?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=500" 
                      alt="Gwalior Office"
                      className="w-full h-64 object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
                    <div className="absolute bottom-4 left-4 text-white">
                      <div className="flex items-center space-x-2 mb-2">
                        <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                        <span className="font-bold text-lg">Gwalior, India</span>
                      </div>
                      <p className="text-sm opacity-90">Development & Design Hub</p>
                      <p className="text-xs opacity-75 mt-1">Historic City of Madhya Pradesh</p>
                    </div>
                  </div>
                </div>

                {/* World Map with Connections */}
                <div className="relative bg-gradient-to-b from-blue-50 to-blue-100 dark:from-blue-950 dark:to-blue-900 rounded-2xl p-6 overflow-hidden">
                  <h4 className="text-lg font-semibold mb-4 text-center">Connected Globally</h4>
                  <svg viewBox="0 0 1000 400" className="w-full h-auto">
                    {/* Simplified World Map */}
                    <defs>
                      <pattern id="grid" width="20" height="20" patternUnits="userSpaceOnUse">
                        <path d="M 20 0 L 0 0 0 20" fill="none" stroke="#e2e8f0" strokeWidth="0.5"/>
                      </pattern>
                    </defs>
                    <rect width="1000" height="400" fill="url(#grid)" opacity="0.3"/>
                    
                    {/* Continents - Simplified shapes */}
                    <g fill="#94a3b8" opacity="0.6">
                      {/* North America */}
                      <path d="M50 80 Q200 60 350 100 L380 180 Q300 220 150 200 Q80 150 50 80"/>
                      {/* Europe */}
                      <path d="M400 60 Q500 50 550 80 L570 130 Q520 150 450 140 Q400 110 400 60"/>
                      {/* Asia */}
                      <path d="M550 70 Q750 50 900 90 L920 180 Q800 200 650 180 Q550 130 550 70"/>
                      {/* Africa */}
                      <path d="M420 160 Q500 150 580 170 L590 300 Q520 330 460 320 Q420 260 420 160"/>
                      {/* South America */}
                      <path d="M200 260 Q280 250 320 280 L310 380 Q260 410 220 400 Q180 360 200 260"/>
                      {/* Australia */}
                      <path d="M750 320 Q820 310 870 330 L860 360 Q810 370 770 360 Q750 340 750 320"/>
                    </g>

                    {/* San Francisco Location */}
                    <g>
                      <circle cx="120" cy="140" r="8" fill="#ef4444" className="animate-pulse"/>
                      <circle cx="120" cy="140" r="15" fill="none" stroke="#ef4444" strokeWidth="2" opacity="0.5">
                        <animate attributeName="r" values="15;25;15" dur="2s" repeatCount="indefinite"/>
                        <animate attributeName="opacity" values="0.5;0;0.5" dur="2s" repeatCount="indefinite"/>
                      </circle>
                      <text x="120" y="125" textAnchor="middle" className="text-xs font-semibold fill-current">San Francisco</text>
                    </g>

                    {/* Gwalior Location */}
                    <g>
                      <circle cx="720" cy="160" r="8" fill="#22c55e" className="animate-pulse"/>
                      <circle cx="720" cy="160" r="15" fill="none" stroke="#22c55e" strokeWidth="2" opacity="0.5">
                        <animate attributeName="r" values="15;25;15" dur="2s" repeatCount="indefinite" begin="1s"/>
                        <animate attributeName="opacity" values="0.5;0;0.5" dur="2s" repeatCount="indefinite" begin="1s"/>
                      </circle>
                      <text x="720" y="145" textAnchor="middle" className="text-xs font-semibold fill-current">Gwalior</text>
                    </g>

                    {/* Connection Line */}
                    <line x1="120" y1="140" x2="720" y2="160" stroke="#6366f1" strokeWidth="2" strokeDasharray="5,5" opacity="0.6">
                      <animate attributeName="stroke-dashoffset" values="0;10" dur="1s" repeatCount="indefinite"/>
                    </line>

                    {/* Data Flow Animation */}
                    <circle r="3" fill="#6366f1" opacity="0.8">
                      <animateMotion dur="3s" repeatCount="indefinite">
                        <path d="M120 140 Q420 100 720 160"/>
                      </animateMotion>
                    </circle>
                    <circle r="3" fill="#10b981" opacity="0.8">
                      <animateMotion dur="3s" repeatCount="indefinite" begin="1.5s">
                        <path d="M720 160 Q420 200 120 140"/>
                      </animateMotion>
                    </circle>
                  </svg>
                </div>

                {/* Time Zone Info */}
                <div className="grid md:grid-cols-2 gap-4 mt-4">
                  <div className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow border">
                    <div className="flex items-center space-x-3">
                      <div className="w-4 h-4 bg-red-500 rounded-full"></div>
                      <div>
                        <h5 className="font-semibold">San Francisco Hub</h5>
                        <p className="text-sm text-muted-foreground">PST (UTC-8) • Strategic Operations</p>
                      </div>
                    </div>
                  </div>
                  <div className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow border">
                    <div className="flex items-center space-x-3">
                      <div className="w-4 h-4 bg-green-500 rounded-full"></div>
                      <div>
                        <h5 className="font-semibold">Gwalior Hub</h5>
                        <p className="text-sm text-muted-foreground">IST (UTC+5:30) • Development Center</p>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Founder Section */}
        <section className="py-20 bg-background">
          <div className="container mx-auto px-6">
            <div className="max-w-4xl mx-auto text-center">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
              >
                <img 
                  src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=300" 
                  alt="Founder of WebCraft Pro"
                  className="w-32 h-32 rounded-full mx-auto mb-6 object-cover"
                />
                <h2 className="text-3xl font-bold mb-4">Meet Our Founder</h2>
                <h3 className="text-xl text-accent mb-6">John Smith, CEO & Lead Developer</h3>
                <p className="text-muted-foreground leading-relaxed max-w-2xl mx-auto">
                  "I started WebCraft Pro with a vision to democratize high-quality web development. 
                  Every business, regardless of size, should have access to professional, conversion-focused websites. 
                  Today, I'm proud to lead a team that shares this vision and continues to push the boundaries of what's possible in web development."
                </p>
              </motion.div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
      <ChatWidget />
    </div>
  );
}