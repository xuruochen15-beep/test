
import React, { useState, useRef, useEffect } from 'react';
import { Sidebar } from './components/Sidebar';
import { Header } from './components/Header';
import { MessageList } from './components/MessageList';
import { MessageInput } from './components/MessageInput';
import { WelcomeState } from './components/WelcomeState';
import { AdminConsole } from './components/Admin/AdminConsole';
import { Message, Role, Category, AdminSubCategory } from './types';
import { getGeminiResponse } from './services/geminiService';

const App: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [category, setCategory] = useState<Category>(Category.DATA);
  const [adminSub, setAdminSub] = useState<AdminSubCategory>(AdminSubCategory.USER);
  const [loading, setLoading] = useState(false);
  const [query, setQuery] = useState('');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
  }, [messages]);

  const onSend = async (text: string) => {
    if (!text.trim() || loading) return;
    const userMsg = { id: Date.now().toString(), role: Role.USER, content: text, timestamp: new Date() };
    setMessages(p => [...p, userMsg]);
    setLoading(true);

    const aiMsgId = (Date.now() + 1).toString();
    setMessages(p => [...p, { id: aiMsgId, role: Role.MODEL, content: '', timestamp: new Date(), isStreaming: true }]);

    try {
      let full = "";
      await getGeminiResponse([...messages, userMsg], (chunk) => {
        full += chunk;
        setMessages(p => p.map(m => m.id === aiMsgId ? { ...m, content: full } : m));
      });
      setMessages(p => p.map(m => m.id === aiMsgId ? { ...m, isStreaming: false } : m));
    } catch (e) {
      setMessages(p => p.map(m => m.id === aiMsgId ? { ...m, content: '服务响应异常，请重试。', isStreaming: false } : m));
    } finally {
      setLoading(false);
    }
  };

  const isAdmin = category === Category.ADMIN;

  return (
    <div className="flex h-screen w-full bg-[#f9f3f0] text-gray-700 overflow-hidden font-sans relative">
      <Sidebar 
        currentCategory={category} 
        currentAdminSub={adminSub}
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
        onSelectCategory={(c) => { 
          setCategory(c); 
          if (c !== Category.ADMIN) setMessages([]); 
          setIsSidebarOpen(false);
        }} 
        onSelectAdminSub={(sub) => {
          setAdminSub(sub);
          setIsSidebarOpen(false);
        }}
        onClearChat={() => {
          setMessages([]);
          setIsSidebarOpen(false);
        }} 
      />
      <div className="flex flex-col flex-1 min-w-0">
        <Header 
          onNewChat={() => setMessages([])} 
          onToggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)}
          currentCategory={isAdmin ? `${category} - ${adminSub}` : category} 
          searchQuery={query} 
          onSearchChange={setQuery} 
        />
        <div className="flex-1 overflow-y-auto px-4 py-4 sm:py-8" ref={scrollRef}>
          <div className="max-w-6xl mx-auto h-full">
            {isAdmin ? (
              <AdminConsole currentSub={adminSub} />
            ) : (
              messages.length === 0 
                ? <WelcomeState onSuggestionClick={onSend} currentCategory={category} /> 
                : <MessageList messages={messages} onClear={() => setMessages([])} searchQuery={query} />
            )}
          </div>
        </div>
        {!isAdmin && (
          <div className="p-4 sm:p-6 max-w-3xl mx-auto w-full">
            <MessageInput onSend={onSend} disabled={loading} />
          </div>
        )}
      </div>
    </div>
  );
};

export default App;
