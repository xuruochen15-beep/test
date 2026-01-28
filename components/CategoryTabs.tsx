import React from 'react';
import { Category } from '../types';

interface CategoryTabsProps {
  active: Category;
  onSelect: (cat: Category) => void;
}

const TABS = [
  { id: Category.DATA, icon: '📊', label: '数据咨询' },
  { id: Category.PROCESS, icon: '📜', label: '制度及流程' },
  { id: Category.OFFICE, icon: '🏢', label: '员工办公' },
];

export const CategoryTabs: React.FC<CategoryTabsProps> = ({ active, onSelect }) => {
  return (
    <div className="flex flex-wrap items-center justify-center gap-3">
      {TABS.map((tab) => (
        <button
          key={tab.id}
          onClick={() => onSelect(tab.id)}
          className={`
            flex items-center space-x-2 px-5 py-2.5 rounded-2xl transition-all duration-300
            ${active === tab.id 
              ? 'bg-white shadow-md border morandi-border scale-105' 
              : 'bg-white/60 hover:bg-white hover:shadow-sm border border-transparent text-gray-500'
            }
          `}
        >
          <span className="text-lg">{tab.icon}</span>
          <span className={`text-sm font-medium ${active === tab.id ? 'morandi-orange' : ''}`}>
            {tab.label}
          </span>
        </button>
      ))}
    </div>
  );
};
