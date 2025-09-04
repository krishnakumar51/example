import { useState, useEffect, useRef } from 'react';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useChatStorage } from '@/hooks/useChatStorage';
import { useAuth } from '@/contexts/AuthContext';
import { Message, ScrapedSource } from '@/types/chat';
import MessageBubble from './MessageBubble';
import FloatingInput from './FloatingInput';
import TypingIndicator from './TypingIndicator';
import { MessageTimestamp } from '@/components/ui/enhanced-features';
import { askGemini } from '@/lib/geminiClient';
import { useNavigate } from 'react-router-dom';
import {v4 as uuidv4} from "uuid";

interface ChatInterfaceProps {
  onSourcesUpdate?: (sources: ScrapedSource[]) => void;
  onChatStart?: () => void;
}

// AI-powered response generation using Gemini
const getAIResponse = async (userMessage: string): Promise<{ response: string; sources: ScrapedSource[] }> => {
  const mockSources: ScrapedSource[] = [];
  
  try {
    // Get AI response from Gemini
    const response = await askGemini(userMessage);
    
    // Generate relevant mock sources based on the query
    if (userMessage.toLowerCase().includes('price') || userMessage.toLowerCase().includes('scrape') ||
        userMessage.toLowerCase().includes('amazon') || userMessage.toLowerCase().includes('flipkart') ||
        userMessage.toLowerCase().includes('website') || userMessage.toLowerCase().includes('data')) {
      
      mockSources.push(
        {
          id: `source_${Date.now()}_1`,
          url: 'https://example-target-site.com',
          title: 'Target Website - Data Source',
          favicon: 'https://example-target-site.com/favicon.ico',
          status: 'success',
          timestamp: new Date().toISOString(),
        }
      );
    }
    
    return { response, sources: mockSources };
  } catch (error) {
    console.error('AI Response Error:', error);
    return {
      response: 'I apologize, but I\'m having trouble connecting to my AI service right now. Please check your API configuration and try again.',
      sources: []
    };
  }
};

const ChatInterface = ({ onSourcesUpdate, onChatStart }: ChatInterfaceProps) => {
  const { isAuthenticated, triggerAuth } = useAuth();
  const [isTyping, setIsTyping] = useState(false);
  const [currentSources, setCurrentSources] = useState<ScrapedSource[]>([]);
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const bottomRef = useRef<HTMLDivElement>(null);

  const { getCurrentSession, addMessage } = useChatStorage();
  const currentSession = getCurrentSession();

  const navigate = useNavigate();

  useEffect(() => {
    if (bottomRef.current) {
      // Smooth scroll to the latest message / typing indicator
      bottomRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, isTyping]);

  const simulateScrapingProcess = async (sources: ScrapedSource[]) => {
    // Start with loading sources
    const loadingSources = sources.map(source => ({ ...source, status: 'loading' as const }));
    setCurrentSources(loadingSources);
    onSourcesUpdate?.(loadingSources);

    // Simulate progressive loading
    for (let i = 0; i < sources.length; i++) {
      await new Promise(resolve => setTimeout(resolve, 1500 + Math.random() * 1000));

      const updatedSources = loadingSources.map((source, index) =>
        index <= i ? { ...source, status: 'success' as const } : source
      );

      setCurrentSources(updatedSources);
      onSourcesUpdate?.(updatedSources);
    }
  };

  const handleSendPrompt = async (message: string, image?: File) => {
    // Block if not authenticated
    if (!isAuthenticated) {
      triggerAuth();
      return;
    }

    const new_session_id = uuidv4();
    sessionStorage.setItem("is_new_session", "true")
    sessionStorage.setItem("message", message)
    sessionStorage.setItem("new_session_id", new_session_id)

    navigate(`/c/${new_session_id}`)

    // Notify parent that chat has started and hide upgrade banner
    // if (messages.length === 0) {
    //   onChatStart?.();
    //   // Hide the upgrade banner when user makes first request
    //   sessionStorage.setItem('user-first-request', 'true');
    // }

    // const newMessage: Message = {
    //   id: crypto.randomUUID(),
    //   content: message,
    //   role: 'user',
    //   timestamp: new Date().toISOString(),
    //   image: image,
    // };

    // setMessages((prev) => [...prev, newMessage]);

    // setIsTyping(true);

    // // Get AI response and sources
    // const { response, sources } = await getAIResponse(message);

    // // If there are sources, simulate the scraping process
    // if (sources.length > 0) {
    //   await simulateScrapingProcess(sources);
    // }

    // // Simulate AI thinking time
    // await new Promise(resolve => setTimeout(resolve, 1000));

    // setMessages((prev) => [
    //   ...prev,
    //   {
    //     id: crypto.randomUUID(),
    //     content: response,
    //     role: 'assistant',
    //     timestamp: new Date().toISOString(),
    //     sources: sources.length > 0 ? sources : undefined,
    //   }
    // ]);

    // setIsTyping(false);

    // // Trigger auth dialog after AI response completes (for first-time users)
    // setTimeout(() => {
    //   if (!isAuthenticated) {
    //     triggerAuth();
    //   }
    // }, 1500);
  };

  return (
    <div className="flex flex-col h-full relative">
      {messages.length === 0 ? (
        // ChatGPT-style centered layout when empty
        <div className="flex-1 flex flex-col items-center justify-start px-4 pt-32">
          <div className="text-center max-w-2xl mx-auto animate-fade-in">
            <h1 className="text-5xl sm:text-6xl font-extrabold tracking-tight text-scraper-text-primary mb-6 bg-gradient-to-r from-scraper-text-primary to-scraper-accent-primary bg-clip-text text-transparent">
              WebScraper AI
            </h1>

            <p className="text-scraper-text-secondary text-lg sm:text-xl mb-10 leading-relaxed font-medium">
              Intelligent web data extraction & analysis
            </p>
          </div>

          {/* Centered Input */}
          <div className="w-full max-w-3xl mx-auto mt-8">
            <FloatingInput onSendMessage={handleSendPrompt} disabled={isTyping} centered={true} />
          </div>
        </div>
      ) : (
        // Regular chat layout with messages
        <>
          <ScrollArea className="flex-1 px-4 sm:px-6" ref={scrollAreaRef}>
            <div className="max-w-4xl mx-auto pt-8 pb-32">
              <div className="space-y-6">
                {messages.map((message, index) => (
                  <div key={message.id} className="animate-fade-in" style={{ animationDelay: `${index * 50}ms` }}>
                    <MessageBubble message={message} />
                  </div>
                ))}
                
                {isTyping && (
                  <div className="animate-fade-in">
                    <TypingIndicator />
                  </div>
                )}
                {/* Sentinel for auto-scroll */}
                <div ref={bottomRef} />
              </div>
            </div>
          </ScrollArea>

          {/* Fixed Input Area */}
          <FloatingInput onSendMessage={handleSendPrompt} disabled={isTyping} />
        </>
      )}
    </div>
  );
};

export default ChatInterface;
