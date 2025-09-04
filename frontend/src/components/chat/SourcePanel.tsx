import { useState, useEffect } from 'react';
import { ExternalLink, CheckCircle, Clock, XCircle, Globe, ChevronRight } from 'lucide-react';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Button } from '@/components/ui/button';
import { ScrapedSource } from '@/types/chat';

interface SourcePanelProps {
  isVisible: boolean;
  sources: ScrapedSource[];
  onClose?: () => void;
}

const SourcePanel = ({ isVisible, sources, onClose }: SourcePanelProps) => {
  const [expandedSources, setExpandedSources] = useState<Set<string>>(new Set());

  useEffect(() => {
    // Auto-expand sources when they become available
    if (sources.length > 0) {
      setExpandedSources(new Set(sources.map(s => s.id)));
    }
  }, [sources]);

  const toggleSourceExpansion = (sourceId: string) => {
    const newExpanded = new Set(expandedSources);
    if (newExpanded.has(sourceId)) {
      newExpanded.delete(sourceId);
    } else {
      newExpanded.add(sourceId);
    }
    setExpandedSources(newExpanded);
  };

  const getStatusIcon = (status: ScrapedSource['status']) => {
    switch (status) {
      case 'loading':
        return <Clock className="w-4 h-4 text-scraper-accent-warning animate-pulse" />;
      case 'success':
        return <CheckCircle className="w-4 h-4 text-scraper-accent-success" />;
      case 'error':
        return <XCircle className="w-4 h-4 text-scraper-accent-primary" />;
    }
  };

  const getStatusColor = (status: ScrapedSource['status']) => {
    switch (status) {
      case 'loading':
        return 'border-l-scraper-accent-warning bg-scraper-accent-warning/5';
      case 'success':
        return 'border-l-scraper-accent-success bg-scraper-accent-success/5';
      case 'error':
        return 'border-l-scraper-accent-primary bg-scraper-accent-primary/5';
    }
  };

  const formatTime = (timestamp: string) => {
    return new Date(timestamp).toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
    });
  };

  if (!isVisible) return null;

  return (
    <div className="fixed right-0 top-0 bottom-0 w-80 bg-scraper-bg-secondary border-l border-scraper-border shadow-scraper-lg z-40">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-scraper-border">
        <div className="flex items-center space-x-2">
          <Globe className="w-5 h-5 text-scraper-accent-primary" />
          <div>
            <h3 className="text-scraper-text-primary font-medium">Sources</h3>
            <p className="text-scraper-text-muted text-xs">
              {sources.length} website{sources.length !== 1 ? 's' : ''} accessed
            </p>
          </div>
        </div>
        {onClose && (
          <Button
            variant="ghost"
            size="sm"
            onClick={onClose}
            className="h-6 w-6 p-0 text-scraper-text-muted hover:text-scraper-text-primary"
          >
            <ChevronRight className="w-4 h-4" />
          </Button>
        )}
      </div>

      {/* Content */}
      <ScrollArea className="flex-1 p-4">
        {sources.length === 0 ? (
          <div className="text-center py-12">
            <Globe className="w-12 h-12 text-scraper-text-muted mx-auto mb-4 opacity-50" />
            <p className="text-scraper-text-muted">
              Sources will appear here when scraping websites
            </p>
          </div>
        ) : (
          <div className="space-y-3">
            {sources.map((source) => (
              <div
                key={source.id}
                className={`border-l-4 rounded-lg p-4 bg-scraper-bg-card hover:bg-scraper-bg-card-hover transition-colors ${getStatusColor(source.status)}`}
              >
                {/* Source Header */}
                <div className="flex items-start justify-between space-x-3">
                  <div className="flex items-center space-x-3 flex-1 min-w-0">
                    {/* Favicon */}
                    <div className="w-6 h-6 rounded-sm bg-scraper-bg-secondary flex items-center justify-center flex-shrink-0 border border-scraper-border">
                      {source.favicon ? (
                        <img src={source.favicon} alt="" className="w-4 h-4 rounded-sm" />
                      ) : (
                        <ExternalLink className="w-3 h-3 text-scraper-text-muted" />
                      )}
                    </div>
                    
                    {/* Title */}
                    <div className="flex-1 min-w-0">
                      <h4 className="text-scraper-text-primary text-sm font-medium truncate">
                        {source.title}
                      </h4>
                      <p className="text-scraper-text-muted text-xs mt-1">
                        {formatTime(source.timestamp)}
                      </p>
                    </div>
                  </div>

                  {/* Status and Actions */}
                  <div className="flex items-center space-x-2">
                    {getStatusIcon(source.status)}
                    <a
                      href={source.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-scraper-text-muted hover:text-scraper-accent-primary transition-colors"
                    >
                      <ExternalLink className="w-4 h-4" />
                    </a>
                  </div>
                </div>

                {/* URL */}
                <div className="mt-3">
                  <p className="text-scraper-text-secondary text-xs break-all">
                    {source.url}
                  </p>
                </div>

                {/* Status Message */}
                <div className="mt-2">
                  <span className={`text-xs px-2 py-1 rounded-full ${
                    source.status === 'loading'
                      ? 'bg-scraper-accent-warning/20 text-scraper-accent-warning'
                      : source.status === 'success'
                      ? 'bg-scraper-accent-success/20 text-scraper-accent-success'
                      : 'bg-scraper-accent-primary/20 text-scraper-accent-primary'
                  }`}>
                    {source.status === 'loading' && 'Scraping...'}
                    {source.status === 'success' && 'Complete'}
                    {source.status === 'error' && 'Failed'}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </ScrollArea>

      {/* Real-time Activity Indicator */}
      {sources.some(s => s.status === 'loading') && (
        <div className="absolute bottom-4 left-4 right-4">
          <div className="bg-scraper-bg-card border border-scraper-accent-warning rounded-lg p-3 shadow-scraper-md">
            <div className="flex items-center space-x-3">
              <div className="w-2 h-2 bg-scraper-accent-warning rounded-full animate-pulse"></div>
              <span className="text-scraper-text-primary text-sm">
                Actively scraping websites...
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SourcePanel;