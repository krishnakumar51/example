export interface Message {
  id: string;
  content: string;
  role: 'user' | 'assistant';
  timestamp: string;
  sources?: ScrapedSource[];
  image?: File;
}

export interface ScrapedSource {
  id: string;
  url: string;
  title: string;
  favicon?: string;
  status: 'loading' | 'success' | 'error';
  timestamp: string;
}

export interface ChatSession {
  id: string;
  title: string;
  messages: Message[];
  createdAt: string;
  updatedAt: string;
}

export interface ChatState {
  sessions: ChatSession[];
  currentSession: string | null;
  preferences: {
    theme: 'dark';
    sidebarCollapsed: boolean;
  };
}

export interface MetricData {
  id: string;
  name: string;
  value: number;
  target: number;
  change: number;
  status: 'good' | 'warning' | 'error';
}