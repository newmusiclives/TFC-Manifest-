import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { FiMusic, FiUpload, FiCalendar, FiEdit, FiSettings, FiDollarSign, FiUsers, FiBarChart2, FiHeart, FiMessageSquare } from 'react-icons/fi'
import { useAuthStore } from '../stores/authStore'
import toast from 'react-hot-toast'
import { supabase } from '../lib/supabase'
import { Chart as ChartJS, ArcElement, Tooltip, Legend, CategoryScale, LinearScale, PointElement, LineElement, BarElement, Title } from 'chart.js'
import { Doughnut, Line, Bar } from 'react-chartjs-2'

// Register ChartJS components
ChartJS.register(
  ArcElement, 
  Tooltip, 
  Legend, 
  CategoryScale, 
  LinearScale, 
  PointElement, 
  LineElement, 
  BarElement, 
  Title
)

interface TopSong {
  title: string;
  plays: number;
  donations: number;
}

interface RecentDonation {
  name: string;
  amount: number;
  date: string;
  message: string;
}

interface MonthlyData {
  labels: string[];
  listeners: number[];
  donations: number[];
  oneTimeDonations: number[];
  plays: number[];
}

interface ArtistStats {
  totalListeners: number;
  totalPlays: number;
  totalDonations: number;
  monthlyDonations: number;
  oneTimeDonations: number;
  totalFollowers: number;
  newFollowers: number;
  topSongs: TopSong[];
  recentDonations: RecentDonation[];
  monthlyData: MonthlyData;
}

const ArtistProfile = () => {
  const { user, isMusician } = useAuthStore()
  const navigate = useNavigate()
  
  const [activeTab, setActiveTab] = useState('dashboard')
  const [isUploading, setIsUploading] = useState(false)
  const [showUploadModal, setShowUploadModal] = useState(false)
  const [showScheduleModal, setShowScheduleModal] = useState(false)
  const [showEditProfileModal, setShowEditProfileModal] = useState(false)
  const [showSettingsModal, setShowSettingsModal] = useState(false)
  
  // Mock data for the artist dashboard
  const [artistStats, setArtistStats] = useState<ArtistStats>({
    totalListeners: 1250,
    totalPlays: 3750,
    totalDonations: 1850,
    monthlyDonations: 450,
    oneTimeDonations: 1400,
    totalFollowers: 320,
    newFollowers: 28,
    topSongs: [
      { title: 'Autumn Leaves', plays: 1250, donations: 320 },
      { title: 'Mountain Trail', plays: 980, donations: 275 },
      { title: 'City Lights', plays: 1100, donations: 290 },
      { title: 'River Song', plays: 850, donations: 210 }
    ],
    recentDonations: [
      { name: 'John D.', amount: 25, date: '2023-10-15', message: 'Love your music!' },
      { name: 'Sarah M.', amount: 10, date: '2023-10-14', message: 'Great new song!' },
      { name: 'Michael R.', amount: 50, date: '2023-10-12', message: 'Keep up the amazing work!' },
      { name: 'Emma L.', amount: 15, date: '2023-10-10', message: 'Your music inspires me.' }
    ],
    monthlyData: {
      labels: ['Jun', 'Jul', 'Aug', 'Sep', 'Oct'],
      listeners: [850, 920, 1050, 1150, 1250],
      donations: [320, 380, 410, 430, 450],
      oneTimeDonations: [280, 320, 350, 380, 400],
      plays: [2200, 2600, 3000, 3400, 3750]
    }
  })
  
  useEffect(() => {
    // Check if user is authenticated and is a musician
    if (!user) {
      navigate('/login')
      return
    }
    
    if (!isMusician()) {
      navigate('/')
      toast.error('You need a musician account to access this page')
      return
    }
    
    // In a real app, we would fetch the artist's data from Supabase here
    // For now, we're using mock data
  }, [user, isMusician, navigate])
  
  // Chart data for donations breakdown
  const donationChartData = {
    labels: ['Monthly Supporters', 'One-time Donations'],
    datasets: [
      {
        data: [artistStats.monthlyDonations, artistStats.oneTimeDonations],
        backgroundColor: ['#4F46E5', '#C026D3'],
        borderColor: ['#4338CA', '#A21CAF'],
        borderWidth: 1,
      },
    ],
  }
  
  // Chart data for monthly trends
  const monthlyTrendsData = {
    labels: artistStats.monthlyData.labels,
    datasets: [
      {
        label: 'Listeners',
        data: artistStats.monthlyData.listeners,
        borderColor: '#6366F1',
        backgroundColor: 'rgba(99, 102, 241, 0.1)',
        tension: 0.3,
        fill: true,
      },
      {
        label: 'Plays',
        data: artistStats.monthlyData.plays,
        borderColor: '#14B8A6',
        backgroundColor: 'rgba(20, 184, 166, 0.1)',
        tension: 0.3,
        fill: true,
        hidden: true, // Hidden by default to not overwhelm
      }
    ],
  }
  
  // Chart data for donation trends
  const donationTrendsData = {
    labels: artistStats.monthlyData.labels,
    datasets: [
      {
        label: 'Monthly Donations',
        data: artistStats.monthlyData.donations,
        backgroundColor: '#6366F1',
      },
      {
        label: 'One-time Donations',
        data: artistStats.monthlyData.oneTimeDonations,
        backgroundColor: '#C026D3',
      }
    ],
  }
  
  return (
    <div className="artist-profile-container">
      <div className="artist-profile-flex">
        {/* Sidebar */}
        <div className="artist-profile-sidebar">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden mb-6">
            <div className="p-6">
              <h1 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">
                Artist Dashboard
              </h1>
              
              <nav className="space-y-2">
                <button
                  onClick={() => setActiveTab('dashboard')}
                  className={`w-full text-left px-4 py-2 rounded-lg flex items-center ${
                    activeTab === 'dashboard'
                      ? 'bg-primary-100 dark:bg-primary-900 text-primary-600 dark:text-primary-400'
                      : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                  }`}
                >
                  <FiBarChart2 className="mr-3" />
                  Dashboard
                </button>
                
                <button
                  onClick={() => setActiveTab('songs')}
                  className={`w-full text-left px-4 py-2 rounded-lg flex items-center ${
                    activeTab === 'songs'
                      ? 'bg-primary-100 dark:bg-primary-900 text-primary-600 dark:text-primary-400'
                      : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                  }`}
                >
                  <FiMusic className="mr-3" />
                  Your Songs
                </button>
                
                <button
                  onClick={() => setActiveTab('shows')}
                  className={`w-full text-left px-4 py-2 rounded-lg flex items-center ${
                    activeTab === 'shows'
                      ? 'bg-primary-100 dark:bg-primary-900 text-primary-600 dark:text-primary-400'
                      : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                  }`}
                >
                  <FiCalendar className="mr-3" />
                  Your Shows
                </button>
                
                <button
                  onClick={() => setActiveTab('fans')}
                  className={`w-full text-left px-4 py-2 rounded-lg flex items-center ${
                    activeTab === 'fans'
                      ? 'bg-primary-100 dark:bg-primary-900 text-primary-600 dark:text-primary-400'
                      : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                  }`}
                >
                  <FiUsers className="mr-3" />
                  Your Fans
                </button>
                
                <button
                  onClick={() => setActiveTab('earnings')}
                  className={`w-full text-left px-4 py-2 rounded-lg flex items-center ${
                    activeTab === 'earnings'
                      ? 'bg-primary-100 dark:bg-primary-900 text-primary-600 dark:text-primary-400'
                      : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                  }`}
                >
                  <FiDollarSign className="mr-3" />
                  Earnings
                </button>
              </nav>
            </div>
          </div>
          
          {/* Quick Actions */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
              <h3 className="text-lg font-semibold text-gray-800 dark:text-white">
                Quick Actions
              </h3>
            </div>
            
            <div className="p-6 space-y-4">
              <button
                onClick={() => toast.success('Upload Song feature activated')}
                className="w-full btn btn-primary flex items-center justify-center"
              >
                <FiUpload className="mr-2" />
                Upload New Song
              </button>
              
              <button
                onClick={() => toast.success('Schedule Show feature activated')}
                className="w-full btn btn-outline flex items-center justify-center"
              >
                <FiCalendar className="mr-2" />
                Schedule Show
              </button>
              
              <button
                onClick={() => toast.success('Edit Profile feature activated')}
                className="w-full btn btn-outline flex items-center justify-center"
              >
                <FiEdit className="mr-2" />
                Edit Profile
              </button>
              
              <button
                onClick={() => toast.success('Message Fans feature activated')}
                className="w-full btn btn-outline flex items-center justify-center"
              >
                <FiMessageSquare className="mr-2" />
                Message Fans
              </button>
              
              <button
                onClick={() => toast.success('Promote Song feature activated')}
                className="w-full btn btn-outline flex items-center justify-center"
              >
                <FiHeart className="mr-2" />
                Promote Song
              </button>
              
              <button
                onClick={() => toast.success('Settings feature activated')}
                className="w-full btn btn-outline flex items-center justify-center"
              >
                <FiSettings className="mr-2" />
                Settings
              </button>
            </div>
          </div>
        </div>
        
        {/* Main Content */}
        <div className="artist-profile-main">
          {activeTab === 'dashboard' && (
            <div className="space-y-6">
              {/* Stats Overview */}
              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden">
                <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
                  <h2 className="text-xl font-semibold text-gray-800 dark:text-white">
                    Your Stats
                  </h2>
                </div>
                
                <div className="p-6">
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                    <div className="bg-gradient-to-br from-primary-500 to-primary-600 rounded-xl p-4 text-white">
                      <div className="text-3xl font-bold mb-1">
                        {artistStats.totalListeners.toLocaleString()}
                      </div>
                      <div className="text-sm opacity-80">Total Listeners</div>
                    </div>
                    
                    <div className="bg-gradient-to-br from-secondary-500 to-secondary-600 rounded-xl p-4 text-white">
                      <div className="text-3xl font-bold mb-1">
                        {artistStats.totalPlays.toLocaleString()}
                      </div>
                      <div className="text-sm opacity-80">Total Plays</div>
                    </div>
                    
                    <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-xl p-4 text-white">
                      <div className="text-3xl font-bold mb-1">
                        ${artistStats.totalDonations.toLocaleString()}
                      </div>
                      <div className="text-sm opacity-80">Total Donations</div>
                    </div>
                    
                    <div className="bg-gradient-to-br from-accent-500 to-accent-600 rounded-xl p-4 text-white">
                      <div className="text-3xl font-bold mb-1">
                        {artistStats.totalFollowers.toLocaleString()}
                      </div>
                      <div className="text-sm opacity-80">Followers</div>
                      <div className="text-xs mt-1 bg-white bg-opacity-20 rounded px-1 inline-block">
                        +{artistStats.newFollowers} new
                      </div>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Donation Breakdown */}
                    <div className="bg-gray-50 dark:bg-gray-700 rounded-xl p-4">
                      <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">
                        Donation Breakdown
                      </h3>
                      <div className="h-64 flex items-center justify-center">
                        <Doughnut 
                          data={donationChartData} 
                          options={{
                            plugins: {
                              legend: {
                                position: 'bottom',
                              },
                              tooltip: {
                                callbacks: {
                                  label: function(context) {
                                    const label = context.label || '';
                                    const value = context.raw || 0;
                                    const total = context.dataset.data.reduce((a, b) => Number(a) + Number(b), 0);
                                    const percentage = Math.round((Number(value) / total) * 100);
                                    return `${label}: $${value} (${percentage}%)`;
                                  }
                                }
                              }
                            },
                            cutout: '70%',
                          }}
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-2 mt-4 text-center">
                        <div className="bg-primary-100 dark:bg-primary-900 p-2 rounded-lg">
                          <div className="text-primary-600 dark:text-primary-400 font-semibold">Monthly</div>
                          <div className="text-xl font-bold text-gray-800 dark:text-white">${artistStats.monthlyDonations}</div>
                        </div>
                        <div className="bg-accent-100 dark:bg-accent-900 p-2 rounded-lg">
                          <div className="text-accent-600 dark:text-accent-400 font-semibold">One-time</div>
                          <div className="text-xl font-bold text-gray-800 dark:text-white">${artistStats.oneTimeDonations}</div>
                        </div>
                      </div>
                    </div>
                    
                    {/* Monthly Trends */}
                    <div className="bg-gray-50 dark:bg-gray-700 rounded-xl p-4">
                      <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">
                        Listener Trends
                      </h3>
                      <div className="h-64">
                        <Line 
                          data={monthlyTrendsData} 
                          options={{
                            responsive: true,
                            maintainAspectRatio: false,
                            plugins: {
                              legend: {
                                position: 'bottom',
                              },
                              tooltip: {
                                mode: 'index',
                                intersect: false,
                              },
                            },
                            scales: {
                              y: {
                                beginAtZero: true,
                                ticks: {
                                  callback: function(value) {
                                    return value.toLocaleString();
                                  }
                                }
                              }
                            }
                          }}
                        />
                      </div>
                    </div>
                    
                    {/* Donation Trends */}
                    <div className="bg-gray-50 dark:bg-gray-700 rounded-xl p-4 md:col-span-2">
                      <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">
                        Donation Trends
                      </h3>
                      <div className="h-64">
                        <Bar 
                          data={donationTrendsData} 
                          options={{
                            responsive: true,
                            maintainAspectRatio: false,
                            plugins: {
                              legend: {
                                position: 'bottom',
                              },
                              tooltip: {
                                mode: 'index',
                                intersect: false,
                                callbacks: {
                                  label: function(context) {
                                    const label = context.dataset.label || '';
                                    const value = context.raw || 0;
                                    return `${label}: $${value}`;
                                  }
                                }
                              },
                            },
                            scales: {
                              y: {
                                beginAtZero: true,
                                ticks: {
                                  callback: function(value) {
                                    return '$' + value.toLocaleString();
                                  }
                                }
                              }
                            }
                          }}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Top Songs & Recent Donations */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Top Songs */}
                <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden">
                  <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
                    <h3 className="text-lg font-semibold text-gray-800 dark:text-white">
                      Top Songs
                    </h3>
                  </div>
                  
                  <div className="p-6">
                    <div className="space-y-4">
                      {artistStats.topSongs.map((song, index) => (
                        <div key={index} className="flex items-center justify-between">
                          <div className="flex items-center">
                            <div className="w-8 h-8 bg-primary-100 dark:bg-primary-900 rounded-full flex items-center justify-center text-primary-600 dark:text-primary-400 font-semibold mr-3">
                              {index + 1}
                            </div>
                            <div>
                              <div className="font-medium text-gray-800 dark:text-white">
                                {song.title}
                              </div>
                              <div className="text-sm text-gray-500 dark:text-gray-400">
                                {song.plays.toLocaleString()} plays
                              </div>
                            </div>
                          </div>
                          <div className="text-right">
                            <div className="font-medium text-gray-800 dark:text-white">
                              ${song.donations}
                            </div>
                            <div className="text-sm text-gray-500 dark:text-gray-400">
                              donations
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
                
                {/* Recent Donations */}
                <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden">
                  <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
                    <h3 className="text-lg font-semibold text-gray-800 dark:text-white">
                      Recent Donations
                    </h3>
                  </div>
                  
                  <div className="p-6">
                    <div className="space-y-4">
                      {artistStats.recentDonations.map((donation, index) => (
                        <div key={index} className="border-b border-gray-200 dark:border-gray-700 pb-4 last:border-0 last:pb-0">
                          <div className="flex justify-between mb-1">
                            <div className="font-medium text-gray-800 dark:text-white">
                              {donation.name}
                            </div>
                            <div className="font-medium text-green-600 dark:text-green-400">
                              ${donation.amount}
                            </div>
                          </div>
                          <div className="text-sm text-gray-500 dark:text-gray-400 mb-2">
                            {new Date(donation.date).toLocaleDateString()}
                          </div>
                          {donation.message && (
                            <div className="text-sm text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-700 p-2 rounded-lg">
                              "{donation.message}"
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
          
          {activeTab === 'songs' && (
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden">
              <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
                <h2 className="text-xl font-semibold text-gray-800 dark:text-white">
                  Your Songs
                </h2>
              </div>
              
              <div className="p-6">
                <div className="flex justify-between mb-6">
                  <div className="relative">
                    <input
                      type="text"
                      placeholder="Search songs..."
                      className="input"
                    />
                  </div>
                  
                  <button
                    onClick={() => toast.success('Upload Song feature activated')}
                    className="btn btn-primary flex items-center"
                  >
                    <FiUpload className="mr-2" />
                    Upload New Song
                  </button>
                </div>
                
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                    <thead className="bg-gray-50 dark:bg-gray-700">
                      <tr>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                          Title
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                          Uploaded
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                          Plays
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                          Donations
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                      {artistStats.topSongs.map((song, index) => (
                        <tr key={index}>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="font-medium text-gray-800 dark:text-white">
                              {song.title}
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                            {new Date().toLocaleDateString()}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                            {song.plays.toLocaleString()}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                            ${song.donations}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                            <button className="text-primary-600 dark:text-primary-400 hover:text-primary-800 dark:hover:text-primary-300 mr-3">
                              Edit
                            </button>
                            <button className="text-red-600 dark:text-red-400 hover:text-red-800 dark:hover:text-red-300">
                              Delete
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}
          
          {activeTab === 'shows' && (
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden">
              <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
                <h2 className="text-xl font-semibold text-gray-800 dark:text-white">
                  Your Shows
                </h2>
              </div>
              
              <div className="p-6">
                <div className="flex justify-between mb-6">
                  <div className="relative">
                    <input
                      type="text"
                      placeholder="Search shows..."
                      className="input"
                    />
                  </div>
                  
                  <button
                    onClick={() => toast.success('Schedule Show feature activated')}
                    className="btn btn-primary flex items-center"
                  >
                    <FiCalendar className="mr-2" />
                    Schedule Show
                  </button>
                </div>
                
                <div className="space-y-4">
                  <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
                    <div className="flex items-start">
                      <div className="bg-primary-100 dark:bg-primary-900 text-primary-600 dark:text-primary-400 rounded-lg p-3 mr-4">
                        <FiCalendar size={20} />
                      </div>
                      <div className="flex-1">
                        <div className="flex justify-between">
                          <h4 className="font-medium text-gray-800 dark:text-white">
                            The Acoustic Room
                          </h4>
                          <div className="text-sm text-white bg-green-500 rounded-full px-2 py-0.5">
                            Upcoming
                          </div>
                        </div>
                        <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">
                          Portland, OR
                        </p>
                        <p className="text-sm text-gray-700 dark:text-gray-300 mb-3">
                          Nov 15, 2023 at 8:00 PM
                        </p>
                        <div className="flex space-x-2">
                          <button className="text-sm text-primary-600 dark:text-primary-400 hover:underline">
                            Edit
                          </button>
                          <button className="text-sm text-red-600 dark:text-red-400 hover:underline">
                            Cancel
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
                    <div className="flex items-start">
                      <div className="bg-primary-100 dark:bg-primary-900 text-primary-600 dark:text-primary-400 rounded-lg p-3 mr-4">
                        <FiCalendar size={20} />
                      </div>
                      <div className="flex-1">
                        <div className="flex justify-between">
                          <h4 className="font-medium text-gray-800 dark:text-white">
                            Mountain View Coffee
                          </h4>
                          <div className="text-sm text-white bg-green-500 rounded-full px-2 py-0.5">
                            Upcoming
                          </div>
                        </div>
                        <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">
                          Seattle, WA
                        </p>
                        <p className="text-sm text-gray-700 dark:text-gray-300 mb-3">
                          Nov 22, 2023 at 7:30 PM
                        </p>
                        <div className="flex space-x-2">
                          <button className="text-sm text-primary-600 dark:text-primary-400 hover:underline">
                            Edit
                          </button>
                          <button className="text-sm text-red-600 dark:text-red-400 hover:underline">
                            Cancel
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
                    <div className="flex items-start">
                      <div className="bg-primary-100 dark:bg-primary-900 text-primary-600 dark:text-primary-400 rounded-lg p-3 mr-4">
                        <FiCalendar size={20} />
                      </div>
                      <div className="flex-1">
                        <div className="flex justify-between">
                          <h4 className="font-medium text-gray-800 dark:text-white">
                            Folk Festival
                          </h4>
                          <div className="text-sm text-white bg-green-500 rounded-full px-2 py-0.5">
                            Upcoming
                          </div>
                        </div>
                        <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">
                          Eugene, OR
                        </p>
                        <p className="text-sm text-gray-700 dark:text-gray-300 mb-3">
                          Dec 5, 2023 at 6:00 PM
                        </p>
                        <div className="flex space-x-2">
                          <button className="text-sm text-primary-600 dark:text-primary-400 hover:underline">
                            Edit
                          </button>
                          <button className="text-sm text-red-600 dark:text-red-400 hover:underline">
                            Cancel
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
          
          {activeTab === 'fans' && (
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden">
              <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
                <h2 className="text-xl font-semibold text-gray-800 dark:text-white">
                  Your Fans
                </h2>
              </div>
              
              <div className="p-6">
                <div className="flex justify-between mb-6">
                  <div className="relative">
                    <input
                      type="text"
                      placeholder="Search fans..."
                      className="input"
                    />
                  </div>
                  
                  <button
                    onClick={() => toast.success('Message Fans feature activated')}
                    className="btn btn-primary flex items-center"
                  >
                    <FiMessageSquare className="mr-2" />
                    Message Fans
                  </button>
                </div>
                
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                    <thead className="bg-gray-50 dark:bg-gray-700">
                      <tr>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                          Fan
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                          Following Since
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                          Total Donations
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                      {artistStats.recentDonations.map((donation, index) => (
                        <tr key={index}>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="font-medium text-gray-800 dark:text-white">
                              {donation.name}
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                            {new Date(donation.date).toLocaleDateString()}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                            ${donation.amount}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                            <button className="text-primary-600 dark:text-primary-400 hover:text-primary-800 dark:hover:text-primary-300">
                              Message
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}
          
          {activeTab === 'earnings' && (
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden">
              <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
                <h2 className="text-xl font-semibold text-gray-800 dark:text-white">
                  Your Earnings
                </h2>
              </div>
              
              <div className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                  <div className="bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-xl p-4">
                    <div className="text-sm text-gray-500 dark:text-gray-400 mb-1">
                      Total Earnings
                    </div>
                    <div className="text-2xl font-bold text-gray-800 dark:text-white">
                      ${(artistStats.totalDonations * 0.8).toFixed(2)}
                    </div>
                    <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                      80% of ${artistStats.totalDonations.toLocaleString()} donations
                    </div>
                  </div>
                  
                  <div className="bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-xl p-4">
                    <div className="text-sm text-gray-500 dark:text-gray-400 mb-1">
                      Available for Withdrawal
                    </div>
                    <div className="text-2xl font-bold text-gray-800 dark:text-white">
                      ${(artistStats.totalDonations * 0.8 * 0.9).toFixed(2)}
                    </div>
                    <div className="text-xs text-green-500 dark:text-green-400 mt-1">
                      Ready to withdraw
                    </div>
                  </div>
                  
                  <div className="bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-xl p-4">
                    <div className="text-sm text-gray-500 dark:text-gray-400 mb-1">
                      Pending
                    </div>
                    <div className="text-2xl font-bold text-gray-800 dark:text-white">
                      ${(artistStats.totalDonations * 0.8 * 0.1).toFixed(2)}
                    </div>
                    <div className="text-xs text-yellow-500 dark:text-yellow-400 mt-1">
                      Processing (1-2 business days)
                    </div>
                  </div>
                </div>
                
                <div className="mb-6">
                  <button className="btn btn-primary">
                    Withdraw Funds
                  </button>
                </div>
                
                <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">
                  Recent Transactions
                </h3>
                
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                    <thead className="bg-gray-50 dark:bg-gray-700">
                      <tr>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                          Date
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                          Description
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                          Amount
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                          Status
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                      {artistStats.recentDonations.map((donation, index) => (
                        <tr key={index}>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                            {new Date(donation.date).toLocaleDateString()}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="font-medium text-gray-800 dark:text-white">
                              Donation from {donation.name}
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                            ${(donation.amount * 0.8).toFixed(2)}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">
                              Completed
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default ArtistProfile
