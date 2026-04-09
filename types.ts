
export enum Role {
  USER = 'user',
  MODEL = 'model'
}

export interface Message {
  id: string;
  role: Role;
  content: string;
  timestamp: Date;
  isStreaming?: boolean;
  rating?: 'like' | 'dislike';
  feedback?: string;
}

export enum Category {
  DATA = '数据咨询助手',
  PROCESS = '制度及流程操作助手',
  OFFICE = '员工办公助手',
  ADMIN = '管理后台'
}

export enum AdminSubCategory {
  USER = '用户管理',
  ROLE = '角色管理',
  MENU = '菜单管理',
  LOGS = '后台日志'
}
