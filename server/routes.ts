import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";

// In-memory storage for blog posts and proposals
let blogPosts = [
  {
    id: 1,
    title: "10 Essential Website Features Every Business Needs in 2024",
    excerpt: "Discover the must-have features that make websites successful and drive conversions for modern businesses.",
    author: "John Smith",
    date: "2024-01-15",
    category: "Web Design",
    status: "published",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400",
    readTime: "5 min read",
    views: 1250,
    content: `<p>In today's digital landscape, having a website isn't enough—you need a website that converts visitors into customers...</p>`
  },
  {
    id: 2,
    title: "How AI Chatbots Can Increase Your Website Conversions by 300%",
    excerpt: "Learn how implementing AI chatbots on your website can dramatically improve customer engagement and sales.",
    author: "Sarah Johnson",
    date: "2024-01-10",
    category: "AI Technology",
    status: "published",
    image: "https://images.unsplash.com/photo-1531482615713-2afd69097998?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400",
    readTime: "7 min read",
    views: 890,
    content: `<p>Artificial Intelligence has revolutionized customer service, and AI chatbots are leading the charge...</p>`
  }
];

let proposals = [
  {
    id: 1,
    name: "John Smith",
    email: "john@example.com",
    businessType: "E-commerce",
    budget: "$2,500 - $5,000",
    requirements: "Need a complete e-commerce website with payment integration, inventory management, and customer portal. Looking for modern design with mobile optimization.",
    status: "pending",
    date: "2024-01-15",
    phone: "+1 (555) 123-4567"
  },
  {
    id: 2,
    name: "Sarah Johnson",
    email: "sarah@company.com",
    businessType: "Professional Services",
    budget: "$1,000 - $2,500",
    requirements: "Professional website for consulting firm. Need contact forms, service pages, team profiles, and blog functionality.",
    status: "reviewed",
    date: "2024-01-14",
    phone: "+1 (555) 234-5678"
  }
];

let nextBlogId = 3;
let nextProposalId = 3;

export async function registerRoutes(app: Express): Promise<Server> {
  // Blog API routes
  app.get("/api/blogs", (req, res) => {
    const published = req.query.published === 'true';
    const filteredPosts = published ? blogPosts.filter(post => post.status === 'published') : blogPosts;
    res.json(filteredPosts);
  });

  app.get("/api/blogs/:id", (req, res) => {
    const id = parseInt(req.params.id);
    const post = blogPosts.find(p => p.id === id);
    if (!post) {
      return res.status(404).json({ message: "Blog post not found" });
    }
    res.json(post);
  });

  app.post("/api/blogs", (req, res) => {
    const newPost = {
      id: nextBlogId++,
      ...req.body,
      views: 0,
      date: new Date().toISOString().split('T')[0]
    };
    blogPosts.push(newPost);
    res.status(201).json(newPost);
  });

  app.put("/api/blogs/:id", (req, res) => {
    const id = parseInt(req.params.id);
    const index = blogPosts.findIndex(p => p.id === id);
    if (index === -1) {
      return res.status(404).json({ message: "Blog post not found" });
    }
    blogPosts[index] = { ...blogPosts[index], ...req.body };
    res.json(blogPosts[index]);
  });

  app.delete("/api/blogs/:id", (req, res) => {
    const id = parseInt(req.params.id);
    const index = blogPosts.findIndex(p => p.id === id);
    if (index === -1) {
      return res.status(404).json({ message: "Blog post not found" });
    }
    blogPosts.splice(index, 1);
    res.json({ message: "Blog post deleted" });
  });

  app.get("/api/blogs/stats", (req, res) => {
    const stats = {
      total: blogPosts.length,
      published: blogPosts.filter(post => post.status === "published").length,
      draft: blogPosts.filter(post => post.status === "draft").length,
      totalViews: blogPosts.reduce((sum, post) => sum + (post.views || 0), 0)
    };
    res.json(stats);
  });

  // Proposal API routes
  app.get("/api/proposals", (req, res) => {
    res.json(proposals);
  });

  app.post("/api/proposals", (req, res) => {
    const newProposal = {
      id: nextProposalId++,
      ...req.body,
      status: "pending",
      date: new Date().toISOString().split('T')[0],
      phone: req.body.phone || "Not provided"
    };
    proposals.push(newProposal);
    res.status(201).json(newProposal);
  });

  app.put("/api/proposals/:id", (req, res) => {
    const id = parseInt(req.params.id);
    const index = proposals.findIndex(p => p.id === id);
    if (index === -1) {
      return res.status(404).json({ message: "Proposal not found" });
    }
    proposals[index] = { ...proposals[index], ...req.body };
    res.json(proposals[index]);
  });

  app.delete("/api/proposals/:id", (req, res) => {
    const id = parseInt(req.params.id);
    const index = proposals.findIndex(p => p.id === id);
    if (index === -1) {
      return res.status(404).json({ message: "Proposal not found" });
    }
    proposals.splice(index, 1);
    res.json({ message: "Proposal deleted" });
  });

  app.get("/api/proposals/stats", (req, res) => {
    const stats = {
      total: proposals.length,
      pending: proposals.filter(p => p.status === "pending").length,
      reviewed: proposals.filter(p => p.status === "reviewed").length,
      completed: proposals.filter(p => p.status === "completed").length
    };
    res.json(stats);
  });

  const httpServer = createServer(app);
  return httpServer;
}