
import React, { useState, useRef, useEffect } from 'react';

interface MessageInputProps {
  onSend: (text: string) => void;
  disabled?: boolean;
}

export const MessageInput: React.FC<MessageInputProps> = ({ onSend, disabled }) => {
  const [text, setText] = useState('');
  const [attachedFile, setAttachedFile] = useState<File | null>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${Math.min(textareaRef.current.scrollHeight, 150)}px`;
    }
  }, [text]);

  const handleSubmit = (e?: React.FormEvent) => {
    e?.preventDefault();
    if ((text.trim() || attachedFile) && !disabled) {
      const messageText = attachedFile 
        ? `${text.trim()} [附件: ${attachedFile.name}]`
        : text.trim();
        
      onSend(messageText);
      setText('');
      setAttachedFile(null);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setAttachedFile(file);
    }
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const removeFile = () => {
    setAttachedFile(null);
  };

  const triggerFileUpload = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="relative group max-w-4xl mx-auto w-full">
      {/* Hidden File Input */}
      <input 
        type="file" 
        ref={fileInputRef} 
        className="hidden" 
        onChange={handleFileChange}
      />

      <div className="bg-white border morandi-border rounded-[2rem] shadow-[0_12px_40px_-12px_rgba(198,139,107,0.18)] overflow-hidden focus-within:ring-2 focus-within:ring-orange-50 transition-all flex flex-col">
        
        {/* Attachment Preview Area */}
        {attachedFile && (
          <div className="px-6 pt-3 flex animate-fade-in">
            <div className="flex items-center space-x-2 px-3 py-1.5 bg-[#fcf8f6] border border-[#f3ded2] rounded-xl group/file">
              <svg className="w-4 h-4 morandi-orange" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              <span className="text-xs font-medium text-gray-600 truncate max-w-[150px]">{attachedFile.name}</span>
              <button 
                onClick={removeFile}
                className="p-0.5 hover:bg-white rounded-md transition-colors"
              >
                <svg className="w-3.5 h-3.5 text-gray-400 hover:text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          </div>
        )}

        <div className="flex items-end p-2 sm:p-3 px-6">
          <textarea
            ref={textareaRef}
            rows={1}
            value={text}
            onChange={(e) => setText(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="请输入您的问题，支持粘贴或上传附件..."
            className="flex-1 bg-transparent border-none focus:ring-0 py-3 text-gray-700 text-sm placeholder:text-gray-300 resize-none min-h-[44px]"
            disabled={disabled}
          />
          
          <div className="flex items-center space-x-1.5 mb-1 ml-2">
             {/* Voice Button */}
             <button 
               title="语音输入"
               className="p-2.5 text-gray-400 hover:morandi-orange hover:bg-orange-50/50 rounded-xl transition-all"
             >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
                </svg>
             </button>

             {/* Attachment Button */}
             <button 
               onClick={triggerFileUpload}
               title="上传附件"
               className="p-2.5 text-gray-400 hover:morandi-orange hover:bg-orange-50/50 rounded-xl transition-all"
             >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13" />
                </svg>
             </button>

             {/* Send Button */}
             <button
                onClick={handleSubmit}
                disabled={disabled || (!text.trim() && !attachedFile)}
                className={`
                  p-3 rounded-2xl transition-all
                  ${(text.trim() || attachedFile) && !disabled 
                    ? 'morandi-orange-bg text-white shadow-lg shadow-orange-glow hover:scale-105 active:scale-95' 
                    : 'bg-gray-50 text-gray-200 cursor-not-allowed'
                  }
                `}
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </button>
          </div>
        </div>
      </div>
      
      {/* Disclaimer / Hints */}
      <div className="mt-3 flex items-center justify-center space-x-4 text-[10px] text-gray-300 font-medium tracking-widest uppercase">
        <span>Warm Intelligence</span>
        <span className="w-1 h-1 rounded-full bg-orange-100"></span>
        <span>Secure Workflow</span>
        <span className="w-1 h-1 rounded-full bg-orange-100"></span>
        <span>Attachments Integrated</span>
      </div>
    </div>
  );
};
