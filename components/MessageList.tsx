import React from 'react';
import { Message, Role } from '../types';

interface MessageListProps {
  messages: Message[];
  onClear: () => void;
}

export const MessageList: React.FC<MessageListProps> = ({ messages, onClear }) => {
  return (
    <div className="relative">
      {/* Fancy Clear Button at the top of the chat */}
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

      <div className="space-y-10">
        {messages.map((message) => {
          const isModel = message.role === Role.MODEL;
          const timeStr = message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

          return (
            <div key={message.id} className={`flex w-full group ${isModel ? 'justify-start' : 'justify-end'}`}>
              <div className={`flex max-w-[85%] sm:max-w-[70%] ${isModel ? 'flex-row' : 'flex-row-reverse'}`}>
                
                {/* Avatar with Warm Ring */}
                <div className={`flex-shrink-0 w-9 h-9 rounded-full flex items-center justify-center font-bold text-white shadow-sm overflow-hidden transition-all duration-700 ${isModel ? 'morandi-orange-bg opacity-95' : 'bg-gray-300'} ${message.isStreaming ? 'ring-2 ring-[#f3ded2] scale-105' : ''}`}>
                  {isModel ? (
                    <span className="text-xs">AI</span>
                  ) : (
                    <img src="https://picsum.photos/seed/user-avatar/100" alt="U" />
                  )}
                </div>

                {/* Content Bubble */}
                <div className={`mx-3 flex flex-col ${isModel ? 'items-start' : 'items-end'}`}>
                  <div className={`relative px-5 py-3.5 rounded-3xl text-sm leading-relaxed transition-all duration-500
                    ${isModel 
                      ? 'bg-white text-gray-700 border border-[#f5efec] rounded-tl-none shadow-[0_2px_12px_rgba(198,139,107,0.05)]' 
                      : 'morandi-orange-bg text-white rounded-tr-none shadow-orange-glow'
                    } ${message.isStreaming ? 'animate-streaming-breath' : ''}`}>
                    
                    <div className={message.isStreaming ? 'animate-content-emerge' : ''}>
                      {message.content}
                      {message.isStreaming && (
                        <span className="inline-flex items-center ml-2 space-x-1.5 align-middle">
                          <span className="w-1.5 h-1.5 rounded-full bg-white/60 animate-pulse-soft" style={{ animationDelay: '0ms' }}></span>
                          <span className="w-1.5 h-1.5 rounded-full bg-white/60 animate-pulse-soft" style={{ animationDelay: '200ms' }}></span>
                          <span className="w-1.5 h-1.5 rounded-full bg-white/60 animate-pulse-soft" style={{ animationDelay: '400ms' }}></span>
                        </span>
                      )}
                    </div>
                  </div>
                  
                  {/* Actions and Timestamp */}
                  <div className="mt-2 flex items-center space-x-3 text-[10px] text-gray-400 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-1 group-hover:translate-y-0">
                     <span className="font-light tracking-wide">{timeStr}</span>
                     {isModel && !message.isStreaming && (
                       <div className="flex items-center space-x-1 border-l border-gray-100 pl-3">
                          <button 
                            className="p-1.5 hover:morandi-orange hover:bg-white rounded-lg transition-all" 
                            title="复制内容"
                            onClick={() => navigator.clipboard.writeText(message.content)}
                          >
                             <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                             </svg>
                          </button>
                          <button className="p-1.5 hover:morandi-orange hover:bg-white rounded-lg transition-all" title="赞同">
                             <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 10h4.708c.949 0 1.703.84 1.598 1.78l-1 9A1.6 1.6 0 0117.708 22H7.5c-1.278 0-2.315-.868-2.5-2H3a1 1 0 01-1-1v-4a1 1 0 011-1h1.5c.185-1.132 1.222-2 2.5-2h1.5a2 2 0 002-2V7a2 2 0 114 0v3z" />
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
      `}</style>
    </div>
  );
};