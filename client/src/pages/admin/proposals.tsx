import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { 
  Eye, 
  Trash2, 
  Search, 
  Download,
  Mail,
  Phone
} from "lucide-react";
import { motion } from "framer-motion";
import AdminLayout from "@/components/admin/admin-layout";
import { useToast } from "@/hooks/use-toast";

interface Proposal {
  id: number;
  name: string;
  email: string;
  businessType: string;
  budget: string;
  requirements: string;
  status: string;
  date: string;
  phone?: string;
}

export default function AdminProposals() {
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [proposals, setProposals] = useState<Proposal[]>([]);
  const [loading, setLoading] = useState(true);

  // Load proposals from API
  const loadProposals = async () => {
    try {
      const response = await fetch('/api/proposals');
      if (!response.ok) throw new Error('Failed to fetch proposals');
      const proposalData = await response.json();
      setProposals(proposalData);
    } catch (error) {
      console.error('Error loading proposals:', error);
      toast({
        title: "Error",
        description: "Failed to load proposals.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadProposals();
  }, []);

  const filteredProposals = proposals.filter(proposal => {
    const matchesSearch = proposal.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         proposal.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         proposal.businessType.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "all" || proposal.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const handleStatusChange = async (id: number, newStatus: string) => {
    try {
      const response = await fetch(`/api/proposals/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status: newStatus }),
      });
      
      if (!response.ok) throw new Error('Failed to update proposal');
      
      await loadProposals(); // Reload proposals
      toast({
        title: "Status Updated",
        description: `Proposal status changed to ${newStatus}`,
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update proposal status.",
        variant: "destructive",
      });
    }
  };

  const handleDelete = async (id: number) => {
    try {
      const response = await fetch(`/api/proposals/${id}`, {
        method: 'DELETE',
      });
      
      if (!response.ok) throw new Error('Failed to delete proposal');
      
      await loadProposals(); // Reload proposals
      toast({
        title: "Proposal Deleted",
        description: "The proposal has been removed.",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to delete proposal.",
        variant: "destructive",
      });
    }
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

  if (loading) {
    return (
      <AdminLayout>
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-accent"></div>
        </div>
      </AdminLayout>
    );
  }

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
                  All ({proposals.length})
                </Button>
                <Button
                  variant={statusFilter === "pending" ? "default" : "outline"}
                  onClick={() => setStatusFilter("pending")}
                  size="sm"
                >
                  Pending ({proposals.filter(p => p.status === "pending").length})
                </Button>
                <Button
                  variant={statusFilter === "reviewed" ? "default" : "outline"}
                  onClick={() => setStatusFilter("reviewed")}
                  size="sm"
                >
                  Reviewed ({proposals.filter(p => p.status === "reviewed").length})
                </Button>
                <Button
                  variant={statusFilter === "completed" ? "default" : "outline"}
                  onClick={() => setStatusFilter("completed")}
                  size="sm"
                >
                  Completed ({proposals.filter(p => p.status === "completed").length})
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
                        {proposal.phone && (
                          <div className="flex items-center">
                            <Phone className="w-4 h-4 mr-1" />
                            {proposal.phone}
                          </div>
                        )}
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