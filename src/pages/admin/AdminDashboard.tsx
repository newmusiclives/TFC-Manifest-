import React, { useState } from 'react';
import { FaUsers, FaMusic, FaBuilding, FaCalendarAlt, FaMoneyBillWave } from 'react-icons/fa';
import { useAuth } from '../../hooks/useAuth';

const AdminDashboard = () => {
  const { user, userType } = useAuth();
  const [activeTab, setActiveTab] = useState('overview');

  // Mock data for admin dashboard
  const stats = {
    users: 1248,
    musicians: 756,
    venues: 124,
    shows: 389,
    revenue: 28750
  };

  const recentUsers = [
    { id: 1, name: 'John Doe', email: 'john@example.com', type: 'musician', joined: '2023-05-15' },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com', type: 'fan', joined: '2023-05-14' },
    { id: 3, name: 'The Venue', email: 'venue@example.com', type: 'venue', joined: '2023-05-13' },
    { id: 4, name: 'Mike Johnson', email: 'mike@example.com', type: 'musician', joined: '2023-05-12' },
    { id: 5, name: 'Sarah Williams', email: 'sarah@example.com', type: 'fan', joined: '2023-05-11' }
  ];

  const renderTabContent = () => {
    switch (activeTab) {
      case 'overview':
        return (
          <div>
            <h3 className="text-lg font-semibold mb-4">Platform Overview</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
              <div className="bg-white p-4 rounded-lg shadow">
                <div className="flex items-center">
                  <div className="p-3 rounded-full bg-blue-100 text-blue-500 mr-4">
                    <FaUsers className="text-xl" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Total Users</p>
                    <p className="text-xl font-bold">{stats.users}</p>
                  </div>
                </div>
              </div>
              <div className="bg-white p-4 rounded-lg shadow">
                <div className="flex items-center">
                  <div className="p-3 rounded-full bg-purple-100 text-purple-500 mr-4">
                    <FaMusic className="text-xl" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Musicians</p>
                    <p className="text-xl font-bold">{stats.musicians}</p>
                  </div>
                </div>
              </div>
              <div className="bg-white p-4 rounded-lg shadow">
                <div className="flex items-center">
                  <div className="p-3 rounded-full bg-green-100 text-green-500 mr-4">
                    <FaBuilding className="text-xl" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Venues</p>
                    <p className="text-xl font-bold">{stats.venues}</p>
                  </div>
                </div>
              </div>
              <div className="bg-white p-4 rounded-lg shadow">
                <div className="flex items-center">
                  <div className="p-3 rounded-full bg-yellow-100 text-yellow-500 mr-4">
                    <FaCalendarAlt className="text-xl" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Shows</p>
                    <p className="text-xl font-bold">{stats.shows}</p>
                  </div>
                </div>
              </div>
              <div className="bg-white p-4 rounded-lg shadow">
                <div className="flex items-center">
                  <div className="p-3 rounded-full bg-indigo-100 text-indigo-500 mr-4">
                    <FaMoneyBillWave className="text-xl" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Revenue</p>
                    <p className="text-xl font-bold">${stats.revenue}</p>
                  </div>
                </div>
              </div>
            </div>

            <h3 className="text-lg font-semibold mb-4">Recent Users</h3>
            <div className="bg-white rounded-lg shadow overflow-hidden">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Joined</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {recentUsers.map((user) => (
                    <tr key={user.id}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">{user.name}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-500">{user.email}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                          ${user.type === 'musician' ? 'bg-purple-100 text-purple-800' : 
                            user.type === 'venue' ? 'bg-green-100 text-green-800' : 
                            'bg-blue-100 text-blue-800'}`}>
                          {user.type}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {user.joined}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        );
      case 'users':
        return <div className="p-4">Users management content</div>;
      case 'musicians':
        return <div className="p-4">Musicians management content</div>;
      case 'venues':
        return <div className="p-4">Venues management content</div>;
      case 'shows':
        return <div className="p-4">Shows management content</div>;
      default:
        return <div className="p-4">Select a tab</div>;
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
          <p className="text-gray-600">Welcome back, {user?.user_metadata?.name || 'Admin'}</p>
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
                    onClick={() => setActiveTab('users')}
                    className={`w-full text-left px-4 py-2 rounded-md flex items-center ${
                      activeTab === 'users' ? 'bg-primary-50 text-primary-600' : 'text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    <span className="mr-3">👥</span> Users
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => setActiveTab('musicians')}
                    className={`w-full text-left px-4 py-2 rounded-md flex items-center ${
                      activeTab === 'musicians' ? 'bg-primary-50 text-primary-600' : 'text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    <span className="mr-3">🎵</span> Musicians
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => setActiveTab('venues')}
                    className={`w-full text-left px-4 py-2 rounded-md flex items-center ${
                      activeTab === 'venues' ? 'bg-primary-50 text-primary-600' : 'text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    <span className="mr-3">🏢</span> Venues
                  </button>
                </li>
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

export default AdminDashboard;
