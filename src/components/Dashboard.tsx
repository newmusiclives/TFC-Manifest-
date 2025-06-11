import { useState } from 'react'
import { FiDollarSign, FiLink, FiShare2, FiPrinter, FiCreditCard, FiBarChart2 } from 'react-icons/fi'
import { BsQrCode } from 'react-icons/bs'
import { useAuthStore } from '../stores/authStore'
import DonationLinkGenerator from '../components/DonationLinkGenerator'
import EmbedCodeGenerator from '../components/EmbedCodeGenerator'
import QRCodeGenerator from '../components/QRCodeGenerator'
import SocialMediaConnector from '../components/SocialMediaConnector'
import PrintableAssets from '../components/PrintableAssets'
import FinancialDetails from '../components/FinancialDetails'
import BankAccountConnector from '../components/BankAccountConnector'
import toast from 'react-hot-toast'

const Dashboard = () => {
  const { user } = useAuthStore()
  const [activeTab, setActiveTab] = useState('overview')
  const [showEditProfileModal, setShowEditProfileModal] = useState(false)
  
  // Mock data for the artist
  const artistData = {
    id: user?.id || 'artist-123',
    name: user?.user_metadata?.name || 'Demo Artist',
    totalEarnings: 1247.85,
    pendingPayout: 328.50,
    fanCount: 142,
    songCount: 8,
    showCount: 3,
    recentDonations: [
      { id: 1, fanName: 'John D.', amount: 15.00, date: '2023-06-15', message: 'Love your new song!' },
      { id: 2, fanName: 'Sarah M.', amount: 25.00, date: '2023-06-14', message: 'Amazing show last night!' },
      { id: 3, fanName: 'Mike R.', amount: 10.00, date: '2023-06-12', message: null },
    ],
    nextShow: {
      id: 'show-456',
      venue: 'The Sound Garden',
      date: '2023-06-25',
      time: '8:00 PM',
      location: 'Austin, TX'
    }
  }
  
  const handleEditProfile = () => {
    toast.success('Edit Profile feature activated')
    setShowEditProfileModal(true)
  }
  
  const renderTabContent = () => {
    switch (activeTab) {
      case 'donation-links':
        return <DonationLinkGenerator artistId={artistData.id} artistName={artistData.name} />
      case 'embed-codes':
        return <EmbedCodeGenerator artistId={artistData.id} artistName={artistData.name} />
      case 'qr-codes':
        return <QRCodeGenerator showId={artistData.nextShow.id} musicianId={artistData.id} venueName={artistData.nextShow.venue} />
      case 'social-media':
        return <SocialMediaConnector artistId={artistData.id} artistName={artistData.name} />
      case 'printable-assets':
        return <PrintableAssets artistId={artistData.id} artistName={artistData.name} />
      case 'financial-details':
        return <FinancialDetails artistId={artistData.id} artistData={artistData} />
      case 'bank-account':
        return <BankAccountConnector artistId={artistData.id} artistName={artistData.name} />
      default:
        return (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Earnings Card */}
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6">
              <div className="flex items-center mb-4">
                <div className="p-3 rounded-full bg-primary-100 text-primary-600 mr-4">
                  <FiDollarSign size={24} />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-800 dark:text-white">Total Earnings</h3>
                  <p className="text-2xl font-bold text-primary-600">${artistData.totalEarnings.toFixed(2)}</p>
                </div>
              </div>
              <div className="flex justify-between text-sm text-gray-500 dark:text-gray-400">
                <span>Pending Payout:</span>
                <span className="font-medium">${artistData.pendingPayout.toFixed(2)}</span>
              </div>
            </div>
            
            {/* Fan Stats Card */}
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6">
              <div className="flex items-center mb-4">
                <div className="p-3 rounded-full bg-secondary-100 text-secondary-600 mr-4">
                  <FiBarChart2 size={24} />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-800 dark:text-white">Fan Stats</h3>
                  <p className="text-2xl font-bold text-secondary-600">{artistData.fanCount} Fans</p>
                </div>
              </div>
              <div className="flex justify-between text-sm text-gray-500 dark:text-gray-400">
                <span>Songs:</span>
                <span className="font-medium">{artistData.songCount}</span>
              </div>
              <div className="flex justify-between text-sm text-gray-500 dark:text-gray-400 mt-1">
                <span>Upcoming Shows:</span>
                <span className="font-medium">{artistData.showCount}</span>
              </div>
            </div>
            
            {/* Next Show Card */}
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6">
              <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-3">Next Show</h3>
              <p className="text-xl font-bold text-gray-900 dark:text-white">{artistData.nextShow.venue}</p>
              <p className="text-gray-600 dark:text-gray-300">{artistData.nextShow.date} at {artistData.nextShow.time}</p>
              <p className="text-gray-500 dark:text-gray-400 mb-4">{artistData.nextShow.location}</p>
              <button className="btn btn-primary btn-sm">Manage Show</button>
            </div>
            
            {/* Recent Donations */}
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 md:col-span-2 lg:col-span-3">
              <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">Recent Donations</h3>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                  <thead className="bg-gray-50 dark:bg-gray-700">
                    <tr>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Fan</th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Amount</th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Date</th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Message</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                    {artistData.recentDonations.map((donation) => (
                      <tr key={donation.id}>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">{donation.fanName}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">${donation.amount.toFixed(2)}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">{donation.date}</td>
                        <td className="px-6 py-4 text-sm text-gray-500 dark:text-gray-300">{donation.message || '-'}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="mt-4 text-right">
                <button className="text-primary-600 hover:text-primary-700 text-sm font-medium">View All Donations →</button>
              </div>
            </div>
          </div>
        )
    }
  }
  
  return (
    <div className="dashboard-container">
      <div className="dashboard-flex">
        {/* Sidebar */}
        <div className="dashboard-sidebar">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 mb-6">
            <div className="text-center mb-4">
              <div className="w-24 h-24 rounded-full bg-primary-100 mx-auto flex items-center justify-center mb-4">
                <span className="text-3xl font-bold text-primary-600">{artistData.name.charAt(0)}</span>
              </div>
              <h2 className="text-xl font-bold text-gray-900 dark:text-white">{artistData.name}</h2>
              <p className="text-gray-500 dark:text-gray-400">Musician</p>
            </div>
            <div className="border-t border-gray-200 dark:border-gray-700 pt-4">
              <button 
                onClick={handleEditProfile}
                className="btn btn-primary w-full mb-2"
              >
                Edit Profile
              </button>
              <button className="btn btn-outline w-full">View Public Profile</button>
            </div>
          </div>
          
          <nav className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden">
            <div className="p-4 bg-gray-50 dark:bg-gray-700">
              <h3 className="font-medium text-gray-900 dark:text-white">Dashboard</h3>
            </div>
            <ul>
              <li>
                <button
                  onClick={() => setActiveTab('overview')}
                  className={`w-full text-left px-4 py-3 flex items-center ${
                    activeTab === 'overview' 
                      ? 'bg-primary-50 text-primary-600 border-l-4 border-primary-600' 
                      : 'text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700'
                  }`}
                >
                  <FiBarChart2 className="mr-3" />
                  Overview
                </button>
              </li>
              <li>
                <button
                  onClick={() => setActiveTab('donation-links')}
                  className={`w-full text-left px-4 py-3 flex items-center ${
                    activeTab === 'donation-links' 
                      ? 'bg-primary-50 text-primary-600 border-l-4 border-primary-600' 
                      : 'text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700'
                  }`}
                >
                  <FiLink className="mr-3" />
                  Donation Links
                </button>
              </li>
              <li>
                <button
                  onClick={() => setActiveTab('embed-codes')}
                  className={`w-full text-left px-4 py-3 flex items-center ${
                    activeTab === 'embed-codes' 
                      ? 'bg-primary-50 text-primary-600 border-l-4 border-primary-600' 
                      : 'text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700'
                  }`}
                >
                  <FiLink className="mr-3" />
                  Embed Codes
                </button>
              </li>
              <li>
                <button
                  onClick={() => setActiveTab('qr-codes')}
                  className={`w-full text-left px-4 py-3 flex items-center ${
                    activeTab === 'qr-codes' 
                      ? 'bg-primary-50 text-primary-600 border-l-4 border-primary-600' 
                      : 'text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700'
                  }`}
                >
                  <BsQrCode className="mr-3" />
                  QR Codes
                </button>
              </li>
              <li>
                <button
                  onClick={() => setActiveTab('social-media')}
                  className={`w-full text-left px-4 py-3 flex items-center ${
                    activeTab === 'social-media' 
                      ? 'bg-primary-50 text-primary-600 border-l-4 border-primary-600' 
                      : 'text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700'
                  }`}
                >
                  <FiShare2 className="mr-3" />
                  Social Media
                </button>
              </li>
              <li>
                <button
                  onClick={() => setActiveTab('printable-assets')}
                  className={`w-full text-left px-4 py-3 flex items-center ${
                    activeTab === 'printable-assets' 
                      ? 'bg-primary-50 text-primary-600 border-l-4 border-primary-600' 
                      : 'text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700'
                  }`}
                >
                  <FiPrinter className="mr-3" />
                  Printable Assets
                </button>
              </li>
              <li>
                <button
                  onClick={() => setActiveTab('financial-details')}
                  className={`w-full text-left px-4 py-3 flex items-center ${
                    activeTab === 'financial-details' 
                      ? 'bg-primary-50 text-primary-600 border-l-4 border-primary-600' 
                      : 'text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700'
                  }`}
                >
                  <FiDollarSign className="mr-3" />
                  Financial Details
                </button>
              </li>
              <li>
                <button
                  onClick={() => setActiveTab('bank-account')}
                  className={`w-full text-left px-4 py-3 flex items-center ${
                    activeTab === 'bank-account' 
                      ? 'bg-primary-50 text-primary-600 border-l-4 border-primary-600' 
                      : 'text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700'
                  }`}
                >
                  <FiCreditCard className="mr-3" />
                  Bank Account
                </button>
              </li>
            </ul>
          </nav>
        </div>
        
        {/* Main Content */}
        <div className="dashboard-main">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
              {activeTab === 'overview' ? 'Dashboard Overview' : 
               activeTab === 'donation-links' ? 'Donation Links' :
               activeTab === 'embed-codes' ? 'Embed Codes' :
               activeTab === 'qr-codes' ? 'QR Codes' :
               activeTab === 'social-media' ? 'Social Media' :
               activeTab === 'printable-assets' ? 'Printable Assets' :
               activeTab === 'financial-details' ? 'Financial Details' :
               activeTab === 'bank-account' ? 'Bank Account' : ''}
            </h2>
            
            {renderTabContent()}
          </div>
        </div>
      </div>
      
      {/* Edit Profile Modal */}
      {showEditProfileModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-xl max-w-md w-full p-6">
            <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-4">
              Edit Profile
            </h3>
            <p className="text-gray-600 dark:text-gray-300 mb-6">
              This is a demo of the Edit Profile feature. In a real application, you would be able to update your profile information here.
            </p>
            
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Artist Name
              </label>
              <input
                type="text"
                value={artistData.name}
                className="input w-full"
                readOnly
              />
            </div>
            
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Bio
              </label>
              <textarea
                className="input w-full h-24"
                placeholder="Enter your bio"
                defaultValue="Demo Artist is a musician based in Austin, TX."
              ></textarea>
            </div>
            
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Genre
              </label>
              <input
                type="text"
                className="input w-full"
                placeholder="Enter your genre"
                defaultValue="Rock, Alternative"
              />
            </div>
            
            <div className="flex justify-end space-x-3">
              <button
                type="button"
                onClick={() => setShowEditProfileModal(false)}
                className="btn btn-outline"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={() => {
                  toast.success('Profile updated successfully!')
                  setShowEditProfileModal(false)
                }}
                className="btn btn-primary"
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default Dashboard
