import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, Home, Building2, BookOpen, Phone } from "lucide-react";
import { Button } from "./ui/button";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { path: "/", label: "Home", icon: Home },
    { path: "/properties", label: "Properties", icon: Building2 },
    { path: "/our-story", label: "Our Story", icon: BookOpen },
    { path: "/contact", label: "Contact", icon: Phone },
  ];

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-smooth ${
        isScrolled
          ? "bg-background/96 backdrop-blur-lg shadow-soft border-b border-border"
          : "bg-background/80 backdrop-blur-sm"
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2 group">
            <div className="flex items-center justify-center h-10 w-10 rounded-full bg-white/90 shadow-soft mr-2">
              <Building2 className="h-6 w-6 text-primary" />
            </div>
            <div>
              <span className="text-xl md:text-2xl font-extrabold text-foreground transition-smooth">
                JP & Siva
              </span>
              <div className="text-xs text-muted-foreground">
                Premium Properties
              </div>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`relative text-sm font-medium transition-smooth hover:text-primary after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-full after:origin-left after:scale-x-0 after:bg-primary after:transition-transform hover:after:scale-x-100 ${
                  location.pathname === link.path
                    ? "text-primary after:scale-x-100"
                    : "text-foreground/80"
                }`}
              >
                {link.label}
              </Link>
            ))}
            <Link to="/admin">
              <Button size="sm" className="btn-pleasant">
                Admin Login
              </Button>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </Button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden py-4 animate-slide-up">
            <div className="flex flex-col space-y-4">
              {navLinks.map((link, index) => {
                const Icon = link.icon;
                return (
                  <Link
                    key={link.path}
                    to={link.path}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={`flex items-center space-x-3 px-4 py-2 rounded-lg transition-smooth hover-lift ${
                      location.pathname === link.path
                        ? "bg-primary/10 text-primary shadow-soft"
                        : "text-foreground/80 hover:bg-muted"
                    }`}
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <Icon className="h-5 w-5 transition-smooth group-hover:scale-110" />
                    <span className="font-medium">{link.label}</span>
                  </Link>
                );
              })}
              <Link to="/admin" onClick={() => setIsMobileMenuOpen(false)}>
                <Button className="w-full gradient-hero hover-glow transition-smooth hover:scale-105">
                  Admin Login
                </Button>
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
