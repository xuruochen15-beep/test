
import React from 'react';
import { Category } from '../types';
import { motion } from 'motion/react';

interface WelcomeStateProps {
  onSuggestionClick: (text: string) => void;
  currentCategory: Category;
}

const DESCRIPTIONS: Record<string, string> = {
  [Category.DATA]: '为您提供企业经营数据、奖金核算及人事假勤薪酬的专业查询与分析服务。',
  [Category.PROCESS]: '整合财务、法务、招投标等维度的规章制度与管理规范，提供一站式指引。',
  [Category.OFFICE]: '您的全能数字化办公伙伴，提供会议、差旅、报销及标书撰写辅助。'
};

const SUGGESTIONS: Record<string, string[]> = {
  [Category.DATA]: ['查询我本季度的绩效奖金', '申请下周三的年假', '分析部门业绩达成率', '查询入职五周年纪念福利'],
  [Category.PROCESS]: ['差旅报销流程', '合同审批步骤', '招投标资质文件', '竞业协议条款'],
  [Category.OFFICE]: ['预定下午会议室', '上海出差政策', '生成项目方案大纲', '润色售后服务描述']
};

const DATA_MODULES = [
  { name: '奖金数据问询', icon: '💰', desc: '核算详情、发放进度' },
  { name: '业绩数据问询', icon: '📈', desc: '指标达成、经营分析' },
  { name: '人事相关问询', icon: '👥', desc: '假勤申请、入职薪酬' },
];

const PROCESS_MODULES = [
  { name: '财务咨询助手', icon: '💵', desc: '报销规范、财务制度' },
  { name: '法务咨询助手', icon: '⚖️', desc: '合同合规、法律条款' },
  { name: '招投标咨询助手', icon: '🏗️', desc: '流程规范、资质管理' },
];

const OFFICE_MODULES = [
  { name: '会议助手', icon: '📝', desc: '会议预约、纪要整理' },
  { name: '差旅助手', icon: '✈️', desc: '申请订票、政策查询' },
  { name: '报销助手', icon: '🧾', desc: '快速报销、额度核算' },
  { name: '标书撰写', icon: '🖊️', desc: '方案起草、文本润色' },
];

export const WelcomeState: React.FC<WelcomeStateProps> = ({ onSuggestionClick, currentCategory }) => {
  const suggestions = SUGGESTIONS[currentCategory] || [];
  
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1 }
  };

  return (
    <motion.div 
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="flex flex-col items-center justify-center py-6 sm:py-12 px-4 max-w-4xl mx-auto text-center"
    >
      <motion.div 
        variants={itemVariants}
        className="w-16 h-16 sm:w-20 sm:h-20 morandi-orange-soft-bg rounded-2xl sm:rounded-[2rem] flex items-center justify-center text-white text-2xl sm:text-3xl mb-4 sm:mb-6 shadow-xl shadow-orange-100"
        animate={{ y: [0, -10, 0] }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
      >
        {currentCategory === Category.DATA ? '📊' : currentCategory === Category.PROCESS ? '📜' : '🏢'}
      </motion.div>
      
      <motion.h2 variants={itemVariants} className="text-xl sm:text-2xl font-bold text-gray-800 mb-2 sm:mb-3 tracking-tight">
        您好，我是您的{currentCategory}
      </motion.h2>
      
      <motion.p variants={itemVariants} className="text-gray-400 text-[10px] sm:text-xs mb-6 sm:mb-10 max-w-lg leading-relaxed">
        {DESCRIPTIONS[currentCategory]}
      </motion.p>

      {/* 业务子模块入口 */}
      <motion.div variants={itemVariants} className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 w-full mb-8 sm:mb-12 max-w-2xl">
        {(currentCategory === Category.DATA ? DATA_MODULES : currentCategory === Category.PROCESS ? PROCESS_MODULES : OFFICE_MODULES).map((m) => (
          <motion.button
            whileHover={{ scale: 1.02, translateY: -4 }}
            whileTap={{ scale: 0.98 }}
            key={m.name}
            onClick={() => onSuggestionClick(`我想办理${m.name}`)}
            className="bg-white p-4 sm:p-5 rounded-2xl sm:rounded-[2rem] border morandi-border shadow-sm hover:shadow-orange-glow hover:border-orange-200 transition-all group flex flex-row sm:flex-col items-center space-x-4 sm:space-x-0"
          >
            <span className="text-2xl sm:text-3xl sm:mb-3 group-hover:scale-110 transition-transform">{m.icon}</span>
            <div className="flex flex-col items-start sm:items-center">
              <span className="font-bold text-gray-700 text-xs sm:text-sm mb-0.5 sm:mb-1">{m.name}</span>
              <span className="text-[9px] sm:text-[10px] text-gray-400">{m.desc}</span>
            </div>
          </motion.button>
        ))}
      </motion.div>

      {/* 快捷问询 */}
      <motion.div variants={itemVariants} className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3 w-full">
        {suggestions.map((text, i) => (
          <motion.button
            whileHover={{ scale: 1.01, backgroundColor: 'rgba(255, 255, 255, 1)' }}
            whileTap={{ scale: 0.99 }}
            key={i}
            onClick={() => onSuggestionClick(text)}
            className="p-3 sm:p-4 bg-white/60 border morandi-border rounded-xl text-left text-[10px] sm:text-xs text-gray-600 hover:shadow-md transition-all flex items-center space-x-2"
          >
            <span className="w-1 h-1 rounded-full morandi-orange-bg flex-shrink-0"></span>
            <span className="truncate">{text}</span>
          </motion.button>
        ))}
      </motion.div>
    </motion.div>
  );
};
