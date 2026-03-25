import { useRef, useEffect, useState } from 'react';
import { useChat } from '../context/ChatContext';
import DomainSelector from '../components/DomainSelector';
import WelcomeScreen from '../components/WelcomeScreen';
import ChatMessage from '../components/ChatMessage';
import ChatInput from '../components/ChatInput';
import PDFGenerator from '../components/PDFGenerator';

export default function ChatPage() {
  const { messages, domain, isLoading, addMessage, setIsLoading } = useChat();
  const messagesEndRef = useRef(null);
  const [showSidebar, setShowSidebar] = useState(false);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleQuickQuestion = async (question) => {
    addMessage('user', question);
    setIsLoading(true);
    try {
      const { sendQuery } = await import('../services/api');
      const res = await sendQuery(question, domain, 'en', null);
      addMessage('assistant', res.response, res.entities, res.sources);
    } catch {
      const { getMockResponse } = await import('../components/ChatInput');
      const mock = getMockResponse(question, domain);
      addMessage('assistant', mock.response, mock.entities, mock.sources);
    } finally {
      setIsLoading(false);
    }
  };

  const hasAIResponse = messages.some(m => m.role === 'assistant');

  return (
    <div className="flex-1 flex flex-col">
      {/* Domain selector */}
      <div className="px-4 py-3 border-b border-slate-800 bg-slate-900/30">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <DomainSelector />
          {hasAIResponse && (
            <button
              onClick={() => setShowSidebar(!showSidebar)}
              className="ml-4 flex items-center gap-2 px-3 py-2 bg-amber-500/10 text-amber-400 text-xs font-medium rounded-lg border border-amber-500/20 hover:bg-amber-500/20 transition-colors flex-shrink-0"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" /><polyline points="14 2 14 8 20 8" />
              </svg>
              Legal Notice
            </button>
          )}
        </div>
      </div>

      {/* Main content: chat + optional sidebar */}
      <div className="flex-1 flex overflow-hidden">
        {/* Chat area */}
        <div className="flex-1 flex flex-col min-w-0">
          <div className="flex-1 overflow-y-auto">
            {messages.length === 0 ? (
              <WelcomeScreen domain={domain} onQuickQuestion={handleQuickQuestion} />
            ) : (
              <div className="max-w-4xl mx-auto px-4 py-4 space-y-2">
                {messages.map(msg => (
                  <ChatMessage key={msg.id} message={msg} />
                ))}
                {isLoading && (
                  <div className="flex justify-start mb-4 animate-fade-in">
                    <div className="bg-slate-800 rounded-2xl rounded-tl-sm border border-slate-700 px-4 py-3">
                      <span className="flex gap-1">
                        <span className="typing-dot" />
                        <span className="typing-dot" />
                        <span className="typing-dot" />
                      </span>
                    </div>
                  </div>
                )}
                <div ref={messagesEndRef} />
              </div>
            )}
          </div>
          <ChatInput />
        </div>

        {/* Sidebar: PDF Generator */}
        {showSidebar && (
          <div className="w-80 border-l border-slate-800 bg-slate-900/80 overflow-y-auto flex-shrink-0 animate-fade-in">
            <div className="p-4">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-sm font-semibold text-amber-400 flex items-center gap-2">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" /><polyline points="14 2 14 8 20 8" />
                  </svg>
                  Generate Legal Notice
                </h3>
                <button onClick={() => setShowSidebar(false)} className="text-slate-500 hover:text-slate-300 text-lg leading-none">&times;</button>
              </div>
              <PDFGenerator inline />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
