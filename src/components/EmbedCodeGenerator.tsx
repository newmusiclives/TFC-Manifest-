import { useState } from 'react'
import { FiCopy, FiCheck, FiMonitor } from 'react-icons/fi'
import toast from 'react-hot-toast'

interface EmbedCodeGeneratorProps {
  artistId: string
  artistName: string
}

const EmbedCodeGenerator: React.FC<EmbedCodeGeneratorProps> = ({
  artistId,
  artistName
}) => {
  const [embedType, setEmbedType] = useState('button')
  const [buttonText, setButtonText] = useState('Support My Music')
  const [buttonColor, setButtonColor] = useState('#0ea5e9')
  const [buttonSize, setButtonSize] = useState('medium')
  const [copied, setCopied] = useState(false)
  
  // Generate the embed code based on selected options
  const generateEmbedCode = () => {
    const baseUrl = `${window.location.origin}/donate/${artistId}`
    
    if (embedType === 'button') {
      const sizeClass = buttonSize === 'small' ? 'tf-btn-sm' : 
                        buttonSize === 'large' ? 'tf-btn-lg' : 'tf-btn-md'
      
      return `<script src="${window.location.origin}/embed.js"></script>
<a href="${baseUrl}" 
   class="truefans-button ${sizeClass}" 
   style="--tf-color: ${buttonColor};"
   data-artist-id="${artistId}">
  ${buttonText}
</a>`
    } else if (embedType === 'widget') {
      return `<script src="${window.location.origin}/embed.js"></script>
<div class="truefans-widget" 
     data-artist-id="${artistId}" 
     data-widget-type="profile">
</div>`
    } else {
      // Player embed
      return `<script src="${window.location.origin}/embed.js"></script>
<div class="truefans-player" 
     data-artist-id="${artistId}">
</div>`
    }
  }
  
  const embedCode = generateEmbedCode()
  
  const handleCopy = () => {
    navigator.clipboard.writeText(embedCode)
      .then(() => {
        setCopied(true)
        toast.success('Embed code copied to clipboard!')
        setTimeout(() => setCopied(false), 2000)
      })
      .catch(err => {
        console.error('Could not copy text: ', err)
        toast.error('Failed to copy embed code')
      })
  }
  
  // Preview component based on embed type
  const renderPreview = () => {
    if (embedType === 'button') {
      const sizeClass = buttonSize === 'small' ? 'text-xs py-1 px-2' : 
                        buttonSize === 'large' ? 'text-base py-3 px-6' : 'text-sm py-2 px-4'
      
      return (
        <div className="flex justify-center p-6 bg-gray-100 dark:bg-gray-700 rounded-lg">
          <button
            style={{ backgroundColor: buttonColor }}
            className={`rounded-md text-white font-medium ${sizeClass}`}
          >
            {buttonText}
          </button>
        </div>
      )
    } else if (embedType === 'widget') {
      return (
        <div className="p-6 bg-gray-100 dark:bg-gray-700 rounded-lg">
          <div className="bg-white dark:bg-gray-800 rounded-lg p-4 max-w-xs mx-auto shadow-sm">
            <div className="flex items-center mb-3">
              <div className="w-12 h-12 rounded-full bg-primary-100 flex items-center justify-center mr-3">
                <span className="text-xl font-bold text-primary-600">{artistName.charAt(0)}</span>
              </div>
              <div>
                <h4 className="font-medium text-gray-900 dark:text-white">{artistName}</h4>
                <p className="text-sm text-gray-500 dark:text-gray-400">Musician</p>
              </div>
            </div>
            <button
              style={{ backgroundColor: buttonColor }}
              className="w-full py-2 px-4 rounded-md text-white font-medium text-sm"
            >
              Support Artist
            </button>
          </div>
        </div>
      )
    } else {
      // Player preview
      return (
        <div className="p-6 bg-gray-100 dark:bg-gray-700 rounded-lg">
          <div className="bg-white dark:bg-gray-800 rounded-lg p-4 max-w-xs mx-auto shadow-sm">
            <div className="flex items-center mb-3">
              <div className="w-12 h-12 rounded-full bg-primary-100 flex items-center justify-center mr-3">
                <span className="text-xl font-bold text-primary-600">{artistName.charAt(0)}</span>
              </div>
              <div>
                <h4 className="font-medium text-gray-900 dark:text-white">{artistName}</h4>
                <p className="text-sm text-gray-500 dark:text-gray-400">Latest Release</p>
              </div>
            </div>
            <div className="h-4 bg-gray-200 dark:bg-gray-600 rounded-full mb-3">
              <div className="h-4 bg-primary-600 rounded-full" style={{ width: '60%' }}></div>
            </div>
            <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400">
              <span>1:45</span>
              <span>2:58</span>
            </div>
          </div>
        </div>
      )
    }
  }
  
  return (
    <div className="space-y-6">
      <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
        <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">Embed on Your Website</h3>
        <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">
          Add TrueFans CONNECT to your website to let your fans support you directly.
        </p>
        
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Embed Type
          </label>
          <div className="flex space-x-4">
            <button
              onClick={() => setEmbedType('button')}
              className={`px-4 py-2 rounded-md text-sm font-medium ${
                embedType === 'button'
                  ? 'bg-primary-100 text-primary-700 border border-primary-300'
                  : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 border border-gray-300 dark:border-gray-600'
              }`}
            >
              Button
            </button>
            <button
              onClick={() => setEmbedType('widget')}
              className={`px-4 py-2 rounded-md text-sm font-medium ${
                embedType === 'widget'
                  ? 'bg-primary-100 text-primary-700 border border-primary-300'
                  : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 border border-gray-300 dark:border-gray-600'
              }`}
            >
              Profile Widget
            </button>
            <button
              onClick={() => setEmbedType('player')}
              className={`px-4 py-2 rounded-md text-sm font-medium ${
                embedType === 'player'
                  ? 'bg-primary-100 text-primary-700 border border-primary-300'
                  : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 border border-gray-300 dark:border-gray-600'
              }`}
            >
              Music Player
            </button>
          </div>
        </div>
        
        {embedType === 'button' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <label htmlFor="button-text" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Button Text
              </label>
              <input
                type="text"
                id="button-text"
                className="focus:ring-primary-500 focus:border-primary-500 block w-full sm:text-sm border-gray-300 rounded-md"
                value={buttonText}
                onChange={(e) => setButtonText(e.target.value)}
              />
            </div>
            
            <div>
              <label htmlFor="button-color" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Button Color
              </label>
              <div className="flex">
                <input
                  type="color"
                  id="button-color"
                  className="h-9 w-9 border border-gray-300 rounded-l-md"
                  value={buttonColor}
                  onChange={(e) => setButtonColor(e.target.value)}
                />
                <input
                  type="text"
                  className="focus:ring-primary-500 focus:border-primary-500 block w-full sm:text-sm border-gray-300 rounded-r-md"
                  value={buttonColor}
                  onChange={(e) => setButtonColor(e.target.value)}
                />
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Button Size
              </label>
              <div className="flex space-x-4">
                <button
                  onClick={() => setButtonSize('small')}
                  className={`px-3 py-1 rounded-md text-xs font-medium ${
                    buttonSize === 'small'
                      ? 'bg-primary-100 text-primary-700 border border-primary-300'
                      : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 border border-gray-300 dark:border-gray-600'
                  }`}
                >
                  Small
                </button>
                <button
                  onClick={() => setButtonSize('medium')}
                  className={`px-3 py-1 rounded-md text-xs font-medium ${
                    buttonSize === 'medium'
                      ? 'bg-primary-100 text-primary-700 border border-primary-300'
                      : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 border border-gray-300 dark:border-gray-600'
                  }`}
                >
                  Medium
                </button>
                <button
                  onClick={() => setButtonSize('large')}
                  className={`px-3 py-1 rounded-md text-xs font-medium ${
                    buttonSize === 'large'
                      ? 'bg-primary-100 text-primary-700 border border-primary-300'
                      : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 border border-gray-300 dark:border-gray-600'
                  }`}
                >
                  Large
                </button>
              </div>
            </div>
          </div>
        )}
        
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Preview
          </label>
          {renderPreview()}
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Embed Code
          </label>
          <div className="relative">
            <pre className="bg-gray-800 text-gray-200 p-4 rounded-md text-sm overflow-x-auto">
              {embedCode}
            </pre>
            <button
              onClick={handleCopy}
              className="absolute top-2 right-2 bg-gray-700 hover:bg-gray-600 text-white px-3 py-1 rounded-md text-xs flex items-center"
            >
              {copied ? <FiCheck className="mr-1" /> : <FiCopy className="mr-1" />}
              {copied ? 'Copied' : 'Copy'}
            </button>
          </div>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-4">
          <div className="flex items-center mb-4">
            <div className="p-2 rounded-full bg-purple-100 text-purple-600 mr-3">
              <FiMonitor size={20} />
            </div>
            <h3 className="text-lg font-medium text-gray-900 dark:text-white">WordPress</h3>
          </div>
          <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">
            Using WordPress? Install our plugin for easy integration.
          </p>
          <button className="btn btn-primary btn-sm">
            Get WordPress Plugin
          </button>
        </div>
        
        <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-4">
          <div className="flex items-center mb-4">
            <div className="p-2 rounded-full bg-yellow-100 text-yellow-600 mr-3">
              <FiMonitor size={20} />
            </div>
            <h3 className="text-lg font-medium text-gray-900 dark:text-white">Squarespace</h3>
          </div>
          <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">
            Using Squarespace? Follow our guide for embedding.
          </p>
          <button className="btn btn-primary btn-sm">
            View Squarespace Guide
          </button>
        </div>
      </div>
      
      <div className="bg-blue-50 dark:bg-blue-900/30 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
        <h3 className="text-md font-medium text-blue-800 dark:text-blue-300 mb-2">Embed Tips</h3>
        <ul className="text-sm text-blue-700 dark:text-blue-400 space-y-2 list-disc pl-5">
          <li>Place the button in a prominent location on your website</li>
          <li>Add the profile widget to your about or bio page</li>
          <li>Embed the music player alongside your latest releases</li>
          <li>Test the embed on your site to ensure it displays correctly</li>
        </ul>
      </div>
    </div>
  )
}

export default EmbedCodeGenerator
