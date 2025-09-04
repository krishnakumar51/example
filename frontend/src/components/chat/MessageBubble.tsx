import { Bot, User, Copy, RotateCcw, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Message } from '@/types/chat';
import SourcesList from './SourcesList';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { MessageTimestamp } from '@/components/ui/enhanced-features';
import ImageDisplay from './ImageDisplay';

interface MessageBubbleProps {
  message: Message;
}

const MessageBubble = ({ message }: MessageBubbleProps) => {
  const isUser = message.role === 'user';

  const handleCopyMessage = () => {
    navigator.clipboard.writeText(message.content);
  };

  const formatTime = (timestamp: string) => {
    return new Date(timestamp).toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <div className={`flex gap-2 sm:gap-3 px-2 sm:px-4 py-2 sm:py-3 group transition-all duration-300 hover:bg-scraper-bg-card/10 rounded-lg hover-lift ${
      isUser 
        ? 'bg-transparent justify-end' 
        : 'bg-transparent justify-start'
    }`}>
      {isUser ? (
        // User message layout (right-aligned)
        <>
          {/* Content */}
          <div className="max-w-xs sm:max-w-xl lg:max-w-2xl space-y-1">
            <div className="flex items-center justify-end gap-2">
              {/* Timestamp */}
              <div className="group-hover-visible">
                <MessageTimestamp timestamp={message.timestamp} />
              </div>
              
              {/* Action Buttons */}
              <div className="flex items-center space-x-1 opacity-0 group-hover:opacity-100 transition-all duration-200">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleCopyMessage}
                  className="h-6 w-6 sm:h-7 sm:w-7 p-0 text-scraper-text-muted hover:text-scraper-text-primary hover:bg-scraper-bg-card rounded-lg transition-all duration-200 hover-lift"
                >
                  <Copy className="w-3 sm:w-3.5 h-3 sm:h-3.5" />
                </Button>
              </div>
            </div>

            {/* Message Content */}
            <div className="bg-scraper-gradient-primary rounded-xl rounded-tr-md px-3 sm:px-4 py-2 sm:py-3 shadow-md border border-scraper-border/20 hover-glow">
              <div className="text-scraper-text-primary leading-relaxed text-sm sm:text-base">
                {message.content.split('\n').map((line, index) => (
                  <p key={index} className="mb-1 sm:mb-2 last:mb-0 font-medium">
                    {line}
                  </p>
                ))}
              </div>
              {/* Image Display */}
              {message.image && (
                <ImageDisplay image={message.image} isCondensed={true} />
              )}
            </div>
          </div>

          {/* Avatar */}
          <div className="flex-shrink-0 w-8 h-8 sm:w-9 sm:h-9 rounded-full flex items-center justify-center bg-scraper-gradient-primary shadow-lg ring-2 ring-scraper-accent-primary/20 hover-lift animate-glow">
            <User className="w-4 h-4 sm:w-4.5 sm:h-4.5 text-scraper-text-primary" />
          </div>
        </>
      ) : (
        // Assistant message layout (left-aligned)
        <>
          {/* Avatar */}
          <div className="flex-shrink-0 w-8 h-8 sm:w-9 sm:h-9 rounded-full flex items-center justify-center bg-scraper-bg-card border-2 border-scraper-accent-primary/30 shadow-md hover-lift">
            <Bot className="w-4 h-4 sm:w-4.5 sm:h-4.5 text-scraper-accent-primary" />
          </div>

          {/* Content */}
          <div className="flex-1 space-y-1 sm:space-y-2 max-w-4xl">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="text-xs text-scraper-text-muted font-medium">WebScraper AI</div>
                <div className="group-hover-visible">
                  <MessageTimestamp timestamp={message.timestamp} />
                </div>
              </div>
              
              {/* Action Buttons */}
              <div className="flex items-center space-x-1 opacity-0 group-hover:opacity-100 transition-all duration-200">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleCopyMessage}
                  className="h-6 w-6 sm:h-7 sm:w-7 p-0 text-scraper-text-muted hover:text-scraper-text-primary hover:bg-scraper-bg-card rounded-lg transition-all duration-200 hover-lift"
                >
                  <Copy className="w-3 sm:w-3.5 h-3 sm:h-3.5" />
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-6 w-6 sm:h-7 sm:w-7 p-0 text-scraper-text-muted hover:text-scraper-text-primary hover:bg-scraper-bg-card rounded-lg transition-all duration-200 hover-lift"
                >
                  <RotateCcw className="w-3 sm:w-3.5 h-3 sm:h-3.5" />
                </Button>
              </div>
            </div>

            {/* Message Content (Markdown) */}
            <div className="text-scraper-text-primary leading-relaxed text-sm sm:text-base prose prose-invert max-w-none">
              <ReactMarkdown
                remarkPlugins={[remarkGfm]}
                components={{
                  a: ({ node, ...props }) => (
                    <a
                      {...props}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-scraper-accent-primary underline hover:opacity-90"
                    />
                  ),
                  code: (props) => {
                    const { inline, className, children, ...rest } = props as any;
                    if (inline) {
                      return (
                        <code className="rounded px-1.5 py-0.5 bg-scraper-bg-secondary" {...rest}>
                          {children}
                        </code>
                      );
                    }
                    return (
                      <pre className="overflow-x-auto">
                        <code className="block rounded-md p-3 bg-scraper-bg-card border border-scraper-border" {...rest}>
                          {children}
                        </code>
                      </pre>
                    );
                  },
                }}
              >
                {message.content}
              </ReactMarkdown>
            </div>

            {/* Sources */}
            {message.sources && message.sources.length > 0 && (
              <SourcesList sources={message.sources} />
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default MessageBubble;