import { Navigate, Outlet, useLocation } from 'react-router-dom'
import { useAuthStore } from '../stores/authStore'

const ProtectedRoute = () => {
  const { user, isAuthenticated, userType, isLoading } = useAuthStore()
  const location = useLocation()

  // If still loading auth state, show loading indicator
  if (isLoading) {
    return <div className="flex justify-center items-center h-screen">Loading...</div>
  }

  // If not authenticated, redirect to login
  if (!user || !isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />
  }

  // Handle specific routes based on user type
  if (location.pathname === '/admin' && userType !== 'admin') {
    // Only allow admin users to access admin route
    return <Navigate to="/dashboard" replace />
  }

  // For musician-specific routes
  if (location.pathname === '/upload' && userType !== 'musician') {
    return <Navigate to="/dashboard" replace />
  }

  // For venue-specific routes
  if (location.pathname === '/manage-shows' && userType !== 'venue') {
    return <Navigate to="/dashboard" replace />
  }

  // User is authenticated, render the protected route
  return <Outlet />
}

export default ProtectedRoute
