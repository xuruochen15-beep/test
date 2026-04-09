import React, { useState } from 'react';

const MOCK_USERS = [
  { id: '1', name: '王五', dept: '销售KA组', roles: ['销售区域经理组'], privileges: ['奖金数据问询'], avatar: 'https://picsum.photos/seed/user1/100' },
  { id: '2', name: '李四', dept: '市场部', roles: ['智能问数测试组'], privileges: [], avatar: 'https://picsum.photos/seed/user2/100' },
  { id: '3', name: '张三', dept: '财务部', roles: ['财务分析组'], privileges: ['全量数据导出'], avatar: 'https://picsum.photos/seed/user3/100' },
];

export const UserManagement: React.FC = () => {
  const [isSyncing, setIsSyncing] = useState(false);
  const [selectedUser, setSelectedUser] = useState<any>(null);

  const handleSync = () => {
    setIsSyncing(true);
    setTimeout(() => setIsSyncing(false), 2000);
  };

  return (
    <div className="flex-1 flex flex-col overflow-hidden">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 sm:mb-8 space-y-4 sm:space-y-0">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold text-gray-800">用户管理</h2>
          <p className="text-xs sm:text-sm text-gray-400 mt-1">管理所有使用“智慧中台”的用户，支持企微组织架构同步。</p>
        </div>
        <button 
          onClick={handleSync}
          disabled={isSyncing}
          className={`flex items-center justify-center space-x-2 px-4 sm:px-6 py-2.5 sm:py-3 rounded-2xl transition-all font-medium shadow-md ${isSyncing ? 'bg-gray-100 text-gray-400' : 'morandi-orange-soft-bg text-white hover:scale-105 active:scale-95'}`}
        >
          <svg className={`w-4 h-4 sm:w-5 sm:h-5 ${isSyncing ? 'animate-spin' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
          </svg>
          <span className="text-sm">{isSyncing ? '同步中...' : '同步企微架构'}</span>
        </button>
      </div>

      <div className="flex-1 overflow-hidden flex flex-col lg:flex-row lg:space-x-8 relative">
        {/* User List */}
        <div className="flex-1 bg-white/40 rounded-2xl sm:rounded-3xl border morandi-border overflow-x-auto p-2">
          <table className="min-w-[600px] lg:min-w-full text-left">
            <thead>
              <tr className="text-[10px] text-gray-400 uppercase tracking-widest border-b morandi-border">
                <th className="px-4 sm:px-6 py-3 sm:py-4 font-bold">用户信息</th>
                <th className="px-4 sm:px-6 py-3 sm:py-4 font-bold">所属部门</th>
                <th className="px-4 sm:px-6 py-3 sm:py-4 font-bold">角色权限</th>
                <th className="px-4 sm:px-6 py-3 sm:py-4 font-bold">操作</th>
              </tr>
            </thead>
            <tbody className="divide-y morandi-border">
              {MOCK_USERS.map(user => (
                <tr key={user.id} className="group hover:bg-white/60 transition-colors">
                  <td className="px-4 sm:px-6 py-4 sm:py-5">
                    <div className="flex items-center space-x-3">
                      <img src={user.avatar} className="w-8 h-8 sm:w-10 sm:h-10 rounded-full border-2 border-white shadow-sm" alt="" />
                      <div>
                        <p className="text-xs sm:text-sm font-bold text-gray-700">{user.name}</p>
                        <p className="text-[9px] sm:text-[10px] text-gray-400">ID: {user.id}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 sm:px-6 py-4 sm:py-5">
                    <span className="px-2 sm:px-3 py-1 bg-gray-100 rounded-full text-[10px] sm:text-[11px] text-gray-500 font-medium">{user.dept}</span>
                  </td>
                  <td className="px-4 sm:px-6 py-4 sm:py-5">
                    <div className="flex flex-wrap gap-1 sm:gap-2">
                      {user.roles.map(role => (
                        <span key={role} className="px-2 py-0.5 bg-orange-50 text-orange-600 rounded text-[9px] sm:text-[10px] border border-orange-100">{role}</span>
                      ))}
                    </div>
                  </td>
                  <td className="px-4 sm:px-6 py-4 sm:py-5">
                    <button 
                      onClick={() => setSelectedUser(user)}
                      className="text-[10px] sm:text-xs font-bold morandi-orange hover:underline"
                    >
                      配置特权
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Privilege Config Panel */}
        {selectedUser && (
          <div className="fixed lg:static inset-0 lg:inset-auto z-50 lg:z-0 bg-black/20 lg:bg-transparent backdrop-blur-sm lg:backdrop-blur-none flex items-end lg:items-stretch justify-center lg:justify-start">
            <div className="w-full lg:w-80 bg-white rounded-t-3xl lg:rounded-3xl border morandi-border shadow-2xl lg:shadow-lg p-6 flex flex-col animate-in slide-in-from-bottom lg:slide-in-from-right-4 duration-300 max-h-[90vh] lg:max-h-none">
              <div className="flex items-center justify-between mb-6">
                <h3 className="font-bold text-gray-700">个人特权配置</h3>
                <button onClick={() => setSelectedUser(null)} className="text-gray-400 hover:text-gray-600 p-1">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

            <div className="flex items-center space-x-3 mb-8 p-4 bg-gray-50 rounded-2xl">
              <img src={selectedUser.avatar} className="w-12 h-12 rounded-full border-2 border-white" alt="" />
              <div>
                <p className="font-bold text-gray-800">{selectedUser.name}</p>
                <p className="text-[10px] text-gray-400">{selectedUser.dept}</p>
              </div>
            </div>

            <div className="flex-1 space-y-6 overflow-y-auto pr-2">
              <div>
                <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest block mb-3">独立授权 (Agent 独立授权)</label>
                <div className="space-y-3">
                  {['全量数据导出', '奖金数据问询', '系统配置权限', '日志查看权限'].map(priv => (
                    <label key={priv} className="flex items-center justify-between p-3 bg-white border morandi-border rounded-xl cursor-pointer hover:border-orange-200 transition-colors">
                      <span className="text-xs text-gray-600">{priv}</span>
                      <input 
                        type="checkbox" 
                        defaultChecked={selectedUser.privileges.includes(priv)}
                        className="w-4 h-4 rounded border-gray-300 text-orange-500 focus:ring-orange-500" 
                      />
                    </label>
                  ))}
                </div>
              </div>

              <div>
                <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest block mb-3">权限预览 (合并视图)</label>
                <div className="p-4 bg-orange-50/50 rounded-2xl border border-orange-100/50">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-[11px]">
                      <span className="text-gray-500">部门继承:</span>
                      <span className="text-gray-700 font-medium">基础问数, 考勤查询</span>
                    </div>
                    <div className="flex items-center justify-between text-[11px]">
                      <span className="text-gray-500">个人特权:</span>
                      <span className="text-orange-600 font-bold">{selectedUser.privileges.join(', ') || '无'}</span>
                    </div>
                    <div className="h-px bg-orange-200 my-2"></div>
                    <div className="flex items-center justify-between text-[11px]">
                      <span className="text-gray-500">最终权限:</span>
                      <span className="text-gray-800 font-bold">基础问数, 考勤查询, {selectedUser.privileges.join(', ')}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <button className="w-full mt-6 py-3 morandi-orange-bg text-white rounded-xl font-bold text-sm shadow-lg shadow-orange-100 hover:scale-[1.02] active:scale-[0.98] transition-all">
              保存配置
            </button>
          </div>
        </div>
        )}
      </div>
    </div>
  );
};
