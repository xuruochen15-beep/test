import React, { useState } from 'react';
import { Message, Role } from '../types';

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
      {parts.map((part, i) => 
        part.toLowerCase() === query.toLowerCase() ? (
          <mark key={i} className="bg-[#e9ccbc] text-white px-0.5 rounded-sm font-semibold">
            {part}
          </mark>
        ) : (
          part
        )
      )}
    </>
  );
};

export const MessageList: React.FC<MessageListProps> = ({ messages, onClear, searchQuery = '' }) => {
  const [activeFeedbackId, setActiveFeedbackId] = useState<string | null>(null);
  const [feedbackValues, setFeedbackValues] = useState<Record<string, string>>({});
  const [submittedFeedback, setSubmittedFeedback] = useState<Record<string, boolean>>({});
  const [ratings, setRatings] = useState<Record<string, 'like' | 'dislike'>>({});

  const handleFeedbackToggle = (id: string) => {
    setActiveFeedbackId(activeFeedbackId === id ? null : id);
  };

  const handleFeedbackSubmit = (id: string) => {
    if (!feedbackValues[id]?.trim()) return;
    setSubmittedFeedback({ ...submittedFeedback, [id]: true });
    setActiveFeedbackId(null);
    // Auto-clear success message after 3 seconds
    setTimeout(() => {
      setSubmittedFeedback(prev => ({ ...prev, [id]: false }));
    }, 3000);
  };

  const handleRating = (id: string, type: 'like' | 'dislike') => {
    setRatings({ ...ratings, [id]: ratings[id] === type ? undefined : type } as any);
  };

  return (
    <div className="relative pb-20">
      <div className="flex justify-center mb-10 -mt-2 animate-fade-in-up">
        <button 
          onClick={onClear}
          className="group flex items-center space-x-2 px-6 py-2 bg-white/40 hover:bg-white border morandi-border rounded-full transition-all hover:shadow-orange-glow"
        >
          <svg className="w-4 h-4 text-gray-400 group-hover:morandi-orange transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
          </svg>
          <span className="text-xs font-medium text-gray-400 group-hover:morandi-orange transition-colors">清空当前对话记录</span>
        </button>
      </div>

      <div className="space-y-12">
        {messages.map((message) => {
          const isModel = message.role === Role.MODEL;
          const timeStr = message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
          const isMatch = searchQuery && message.content.toLowerCase().includes(searchQuery.toLowerCase());
          const isFeedbackOpen = activeFeedbackId === message.id;
          const currentRating = ratings[message.id];
          const hasSubmitted = submittedFeedback[message.id];

          return (
            <div key={message.id} className={`flex w-full group ${isModel ? 'justify-start' : 'justify-end'}`}>
              <div className={`flex max-w-[90%] sm:max-w-[75%] ${isModel ? 'flex-row' : 'flex-row-reverse'}`}>
                
                <div className={`flex-shrink-0 w-9 h-9 rounded-full flex items-center justify-center font-bold text-white shadow-sm overflow-hidden transition-all duration-700 ${isModel ? 'morandi-orange-bg opacity-95' : 'bg-gray-300'} ${message.isStreaming ? 'ring-2 ring-[#f3ded2] scale-105' : ''}`}>
                  {isModel ? (
                    <span className="text-xs">AI</span>
                  ) : (
                    <img src="https://picsum.photos/seed/user-avatar/100" alt="U" />
                  )}
                </div>

                <div className={`mx-3 flex flex-col ${isModel ? 'items-start' : 'items-end'}`}>
                  <div className={`relative px-5 py-3.5 rounded-3xl text-sm leading-relaxed transition-all duration-500
                    ${isModel 
                      ? 'bg-white text-gray-700 border border-[#f5efec] rounded-tl-none shadow-[0_2px_12px_rgba(198,139,107,0.05)]' 
                      : 'morandi-orange-bg text-white rounded-tr-none shadow-orange-glow'
                    } ${message.isStreaming ? 'animate-streaming-breath' : ''} ${isMatch ? 'ring-2 ring-orange-200' : ''}`}>
                    
                    <div className={message.isStreaming ? 'animate-content-emerge' : ''}>
                      <HighlightText text={message.content} query={searchQuery} />
                      {message.isStreaming && (
                        <span className="inline-flex items-center ml-2 space-x-1.5 align-middle">
                          <span className="w-1.5 h-1.5 rounded-full bg-white/60 animate-pulse-soft" style={{ animationDelay: '0ms' }}></span>
                          <span className="w-1.5 h-1.5 rounded-full bg-white/60 animate-pulse-soft" style={{ animationDelay: '200ms' }}></span>
                          <span className="w-1.5 h-1.5 rounded-full bg-white/60 animate-pulse-soft" style={{ animationDelay: '400ms' }}></span>
                        </span>
                      )}
                    </div>

                    {/* Feedback Text Area inside Bubble */}
                    {isFeedbackOpen && (
                      <div className="mt-4 pt-4 border-t border-gray-50 animate-fade-in">
                        <textarea
                          placeholder="告诉我们您的建议..."
                          className="w-full p-3 bg-[#fcf8f6] border border-[#f3ded2] rounded-xl text-xs text-gray-600 focus:outline-none focus:ring-1 focus:ring-orange-200 resize-none h-20 placeholder:text-gray-300"
                          value={feedbackValues[message.id] || ''}
                          onChange={(e) => setFeedbackValues({ ...feedbackValues, [message.id]: e.target.value })}
                        />
                        <div className="mt-2 flex justify-end">
                           <button 
                             onClick={() => handleFeedbackSubmit(message.id)}
                             disabled={!feedbackValues[message.id]?.trim()}
                             className={`px-4 py-1.5 rounded-lg text-[10px] font-bold transition-all ${feedbackValues[message.id]?.trim() ? 'morandi-orange-bg text-white shadow-sm hover:scale-105' : 'bg-gray-100 text-gray-300'}`}
                           >
                             提交反馈
                           </button>
                        </div>
                      </div>
                    )}
                    
                    {/* Success Toast inside Bubble */}
                    {hasSubmitted && (
                      <div className="mt-3 py-2 bg-green-50 text-green-600 rounded-xl text-[10px] text-center font-medium animate-fade-in flex items-center justify-center space-x-2">
                        <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/></svg>
                        <span>感谢您的反馈，小优会继续努力！</span>
                      </div>
                    )}
                  </div>
                  
                  {/* Enhanced Actions Bar */}
                  <div className="mt-2 flex items-center space-x-3 transition-all duration-300">
                     <span className="text-[10px] text-gray-400 font-light tracking-wide">{timeStr}</span>
                     
                     {isModel && !message.isStreaming && (
                       <div className="flex items-center space-x-1 opacity-0 group-hover:opacity-100 transition-opacity bg-white/50 backdrop-blur-sm px-2 py-1 rounded-full border border-gray-100/50 shadow-sm">
                          {/* Copy */}
                          <button 
                            className="p-1.5 hover:morandi-orange text-gray-400 hover:bg-white rounded-lg transition-all" 
                            title="复制内容"
                            onClick={() => navigator.clipboard.writeText(message.content)}
                          >
                             <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                             </svg>
                          </button>

                          {/* Like */}
                          <button 
                            className={`p-1.5 rounded-lg transition-all ${currentRating === 'like' ? 'morandi-orange bg-white scale-110 shadow-sm' : 'text-gray-400 hover:morandi-orange hover:bg-white'}`}
                            title="点赞"
                            onClick={() => handleRating(message.id, 'like')}
                          >
                             <svg className="w-3.5 h-3.5" fill={currentRating === 'like' ? 'currentColor' : 'none'} stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 10h4.708c.949 0 1.703.84 1.598 1.78l-1 9A1.6 1.6 0 0117.708 22H7.5c-1.278 0-2.315-.868-2.5-2H3a1 1 0 01-1-1v-4a1 1 0 011-1h1.5c.185-1.132 1.222-2 2.5-2h1.5a2 2 0 002-2V7a2 2 0 114 0v3z" />
                             </svg>
                          </button>

                          {/* Dislike */}
                          <button 
                            className={`p-1.5 rounded-lg transition-all ${currentRating === 'dislike' ? 'text-red-400 bg-white scale-110 shadow-sm' : 'text-gray-400 hover:text-red-400 hover:bg-white'}`}
                            title="点踩"
                            onClick={() => handleRating(message.id, 'dislike')}
                          >
                             <svg className="w-3.5 h-3.5" fill={currentRating === 'dislike' ? 'currentColor' : 'none'} stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 14H5.292c-.949 0-1.703-.84-1.598-1.78l1-9A1.6 1.6 0 016.292 2H16.5c1.278 0 2.315.868 2.5 2h1.5a1 1 0 011 1v4a1 1 0 01-1 1h-1.5c-.185 1.132-1.222 2-2.5 2H15a2 2 0 00-2 2v7a2 2 0 11-4 0v-3z" />
                             </svg>
                          </button>

                          {/* Feedback Button */}
                          <button 
                            onClick={() => handleFeedbackToggle(message.id)}
                            className={`p-1.5 rounded-lg transition-all ${isFeedbackOpen ? 'morandi-orange bg-white' : 'text-gray-400 hover:morandi-orange hover:bg-white'}`}
                            title="问题反馈"
                          >
                             <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z" />
                             </svg>
                          </button>
                       </div>
                     )}
                  </div>
                </div>

              </div>
            </div>
          );
        })}
      </div>
      <style>{`
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in-up {
          animation: fadeInUp 0.6s ease-out forwards;
        }
        @keyframes contentEmerge {
          from { opacity: 0.7; transform: translateY(1px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes streamingBreath {
          0%, 100% { border-color: #f9f3f0; }
          50% { border-color: #e9ccbc; box-shadow: 0 4px 15px -2px rgba(198, 139, 107, 0.1); }
        }
        @keyframes pulseSoft {
          0%, 100% { transform: scale(0.8); opacity: 0.3; }
          50% { transform: scale(1.1); opacity: 0.8; }
        }
        .animate-content-emerge {
          animation: contentEmerge 0.6s ease-out forwards;
        }
        .animate-streaming-breath {
          animation: streamingBreath 2.5s infinite ease-in-out;
        }
        .animate-pulse-soft {
          animation: pulseSoft 1.8s infinite ease-in-out;
        }
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(-5px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in {
          animation: fadeIn 0.3s ease-out forwards;
        }
      `}</style>
    </div>
  );
};