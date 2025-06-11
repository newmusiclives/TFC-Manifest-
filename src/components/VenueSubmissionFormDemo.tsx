import { useState } from 'react'
import { FiUpload, FiMusic, FiCalendar, FiUser, FiMail, FiLink, FiMessageSquare, FiCheckSquare } from 'react-icons/fi'

const VenueSubmissionFormDemo: React.FC = () => {
  // Customization states
  const [primaryColor, setPrimaryColor] = useState('#0ea5e9')
  const [logoUrl, setLogoUrl] = useState('')
  const [venueName, setVenueName] = useState('Your Venue Name')
  const [showGenre, setShowGenre] = useState(true)
  const [showSocialLinks, setShowSocialLinks] = useState(true)
  const [showAvailability, setShowAvailability] = useState(true)
  const [showDescription, setShowDescription] = useState(true)
  
  // Form preview states (not functional, just for demo)
  const [previewName, setPreviewName] = useState('')
  const [previewEmail, setPreviewEmail] = useState('')
  
  return (
    <div className="space-y-6">
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6">
        <h3 className="text-xl font-semibold mb-4">Customize Your Submission Form</h3>
        <p className="text-gray-600 dark:text-gray-300 mb-6">
          Make the form match your venue's branding and collect exactly the information you need.
        </p>
        
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Venue Name
            </label>
            <input
              type="text"
              value={venueName}
              onChange={(e) => setVenueName(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:text-white"
              placeholder="Enter your venue name"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Primary Color
            </label>
            <div className="flex">
              <input
                type="color"
                value={primaryColor}
                onChange={(e) => setPrimaryColor(e.target.value)}
                className="h-10 w-10 border border-gray-300 rounded-l-md"
              />
              <input
                type="text"
                value={primaryColor}
                onChange={(e) => setPrimaryColor(e.target.value)}
                className="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-r-md shadow-sm focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:text-white"
              />
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Logo URL (optional)
            </label>
            <div className="flex">
              <input
                type="text"
                value={logoUrl}
                onChange={(e) => setLogoUrl(e.target.value)}
                className="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-l-md shadow-sm focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:text-white"
                placeholder="https://your-logo-url.com/logo.png"
              />
              <button 
                className="px-3 py-2 bg-gray-100 dark:bg-gray-600 border border-gray-300 dark:border-gray-500 rounded-r-md"
                title="Upload Logo"
              >
                <FiUpload />
              </button>
            </div>
            <p className="text-xs text-gray-500 mt-1">
              Enter a URL to your logo image or upload one
            </p>
          </div>
          
          <div className="border-t border-gray-200 dark:border-gray-700 pt-4">
            <h4 className="font-medium mb-2">Form Fields</h4>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
              Select which information you want to collect from artists
            </p>
            
            <div className="space-y-2">
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="show-genre"
                  checked={showGenre}
                  onChange={(e) => setShowGenre(e.target.checked)}
                  className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                />
                <label htmlFor="show-genre" className="ml-2 block text-sm text-gray-700 dark:text-gray-300">
                  Music Genre
                </label>
              </div>
              
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="show-social"
                  checked={showSocialLinks}
                  onChange={(e) => setShowSocialLinks(e.target.checked)}
                  className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                />
                <label htmlFor="show-social" className="ml-2 block text-sm text-gray-700 dark:text-gray-300">
                  Social Media Links
                </label>
              </div>
              
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="show-availability"
                  checked={showAvailability}
                  onChange={(e) => setShowAvailability(e.target.checked)}
                  className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                />
                <label htmlFor="show-availability" className="ml-2 block text-sm text-gray-700 dark:text-gray-300">
                  Availability Dates
                </label>
              </div>
              
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="show-description"
                  checked={showDescription}
                  onChange={(e) => setShowDescription(e.target.checked)}
                  className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                />
                <label htmlFor="show-description" className="ml-2 block text-sm text-gray-700 dark:text-gray-300">
                  Performance Description
                </label>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Form Preview */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden">
        <div className="p-4 bg-gray-50 dark:bg-gray-700 border-b border-gray-200 dark:border-gray-600">
          <h3 className="text-lg font-medium">Form Preview</h3>
        </div>
        
        <div className="p-6">
          {/* Form Header */}
          <div className="flex items-center mb-6">
            {logoUrl && (
              <img 
                src={logoUrl} 
                alt="Venue Logo" 
                className="h-12 w-12 object-contain mr-3"
                onError={(e) => {
                  // Handle image load error
                  const target = e.target as HTMLImageElement;
                  target.style.display = 'none';
                }}
              />
            )}
            <div>
              <h3 className="text-xl font-bold" style={{ color: primaryColor }}>
                {venueName}
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Live Music Submission Form
              </p>
            </div>
          </div>
          
          {/* Basic Fields (always shown) */}
          <div className="space-y-4 mb-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                <FiUser className="inline mr-1" /> Artist/Band Name *
              </label>
              <input
                type="text"
                value={previewName}
                onChange={(e) => setPreviewName(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:text-white"
                placeholder="Enter your name or band name"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                <FiMail className="inline mr-1" /> Email Address *
              </label>
              <input
                type="email"
                value={previewEmail}
                onChange={(e) => setPreviewEmail(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:text-white"
                placeholder="your@email.com"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                <FiMusic className="inline mr-1" /> Music Sample *
              </label>
              <input
                type="text"
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:text-white"
                placeholder="SoundCloud, Spotify, or YouTube link"
              />
            </div>
          </div>
          
          {/* Optional Fields */}
          {showGenre && (
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                <FiMusic className="inline mr-1" /> Music Genre
              </label>
              <select className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:text-white">
                <option value="">Select a genre</option>
                <option value="rock">Rock</option>
                <option value="jazz">Jazz</option>
                <option value="folk">Folk</option>
                <option value="pop">Pop</option>
                <option value="electronic">Electronic</option>
                <option value="hiphop">Hip Hop</option>
                <option value="country">Country</option>
                <option value="other">Other</option>
              </select>
            </div>
          )}
          
          {showSocialLinks && (
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                <FiLink className="inline mr-1" /> Social Media Links
              </label>
              <input
                type="text"
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:text-white mb-2"
                placeholder="Instagram URL"
              />
              <input
                type="text"
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:text-white"
                placeholder="Facebook or other social media URL"
              />
            </div>
          )}
          
          {showAvailability && (
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                <FiCalendar className="inline mr-1" /> Preferred Performance Dates
              </label>
              <div className="grid grid-cols-2 gap-2">
                <input
                  type="date"
                  className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:text-white"
                />
                <input
                  type="date"
                  className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:text-white"
                />
              </div>
            </div>
          )}
          
          {showDescription && (
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                <FiMessageSquare className="inline mr-1" /> Performance Description
              </label>
              <textarea
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:text-white"
                placeholder="Tell us about your performance style, previous venues, and what makes your show special..."
              ></textarea>
            </div>
          )}
          
          {/* Submit Button */}
          <button
            type="button"
            style={{ backgroundColor: primaryColor }}
            className="w-full mt-4 py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-offset-2"
          >
            Submit Application
          </button>
          
          <p className="text-xs text-gray-500 mt-2 text-center">
            By submitting, you agree to our terms and conditions
          </p>
        </div>
      </div>
      
      <div className="bg-blue-50 dark:bg-blue-900/30 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
        <h3 className="text-md font-medium text-blue-800 dark:text-blue-300 mb-2">Form Embedding</h3>
        <p className="text-sm text-blue-700 dark:text-blue-400 mb-2">
          Once you sign up, you'll receive a custom embed code to add this form to your website.
        </p>
        <pre className="bg-white dark:bg-gray-800 p-3 rounded text-xs overflow-x-auto border border-blue-100 dark:border-blue-800">
          {`<iframe src="https://truefans-connect.com/embed/venue/${venueName.toLowerCase().replace(/\s+/g, '-')}" 
  width="100%" 
  height="600" 
  frameborder="0">
</iframe>`}
        </pre>
      </div>
    </div>
  )
}

export default VenueSubmissionFormDemo
