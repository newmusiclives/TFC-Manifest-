import { useState, useRef } from 'react'
import { FiCheckCircle, FiImage, FiSliders, FiCode } from 'react-icons/fi'

const VenueSignup = () => {
  const [formCode, setFormCode] = useState<string>('')
  const [showCodeModal, setShowCodeModal] = useState<boolean>(false)
  const [email, setEmail] = useState<string>('')
  const [venueName, setVenueName] = useState<string>('')
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false)
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false)
  
  // Form customization states
  const [logoUrl, setLogoUrl] = useState<string>('')
  const [primaryColor, setPrimaryColor] = useState<string>('#0ea5e9')
  const [showCustomizationModal, setShowCustomizationModal] = useState<boolean>(false)
  
  // File input ref
  const fileInputRef = useRef<HTMLInputElement>(null)
  
  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    // Simulate API call
    setTimeout(() => {
      // Generate a unique form code (in a real app, this would come from the backend)
      const uniqueCode = `venue-${Math.random().toString(36).substring(2, 10)}`
      setFormCode(uniqueCode)
      setShowCodeModal(true)
      setIsSubmitting(false)
      setIsSubmitted(true)
    }, 1500)
  }

  const copyEmbedCode = () => {
    // Include customization parameters in the embed code
    const customizationParams = new URLSearchParams()
    if (logoUrl) customizationParams.append('logo', encodeURIComponent(logoUrl))
    customizationParams.append('color', encodeURIComponent(primaryColor.replace('#', '')))
    
    const embedCode = `<iframe src="https://truefans-connect.vercel.app/embed/submission-form/${formCode}?${customizationParams.toString()}" width="100%" height="600" frameborder="0"></iframe>`
    
    navigator.clipboard.writeText(embedCode)
      .then(() => {
        alert('Embed code copied to clipboard!')
      })
      .catch(err => {
        console.error('Failed to copy: ', err)
      })
  }
  
  const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      // In a real app, this would upload to a storage service and return a URL
      // For demo purposes, we'll create a local object URL
      const objectUrl = URL.createObjectURL(file)
      setLogoUrl(objectUrl)
    }
  }
  
  const triggerFileInput = () => {
    fileInputRef.current?.click()
  }

  return (
    <div className="container mx-auto px-4 py-12 pt-24">
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-bold mb-6">Sign Up Your Venue</h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Get started for FREE and receive your custom submission form to streamline your booking process.
        </p>
      </div>
      
      <div className="max-w-2xl mx-auto bg-white p-8 rounded-xl shadow-md">
        <h2 className="text-2xl font-bold mb-6 text-center">Venue Registration</h2>
        
        {!isSubmitted ? (
          <form onSubmit={handleSignup} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Venue Name
              </label>
              <input
                type="text"
                value={venueName}
                onChange={(e) => setVenueName(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-primary-500 focus:border-primary-500"
                required
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email Address
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-primary-500 focus:border-primary-500"
                required
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Venue Address
              </label>
              <input
                type="text"
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-primary-500 focus:border-primary-500"
                required
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Website URL
              </label>
              <input
                type="url"
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-primary-500 focus:border-primary-500"
                required
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Venue Capacity
              </label>
              <input
                type="number"
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-primary-500 focus:border-primary-500"
                required
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Music Genres (select all that apply)
              </label>
              <div className="grid grid-cols-2 gap-2">
                {['Rock', 'Pop', 'Jazz', 'Blues', 'Country', 'Electronic', 'Hip Hop', 'Other'].map((genre) => (
                  <div key={genre} className="flex items-center">
                    <input
                      type="checkbox"
                      id={genre}
                      className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                    />
                    <label htmlFor={genre} className="ml-2 text-sm text-gray-700">
                      {genre}
                    </label>
                  </div>
                ))}
              </div>
            </div>
            
            <button
              type="submit"
              className="w-full btn btn-primary py-3"
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Processing...' : 'Get Your Free Submission Form'}
            </button>
          </form>
        ) : (
          <div className="text-center py-6">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <FiCheckCircle className="text-green-600" size={28} />
            </div>
            <h3 className="text-xl font-semibold mb-2">Registration Successful!</h3>
            <p className="text-gray-600 mb-4">
              Thank you for registering {venueName}. Your submission form is ready to be customized and embedded on your website.
            </p>
            <div className="space-y-4">
              <button
                onClick={() => setShowCustomizationModal(true)}
                className="w-full btn btn-outline py-3 flex items-center justify-center"
              >
                <FiSliders className="mr-2" /> Customize Form
              </button>
              <button
                onClick={() => setShowCodeModal(true)}
                className="w-full btn btn-primary py-3 flex items-center justify-center"
              >
                <FiCode className="mr-2" /> Get Embed Code
              </button>
            </div>
          </div>
        )}
      </div>
      
      {/* Embed Code Modal */}
      {showCodeModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl p-6 max-w-lg w-full">
            <h3 className="text-xl font-bold mb-4">Your Embed Code</h3>
            <p className="text-gray-600 mb-4">
              Copy and paste this code into your website where you want the submission form to appear:
            </p>
            <div className="bg-gray-100 p-4 rounded-lg mb-4 overflow-x-auto">
              <code className="text-sm">
                {`<iframe src="https://truefans-connect.vercel.app/embed/submission-form/${formCode}${logoUrl ? `?logo=${encodeURIComponent(logoUrl)}` : ''}${primaryColor !== '#0ea5e9' ? `${logoUrl ? '&' : '?'}color=${encodeURIComponent(primaryColor.replace('#', ''))}` : ''}" width="100%" height="600" frameborder="0"></iframe>`}
              </code>
            </div>
            <div className="flex justify-between">
              <button
                onClick={() => setShowCodeModal(false)}
                className="btn btn-outline"
              >
                Close
              </button>
              <button
                onClick={copyEmbedCode}
                className="btn btn-primary flex items-center"
              >
                <FiCode className="mr-2" /> Copy Code
              </button>
            </div>
          </div>
        </div>
      )}
      
      {/* Form Customization Modal */}
      {showCustomizationModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl p-6 max-w-lg w-full">
            <h3 className="text-xl font-bold mb-4">Customize Your Form</h3>
            <p className="text-gray-600 mb-6">
              Personalize your submission form to match your venue's branding.
            </p>
            
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Venue Logo
                </label>
                <div className="flex items-center space-x-4">
                  <div 
                    className="w-16 h-16 bg-gray-100 rounded-lg flex items-center justify-center overflow-hidden"
                    style={{ border: '1px dashed #ccc' }}
                  >
                    {logoUrl ? (
                      <img src={logoUrl} alt="Venue logo" className="max-w-full max-h-full object-contain" />
                    ) : (
                      <FiImage className="text-gray-400" size={24} />
                    )}
                  </div>
                  <div>
                    <input
                      type="file"
                      ref={fileInputRef}
                      onChange={handleLogoUpload}
                      accept="image/*"
                      className="hidden"
                    />
                    <button
                      type="button"
                      onClick={triggerFileInput}
                      className="btn btn-outline text-sm py-2"
                    >
                      {logoUrl ? 'Change Logo' : 'Upload Logo'}
                    </button>
                    {logoUrl && (
                      <button
                        type="button"
                        onClick={() => setLogoUrl('')}
                        className="btn btn-text text-sm py-2 ml-2"
                      >
                        Remove
                      </button>
                    )}
                  </div>
                </div>
                <p className="text-xs text-gray-500 mt-1">
                  Recommended: Square logo, at least 200x200 pixels
                </p>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Primary Color
                </label>
                <div className="flex items-center space-x-4">
                  <div 
                    className="w-10 h-10 rounded-lg cursor-pointer"
                    style={{ backgroundColor: primaryColor }}
                  ></div>
                  <input
                    type="color"
                    value={primaryColor}
                    onChange={(e) => setPrimaryColor(e.target.value)}
                    className="h-10"
                  />
                  <input
                    type="text"
                    value={primaryColor}
                    onChange={(e) => setPrimaryColor(e.target.value)}
                    className="border border-gray-300 rounded-lg p-2 text-sm w-24"
                  />
                </div>
                <p className="text-xs text-gray-500 mt-1">
                  This color will be used for buttons, accents, and highlights
                </p>
              </div>
              
              <div className="bg-gray-50 p-4 rounded-lg">
                <h4 className="font-medium text-gray-700 mb-2">Form Preview</h4>
                <div className="bg-white border border-gray-200 rounded-lg p-4">
                  <div className="flex items-center justify-center mb-4">
                    {logoUrl && (
                      <img src={logoUrl} alt="Venue logo" className="h-12 object-contain" />
                    )}
                  </div>
                  <div className="h-8 bg-gray-200 rounded-lg w-3/4 mx-auto mb-4"></div>
                  <div className="h-4 bg-gray-200 rounded w-1/2 mx-auto mb-6"></div>
                  <div className="space-y-4">
                    <div className="h-10 bg-gray-200 rounded-lg w-full"></div>
                    <div className="h-10 bg-gray-200 rounded-lg w-full"></div>
                    <div 
                      className="h-10 rounded-lg w-full flex items-center justify-center text-white font-medium"
                      style={{ backgroundColor: primaryColor }}
                    >
                      Submit Application
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="flex justify-between mt-6">
              <button
                onClick={() => setShowCustomizationModal(false)}
                className="btn btn-outline"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  setShowCustomizationModal(false)
                  setShowCodeModal(true)
                }}
                className="btn btn-primary"
              >
                Save & Get Code
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default VenueSignup
