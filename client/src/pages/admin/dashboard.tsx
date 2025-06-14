import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  FileText, 
  Users, 
  MessageSquare, 
  TrendingUp, 
  LogOut,
  Plus,
  Eye,
  Edit,
  Trash2
} from "lucide-react";
import { motion } from "framer-motion";
import { useLocation } from "wouter";
import { useToast } from "@/hooks/use-toast";
import AdminLayout from "@/components/admin/admin-layout";
import { getBlogStats, getAllBlogPosts } from "@/data/blog-data";

export default function AdminDashboard() {
  const [, setLocation] = useLocation();
  const { toast } = useToast();

  // Get real blog stats
  const blogStats = getBlogStats();
  const recentBlogs = getAllBlogPosts().slice(0, 3);

  // Mock data for proposals - in production, this would come from your backend
  const [stats] = useState({
    totalProposals: 24,
    pendingProposals: 8,
    totalViews: blogStats.totalViews
  });

  const [recentProposals] = useState([
    {
      id: 1,
      name: "John Smith",
      email: "john@example.com",
      businessType: "E-commerce",
      budget: "$2,500 - $5,000",
      status: "pending",
      date: "2024-01-15"
    },
    {
      id: 2,
      name: "Sarah Johnson",
      email: "sarah@company.com",
      businessType: "Professional Services",
      budget: "$1,000 - $2,500",
      status: "reviewed",
      date: "2024-01-14"
    },
    {
      id: 3,
      name: "Mike Chen",
      email: "mike@startup.com",
      businessType: "Technology",
      budget: "$5,000+",
      status: "pending",
      date: "2024-01-13"
    }
  ]);

  const handleLogout = () => {
    localStorage.removeItem("adminAuth");
    localStorage.removeItem("adminLoginTime");
    toast({
      title: "Logged Out",
      description: "You have been successfully logged out.",
    });
    setLocation("/admin/login");
  };

  return (
    <AdminLayout>
      <div className="space-y-8">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold">Dashboard</h1>
            <p className="text-muted-foreground">Welcome back! Here's what's happening.</p>
          </div>
          <Button variant="outline" onClick={handleLogout}>
            <LogOut className="w-4 h-4 mr-2" />
            Logout
          </Button>
        </div>

        {/* Stats Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Proposals</CardTitle>
                <FileText className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stats.totalProposals}</div>
                <p className="text-xs text-muted-foreground">
                  +12% from last month
                </p>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Pending Proposals</CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stats.pendingProposals}</div>
                <p className="text-xs text-muted-foreground">
                  Requires attention
                </p>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Blog Posts</CardTitle>
                <MessageSquare className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{blogStats.total}</div>
                <p className="text-xs text-muted-foreground">
                  {blogStats.published} published, {blogStats.draft} drafts
                </p>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Views</CardTitle>
                <TrendingUp className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stats.totalViews.toLocaleString()}</div>
                <p className="text-xs text-muted-foreground">
                  Blog post views
                </p>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Recent Activity */}
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Recent Proposals */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle>Recent Proposals</CardTitle>
                <Button 
                  size="sm" 
                  onClick={() => setLocation("/admin/proposals")}
                >
                  View All
                </Button>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentProposals.map((proposal) => (
                    <div key={proposal.id} className="flex items-center justify-between p-3 border border-border rounded-lg">
                      <div className="flex-1">
                        <h4 className="font-medium">{proposal.name}</h4>
                        <p className="text-sm text-muted-foreground">{proposal.businessType} • {proposal.budget}</p>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Badge variant={proposal.status === "pending" ? "secondary" : "default"}>
                          {proposal.status}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Recent Blog Posts */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
          >
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle>Recent Blog Posts</CardTitle>
                <Button 
                  size="sm"
                  onClick={() => setLocation("/admin/blogs/new")}
                >
                  <Plus className="w-4 h-4 mr-1" />
                  New Post
                </Button>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentBlogs.map((blog) => (
                    <div key={blog.id} className="flex items-center justify-between p-3 border border-border rounded-lg">
                      <div className="flex-1">
                        <h4 className="font-medium text-sm line-clamp-1">{blog.title}</h4>
                        <p className="text-xs text-muted-foreground">{blog.views || 0} views • {new Date(blog.date).toLocaleDateString()}</p>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Badge variant={blog.status === "published" ? "default" : "secondary"}>
                          {blog.status}
                        </Badge>
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
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </AdminLayout>
  );
}