export interface Notification {
  id: string;
  title: string;
  message: string;
  type: 'info' | 'success' | 'warning' | 'error';
  timestamp: Date;
  isRead: boolean;
  link?: string;
  category?: 'exam' | 'result' | 'system' | 'other';
  priority?: 'low' | 'medium' | 'high';
  actions?: {
    label: string;
    action: 'dismiss' | 'view' | 'custom';
    customAction?: string;
  }[];
}