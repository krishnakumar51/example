import React, { useState } from 'react';
import { Eye, X } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface ImageDisplayProps {
  image: File;
  isCondensed?: boolean;
}

const ImageDisplay: React.FC<ImageDisplayProps> = ({ image, isCondensed = false }) => {
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  const [imageUrl, setImageUrl] = useState<string>('');

  React.useEffect(() => {
    const url = URL.createObjectURL(image);
    setImageUrl(url);
    return () => URL.revokeObjectURL(url);
  }, [image]);

  if (isCondensed) {
    return (
      <>
        <div className="relative inline-block">
          <img
            src={imageUrl}
            alt={image.name}
            className="w-16 h-16 object-cover rounded-lg border border-scraper-border cursor-pointer hover:opacity-80 transition-opacity"
            onClick={() => setIsPreviewOpen(true)}
          />
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsPreviewOpen(true)}
            className="absolute top-1 right-1 h-5 w-5 p-0 bg-scraper-bg-card/80 hover:bg-scraper-bg-card rounded-full"
          >
            <Eye className="w-3 h-3 text-scraper-text-primary" />
          </Button>
        </div>

        {/* Full Preview Modal */}
        {isPreviewOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
            <div className="relative max-w-4xl max-h-[90vh] mx-4">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsPreviewOpen(false)}
                className="absolute -top-12 right-0 h-8 w-8 p-0 bg-scraper-bg-card hover:bg-scraper-bg-card-hover rounded-full z-10"
              >
                <X className="w-4 h-4 text-scraper-text-primary" />
              </Button>
              <img
                src={imageUrl}
                alt={image.name}
                className="max-w-full max-h-full object-contain rounded-lg shadow-2xl"
              />
            </div>
          </div>
        )}
      </>
    );
  }

  return (
    <div className="mt-2">
      <img
        src={imageUrl}
        alt={image.name}
        className="max-w-xs rounded-lg border border-scraper-border shadow-sm"
      />
    </div>
  );
};

export default ImageDisplay;