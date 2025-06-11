import { useState, useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'

interface LoginFormProps {
  onSuccess?: () => void;
}

const LoginForm = ({ onSuccess }: LoginFormProps) => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const { signIn } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()
  
  // Check if there's a demo parameter in the URL
  const queryParams = new URLSearchParams(location.search)
  const demoType = queryParams.get('demo')
  
  // Set demo credentials based on the demo type
  const handleDemoLogin = (type: string) => {
    switch (type) {
      case 'admin':
        setEmail('admin@example.com')
        setPassword('password123')
        break
      case 'musician':
      case 'artist':
        setEmail('musician@example.com')
        setPassword('password123')
        break
      case 'venue':
        setEmail('venue@example.com')
        setPassword('password123')
        break
      case 'fan':
        setEmail('fan@example.com')
        setPassword('password123')
        break
      default:
        // Default demo account
        setEmail('demo@example.com')
        setPassword('password123')
    }
  }
  
  // Set demo credentials on component mount if demo parameter exists
  useEffect(() => {
    if (demoType) {
      handleDemoLogin(demoType)
    }
  }, [demoType])
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)
    
    try {
      // Use the signIn method from useAuth hook which handles demo accounts
      const { error } = await signIn(email, password)
      
      if (error) {
        throw new Error(error.message || 'Failed to sign in')
      }
      
      // Redirect based on user type
      if (email === 'admin@example.com') {
        navigate('/admin')
      } else {
        navigate('/dashboard')
      }
      
      if (onSuccess) {
        onSuccess()
      }
    } catch (err: any) {
      setError(err.message || 'An error occurred during sign in')
      console.error('Login error:', err)
    } finally {
      setLoading(false)
    }
  }
  
  return (
    <div className="w-full max-w-md mx-auto">
      <form onSubmit={handleSubmit} className="bg-white dark:bg-gray-800 shadow-md rounded-lg px-8 pt-6 pb-8 mb-4">
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-800 dark:text-white">Log In</h2>
        
        {error && (
          <div className="mb-4 p-3 bg-red-100 dark:bg-red-900 text-red-700 dark:text-red-100 rounded">
            {error}
          </div>
        )}
        
        <div className="mb-4">
          <label className="block text-gray-700 dark:text-gray-300 text-sm font-bold mb-2" htmlFor="email">
            Email
          </label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 dark:text-white dark:bg-gray-700 dark:border-gray-600 leading-tight focus:outline-none focus:shadow-outline"
            placeholder="Email"
            required
          />
        </div>
        
        <div className="mb-6">
          <label className="block text-gray-700 dark:text-gray-300 text-sm font-bold mb-2" htmlFor="password">
            Password
          </label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 dark:text-white dark:bg-gray-700 dark:border-gray-600 leading-tight focus:outline-none focus:shadow-outline"
            placeholder="Password"
            required
          />
        </div>
        
        <div className="flex items-center justify-between mb-6">
          <button
            type="submit"
            disabled={loading}
            className={`w-full bg-primary-600 hover:bg-primary-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline ${
              loading ? 'opacity-50 cursor-not-allowed' : ''
            }`}
          >
            {loading ? 'Signing In...' : 'Sign In'}
          </button>
        </div>
        
        <div className="text-center">
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Don't have an account?{' '}
            <a href="/signup" className="text-primary-600 dark:text-primary-400 hover:underline">
              Sign Up
            </a>
          </p>
        </div>
        
        <div className="mt-6 border-t border-gray-200 dark:border-gray-700 pt-4">
          <p className="text-sm text-center text-gray-600 dark:text-gray-400 mb-4">
            Try a demo account:
          </p>
          <div className="grid grid-cols-2 gap-2">
            <button
              type="button"
              onClick={() => {
                handleDemoLogin('admin');
                // Auto-submit the form after setting credentials
                setTimeout(() => {
                  const form = document.querySelector('form');
                  if (form) form.dispatchEvent(new Event('submit', { cancelable: true }));
                }, 100);
              }}
              className="bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 py-2 px-4 rounded text-sm hover:bg-gray-300 dark:hover:bg-gray-600"
            >
              Admin Demo
            </button>
            <button
              type="button"
              onClick={() => {
                handleDemoLogin('musician');
                // Auto-submit the form after setting credentials
                setTimeout(() => {
                  const form = document.querySelector('form');
                  if (form) form.dispatchEvent(new Event('submit', { cancelable: true }));
                }, 100);
              }}
              className="bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 py-2 px-4 rounded text-sm hover:bg-gray-300 dark:hover:bg-gray-600"
            >
              Musician Demo
            </button>
            <button
              type="button"
              onClick={() => {
                handleDemoLogin('venue');
                // Auto-submit the form after setting credentials
                setTimeout(() => {
                  const form = document.querySelector('form');
                  if (form) form.dispatchEvent(new Event('submit', { cancelable: true }));
                }, 100);
              }}
              className="bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 py-2 px-4 rounded text-sm hover:bg-gray-300 dark:hover:bg-gray-600"
            >
              Venue Demo
            </button>
            <button
              type="button"
              onClick={() => {
                handleDemoLogin('fan');
                // Auto-submit the form after setting credentials
                setTimeout(() => {
                  const form = document.querySelector('form');
                  if (form) form.dispatchEvent(new Event('submit', { cancelable: true }));
                }, 100);
              }}
              className="bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 py-2 px-4 rounded text-sm hover:bg-gray-300 dark:hover:bg-gray-600"
            >
              Fan Demo
            </button>
          </div>
        </div>
      </form>
    </div>
  )
}

export default LoginForm
