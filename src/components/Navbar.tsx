import { useState, useEffect } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { FiMenu, FiX, FiUser, FiLogOut, FiMoon, FiSun } from 'react-icons/fi'
import { supabase } from '../lib/supabase'
import { useAuth } from '../hooks/useAuth'
import { useDarkMode } from '../contexts/DarkModeContext'

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false)
  const [isAdminMenuOpen, setIsAdminMenuOpen] = useState(false)
  const { user, signOut } = useAuth()
  const { darkMode, toggleDarkMode } = useDarkMode()
  const location = useLocation()
  const navigate = useNavigate()
  
  // Close menus when location changes
  useEffect(() => {
    setIsMenuOpen(false)
    setIsProfileMenuOpen(false)
    setIsAdminMenuOpen(false)
  }, [location])
  
  const handleSignOut = async () => {
    await signOut()
    navigate('/')
    // Ensure the page scrolls to the top
    window.scrollTo(0, 0)
  }
  
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
    // Close other menus when opening main menu
    if (!isMenuOpen) {
      setIsProfileMenuOpen(false)
      setIsAdminMenuOpen(false)
    }
  }
  
  const toggleProfileMenu = () => {
    setIsProfileMenuOpen(!isProfileMenuOpen)
    // Close other menus when opening profile menu
    if (!isProfileMenuOpen) {
      setIsMenuOpen(false)
      setIsAdminMenuOpen(false)
    }
  }
  
  const toggleAdminMenu = () => {
    setIsAdminMenuOpen(!isAdminMenuOpen)
    // Close other menus when opening admin menu
    if (!isAdminMenuOpen) {
      setIsMenuOpen(false)
      setIsProfileMenuOpen(false)
    }
  }
  
  const handleNavLinkClick = () => {
    // Ensure the page scrolls to the top when navigating
    window.scrollTo(0, 0)
  }
  
  const handleDarkModeToggle = (e: React.MouseEvent) => {
    e.preventDefault()
    toggleDarkMode()
  }
  
  return (
    <nav className="bg-white dark:bg-gray-900 shadow-sm sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex-shrink-0 flex items-center" onClick={handleNavLinkClick}>
              <span className="text-2xl font-bold text-primary-600 dark:text-primary-400">
                TrueFans CONNECT™
              </span>
            </Link>
          </div>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex md:items-center md:space-x-4">
            <Link 
              to="/discover" 
              className="px-3 py-2 rounded-md text-sm font-medium text-gray-700 dark:text-gray-200 hover:text-primary-600 dark:hover:text-primary-400"
              onClick={handleNavLinkClick}
            >
              Discover
            </Link>
            <Link 
              to="/how-it-works" 
              className="px-3 py-2 rounded-md text-sm font-medium text-gray-700 dark:text-gray-200 hover:text-primary-600 dark:hover:text-primary-400"
              onClick={handleNavLinkClick}
            >
              How It Works
            </Link>
            <Link 
              to="/fan-how-it-works" 
              className="px-3 py-2 rounded-md text-sm font-medium text-gray-700 dark:text-gray-200 hover:text-primary-600 dark:hover:text-primary-400"
              onClick={handleNavLinkClick}
            >
              TrueFans
            </Link>
            <Link 
              to="/venues" 
              className="px-3 py-2 rounded-md text-sm font-medium text-gray-700 dark:text-gray-200 hover:text-primary-600 dark:hover:text-primary-400"
              onClick={handleNavLinkClick}
            >
              Venues
            </Link>
            <Link 
              to="/affiliate" 
              className="px-3 py-2 rounded-md text-sm font-medium text-gray-700 dark:text-gray-200 hover:text-primary-600 dark:hover:text-primary-400"
              onClick={handleNavLinkClick}
            >
              Affiliate
            </Link>
            
            <button
              onClick={handleDarkModeToggle}
              className="ml-2 p-2 rounded-full text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800"
              aria-label={darkMode ? 'Switch to light mode' : 'Switch to dark mode'}
            >
              {darkMode ? <FiSun size={20} /> : <FiMoon size={20} />}
            </button>
            
            {user ? (
              <div className="relative ml-3">
                <button
                  onClick={toggleProfileMenu}
                  className="flex items-center text-sm rounded-full focus:outline-none"
                >
                  <div className="h-8 w-8 rounded-full bg-primary-600 flex items-center justify-center text-white">
                    {user.email ? user.email.charAt(0).toUpperCase() : 'U'}
                  </div>
                </button>
                
                {isProfileMenuOpen && (
                  <div className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white dark:bg-gray-800 ring-1 ring-black ring-opacity-5">
                    <div className="py-1">
                      <Link
                        to="/dashboard"
                        className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
                        onClick={handleNavLinkClick}
                      >
                        Dashboard
                      </Link>
                      <Link
                        to="/profile"
                        className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
                        onClick={handleNavLinkClick}
                      >
                        Profile
                      </Link>
                      <button
                        onClick={handleSignOut}
                        className="block w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
                      >
                        Sign Out
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex items-center space-x-2">
                <Link
                  to="/login"
                  className="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-200 hover:text-primary-600 dark:hover:text-primary-400"
                  onClick={handleNavLinkClick}
                >
                  Log In
                </Link>
                <Link
                  to="/signup"
                  className="px-4 py-2 text-sm font-medium bg-primary-600 text-white rounded-md hover:bg-primary-700"
                  onClick={handleNavLinkClick}
                >
                  Artists Join Now
                </Link>
              </div>
            )}
          </div>
          
          {/* Mobile menu button */}
          <div className="flex items-center md:hidden">
            <button
              onClick={handleDarkModeToggle}
              className="p-2 rounded-full text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 mr-2"
              aria-label={darkMode ? 'Switch to light mode' : 'Switch to dark mode'}
            >
              {darkMode ? <FiSun size={20} /> : <FiMoon size={20} />}
            </button>
            
            {user && (
              <button
                onClick={toggleProfileMenu}
                className="p-2 rounded-full text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 mr-2"
              >
                <FiUser size={20} />
              </button>
            )}
            
            <button
              onClick={toggleMenu}
              className="p-2 rounded-md text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800"
            >
              {isMenuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
            </button>
          </div>
        </div>
      </div>
      
      {/* Mobile Navigation Menu */}
      {isMenuOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <Link
              to="/discover"
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800"
              onClick={handleNavLinkClick}
            >
              Discover
            </Link>
            <Link
              to="/how-it-works"
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800"
              onClick={handleNavLinkClick}
            >
              How It Works
            </Link>
            <Link
              to="/fan-how-it-works"
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800"
              onClick={handleNavLinkClick}
            >
              TrueFans
            </Link>
            <Link
              to="/venues"
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800"
              onClick={handleNavLinkClick}
            >
              Venues
            </Link>
            <Link
              to="/affiliate"
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800"
              onClick={handleNavLinkClick}
            >
              Affiliate
            </Link>
            
            {!user && (
              <>
                <Link
                  to="/login"
                  className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800"
                  onClick={handleNavLinkClick}
                >
                  Log In
                </Link>
                <Link
                  to="/signup"
                  className="block px-3 py-2 rounded-md text-base font-medium bg-primary-600 text-white hover:bg-primary-700"
                  onClick={handleNavLinkClick}
                >
                  Artists Join Now
                </Link>
              </>
            )}
          </div>
        </div>
      )}
      
      {/* Mobile Profile Menu */}
      {isProfileMenuOpen && user && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 border-t border-gray-200 dark:border-gray-700">
            <Link
              to="/dashboard"
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800"
              onClick={handleNavLinkClick}
            >
              Dashboard
            </Link>
            <Link
              to="/profile"
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800"
              onClick={handleNavLinkClick}
            >
              Profile
            </Link>
            <button
              onClick={handleSignOut}
              className="flex w-full items-center px-3 py-2 rounded-md text-base font-medium text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800"
            >
              <FiLogOut className="mr-2" />
              Sign Out
            </button>
          </div>
        </div>
      )}
    </nav>
  )
}

export default Navbar
