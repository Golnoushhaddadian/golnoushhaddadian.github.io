
import { ReactNode, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Sun, Moon, Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useTheme } from '@/components/ThemeProvider';
import { cn } from '@/lib/utils';

type NavLinkProps = {
  to: string;
  label: string;
  currentPath: string;
};

const NavLink = ({ to, label, currentPath }: NavLinkProps) => {
  const isActive = currentPath === to;

  return (
    <li className="mb-1 md:mb-0 md:mr-6">
      <Link 
        to={to} 
        className={cn(
          "text-foreground/80 hover:text-foreground transition-colors duration-200 py-1 px-2",
          isActive && "active-nav-link"
        )}
      >
        {label}
      </Link>
    </li>
  );
};

type LayoutProps = {
  children: ReactNode;
};

const Layout = ({ children }: LayoutProps) => {
  const { theme, toggleTheme } = useTheme();
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSidebarVisible, setSidebarVisible] = useState(false);

  const navLinks = [
    { path: '/', label: 'Welcome' },
    { path: '/cv', label: 'Education' },
    { path: '/projects', label: 'Projects' },
    { path: '/teaching', label: 'Teaching' },
    { path: '/awards', label: 'Awards' },
    { path: '/gallery', label: 'Gallery' },
    { path: '/contact', label: 'Contact' },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      {/* Skip to main content link for keyboard users */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-[60] focus:px-4 focus:py-2 focus:bg-primary focus:text-primary-foreground focus:rounded-md focus:outline-none focus:ring-2 focus:ring-ring"
      >
        Skip to main content
      </a>
      <header role="banner" className="border-b py-2 sm:py-3 md:py-4 px-3 sm:px-4 md:px-6 lg:px-10 sticky top-0 bg-background/95 backdrop-blur-sm z-50">
        <div className="flex justify-between items-center max-w-7xl mx-auto">
          <Link to="/" className="text-sm sm:text-base md:text-lg font-medium hover:text-primary transition-colors z-50">
            Golnoush Haddadian
          </Link>
          
          {/* Mobile menu toggle */}
          <div className="md:hidden flex items-center gap-0.5 z-50">
            <Button 
              variant="ghost" 
              size="icon"
              className="h-8 w-8"
              onClick={toggleTheme}
              aria-label="Toggle theme"
            >
              {theme === 'light' ? <Moon size={16} /> : <Sun size={16} />}
            </Button>
            <Button 
              variant="ghost" 
              size="icon"
              className="h-8 w-8"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? <X size={16} /> : <Menu size={16} />}
            </Button>
          </div>
          
          {/* Desktop navigation */}
          <nav className="hidden md:block" aria-label="Main navigation">
            <ul className="flex flex-row items-center">
              {navLinks.map((link) => (
                <NavLink 
                  key={link.path} 
                  to={link.path} 
                  label={link.label} 
                  currentPath={location.pathname} 
                />
              ))}
              <li>
                <Button 
                  variant="ghost" 
                  size="icon" 
                  onClick={toggleTheme}
                  aria-label="Toggle theme"
                  className="ml-2"
                >
                  {theme === 'light' ? <Moon size={20} /> : <Sun size={20} />}
                </Button>
              </li>
            </ul>
          </nav>
        </div>
      </header>

      {/* Mobile navigation overlay - outside header for proper layering */}
      {isMobileMenuOpen && (
        <div className="md:hidden fixed inset-0 z-40">
          {/* Backdrop */}
          <div 
            className="absolute inset-0 bg-background/80 backdrop-blur-sm"
            onClick={() => setIsMobileMenuOpen(false)}
          />
          
          {/* Menu panel */}
          <nav className="absolute top-12 left-0 right-0 bg-background border shadow-lg mx-3 rounded-md overflow-hidden animate-in slide-in-from-top-2 duration-200" aria-label="Mobile navigation">
            <ul className="flex flex-col py-1">
              {navLinks.map((link) => (
                <li key={link.path}>
                  <Link 
                    to={link.path} 
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={cn(
                      "flex items-center py-2.5 px-4 text-sm font-medium transition-colors border-l-2",
                      location.pathname === link.path 
                        ? "bg-primary/10 text-primary border-primary" 
                        : "text-foreground/80 hover:bg-muted border-transparent hover:border-primary/30"
                    )}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      )}
      
      <main id="main-content" role="main" className="flex-1 px-3 sm:px-4 md:px-6 lg:px-10 py-4 sm:py-6 md:py-10 max-w-7xl w-full mx-auto page-transition" tabIndex={-1}>
        {children}
      </main>
      
      <footer role="contentinfo" className="border-t py-3 sm:py-4 md:py-6 px-3 sm:px-4 md:px-6 lg:px-10 text-[10px] sm:text-xs md:text-sm text-muted-foreground">
        <div className="max-w-7xl mx-auto">
          <p>© {new Date().getFullYear()} Golnoush Haddadian. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default Layout;
