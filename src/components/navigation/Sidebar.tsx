import { Link, useLocation } from 'react-router-dom';
import { Session } from '@supabase/supabase-js';
import { 
  FaHome, 
  FaCalendarAlt, 
  FaGuitar, 
  FaMapMarkerAlt, 
  FaTicketAlt, 
  FaChartLine, 
  FaCog, 
  FaQuestionCircle,
  FaTimes,
  FaMusic
} from 'react-icons/fa';

interface SidebarProps {
  session: Session | null;
  isOpen: boolean;
  toggleSidebar: () => void;
}

const Sidebar = ({ session, isOpen, toggleSidebar }: SidebarProps) => {
  const location = useLocation();
  
  // Navigation items
  const navigation = [
    { name: 'Dashboard', href: '/dashboard', icon: FaHome },
    { name: 'Events', href: '/events', icon: FaCalendarAlt },
    { name: 'Artists', href: '/artists', icon: FaGuitar },
    { name: 'Venues', href: '/venues', icon: FaMapMarkerAlt },
    { name: 'Tickets', href: '/tickets', icon: FaTicketAlt },
    { name: 'Analytics', href: '/analytics', icon: FaChartLine },
  ];
  
  // Secondary navigation
  const secondaryNavigation = [
    { name: 'Settings', href: '/settings', icon: FaCog },
    { name: 'Help', href: '/help', icon: FaQuestionCircle },
  ];

  // Check if the current path matches the nav item
  const isActive = (path: string) => {
    return location.pathname === path || location.pathname.startsWith(`${path}/`);
  };

  return (
    <>
      {/* Mobile sidebar backdrop */}
      {isOpen && (
        <div 
          className="fixed inset-0 z-40 bg-gray-600 bg-opacity-75 md:hidden" 
          onClick={toggleSidebar}
        ></div>
      )}

      {/* Sidebar */}
      <div 
        className={`fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-lg transform ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        } md:translate-x-0 transition-transform duration-300 ease-in-out md:static md:z-0`}
      >
        {/* Mobile close button */}
        <div className="absolute top-0 right-0 pt-2 pr-2 md:hidden">
          <button
            type="button"
            className="ml-1 flex items-center justify-center h-10 w-10 rounded-full focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500"
            onClick={toggleSidebar}
          >
            <span className="sr-only">Close sidebar</span>
            <FaTimes className="h-6 w-6 text-gray-500" />
          </button>
        </div>

        <div className="h-full flex flex-col">
          {/* Logo */}
          <div className="flex items-center h-16 px-4 border-b border-gray-200">
            <Link to="/dashboard" className="flex items-center">
              <FaMusic className="h-8 w-8 text-blue-600" />
              <span className="ml-2 text-xl font-bold text-gray-900">TFC</span>
            </Link>
          </div>

          {/* Navigation */}
          <nav className="flex-1 px-2 py-4 space-y-1 overflow-y-auto">
            <div className="space-y-1">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`group flex items-center px-2 py-2 text-sm font-medium rounded-md ${
                    isActive(item.href)
                      ? 'bg-blue-50 text-blue-600'
                      : 'text-gray-700 hover:bg-gray-50 hover:text-gray-900'
                  }`}
                >
                  <item.icon
                    className={`mr-3 h-5 w-5 ${
                      isActive(item.href) ? 'text-blue-600' : 'text-gray-400 group-hover:text-gray-500'
                    }`}
                  />
                  {item.name}
                </Link>
              ))}
            </div>

            {/* Secondary Navigation */}
            <div className="pt-6 mt-6 border-t border-gray-200">
              <h3 className="px-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                Support
              </h3>
              <div className="mt-2 space-y-1">
                {secondaryNavigation.map((item) => (
                  <Link
                    key={item.name}
                    to={item.href}
                    className={`group flex items-center px-2 py-2 text-sm font-medium rounded-md ${
                      isActive(item.href)
                        ? 'bg-blue-50 text-blue-600'
                        : 'text-gray-700 hover:bg-gray-50 hover:text-gray-900'
                    }`}
                  >
                    <item.icon
                      className={`mr-3 h-5 w-5 ${
                        isActive(item.href) ? 'text-blue-600' : 'text-gray-400 group-hover:text-gray-500'
                      }`}
                    />
                    {item.name}
                  </Link>
                ))}
              </div>
            </div>
          </nav>

          {/* User info */}
          {session && (
            <div className="flex items-center p-4 border-t border-gray-200">
              <div className="flex-shrink-0">
                <div className="h-10 w-10 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center text-white font-medium">
                  {session.user?.email?.charAt(0).toUpperCase() || 'U'}
                </div>
              </div>
              <div className="ml-3 min-w-0 flex-1">
                <div className="text-sm font-medium text-gray-900 truncate">
                  {session.user?.email || 'User'}
                </div>
                <Link to="/profile" className="text-xs text-gray-500 hover:text-blue-600">
                  View profile
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Sidebar;
