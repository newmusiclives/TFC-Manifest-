import { useState, useEffect } from 'react'
import { FiX, FiDollarSign, FiHeart, FiInfo } from 'react-icons/fi'
import { manifestFinancial } from '../lib/manifestFinancial'
import { useAuthStore } from '../stores/authStore'
import toast from 'react-hot-toast'
import { supabase } from '../lib/supabase'

interface DonationModalProps {
  isOpen: boolean
  onClose: () => void
  musicianId: string
  musicianName: string
  songId?: string
  songTitle?: string
}

const DonationModal: React.FC<DonationModalProps> = ({
  isOpen,
  onClose,
  musicianId,
  musicianName,
  songId,
  songTitle
}) => {
  const { user } = useAuthStore()
  const [baseAmount, setBaseAmount] = useState(5)
  const [message, setMessage] = useState('')
  const [isProcessing, setIsProcessing] = useState(false)
  const [totalAmount, setTotalAmount] = useState(0)
  const [processingFee, setProcessingFee] = useState(0)
  
  const predefinedAmounts = [5, 10, 20, 50]
  
  // Calculate processing fee (2.9% + $0.30) and total amount
  useEffect(() => {
    if (baseAmount > 0) {
      const fee = (baseAmount * 0.029) + 0.30;
      setProcessingFee(parseFloat(fee.toFixed(2)));
      setTotalAmount(parseFloat((baseAmount + fee).toFixed(2)));
    } else {
      setProcessingFee(0);
      setTotalAmount(0);
    }
  }, [baseAmount]);

  const handleDonate = async () => {
    if (!user) {
      toast.error('Please log in to donate')
      return
    }
    
    setIsProcessing(true)
    
    try {
      // Process payment through Manifest Financial with the total amount (base + fee)
      const paymentResponse = await manifestFinancial.processDonation(
        totalAmount,
        user.id,
        musicianId,
        songId
      )
      
      if (paymentResponse.success) {
        // Calculate artist and platform payouts
        const artistPayout = parseFloat((baseAmount * 0.8).toFixed(2))
        const platformPayout = parseFloat((baseAmount * 0.2).toFixed(2))
        
        // Record donation in database
        const { error } = await supabase.from('donations').insert({
          fan_id: user.id,
          musician_id: musicianId,
          song_id: songId || null,
          amount: baseAmount,
          platform_fee: platformPayout,
          artist_payout: artistPayout,
          processing_fee: processingFee,
          total_charged: totalAmount,
          personal_message: message || null,
          payment_status: 'complete'
        })
        
        if (error) throw error
        
        toast.success(`Thank you for supporting ${musicianName} with $${baseAmount}!`)
        onClose()
      } else {
        throw new Error('Payment processing failed')
      }
    } catch (error) {
      console.error('Donation error:', error)
      toast.error('Something went wrong with your donation. Please try again.')
    } finally {
      setIsProcessing(false)
    }
  }
  
  if (!isOpen) return null
  
  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
        <div className="fixed inset-0 transition-opacity" aria-hidden="true">
          <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
        </div>
        
        <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
        
        <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
          <div className="absolute top-0 right-0 pt-4 pr-4">
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-500 focus:outline-none"
            >
              <FiX size={24} />
            </button>
          </div>
          
          <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
            <div className="sm:flex sm:items-start">
              <div className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-secondary-100 sm:mx-0 sm:h-10 sm:w-10">
                <FiHeart className="h-6 w-6 text-secondary-600" />
              </div>
              <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                <h3 className="text-lg leading-6 font-medium text-gray-900">
                  Support {musicianName}
                </h3>
                {songTitle && (
                  <p className="text-sm text-gray-500">
                    For the song: {songTitle}
                  </p>
                )}
                <div className="mt-4">
                  <p className="text-sm text-gray-500 mb-2">
                    Choose an amount to donate (80% goes directly to the artist)
                  </p>
                  
                  <div className="grid grid-cols-4 gap-2 mb-4">
                    {predefinedAmounts.map((amt) => (
                      <button
                        key={amt}
                        type="button"
                        className={`py-2 px-4 rounded-md ${
                          baseAmount === amt
                            ? 'bg-primary-600 text-white'
                            : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
                        }`}
                        onClick={() => setBaseAmount(amt)}
                      >
                        ${amt}
                      </button>
                    ))}
                  </div>
                  
                  <div className="mb-4">
                    <label htmlFor="custom-amount" className="block text-sm font-medium text-gray-700">
                      Custom amount
                    </label>
                    <div className="mt-1 relative rounded-md shadow-sm">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <FiDollarSign className="text-gray-400" />
                      </div>
                      <input
                        type="number"
                        name="custom-amount"
                        id="custom-amount"
                        className="focus:ring-primary-500 focus:border-primary-500 block w-full pl-7 pr-12 sm:text-sm border-gray-300 rounded-md"
                        placeholder="0.00"
                        min="1"
                        value={baseAmount}
                        onChange={(e) => setBaseAmount(Number(e.target.value))}
                      />
                    </div>
                  </div>
                  
                  <div className="mb-4 bg-gray-50 p-3 rounded-md">
                    <div className="flex items-center mb-1">
                      <FiInfo className="text-gray-500 mr-2" size={16} />
                      <span className="text-sm font-medium text-gray-700">Donation Summary</span>
                    </div>
                    <div className="text-sm text-gray-600 space-y-1">
                      <div className="flex justify-between">
                        <span>Base donation:</span>
                        <span>${baseAmount.toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Processing fee (2.9% + $0.30):</span>
                        <span>${processingFee.toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between font-medium pt-1 border-t border-gray-200 mt-1">
                        <span>Total amount:</span>
                        <span>${totalAmount.toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between text-xs text-gray-500 pt-1">
                        <span>Artist receives:</span>
                        <span>${(baseAmount * 0.8).toFixed(2)} (80%)</span>
                      </div>
                      <div className="flex justify-between text-xs text-gray-500">
                        <span>Platform fee:</span>
                        <span>${(baseAmount * 0.2).toFixed(2)} (20%)</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="mb-4">
                    <label htmlFor="message" className="block text-sm font-medium text-gray-700">
                      Add a personal message (optional)
                    </label>
                    <div className="mt-1">
                      <textarea
                        id="message"
                        name="message"
                        rows={3}
                        className="shadow-sm focus:ring-primary-500 focus:border-primary-500 block w-full sm:text-sm border-gray-300 rounded-md"
                        placeholder="Your message to the artist..."
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                      ></textarea>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
            <button
              type="button"
              className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-secondary-600 text-base font-medium text-white hover:bg-secondary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-secondary-500 sm:ml-3 sm:w-auto sm:text-sm"
              onClick={handleDonate}
              disabled={isProcessing || baseAmount <= 0}
            >
              {isProcessing ? 'Processing...' : `Donate $${totalAmount.toFixed(2)}`}
            </button>
            <button
              type="button"
              className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
              onClick={onClose}
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default DonationModal
