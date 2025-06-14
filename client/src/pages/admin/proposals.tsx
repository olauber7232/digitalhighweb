import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { 
  Eye, 
  Trash2, 
  Search, 
  Filter,
  Download,
  Mail,
  Phone
} from "lucide-react";
import { motion } from "framer-motion";
import AdminLayout from "@/components/admin/admin-layout";
import { useToast } from "@/hooks/use-toast";

export default function AdminProposals() {
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  const [proposals, setProposals] = useState([
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
    },
    {
      id: 3,
      name: "Mike Chen",
      email: "mike@startup.com",
      businessType: "Technology",
      budget: "$5,000+",
      requirements: "SaaS landing page with user authentication, dashboard, and subscription management. Need modern UI/UX design.",
      status: "pending",
      date: "2024-01-13",
      phone: "+1 (555) 345-6789"
    },
    {
      id: 4,
      name: "Lisa Rodriguez",
      email: "lisa@restaurant.com",
      businessType: "Restaurant",
      budget: "$500 - $1,000",
      requirements: "Restaurant website with online menu, reservation system, and location information. Need food photography integration.",
      status: "completed",
      date: "2024-01-12",
      phone: "+1 (555) 456-7890"
    }
  ]);

  const filteredProposals = proposals.filter(proposal => {
    const matchesSearch = proposal.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         proposal.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         proposal.businessType.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "all" || proposal.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const handleStatusChange = (id: number, newStatus: string) => {
    setProposals(prev => prev.map(proposal => 
      proposal.id === id ? { ...proposal, status: newStatus } : proposal
    ));
    toast({
      title: "Status Updated",
      description: `Proposal status changed to ${newStatus}`,
    });
  };

  const handleDelete = (id: number) => {
    setProposals(prev => prev.filter(proposal => proposal.id !== id));
    toast({
      title: "Proposal Deleted",
      description: "The proposal has been removed.",
    });
  };

  const handleExport = () => {
    const csvContent = [
      ["Name", "Email", "Business Type", "Budget", "Status", "Date"],
      ...filteredProposals.map(p => [p.name, p.email, p.businessType, p.budget, p.status, p.date])
    ].map(row => row.join(",")).join("\n");

    const blob = new Blob([csvContent], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "proposals.csv";
    a.click();
    window.URL.revokeObjectURL(url);
  };

  return (
    <AdminLayout>
      <div className="space-y-8">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold">Proposal Management</h1>
            <p className="text-muted-foreground">Manage and track client proposal requests</p>
          </div>
          <Button onClick={handleExport}>
            <Download className="w-4 h-4 mr-2" />
            Export CSV
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
                    placeholder="Search proposals..."
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
                  All
                </Button>
                <Button
                  variant={statusFilter === "pending" ? "default" : "outline"}
                  onClick={() => setStatusFilter("pending")}
                  size="sm"
                >
                  Pending
                </Button>
                <Button
                  variant={statusFilter === "reviewed" ? "default" : "outline"}
                  onClick={() => setStatusFilter("reviewed")}
                  size="sm"
                >
                  Reviewed
                </Button>
                <Button
                  variant={statusFilter === "completed" ? "default" : "outline"}
                  onClick={() => setStatusFilter("completed")}
                  size="sm"
                >
                  Completed
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Proposals List */}
        <div className="space-y-4">
          {filteredProposals.map((proposal, index) => (
            <motion.div
              key={proposal.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <CardTitle className="text-xl">{proposal.name}</CardTitle>
                      <div className="flex items-center space-x-4 text-sm text-muted-foreground mt-2">
                        <div className="flex items-center">
                          <Mail className="w-4 h-4 mr-1" />
                          {proposal.email}
                        </div>
                        <div className="flex items-center">
                          <Phone className="w-4 h-4 mr-1" />
                          {proposal.phone}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Badge 
                        variant={
                          proposal.status === "pending" ? "secondary" :
                          proposal.status === "reviewed" ? "default" :
                          "outline"
                        }
                      >
                        {proposal.status}
                      </Badge>
                      <span className="text-sm text-muted-foreground">{proposal.date}</span>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-3 gap-4 mb-4">
                    <div>
                      <h4 className="font-medium text-sm">Business Type</h4>
                      <p className="text-muted-foreground">{proposal.businessType}</p>
                    </div>
                    <div>
                      <h4 className="font-medium text-sm">Budget Range</h4>
                      <p className="text-muted-foreground">{proposal.budget}</p>
                    </div>
                    <div>
                      <h4 className="font-medium text-sm">Status</h4>
                      <select
                        value={proposal.status}
                        onChange={(e) => handleStatusChange(proposal.id, e.target.value)}
                        className="text-sm border border-border rounded px-2 py-1 bg-background"
                      >
                        <option value="pending">Pending</option>
                        <option value="reviewed">Reviewed</option>
                        <option value="completed">Completed</option>
                      </select>
                    </div>
                  </div>
                  
                  <div className="mb-4">
                    <h4 className="font-medium text-sm mb-2">Requirements</h4>
                    <p className="text-muted-foreground text-sm leading-relaxed">
                      {proposal.requirements}
                    </p>
                  </div>

                  <div className="flex justify-end space-x-2">
                    <Button size="sm" variant="outline">
                      <Eye className="w-4 h-4 mr-1" />
                      View Details
                    </Button>
                    <Button 
                      size="sm" 
                      variant="outline"
                      className="text-red-500 hover:text-red-600"
                      onClick={() => handleDelete(proposal.id)}
                    >
                      <Trash2 className="w-4 h-4 mr-1" />
                      Delete
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {filteredProposals.length === 0 && (
          <Card>
            <CardContent className="p-12 text-center">
              <p className="text-muted-foreground">No proposals found matching your criteria.</p>
            </CardContent>
          </Card>
        )}
      </div>
    </AdminLayout>
  );
}