import React, { useState, useEffect } from 'react';
import { FiDollarSign, FiTrendingUp, FiUsers, FiCalendar } from 'react-icons/fi';

interface FinancialDetailsProps {
  musicianId: string;
}

interface FinancialData {
  totalEarnings: number;
  pendingPayouts: number;
  donorCount: number;
  averageDonation: number;
  recentTransactions: Transaction[];
}

interface Transaction {
  id: string;
  amount: number;
  date: string;
  donorName: string;
  status: 'completed' | 'pending';
}

const FinancialDetails: React.FC<FinancialDetailsProps> = ({ musicianId }) => {
  const [financialData, setFinancialData] = useState<FinancialData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [timeframe, setTimeframe] = useState<'week' | 'month' | 'year'>('month');
  
  useEffect(() => {
    const fetchFinancialData = async () => {
      setIsLoading(true);
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Mock data
      const mockData: FinancialData = {
        totalEarnings: 2450.75,
        pendingPayouts: 175.50,
        donorCount: 87,
        averageDonation: 28.17,
        recentTransactions: [
          {
            id: 'tx_1',
            amount: 50.00,
            date: '2023-06-15',
            donorName: 'John D.',
            status: 'completed'
          },
          {
            id: 'tx_2',
            amount: 25.00,
            date: '2023-06-14',
            donorName: 'Sarah M.',
            status: 'completed'
          },
          {
            id: 'tx_3',
            amount: 100.00,
            date: '2023-06-12',
            donorName: 'Anonymous',
            status: 'completed'
          },
          {
            id: 'tx_4',
            amount: 75.50,
            date: '2023-06-10',
            donorName: 'Michael R.',
            status: 'pending'
          },
          {
            id: 'tx_5',
            amount: 15.00,
            date: '2023-06-08',
            donorName: 'Emma L.',
            status: 'completed'
          }
        ]
      };
      
      setFinancialData(mockData);
      setIsLoading(false);
    };
    
    fetchFinancialData();
  }, [musicianId, timeframe]);
  
  if (isLoading) {
    return (
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
        <div className="animate-pulse">
          <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-1/4 mb-4"></div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            {[1, 2, 3, 4].map(i => (
              <div key={i} className="h-24 bg-gray-200 dark:bg-gray-700 rounded"></div>
            ))}
          </div>
          <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded w-1/3 mb-4"></div>
          <div className="space-y-3">
            {[1, 2, 3, 4, 5].map(i => (
              <div key={i} className="h-12 bg-gray-200 dark:bg-gray-700 rounded"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }
  
  if (!financialData) {
    return (
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
        <p className="text-gray-600 dark:text-gray-300">
          Unable to load financial data. Please try again later.
        </p>
      </div>
    );
  }
  
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-lg font-semibold">Financial Overview</h3>
        
        <div className="flex space-x-2">
          <button
            onClick={() => setTimeframe('week')}
            className={`px-3 py-1 text-sm rounded-md ${
              timeframe === 'week'
                ? 'bg-primary-600 text-white'
                : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300'
            }`}
          >
            Week
          </button>
          <button
            onClick={() => setTimeframe('month')}
            className={`px-3 py-1 text-sm rounded-md ${
              timeframe === 'month'
                ? 'bg-primary-600 text-white'
                : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300'
            }`}
          >
            Month
          </button>
          <button
            onClick={() => setTimeframe('year')}
            className={`px-3 py-1 text-sm rounded-md ${
              timeframe === 'year'
                ? 'bg-primary-600 text-white'
                : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300'
            }`}
          >
            Year
          </button>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
          <div className="flex items-center mb-2">
            <div className="w-10 h-10 rounded-full bg-green-100 dark:bg-green-900 flex items-center justify-center mr-3">
              <FiDollarSign className="text-green-600 dark:text-green-400" size={20} />
            </div>
            <span className="text-gray-600 dark:text-gray-300">Total Earnings</span>
          </div>
          <p className="text-2xl font-bold">${financialData.totalEarnings.toFixed(2)}</p>
        </div>
        
        <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
          <div className="flex items-center mb-2">
            <div className="w-10 h-10 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center mr-3">
              <FiTrendingUp className="text-blue-600 dark:text-blue-400" size={20} />
            </div>
            <span className="text-gray-600 dark:text-gray-300">Pending Payout</span>
          </div>
          <p className="text-2xl font-bold">${financialData.pendingPayouts.toFixed(2)}</p>
        </div>
        
        <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
          <div className="flex items-center mb-2">
            <div className="w-10 h-10 rounded-full bg-purple-100 dark:bg-purple-900 flex items-center justify-center mr-3">
              <FiUsers className="text-purple-600 dark:text-purple-400" size={20} />
            </div>
            <span className="text-gray-600 dark:text-gray-300">Total Donors</span>
          </div>
          <p className="text-2xl font-bold">{financialData.donorCount}</p>
        </div>
        
        <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
          <div className="flex items-center mb-2">
            <div className="w-10 h-10 rounded-full bg-orange-100 dark:bg-orange-900 flex items-center justify-center mr-3">
              <FiDollarSign className="text-orange-600 dark:text-orange-400" size={20} />
            </div>
            <span className="text-gray-600 dark:text-gray-300">Avg. Donation</span>
          </div>
          <p className="text-2xl font-bold">${financialData.averageDonation.toFixed(2)}</p>
        </div>
      </div>
      
      <h4 className="font-semibold text-lg mb-4 flex items-center">
        <FiCalendar className="mr-2" />
        Recent Transactions
      </h4>
      
      <div className="overflow-x-auto">
        <table className="min-w-full">
          <thead>
            <tr className="bg-gray-50 dark:bg-gray-700">
              <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                Date
              </th>
              <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                Donor
              </th>
              <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                Amount
              </th>
              <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                Status
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
            {financialData.recentTransactions.map(transaction => (
              <tr key={transaction.id}>
                <td className="px-4 py-3 text-sm text-gray-700 dark:text-gray-300">
                  {new Date(transaction.date).toLocaleDateString()}
                </td>
                <td className="px-4 py-3 text-sm text-gray-700 dark:text-gray-300">
                  {transaction.donorName}
                </td>
                <td className="px-4 py-3 text-sm font-medium text-gray-900 dark:text-white">
                  ${transaction.amount.toFixed(2)}
                </td>
                <td className="px-4 py-3 text-sm">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    transaction.status === 'completed'
                      ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                      : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200'
                  }`}>
                    {transaction.status === 'completed' ? 'Completed' : 'Pending'}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default FinancialDetails;
