import React, { useState } from 'react';
import { FiTwitter, FiInstagram, FiYoutube, FiCheck, FiAlertTriangle } from 'react-icons/fi';

interface SocialMediaConnectorProps {
  onConnect: (platform: string, username: string) => void;
}

const SocialMediaConnector: React.FC<SocialMediaConnectorProps> = ({ onConnect }) => {
  const [platform, setPlatform] = useState<string>('twitter');
  const [username, setUsername] = useState<string>('');
  const [isConnecting, setIsConnecting] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [connectedAccounts, setConnectedAccounts] = useState<{[key: string]: string}>({});
  
  const handleConnect = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!username.trim()) {
      setError('Please enter a valid username');
      return;
    }
    
    setIsConnecting(true);
    setError(null);
    
    // Simulate API call
    setTimeout(() => {
      // Mock successful connection
      setConnectedAccounts(prev => ({
        ...prev,
        [platform]: username
      }));
      
      onConnect(platform, username);
      setUsername('');
      setIsConnecting(false);
    }, 1500);
  };
  
  const getPlatformIcon = (platformName: string) => {
    switch (platformName) {
      case 'twitter':
        return <FiTwitter className="text-blue-400" size={20} />;
      case 'instagram':
        return <FiInstagram className="text-pink-500" size={20} />;
      case 'youtube':
        return <FiYoutube className="text-red-500" size={20} />;
      default:
        return null;
    }
  };
  
  const getPlatformLabel = (platformName: string) => {
    switch (platformName) {
      case 'twitter':
        return 'Twitter';
      case 'instagram':
        return 'Instagram';
      case 'youtube':
        return 'YouTube';
      default:
        return platformName;
    }
  };
  
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
      <h3 className="text-lg font-semibold mb-4">Connect Social Media</h3>
      
      <form onSubmit={handleConnect}>
        <div className="mb-4">
          <label htmlFor="platform" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Platform
          </label>
          <select
            id="platform"
            value={platform}
            onChange={(e) => setPlatform(e.target.value)}
            className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200"
          >
            <option value="twitter">Twitter</option>
            <option value="instagram">Instagram</option>
            <option value="youtube">YouTube</option>
          </select>
        </div>
        
        <div className="mb-4">
          <label htmlFor="username" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Username
          </label>
          <input
            id="username"
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder={`Enter your ${getPlatformLabel(platform)} username`}
            className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200"
          />
        </div>
        
        <button
          type="submit"
          disabled={isConnecting}
          className="btn btn-primary w-full"
        >
          {isConnecting ? (
            <>
              <span className="mr-2">Connecting...</span>
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
            </>
          ) : (
            <>Connect</>
          )}
        </button>
        
        {error && (
          <div className="mt-4 p-3 bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-300 rounded-md flex items-start">
            <FiAlertTriangle className="mr-2 mt-0.5 flex-shrink-0" />
            <span>{error}</span>
          </div>
        )}
      </form>
      
      {Object.keys(connectedAccounts).length > 0 && (
        <div className="mt-6">
          <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Connected Accounts
          </h4>
          <div className="space-y-2">
            {Object.entries(connectedAccounts).map(([plat, user]) => (
              <div key={plat} className="flex items-center p-2 bg-gray-50 dark:bg-gray-700 rounded-md">
                <div className="mr-2">
                  {getPlatformIcon(plat)}
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium">{getPlatformLabel(plat)}</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">@{user}</p>
                </div>
                <FiCheck className="text-green-500" size={16} />
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default SocialMediaConnector;
