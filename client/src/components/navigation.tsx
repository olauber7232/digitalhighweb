import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu, Code } from "lucide-react";
import { Link, useLocation } from "wouter";
import Logo from "@/components/logo";

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const [location] = useLocation();

  const navItems = [
    { href: "/", label: "Home" },
    { href: "/services", label: "Services" },
    { href: "/portfolio", label: "Portfolio" },
    { href: "/blog", label: "Blog" },
    { href: "/about", label: "About" },
    { href: "/contact", label: "Contact" },
  ];

  const closeMenu = () => {
    setIsOpen(false);
  };

  return (
    <nav className="fixed w-full z-50 bg-background/95 backdrop-blur-sm border-b border-border">
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <Logo size="default" />
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`transition-colors duration-200 ${
                  location === item.href 
                    ? "text-accent font-medium" 
                    : "text-muted-foreground hover:text-accent"
                }`}
              >
                {item.label}
              </Link>
            ))}
            <Link href="/proposal">
              <Button className="bg-primary hover:bg-primary/80 text-primary-foreground">
                Get Free Proposal
              </Button>
            </Link>
          </div>

          {/* Mobile Menu */}
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild className="md:hidden">
              <Button variant="ghost" size="icon">
                <Menu className="h-6 w-6" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px] sm:w-[400px]">
              <div className="flex flex-col space-y-4 mt-8">
                {navItems.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={closeMenu}
                    className={`text-left text-lg transition-colors ${
                      location === item.href 
                        ? "text-accent font-medium" 
                        : "text-muted-foreground hover:text-accent"
                    }`}
                  >
                    {item.label}
                  </Link>
                ))}
                <Link href="/proposal" onClick={closeMenu}>
                  <Button className="bg-primary hover:bg-primary/80 text-primary-foreground mt-4">
                    Get Free Proposal
                  </Button>
                </Link>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </nav>
  );
}