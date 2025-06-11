import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { FiEdit, FiSave, FiX, FiUser, FiMail, FiLock, FiMusic, FiMapPin, FiImage } from 'react-icons/fi'
import { useAuthStore } from '../stores/authStore'
import { supabase } from '../lib/supabase'
import toast from 'react-hot-toast'

const Profile = () => {
  const { user, isMusician } = useAuthStore()
  const navigate = useNavigate()
  
  const [loading, setLoading] = useState(true)
  const [updating, setUpdating] = useState(false)
  const [editMode, setEditMode] = useState(false)
  
  // User profile data
  const [profile, setProfile] = useState({
    name: '',
    email: '',
    bio: '',
    location: '',
    website: '',
    profileImage: '',
    genres: [] as string[],
    stageName: '',
    socialLinks: {
      instagram: '',
      twitter: '',
      spotify: '',
      soundcloud: '',
      youtube: ''
    }
  })
  
  // Form state for editing
  const [formData, setFormData] = useState({...profile})
  
  // Available genres for musicians
  const availableGenres = [
    'Rock', 'Pop', 'Hip Hop', 'R&B', 'Jazz', 'Blues', 
    'Electronic', 'Classical', 'Country', 'Folk', 'Indie', 
    'Metal', 'Punk', 'Reggae', 'Soul', 'World'
  ]
  
  useEffect(() => {
    // Check if user is authenticated
    if (!user) {
      navigate('/login')
      return
    }
    
    const fetchProfile = async () => {
      try {
        setLoading(true)
        
        // In a real app, this would fetch the user's profile from Supabase
        // For now, we'll use mock data
        
        // Mock profile data based on whether the user is a musician or not
        const mockProfile = {
          name: user.user_metadata?.full_name || 'User',
          email: user.email || '',
          bio: isMusician() 
            ? 'Independent musician with a passion for creating authentic music that connects with people.'
            : 'Music enthusiast and supporter of independent artists.',
          location: 'Portland, OR',
          website: isMusician() ? 'https://example.com' : '',
          profileImage: 'https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
          genres: isMusician() ? ['Folk', 'Acoustic'] : [],
          stageName: isMusician() ? 'Sarah J' : '',
          socialLinks: isMusician() ? {
            instagram: 'https://instagram.com',
            twitter: 'https://twitter.com',
            spotify: 'https://spotify.com',
            soundcloud: 'https://soundcloud.com',
            youtube: 'https://youtube.com'
          } : {
            instagram: '',
            twitter: '',
            spotify: '',
            soundcloud: '',
            youtube: ''
          }
        }
        
        setProfile(mockProfile)
        setFormData(mockProfile)
      } catch (error) {
        console.error('Error fetching profile:', error)
        toast.error('Failed to load profile')
      } finally {
        setLoading(false)
      }
    }
    
    fetchProfile()
  }, [user, navigate, isMusician])
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    
    if (name.includes('.')) {
      // Handle nested objects (like socialLinks.instagram)
      const [parent, child] = name.split('.')
      setFormData({
        ...formData,
        [parent]: {
          ...formData[parent as keyof typeof formData] as Record<string, any>,
          [child]: value
        }
      })
    } else {
      setFormData({
        ...formData,
        [name]: value
      })
    }
  }
  
  const handleGenreToggle = (genre: string) => {
    const currentGenres = [...formData.genres]
    
    if (currentGenres.includes(genre)) {
      // Remove genre if already selected
      setFormData({
        ...formData,
        genres: currentGenres.filter(g => g !== genre)
      })
    } else {
      // Add genre if not already selected (max 3)
      if (currentGenres.length < 3) {
        setFormData({
          ...formData,
          genres: [...currentGenres, genre]
        })
      } else {
        toast.error('You can select up to 3 genres')
      }
    }
  }
  
  const handleSaveProfile = async () => {
    try {
      setUpdating(true)
      
      // In a real app, this would update the user's profile in Supabase
      // For now, we'll just simulate a delay and update the local state
      
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      setProfile(formData)
      setEditMode(false)
      toast.success('Profile updated successfully')
    } catch (error) {
      console.error('Error updating profile:', error)
      toast.error('Failed to update profile')
    } finally {
      setUpdating(false)
    }
  }
  
  const handleCancelEdit = () => {
    setFormData({...profile})
    setEditMode(false)
  }
  
  if (loading) {
    return (
      <div className="max-w-4xl mx-auto py-8 px-4">
        <div className="animate-pulse">
          <div className="h-40 bg-gray-200 dark:bg-gray-700 rounded-xl mb-8"></div>
          <div className="flex flex-col md:flex-row gap-6">
            <div className="md:w-1/3">
              <div className="h-60 bg-gray-200 dark:bg-gray-700 rounded-xl"></div>
            </div>
            <div className="md:w-2/3">
              <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded w-3/4 mb-4"></div>
              <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/2 mb-6"></div>
              <div className="h-24 bg-gray-200 dark:bg-gray-700 rounded mb-6"></div>
              <div className="h-10 bg-gray-200 dark:bg-gray-700 rounded w-full"></div>
            </div>
          </div>
        </div>
      </div>
    )
  }
  
  return (
    <div className="max-w-4xl mx-auto py-8 px-4">
      {/* Profile Header */}
      <div className="bg-gradient-to-r from-primary-500 to-secondary-500 rounded-xl p-8 mb-8 text-white relative">
        <div className="absolute top-4 right-4">
          {editMode ? (
            <div className="flex space-x-2">
              <button
                onClick={handleSaveProfile}
                disabled={updating}
                className="bg-white text-primary-600 p-2 rounded-full hover:bg-gray-100 transition-colors"
                aria-label="Save profile"
              >
                <FiSave />
              </button>
              <button
                onClick={handleCancelEdit}
                disabled={updating}
                className="bg-white text-red-600 p-2 rounded-full hover:bg-gray-100 transition-colors"
                aria-label="Cancel editing"
              >
                <FiX />
              </button>
            </div>
          ) : (
            <button
              onClick={() => setEditMode(true)}
              className="bg-white text-primary-600 p-2 rounded-full hover:bg-gray-100 transition-colors"
              aria-label="Edit profile"
            >
              <FiEdit />
            </button>
          )}
        </div>
        
        <h1 className="text-3xl font-bold mb-2">
          {isMusician() ? 'Musician Profile' : 'Fan Profile'}
        </h1>
        <p className="opacity-80">
          {isMusician() 
            ? 'Manage your artist profile, music, and connect with fans'
            : 'Manage your profile and discover new music'}
        </p>
      </div>
      
      <div className="flex flex-col md:flex-row gap-8">
        {/* Left Column - Profile Image and Basic Info */}
        <div className="md:w-1/3">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden mb-6">
            <div className="p-6 text-center">
              <div className="relative w-32 h-32 mx-auto mb-4">
                <img
                  src={profile.profileImage || 'https://via.placeholder.com/150'}
                  alt={profile.name}
                  className="w-full h-full object-cover rounded-full"
                />
                {editMode && (
                  <button
                    className="absolute bottom-0 right-0 bg-primary-600 text-white p-2 rounded-full hover:bg-primary-700 transition-colors"
                    aria-label="Change profile image"
                  >
                    <FiImage size={16} />
                  </button>
                )}
              </div>
              
              {editMode ? (
                <div className="space-y-4">
                  <div>
                    <label htmlFor="name" className="sr-only">Name</label>
                    <div className="relative">
                      <FiUser className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        className="input pl-10 w-full"
                        placeholder="Your name"
                      />
                    </div>
                  </div>
                  
                  {isMusician() && (
                    <div>
                      <label htmlFor="stageName" className="sr-only">Stage Name</label>
                      <div className="relative">
                        <FiMusic className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                        <input
                          type="text"
                          id="stageName"
                          name="stageName"
                          value={formData.stageName}
                          onChange={handleInputChange}
                          className="input pl-10 w-full"
                          placeholder="Stage name (optional)"
                        />
                      </div>
                    </div>
                  )}
                  
                  <div>
                    <label htmlFor="location" className="sr-only">Location</label>
                    <div className="relative">
                      <FiMapPin className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                      <input
                        type="text"
                        id="location"
                        name="location"
                        value={formData.location}
                        onChange={handleInputChange}
                        className="input pl-10 w-full"
                        placeholder="Your location"
                      />
                    </div>
                  </div>
                </div>
              ) : (
                <>
                  <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-1">
                    {profile.name}
                  </h2>
                  
                  {isMusician() && profile.stageName && (
                    <p className="text-gray-600 dark:text-gray-300 mb-2">
                      {profile.stageName}
                    </p>
                  )}
                  
                  <div className="flex items-center justify-center text-sm text-gray-500 dark:text-gray-400 mb-4">
                    <FiMapPin className="mr-1" />
                    <span>{profile.location}</span>
                  </div>
                </>
              )}
              
              {isMusician() && (
                <div className="mt-4">
                  <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Genres
                  </h3>
                  
                  {editMode ? (
                    <div className="flex flex-wrap gap-2 mt-2">
                      {availableGenres.map(genre => (
                        <button
                          key={genre}
                          type="button"
                          onClick={() => handleGenreToggle(genre)}
                          className={`px-3 py-1 text-xs rounded-full ${
                            formData.genres.includes(genre)
                              ? 'bg-primary-100 dark:bg-primary-900 text-primary-600 dark:text-primary-400'
                              : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300'
                          }`}
                        >
                          {genre}
                        </button>
                      ))}
                    </div>
                  ) : (
                    <div className="flex justify-center space-x-2">
                      {profile.genres.map((genre, index) => (
                        <span
                          key={index}
                          className="px-3 py-1 bg-primary-100 dark:bg-primary-900 text-primary-600 dark:text-primary-400 rounded-full text-xs"
                        >
                          {genre}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
          
          {/* Account Information */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
              <h3 className="text-lg font-semibold text-gray-800 dark:text-white">
                Account Information
              </h3>
            </div>
            
            <div className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Email
                </label>
                {editMode ? (
                  <div className="relative">
                    <FiMail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className="input pl-10 w-full"
                      placeholder="Your email"
                    />
                  </div>
                ) : (
                  <div className="flex items-center text-gray-600 dark:text-gray-300">
                    <FiMail className="mr-2" />
                    {profile.email}
                  </div>
                )}
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Password
                </label>
                <div className="flex items-center text-gray-600 dark:text-gray-300">
                  <FiLock className="mr-2" />
                  ••••••••
                  <button 
                    className="ml-auto text-primary-600 dark:text-primary-400 text-sm hover:underline"
                    onClick={() => toast.success('Password change feature activated')}
                  >
                    Change
                  </button>
                </div>
              </div>
              
              <div className="pt-4">
                <button 
                  className="text-red-600 dark:text-red-400 text-sm hover:underline"
                  onClick={() => toast.error('Account deletion is disabled in this demo')}
                >
                  Delete Account
                </button>
              </div>
            </div>
          </div>
        </div>
        
        {/* Right Column - Bio and Social Links */}
        <div className="md:w-2/3">
          {/* Bio */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 mb-6">
            <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">
              About
            </h2>
            
            {editMode ? (
              <div>
                <label htmlFor="bio" className="sr-only">Bio</label>
                <textarea
                  id="bio"
                  name="bio"
                  value={formData.bio}
                  onChange={handleInputChange}
                  rows={6}
                  className="input w-full"
                  placeholder="Tell us about yourself..."
                ></textarea>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
                  {isMusician() 
                    ? 'Share your story, influences, and what makes your music unique.'
                    : 'Share your music tastes and what you look for in new artists.'}
                </p>
              </div>
            ) : (
              <p className="text-gray-700 dark:text-gray-300 whitespace-pre-line">
                {profile.bio}
              </p>
            )}
          </div>
          
          {/* Website */}
          {(isMusician() || profile.website) && (
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 mb-6">
              <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">
                Website
              </h2>
              
              {editMode ? (
                <div>
                  <label htmlFor="website" className="sr-only">Website</label>
                  <input
                    type="url"
                    id="website"
                    name="website"
                    value={formData.website}
                    onChange={handleInputChange}
                    className="input w-full"
                    placeholder="https://yourwebsite.com"
                  />
                </div>
              ) : (
                profile.website ? (
                  <a 
                    href={profile.website} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-primary-600 dark:text-primary-400 hover:underline"
                  >
                    {profile.website}
                  </a>
                ) : (
                  <p className="text-gray-500 dark:text-gray-400">
                    No website added yet.
                  </p>
                )
              )}
            </div>
          )}
          
          {/* Social Links - Only for musicians */}
          {isMusician() && (
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden">
              <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
                <h3 className="text-lg font-semibold text-gray-800 dark:text-white">
                  Social Links
                </h3>
              </div>
              
              <div className="p-6">
                {editMode ? (
                  <div className="space-y-4">
                    <div>
                      <label htmlFor="instagram" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Instagram
                      </label>
                      <input
                        type="url"
                        id="instagram"
                        name="socialLinks.instagram"
                        value={formData.socialLinks.instagram}
                        onChange={handleInputChange}
                        className="input w-full"
                        placeholder="https://instagram.com/yourusername"
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="twitter" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Twitter
                      </label>
                      <input
                        type="url"
                        id="twitter"
                        name="socialLinks.twitter"
                        value={formData.socialLinks.twitter}
                        onChange={handleInputChange}
                        className="input w-full"
                        placeholder="https://twitter.com/yourusername"
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="spotify" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Spotify
                      </label>
                      <input
                        type="url"
                        id="spotify"
                        name="socialLinks.spotify"
                        value={formData.socialLinks.spotify}
                        onChange={handleInputChange}
                        className="input w-full"
                        placeholder="https://open.spotify.com/artist/yourid"
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="soundcloud" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        SoundCloud
                      </label>
                      <input
                        type="url"
                        id="soundcloud"
                        name="socialLinks.soundcloud"
                        value={formData.socialLinks.soundcloud}
                        onChange={handleInputChange}
                        className="input w-full"
                        placeholder="https://soundcloud.com/yourusername"
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="youtube" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        YouTube
                      </label>
                      <input
                        type="url"
                        id="youtube"
                        name="socialLinks.youtube"
                        value={formData.socialLinks.youtube}
                        onChange={handleInputChange}
                        className="input w-full"
                        placeholder="https://youtube.com/c/yourchannel"
                      />
                    </div>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {Object.entries(profile.socialLinks).map(([platform, url]) => (
                      <div key={platform} className="flex items-center">
                        <span className="capitalize text-gray-700 dark:text-gray-300 mr-2">
                          {platform}:
                        </span>
                        {url ? (
                          <a 
                            href={url as string} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="text-primary-600 dark:text-primary-400 hover:underline truncate"
                          >
                            {url}
                          </a>
                        ) : (
                          <span className="text-gray-500 dark:text-gray-400">
                            Not added
                          </span>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}
          
          {/* Notification Preferences */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden mt-6">
            <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
              <h3 className="text-lg font-semibold text-gray-800 dark:text-white">
                Notification Preferences
              </h3>
            </div>
            
            <div className="p-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium text-gray-800 dark:text-white">
                      Email Notifications
                    </h4>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      Receive updates about new music and events
                    </p>
                  </div>
                  <label className="switch">
                    <input type="checkbox" defaultChecked />
                    <span className="slider round"></span>
                  </label>
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium text-gray-800 dark:text-white">
                      {isMusician() ? 'Fan Messages' : 'Artist Updates'}
                    </h4>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      {isMusician() 
                        ? 'Receive messages from your fans'
                        : 'Get updates from artists you follow'}
                    </p>
                  </div>
                  <label className="switch">
                    <input type="checkbox" defaultChecked />
                    <span className="slider round"></span>
                  </label>
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium text-gray-800 dark:text-white">
                      Marketing Emails
                    </h4>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      Receive promotional offers and news
                    </p>
                  </div>
                  <label className="switch">
                    <input type="checkbox" />
                    <span className="slider round"></span>
                  </label>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Save button for mobile (fixed at bottom) */}
      {editMode && (
        <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white dark:bg-gray-800 p-4 border-t border-gray-200 dark:border-gray-700 flex justify-end space-x-2">
          <button
            onClick={handleCancelEdit}
            disabled={updating}
            className="btn btn-outline"
          >
            Cancel
          </button>
          <button
            onClick={handleSaveProfile}
            disabled={updating}
            className="btn btn-primary"
          >
            {updating ? 'Saving...' : 'Save Changes'}
          </button>
        </div>
      )}
      
      {/* CSS for toggle switch */}
      <style jsx>{`
        .switch {
          position: relative;
          display: inline-block;
          width: 48px;
          height: 24px;
        }
        
        .switch input {
          opacity: 0;
          width: 0;
          height: 0;
        }
        
        .slider {
          position: absolute;
          cursor: pointer;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background-color: #ccc;
          transition: .4s;
        }
        
        .slider:before {
          position: absolute;
          content: "";
          height: 18px;
          width: 18px;
          left: 3px;
          bottom: 3px;
          background-color: white;
          transition: .4s;
        }
        
        input:checked + .slider {
          background-color: #6366F1;
        }
        
        input:focus + .slider {
          box-shadow: 0 0 1px #6366F1;
        }
        
        input:checked + .slider:before {
          transform: translateX(24px);
        }
        
        .slider.round {
          border-radius: 24px;
        }
        
        .slider.round:before {
          border-radius: 50%;
        }
      `}</style>
    </div>
  )
}

export default Profile
