import { create } from 'zustand';
import { mockUsers } from '../data/mockData';

interface AuthState {
  user: {
    id: string;
    email: string;
    role: string;
    full_name: string;
    department?: string;
    student_id?: string;
    joining_date?: string;
    designation?: string;
  } | null;
  isAuthenticated: boolean;
  login: (email: string, password: string, role: string) => Promise<{ success: boolean; message: string }>;
  logout: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isAuthenticated: false,

  login: async (email: string, password: string, requestedRole: string) => {
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const userExists = mockUsers.find(u => u.email === email);
    
    if (!userExists) {
      return { success: false, message: 'No account found with this email address' };
    }
    
    if (!userExists.is_active) {
      return { success: false, message: 'Your account has been deactivated. Please contact support.' };
    }
    
    if (userExists.role !== requestedRole) {
      return { success: false, message: `This email is not registered as a ${requestedRole}` };
    }

    const isPasswordValid = userExists.hashed_password === `hashed_${password}`;
    if (!isPasswordValid) {
      return { success: false, message: 'Invalid password' };
    }
    
    set({
      user: {
        id: userExists.id,
        email: userExists.email,
        role: userExists.role,
        full_name: userExists.full_name,
        department: userExists.department,
        student_id: userExists.student_id,
        joining_date: userExists.joining_date,
        designation: userExists.designation,
      },
      isAuthenticated: true,
    });
    
    return { 
      success: true, 
      message: `Welcome back, ${userExists.full_name}!` 
    };
  },

  logout: () => {
    set({
      user: null,
      isAuthenticated: false,
    });
  },
}));