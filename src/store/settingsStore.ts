import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface SettingsState {
  notifications: {
    emailNotifications: boolean;
    examReminders: boolean;
    resultAlerts: boolean;
  };
  preferences: {
    darkMode: boolean;
    showMarks: boolean;
    showPerformanceStats: boolean;
  };
  updateNotifications: (settings: Partial<SettingsState['notifications']>) => void;
  updatePreferences: (settings: Partial<SettingsState['preferences']>) => void;
}

export const useSettingsStore = create<SettingsState>()(
  persist(
    (set) => ({
      notifications: {
        emailNotifications: true,
        examReminders: true,
        resultAlerts: true,
      },
      preferences: {
        darkMode: false,
        showMarks: true,
        showPerformanceStats: true,
      },
      updateNotifications: (settings) =>
        set((state) => ({
          notifications: { ...state.notifications, ...settings },
        })),
      updatePreferences: (settings) =>
        set((state) => ({
          preferences: { ...state.preferences, ...settings },
        })),
    }),
    {
      name: 'user-settings',
    }
  )
);