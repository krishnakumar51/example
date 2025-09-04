import { Bot } from 'lucide-react';

const TypingIndicator = () => {
  return (
    <div className="flex gap-4 p-4 bg-scraper-bg-card/30">
      {/* Avatar */}
      <div className="flex-shrink-0 w-8 h-8 rounded-full bg-scraper-bg-card border border-scraper-border flex items-center justify-center">
        <Bot className="w-4 h-4 text-scraper-accent-primary" />
      </div>

      {/* Content */}
      <div className="flex-1 space-y-2">
        <div className="flex items-center space-x-2">
          <span className="font-medium text-scraper-text-primary text-sm">
            WebScraper AI
          </span>
          <span className="text-scraper-text-muted text-xs">
            is typing...
          </span>
        </div>

        {/* Typing Animation */}
        <div className="flex items-center space-x-1">
          <div className="flex space-x-1">
            <div className="w-2 h-2 bg-scraper-text-muted rounded-full animate-pulse"></div>
            <div className="w-2 h-2 bg-scraper-text-muted rounded-full animate-pulse" style={{animationDelay: '0.2s'}}></div>
            <div className="w-2 h-2 bg-scraper-text-muted rounded-full animate-pulse" style={{animationDelay: '0.4s'}}></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TypingIndicator;