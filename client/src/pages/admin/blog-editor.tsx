import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Save, ArrowLeft, Eye } from "lucide-react";
import { motion } from "framer-motion";
import AdminLayout from "@/components/admin/admin-layout";
import { useToast } from "@/hooks/use-toast";
import { useLocation } from "wouter";
import { getBlogPost, createBlogPost, updateBlogPost, type BlogPost } from "@/data/blog-data";

export default function BlogEditor() {
  const { toast } = useToast();
  const [location, setLocation] = useLocation();
  const isEditing = location.includes("/edit/");
  const blogId = isEditing ? parseInt(location.split("/").pop() || "0") : null;

  const [formData, setFormData] = useState({
    title: "",
    excerpt: "",
    content: "",
    category: "",
    author: "Admin",
    status: "draft" as "draft" | "published",
    image: "",
    readTime: "5 min read"
  });

  useEffect(() => {
    if (isEditing && blogId) {
      const existingPost = getBlogPost(blogId);
      if (existingPost) {
        setFormData({
          title: existingPost.title,
          excerpt: existingPost.excerpt,
          content: existingPost.content,
          category: existingPost.category,
          author: existingPost.author,
          status: existingPost.status,
          image: existingPost.image,
          readTime: existingPost.readTime
        });
      }
    }
  }, [isEditing, blogId]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.title || !formData.excerpt || !formData.content || !formData.category) {
      toast({
        title: "Missing Required Fields",
        description: "Please fill in all required fields.",
        variant: "destructive",
      });
      return;
    }

    const blogData = {
      ...formData,
      date: new Date().toISOString().split('T')[0], // Current date in YYYY-MM-DD format
    };

    try {
      if (isEditing && blogId) {
        const updatedPost = updateBlogPost(blogId, blogData);
        if (updatedPost) {
          toast({
            title: "Blog Updated",
            description: "Blog post has been updated successfully.",
          });
        } else {
          throw new Error("Failed to update blog post");
        }
      } else {
        createBlogPost(blogData);
        toast({
          title: "Blog Created",
          description: "Blog post has been created successfully.",
        });
      }
      
      setLocation("/admin/blogs");
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to save blog post. Please try again.",
        variant: "destructive",
      });
    }
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handlePreview = () => {
    if (isEditing && blogId) {
      window.open(`/blog/${blogId}`, '_blank');
    } else {
      toast({
        title: "Save First",
        description: "Please save the blog post before previewing.",
      });
    }
  };

  return (
    <AdminLayout>
      <div className="space-y-8">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Button variant="ghost" onClick={() => setLocation("/admin/blogs")}>
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Blogs
            </Button>
            <div>
              <h1 className="text-3xl font-bold">
                {isEditing ? "Edit Blog Post" : "Create New Blog Post"}
              </h1>
              <p className="text-muted-foreground">
                {isEditing ? "Update your blog post" : "Write and publish a new blog post"}
              </p>
            </div>
          </div>
          <div className="flex space-x-2">
            <Button variant="outline" onClick={handlePreview}>
              <Eye className="w-4 h-4 mr-2" />
              Preview
            </Button>
            <Button form="blog-form" type="submit">
              <Save className="w-4 h-4 mr-2" />
              {isEditing ? "Update" : "Save"}
            </Button>
          </div>
        </div>

        {/* Editor */}
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>Content</CardTitle>
              </CardHeader>
              <CardContent>
                <form id="blog-form" onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <Label htmlFor="title">Title *</Label>
                    <Input
                      id="title"
                      value={formData.title}
                      onChange={(e) => handleInputChange("title", e.target.value)}
                      placeholder="Enter blog post title..."
                      required
                    />
                  </div>

                  <div>
                    <Label htmlFor="excerpt">Excerpt *</Label>
                    <Textarea
                      id="excerpt"
                      value={formData.excerpt}
                      onChange={(e) => handleInputChange("excerpt", e.target.value)}
                      placeholder="Brief description of the blog post..."
                      rows={3}
                      required
                    />
                  </div>

                  <div>
                    <Label htmlFor="content">Content *</Label>
                    <Textarea
                      id="content"
                      value={formData.content}
                      onChange={(e) => handleInputChange("content", e.target.value)}
                      placeholder="Write your blog post content here... You can use HTML tags for formatting."
                      rows={20}
                      required
                      className="font-mono text-sm"
                    />
                    <p className="text-xs text-muted-foreground mt-2">
                      You can use HTML tags for formatting (h2, h3, p, ul, li, strong, em, etc.)
                    </p>
                  </div>
                </form>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Publish Settings */}
            <Card>
              <CardHeader>
                <CardTitle>Publish Settings</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="status">Status</Label>
                  <Select value={formData.status} onValueChange={(value: "draft" | "published") => handleInputChange("status", value)}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="draft">Draft</SelectItem>
                      <SelectItem value="published">Published</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="author">Author</Label>
                  <Input
                    id="author"
                    value={formData.author}
                    onChange={(e) => handleInputChange("author", e.target.value)}
                    placeholder="Author name"
                  />
                </div>

                <div>
                  <Label htmlFor="category">Category *</Label>
                  <Select value={formData.category} onValueChange={(value) => handleInputChange("category", value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Web Design">Web Design</SelectItem>
                      <SelectItem value="AI Technology">AI Technology</SelectItem>
                      <SelectItem value="Performance">Performance</SelectItem>
                      <SelectItem value="Security">Security</SelectItem>
                      <SelectItem value="Mobile Design">Mobile Design</SelectItem>
                      <SelectItem value="SEO">SEO</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="readTime">Read Time</Label>
                  <Input
                    id="readTime"
                    value={formData.readTime}
                    onChange={(e) => handleInputChange("readTime", e.target.value)}
                    placeholder="5 min read"
                  />
                </div>
              </CardContent>
            </Card>

            {/* Featured Image */}
            <Card>
              <CardHeader>
                <CardTitle>Featured Image</CardTitle>
              </CardHeader>
              <CardContent>
                <div>
                  <Label htmlFor="image">Image URL</Label>
                  <Input
                    id="image"
                    value={formData.image}
                    onChange={(e) => handleInputChange("image", e.target.value)}
                    placeholder="https://example.com/image.jpg"
                  />
                </div>
                {formData.image && (
                  <div className="mt-4">
                    <img 
                      src={formData.image} 
                      alt="Preview"
                      className="w-full h-32 object-cover rounded-lg"
                      onError={(e) => {
                        e.currentTarget.style.display = 'none';
                      }}
                    />
                  </div>
                )}
              </CardContent>
            </Card>

            {/* SEO Settings */}
            <Card>
              <CardHeader>
                <CardTitle>SEO Settings</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label>Meta Title</Label>
                  <Input 
                    value={formData.title} 
                    disabled 
                    className="bg-muted"
                    placeholder="Auto-generated from title" 
                  />
                </div>
                <div>
                  <Label>Meta Description</Label>
                  <Textarea 
                    value={formData.excerpt} 
                    disabled 
                    className="bg-muted"
                    rows={3} 
                    placeholder="Auto-generated from excerpt" 
                  />
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}