import { ExternalLink, CheckCircle, Clock, XCircle } from 'lucide-react';
import { ScrapedSource } from '@/types/chat';

interface SourcesListProps {
  sources: ScrapedSource[];
}

const SourcesList = ({ sources }: SourcesListProps) => {
  const getStatusIcon = (status: ScrapedSource['status']) => {
    switch (status) {
      case 'loading':
        return <Clock className="w-3 h-3 text-scraper-accent-warning animate-spin" />;
      case 'success':
        return <CheckCircle className="w-3 h-3 text-scraper-accent-success" />;
      case 'error':
        return <XCircle className="w-3 h-3 text-scraper-accent-primary" />;
    }
  };

  const getStatusColor = (status: ScrapedSource['status']) => {
    switch (status) {
      case 'loading':
        return 'border-scraper-accent-warning';
      case 'success':
        return 'border-scraper-accent-success';
      case 'error':
        return 'border-scraper-accent-primary';
    }
  };

  return (
    <div className="space-y-2 mt-4">
      <div className="flex items-center space-x-2">
        <span className="text-scraper-text-secondary text-sm font-medium">Sources:</span>
        <span className="text-scraper-text-muted text-xs">
          {sources.length} website{sources.length !== 1 ? 's' : ''} accessed
        </span>
      </div>
      
      <div className="grid gap-2">
        {sources.map((source) => (
          <div
            key={source.id}
            className={`flex items-center justify-between p-3 rounded-lg bg-scraper-bg-card border ${getStatusColor(source.status)} hover:bg-scraper-bg-card-hover transition-colors group`}
          >
            <div className="flex items-center space-x-3 flex-1 min-w-0">
              {/* Favicon */}
              <div className="w-4 h-4 rounded-sm bg-scraper-bg-secondary flex items-center justify-center flex-shrink-0">
                {source.favicon ? (
                  <img src={source.favicon} alt="" className="w-3 h-3" />
                ) : (
                  <ExternalLink className="w-2 h-2 text-scraper-text-muted" />
                )}
              </div>
              
              {/* Title and URL */}
              <div className="flex-1 min-w-0">
                <p className="text-scraper-text-primary text-sm font-medium truncate">
                  {source.title}
                </p>
                <p className="text-scraper-text-muted text-xs truncate">
                  {source.url}
                </p>
              </div>
            </div>

            <div className="flex items-center space-x-2">
              {/* Status Icon */}
              {getStatusIcon(source.status)}
              
              {/* External Link */}
              <a
                href={source.url}
                target="_blank"
                rel="noopener noreferrer"
                className="opacity-0 group-hover:opacity-100 text-scraper-text-muted hover:text-scraper-accent-primary transition-all"
              >
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SourcesList;