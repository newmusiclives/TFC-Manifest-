import { useEffect, useState } from 'react'
import { supabase } from '../lib/supabase'
import { useAuthStore } from '../stores/authStore'
import { User } from '@supabase/supabase-js'

export function useAuth() {
  const { user, isAuthenticated, userType, setUser, setUserType, logout } = useAuthStore()
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Check for active session on load
    const checkSession = async () => {
      try {
        const { data: { session } } = await supabase.auth.getSession()
        
        if (session) {
          setUser(session.user)
          
          // Fetch user type from profiles
          const { data: userData } = await supabase
            .from('users')
            .select('user_type')
            .eq('id', session.user.id)
            .single()
            
          if (userData) {
            setUserType(userData.user_type as 'fan' | 'musician' | 'venue' | 'admin' | null)
          }
        }
      } catch (error) {
        console.error('Error checking auth session:', error)
      } finally {
        setLoading(false)
      }
    }
    
    checkSession()
    
    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (_event, session) => {
        setUser(session?.user || null)
        
        if (session?.user) {
          // Fetch user type from profiles
          const { data: userData } = await supabase
            .from('users')
            .select('user_type')
            .eq('id', session.user.id)
            .single()
            
          if (userData) {
            setUserType(userData.user_type as 'fan' | 'musician' | 'venue' | 'admin' | null)
          }
        } else {
          setUserType(null)
        }
      }
    )
    
    return () => {
      subscription.unsubscribe()
    }
  }, [setUser, setUserType])
  
  const signIn = async (email: string, password: string) => {
    try {
      // Handle demo accounts with hardcoded credentials
      if (
        (email === 'admin@example.com' && password === 'password123') ||
        (email === 'musician@example.com' && password === 'password123') ||
        (email === 'venue@example.com' && password === 'password123') ||
        (email === 'fan@example.com' && password === 'password123')
      ) {
        // For demo accounts, we'll create a mock session
        const userType = email.split('@')[0]; // Extract user type from email
        
        // Create a mock user based on the demo type
        const mockUser = {
          id: `demo-${userType}-id`,
          email: email,
          user_metadata: {
            name: `${userType.charAt(0).toUpperCase() + userType.slice(1)} User`
          }
        };
        
        // Set the user in the store
        setUser(mockUser as User);
        setUserType(userType as 'admin' | 'musician' | 'venue' | 'fan');
        
        // Simulate a successful login
        return { 
          data: { 
            user: mockUser,
            session: {
              access_token: 'mock-token',
              refresh_token: 'mock-refresh-token',
              user: mockUser
            }
          }, 
          error: null 
        };
      }
      
      // Regular sign in for non-demo accounts
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password
      })
      
      if (error) throw error
      
      return { data, error: null }
    } catch (error) {
      return { data: null, error }
    }
  }
  
  const signUp = async (email: string, password: string, userData: any) => {
    try {
      // Create auth user
      const { data, error } = await supabase.auth.signUp({
        email,
        password
      })
      
      if (error) throw error
      
      if (data.user) {
        // Create profile
        const { error: profileError } = await supabase
          .from('users')
          .insert([
            {
              id: data.user.id,
              email: data.user.email,
              ...userData
            }
          ])
        
        if (profileError) throw profileError
      }
      
      return { data, error: null }
    } catch (error) {
      return { data: null, error }
    }
  }
  
  const signOut = async () => {
    try {
      // For demo accounts, just clear the store
      if (user && user.id.startsWith('demo-')) {
        logout();
        return { error: null };
      }
      
      // Regular sign out for non-demo accounts
      const { error } = await supabase.auth.signOut()
      if (error) throw error
      
      logout()
      return { error: null }
    } catch (error) {
      return { error }
    }
  }
  
  return {
    user: user as User | null,
    isAuthenticated,
    userType,
    loading,
    signIn,
    signUp,
    signOut
  }
}
