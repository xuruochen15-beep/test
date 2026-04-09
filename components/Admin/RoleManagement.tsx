import React, { useState } from 'react';

const MOCK_ROLES = [
  { id: '1', name: '智能问数测试组', en: 'AI Query Test Group', members: 12, permissions: ['基础问数', '数据导出', '业绩查询'] },
  { id: '2', name: '销售区域经理组', en: 'Sales Area Manager Group', members: 45, permissions: ['奖金数据问询', '销售KA组权限', '业绩看板'] },
  { id: '3', name: '财务分析组', en: 'Finance Analysis Group', members: 8, permissions: ['全量数据导出', '财务报表问询', '奖金核算'] },
  { id: '4', name: '系统管理员', en: 'System Admin', members: 3, permissions: ['全部功能', '后台管理', '日志审计'] },
];

export const RoleManagement: React.FC = () => {
  const [selectedRole, setSelectedRole] = useState<any>(null);
  const [isAdding, setIsAdding] = useState(false);

  return (
    <div className="flex-1 flex flex-col overflow-hidden">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 sm:mb-8 space-y-4 sm:space-y-0">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold text-gray-800">角色管理</h2>
          <p className="text-xs sm:text-sm text-gray-400 mt-1">定义功能权限集合，支持按部门或角色组批量指派。</p>
        </div>
        <button 
          onClick={() => setIsAdding(true)}
          className="flex items-center justify-center space-x-2 px-4 sm:px-6 py-2.5 sm:py-3 morandi-orange-soft-bg text-white rounded-2xl transition-all font-medium shadow-md hover:scale-105 active:scale-95"
        >
          <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 4v16m8-8H4" />
          </svg>
          <span className="text-sm">创建新角色</span>
        </button>
      </div>

      <div className="flex-1 overflow-hidden flex flex-col lg:flex-row lg:space-x-8 relative">
        {/* Role List */}
        <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 overflow-y-auto p-2">
          {MOCK_ROLES.map(role => (
            <div 
              key={role.id} 
              onClick={() => setSelectedRole(role)}
              className={`p-4 sm:p-6 rounded-2xl sm:rounded-3xl border transition-all cursor-pointer group ${selectedRole?.id === role.id ? 'bg-white shadow-lg border-orange-200 ring-2 ring-orange-50' : 'bg-white/40 morandi-border hover:bg-white/60'}`}
            >
              <div className="flex items-start justify-between mb-3 sm:mb-4">
                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl sm:rounded-2xl morandi-orange-light flex items-center justify-center text-xl sm:text-2xl shadow-inner group-hover:scale-110 transition-transform">
                  🛡️
                </div>
                <span className="px-2 sm:px-3 py-1 bg-gray-100 rounded-full text-[9px] sm:text-[10px] text-gray-400 font-bold uppercase tracking-widest">{role.members} 成员</span>
              </div>
              <h3 className="font-bold text-gray-800 text-base sm:text-lg">{role.name}</h3>
              <p className="text-[9px] sm:text-[10px] text-gray-400 uppercase tracking-widest mb-3 sm:mb-4">{role.en}</p>
              
              <div className="flex flex-wrap gap-1 sm:gap-2 mb-4 sm:mb-6">
                {role.permissions.map(p => (
                  <span key={p} className="px-2 py-0.5 bg-gray-50 text-gray-500 rounded text-[9px] sm:text-[10px] border border-gray-100">{p}</span>
                ))}
              </div>

              <div className="flex items-center justify-between pt-3 sm:pt-4 border-t morandi-border">
                <button className="text-[10px] sm:text-xs font-bold text-gray-400 hover:text-gray-600">批量指派</button>
                <button className="text-[10px] sm:text-xs font-bold morandi-orange">编辑权限</button>
              </div>
            </div>
          ))}
        </div>

        {/* Role Detail Panel */}
        {selectedRole && (
          <div className="fixed lg:static inset-0 lg:inset-auto z-50 lg:z-0 bg-black/20 lg:bg-transparent backdrop-blur-sm lg:backdrop-blur-none flex items-end lg:items-stretch justify-center lg:justify-start">
            <div className="w-full lg:w-96 bg-white rounded-t-3xl lg:rounded-3xl border morandi-border shadow-2xl lg:shadow-lg p-6 flex flex-col animate-in slide-in-from-bottom lg:slide-in-from-right-4 duration-300 max-h-[90vh] lg:max-h-none">
              <div className="flex items-center justify-between mb-6">
                <h3 className="font-bold text-gray-700">权限编辑: {selectedRole.name}</h3>
                <button onClick={() => setSelectedRole(null)} className="text-gray-400 hover:text-gray-600 p-1">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

            <div className="flex-1 space-y-8 overflow-y-auto pr-2">
              <div>
                <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest block mb-4">菜单权限 (Menu Permissions)</label>
                <div className="space-y-4">
                  {[
                    { name: '数据咨询助手', sub: ['基础问数', '业绩查询', '奖金数据问询'] },
                    { name: '制度及流程操作助手', sub: ['流程指引', '制度查询'] },
                    { name: '员工办公助手', sub: ['考勤查询', '会议室预定'] }
                  ].map(menu => (
                    <div key={menu.name} className="space-y-2">
                      <div className="flex items-center space-x-2">
                        <input type="checkbox" className="w-4 h-4 rounded border-gray-300 text-orange-500" defaultChecked />
                        <span className="text-xs font-bold text-gray-700">{menu.name}</span>
                      </div>
                      <div className="ml-6 grid grid-cols-1 gap-2">
                        {menu.sub.map(s => (
                          <label key={s} className="flex items-center space-x-2 cursor-pointer group">
                            <input 
                              type="checkbox" 
                              className="w-3 h-3 rounded border-gray-300 text-orange-400" 
                              defaultChecked={selectedRole.permissions.includes(s)} 
                            />
                            <span className="text-[11px] text-gray-500 group-hover:text-gray-700 transition-colors">{s}</span>
                          </label>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest block mb-4">功能权限 (Function Permissions)</label>
                <div className="space-y-3">
                  {['允许使用 AI 问数', '允许导出数据报表', '允许通过 API 访问', '允许查看团队数据'].map(func => (
                    <label key={func} className="flex items-center justify-between p-3 bg-gray-50 rounded-xl cursor-pointer hover:bg-orange-50/50 transition-colors">
                      <span className="text-xs text-gray-600">{func}</span>
                      <div className="relative inline-flex items-center cursor-pointer">
                        <input type="checkbox" className="sr-only peer" defaultChecked />
                        <div className="w-9 h-5 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-orange-400"></div>
                      </div>
                    </label>
                  ))}
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 mt-8">
              <button className="py-3 border morandi-border text-gray-500 rounded-xl font-bold text-sm hover:bg-gray-50 transition-all">
                取消
              </button>
              <button className="py-3 morandi-orange-bg text-white rounded-xl font-bold text-sm shadow-lg shadow-orange-100 hover:scale-[1.02] active:scale-[0.98] transition-all">
                保存权限
              </button>
            </div>
          </div>
        </div>
        )}
      </div>
    </div>
  );
};
