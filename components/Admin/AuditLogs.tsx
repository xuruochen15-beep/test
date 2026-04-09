import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from 'recharts';

const MOCK_LOGS = [
  { id: '1', user: '王五', action: '修改权限', target: '销售KA组', time: '2024-03-04 14:20:11', status: 'success' },
  { id: '2', user: '李四', action: 'AI查询', target: '业绩问询', time: '2024-03-04 14:15:05', status: 'success' },
  { id: '3', user: '未知用户', action: '越权访问', target: '奖金数据', time: '2024-03-04 13:50:22', status: 'alert' },
  { id: '4', user: '张三', action: '导出数据', target: '财务报表', time: '2024-03-04 12:30:45', status: 'success' },
  { id: '5', user: '王五', action: '登录系统', target: '管理后台', time: '2024-03-04 09:10:00', status: 'success' },
];

const STATS_DATA = [
  { name: '09:00', usage: 400, alerts: 2 },
  { name: '10:00', usage: 300, alerts: 1 },
  { name: '11:00', usage: 600, alerts: 0 },
  { name: '12:00', usage: 800, alerts: 5 },
  { name: '13:00', usage: 500, alerts: 12 },
  { name: '14:00', usage: 900, alerts: 3 },
];

export const AuditLogs: React.FC = () => {
  return (
    <div className="flex-1 flex flex-col overflow-hidden">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 sm:mb-8 space-y-4 sm:space-y-0">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold text-gray-800">后台日志</h2>
          <p className="text-xs sm:text-sm text-gray-400 mt-1">记录所有权限变更、菜单访问及使用 AI 查询的数据，确保系统安全合规。</p>
        </div>
        <div className="flex flex-wrap items-center gap-2 sm:gap-3">
          <button className="flex-1 sm:flex-none px-3 sm:px-4 py-2 bg-white border morandi-border rounded-xl text-[10px] sm:text-xs font-bold text-gray-500 hover:bg-gray-50 transition-all">导出审计报告</button>
          <button className="flex-1 sm:flex-none px-3 sm:px-4 py-2 bg-red-50 border border-red-100 rounded-xl text-[10px] sm:text-xs font-bold text-red-500 hover:bg-red-100 transition-all">查看异常告警 (12)</button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8 mb-6 sm:mb-8 overflow-y-auto lg:overflow-visible">
        <div className="lg:col-span-2 bg-white/40 rounded-2xl sm:rounded-3xl border morandi-border p-4 sm:p-6 h-64">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xs sm:text-sm font-bold text-gray-700">访问统计 (Access Statistics)</h3>
            <span className="text-[9px] sm:text-[10px] text-gray-400 uppercase tracking-widest">最近 6 小时</span>
          </div>
          <div className="h-40 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={STATS_DATA}>
                <defs>
                  <linearGradient id="colorUsage" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#c68b6b" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#c68b6b" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fontSize: 9, fill: '#999'}} />
                <YAxis axisLine={false} tickLine={false} tick={{fontSize: 9, fill: '#999'}} />
                <Tooltip 
                  contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 10px 25px rgba(0,0,0,0.05)', fontSize: '10px' }}
                />
                <Area type="monotone" dataKey="usage" stroke="#c68b6b" strokeWidth={3} fillOpacity={1} fill="url(#colorUsage)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white/40 rounded-2xl sm:rounded-3xl border morandi-border p-4 sm:p-6 h-64 flex flex-col">
          <h3 className="text-xs sm:text-sm font-bold text-gray-700 mb-4 sm:mb-6">异常告警 (Anomaly Alerts)</h3>
          <div className="flex-1 space-y-3 sm:space-y-4 overflow-y-auto pr-2">
            {[
              { type: '越权访问', user: '未知用户', target: '奖金数据', time: '13:50' },
              { type: '高频调用', user: '李四', target: '业绩看板', time: '12:10' },
              { type: '异地登录', user: '张三', target: '系统', time: '08:45' },
            ].map((alert, i) => (
              <div key={i} className="flex items-start space-x-3 p-2.5 sm:p-3 bg-red-50/50 border border-red-100/50 rounded-xl sm:rounded-2xl">
                <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg sm:rounded-xl bg-red-100 flex items-center justify-center text-red-500 text-sm">⚠️</div>
                <div>
                  <div className="flex items-center space-x-2">
                    <span className="text-[11px] sm:text-xs font-bold text-red-600">{alert.type}</span>
                    <span className="text-[9px] sm:text-[10px] text-gray-400">{alert.time}</span>
                  </div>
                  <p className="text-[9px] sm:text-[10px] text-gray-500 mt-0.5">{alert.user} 尝试访问 {alert.target}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="flex-1 bg-white/40 rounded-2xl sm:rounded-3xl border morandi-border overflow-hidden flex flex-col">
        <div className="px-4 sm:px-6 py-3 sm:py-4 border-b morandi-border bg-white/20 flex items-center justify-between">
          <h3 className="text-xs sm:text-sm font-bold text-gray-700">操作审计 (Operation Audit)</h3>
          <div className="flex items-center space-x-2">
            <input type="text" placeholder="搜索日志..." className="px-2 sm:px-3 py-1 sm:py-1.5 bg-white border morandi-border rounded-lg text-[10px] sm:text-[11px] outline-none focus:ring-1 focus:ring-orange-200" />
          </div>
        </div>
        <div className="flex-1 overflow-x-auto">
          <table className="min-w-[600px] lg:min-w-full text-left">
            <thead>
              <tr className="text-[10px] text-gray-400 uppercase tracking-widest border-b morandi-border">
                <th className="px-4 sm:px-6 py-3 sm:py-4 font-bold">操作人</th>
                <th className="px-4 sm:px-6 py-3 sm:py-4 font-bold">动作</th>
                <th className="px-4 sm:px-6 py-3 sm:py-4 font-bold">目标资源</th>
                <th className="px-4 sm:px-6 py-3 sm:py-4 font-bold">时间</th>
                <th className="px-4 sm:px-6 py-3 sm:py-4 font-bold">状态</th>
              </tr>
            </thead>
            <tbody className="divide-y morandi-border">
              {MOCK_LOGS.map(log => (
                <tr key={log.id} className="hover:bg-white/60 transition-colors">
                  <td className="px-4 sm:px-6 py-3 sm:py-4 text-xs sm:text-sm font-bold text-gray-700">{log.user}</td>
                  <td className="px-4 sm:px-6 py-3 sm:py-4 text-xs sm:text-sm text-gray-600">{log.action}</td>
                  <td className="px-4 sm:px-6 py-3 sm:py-4 text-xs sm:text-sm text-gray-500">{log.target}</td>
                  <td className="px-4 sm:px-6 py-3 sm:py-4 text-[10px] sm:text-[11px] text-gray-400">{log.time}</td>
                  <td className="px-4 sm:px-6 py-3 sm:py-4">
                    <span className={`px-2 py-0.5 rounded text-[9px] sm:text-[10px] font-bold uppercase ${log.status === 'success' ? 'bg-green-50 text-green-600 border border-green-100' : 'bg-red-50 text-red-600 border border-red-100'}`}>
                      {log.status === 'success' ? '成功' : '告警'}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
