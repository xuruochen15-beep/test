import React from 'react';
import { Category } from '../types';

interface HeaderProps {
  onNewChat: () => void;
  currentCategory: Category;
}

export const Header: React.FC<HeaderProps> = ({ onNewChat, currentCategory }) => {
  return (
    <div className="h-20 flex items-center justify-between px-8 bg-white/30 backdrop-blur-md border-b border-gray-100/50 z-10">
      <div className="flex items-center space-x-2">
        <span className="text-gray-400 md:hidden">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
          </svg>
        </span>
        <div className="flex flex-col">
          <h1 className="text-gray-800 font-bold tracking-tight text-lg">{currentCategory}</h1>
          <p className="text-[10px] text-gray-400 uppercase tracking-widest font-medium">智慧助手小优 · Professional AI</p>
        </div>
      </div>
      
      <div className="flex items-center space-x-4">
        <button 
          onClick={onNewChat}
          className="flex items-center space-x-2 px-5 py-2.5 morandi-orange-soft-bg text-white rounded-xl shadow-lg shadow-orange-100 hover:scale-105 transition-all active:scale-95 font-medium text-sm"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 4v16m8-8H4" />
          </svg>
          <span>新对话</span>
        </button>

        <div className="w-px h-6 bg-gray-200 hidden sm:block mx-2"></div>

        <div className="flex items-center space-x-4 text-gray-400 hidden sm:flex">
          <button className="p-2 hover:bg-gray-50 rounded-lg transition-colors group">
            <svg className="w-5 h-5 group-hover:morandi-orange transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};