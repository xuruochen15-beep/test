
import React, { useState } from 'react';
import { Message, Role } from '../types';
import { motion } from 'motion/react';

interface MessageListProps {
  messages: Message[];
  onClear: () => void;
  searchQuery?: string;
}

const HighlightText: React.FC<{ text: string; query: string }> = ({ text, query }) => {
  if (!query) return <>{text}</>;
  const parts = text.split(new RegExp(`(${query})`, 'gi'));
  return (
    <>
      {parts.map((p, i) => p.toLowerCase() === query.toLowerCase() 
        ? <mark key={i} className="bg-orange-200 text-orange-900 rounded-sm px-0.5">{p}</mark> 
        : p)}
    </>
  );
};

const ThinkingIndicator = () => (
  <div className="flex items-center space-x-1 py-1">
    <motion.span
      animate={{ opacity: [0.3, 1, 0.3] }}
      transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
      className="w-1.5 h-1.5 bg-orange-300 rounded-full"
    />
    <motion.span
      animate={{ opacity: [0.3, 1, 0.3] }}
      transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut", delay: 0.2 }}
      className="w-1.5 h-1.5 bg-orange-300 rounded-full"
    />
    <motion.span
      animate={{ opacity: [0.3, 1, 0.3] }}
      transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut", delay: 0.4 }}
      className="w-1.5 h-1.5 bg-orange-300 rounded-full"
    />
    <span className="text-[11px] text-gray-400 ml-2 font-medium">AI 正在思考中...</span>
  </div>
);

export const MessageList: React.FC<MessageListProps> = ({ messages, onClear, searchQuery = '' }) => {
  const [fbId, setFbId] = useState<string | null>(null);
  const [ratings, setRatings] = useState<Record<string, 'like' | 'dislike'>>({});

  return (
    <div className="space-y-6 sm:space-y-8 pb-10">
      {messages.map((m) => {
        const isAI = m.role === Role.MODEL;
        const isMatch = searchQuery && m.content.toLowerCase().includes(searchQuery.toLowerCase());
        
        return (
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            key={m.id} 
            className={`flex w-full group ${isAI ? 'justify-start' : 'justify-end'}`}
          >
            <div className={`flex max-w-[90%] sm:max-w-[85%] ${isAI ? 'flex-row' : 'flex-row-reverse'}`}>
              <div className={`w-7 h-7 sm:w-8 sm:h-8 rounded-full flex-shrink-0 flex items-center justify-center text-white text-[9px] sm:text-[10px] font-bold ${isAI ? 'morandi-orange-bg' : 'bg-gray-300'}`}>
                {isAI ? 'AI' : 'U'}
              </div>
              <div className={`mx-2 sm:mx-3 flex flex-col ${isAI ? 'items-start' : 'items-end'}`}>
                <div className={`px-4 sm:px-5 py-2.5 sm:py-3 rounded-2xl text-[13px] sm:text-sm leading-relaxed shadow-sm border transition-all ${isAI ? 'bg-white border-orange-50 text-gray-700' : 'morandi-orange-bg text-white border-transparent shadow-orange-glow'} ${isMatch ? 'ring-2 ring-orange-200' : ''}`}>
                  {isAI && m.isStreaming && !m.content ? (
                    <ThinkingIndicator />
                  ) : (
                    <>
                      <HighlightText text={m.content} query={searchQuery} />
                      {isAI && m.isStreaming && (
                        <motion.span 
                          animate={{ opacity: [1, 0] }}
                          transition={{ duration: 0.5, repeat: Infinity, repeatType: "reverse", ease: "easeInOut" }}
                          className="ml-1 inline-block w-1 h-3.5 sm:w-1.5 sm:h-4 bg-orange-300 align-middle"
                        />
                      )}
                    </>
                  )}
                </div>
                
                {isAI && !m.isStreaming && (
                  <div className="mt-1.5 sm:mt-2 flex items-center space-x-2 opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity">
                    <div className="flex items-center space-x-1 bg-white/80 rounded-full px-2 py-0.5 border border-gray-100 text-[9px] sm:text-[10px] text-gray-400">
                      <button onClick={() => navigator.clipboard.writeText(m.content)} className="hover:morandi-orange p-1">复制</button>
                      <button onClick={() => setRatings({...ratings, [m.id]: 'like'})} className={`p-1 ${ratings[m.id] === 'like' ? 'morandi-orange font-bold' : ''}`}>点赞</button>
                      <button onClick={() => setRatings({...ratings, [m.id]: 'dislike'})} className={`p-1 ${ratings[m.id] === 'dislike' ? 'text-red-400 font-bold' : ''}`}>点踩</button>
                      <button onClick={() => setFbId(fbId === m.id ? null : m.id)} className="hover:morandi-orange p-1">反馈</button>
                    </div>
                  </div>
                )}

                {isAI && fbId === m.id && (
                  <div className="mt-2 w-full max-w-[240px] sm:max-w-xs p-3 bg-white border morandi-border rounded-xl shadow-lg animate-fade-in">
                    <textarea placeholder="请填写您的反馈建议..." className="w-full text-[9px] sm:text-[10px] p-2 bg-gray-50 border-none focus:ring-1 focus:ring-orange-100 rounded-lg h-16" />
                    <button onClick={() => setFbId(null)} className="mt-2 w-full py-1.5 morandi-orange-bg text-white text-[9px] sm:text-[10px] rounded-lg font-bold">提交</button>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        );
      })}
    </div>
  );
};
