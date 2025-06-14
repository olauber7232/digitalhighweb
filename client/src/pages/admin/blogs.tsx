import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { 
  Plus, 
  Edit, 
  Trash2, 
  Search, 
  Eye,
  Calendar,
  User
} from "lucide-react";
import { motion } from "framer-motion";
import AdminLayout from "@/components/admin/admin-layout";
import { useToast } from "@/hooks/use-toast";
import { useLocation } from "wouter";
import { getAllBlogPosts, deleteBlogPost, updateBlogPost, type BlogPost } from "@/data/blog-data";

export default function AdminBlogs() {
  const { toast } = useToast();
  const [, setLocation] = useLocation();
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [blogs, setBlogs] = useState<BlogPost[]>([]);

  // Load blogs from the centralized data
  useEffect(() => {
    setBlogs(getAllBlogPosts());
  }, []);

  const filteredBlogs = blogs.filter(blog => {
    const matchesSearch = blog.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         blog.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         blog.author.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "all" || blog.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const handleDelete = (id: number) => {
    if (deleteBlogPost(id)) {
      setBlogs(getAllBlogPosts());
      toast({
        title: "Blog Post Deleted",
        description: "The blog post has been removed.",
      });
    }
  };

  const handleStatusChange = (id: number, newStatus: "draft" | "published") => {
    const updatedPost = updateBlogPost(id, { status: newStatus });
    if (updatedPost) {
      setBlogs(getAllBlogPosts());
      toast({
        title: "Status Updated",
        description: `Blog post status changed to ${newStatus}`,
      });
    }
  };

  return (
    <AdminLayout>
      <div className="space-y-8">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold">Blog Management</h1>
            <p className="text-muted-foreground">Create, edit, and manage blog posts</p>
          </div>
          <Button onClick={() => setLocation("/admin/blogs/new")}>
            <Plus className="w-4 h-4 mr-2" />
            New Post
          </Button>
        </div>

        {/* Filters */}
        <Card>
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                  <Input
                    placeholder="Search blog posts..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
              <div className="flex gap-2">
                <Button
                  variant={statusFilter === "all" ? "default" : "outline"}
                  onClick={() => setStatusFilter("all")}
                  size="sm"
                >
                  All ({blogs.length})
                </Button>
                <Button
                  variant={statusFilter === "published" ? "default" : "outline"}
                  onClick={() => setStatusFilter("published")}
                  size="sm"
                >
                  Published ({blogs.filter(b => b.status === "published").length})
                </Button>
                <Button
                  variant={statusFilter === "draft" ? "default" : "outline"}
                  onClick={() => setStatusFilter("draft")}
                  size="sm"
                >
                  Draft ({blogs.filter(b => b.status === "draft").length})
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Blog Posts Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredBlogs.map((blog, index) => (
            <motion.div
              key={blog.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card className="hover:shadow-lg transition-shadow h-full">
                <div className="relative">
                  <img 
                    src={blog.image} 
                    alt={blog.title}
                    className="w-full h-48 object-cover rounded-t-lg"
                  />
                  <div className="absolute top-4 left-4">
                    <Badge 
                      variant={blog.status === "published" ? "default" : "secondary"}
                    >
                      {blog.status}
                    </Badge>
                  </div>
                </div>
                
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg leading-tight line-clamp-2">
                    {blog.title}
                  </CardTitle>
                  <div className="flex items-center space-x-4 text-xs text-muted-foreground">
                    <div className="flex items-center">
                      <User className="w-3 h-3 mr-1" />
                      {blog.author}
                    </div>
                    <div className="flex items-center">
                      <Calendar className="w-3 h-3 mr-1" />
                      {new Date(blog.date).toLocaleDateString()}
                    </div>
                  </div>
                </CardHeader>
                
                <CardContent className="pt-0">
                  <p className="text-sm text-muted-foreground mb-4 line-clamp-3">
                    {blog.excerpt}
                  </p>
                  
                  <div className="flex items-center justify-between mb-4">
                    <Badge variant="outline">{blog.category}</Badge>
                    <span className="text-xs text-muted-foreground">
                      {blog.views || 0} views
                    </span>
                  </div>

                  <div className="flex items-center justify-between">
                    <select
                      value={blog.status}
                      onChange={(e) => handleStatusChange(blog.id, e.target.value as "draft" | "published")}
                      className="text-xs border border-border rounded px-2 py-1 bg-background"
                    >
                      <option value="draft">Draft</option>
                      <option value="published">Published</option>
                    </select>
                    
                    <div className="flex space-x-1">
                      <Button 
                        size="sm" 
                        variant="ghost" 
                        className="h-8 w-8 p-0"
                        onClick={() => window.open(`/blog/${blog.id}`, '_blank')}
                      >
                        <Eye className="w-3 h-3" />
                      </Button>
                      <Button 
                        size="sm" 
                        variant="ghost" 
                        className="h-8 w-8 p-0"
                        onClick={() => setLocation(`/admin/blogs/edit/${blog.id}`)}
                      >
                        <Edit className="w-3 h-3" />
                      </Button>
                      <Button 
                        size="sm" 
                        variant="ghost" 
                        className="h-8 w-8 p-0 text-red-500 hover:text-red-600"
                        onClick={() => handleDelete(blog.id)}
                      >
                        <Trash2 className="w-3 h-3" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {filteredBlogs.length === 0 && (
          <Card>
            <CardContent className="p-12 text-center">
              <p className="text-muted-foreground">No blog posts found matching your criteria.</p>
              <Button 
                className="mt-4" 
                onClick={() => setLocation("/admin/blogs/new")}
              >
                <Plus className="w-4 h-4 mr-2" />
                Create Your First Blog Post
              </Button>
            </CardContent>
          </Card>
        )}
      </div>
    </AdminLayout>
  );
}