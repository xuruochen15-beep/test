import React, { useState } from 'react';

const MOCK_MENUS = [
  { id: '1', name: '数据咨询助手', en: 'Data Consulting Assistant', icon: '📊', visibility: ['销售部', '市场部', '财务部'], roles: ['智能问数测试组', '销售区域经理组'] },
  { id: '2', name: '制度及流程操作助手', en: 'Process Assistant', icon: '📜', visibility: ['全员'], roles: ['全员'] },
  { id: '3', name: '员工办公助手', en: 'Office Assistant', icon: '🏢', visibility: ['全员'], roles: ['全员'] },
  { id: '4', name: '奖金数据问询', en: 'Bonus Query', icon: '💰', visibility: ['销售KA组', '财务部'], roles: ['销售区域经理组', '财务分析组'] },
];

export const MenuManagement: React.FC = () => {
  const [selectedMenu, setSelectedMenu] = useState<any>(null);

  return (
    <div className="flex-1 flex flex-col overflow-hidden">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 sm:mb-8 space-y-4 sm:space-y-0">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold text-gray-800">菜单管理</h2>
          <p className="text-xs sm:text-sm text-gray-400 mt-1">配置 UI 左侧展示的菜单项，设置资源可见性与权限关联。</p>
        </div>
        <button className="flex items-center justify-center space-x-2 px-4 sm:px-6 py-2.5 sm:py-3 morandi-orange-soft-bg text-white rounded-2xl transition-all font-medium shadow-md hover:scale-105 active:scale-95">
          <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 4v16m8-8H4" />
          </svg>
          <span className="text-sm">新增菜单项</span>
        </button>
      </div>

      <div className="flex-1 overflow-hidden flex flex-col lg:flex-row lg:space-x-8 relative">
        {/* Menu List */}
        <div className="flex-1 bg-white/40 rounded-2xl sm:rounded-3xl border morandi-border overflow-x-auto p-2">
          <table className="min-w-[700px] lg:min-w-full text-left">
            <thead>
              <tr className="text-[10px] text-gray-400 uppercase tracking-widest border-b morandi-border">
                <th className="px-4 sm:px-6 py-3 sm:py-4 font-bold">菜单资源</th>
                <th className="px-4 sm:px-6 py-3 sm:py-4 font-bold">可见部门</th>
                <th className="px-4 sm:px-6 py-3 sm:py-4 font-bold">关联角色</th>
                <th className="px-4 sm:px-6 py-3 sm:py-4 font-bold">状态</th>
                <th className="px-4 sm:px-6 py-3 sm:py-4 font-bold">操作</th>
              </tr>
            </thead>
            <tbody className="divide-y morandi-border">
              {MOCK_MENUS.map(menu => (
                <tr key={menu.id} className="group hover:bg-white/60 transition-colors">
                  <td className="px-4 sm:px-6 py-4 sm:py-5">
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-xl bg-white flex items-center justify-center text-lg sm:text-xl shadow-inner border morandi-border">
                        {menu.icon}
                      </div>
                      <div>
                        <p className="text-xs sm:text-sm font-bold text-gray-700">{menu.name}</p>
                        <p className="text-[9px] sm:text-[10px] text-gray-400 uppercase tracking-tighter">{menu.en}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 sm:px-6 py-4 sm:py-5">
                    <div className="flex flex-wrap gap-1">
                      {menu.visibility.map(v => (
                        <span key={v} className="px-2 py-0.5 bg-gray-100 rounded text-[9px] sm:text-[10px] text-gray-500">{v}</span>
                      ))}
                    </div>
                  </td>
                  <td className="px-4 sm:px-6 py-4 sm:py-5">
                    <div className="flex flex-wrap gap-1">
                      {menu.roles.map(r => (
                        <span key={r} className="px-2 py-0.5 bg-orange-50 text-orange-600 rounded text-[9px] sm:text-[10px] border border-orange-100">{r}</span>
                      ))}
                    </div>
                  </td>
                  <td className="px-4 sm:px-6 py-4 sm:py-5">
                    <span className="flex items-center space-x-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-green-500"></span>
                      <span className="text-[10px] sm:text-[11px] text-gray-500 font-medium">已发布</span>
                    </span>
                  </td>
                  <td className="px-4 sm:px-6 py-4 sm:py-5">
                    <button 
                      onClick={() => setSelectedMenu(menu)}
                      className="text-[10px] sm:text-xs font-bold morandi-orange hover:underline"
                    >
                      编辑配置
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Menu Detail Panel */}
        {selectedMenu && (
          <div className="fixed lg:static inset-0 lg:inset-auto z-50 lg:z-0 bg-black/20 lg:bg-transparent backdrop-blur-sm lg:backdrop-blur-none flex items-end lg:items-stretch justify-center lg:justify-start">
            <div className="w-full lg:w-96 bg-white rounded-t-3xl lg:rounded-3xl border morandi-border shadow-2xl lg:shadow-lg p-6 flex flex-col animate-in slide-in-from-bottom lg:slide-in-from-right-4 duration-300 max-h-[90vh] lg:max-h-none">
              <div className="flex items-center justify-between mb-6">
                <h3 className="font-bold text-gray-700">资源配置: {selectedMenu.name}</h3>
                <button onClick={() => setSelectedMenu(null)} className="text-gray-400 hover:text-gray-600 p-1">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

            <div className="flex-1 space-y-8 overflow-y-auto pr-2">
              <div>
                <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest block mb-4">基础信息 (Basic Info)</label>
                <div className="space-y-4">
                  <div>
                    <span className="text-[11px] text-gray-400 block mb-1">菜单名称</span>
                    <input type="text" defaultValue={selectedMenu.name} className="w-full px-4 py-2 bg-gray-50 border morandi-border rounded-xl text-sm focus:ring-2 focus:ring-orange-100 focus:border-orange-200 outline-none transition-all" />
                  </div>
                  <div>
                    <span className="text-[11px] text-gray-400 block mb-1">英文名称</span>
                    <input type="text" defaultValue={selectedMenu.en} className="w-full px-4 py-2 bg-gray-50 border morandi-border rounded-xl text-sm focus:ring-2 focus:ring-orange-100 focus:border-orange-200 outline-none transition-all" />
                  </div>
                  <div>
                    <span className="text-[11px] text-gray-400 block mb-1">图标设置</span>
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 rounded-xl bg-gray-50 border morandi-border flex items-center justify-center text-2xl">{selectedMenu.icon}</div>
                      <button className="text-xs font-bold morandi-orange">更换图标</button>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest block mb-4">可见性配置 (Visibility)</label>
                <div className="space-y-4">
                  <div>
                    <span className="text-[11px] text-gray-400 block mb-2">可见部门 (按部门指派)</span>
                    <div className="flex flex-wrap gap-2 p-3 bg-gray-50 rounded-xl border morandi-border min-h-[60px]">
                      {selectedMenu.visibility.map(v => (
                        <span key={v} className="px-2 py-1 bg-white border morandi-border rounded text-[10px] text-gray-600 flex items-center space-x-1">
                          <span>{v}</span>
                          <button className="text-gray-300 hover:text-red-400">×</button>
                        </span>
                      ))}
                      <button className="px-2 py-1 border border-dashed morandi-border rounded text-[10px] text-gray-400 hover:text-orange-400 hover:border-orange-200 transition-colors">+ 添加部门</button>
                    </div>
                  </div>
                  <div>
                    <span className="text-[11px] text-gray-400 block mb-2">可见角色 (按角色指派)</span>
                    <div className="flex flex-wrap gap-2 p-3 bg-gray-50 rounded-xl border morandi-border min-h-[60px]">
                      {selectedMenu.roles.map(r => (
                        <span key={r} className="px-2 py-1 bg-white border morandi-border rounded text-[10px] text-orange-600 flex items-center space-x-1">
                          <span>{r}</span>
                          <button className="text-gray-300 hover:text-red-400">×</button>
                        </span>
                      ))}
                      <button className="px-2 py-1 border border-dashed morandi-border rounded text-[10px] text-gray-400 hover:text-orange-400 hover:border-orange-200 transition-colors">+ 添加角色</button>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 mt-8">
              <button className="py-3 border morandi-border text-gray-500 rounded-xl font-bold text-sm hover:bg-gray-50 transition-all">
                取消
              </button>
              <button className="py-3 morandi-orange-bg text-white rounded-xl font-bold text-sm shadow-lg shadow-orange-100 hover:scale-[1.02] active:scale-[0.98] transition-all">
                保存配置
              </button>
            </div>
          </div>
        </div>
        )}
      </div>
    </div>
  );
};
