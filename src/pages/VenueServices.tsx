import { useState } from 'react'
import { FiCheckCircle, FiDollarSign, FiUsers, FiLink, FiMusic, FiSettings, FiCopy, FiPercent, FiTrendingUp, FiCalendar, FiDatabase, FiMail, FiAward } from 'react-icons/fi'
import EmbeddedSubmissionForm from './EmbeddedSubmissionForm'

const VenueServices = () => {
  const [showFormPreview, setShowFormPreview] = useState<boolean>(false)
  const [logoUrl, setLogoUrl] = useState<string>('')
  const [primaryColor, setPrimaryColor] = useState<string>('#0ea5e9')
  const [showCustomizationPanel, setShowCustomizationPanel] = useState<boolean>(false)
  const [copied, setCopied] = useState<boolean>(false)
  
  // Demo venue ID
  const demoVenueId = 'demo-venue-123'
  
  // Handle logo URL input
  const handleLogoUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLogoUrl(e.target.value)
  }
  
  // Handle color change
  const handleColorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPrimaryColor(e.target.value)
  }

  // Generate embed code based on customization options
  const generateEmbedCode = () => {
    return `<iframe src="${window.location.origin}/embed/submission-form/${demoVenueId}?${logoUrl ? `logo=${encodeURIComponent(logoUrl)}` : ''}${primaryColor !== '#0ea5e9' ? `${logoUrl ? '&' : ''}color=${encodeURIComponent(primaryColor.replace('#', ''))}` : ''}" width="100%" height="600" frameborder="0"></iframe>`
  }

  // Copy embed code to clipboard
  const copyEmbedCode = () => {
    navigator.clipboard.writeText(generateEmbedCode())
      .then(() => {
        setCopied(true)
        setTimeout(() => setCopied(false), 2000)
      })
      .catch(err => {
        console.error('Could not copy text: ', err)
      })
  }

  return (
    <div className="container mx-auto px-4 py-12 pt-24">
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-bold mb-6">Venue Services</h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Streamline your booking process and earn additional revenue with TrueFans CONNECT™ venue services.
        </p>
      </div>
      
      <section className="mb-16">
        <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-100">
          <div className="md:flex">
            <div className="md:w-1/2 p-8">
              <h2 className="text-2xl font-bold mb-4">Embeddable Submission Form</h2>
              <p className="text-gray-600 mb-6">
                Simplify your booking process with our customizable submission form that you can embed directly on your website.
              </p>
              
              <div className="space-y-4 mb-6">
                <div className="flex items-start">
                  <div className="flex-shrink-0 h-5 w-5 bg-primary-100 rounded-full flex items-center justify-center mt-1">
                    <FiCheckCircle className="h-3 w-3 text-primary-600" />
                  </div>
                  <div className="ml-3">
                    <p className="text-gray-700">Customizable to match your branding</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="flex-shrink-0 h-5 w-5 bg-primary-100 rounded-full flex items-center justify-center mt-1">
                    <FiCheckCircle className="h-3 w-3 text-primary-600" />
                  </div>
                  <div className="ml-3">
                    <p className="text-gray-700">Collect all necessary artist information</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="flex-shrink-0 h-5 w-5 bg-primary-100 rounded-full flex items-center justify-center mt-1">
                    <FiCheckCircle className="h-3 w-3 text-primary-600" />
                  </div>
                  <div className="ml-3">
                    <p className="text-gray-700">Easy to embed on any website</p>
                  </div>
                </div>
              </div>
              
              <div className="space-y-4">
                <button
                  onClick={() => {
                    setShowFormPreview(true)
                    setShowCustomizationPanel(true)
                  }}
                  className="btn btn-primary w-full"
                >
                  Try Demo Form
                </button>
                <a href="/venue-signup" className="btn btn-outline w-full block text-center">
                  Get Your Form
                </a>
              </div>
            </div>
            
            <div className="md:w-1/2 bg-gray-50 p-8">
              <div className="bg-white border border-gray-200 rounded-lg p-4 h-full flex items-center justify-center shadow-sm">
                {!showFormPreview ? (
                  <div className="text-center">
                    <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <FiMusic className="text-primary-600" size={28} />
                    </div>
                    <h3 className="text-xl font-semibold mb-2">Live Music Submission Form</h3>
                    <p className="text-gray-600 mb-4">
                      Click "Try Demo Form" to see a preview of the customizable submission form.
                    </p>
                  </div>
                ) : (
                  <div className="w-full max-h-[500px] overflow-y-auto">
                    <EmbeddedSubmissionForm 
                      venueId={demoVenueId} 
                      customLogo={logoUrl}
                      customColor={primaryColor}
                    />
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {showFormPreview && showCustomizationPanel && (
        <section className="mb-16">
          <div className="bg-white rounded-xl shadow-lg p-8 border border-gray-100">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold">Customize Your Form</h2>
              <button 
                onClick={() => setShowCustomizationPanel(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <FiSettings size={20} />
              </button>
            </div>
            
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-lg font-semibold mb-4">Form Appearance</h3>
                
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Logo URL
                    </label>
                    <input
                      type="text"
                      value={logoUrl}
                      onChange={handleLogoUrlChange}
                      placeholder="https://example.com/your-logo.png"
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-primary-500 focus:border-primary-500"
                    />
                    <p className="text-xs text-gray-500 mt-1">
                      Enter the URL of your venue's logo
                    </p>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Primary Color
                    </label>
                    <div className="flex items-center space-x-4">
                      <input
                        type="color"
                        value={primaryColor}
                        onChange={handleColorChange}
                        className="h-10 w-10 border-0 p-0"
                      />
                      <input
                        type="text"
                        value={primaryColor}
                        onChange={handleColorChange}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-primary-500 focus:border-primary-500"
                      />
                    </div>
                    <p className="text-xs text-gray-500 mt-1">
                      Choose a color that matches your brand
                    </p>
                  </div>
                </div>
                
                <div className="mt-6">
                  <h3 className="text-lg font-semibold mb-4">Embed Code</h3>
                  <div className="bg-gray-100 p-4 rounded-lg mb-4 overflow-x-auto relative">
                    <code className="text-sm">
                      {generateEmbedCode()}
                    </code>
                  </div>
                  <button 
                    className="btn btn-primary btn-sm flex items-center"
                    onClick={copyEmbedCode}
                  >
                    {copied ? <FiCheckCircle className="mr-2" /> : <FiCopy className="mr-2" />}
                    {copied ? 'Copied!' : 'Copy Embed Code'}
                  </button>
                </div>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold mb-4">Live Preview</h3>
                <div className="border border-gray-200 rounded-lg p-4 h-[500px] overflow-y-auto shadow-sm">
                  <EmbeddedSubmissionForm 
                    venueId={demoVenueId} 
                    customLogo={logoUrl}
                    customColor={primaryColor}
                  />
                </div>
              </div>
            </div>
          </div>
        </section>
      )}
      
      <section className="mb-16">
        <div className="bg-white rounded-xl shadow-lg p-8 border border-gray-100">
          <h2 className="text-2xl font-bold mb-6">Venue Affiliate Program</h2>
          
          <div className="bg-primary-50 p-6 rounded-xl mb-8 border border-primary-100">
            <h3 className="text-xl font-semibold mb-4 flex items-center">
              <FiDollarSign className="text-primary-600 mr-2" size={24} />
              How It Works
            </h3>
            <p className="text-gray-700 mb-6 text-lg">
              When musicians submit to play at your venue, we invite them to join TrueFans CONNECT™. 
              This creates a new revenue stream for you from something that currently generates no income - 
              your live music submission process.
            </p>
            
            <div className="grid md:grid-cols-3 gap-6">
              <div className="bg-white p-5 rounded-lg shadow-md border border-gray-100 transform transition-transform hover:scale-105">
                <div className="w-14 h-14 bg-primary-100 rounded-full flex items-center justify-center mb-4">
                  <FiMusic className="text-primary-600" size={24} />
                </div>
                <h4 className="font-semibold mb-2 text-lg">1. Artist Submissions</h4>
                <p className="text-gray-600">
                  Musicians submit to play at your venue through your customized form.
                </p>
              </div>
              
              <div className="bg-white p-5 rounded-lg shadow-md border border-gray-100 transform transition-transform hover:scale-105">
                <div className="w-14 h-14 bg-primary-100 rounded-full flex items-center justify-center mb-4">
                  <FiUsers className="text-primary-600" size={24} />
                </div>
                <h4 className="font-semibold mb-2 text-lg">2. Artist Sign-ups</h4>
                <p className="text-gray-600">
                  We invite these artists to join TrueFans CONNECT™ with your venue as the referrer.
                </p>
              </div>
              
              <div className="bg-white p-5 rounded-lg shadow-md border border-gray-100 transform transition-transform hover:scale-105">
                <div className="w-14 h-14 bg-primary-100 rounded-full flex items-center justify-center mb-4">
                  <FiDollarSign className="text-primary-600" size={24} />
                </div>
                <h4 className="font-semibold mb-2 text-lg">3. You Earn <span className="text-primary-600">2.5%</span></h4>
                <p className="text-gray-600">
                  Earn <span className="font-bold text-primary-600">2.5%</span> commission on all donations these artists receive through our platform.
                </p>
              </div>
            </div>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-xl font-semibold mb-4 flex items-center">
                <FiAward className="text-primary-600 mr-2" size={22} />
                Two-Tier Commission Structure
              </h3>
              <p className="text-gray-700 mb-6">
                Our unique two-tier affiliate program allows you to earn from both direct artist referrals and their referrals too.
              </p>
              
              <div className="space-y-6">
                <div className="bg-gray-50 p-5 rounded-lg border-l-4 border-primary-500 shadow-md">
                  <div className="flex items-center mb-3">
                    <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center mr-3">
                      <FiPercent className="text-primary-600" size={20} />
                    </div>
                    <h4 className="font-semibold text-lg">Tier 1: Direct Artist Referrals</h4>
                  </div>
                  <p className="text-gray-600 mb-3 text-lg">
                    Earn <span className="font-bold text-primary-600 text-xl">2.5%</span> commission on all donations received by artists who submit to your venue and join TrueFans CONNECT™.
                  </p>
                  <div className="flex items-start">
                    <div className="flex-shrink-0 h-6 w-6 bg-primary-100 rounded-full flex items-center justify-center mt-1">
                      <FiCheckCircle className="h-4 w-4 text-primary-600" />
                    </div>
                    <div className="ml-3">
                      <p className="text-gray-700">
                        For every $1,000 in donations an artist receives, you earn $25
                      </p>
                    </div>
                  </div>
                </div>
                
                <div className="bg-gray-50 p-5 rounded-lg border-l-4 border-secondary-500 shadow-md">
                  <div className="flex items-center mb-3">
                    <div className="w-12 h-12 bg-secondary-100 rounded-full flex items-center justify-center mr-3">
                      <FiTrendingUp className="text-secondary-600" size={20} />
                    </div>
                    <h4 className="font-semibold text-lg">Tier 2: Artist's Referrals</h4>
                  </div>
                  <p className="text-gray-600 mb-3 text-lg">
                    Earn an additional <span className="font-bold text-secondary-600 text-xl">2.5%</span> commission on donations received by artists who were referred by your direct referrals.
                  </p>
                  <div className="flex items-start">
                    <div className="flex-shrink-0 h-6 w-6 bg-secondary-100 rounded-full flex items-center justify-center mt-1">
                      <FiCheckCircle className="h-4 w-4 text-secondary-600" />
                    </div>
                    <div className="ml-3">
                      <p className="text-gray-700">
                        If your referred artist brings in 5 more artists who each receive $1,000 in donations, you earn an additional $125
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <div>
              <h3 className="text-xl font-semibold mb-4 flex items-center">
                <FiCalendar className="text-primary-600 mr-2" size={22} />
                Example Scenario
              </h3>
              
              <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-md">
                <h4 className="font-semibold mb-4 text-lg">The Soundstage Venue</h4>
                
                <div className="space-y-6">
                  <div>
                    <h5 className="font-medium text-gray-800 mb-2 flex items-center">
                      <FiUsers className="text-primary-600 mr-2" size={16} />
                      Monthly Submissions
                    </h5>
                    <ul className="space-y-2 text-gray-600">
                      <li className="flex items-start">
                        <span className="text-primary-600 mr-2">•</span>
                        <span>20 bands submit to play at The Soundstage</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-primary-600 mr-2">•</span>
                        <span>8 bands (40%) sign up for TrueFans CONNECT™</span>
                      </li>
                    </ul>
                  </div>
                  
                  <div>
                    <h5 className="font-medium text-gray-800 mb-2 flex items-center">
                      <FiMusic className="text-primary-600 mr-2" size={16} />
                      Artist Performance
                    </h5>
                    <ul className="space-y-2 text-gray-600">
                      <li className="flex items-start">
                        <span className="text-primary-600 mr-2">•</span>
                        <span>Each artist plays 4 shows per month</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-primary-600 mr-2">•</span>
                        <span>Average of $200 in donations per show</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-primary-600 mr-2">•</span>
                        <span>Total monthly donations: $6,400</span>
                      </li>
                    </ul>
                  </div>
                  
                  <div>
                    <h5 className="font-medium text-gray-800 mb-2 flex items-center">
                      <FiDollarSign className="text-primary-600 mr-2" size={16} />
                      Venue Earnings
                    </h5>
                    <ul className="space-y-2 text-gray-600">
                      <li className="flex items-start">
                        <span className="text-primary-600 mr-2">•</span>
                        <span>Tier 1 (<span className="font-bold">2.5%</span> of $6,400): $160/month</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-primary-600 mr-2">•</span>
                        <span>Each artist refers 1 more artist on average</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-primary-600 mr-2">•</span>
                        <span>Tier 2 (<span className="font-bold">2.5%</span> of additional $6,400): $160/month</span>
                      </li>
                    </ul>
                  </div>
                  
                  <div className="bg-primary-50 p-4 rounded-lg border border-primary-100">
                    <h5 className="font-medium text-gray-800 mb-2">Total Annual Revenue</h5>
                    <p className="text-3xl font-bold text-primary-700">$3,840</p>
                    <p className="text-sm text-gray-500">Passive income from your submission process</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="mt-8 text-center">
            <a href="/venue-signup" className="btn btn-primary px-8 py-3 text-lg shadow-md hover:shadow-lg transition-shadow">
              Sign Up Your Venue
            </a>
          </div>
        </div>
      </section>
      
      <section className="mb-16">
        <div className="bg-white rounded-xl shadow-lg p-8 border border-gray-100">
          <h2 className="text-2xl font-bold mb-6 flex items-center">
            <FiDatabase className="text-primary-600 mr-2" size={24} />
            How The Submission Process Works
          </h2>
          
          <div className="grid md:grid-cols-4 gap-6 mb-8">
            <div className="bg-white p-6 rounded-lg shadow-md border border-gray-100 transform transition-transform hover:scale-105">
              <div className="w-14 h-14 bg-primary-100 rounded-full flex items-center justify-center mb-4">
                <span className="font-bold text-primary-600 text-xl">1</span>
              </div>
              <h4 className="font-semibold mb-2">Embed The Form</h4>
              <p className="text-gray-600">
                Add our customizable submission form to your website with a simple embed code.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md border border-gray-100 transform transition-transform hover:scale-105">
              <div className="w-14 h-14 bg-primary-100 rounded-full flex items-center justify-center mb-4">
                <span className="font-bold text-primary-600 text-xl">2</span>
              </div>
              <h4 className="font-semibold mb-2">Artists Submit</h4>
              <p className="text-gray-600">
                Musicians complete the form with their details and music links to apply for gigs at your venue.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md border border-gray-100 transform transition-transform hover:scale-105">
              <div className="w-14 h-14 bg-primary-100 rounded-full flex items-center justify-center mb-4">
                <span className="font-bold text-primary-600 text-xl">3</span>
              </div>
              <h4 className="font-semibold mb-2">Access Submissions</h4>
              <p className="text-gray-600">
                Log in to your venue dashboard to review and manage all artist submissions in one place.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md border border-gray-100 transform transition-transform hover:scale-105">
              <div className="w-14 h-14 bg-primary-100 rounded-full flex items-center justify-center mb-4">
                <span className="font-bold text-primary-600 text-xl">4</span>
              </div>
              <h4 className="font-semibold mb-2">Earn Commission</h4>
              <p className="text-gray-600">
                We invite artists to join TrueFans CONNECT™, and you earn <span className="font-bold text-primary-600">2.5%</span> on all their donations.
              </p>
            </div>
          </div>
          
          <div className="bg-gray-50 p-6 rounded-xl border border-gray-200 shadow-sm">
            <h3 className="text-xl font-semibold mb-4 flex items-center">
              <FiAward className="text-primary-600 mr-2" size={22} />
              The TrueFans CONNECT™ Advantage
            </h3>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-medium text-gray-800 mb-3 flex items-center">
                  <FiMusic className="text-primary-600 mr-2" size={18} />
                  For Your Venue
                </h4>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <div className="flex-shrink-0 h-6 w-6 bg-primary-100 rounded-full flex items-center justify-center mt-1">
                      <FiCheckCircle className="h-4 w-4 text-primary-600" />
                    </div>
                    <div className="ml-3">
                      <p className="text-gray-700">Streamlined submission management system</p>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <div className="flex-shrink-0 h-6 w-6 bg-primary-100 rounded-full flex items-center justify-center mt-1">
                      <FiCheckCircle className="h-4 w-4 text-primary-600" />
                    </div>
                    <div className="ml-3">
                      <p className="text-gray-700">New revenue stream from your booking process</p>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <div className="flex-shrink-0 h-6 w-6 bg-primary-100 rounded-full flex items-center justify-center mt-1">
                      <FiCheckCircle className="h-4 w-4 text-primary-600" />
                    </div>
                    <div className="ml-3">
                      <p className="text-gray-700">Two-tier commission structure (<span className="font-bold">2.5%</span> on direct and indirect referrals)</p>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <div className="flex-shrink-0 h-6 w-6 bg-primary-100 rounded-full flex items-center justify-center mt-1">
                      <FiCheckCircle className="h-4 w-4 text-primary-600" />
                    </div>
                    <div className="ml-3">
                      <p className="text-gray-700">Professional, branded submission experience for artists</p>
                    </div>
                  </li>
                </ul>
              </div>
              
              <div>
                <h4 className="font-medium text-gray-800 mb-3 flex items-center">
                  <FiUsers className="text-primary-600 mr-2" size={18} />
                  For Your Artists
                </h4>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <div className="flex-shrink-0 h-6 w-6 bg-primary-100 rounded-full flex items-center justify-center mt-1">
                      <FiCheckCircle className="h-4 w-4 text-primary-600" />
                    </div>
                    <div className="ml-3">
                      <p className="text-gray-700">Easy-to-use submission form with all necessary fields</p>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <div className="flex-shrink-0 h-6 w-6 bg-primary-100 rounded-full flex items-center justify-center mt-1">
                      <FiCheckCircle className="h-4 w-4 text-primary-600" />
                    </div>
                    <div className="ml-3">
                      <p className="text-gray-700">Opportunity to join TrueFans CONNECT™ and monetize their fanbase</p>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <div className="flex-shrink-0 h-6 w-6 bg-primary-100 rounded-full flex items-center justify-center mt-1">
                      <FiCheckCircle className="h-4 w-4 text-primary-600" />
                    </div>
                    <div className="ml-3">
                      <p className="text-gray-700">Tools to collect donations at shows and build their career</p>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <div className="flex-shrink-0 h-6 w-6 bg-primary-100 rounded-full flex items-center justify-center mt-1">
                      <FiCheckCircle className="h-4 w-4 text-primary-600" />
                    </div>
                    <div className="ml-3">
                      <p className="text-gray-700">Their own affiliate program to earn by referring other artists</p>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      <section className="mb-16">
        <div className="bg-white rounded-xl shadow-lg p-8 border border-gray-100">
          <h2 className="text-2xl font-bold mb-6 flex items-center">
            <FiMail className="text-primary-600 mr-2" size={24} />
            Frequently Asked Questions
          </h2>
          
          <div className="space-y-6">
            <div className="p-4 rounded-lg hover:bg-gray-50 transition-colors">
              <h3 className="text-lg font-semibold mb-2">How much does it cost to use the submission form?</h3>
              <p className="text-gray-600">
                The submission form is completely free for venues. We only earn when you earn through our affiliate program.
              </p>
            </div>
            
            <div className="p-4 rounded-lg hover:bg-gray-50 transition-colors">
              <h3 className="text-lg font-semibold mb-2">How do I receive my commission payments?</h3>
              <p className="text-gray-600">
                Commissions are calculated monthly and paid directly to your connected bank account through our secure payment system.
              </p>
            </div>
            
            <div className="p-4 rounded-lg hover:bg-gray-50 transition-colors">
              <h3 className="text-lg font-semibold mb-2">Can I customize the submission form fields?</h3>
              <p className="text-gray-600">
                Yes, premium venues can customize the form fields to collect exactly the information they need from artists.
              </p>
            </div>
            
            <div className="p-4 rounded-lg hover:bg-gray-50 transition-colors">
              <h3 className="text-lg font-semibold mb-2">How do you contact the artists who submit to my venue?</h3>
              <p className="text-gray-600">
                We send a single email invitation to artists who submit through your form, inviting them to join TrueFans CONNECT™. 
                We respect their privacy and never spam them.
              </p>
            </div>
            
            <div className="p-4 rounded-lg hover:bg-gray-50 transition-colors">
              <h3 className="text-lg font-semibold mb-2">Is there a limit to how much commission I can earn?</h3>
              <p className="text-gray-600">
                No, there's no cap on your earnings. The more artists you refer who receive donations, the more you earn. Your commission potential grows as your network of referred artists expands.
              </p>
            </div>
            
            <div className="p-4 rounded-lg hover:bg-gray-50 transition-colors">
              <h3 className="text-lg font-semibold mb-2">How long do I earn commissions for?</h3>
              <p className="text-gray-600">
                You earn commissions for as long as your referred artists continue to receive donations through TrueFans CONNECT™. There's no time limit - this creates a true passive income stream for your venue.
              </p>
            </div>
          </div>
        </div>
      </section>
      
      <section className="bg-primary-600 text-white rounded-3xl p-8 md:p-12 shadow-xl">
        <div className="text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Get Started?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Join TrueFans CONNECT™ today and transform your submission process into a revenue stream.
          </p>
          <a href="/venue-signup" className="btn bg-white text-primary-600 hover:bg-gray-100 px-8 py-3 text-lg shadow-md hover:shadow-lg transition-shadow">
            Sign Up Your Venue
          </a>
        </div>
      </section>
    </div>
  )
}

export default VenueServices
