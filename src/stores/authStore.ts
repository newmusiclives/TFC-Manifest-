import { create } from 'zustand'
import { User } from '@supabase/supabase-js'

interface AuthState {
  user: User | null
  isAuthenticated: boolean
  userType: 'fan' | 'musician' | 'venue' | 'admin' | null
  isLoading: boolean
  setUser: (user: User | null) => void
  setUserType: (type: 'fan' | 'musician' | 'venue' | 'admin' | null) => void
  setLoading: (loading: boolean) => void
  logout: () => void
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isAuthenticated: false,
  userType: null,
  isLoading: true,
  setUser: (user) => set({ 
    user, 
    isAuthenticated: !!user,
    isLoading: false
  }),
  setUserType: (userType) => set({ userType }),
  setLoading: (isLoading) => set({ isLoading }),
  logout: () => set({ 
    user: null, 
    isAuthenticated: false, 
    userType: null 
  }),
}))
