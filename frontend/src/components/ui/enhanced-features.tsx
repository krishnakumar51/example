import React from 'react';
import { cn } from '@/lib/utils';

// Enhanced hover effects
export const HoverCard: React.FC<{
  children: React.ReactNode;
  className?: string;
}> = ({ children, className }) => (
  <div 
    className={cn(
      "transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-primary/20", 
      className
    )}
  >
    {children}
  </div>
);

// Loading states
export const LoadingSpinner: React.FC<{ size?: 'sm' | 'md' | 'lg' }> = ({ size = 'md' }) => {
  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-6 h-6', 
    lg: 'w-8 h-8'
  };

  return (
    <div className={cn("animate-spin rounded-full border-2 border-primary border-t-transparent", sizeClasses[size])} />
  );
};

// Message timestamps
export const MessageTimestamp: React.FC<{ timestamp: string }> = ({ timestamp }) => {
  const formatTime = (isoString: string) => {
    const date = new Date(isoString);
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <span className="text-xs text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity duration-200">
      {formatTime(timestamp)}
    </span>
  );
};

// Smooth scroll animations
export const ScrollToTopButton: React.FC<{ onClick: () => void }> = ({ onClick }) => (
  <button
    onClick={onClick}
    className="fixed bottom-20 right-4 z-50 p-3 bg-primary text-primary-foreground rounded-full shadow-lg hover:scale-110 transition-all duration-200 animate-fade-in"
  >
    ↑
  </button>
);