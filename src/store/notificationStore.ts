import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Notification } from '../types/notification';

interface NotificationState {
  notifications: Notification[];
  unreadCount: number;
  addNotification: (notification: Omit<Notification, 'id' | 'timestamp' | 'isRead'>) => void;
  markAsRead: (id: string) => void;
  markAllAsRead: () => void;
  dismissNotification: (id: string) => void;
  dismissAll: () => void;
  getUnreadCount: () => number;
}

export const useNotificationStore = create<NotificationState>()(
  persist(
    (set, get) => ({
      notifications: [],
      unreadCount: 0,

      addNotification: (notification) => {
        const newNotification: Notification = {
          ...notification,
          id: crypto.randomUUID(),
          timestamp: new Date(),
          isRead: false,
        };

        set((state) => ({
          notifications: [newNotification, ...state.notifications],
          unreadCount: state.unreadCount + 1,
        }));
      },

      markAsRead: (id) => {
        set((state) => ({
          notifications: state.notifications.map((notification) =>
            notification.id === id ? { ...notification, isRead: true } : notification
          ),
          unreadCount: state.unreadCount - 1,
        }));
      },

      markAllAsRead: () => {
        set((state) => ({
          notifications: state.notifications.map((notification) => ({
            ...notification,
            isRead: true,
          })),
          unreadCount: 0,
        }));
      },

      dismissNotification: (id) => {
        set((state) => ({
          notifications: state.notifications.filter((n) => n.id !== id),
          unreadCount: state.notifications.find((n) => n.id === id)?.isRead
            ? state.unreadCount
            : state.unreadCount - 1,
        }));
      },

      dismissAll: () => {
        set({ notifications: [], unreadCount: 0 });
      },

      getUnreadCount: () => {
        return get().notifications.filter((n) => !n.isRead).length;
      },
    }),
    {
      name: 'notifications-storage',
    }
  )
);