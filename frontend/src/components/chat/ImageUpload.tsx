
import React, { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { X, Upload, Image as ImageIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ImageUploadProps {
  onImageSelect: (file: File) => void;
  onImageRemove: () => void;
  selectedImage: File | null;
  isCompact?: boolean;
}

const ImageUpload: React.FC<ImageUploadProps> = ({
  onImageSelect,
  onImageRemove,
  selectedImage,
  isCompact = false
}) => {
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const previewRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (selectedImage) {
      const url = URL.createObjectURL(selectedImage);
      setPreviewUrl(url);
      setIsPreviewOpen(true);
      return () => URL.revokeObjectURL(url);
    } else {
      setPreviewUrl(null);
      setIsPreviewOpen(false);
    }
  }, [selectedImage]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (previewRef.current && !previewRef.current.contains(event.target as Node)) {
        setIsPreviewOpen(false);
      }
    };

    if (isPreviewOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      return () => document.removeEventListener('mousedown', handleClickOutside);
    }
  }, [isPreviewOpen]);

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file && file.type.startsWith('image/')) {
      onImageSelect(file);
    }
  };

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  const handleRemoveImage = () => {
    onImageRemove();
    setIsPreviewOpen(false);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <>
      {/* Upload Button */}
      <Button
        type="button"
        variant="ghost"
        size="sm"
        onClick={handleUploadClick}
        className={cn(
          "text-scraper-text-muted hover:text-scraper-text-primary hover:bg-scraper-bg-hover/60 transition-all duration-200 rounded-full hover:scale-105",
          isCompact ? "h-6 w-6 p-0" : "h-8 w-8 p-0"
        )}
      >
        <ImageIcon className={cn(isCompact ? "w-3 h-3" : "w-4 h-4")} />
      </Button>

      {/* Hidden File Input */}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleFileSelect}
        className="hidden"
      />

      {/* Preview Panel */}
      {isPreviewOpen && previewUrl && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/20 backdrop-blur-sm">
          <div
            ref={previewRef}
            className="bg-scraper-bg-card border border-scraper-border rounded-xl shadow-scraper-xl max-w-sm w-full mx-4 overflow-hidden animate-scale-in"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b border-scraper-border">
              <h3 className="text-scraper-text-primary font-medium">Image Preview</h3>
              <Button
                variant="ghost"
                size="sm"
                onClick={handleRemoveImage}
                className="h-8 w-8 p-0 text-scraper-text-muted hover:text-scraper-text-primary rounded-full"
              >
                <X className="w-4 h-4" />
              </Button>
            </div>

            {/* Image Preview */}
            <div className="p-4">
              <img
                src={previewUrl}
                alt="Selected image"
                className="w-full h-48 object-cover rounded-lg border border-scraper-border"
              />
              <p className="text-sm text-scraper-text-muted mt-2 truncate">
                {selectedImage?.name}
              </p>
            </div>

            {/* Actions */}
            <div className="flex gap-2 p-4 pt-0">
              <Button
                variant="outline"
                onClick={() => setIsPreviewOpen(false)}
                className="flex-1 border-scraper-border text-scraper-text-primary hover:bg-scraper-bg-card-hover"
              >
                Keep
              </Button>
              <Button
                variant="destructive"
                onClick={handleRemoveImage}
                className="flex-1"
              >
                Remove
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ImageUpload;
