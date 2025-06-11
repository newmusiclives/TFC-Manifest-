import { useState, useEffect } from 'react'
import { FiCalendar, FiMapPin, FiClock, FiDollarSign, FiPlus, FiEdit2, FiTrash2, FiCheck, FiX } from 'react-icons/fi'
import { useAuthStore } from '../stores/authStore'
import { useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'
import { supabase } from '../lib/supabase'

interface Show {
  id: string;
  venue: string;
  location: string;
  date: string;
  time: string;
  description: string;
  ticketPrice: number | null;
  ticketUrl: string;
  isPublished: boolean;
}

const ManageShows = () => {
  const { user, isMusician } = useAuthStore()
  const navigate = useNavigate()
  
  const [shows, setShows] = useState<Show[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [showAddModal, setShowAddModal] = useState(false)
  const [showEditModal, setShowEditModal] = useState(false)
  const [currentShow, setCurrentShow] = useState<Show | null>(null)
  
  const [formData, setFormData] = useState<Omit<Show, 'id'>>({
    venue: '',
    location: '',
    date: '',
    time: '',
    description: '',
    ticketPrice: null,
    ticketUrl: '',
    isPublished: true
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
    
    // Fetch shows
    fetchShows()
  }, [user, isMusician, navigate])
  
  const fetchShows = async () => {
    setIsLoading(true)
    
    try {
      // In a real app, we would fetch from Supabase
      // For now, using mock data
      const mockShows: Show[] = [
        {
          id: '1',
          venue: 'The Acoustic Room',
          location: 'Portland, OR',
          date: '2023-11-15',
          time: '20:00',
          description: 'Intimate acoustic set featuring new songs',
          ticketPrice: 15,
          ticketUrl: 'https://example.com/tickets/1',
          isPublished: true
        },
        {
          id: '2',
          venue: 'Mountain View Coffee',
          location: 'Seattle, WA',
          date: '2023-11-22',
          time: '19:30',
          description: 'Cozy coffee shop performance',
          ticketPrice: 10,
          ticketUrl: 'https://example.com/tickets/2',
          isPublished: true
        },
        {
          id: '3',
          venue: 'Folk Festival',
          location: 'Eugene, OR',
          date: '2023-12-05',
          time: '18:00',
          description: 'Annual folk music festival featuring multiple artists',
          ticketPrice: 25,
          ticketUrl: 'https://example.com/tickets/3',
          isPublished: true
        }
      ]
      
      setShows(mockShows)
    } catch (error) {
      console.error('Error fetching shows:', error)
      toast.error('Failed to load shows')
    } finally {
      setIsLoading(false)
    }
  }
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target
    
    if (type === 'number') {
      setFormData({
        ...formData,
        [name]: value === '' ? null : parseFloat(value)
      })
    } else {
      setFormData({
        ...formData,
        [name]: value
      })
    }
  }
  
  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target
    setFormData({
      ...formData,
      [name]: checked
    })
  }
  
  const handleAddShow = () => {
    setFormData({
      venue: '',
      location: '',
      date: '',
      time: '',
      description: '',
      ticketPrice: null,
      ticketUrl: '',
      isPublished: true
    })
    setShowAddModal(true)
  }
  
  const handleEditShow = (show: Show) => {
    setCurrentShow(show)
    setFormData({
      venue: show.venue,
      location: show.location,
      date: show.date,
      time: show.time,
      description: show.description,
      ticketPrice: show.ticketPrice,
      ticketUrl: show.ticketUrl,
      isPublished: show.isPublished
    })
    setShowEditModal(true)
  }
  
  const handleDeleteShow = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this show?')) {
      try {
        // In a real app, we would delete from Supabase
        // For now, just updating the UI
        setShows(shows.filter(show => show.id !== id))
        toast.success('Show deleted successfully')
      } catch (error) {
        console.error('Error deleting show:', error)
        toast.error('Failed to delete show')
      }
    }
  }
  
  const handleSubmitAdd = async (e: React.FormEvent) => {
    e.preventDefault()
    
    try {
      // In a real app, we would add to Supabase
      // For now, just updating the UI
      const newShow: Show = {
        id: Date.now().toString(), // Mock ID
        ...formData
      }
      
      setShows([...shows, newShow])
      setShowAddModal(false)
      toast.success('Show added successfully')
    } catch (error) {
      console.error('Error adding show:', error)
      toast.error('Failed to add show')
    }
  }
  
  const handleSubmitEdit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!currentShow) return
    
    try {
      // In a real app, we would update in Supabase
      // For now, just updating the UI
      const updatedShows = shows.map(show => 
        show.id === currentShow.id ? { ...show, ...formData } : show
      )
      
      setShows(updatedShows)
      setShowEditModal(false)
      toast.success('Show updated successfully')
    } catch (error) {
      console.error('Error updating show:', error)
      toast.error('Failed to update show')
    }
  }
  
  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' }
    return new Date(dateString).toLocaleDateString(undefined, options)
  }
  
  const formatTime = (timeString: string) => {
    const [hours, minutes] = timeString.split(':')
    const hour = parseInt(hours)
    const ampm = hour >= 12 ? 'PM' : 'AM'
    const hour12 = hour % 12 || 12
    return `${hour12}:${minutes} ${ampm}`
  }
  
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Manage Shows</h1>
        <button
          onClick={handleAddShow}
          className="btn btn-primary flex items-center"
        >
          <FiPlus className="mr-2" />
          Add New Show
        </button>
      </div>
      
      {isLoading ? (
        <div className="flex justify-center py-12">
          <div className="w-12 h-12 border-4 border-primary-200 border-t-primary-600 rounded-full animate-spin"></div>
        </div>
      ) : shows.length === 0 ? (
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-8 text-center">
          <FiCalendar className="mx-auto text-gray-400 dark:text-gray-500" size={48} />
          <h3 className="mt-4 text-lg font-medium text-gray-900 dark:text-white">No Shows Yet</h3>
          <p className="mt-2 text-gray-600 dark:text-gray-400">
            Add your upcoming performances to let your fans know where to see you.
          </p>
          <button
            onClick={handleAddShow}
            className="mt-4 btn btn-primary"
          >
            Add Your First Show
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {shows.map(show => (
            <div key={show.id} className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden">
              <div className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-lg font-bold text-gray-900 dark:text-white">{show.venue}</h3>
                  <div className="flex space-x-2">
                    <button
                      onClick={() => handleEditShow(show)}
                      className="text-gray-500 hover:text-primary-600 dark:text-gray-400 dark:hover:text-primary-400"
                    >
                      <FiEdit2 size={18} />
                    </button>
                    <button
                      onClick={() => handleDeleteShow(show.id)}
                      className="text-gray-500 hover:text-red-600 dark:text-gray-400 dark:hover:text-red-400"
                    >
                      <FiTrash2 size={18} />
                    </button>
                  </div>
                </div>
                
                <div className="flex items-center text-gray-600 dark:text-gray-300 mb-2">
                  <FiMapPin className="mr-2" />
                  <span>{show.location}</span>
                </div>
                
                <div className="flex items-center text-gray-600 dark:text-gray-300 mb-2">
                  <FiCalendar className="mr-2" />
                  <span>{formatDate(show.date)}</span>
                </div>
                
                <div className="flex items-center text-gray-600 dark:text-gray-300 mb-4">
                  <FiClock className="mr-2" />
                  <span>{formatTime(show.time)}</span>
                </div>
                
                {show.description && (
                  <p className="text-gray-700 dark:text-gray-300 mb-4">
                    {show.description}
                  </p>
                )}
                
                {show.ticketPrice !== null && (
                  <div className="flex items-center text-gray-700 dark:text-gray-300 mb-4">
                    <FiDollarSign className="mr-2" />
                    <span>Tickets: ${show.ticketPrice.toFixed(2)}</span>
                  </div>
                )}
                
                <div className="flex justify-between items-center">
                  {show.ticketUrl && (
                    <a
                      href={show.ticketUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn btn-outline"
                    >
                      Get Tickets
                    </a>
                  )}
                  
                  <div className="flex items-center">
                    <span className="text-sm text-gray-600 dark:text-gray-400 mr-2">
                      {show.isPublished ? 'Published' : 'Draft'}
                    </span>
                    {show.isPublished ? (
                      <FiCheck className="text-green-500" />
                    ) : (
                      <FiX className="text-red-500" />
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
      
      {/* Add Show Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl max-w-md w-full p-6">
            <h2 className="text-xl font-bold mb-4">Add New Show</h2>
            
            <form onSubmit={handleSubmitAdd}>
              <div className="mb-4">
                <label htmlFor="venue" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Venue Name*
                </label>
                <input
                  type="text"
                  id="venue"
                  name="venue"
                  value={formData.venue}
                  onChange={handleInputChange}
                  required
                  className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md"
                />
              </div>
              
              <div className="mb-4">
                <label htmlFor="location" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Location*
                </label>
                <input
                  type="text"
                  id="location"
                  name="location"
                  value={formData.location}
                  onChange={handleInputChange}
                  required
                  className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md"
                  placeholder="City, State"
                />
              </div>
              
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                  <label htmlFor="date" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Date*
                  </label>
                  <input
                    type="date"
                    id="date"
                    name="date"
                    value={formData.date}
                    onChange={handleInputChange}
                    required
                    className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md"
                  />
                </div>
                
                <div>
                  <label htmlFor="time" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Time*
                  </label>
                  <input
                    type="time"
                    id="time"
                    name="time"
                    value={formData.time}
                    onChange={handleInputChange}
                    required
                    className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md"
                  />
                </div>
              </div>
              
              <div className="mb-4">
                <label htmlFor="description" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Description
                </label>
                <textarea
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  rows={3}
                  className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md"
                ></textarea>
              </div>
              
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                  <label htmlFor="ticketPrice" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Ticket Price ($)
                  </label>
                  <input
                    type="number"
                    id="ticketPrice"
                    name="ticketPrice"
                    value={formData.ticketPrice === null ? '' : formData.ticketPrice}
                    onChange={handleInputChange}
                    min="0"
                    step="0.01"
                    className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md"
                  />
                </div>
                
                <div>
                  <label htmlFor="ticketUrl" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Ticket URL
                  </label>
                  <input
                    type="url"
                    id="ticketUrl"
                    name="ticketUrl"
                    value={formData.ticketUrl}
                    onChange={handleInputChange}
                    className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md"
                  />
                </div>
              </div>
              
              <div className="mb-6">
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    name="isPublished"
                    checked={formData.isPublished}
                    onChange={handleCheckboxChange}
                    className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                  />
                  <span className="ml-2 text-sm text-gray-700 dark:text-gray-300">
                    Publish immediately
                  </span>
                </label>
              </div>
              
              <div className="flex justify-end space-x-3">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="btn btn-outline"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="btn btn-primary"
                >
                  Add Show
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
      
      {/* Edit Show Modal */}
      {showEditModal && currentShow && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl max-w-md w-full p-6">
            <h2 className="text-xl font-bold mb-4">Edit Show</h2>
            
            <form onSubmit={handleSubmitEdit}>
              <div className="mb-4">
                <label htmlFor="venue" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Venue Name*
                </label>
                <input
                  type="text"
                  id="venue"
                  name="venue"
                  value={formData.venue}
                  onChange={handleInputChange}
                  required
                  className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md"
                />
              </div>
              
              <div className="mb-4">
                <label htmlFor="location" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Location*
                </label>
                <input
                  type="text"
                  id="location"
                  name="location"
                  value={formData.location}
                  onChange={handleInputChange}
                  required
                  className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md"
                  placeholder="City, State"
                />
              </div>
              
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                  <label htmlFor="date" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Date*
                  </label>
                  <input
                    type="date"
                    id="date"
                    name="date"
                    value={formData.date}
                    onChange={handleInputChange}
                    required
                    className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md"
                  />
                </div>
                
                <div>
                  <label htmlFor="time" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Time*
                  </label>
                  <input
                    type="time"
                    id="time"
                    name="time"
                    value={formData.time}
                    onChange={handleInputChange}
                    required
                    className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md"
                  />
                </div>
              </div>
              
              <div className="mb-4">
                <label htmlFor="description" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Description
                </label>
                <textarea
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  rows={3}
                  className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md"
                ></textarea>
              </div>
              
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                  <label htmlFor="ticketPrice" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Ticket Price ($)
                  </label>
                  <input
                    type="number"
                    id="ticketPrice"
                    name="ticketPrice"
                    value={formData.ticketPrice === null ? '' : formData.ticketPrice}
                    onChange={handleInputChange}
                    min="0"
                    step="0.01"
                    className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md"
                  />
                </div>
                
                <div>
                  <label htmlFor="ticketUrl" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Ticket URL
                  </label>
                  <input
                    type="url"
                    id="ticketUrl"
                    name="ticketUrl"
                    value={formData.ticketUrl}
                    onChange={handleInputChange}
                    className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md"
                  />
                </div>
              </div>
              
              <div className="mb-6">
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    name="isPublished"
                    checked={formData.isPublished}
                    onChange={handleCheckboxChange}
                    className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                  />
                  <span className="ml-2 text-sm text-gray-700 dark:text-gray-300">
                    Published
                  </span>
                </label>
              </div>
              
              <div className="flex justify-end space-x-3">
                <button
                  type="button"
                  onClick={() => setShowEditModal(false)}
                  className="btn btn-outline"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="btn btn-primary"
                >
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}

export default ManageShows
