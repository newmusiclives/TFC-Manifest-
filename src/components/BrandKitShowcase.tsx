import { useState } from 'react'
import { FiDownload, FiCopy, FiCheck } from 'react-icons/fi'

const BrandKitShowcase = () => {
  const [copiedColor, setCopiedColor] = useState<string | null>(null)
  const [activeTab, setActiveTab] = useState('colors')
  
  const brandColors = [
    { name: 'Primary', value: '#0284c7', class: 'bg-primary-600' },
    { name: 'Secondary', value: '#db2777', class: 'bg-secondary-600' },
    { name: 'Accent', value: '#7c3aed', class: 'bg-accent-600' },
    { name: 'Success', value: '#10b981', class: 'bg-green-600' },
    { name: 'Warning', value: '#f59e0b', class: 'bg-yellow-600' },
    { name: 'Danger', value: '#ef4444', class: 'bg-red-600' },
    { name: 'Gray', value: '#6b7280', class: 'bg-gray-500' },
  ]
  
  const brandLogos = [
    { name: 'Primary Logo', src: 'https://via.placeholder.com/300x100?text=TrueFans+CONNECT', type: 'PNG' },
    { name: 'Icon Only', src: 'https://via.placeholder.com/100x100?text=TF', type: 'PNG' },
    { name: 'Monochrome', src: 'https://via.placeholder.com/300x100?text=TrueFans+CONNECT+Mono', type: 'PNG' },
  ]
  
  const brandFonts = [
    { name: 'Heading Font', family: 'Inter', weights: ['600', '700', '800'] },
    { name: 'Body Font', family: 'Inter', weights: ['400', '500'] },
  ]
  
  const copyToClipboard = (text: string, colorName: string) => {
    navigator.clipboard.writeText(text)
    setCopiedColor(colorName)
    setTimeout(() => setCopiedColor(null), 2000)
  }
  
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden">
      <div className="border-b border-gray-200 dark:border-gray-700">
        <nav className="flex -mb-px">
          <button
            onClick={() => setActiveTab('colors')}
            className={`py-4 px-6 text-center border-b-2 font-medium text-sm ${
              activeTab === 'colors'
                ? 'border-primary-500 text-primary-600 dark:text-primary-400'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 dark:text-gray-400 dark:hover:text-gray-300'
            }`}
          >
            Colors
          </button>
          <button
            onClick={() => setActiveTab('logos')}
            className={`py-4 px-6 text-center border-b-2 font-medium text-sm ${
              activeTab === 'logos'
                ? 'border-primary-500 text-primary-600 dark:text-primary-400'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 dark:text-gray-400 dark:hover:text-gray-300'
            }`}
          >
            Logos
          </button>
          <button
            onClick={() => setActiveTab('typography')}
            className={`py-4 px-6 text-center border-b-2 font-medium text-sm ${
              activeTab === 'typography'
                ? 'border-primary-500 text-primary-600 dark:text-primary-400'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 dark:text-gray-400 dark:hover:text-gray-300'
            }`}
          >
            Typography
          </button>
          <button
            onClick={() => setActiveTab('guidelines')}
            className={`py-4 px-6 text-center border-b-2 font-medium text-sm ${
              activeTab === 'guidelines'
                ? 'border-primary-500 text-primary-600 dark:text-primary-400'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 dark:text-gray-400 dark:hover:text-gray-300'
            }`}
          >
            Guidelines
          </button>
        </nav>
      </div>
      
      <div className="p-6">
        {activeTab === 'colors' && (
          <div>
            <h2 className="text-lg font-bold mb-4">Brand Colors</h2>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              Consistent use of our brand colors helps maintain visual coherence across all platforms.
            </p>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {brandColors.map((color) => (
                <div key={color.name} className="border border-gray-200 dark:border-gray-700 rounded-md overflow-hidden">
                  <div className={`h-24 ${color.class}`}></div>
                  <div className="p-4">
                    <div className="flex justify-between items-center">
                      <div>
                        <h3 className="font-medium">{color.name}</h3>
                        <p className="text-sm text-gray-500 dark:text-gray-400">{color.value}</p>
                      </div>
                      <button
                        onClick={() => copyToClipboard(color.value, color.name)}
                        className="p-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
                        title="Copy color code"
                      >
                        {copiedColor === color.name ? <FiCheck /> : <FiCopy />}
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="mt-8">
              <h3 className="text-md font-bold mb-2">Color Usage Guidelines</h3>
              <ul className="list-disc pl-5 text-gray-600 dark:text-gray-400 space-y-1">
                <li>Use Primary for main actions, links, and brand emphasis</li>
                <li>Use Secondary for supporting actions and visual interest</li>
                <li>Use Accent sparingly for highlighting important elements</li>
                <li>Use Success, Warning, and Danger colors for their respective states</li>
                <li>Maintain sufficient contrast for accessibility (WCAG AA compliance)</li>
              </ul>
            </div>
          </div>
        )}
        
        {activeTab === 'logos' && (
          <div>
            <h2 className="text-lg font-bold mb-4">Brand Logos</h2>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              Our logo is the primary visual identifier for TrueFans CONNECT. Use it consistently and appropriately.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {brandLogos.map((logo) => (
                <div key={logo.name} className="border border-gray-200 dark:border-gray-700 rounded-md overflow-hidden">
                  <div className="h-40 bg-gray-100 dark:bg-gray-700 flex items-center justify-center p-4">
                    <img src={logo.src} alt={logo.name} className="max-h-full max-w-full" />
                  </div>
                  <div className="p-4">
                    <div className="flex justify-between items-center">
                      <div>
                        <h3 className="font-medium">{logo.name}</h3>
                        <p className="text-sm text-gray-500 dark:text-gray-400">{logo.type} Format</p>
                      </div>
                      <button
                        className="p-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
                        title="Download logo"
                      >
                        <FiDownload />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="mt-8">
              <h3 className="text-md font-bold mb-2">Logo Usage Guidelines</h3>
              <ul className="list-disc pl-5 text-gray-600 dark:text-gray-400 space-y-1">
                <li>Maintain clear space around the logo (minimum 1x height of the logo)</li>
                <li>Do not stretch, distort, or alter the logo proportions</li>
                <li>Do not change the logo colors outside of approved variations</li>
                <li>Use the monochrome version on complex backgrounds</li>
                <li>Minimum size: 100px width for digital, 1 inch for print</li>
              </ul>
            </div>
          </div>
        )}
        
        {activeTab === 'typography' && (
          <div>
            <h2 className="text-lg font-bold mb-4">Typography</h2>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              Consistent typography helps establish a clear visual hierarchy and enhances readability.
            </p>
            
            <div className="space-y-8">
              {brandFonts.map((font) => (
                <div key={font.name} className="border border-gray-200 dark:border-gray-700 rounded-md overflow-hidden">
                  <div className="p-6">
                    <h3 className="text-lg font-bold mb-2">{font.name}: {font.family}</h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
                      Weights: {font.weights.join(', ')}
                    </p>
                    
                    {font.name === 'Heading Font' ? (
                      <div className="space-y-4">
                        <div>
                          <h1 className="text-4xl font-bold">Heading 1</h1>
                          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">4xl / Bold / 36px</p>
                        </div>
                        <div>
                          <h2 className="text-3xl font-bold">Heading 2</h2>
                          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">3xl / Bold / 30px</p>
                        </div>
                        <div>
                          <h3 className="text-2xl font-bold">Heading 3</h3>
                          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">2xl / Bold / 24px</p>
                        </div>
                        <div>
                          <h4 className="text-xl font-bold">Heading 4</h4>
                          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">xl / Bold / 20px</p>
                        </div>
                      </div>
                    ) : (
                      <div className="space-y-4">
                        <div>
                          <p className="text-base">Body Text (Regular): The quick brown fox jumps over the lazy dog.</p>
                          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Base / Regular / 16px</p>
                        </div>
                        <div>
                          <p className="text-base font-medium">Body Text (Medium): The quick brown fox jumps over the lazy dog.</p>
                          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Base / Medium / 16px</p>
                        </div>
                        <div>
                          <p className="text-sm">Small Text: The quick brown fox jumps over the lazy dog.</p>
                          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Small / Regular / 14px</p>
                        </div>
                        <div>
                          <p className="text-xs">Extra Small Text: The quick brown fox jumps over the lazy dog.</p>
                          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">XS / Regular / 12px</p>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
            
            <div className="mt-8">
              <h3 className="text-md font-bold mb-2">Typography Guidelines</h3>
              <ul className="list-disc pl-5 text-gray-600 dark:text-gray-400 space-y-1">
                <li>Use appropriate heading levels to maintain semantic hierarchy</li>
                <li>Maintain sufficient line height for readability (1.5x for body text)</li>
                <li>Limit line length to 60-80 characters for optimal readability</li>
                <li>Ensure sufficient contrast between text and background</li>
                <li>Use font weights to create emphasis rather than italics or underlines</li>
              </ul>
            </div>
          </div>
        )}
        
        {activeTab === 'guidelines' && (
          <div>
            <h2 className="text-lg font-bold mb-4">Brand Guidelines</h2>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              These guidelines ensure consistent representation of the TrueFans CONNECT brand across all touchpoints.
            </p>
            
            <div className="space-y-8">
              <div>
                <h3 className="text-md font-bold mb-2">Brand Voice</h3>
                <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-md">
                  <p className="text-gray-600 dark:text-gray-300 mb-2">
                    Our brand voice is:
                  </p>
                  <ul className="list-disc pl-5 text-gray-600 dark:text-gray-300 space-y-1">
                    <li><strong>Authentic:</strong> We speak honestly and transparently</li>
                    <li><strong>Supportive:</strong> We empower artists and fans</li>
                    <li><strong>Professional:</strong> We are knowledgeable and trustworthy</li>
                    <li><strong>Inclusive:</strong> We welcome all music creators and fans</li>
                    <li><strong>Passionate:</strong> We genuinely care about music and community</li>
                  </ul>
                </div>
              </div>
              
              <div>
                <h3 className="text-md font-bold mb-2">Imagery Guidelines</h3>
                <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-md">
                  <p className="text-gray-600 dark:text-gray-300 mb-2">
                    When selecting or creating imagery:
                  </p>
                  <ul className="list-disc pl-5 text-gray-600 dark:text-gray-300 space-y-1">
                    <li>Use authentic, diverse representations of musicians and fans</li>
                    <li>Prefer candid, natural moments over overly posed shots</li>
                    <li>Ensure images are high-quality and well-composed</li>
                    <li>Maintain consistent color treatment across imagery</li>
                    <li>Include diverse musical genres and performance settings</li>
                  </ul>
                </div>
              </div>
              
              <div>
                <h3 className="text-md font-bold mb-2">Social Media Guidelines</h3>
                <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-md">
                  <p className="text-gray-600 dark:text-gray-300 mb-2">
                    For social media presence:
                  </p>
                  <ul className="list-disc pl-5 text-gray-600 dark:text-gray-300 space-y-1">
                    <li>Use consistent profile images and cover photos across platforms</li>
                    <li>Maintain brand voice in all communications</li>
                    <li>Use approved hashtags: #TrueFansCONNECT #SupportIndieMusic</li>
                    <li>Respond promptly and professionally to comments and messages</li>
                    <li>Share success stories from the TrueFans CONNECT community</li>
                  </ul>
                </div>
              </div>
              
              <div>
                <h3 className="text-md font-bold mb-2">Email Marketing Guidelines</h3>
                <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-md">
                  <p className="text-gray-600 dark:text-gray-300 mb-2">
                    For email communications:
                  </p>
                  <ul className="list-disc pl-5 text-gray-600 dark:text-gray-300 space-y-1">
                    <li>Use approved email templates with consistent branding</li>
                    <li>Keep subject lines clear, concise, and relevant</li>
                    <li>Personalize communications when possible</li>
                    <li>Include clear calls-to-action</li>
                    <li>Maintain mobile-friendly design</li>
                  </ul>
                </div>
              </div>
            </div>
            
            <div className="mt-8 p-4 bg-primary-50 dark:bg-primary-900/20 border border-primary-100 dark:border-primary-900 rounded-md">
              <h3 className="text-md font-bold text-primary-800 dark:text-primary-300 mb-2">Need More Resources?</h3>
              <p className="text-primary-700 dark:text-primary-400">
                For additional brand assets or guidance, please contact the marketing team at marketing@truefansconnect.com
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default BrandKitShowcase
