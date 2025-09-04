import React from 'react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { User, LogOut, Settings } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { Link } from 'react-router-dom';

export const UserMenu: React.FC = () => {
  const { user, logout, isAuthenticated } = useAuth();

  if (!isAuthenticated || !user) {
    return null;
  }

  const initials = user.fullName
    .split(' ')
    .map(name => name[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="relative h-8 w-8 rounded-full hover:bg-scraper-bg-card-hover transition-colors">
          <Avatar className="h-8 w-8">
            <AvatarFallback className="bg-scraper-accent-primary text-white text-xs font-medium">
              {initials}
            </AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent 
        className="w-56 bg-scraper-bg-card border-scraper-border shadow-scraper-md z-50" 
        align="end" 
        forceMount
      >
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium leading-none text-scraper-text-primary">{user.fullName}</p>
            <p className="text-xs leading-none text-scraper-text-muted">
              {user.email}
            </p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator className="bg-scraper-border" />
        <DropdownMenuItem className="cursor-pointer text-scraper-text-primary hover:bg-scraper-bg-card-hover focus:bg-scraper-bg-card-hover transition-colors" asChild>
          <Link to="/settings" state={{ section: 'general' }}>
            <Settings className="mr-2 h-4 w-4" />
            <span>Settings</span>
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem className="cursor-pointer text-scraper-text-primary hover:bg-scraper-bg-card-hover focus:bg-scraper-bg-card-hover transition-colors" asChild>
          <Link to="/settings#profile">
            <User className="mr-2 h-4 w-4" />
            <span>Profile</span>
          </Link>
        </DropdownMenuItem>
        <DropdownMenuSeparator className="bg-scraper-border" />
        <DropdownMenuItem className="cursor-pointer text-red-500 hover:bg-scraper-bg-card-hover focus:bg-scraper-bg-card-hover transition-colors" onClick={logout}>
          <LogOut className="mr-2 h-4 w-4" />
          <span>Log out</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
