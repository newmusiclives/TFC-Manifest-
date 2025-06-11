import { useState } from 'react'
import { FiDownload, FiPrinter, FiImage, FiFileText } from 'react-icons/fi'
import QRCode from 'react-qr-code'

interface PrintableAssetsProps {
  artistId: string
  artistName: string
}

const PrintableAssets: React.FC<PrintableAssetsProps> = ({
  artistId,
  artistName
}) => {
  const [selectedAsset, setSelectedAsset] = useState('merch-table')
  
  // Generate the URL that the QR code will point to
  const qrValue = `${window.location.origin}/artist/${artistId}`
  
  const handlePrint = () => {
    window.print()
  }
  
  const renderAssetPreview = () => {
    switch (selectedAsset) {
      case 'merch-table':
        return (
          <div className="bg-white p-8 rounded-lg shadow-sm border border-gray-200 max-w-md mx-auto">
            <div className="text-center mb-4">
              <h3 className="text-2xl font-bold text-gray-900">{artistName}</h3>
              <p className="text-gray-600">Support my music directly!</p>
            </div>
            
            <div className="flex justify-center mb-4">
              <QRCode
                value={qrValue}
                size={200}
                level="H"
                fgColor="#0ea5e9"
              />
            </div>
            
            <div className="text-center">
              <p className="text-sm text-gray-500 mb-1">Scan this code with your phone</p>
              <p className="text-lg font-semibold text-primary-600">TrueFans CONNECT</p>
            </div>
          </div>
        )
      
      case 'poster':
        return (
          <div className="bg-white p-8 rounded-lg shadow-sm border border-gray-200 max-w-md mx-auto">
            <div className="text-center mb-6">
              <h3 className="text-3xl font-bold text-gray-900 mb-2">{artistName}</h3>
              <p className="text-xl text-gray-700">Support Independent Music</p>
              <p className="text-gray-600 mt-2">Scan the code below to support me directly</p>
            </div>
            
            <div className="flex justify-center mb-6">
              <QRCode
                value={qrValue}
                size={250}
                level="H"
                fgColor="#0ea5e9"
              />
            </div>
            
            <div className="text-center">
              <p className="text-lg font-semibold text-primary-600 mb-1">TrueFans CONNECT</p>
              <p className="text-sm text-gray-500">Your support helps me create more music</p>
            </div>
          </div>
        )
      
      case 'business-card':
        return (
          <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200 max-w-xs mx-auto" style={{ width: '3.5in', height: '2in' }}>
            <div className="flex h-full">
              <div className="w-1/2 flex flex-col justify-center">
                <h3 className="text-xl font-bold text-gray-900 mb-1">{artistName}</h3>
                <p className="text-xs text-gray-600 mb-2">Independent Musician</p>
                <p className="text-xs text-gray-500">www.truefansconnect.com/{artistId}</p>
              </div>
              
              <div className="w-1/2 flex justify-center items-center">
                <QRCode
                  value={qrValue}
                  size={100}
                  level="H"
                  fgColor="#0ea5e9"
                />
              </div>
            </div>
          </div>
        )
      
      case 'album-insert':
        return (
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 max-w-md mx-auto">
            <div className="text-center mb-4">
              <h3 className="text-2xl font-bold text-gray-900 mb-1">{artistName}</h3>
              <p className="text-gray-600">Thank you for supporting my music!</p>
            </div>
            
            <div className="flex justify-center mb-4">
              <QRCode
                value={qrValue}
                size={180}
                level="H"
                fgColor="#0ea5e9"
              />
            </div>
            
            <div className="text-center">
              <p className="text-sm text-gray-500 mb-2">Scan this code to unlock exclusive content</p>
              <p className="text-lg font-semibold text-primary-600">TrueFans CONNECT</p>
              <p className="text-xs text-gray-500 mt-2">Your continued support helps me create more music for you</p>
            </div>
          </div>
        )
      
      default:
        return null
    }
  }
  
  return (
    <div className="space-y-6">
      <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
        <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">Printable Marketing Materials</h3>
        <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">
          Download and print these materials to promote your music and collect support at live shows.
        </p>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
          <button
            onClick={() => setSelectedAsset('merch-table')}
            className={`p-3 rounded-lg flex flex-col items-center justify-center text-center ${
              selectedAsset === 'merch-table'
                ? 'bg-primary-100 text-primary-700 border border-primary-300'
                : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 border border-gray-300 dark:border-gray-600'
            }`}
          >
            <FiImage size={24} className="mb-2" />
            <span className="text-sm font-medium">Merch Table Sign</span>
          </button>
          
          <button
            onClick={() => setSelectedAsset('poster')}
            className={`p-3 rounded-lg flex flex-col items-center justify-center text-center ${
              selectedAsset === 'poster'
                ? 'bg-primary-100 text-primary-700 border border-primary-300'
                : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 border border-gray-300 dark:border-gray-600'
            }`}
          >
            <FiImage size={24} className="mb-2" />
            <span className="text-sm font-medium">Venue Poster</span>
          </button>
          
          <button
            onClick={() => setSelectedAsset('business-card')}
            className={`p-3 rounded-lg flex flex-col items-center justify-center text-center ${
              selectedAsset === 'business-card'
                ? 'bg-primary-100 text-primary-700 border border-primary-300'
                : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 border border-gray-300 dark:border-gray-600'
            }`}
          >
            <FiFileText size={24} className="mb-2" />
            <span className="text-sm font-medium">Business Card</span>
          </button>
          
          <button
            onClick={() => setSelectedAsset('album-insert')}
            className={`p-3 rounded-lg flex flex-col items-center justify-center text-center ${
              selectedAsset === 'album-insert'
                ? 'bg-primary-100 text-primary-700 border border-primary-300'
                : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 border border-gray-300 dark:border-gray-600'
            }`}
          >
            <FiFileText size={24} className="mb-2" />
            <span className="text-sm font-medium">Album Insert</span>
          </button>
        </div>
        
        <div className="mb-6">
          <h4 className="text-md font-medium text-gray-800 dark:text-white mb-3">Preview</h4>
          {renderAssetPreview()}
        </div>
        
        <div className="flex justify-center space-x-4">
          <button
            onClick={handlePrint}
            className="btn-primary flex items-center"
          >
            <FiPrinter className="mr-2" />
            Print
          </button>
          
          <button
            className="btn-outline flex items-center"
          >
            <FiDownload className="mr-2" />
            Download PDF
          </button>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-4">
          <div className="flex items-center mb-4">
            <div className="p-2 rounded-full bg-purple-100 text-purple-600 mr-3">
              <FiImage size={20} />
            </div>
            <h3 className="text-lg font-medium text-gray-900 dark:text-white">Custom Designs</h3>
          </div>
          <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">
            Need custom designed marketing materials? Our design team can help.
          </p>
          <button className="btn btn-primary btn-sm">
            Request Custom Design
          </button>
        </div>
        
        <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-4">
          <div className="flex items-center mb-4">
            <div className="p-2 rounded-full bg-green-100 text-green-600 mr-3">
              <FiFileText size={20} />
            </div>
            <h3 className="text-lg font-medium text-gray-900 dark:text-white">Print Services</h3>
          </div>
          <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">
            Order professional prints of your marketing materials.
          </p>
          <button className="btn btn-primary btn-sm">
            Order Prints
          </button>
        </div>
      </div>
      
      <div className="bg-blue-50 dark:bg-blue-900/30 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
        <h3 className="text-md font-medium text-blue-800 dark:text-blue-300 mb-2">Marketing Tips</h3>
        <ul className="text-sm text-blue-700 dark:text-blue-400 space-y-2 list-disc pl-5">
          <li>Place QR codes at your merch table for easy fan support</li>
          <li>Include business cards with album sales</li>
          <li>Ask venues to display your poster near the stage</li>
          <li>Hand out business cards after shows to new fans</li>
        </ul>
      </div>
    </div>
  )
}

export default PrintableAssets
