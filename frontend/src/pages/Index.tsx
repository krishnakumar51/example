import { useState } from 'react';
import ChatInterface from '@/components/chat/ChatInterface';
import UpgradeBanner from '@/components/ui/UpgradeBanner';

const Index = () => {
  const [isChatActive, setIsChatActive] = useState(false);
  
  const handleChatStart = () => {
    setIsChatActive(true);
  };

  return (
    <div className="relative">
      <ChatInterface onSourcesUpdate={() => {}} onChatStart={handleChatStart} />
      <UpgradeBanner isChatActive={isChatActive} isVisible={true} />
    </div>
  );
};

export default Index;
