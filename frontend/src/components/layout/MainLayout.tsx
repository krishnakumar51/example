import { useEffect, useState } from 'react';
import React from 'react';
import ChatSidebar from '../chat/ChatSidebar';
import SourcePanel from '../chat/SourcePanel';
import { ScrapedSource } from '@/types/chat';

interface MainLayoutProps {
  children: React.ReactNode;
}

const MainLayout = ({ children }: MainLayoutProps) => {
  const [isChatPanelOpen, setIsChatPanelOpen] = useState(false);
  const [sourcesPanelVisible, setSourcesPanelVisible] = useState(false);
  const [currentSources, setCurrentSources] = useState<ScrapedSource[]>([]);

  const handleSourcesUpdate = (sources: ScrapedSource[]) => {
    setCurrentSources(sources);
    setSourcesPanelVisible(sources.length > 0);
  };

  const closeSourcesPanel = () => {
    setSourcesPanelVisible(false);
    setCurrentSources([]);
  };

  return (
    <div
      className="min-h-screen bg-scraper-bg-primary"
      style={{
        '--sidebar-width': isChatPanelOpen ? '400px' : '80px',
        '--sources-width': sourcesPanelVisible ? '320px' : '0px'
      } as React.CSSProperties}
    >
      {/* Chat Sidebar */}
      <ChatSidebar
        isChatPanelOpen={isChatPanelOpen}
        onChatToggle={() => setIsChatPanelOpen(!isChatPanelOpen)}
      />

      {/* Main Content */}
      <main
        className="transition-all duration-300 ease-in-out"
        style={{
          minHeight: '100vh',
          marginLeft: 'var(--sidebar-width)',
          marginRight: 'var(--sources-width)'
        }}
      >
        <div className="h-full relative">
          {/* Clone children and pass onSourcesUpdate and other props if it's the ChatInterface */}
          {React.cloneElement(children as React.ReactElement, {
            onSourcesUpdate: handleSourcesUpdate,
            ...(children as React.ReactElement).props
          })}
        </div>
      </main>

      {/* Sources Panel */}
      <SourcePanel
        isVisible={sourcesPanelVisible}
        sources={currentSources}
        onClose={closeSourcesPanel}
      />
    </div>
  );
};

export default MainLayout;