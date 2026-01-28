import React, { useState, useRef, useEffect, useCallback } from 'react';
import { Sidebar } from './components/Sidebar';
import { Header } from './components/Header';
import { MessageList } from './components/MessageList';
import { MessageInput } from './components/MessageInput';
import { WelcomeState } from './components/WelcomeState';
import { Message, Role, Category } from './types';
import { getGeminiResponse } from './services/geminiService';

const App: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [currentCategory, setCurrentCategory] = useState<Category>(Category.DATA);
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  const isNewChat = messages.length === 0;

  const scrollToBottom = useCallback(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages, scrollToBottom]);

  const handleSendMessage = async (text: string) => {
    if (!text.trim() || isLoading) return;

    const userMsg: Message = {
      id: Date.now().toString(),
      role: Role.USER,
      content: text,
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMsg]);
    setIsLoading(true);

    const botMsgId = (Date.now() + 1).toString();
    const botMsg: Message = {
      id: botMsgId,
      role: Role.MODEL,
      content: '',
      timestamp: new Date(),
      isStreaming: true,
    };

    setMessages(prev => [...prev, botMsg]);

    try {
      const history = messages.concat(userMsg).map(m => ({
        role: m.role,
        content: m.content
      }));

      let accumulatedResponse = "";
      await getGeminiResponse(history, (chunk) => {
        accumulatedResponse += chunk;
        setMessages(prev => prev.map(m => 
          m.id === botMsgId ? { ...m, content: accumulatedResponse } : m
        ));
      });

      setMessages(prev => prev.map(m => 
        m.id === botMsgId ? { ...m, isStreaming: false } : m
      ));
    } catch (error) {
      setMessages(prev => prev.map(m => 
        m.id === botMsgId ? { ...m, content: '抱歉，我现在遇到了一些问题，请稍后再试。', isStreaming: false } : m
      ));
    } finally {
      setIsLoading(false);
    }
  };

  const handleNewChat = () => {
    if (window.confirm('确认清空当前对话记录吗？')) {
      setMessages([]);
    }
  };

  const handleSelectCategory = (cat: Category) => {
    setCurrentCategory(cat);
    // When switching major categories, we clear to keep the context pure
    setMessages([]);
  };

  return (
    <div className="flex h-screen w-full bg-[#faf9f6] text-gray-700 overflow-hidden">
      {/* Sidebar - Left Menu with Fixed Assistants */}
      <Sidebar 
        currentCategory={currentCategory} 
        onSelectCategory={handleSelectCategory} 
        onClearChat={handleNewChat}
      />

      {/* Main Content Area - Right Interaction */}
      <div className="flex flex-col flex-1 relative min-w-0">
        <Header onNewChat={handleNewChat} currentCategory={currentCategory} />
        
        {/* Main Workspace */}
        <div className="flex-1 overflow-y-auto" ref={scrollRef}>
          <div className="max-w-4xl mx-auto px-4 sm:px-8 py-8 flex flex-col min-h-full">
            
            {/* Context Badge (Current Assistant) */}
            {!isNewChat && (
              <div className="flex justify-between items-center mb-8 px-2">
                <div className="px-4 py-1.5 bg-white border morandi-border rounded-full text-[11px] font-bold text-gray-400 uppercase tracking-widest shadow-sm animate-fade-in">
                  正在与 <span className="morandi-orange">{currentCategory}</span> 对话
                </div>
              </div>
            )}

            {/* Content: Switch between Welcome and Chat List */}
            <div className="flex-1 relative">
              {isNewChat ? (
                <WelcomeState 
                  onSuggestionClick={handleSendMessage} 
                  currentCategory={currentCategory} 
                />
              ) : (
                <MessageList messages={messages} onClear={handleNewChat} />
              )}
            </div>
          </div>
        </div>

        {/* Floating Input Area */}
        <div className="px-4 pb-10 sm:px-8">
          <div className="max-w-3xl mx-auto">
            <MessageInput onSend={handleSendMessage} disabled={isLoading} />
          </div>
        </div>
      </div>
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(-10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in {
          animation: fadeIn 0.5s ease-out forwards;
        }
      `}</style>
    </div>
  );
};

export default App;
