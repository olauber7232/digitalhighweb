import { useLocation } from "wouter";
import Navigation from "@/components/navigation";
import Footer from "@/components/footer";
import ChatWidget from "@/components/chat-widget";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Calendar, User, ArrowLeft, Clock } from "lucide-react";
import { motion } from "framer-motion";
import { Link } from "wouter";
import { getBlogPost } from "@/data/blog-data";

export default function BlogPost() {
  const [location] = useLocation();
  const postId = parseInt(location.split('/')[2]);
  
  const post = getBlogPost(postId);
  
  if (!post) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">Post Not Found</h1>
          <Link href="/blog">
            <Button>Back to Blog</Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <Navigation />
      <main className="pt-20">
        <article className="py-20">
          <div className="container mx-auto px-6 max-w-4xl">
            <Link href="/blog">
              <Button variant="ghost" className="mb-8">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Blog
              </Button>
            </Link>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <Badge className="mb-4">{post.category}</Badge>
              <h1 className="text-4xl lg:text-5xl font-bold mb-6">{post.title}</h1>
              
              <div className="flex items-center space-x-6 text-muted-foreground mb-8">
                <div className="flex items-center">
                  <User className="w-4 h-4 mr-2" />
                  {post.author}
                </div>
                <div className="flex items-center">
                  <Calendar className="w-4 h-4 mr-2" />
                  {new Date(post.date).toLocaleDateString()}
                </div>
                <div className="flex items-center">
                  <Clock className="w-4 h-4 mr-2" />
                  {post.readTime}
                </div>
              </div>

              <img 
                src={post.image} 
                alt={post.title}
                className="w-full h-64 lg:h-96 object-cover rounded-xl mb-8"
              />

              <div 
                className="prose prose-lg dark:prose-invert max-w-none"
                dangerouslySetInnerHTML={{ __html: post.content }}
              />
            </motion.div>
          </div>
        </article>
      </main>
      <Footer />
      <ChatWidget />
    </div>
  );
}