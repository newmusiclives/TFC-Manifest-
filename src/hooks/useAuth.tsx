import { useState, useEffect, createContext, useContext } from 'react'
import { supabase } from '../lib/supabase'
import { Session, User } from '@supabase/supabase-js'

interface AuthContextType {
  session: Session | null
  user: User | null
  loading: boolean
  signIn: (email: string, password: string) => Promise<{ error: Error | null }>
  signUp: (email: string, password: string) => Promise<{ error: Error | null, data: any | null }>
  signOut: () => Promise<void>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [session, setSession] = useState<Session | null>(null)
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Get initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session)
      setUser(session?.user ?? null)
      setLoading(false)
    })

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session)
      setUser(session?.user ?? null)
      setLoading(false)
    })

    return () => subscription.unsubscribe()
  }, [])

  const signIn = async (email: string, password: string) => {
    // Handle demo accounts
    if (
      (email === 'admin@example.com' && password === 'pass123') ||
      (email === 'musician@example.com' && password === 'pass123') ||
      (email === 'venue@example.com' && password === 'pass123') ||
      (email === 'fan@example.com' && password === 'pass123')
    ) {
      try {
        console.log(`Attempting demo login for: ${email}`)
        
        // First try to sign in
        const { data, error } = await supabase.auth.signInWithPassword({
          email,
          password,
        })
        
        if (error) {
          console.error("Demo login error:", error)
          
          // If login fails, try to create the demo account
          console.log(`Creating demo account for: ${email}`)
          const { data: signUpData, error: signUpError } = await supabase.auth.signUp({
            email,
            password,
            options: {
              data: {
                user_type: email.split('@')[0] // Extract user type from email
              }
            }
          })
          
          if (signUpError) {
            console.error("Failed to create demo account:", signUpError)
            return { error: signUpError }
          }
          
          // Try to sign in again after creating the account
          console.log(`Retrying login for: ${email}`)
          const { error: retryError } = await supabase.auth.signInWithPassword({
            email,
            password,
          })
          
          if (retryError) {
            console.error("Failed to sign in after creating demo account:", retryError)
            return { error: retryError }
          }
          
          return { error: null }
        }
        
        console.log(`Demo login successful for: ${email}`)
        return { error: null }
      } catch (err) {
        console.error("Unexpected error during demo login:", err)
        return { error: err as Error }
      }
    } else {
      // Regular sign in
      try {
        const { error } = await supabase.auth.signInWithPassword({
          email,
          password,
        })
        return { error }
      } catch (err) {
        return { error: err as Error }
      }
    }
  }

  const signUp = async (email: string, password: string) => {
    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          emailRedirectTo: window.location.origin,
        }
      })
      return { data, error }
    } catch (err) {
      return { data: null, error: err as Error }
    }
  }

  const signOut = async () => {
    await supabase.auth.signOut()
  }

  const value = {
    session,
    user,
    loading,
    signIn,
    signUp,
    signOut,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}
