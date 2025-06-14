import { useEffect } from "react";
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { 
  LayoutDashboard, 
  FileText, 
  MessageSquare, 
  Settings,
  LogOut
} from "lucide-react";
import Logo from "@/components/logo";
import { useToast } from "@/hooks/use-toast";

interface AdminLayoutProps {
  children: React.ReactNode;
}

export default function AdminLayout({ children }: AdminLayoutProps) {
  const [location, setLocation] = useLocation();
  const { toast } = useToast();

  useEffect(() => {
    // Check authentication
    const isAuthenticated = localStorage.getItem("adminAuth");
    const loginTime = localStorage.getItem("adminLoginTime");
    
    if (!isAuthenticated) {
      setLocation("/admin/login");
      return;
    }

    // Check session timeout (24 hours)
    if (loginTime) {
      const now = Date.now();
      const sessionAge = now - parseInt(loginTime);
      const maxAge = 24 * 60 * 60 * 1000; // 24 hours

      if (sessionAge > maxAge) {
        localStorage.removeItem("adminAuth");
        localStorage.removeItem("adminLoginTime");
        toast({
          title: "Session Expired",
          description: "Please log in again.",
          variant: "destructive",
        });
        setLocation("/admin/login");
        return;
      }
    }
  }, [setLocation, toast]);

  const handleLogout = () => {
    localStorage.removeItem("adminAuth");
    localStorage.removeItem("adminLoginTime");
    toast({
      title: "Logged Out",
      description: "You have been successfully logged out.",
    });
    setLocation("/admin/login");
  };

  const navItems = [
    { href: "/admin/dashboard", label: "Dashboard", icon: LayoutDashboard },
    { href: "/admin/proposals", label: "Proposals", icon: FileText },
    { href: "/admin/blogs", label: "Blog Posts", icon: MessageSquare },
    { href: "/admin/settings", label: "Settings", icon: Settings },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Sidebar */}
      <div className="fixed inset-y-0 left-0 w-64 bg-muted border-r border-border">
        <div className="flex flex-col h-full">
          {/* Logo */}
          <div className="p-6 border-b border-border">
            <Logo size="default" />
          </div>

          {/* Navigation */}
          <nav className="flex-1 p-4 space-y-2">
            {navItems.map((item) => (
              <Button
                key={item.href}
                variant={location === item.href ? "default" : "ghost"}
                className={`w-full justify-start ${
                  location === item.href 
                    ? "bg-accent text-accent-foreground" 
                    : "hover:bg-accent/10"
                }`}
                onClick={() => setLocation(item.href)}
              >
                <item.icon className="w-4 h-4 mr-3" />
                {item.label}
              </Button>
            ))}
          </nav>

          {/* Logout */}
          <div className="p-4 border-t border-border">
            <Button
              variant="ghost"
              className="w-full justify-start text-red-500 hover:text-red-600 hover:bg-red-50"
              onClick={handleLogout}
            >
              <LogOut className="w-4 h-4 mr-3" />
              Logout
            </Button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="ml-64">
        <main className="p-8">
          {children}
        </main>
      </div>
    </div>
  );
}