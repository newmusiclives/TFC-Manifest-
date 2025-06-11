import React, { useState } from 'react';
import { FiCopy, FiCheck } from 'react-icons/fi';

interface DonationLinkGeneratorProps {
  musicianId: string;
  musicianName: string;
}

const DonationLinkGenerator: React.FC<DonationLinkGeneratorProps> = ({ 
  musicianId, 
  musicianName 
}) => {
  const [copied, setCopied] = useState(false);
  
  // Generate the donation link
  const baseUrl = window.location.origin;
  const donationLink = `${baseUrl}/donate/${musicianId}`;
  
  const handleCopy = () => {
    navigator.clipboard.writeText(donationLink);
    setCopied(true);
    
    // Reset copied state after 2 seconds
    setTimeout(() => {
      setCopied(false);
    }, 2000);
  };
  
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
      <h3 className="text-lg font-semibold mb-4">Donation Link</h3>
      
      <p className="text-gray-600 dark:text-gray-300 mb-4">
        Share this link with your fans to receive direct donations.
      </p>
      
      <div className="flex items-center">
        <input
          type="text"
          value={donationLink}
          readOnly
          className="flex-1 p-2 border border-gray-300 dark:border-gray-600 rounded-l-md bg-gray-50 dark:bg-gray-700 text-gray-800 dark:text-gray-200"
        />
        
        <button
          onClick={handleCopy}
          className={`p-2 ${
            copied 
              ? 'bg-green-600 hover:bg-green-700' 
              : 'bg-primary-600 hover:bg-primary-700'
          } text-white rounded-r-md`}
        >
          {copied ? <FiCheck size={20} /> : <FiCopy size={20} />}
        </button>
      </div>
      
      {copied && (
        <p className="text-green-600 dark:text-green-400 mt-2 text-sm">
          Link copied to clipboard!
        </p>
      )}
      
      <div className="mt-4 p-4 bg-gray-50 dark:bg-gray-700 rounded-md">
        <h4 className="font-medium mb-2">Embed code:</h4>
        <pre className="text-xs bg-gray-100 dark:bg-gray-800 p-2 rounded overflow-x-auto">
          {`<iframe src="${baseUrl}/embed/${musicianId}" width="300" height="200" frameborder="0"></iframe>`}
        </pre>
      </div>
    </div>
  );
};

export default DonationLinkGenerator;
