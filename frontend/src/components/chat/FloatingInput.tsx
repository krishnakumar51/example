
import { useState, useRef, useEffect } from 'react';
import { Send } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { useChatStorage } from '@/hooks/useChatStorage';
import ImageUpload from './ImageUpload';

interface FloatingInputProps {
  onSendMessage?: (message: string, image?: File) => void;
  disabled?: boolean;
  centered?: boolean;
}

const FloatingInput = ({ onSendMessage, disabled = false, centered = false }: FloatingInputProps) => {
  const [message, setMessage] = useState('');
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [isComposing, setIsComposing] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const { addMessage, getCurrentSession, createSession } = useChatStorage();

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  }, [message]);

  const handleSubmit = (e?: React.FormEvent) => {
    e?.preventDefault();
    
    if (!message.trim() || disabled) return;

    const currentSession = getCurrentSession();
    if (!currentSession) {
      createSession();
    }

    addMessage({
      content: message.trim(),
      role: 'user',
    });

    onSendMessage?.(message.trim(), selectedImage || undefined);
    setMessage('');
    setSelectedImage(null);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey && !isComposing) {
      e.preventDefault();
      handleSubmit();
    }
  };

  const handleImageSelect = (file: File) => {
    setSelectedImage(file);
  };

  const handleImageRemove = () => {
    setSelectedImage(null);
  };

  if (centered) {
    return (
      <div className="w-full">
        <div className="bg-scraper-bg-card/95 backdrop-blur-xl border border-scraper-border/40 rounded-full shadow-xl transition-all duration-300 hover:border-scraper-accent-primary/40 hover:bg-scraper-bg-card/100 hover:shadow-2xl">
          <form onSubmit={handleSubmit} className="flex items-center space-x-2 px-4 py-2">
            {/* Image Upload Button */}
            <ImageUpload
              onImageSelect={handleImageSelect}
              onImageRemove={handleImageRemove}
              selectedImage={selectedImage}
              isCompact={false}
            />

            {/* Message Input */}
            <div className="flex-1 max-h-20 overflow-hidden">
              <Textarea
                ref={textareaRef}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onKeyDown={handleKeyDown}
                onCompositionStart={() => setIsComposing(true)}
                onCompositionEnd={() => setIsComposing(false)}
                placeholder="Message WebScraper AI..."
                disabled={disabled}
                className="min-h-[32px] max-h-18 resize-none border-0 bg-transparent text-scraper-text-primary placeholder:text-scraper-text-muted focus:ring-0 focus:outline-none scrollbar-thin scrollbar-thumb-scraper-border scrollbar-track-transparent text-sm leading-relaxed"
                rows={1}
              />
            </div>

            {/* Send Button */}
            <Button
              type="submit"
              disabled={!message.trim() || disabled}
              className="h-8 w-8 p-0 bg-scraper-gradient-primary hover:bg-scraper-gradient-primary/90 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-xl transition-all duration-200 touch-manipulation rounded-full hover:scale-105 active:scale-95"
            >
              <Send className="w-3.5 h-3.5 text-scraper-text-primary" />
            </Button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed bottom-0 left-0 right-0 p-3 sm:p-4 z-50 bg-gradient-to-t from-scraper-bg-primary via-scraper-bg-primary/98 to-scraper-bg-primary/80 transition-all duration-300 ease-in-out" style={{ marginLeft: 'var(--sidebar-width, 80px)', marginRight: 'var(--sources-width, 0px)' }}>
      <div className="max-w-4xl mx-auto">
        {/* Input Container */}
        <div className="bg-scraper-bg-card/95 backdrop-blur-xl border border-scraper-border/40 rounded-full shadow-xl transition-all duration-300 hover:bg-scraper-bg-card/100 hover:border-scraper-accent-primary/40 hover:shadow-2xl">
          <form onSubmit={handleSubmit} className="flex items-center space-x-2 px-4 py-2">
            {/* Image Upload Button */}
            <div className="hidden sm:flex">
              <ImageUpload
                onImageSelect={handleImageSelect}
                onImageRemove={handleImageRemove}
                selectedImage={selectedImage}
                isCompact={!!message.trim()}
              />
            </div>

            {/* Message Input */}
            <div className="flex-1 max-h-24 overflow-hidden">
              <Textarea
                ref={textareaRef}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onKeyDown={handleKeyDown}
                onCompositionStart={() => setIsComposing(true)}
                onCompositionEnd={() => setIsComposing(false)}
                placeholder="Message WebScraper AI..."
                disabled={disabled}
                className="min-h-[32px] max-h-20 resize-none border-0 bg-transparent text-scraper-text-primary placeholder:text-scraper-text-muted focus:ring-0 focus:outline-none scrollbar-thin scrollbar-thumb-scraper-border scrollbar-track-transparent text-sm leading-relaxed"
                rows={1}
              />
            </div>

            {/* Send Button */}
            <Button
              type="submit"
              disabled={!message.trim() || disabled}
              className="h-8 w-8 p-0 bg-scraper-gradient-primary hover:bg-scraper-gradient-primary/90 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-xl transition-all duration-200 touch-manipulation rounded-full hover:scale-105 active:scale-95"
            >
              <Send className="w-3.5 h-3.5 text-scraper-text-primary" />
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default FloatingInput;
