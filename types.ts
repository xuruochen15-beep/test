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
}

export interface ChatSession {
  id: string;
  title: string;
  lastMessage: string;
  category: string;
}

export enum Category {
  DATA = '数据咨询助手',
  PROCESS = '制度及流程操作助手',
  OFFICE = '员工办公助手'
}
