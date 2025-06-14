import Navigation from "@/components/navigation";
import Footer from "@/components/footer";
import ChatWidget from "@/components/chat-widget";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar, User, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { Link } from "wouter";
import { useState } from "react";
import { getBlogPosts } from "@/data/blog-data";

export default function Blog() {
  const [visiblePosts, setVisiblePosts] = useState(6);
  const [selectedCategory, setSelectedCategory] = useState("All");
  
  const blogPosts = getBlogPosts(); // Get published posts only
  
  const categories = ["All", ...Array.from(new Set(blogPosts.map(post => post.category)))];

  const filteredPosts = blogPosts.filter(post => 
    selectedCategory === "All" || post.category === selectedCategory
  );

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
              <h1 className="text-4xl lg:text-6xl font-bold mb-6">Our Blog</h1>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                Stay updated with the latest web development trends, tips, and insights from our expert team.
              </p>
            </motion.div>

            {/* Category Filter */}
            <motion.div 
              className="flex flex-wrap justify-center gap-4 mb-12"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              {categories.map((category) => (
                <Button
                  key={category}
                  variant={selectedCategory === category ? "default" : "secondary"}
                  className={`${
                    selectedCategory === category 
                      ? "bg-accent text-accent-foreground" 
                      : "bg-muted hover:bg-accent hover:text-accent-foreground"
                  } transition-all`}
                  onClick={() => {
                    setSelectedCategory(category);
                    setVisiblePosts(6);
                  }}
                >
                  {category}
                </Button>
              ))}
            </motion.div>

            {/* Blog Grid */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredPosts
                .slice(0, visiblePosts)
                .map((post, index) => (
                <motion.div
                  key={post.id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                >
                  <Card className="group cursor-pointer overflow-hidden border-border hover:border-accent/50 transition-all duration-300 transform hover:-translate-y-2 h-full">
                    <div className="relative overflow-hidden">
                      <img 
                        src={post.image} 
                        alt={post.title}
                        className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                      <div className="absolute top-4 left-4">
                        <Badge variant="secondary" className="bg-accent text-accent-foreground">
                          {post.category}
                        </Badge>
                      </div>
                    </div>
                    <CardHeader className="pb-3">
                      <h3 className="text-xl font-bold leading-tight group-hover:text-accent transition-colors">
                        {post.title}
                      </h3>
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground mb-4 text-sm leading-relaxed">
                        {post.excerpt}
                      </p>
                      <div className="flex items-center justify-between text-xs text-muted-foreground mb-4">
                        <div className="flex items-center space-x-4">
                          <div className="flex items-center">
                            <User className="w-3 h-3 mr-1" />
                            {post.author}
                          </div>
                          <div className="flex items-center">
                            <Calendar className="w-3 h-3 mr-1" />
                            {new Date(post.date).toLocaleDateString()}
                          </div>
                        </div>
                        <span>{post.readTime}</span>
                      </div>
                      <Link href={`/blog/${post.id}`}>
                        <Button 
                          variant="ghost" 
                          className="text-accent hover:text-accent-foreground hover:bg-accent/10 p-0"
                        >
                          Read More <ArrowRight className="w-4 h-4 ml-1" />
                        </Button>
                      </Link>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>

            {/* Load More Button */}
            {filteredPosts.length > visiblePosts && (
              <motion.div 
                className="text-center mt-12"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.8 }}
              >
                <Button 
                  variant="outline" 
                  size="lg" 
                  className="border-accent text-accent hover:bg-accent hover:text-accent-foreground"
                  onClick={() => setVisiblePosts(prev => prev + 6)}
                >
                  Load More Articles
                </Button>
              </motion.div>
            )}

            {filteredPosts.length === 0 && (
              <div className="text-center py-12">
                <p className="text-muted-foreground">No blog posts found in this category.</p>
              </div>
            )}
          </div>
        </section>
      </main>
      <Footer />
      <ChatWidget />
    </div>
  );
}