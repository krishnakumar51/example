import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Crown, X } from 'lucide-react';
import { cn } from '@/lib/utils';

interface UpgradeBannerProps {
  onFirstRequest?: () => void;
  isVisible?: boolean;
  isChatActive?: boolean;
}

const UpgradeBanner = ({ onFirstRequest, isVisible = true, isChatActive = false }: UpgradeBannerProps) => {
  const [isManuallyHidden, setIsManuallyHidden] = useState(false);
  const [hasUserInteracted, setHasUserInteracted] = useState(false);

  // Check session storage on mount using useEffect
  React.useEffect(() => {
    const hasInteracted = sessionStorage.getItem('user-first-request');
    if (hasInteracted) {
      setIsManuallyHidden(true);
      setHasUserInteracted(true);
    }
  }, []);

  const handleClose = () => {
    setIsManuallyHidden(true);
  };

  const handleUpgrade = () => {
    // Navigate to settings upgrade section with state
    window.location.href = '/settings#upgrade';
  };

  // Hide banner if user has interacted, it was manually closed, or chat is active
  if (!isVisible || hasUserInteracted || isChatActive || isManuallyHidden) {
    return null;
  }

  return (
    <div
      className={cn(
        "fixed bottom-20 z-40",
        "bg-scraper-gradient-primary rounded-lg border border-scraper-border",
        "shadow-scraper-lg backdrop-blur-sm",
        "transform -translate-x-1/2",
        "w-64 max-w-[calc(100vw-6rem)]",
        "transition-all duration-300 ease-in-out"
      )}
      style={{
        left: 'calc(50% + var(--sidebar-width, 80px) / 2 - var(--sources-width, 0px) / 2)'
      }}
    >
      {/* Close Button */}
      <button
        onClick={handleClose}
        className="absolute top-1.5 right-1.5 p-1 rounded-full bg-white/20 hover:bg-white/30 transition-colors z-10"
      >
        <X className="w-3 h-3 text-white" />
      </button>

      <div className="p-3 text-white relative overflow-hidden">
        <div className="relative flex items-center gap-2">
          <div className="p-1 bg-white/20 rounded-md flex-shrink-0">
            <Crown className="w-4 h-4" />
          </div>
          
          <div className="flex-1 min-w-0">
            <h3 className="font-medium text-sm">Upgrade to Pro</h3>
          </div>
          
          <Button
            onClick={handleUpgrade}
            size="sm"
            className="bg-white text-scraper-accent-primary hover:bg-white/90 font-medium px-2 py-1 text-xs rounded-md flex-shrink-0"
          >
            Upgrade
          </Button>
        </div>
      </div>
    </div>
  );
};

export default UpgradeBanner;