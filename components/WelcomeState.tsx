import React from 'react';
import { Category } from '../types';

interface WelcomeStateProps {
  onSuggestionClick: (text: string) => void;
  currentCategory: Category;
}

const DESCRIPTIONS: Record<string, string> = {
  [Category.DATA]: '为您提供企业经营数据、奖金核算及业绩指标的专业查询与分析服务，助力数据驱动决策。',
  [Category.PROCESS]: '整合财务、法务、招投标等维度的规章制度与管理规范，为您提供一站式的业务流程指引。',
  [Category.OFFICE]: '您的全能数字化办公伙伴，提供会议纪要自动化、差旅订票协助、费用报销指引及专业标书撰写辅助。'
};

const SUGGESTIONS: Record<string, string[]> = {
  [Category.DATA]: [
    '查询我本季度的绩效奖金核算详情',
    '分析所属部门近半年的业绩达成率趋势',
    '统计本月度经营目标的完成进度',
    '对比各区域主要产品线的销售数据'
  ],
  [Category.PROCESS]: [
    '差旅费报销的标准流程及要求是什么？',
    '合同在线审批的具体步骤及注意事项有哪些？',
    '如何获取公司最新的招投标资质证明文件？',
    '查询最新的竞业禁止协议条款详情',
    '标书撰写过程中对企业实力的描述有何规范？'
  ],
  [Category.OFFICE]: [
    '帮我预约下午2点的视频会议室',
    '查询下周前往上海的差旅政策限制',
    '如何在线提交加班餐费及打车报销？',
    '请根据附件内容生成一份项目技术方案大纲',
    '帮我润色一段关于项目售后服务的专业描述'
  ]
};

const OFFICE_MODULES = [
  { name: '会议助手', icon: '📝', desc: '会议预约、纪要整理' },
  { name: '差旅助手', icon: '✈️', desc: '差旅申请、政策查询' },
  { name: '报销助手', icon: '🧾', desc: '快速报销、额度核算' },
  { name: '标书撰写', icon: '🖊️', desc: '方案起草、文本润色' },
];

const DATA_MODULES = [
  { name: '奖金数据问询', icon: '💰', desc: '核算详情、发放进度' },
  { name: '业绩数据问询', icon: '📈', desc: '指标达成、经营分析' },
];

const PROCESS_MODULES = [
  { name: '财务咨询助手', icon: '💰', desc: '报销规范、财务制度' },
  { name: '法务咨询助手', icon: '⚖️', desc: '合同合规、法律条款' },
  { name: '招投标咨询助手', icon: '🏗️', desc: '流程规范、资质管理' },
];

export const WelcomeState: React.FC<WelcomeStateProps> = ({ onSuggestionClick, currentCategory }) => {
  const suggestions = SUGGESTIONS[currentCategory as string] || SUGGESTIONS[Category.DATA];
  const description = DESCRIPTIONS[currentCategory as string] || '已准备好为您提供专业、精准的咨询服务。';
  
  const isOffice = currentCategory === Category.OFFICE;
  const isData = currentCategory === Category.DATA;
  const isProcess = currentCategory === Category.PROCESS;

  return (
    <div className="flex flex-col items-center justify-center py-12 px-4 max-w-4xl mx-auto text-center">
      <div className="w-24 h-24 morandi-orange-soft-bg rounded-[2rem] flex items-center justify-center text-white text-4xl mb-8 shadow-xl shadow-orange-100 animate-float">
        {isOffice ? '🏢' : (isData ? '📊' : '📜')}
      </div>
      <h2 className="text-3xl font-bold text-gray-800 mb-4 tracking-tight">
        您好，我是您的{currentCategory}
      </h2>
      <p className="text-gray-500 text-sm mb-12 max-w-lg mx-auto leading-relaxed px-4 py-3 bg-white/50 rounded-2xl border border-dashed border-orange-100/50">
        {description}
      </p>

      {/* Special Sub-modules for Data Consulting Assistant */}
      {isData && (
        <div className="grid grid-cols-2 gap-4 w-full mb-16 max-w-lg">
          {DATA_MODULES.map((module) => (
            <button
              key={module.name}
              onClick={() => onSuggestionClick(`我想进行${module.name}`)}
              className="bg-white p-6 rounded-[2.5rem] border morandi-border shadow-sm hover:shadow-orange-glow hover:border-orange-200 transition-all group relative overflow-hidden flex flex-col items-center"
            >
              <div className="absolute top-0 right-0 w-16 h-16 bg-orange-50/30 rounded-bl-full -mr-4 -mt-4 transition-transform group-hover:scale-150"></div>
              <div className="text-3xl mb-4 group-hover:scale-110 transition-transform">{module.icon}</div>
              <h3 className="font-bold text-gray-700 mb-2 text-base">{module.name}</h3>
              <p className="text-[10px] text-gray-400 leading-tight">{module.desc}</p>
            </button>
          ))}
        </div>
      )}

      {/* Special Sub-modules for System & Process Assistant */}
      {isProcess && (
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 w-full mb-16 max-w-2xl">
          {PROCESS_MODULES.map((module) => (
            <button
              key={module.name}
              onClick={() => onSuggestionClick(`我想咨询${module.name}相关业务`)}
              className="bg-white p-6 rounded-[2.5rem] border morandi-border shadow-sm hover:shadow-orange-glow hover:border-orange-200 transition-all group relative overflow-hidden flex flex-col items-center"
            >
              <div className="absolute top-0 right-0 w-14 h-14 bg-orange-50/30 rounded-bl-full -mr-4 -mt-4 transition-transform group-hover:scale-150"></div>
              <div className="text-3xl mb-4 group-hover:scale-110 transition-transform">{module.icon}</div>
              <h3 className="font-bold text-gray-700 mb-2 text-sm">{module.name}</h3>
              <p className="text-[10px] text-gray-400 leading-tight">{module.desc}</p>
            </button>
          ))}
        </div>
      )}

      {/* Special Sub-modules for Employee Office Assistant */}
      {isOffice && (
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 w-full mb-16">
          {OFFICE_MODULES.map((module) => (
            <button
              key={module.name}
              onClick={() => onSuggestionClick(`我想了解${module.name}的相关功能`)}
              className="bg-white p-5 rounded-[2.5rem] border morandi-border shadow-sm hover:shadow-orange-glow hover:border-orange-200 transition-all group relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-12 h-12 bg-orange-50/30 rounded-bl-full -mr-3 -mt-3 transition-transform group-hover:scale-150"></div>
              <div className="text-2xl mb-3 group-hover:scale-110 transition-transform">{module.icon}</div>
              <h3 className="font-bold text-gray-700 mb-1 text-sm">{module.name}</h3>
              <p className="text-[9px] text-gray-400 leading-tight">{module.desc}</p>
            </button>
          ))}
        </div>
      )}
      
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full">
        {suggestions.map((text, i) => (
          <button
            key={i}
            onClick={() => onSuggestionClick(text)}
            className="p-5 bg-white border morandi-border rounded-2xl text-left text-sm text-gray-600 hover:morandi-orange hover:border-[#c68b6b] hover:shadow-xl hover:shadow-orange-50/50 transition-all group flex items-start space-x-3"
          >
            <span className="mt-1 text-[8px] morandi-orange opacity-40 group-hover:opacity-100 group-hover:scale-125 transition-all">●</span>
            <span className="font-medium group-hover:translate-x-1 transition-transform">{text}</span>
          </button>
        ))}
      </div>

      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0) rotate(0deg); }
          50% { transform: translateY(-15px) rotate(3deg); }
        }
        .animate-float {
          animation: float 5s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
};
