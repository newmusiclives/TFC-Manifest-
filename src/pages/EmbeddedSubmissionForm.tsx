import { useState } from 'react'
import { FiMusic, FiDollarSign, FiHeart, FiSend } from 'react-icons/fi'
import { manifestFinancial } from '../lib/manifestFinancial'
import toast from 'react-hot-toast'

interface EmbeddedSubmissionFormProps {
  musicianId: string;
  musicianName: string;
}

const EmbeddedSubmissionForm: React.FC<EmbeddedSubmissionFormProps> = ({ musicianId, musicianName }) => {
  const [amount, setAmount] = useState<number>(5)
  const [customAmount, setCustomAmount] = useState<string>('')
  const [name, setName] = useState<string>('')
  const [email, setEmail] = useState<string>('')
  const [message, setMessage] = useState<string>('')
  const [isProcessing, setIsProcessing] = useState<boolean>(false)
  const [isSuccess, setIsSuccess] = useState<boolean>(false)
  
  const predefinedAmounts = [5, 10, 20, 50]
  
  const handleAmountSelect = (value: number) => {
    setAmount(value)
    setCustomAmount('')
  }
  
  const handleCustomAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    if (value === '' || /^\d+(\.\d{0,2})?$/.test(value)) {
      setCustomAmount(value)
      if (value !== '') {
        setAmount(parseFloat(value))
      }
    }
  }
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!amount || amount < 1) {
      toast.error('Please enter a valid amount')
      return
    }
    
    setIsProcessing(true)
    
    try {
      // Process the donation
      const response = await manifestFinancial.processDonation(
        amount,
        email, // Using email as userId for anonymous donations
        musicianId
      )
      
      if (response.success) {
        setIsSuccess(true)
        toast.success('Thank you for your support!')
        
        // Reset form
        setAmount(5)
        setCustomAmount('')
        setName('')
        setEmail('')
        setMessage('')
      } else {
        toast.error(response.error || 'Failed to process donation')
      }
    } catch (error) {
      console.error('Donation error:', error)
      toast.error('An unexpected error occurred')
    } finally {
      setIsProcessing(false)
    }
  }
  
  if (isSuccess) {
    return (
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 text-center">
        <div className="w-16 h-16 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center mx-auto mb-4">
          <FiHeart className="text-green-600 dark:text-green-400" size={32} />
        </div>
        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
          Thank You!
        </h3>
        <p className="text-gray-600 dark:text-gray-300 mb-4">
          Your support means the world to {musicianName}.
        </p>
        <button
          onClick={() => setIsSuccess(false)}
          className="btn btn-primary"
        >
          Support Again
        </button>
      </div>
    )
  }
  
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
      <div className="flex items-center mb-6">
        <div className="w-12 h-12 bg-primary-100 dark:bg-primary-900 rounded-full flex items-center justify-center mr-4">
          <FiMusic className="text-primary-600 dark:text-primary-400" size={24} />
        </div>
        <div>
          <h3 className="text-lg font-bold text-gray-900 dark:text-white">
            Support {musicianName}
          </h3>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Your contribution helps them create more music
          </p>
        </div>
      </div>
      
      <form onSubmit={handleSubmit}>
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Select Amount
          </label>
          <div className="grid grid-cols-4 gap-2 mb-3">
            {predefinedAmounts.map((value) => (
              <button
                key={value}
                type="button"
                onClick={() => handleAmountSelect(value)}
                className={`py-2 px-4 rounded-md text-sm font-medium ${
                  amount === value && customAmount === ''
                    ? 'bg-primary-600 text-white'
                    : 'bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-600'
                }`}
              >
                ${value}
              </button>
            ))}
          </div>
          
          <div className="relative mt-2">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <FiDollarSign className="text-gray-400" />
            </div>
            <input
              type="text"
              value={customAmount}
              onChange={handleCustomAmountChange}
              placeholder="Custom amount"
              className="pl-8 block w-full rounded-md border-gray-300 dark:border-gray-600 shadow-sm focus:ring-primary-500 focus:border-primary-500 sm:text-sm dark:bg-gray-700 dark:text-white"
            />
          </div>
        </div>
        
        <div className="mb-4">
          <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Your Name (Optional)
          </label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="block w-full rounded-md border-gray-300 dark:border-gray-600 shadow-sm focus:ring-primary-500 focus:border-primary-500 sm:text-sm dark:bg-gray-700 dark:text-white"
          />
        </div>
        
        <div className="mb-4">
          <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Your Email
          </label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="block w-full rounded-md border-gray-300 dark:border-gray-600 shadow-sm focus:ring-primary-500 focus:border-primary-500 sm:text-sm dark:bg-gray-700 dark:text-white"
          />
        </div>
        
        <div className="mb-6">
          <label htmlFor="message" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Message (Optional)
          </label>
          <textarea
            id="message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            rows={3}
            className="block w-full rounded-md border-gray-300 dark:border-gray-600 shadow-sm focus:ring-primary-500 focus:border-primary-500 sm:text-sm dark:bg-gray-700 dark:text-white"
            placeholder="Say something nice..."
          ></textarea>
        </div>
        
        <button
          type="submit"
          disabled={isProcessing}
          className="w-full flex items-center justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 disabled:opacity-50"
        >
          {isProcessing ? (
            <>
              <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Processing...
            </>
          ) : (
            <>
              <FiSend className="mr-2" />
              Send ${amount || 0} Support
            </>
          )}
        </button>
      </form>
    </div>
  )
}

export default EmbeddedSubmissionForm
