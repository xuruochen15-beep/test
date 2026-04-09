import React from 'react';
import { AdminSubCategory } from '../../types';
import { UserManagement } from './UserManagement';
import { RoleManagement } from './RoleManagement';
import { MenuManagement } from './MenuManagement';
import { AuditLogs } from './AuditLogs';

interface AdminConsoleProps {
  currentSub: AdminSubCategory;
}

export const AdminConsole: React.FC<AdminConsoleProps> = ({ currentSub }) => {
  const renderContent = () => {
    switch (currentSub) {
      case AdminSubCategory.USER:
        return <UserManagement />;
      case AdminSubCategory.ROLE:
        return <RoleManagement />;
      case AdminSubCategory.MENU:
        return <MenuManagement />;
      case AdminSubCategory.LOGS:
        return <AuditLogs />;
      default:
        return <UserManagement />;
    }
  };

  return (
    <div className="h-full flex flex-col animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="bg-white/60 backdrop-blur-md rounded-2xl sm:rounded-3xl border morandi-border shadow-orange-glow p-4 sm:p-8 flex-1 overflow-hidden flex flex-col">
        {renderContent()}
      </div>
    </div>
  );
};
