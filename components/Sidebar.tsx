import React, { useState } from 'react';
import { Category, AdminSubCategory } from '../types';

interface SidebarProps {
  currentCategory: Category;
  currentAdminSub?: AdminSubCategory;
  isOpen: boolean;
  onClose: () => void;
  onSelectCategory: (cat: Category) => void;
  onSelectAdminSub?: (sub: AdminSubCategory) => void;
  onClearChat: () => void;
}

const ASSISTANTS = [
  { id: Category.DATA, icon: '📊' },
  { id: Category.PROCESS, icon: '📜' },
  { id: Category.OFFICE, icon: '🏢' },
];

const ADMIN_SUBS = [
  { id: AdminSubCategory.USER, icon: '👥', label: '用户管理', en: 'User Management' },
  { id: AdminSubCategory.ROLE, icon: '🛡️', label: '角色管理', en: 'Role Management' },
  { id: AdminSubCategory.MENU, icon: '🗺️', label: '菜单管理', en: 'Menu Management' },
  { id: AdminSubCategory.LOGS, icon: '📋', label: '后台日志', en: 'Audit Logs' },
];

export const Sidebar: React.FC<SidebarProps> = ({ 
  currentCategory, 
  currentAdminSub,
  isOpen,
  onClose,
  onSelectCategory, 
  onSelectAdminSub,
  onClearChat 
}) => {
  const [isAdminExpanded, setIsAdminExpanded] = useState(currentCategory === Category.ADMIN);

  return (
    <>
      {/* Mobile Backdrop */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40 md:hidden transition-opacity"
          onClick={onClose}
        />
      )}

      <div className={`
        fixed md:static inset-y-0 left-0 z-50 w-64 sm:w-72 h-full morandi-bg border-r morandi-border flex flex-col transition-transform duration-300 ease-in-out shadow-inner
        ${isOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
      `}>
        {/* Logo Area */}
        <div className="p-6 sm:p-8 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 morandi-orange-soft-bg rounded-2xl flex items-center justify-center text-white font-bold text-lg shadow-md shadow-orange-900/10">
              ✨
            </div>
            <div className="flex flex-col">
              <span className="font-bold text-gray-700 tracking-tight text-lg">智慧中台</span>
              <span className="text-[10px] text-gray-400 font-medium tracking-widest uppercase">Intelligent Hub</span>
            </div>
          </div>
          <button onClick={onClose} className="md:hidden p-2 text-gray-400 hover:text-gray-600">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-4 sm:px-6 py-2">
          <div className="mb-6">
            <h3 className="text-[10px] font-bold text-gray-500/70 uppercase tracking-[0.2em] mb-4 sm:mb-6 px-2">业务智能体</h3>
            <div className="space-y-2 sm:space-y-3">
              {ASSISTANTS.map((assistant) => (
                <button 
                  key={assistant.id} 
                  onClick={() => onSelectCategory(assistant.id)}
                  className={`
                    w-full group flex items-center space-x-3 sm:space-x-4 p-3 sm:p-4 rounded-2xl transition-all duration-300 border
                    ${currentCategory === assistant.id 
                      ? 'bg-white shadow-lg border-orange-100/50 translate-x-1' 
                      : 'bg-transparent border-transparent hover:bg-white/40 hover:border-white/60'
                    }
                  `}
                >
                  <div className={`
                    w-8 h-8 sm:w-10 sm:h-10 rounded-xl flex items-center justify-center text-lg sm:text-xl transition-all
                    ${currentCategory === assistant.id ? 'morandi-orange-light' : 'bg-white/30 group-hover:bg-white/60'}
                  `}>
                    {assistant.icon}
                  </div>
                  <div className="flex flex-col items-start">
                    <p className={`text-xs sm:text-sm font-semibold transition-colors ${currentCategory === assistant.id ? 'morandi-orange' : 'text-gray-500 group-hover:text-gray-700'}`}>
                      {assistant.id}
                    </p>
                    <p className="text-[9px] sm:text-[10px] text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity">点击开启专属咨询</p>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Admin Section */}
          <div className="mb-6">
            <button 
              onClick={() => {
                setIsAdminExpanded(!isAdminExpanded);
                if (!isAdminExpanded) {
                  onSelectCategory(Category.ADMIN);
                  onSelectAdminSub?.(AdminSubCategory.USER);
                }
              }}
              className={`
                w-full group flex items-center justify-between p-3 sm:p-4 rounded-2xl transition-all duration-300 border mb-2
                ${currentCategory === Category.ADMIN 
                  ? 'bg-white shadow-lg border-orange-100/50' 
                  : 'bg-transparent border-transparent hover:bg-white/40'
                }
              `}
            >
              <div className="flex items-center space-x-3 sm:space-x-4">
                <div className={`
                  w-8 h-8 sm:w-10 sm:h-10 rounded-xl flex items-center justify-center text-lg sm:text-xl transition-all
                  ${currentCategory === Category.ADMIN ? 'morandi-orange-light' : 'bg-white/30 group-hover:bg-white/60'}
                `}>
                  ⚙️
                </div>
                <div className="flex flex-col items-start">
                  <p className={`text-xs sm:text-sm font-semibold transition-colors ${currentCategory === Category.ADMIN ? 'morandi-orange' : 'text-gray-500 group-hover:text-gray-700'}`}>
                    管理后台
                  </p>
                  <p className="text-[9px] sm:text-[10px] text-gray-400">系统权限与配置</p>
                </div>
              </div>
              <svg className={`w-4 h-4 text-gray-400 transition-transform ${isAdminExpanded ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>

            {isAdminExpanded && (
              <div className="ml-4 pl-4 border-l-2 border-orange-100 space-y-1 mt-2">
                {ADMIN_SUBS.map((sub) => (
                  <button
                    key={sub.id}
                    onClick={() => {
                      onSelectCategory(Category.ADMIN);
                      onSelectAdminSub?.(sub.id);
                    }}
                    className={`
                      w-full flex items-center space-x-3 p-2.5 sm:p-3 rounded-xl transition-all text-left
                      ${currentCategory === Category.ADMIN && currentAdminSub === sub.id
                        ? 'bg-orange-50 text-orange-600 font-medium'
                        : 'text-gray-500 hover:bg-white/40 hover:text-gray-700'
                      }
                    `}
                  >
                    <span className="text-base sm:text-lg">{sub.icon}</span>
                    <div className="flex flex-col">
                      <span className="text-[11px] sm:text-xs">{sub.label}</span>
                      <span className="text-[8px] sm:text-[9px] opacity-60 uppercase tracking-tighter">{sub.en}</span>
                    </div>
                  </button>
                ))}
              </div>
            )}
          </div>

          <div className="mt-8 px-2">
            <div className="p-4 bg-white/20 rounded-2xl border border-dashed border-gray-300">
               <p className="text-[10px] sm:text-[11px] text-gray-500 leading-relaxed italic">
                 "设计是沉默的语言，莫兰迪色系在宁静中传递着专业与信任。"
               </p>
            </div>
          </div>
        </div>

        {/* User Info Section */}
        <div className="p-4 sm:p-6 border-t morandi-border bg-white/10 backdrop-blur-sm">
          <div className="flex items-center space-x-3 p-2 sm:p-3 rounded-2xl hover:bg-white/30 transition-all cursor-pointer border border-transparent hover:border-gray-200">
            <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-gray-200 flex items-center justify-center shadow-inner border-2 border-white overflow-hidden">
              <img src="https://picsum.photos/seed/design-user/100" alt="avatar" />
            </div>
            <div className="flex-1 overflow-hidden">
              <p className="text-xs sm:text-sm font-bold text-gray-700 truncate">高级顾问</p>
              <div className="flex items-center space-x-1">
                <span className="w-1.5 h-1.5 rounded-full bg-green-500"></span>
                <span className="text-[9px] sm:text-[10px] text-gray-400">当前可用</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
