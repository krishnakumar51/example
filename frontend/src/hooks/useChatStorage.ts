import { useState, useEffect, useCallback } from 'react';
import { ChatState, ChatSession, Message } from '@/types/chat';

const STORAGE_KEY = 'webscraper-ai-chat-state';

const initialState: ChatState = {
  sessions: [],
  currentSession: null,
  preferences: {
    theme: 'dark',
    sidebarCollapsed: false,
  },
};

export const useChatStorage = () => {
  const [chatState, setChatState] = useState<ChatState>(initialState);

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      try {
        setChatState(JSON.parse(stored));
      } catch (error) {
        console.error('Failed to parse stored chat state:', error);
      }
    }
  }, []);

  const saveState = useCallback((newState: ChatState) => {
    setChatState(newState);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(newState));
  }, []);

  const createSession = useCallback((title = 'New Chat'): string => {
    const sessionId = `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    const newSession: ChatSession = {
      id: sessionId,
      title,
      messages: [],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    const newState = {
      ...chatState,
      sessions: [newSession, ...chatState.sessions],
      currentSession: sessionId,
    };

    saveState(newState);
    return sessionId;
  }, [chatState, saveState]);

  const addMessage = useCallback((message: Omit<Message, 'id' | 'timestamp'>) => {
    if (!chatState.currentSession) {
      createSession();
      return;
    }

    const newMessage: Message = {
      ...message,
      id: `msg_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      timestamp: new Date().toISOString(),
    };

    const updatedSessions = chatState.sessions.map((session) =>
      session.id === chatState.currentSession
        ? {
            ...session,
            messages: [...session.messages, newMessage],
            updatedAt: new Date().toISOString(),
          }
        : session
    );

    saveState({
      ...chatState,
      sessions: updatedSessions,
    });
  }, [chatState, createSession, saveState]);

  const setCurrentSession = useCallback((sessionId: string | null) => {
    saveState({
      ...chatState,
      currentSession: sessionId,
    });
  }, [chatState, saveState]);

  const deleteSession = useCallback((sessionId: string) => {
    const filteredSessions = chatState.sessions.filter((s) => s.id !== sessionId);
    const newCurrentSession = chatState.currentSession === sessionId 
      ? (filteredSessions.length > 0 ? filteredSessions[0].id : null)
      : chatState.currentSession;

    saveState({
      ...chatState,
      sessions: filteredSessions,
      currentSession: newCurrentSession,
    });
  }, [chatState, saveState]);

  const getCurrentSession = useCallback(() => {
    return chatState.sessions.find((s) => s.id === chatState.currentSession) || null;
  }, [chatState.sessions, chatState.currentSession]);

  return {
    chatState,
    createSession,
    addMessage,
    setCurrentSession,
    deleteSession,
    getCurrentSession,
  };
};