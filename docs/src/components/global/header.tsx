"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, X, Github } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";
import GitHubStars from "./github-stars";
import ThemeToggle from "./theme-toggle";
import Logo from "./logo";

interface HeaderProps {
  sticky?: boolean;
}

const Header = ({ sticky = true }: HeaderProps) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const isMobile = useIsMobile();

  const navLinks = [
    { href: "#features", label: "Features" },
    { href: "#usage", label: "Usage" },
    { href: "#config", label: "Configuration" },
  ];

  const handleNavClick = () => {
    setMobileMenuOpen(false);
  };

  const handleLogoClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: "smooth" });
    window.history.pushState({}, "", "/");
  };

  return (
    <header
      className={`border-b border-border/40 bg-background/80 backdrop-blur-xl supports-backdrop-filter:bg-background/60 ${
        sticky ? "sticky top-0 z-50" : ""
      }`}
    >
      <div className="max-w-6xl mx-auto flex items-center justify-between py-4 px-4 md:px-8">
        <Link
          href="/"
          onClick={handleLogoClick}
          className="flex items-center gap-3 group"
        >
          <Logo
            width={40}
            height={40}
            priority
            className="transition-transform group-hover:scale-105"
          />
          <div className="hidden sm:block">
            <div className="text-lg font-bold tracking-tight group-hover:text-green-600 transition-colors">
              mongoose-qb
            </div>
            <p className="text-xs text-muted-foreground">Query Builder</p>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors relative group"
            >
              {link.label}
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-green-500 group-hover:w-full transition-all" />
            </a>
          ))}
        </nav>

        {/* Desktop Actions */}
        <div className="hidden md:flex items-center gap-3">
          <GitHubStars />
          <a
            href="https://github.com/devababil/mongoose-qb"
            target="_blank"
            rel="noopener noreferrer"
            className="hidden lg:flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-all"
          >
            <Github className="h-4 w-4" />
            <span>GitHub</span>
          </a>
          <ThemeToggle />
        </div>

        {/* Mobile Actions */}
        <div className="flex md:hidden items-center gap-2">
          <GitHubStars />
          <ThemeToggle />
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-lg hover:bg-muted/50 transition-colors"
            aria-label="Toggle menu"
            type="button"
          >
            {mobileMenuOpen ? (
              <X className="h-5 w-5" />
            ) : (
              <Menu className="h-5 w-5" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobile && mobileMenuOpen && (
        <div className="md:hidden border-t border-border/20">
          <nav className="max-w-6xl mx-auto px-4 py-4 flex flex-col gap-4">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={handleNavClick}
                className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors py-2"
              >
                {link.label}
              </a>
            ))}
            <div className="pt-2 border-t border-border/20">
              <a
                href="https://github.com/devababil/mongoose-qb"
                target="_blank"
                rel="noopener noreferrer"
                onClick={handleNavClick}
                className="flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-foreground py-2"
              >
                <Github className="h-4 w-4" />
                <span>View on GitHub</span>
              </a>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;
