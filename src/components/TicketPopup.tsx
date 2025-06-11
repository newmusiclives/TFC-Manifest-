import { useState } from 'react'
import { FiX, FiCalendar, FiMapPin, FiClock, FiDollarSign } from 'react-icons/fi'

interface TicketPopupProps {
  isOpen: boolean
  onClose: () => void
}

const TicketPopup: React.FC<TicketPopupProps> = ({ isOpen, onClose }) => {
  const [ticketCount, setTicketCount] = useState(1)
  const [email, setEmail] = useState('')
  const [name, setName] = useState('')
  
  const ticketPrice = 15
  const serviceFee = 2
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // In a real app, this would process the ticket purchase
    alert(`Thank you for purchasing ${ticketCount} tickets! A confirmation has been sent to ${email}.`)
    onClose()
  }
  
  if (!isOpen) return null
  
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-xl max-w-md w-full p-6">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-bold text-gray-800 dark:text-white">
            Purchase Tickets
          </h3>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
          >
            <FiX size={24} />
          </button>
        </div>
        
        <div className="mb-6">
          <h4 className="text-lg font-semibold text-gray-800 dark:text-white mb-2">
            Event Details
          </h4>
          <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
            <div className="flex items-start mb-2">
              <FiCalendar className="mt-1 mr-2 text-gray-500 dark:text-gray-400" />
              <div>
                <p className="font-medium text-gray-800 dark:text-white">
                  Live Music Showcase
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  November 15, 2023
                </p>
              </div>
            </div>
            <div className="flex items-start mb-2">
              <FiClock className="mt-1 mr-2 text-gray-500 dark:text-gray-400" />
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  Doors open: 7:00 PM
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  Show starts: 8:00 PM
                </p>
              </div>
            </div>
            <div className="flex items-start">
              <FiMapPin className="mt-1 mr-2 text-gray-500 dark:text-gray-400" />
              <div>
                <p className="font-medium text-gray-800 dark:text-white">
                  The Sound Garden
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  123 Music Ave, Austin, TX
                </p>
              </div>
            </div>
          </div>
        </div>
        
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Number of Tickets
            </label>
            <div className="flex items-center">
              <button
                type="button"
                onClick={() => setTicketCount(Math.max(1, ticketCount - 1))}
                className="px-3 py-2 bg-gray-100 dark:bg-gray-700 rounded-l-md text-gray-700 dark:text-gray-300"
              >
                -
              </button>
              <input
                type="number"
                min="1"
                value={ticketCount}
                onChange={(e) => setTicketCount(Math.max(1, parseInt(e.target.value) || 1))}
                className="w-16 text-center py-2 border-y border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
              />
              <button
                type="button"
                onClick={() => setTicketCount(ticketCount + 1)}
                className="px-3 py-2 bg-gray-100 dark:bg-gray-700 rounded-r-md text-gray-700 dark:text-gray-300"
              >
                +
              </button>
            </div>
          </div>
          
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Your Name
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="input"
              placeholder="Enter your full name"
              required
            />
          </div>
          
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Email Address
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="input"
              placeholder="Enter your email"
              required
            />
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
              Your tickets will be sent to this email address.
            </p>
          </div>
          
          <div className="border-t border-gray-200 dark:border-gray-700 pt-4 mb-6">
            <div className="flex justify-between mb-2">
              <span className="text-gray-600 dark:text-gray-300">Tickets ({ticketCount} × ${ticketPrice})</span>
              <span className="text-gray-800 dark:text-white">${ticketCount * ticketPrice}</span>
            </div>
            <div className="flex justify-between mb-2">
              <span className="text-gray-600 dark:text-gray-300">Service Fee ({ticketCount} × ${serviceFee})</span>
              <span className="text-gray-800 dark:text-white">${ticketCount * serviceFee}</span>
            </div>
            <div className="flex justify-between font-bold">
              <span className="text-gray-800 dark:text-white">Total</span>
              <span className="text-primary-600 dark:text-primary-400">${ticketCount * (ticketPrice + serviceFee)}</span>
            </div>
          </div>
          
          <div className="flex justify-end space-x-3">
            <button
              type="button"
              onClick={onClose}
              className="btn btn-outline"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="btn btn-primary flex items-center"
            >
              <FiDollarSign className="mr-2" />
              Purchase Tickets
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default TicketPopup
