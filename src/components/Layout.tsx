
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
    { path: '/', label: 'About' },
    { path: '/education', label: 'Education' },
    { path: '/projects', label: 'Projects' },
    { path: '/awards', label: 'Awards' },
    { path: '/research', label: 'Research' },
    { path: '/teaching', label: 'Teaching' },
    { path: '/service', label: 'Service' },
    { path: '/gallery', label: 'Gallery' },
    { path: '/affiliations', label: 'Affiliations' },
    { path: '/cv', label: 'CV' },
    { path: '/contact', label: 'Contact' },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <header className="border-b py-4 px-6 md:px-10 sticky top-0 bg-background/90 backdrop-blur-sm z-10">
        <div className="flex justify-between items-center max-w-7xl mx-auto">
          <div className="text-lg font-medium">Golnoush Haddadian</div>
          
          {/* Mobile menu toggle */}
          <div className="md:hidden flex items-center gap-2">
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={toggleTheme}
              aria-label="Toggle theme"
              className="mr-2"
            >
              {theme === 'light' ? <Moon size={20} /> : <Sun size={20} />}
            </Button>
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </Button>
          </div>
          
          {/* Desktop navigation */}
          <nav className="hidden md:block">
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
        
        {/* Mobile navigation overlay */}
        {isMobileMenuOpen && (
          <nav className="md:hidden fixed inset-0 bg-background pt-16 pb-6 px-6 animate-fade-in">
            <ul className="flex flex-col items-start">
              {navLinks.map((link) => (
                <NavLink 
                  key={link.path} 
                  to={link.path} 
                  label={link.label} 
                  currentPath={location.pathname} 
                  />
              ))}
            </ul>
          </nav>
        )}
      </header>
      
      <main className="flex-1 px-6 md:px-10 py-10 max-w-7xl w-full mx-auto page-transition">
        {children}
      </main>
      
      <footer className="border-t py-6 px-6 md:px-10 text-sm text-muted-foreground">
        <div className="max-w-7xl mx-auto">
          <p>© {new Date().getFullYear()} Golnoush Haddadian. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default Layout;
