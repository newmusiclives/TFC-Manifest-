import React, { useState } from 'react';
import { FiPlus, FiCheck, FiAlertTriangle } from 'react-icons/fi';

interface BankAccountConnectorProps {
  onConnect: (accountId: string) => void;
}

const BankAccountConnector: React.FC<BankAccountConnectorProps> = ({ onConnect }) => {
  const [isConnecting, setIsConnecting] = useState(false);
  const [isConnected, setIsConnected] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleConnect = () => {
    setIsConnecting(true);
    setError(null);
    
    // Simulate API call
    setTimeout(() => {
      // Mock successful connection
      const success = Math.random() > 0.2; // 80% success rate
      
      if (success) {
        setIsConnected(true);
        const mockAccountId = `acct_${Math.random().toString(36).substring(2, 10)}`;
        onConnect(mockAccountId);
      } else {
        setError('Unable to connect to bank account. Please try again.');
      }
      
      setIsConnecting(false);
    }, 2000);
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
      <h3 className="text-lg font-semibold mb-4">Connect Bank Account</h3>
      
      {!isConnected ? (
        <div>
          <p className="text-gray-600 dark:text-gray-300 mb-4">
            Connect your bank account to receive payments directly.
          </p>
          
          <button
            onClick={handleConnect}
            disabled={isConnecting}
            className="btn btn-primary w-full flex items-center justify-center"
          >
            {isConnecting ? (
              <>
                <span className="mr-2">Connecting...</span>
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              </>
            ) : (
              <>
                <FiPlus className="mr-2" />
                Connect Bank Account
              </>
            )}
          </button>
          
          {error && (
            <div className="mt-4 p-3 bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-300 rounded-md flex items-start">
              <FiAlertTriangle className="mr-2 mt-0.5 flex-shrink-0" />
              <span>{error}</span>
            </div>
          )}
        </div>
      ) : (
        <div className="flex items-center text-green-600 dark:text-green-400">
          <FiCheck className="mr-2" size={20} />
          <span>Bank account connected successfully</span>
        </div>
      )}
    </div>
  );
};

export default BankAccountConnector;
