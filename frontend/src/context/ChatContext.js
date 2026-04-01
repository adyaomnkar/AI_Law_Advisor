import { createContext, useContext, useState, useCallback } from 'react';

const ChatContext = createContext();

export function ChatProvider({ children }) {
  const [messages, setMessages] = useState([]);
  const [sessionId, setSessionId] = useState(() => `session_${Date.now()}`);
  const [domain, setDomain] = useState('tenant');
  const [language, setLanguage] = useState('en');
  const [isLoading, setIsLoading] = useState(false);
  const [extractedEntities, setExtractedEntities] = useState(null);

  const addMessage = useCallback((role, content, entities = null, sources = null, accuracy = null, action_buttons = null) => {
    setMessages(prev => [...prev, {
      id: Date.now(),
      role,
      content,
      entities,
      sources,
      accuracy,
      action_buttons,
      timestamp: new Date(),
    }]);
    if (entities) setExtractedEntities(entities);
  }, []);

  const clearChat = useCallback(() => {
    setMessages([]);
    setExtractedEntities(null);
    setSessionId(`session_${Date.now()}`);
  }, []);

  return (
    <ChatContext.Provider value={{
      messages, addMessage, clearChat,
      sessionId, domain, setDomain,
      language, setLanguage,
      isLoading, setIsLoading,
      extractedEntities, setExtractedEntities,
    }}>
      {children}
    </ChatContext.Provider>
  );
}

export const useChat = () => useContext(ChatContext);
