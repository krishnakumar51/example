import { Brain, BarChart3, Settings, LayoutDashboard, User } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { UserMenu } from './UserMenu';
import { useAuth } from '@/contexts/AuthContext';

const Header = () => {
  const location = useLocation();
  const { isAuthenticated, triggerAuth, user } = useAuth();



  const isActive = (path: string) => location.pathname === path;

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-scraper-bg-secondary border-b border-scraper-border shadow-scraper-sm">
      <div className="flex items-center justify-between px-6 h-14">
        {/* Logo and Brand */}
        <Link to="/" className="flex items-center space-x-3 hover:opacity-80 transition-opacity">
          <div className="w-8 h-8 bg-scraper-gradient-primary rounded-lg flex items-center justify-center">
            <Brain className="w-5 h-5 text-scraper-text-primary" />
          </div>
          <div className="hidden sm:flex flex-col">
            <h1 className="text-scraper-text-primary font-bold text-lg leading-none">
              WebScraper AI
            </h1>
            <span className="text-scraper-text-muted text-xs">
              Intelligent Data Extraction
            </span>
          </div>
        </Link>

        {/* Navigation */}
        <nav className="flex items-center space-x-6">
          <Link
            to="/dashboard"
            className={`flex items-center space-x-2 px-3 py-2 rounded-lg transition-all ${
              isActive('/dashboard')
                ? 'bg-scraper-accent-primary text-scraper-text-primary shadow-scraper-glow'
                : 'text-scraper-text-secondary hover:text-scraper-text-primary hover:bg-scraper-bg-card'
            }`}
          >
            <LayoutDashboard />
            <span className="hidden md:inline">Dashboard</span>
          </Link>

          <Link
            to="/metrics"
            className={`flex items-center space-x-2 px-3 py-2 rounded-lg transition-all ${
              isActive('/metrics')
                ? 'bg-scraper-accent-primary text-scraper-text-primary shadow-scraper-glow'
                : 'text-scraper-text-secondary hover:text-scraper-text-primary hover:bg-scraper-bg-card'
            }`}
          >
            <BarChart3 className="w-4 h-4" />
            <span className="hidden md:inline">Metrics</span>
          </Link>

          {/* Navigation Links - Show when authenticated */}
          {isAuthenticated && (
            <>
              <Link
                to="/settings"
                className={`flex items-center space-x-2 px-3 py-2 rounded-lg transition-all ${
                  isActive('/settings')
                    ? 'bg-scraper-accent-primary text-scraper-text-primary shadow-scraper-glow'
                    : 'text-scraper-text-secondary hover:text-scraper-text-primary hover:bg-scraper-bg-card'
                }`}
              >
                <Settings className="w-4 h-4" />
                <span className="hidden md:inline">Settings</span>
              </Link>

              <Link
                to="/user"
                className={`flex items-center space-x-2 px-3 py-2 rounded-lg transition-all ${
                  isActive('/user')
                    ? 'bg-scraper-accent-primary text-scraper-text-primary shadow-scraper-glow'
                    : 'text-scraper-text-secondary hover:text-scraper-text-primary hover:bg-scraper-bg-card'
                }`}
              >
                <User className="w-4 h-4" />
                <span className="hidden md:inline">User</span>
              </Link>
            </>
          )}

          {/* User Menu or Login Button */}
          {isAuthenticated ? (
            <UserMenu />
          ) : (
            <div className="flex items-center space-x-3">
              <Button
                  onClick={triggerAuth}
                  variant="outline"
                  size="sm"
                  className="border-scraper-border text-scraper-text-primary hover:bg-scraper-bg-card-hover"
                >
                  Login
                </Button>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-9 w-9 rounded-full bg-scraper-gradient-primary hover:opacity-80"
                  >
                    <Settings className="w-4 h-4 text-scraper-text-primary" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent 
                  align="end" 
                  className="w-56 bg-scraper-bg-card border-scraper-border shadow-scraper-md"
                >
                  <DropdownMenuItem className="text-scraper-text-primary hover:bg-scraper-bg-card-hover">
                    Export Chat History
                  </DropdownMenuItem>
                  <DropdownMenuItem className="text-scraper-text-primary hover:bg-scraper-bg-card-hover">
                    Preferences
                  </DropdownMenuItem>
                  <DropdownMenuItem className="text-scraper-text-primary hover:bg-scraper-bg-card-hover">
                    API Settings
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Header;