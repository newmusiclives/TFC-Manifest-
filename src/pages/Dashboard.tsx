import React, { useState, useEffect } from 'react';
import { FaCalendarAlt, FaMusic, FaChartLine, FaUsers, FaCog } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

const Dashboard = () => {
  const { user, userType } = useAuth();
  const [activeTab, setActiveTab] = useState('overview');

  // Mock data for dashboard
  const musicianStats = {
    totalTracks: 24,
    totalPlays: 12580,
    followers: 856,
    upcomingShows: 3
  };

  const venueStats = {
    totalEvents: 48,
    totalAttendees: 5240,
    upcomingShows: 5,
    averageRating: 4.7
  };

  const fanStats = {
    followedArtists: 32,
    attendedShows: 18,
    upcomingShows: 2,
    savedTracks: 64
  };

  // Determine which stats to use based on user type
  const stats = userType === 'musician' ? musicianStats : 
                userType === 'venue' ? venueStats : 
                userType === 'fan' ? fanStats : 
                { message: 'No stats available' };

  const renderTabContent = () => {
    switch (activeTab) {
      case 'overview':
        return (
          <div>
            <h3 className="text-lg font-semibold mb-4">Dashboard Overview</h3>
            
            {userType === 'musician' && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                <div className="bg-white p-4 rounded-lg shadow">
                  <div className="flex items-center">
                    <div className="p-3 rounded-full bg-blue-100 text-blue-500 mr-4">
                      <FaMusic className="text-xl" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Total Tracks</p>
                      <p className="text-xl font-bold">{musicianStats.totalTracks}</p>
                    </div>
                  </div>
                </div>
                <div className="bg-white p-4 rounded-lg shadow">
                  <div className="flex items-center">
                    <div className="p-3 rounded-full bg-green-100 text-green-500 mr-4">
                      <FaChartLine className="text-xl" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Total Plays</p>
                      <p className="text-xl font-bold">{musicianStats.totalPlays}</p>
                    </div>
                  </div>
                </div>
                <div className="bg-white p-4 rounded-lg shadow">
                  <div className="flex items-center">
                    <div className="p-3 rounded-full bg-purple-100 text-purple-500 mr-4">
                      <FaUsers className="text-xl" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Followers</p>
                      <p className="text-xl font-bold">{musicianStats.followers}</p>
                    </div>
                  </div>
                </div>
                <div className="bg-white p-4 rounded-lg shadow">
                  <div className="flex items-center">
                    <div className="p-3 rounded-full bg-yellow-100 text-yellow-500 mr-4">
                      <FaCalendarAlt className="text-xl" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Upcoming Shows</p>
                      <p className="text-xl font-bold">{musicianStats.upcomingShows}</p>
                    </div>
                  </div>
                </div>
              </div>
            )}
            
            {userType === 'venue' && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                <div className="bg-white p-4 rounded-lg shadow">
                  <div className="flex items-center">
                    <div className="p-3 rounded-full bg-blue-100 text-blue-500 mr-4">
                      <FaCalendarAlt className="text-xl" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Total Events</p>
                      <p className="text-xl font-bold">{venueStats.totalEvents}</p>
                    </div>
                  </div>
                </div>
                <div className="bg-white p-4 rounded-lg shadow">
                  <div className="flex items-center">
                    <div className="p-3 rounded-full bg-green-100 text-green-500 mr-4">
                      <FaUsers className="text-xl" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Total Attendees</p>
                      <p className="text-xl font-bold">{venueStats.totalAttendees}</p>
                    </div>
                  </div>
                </div>
                <div className="bg-white p-4 rounded-lg shadow">
                  <div className="flex items-center">
                    <div className="p-3 rounded-full bg-purple-100 text-purple-500 mr-4">
                      <FaCalendarAlt className="text-xl" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Upcoming Shows</p>
                      <p className="text-xl font-bold">{venueStats.upcomingShows}</p>
                    </div>
                  </div>
                </div>
                <div className="bg-white p-4 rounded-lg shadow">
                  <div className="flex items-center">
                    <div className="p-3 rounded-full bg-yellow-100 text-yellow-500 mr-4">
                      <FaChartLine className="text-xl" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Average Rating</p>
                      <p className="text-xl font-bold">{venueStats.averageRating}</p>
                    </div>
                  </div>
                </div>
              </div>
            )}
            
            {userType === 'fan' && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                <div className="bg-white p-4 rounded-lg shadow">
                  <div className="flex items-center">
                    <div className="p-3 rounded-full bg-blue-100 text-blue-500 mr-4">
                      <FaMusic className="text-xl" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Followed Artists</p>
                      <p className="text-xl font-bold">{fanStats.followedArtists}</p>
                    </div>
                  </div>
                </div>
                <div className="bg-white p-4 rounded-lg shadow">
                  <div className="flex items-center">
                    <div className="p-3 rounded-full bg-green-100 text-green-500 mr-4">
                      <FaCalendarAlt className="text-xl" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Attended Shows</p>
                      <p className="text-xl font-bold">{fanStats.attendedShows}</p>
                    </div>
                  </div>
                </div>
                <div className="bg-white p-4 rounded-lg shadow">
                  <div className="flex items-center">
                    <div className="p-3 rounded-full bg-purple-100 text-purple-500 mr-4">
                      <FaCalendarAlt className="text-xl" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Upcoming Shows</p>
                      <p className="text-xl font-bold">{fanStats.upcomingShows}</p>
                    </div>
                  </div>
                </div>
                <div className="bg-white p-4 rounded-lg shadow">
                  <div className="flex items-center">
                    <div className="p-3 rounded-full bg-yellow-100 text-yellow-500 mr-4">
                      <FaMusic className="text-xl" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Saved Tracks</p>
                      <p className="text-xl font-bold">{fanStats.savedTracks}</p>
                    </div>
                  </div>
                </div>
              </div>
            )}
            
            <div className="bg-white rounded-lg shadow p-6 mb-6">
              <h4 className="font-semibold text-lg mb-4">Quick Actions</h4>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {userType === 'musician' && (
                  <>
                    <Link to="/upload" className="bg-primary-50 hover:bg-primary-100 text-primary-700 p-4 rounded-lg flex items-center">
                      <FaMusic className="mr-3" /> Upload New Music
                    </Link>
                    <Link to="/shows" className="bg-green-50 hover:bg-green-100 text-green-700 p-4 rounded-lg flex items-center">
                      <FaCalendarAlt className="mr-3" /> View Upcoming Shows
                    </Link>
                    <Link to="/settings" className="bg-gray-50 hover:bg-gray-100 text-gray-700 p-4 rounded-lg flex items-center">
                      <FaCog className="mr-3" /> Edit Profile
                    </Link>
                  </>
                )}
                
                {userType === 'venue' && (
                  <>
                    <Link to="/manage-shows" className="bg-primary-50 hover:bg-primary-100 text-primary-700 p-4 rounded-lg flex items-center">
                      <FaCalendarAlt className="mr-3" /> Manage Shows
                    </Link>
                    <Link to="/discover" className="bg-green-50 hover:bg-green-100 text-green-700 p-4 rounded-lg flex items-center">
                      <FaMusic className="mr-3" /> Discover Artists
                    </Link>
                    <Link to="/settings" className="bg-gray-50 hover:bg-gray-100 text-gray-700 p-4 rounded-lg flex items-center">
                      <FaCog className="mr-3" /> Edit Venue Profile
                    </Link>
                  </>
                )}
                
                {userType === 'fan' && (
                  <>
                    <Link to="/discover" className="bg-primary-50 hover:bg-primary-100 text-primary-700 p-4 rounded-lg flex items-center">
                      <FaMusic className="mr-3" /> Discover New Music
                    </Link>
                    <Link to="/shows" className="bg-green-50 hover:bg-green-100 text-green-700 p-4 rounded-lg flex items-center">
                      <FaCalendarAlt className="mr-3" /> Browse Shows
                    </Link>
                    <Link to="/settings" className="bg-gray-50 hover:bg-gray-100 text-gray-700 p-4 rounded-lg flex items-center">
                      <FaCog className="mr-3" /> Account Settings
                    </Link>
                  </>
                )}
              </div>
            </div>
          </div>
        );
      case 'profile':
        return <div className="p-4">Profile content</div>;
      case 'music':
        return <div className="p-4">Music content</div>;
      case 'shows':
        return <div className="p-4">Shows content</div>;
      case 'settings':
        return <div className="p-4">Settings content</div>;
      default:
        return <div className="p-4">Select a tab</div>;
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
          <p className="text-gray-600">Welcome back, {user?.user_metadata?.name || user?.email || 'User'}</p>
        </div>

        <div className="flex flex-col md:flex-row gap-6">
          {/* Sidebar */}
          <div className="w-full md:w-64 bg-white rounded-lg shadow">
            <div className="p-4 border-b">
              <h2 className="font-semibold text-gray-800">Navigation</h2>
            </div>
            <nav className="p-2">
              <ul>
                <li>
                  <button
                    onClick={() => setActiveTab('overview')}
                    className={`w-full text-left px-4 py-2 rounded-md flex items-center ${
                      activeTab === 'overview' ? 'bg-primary-50 text-primary-600' : 'text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    <span className="mr-3">📊</span> Overview
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => setActiveTab('profile')}
                    className={`w-full text-left px-4 py-2 rounded-md flex items-center ${
                      activeTab === 'profile' ? 'bg-primary-50 text-primary-600' : 'text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    <span className="mr-3">👤</span> Profile
                  </button>
                </li>
                {userType === 'musician' && (
                  <li>
                    <button
                      onClick={() => setActiveTab('music')}
                      className={`w-full text-left px-4 py-2 rounded-md flex items-center ${
                        activeTab === 'music' ? 'bg-primary-50 text-primary-600' : 'text-gray-700 hover:bg-gray-100'
                      }`}
                    >
                      <span className="mr-3">🎵</span> My Music
                    </button>
                  </li>
                )}
                <li>
                  <button
                    onClick={() => setActiveTab('shows')}
                    className={`w-full text-left px-4 py-2 rounded-md flex items-center ${
                      activeTab === 'shows' ? 'bg-primary-50 text-primary-600' : 'text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    <span className="mr-3">🎭</span> Shows
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => setActiveTab('settings')}
                    className={`w-full text-left px-4 py-2 rounded-md flex items-center ${
                      activeTab === 'settings' ? 'bg-primary-50 text-primary-600' : 'text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    <span className="mr-3">⚙️</span> Settings
                  </button>
                </li>
              </ul>
            </nav>
          </div>

          {/* Main content */}
          <div className="flex-1 bg-white rounded-lg shadow p-6">
            {renderTabContent()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
