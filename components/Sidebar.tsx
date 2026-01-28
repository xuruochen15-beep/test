import React from 'react';
import { Category } from '../types';

interface SidebarProps {
  currentCategory: Category;
  onSelectCategory: (cat: Category) => void;
  onClearChat: () => void;
}

const ASSISTANTS = [
  { id: Category.DATA, icon: '📊' },
  { id: Category.PROCESS, icon: '📜' },
  { id: Category.OFFICE, icon: '🏢' },
];

export const Sidebar: React.FC<SidebarProps> = ({ currentCategory, onSelectCategory, onClearChat }) => {
  return (
    <div className="w-64 sm:w-72 h-full morandi-bg border-r morandi-border flex flex-col hidden md:flex transition-all shadow-inner">
      {/* Logo Area */}
      <div className="p-8 flex items-center space-x-3">
        <div className="w-10 h-10 morandi-orange-soft-bg rounded-2xl flex items-center justify-center text-white font-bold text-lg shadow-md shadow-orange-900/10">
          ✨
        </div>
        <div className="flex flex-col">
          <span className="font-bold text-gray-700 tracking-tight text-lg">智慧中台</span>
          <span className="text-[10px] text-gray-400 font-medium tracking-widest uppercase">Intelligent Hub</span>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto px-6 py-2">
        <div className="mb-6">
          <h3 className="text-[10px] font-bold text-gray-500/70 uppercase tracking-[0.2em] mb-6 px-2">业务智能体</h3>
          <div className="space-y-3">
            {ASSISTANTS.map((assistant) => (
              <button 
                key={assistant.id} 
                onClick={() => onSelectCategory(assistant.id)}
                className={`
                  w-full group flex items-center space-x-4 p-4 rounded-2xl transition-all duration-300 border
                  ${currentCategory === assistant.id 
                    ? 'bg-white shadow-lg border-orange-100/50 translate-x-1' 
                    : 'bg-transparent border-transparent hover:bg-white/40 hover:border-white/60'
                  }
                `}
              >
                <div className={`
                  w-10 h-10 rounded-xl flex items-center justify-center text-xl transition-all
                  ${currentCategory === assistant.id ? 'morandi-orange-light' : 'bg-white/30 group-hover:bg-white/60'}
                `}>
                  {assistant.icon}
                </div>
                <div className="flex flex-col items-start">
                  <p className={`text-sm font-semibold transition-colors ${currentCategory === assistant.id ? 'morandi-orange' : 'text-gray-500 group-hover:text-gray-700'}`}>
                    {assistant.id}
                  </p>
                  <p className="text-[10px] text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity">点击开启专属咨询</p>
                </div>
              </button>
            ))}
          </div>
        </div>

        <div className="mt-12 px-2">
          <div className="p-4 bg-white/20 rounded-2xl border border-dashed border-gray-300">
             <p className="text-[11px] text-gray-500 leading-relaxed italic">
               "设计是沉默的语言，莫兰迪色系在宁静中传递着专业与信任。"
             </p>
          </div>
        </div>
      </div>

      {/* User Info Section */}
      <div className="p-6 border-t morandi-border bg-white/10 backdrop-blur-sm">
        <div className="flex items-center space-x-3 p-3 rounded-2xl hover:bg-white/30 transition-all cursor-pointer border border-transparent hover:border-gray-200">
          <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center shadow-inner border-2 border-white overflow-hidden">
            <img src="https://picsum.photos/seed/design-user/100" alt="avatar" />
          </div>
          <div className="flex-1 overflow-hidden">
            <p className="text-sm font-bold text-gray-700 truncate">高级顾问</p>
            <div className="flex items-center space-x-1">
              <span className="w-1.5 h-1.5 rounded-full bg-green-500"></span>
              <span className="text-[10px] text-gray-400">当前可用</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
