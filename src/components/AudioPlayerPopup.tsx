import { useState, useEffect } from 'react'
import { FiX, FiPlay, FiPause, FiVolume2, FiVolumeX } from 'react-icons/fi'

interface AudioPlayerPopupProps {
  isOpen: boolean
  onClose: () => void
  musicianName: string
  songTitle: string
}

const AudioPlayerPopup: React.FC<AudioPlayerPopupProps> = ({
  isOpen,
  onClose,
  musicianName,
  songTitle
}) => {
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(180) // Default 3 minutes
  const [volume, setVolume] = useState(80)
  const [isMuted, setIsMuted] = useState(false)
  
  // Mock audio playback
  useEffect(() => {
    let interval: NodeJS.Timeout | null = null
    
    if (isOpen && isPlaying) {
      interval = setInterval(() => {
        setCurrentTime((prevTime) => {
          if (prevTime >= duration) {
            setIsPlaying(false)
            return 0
          }
          return prevTime + 1
        })
      }, 1000)
    }
    
    return () => {
      if (interval) clearInterval(interval)
    }
  }, [isOpen, isPlaying, duration])
  
  // Reset player when opened
  useEffect(() => {
    if (isOpen) {
      setCurrentTime(0)
      setIsPlaying(true)
    }
  }, [isOpen])
  
  const togglePlay = () => {
    setIsPlaying(!isPlaying)
  }
  
  const toggleMute = () => {
    setIsMuted(!isMuted)
  }
  
  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = parseInt(e.target.value)
    setVolume(newVolume)
    if (newVolume === 0) {
      setIsMuted(true)
    } else {
      setIsMuted(false)
    }
  }
  
  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newTime = parseInt(e.target.value)
    setCurrentTime(newTime)
  }
  
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = Math.floor(seconds % 60)
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`
  }
  
  if (!isOpen) return null
  
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-xl max-w-md w-full p-6">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-bold text-gray-800 dark:text-white">
            Now Playing
          </h3>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
          >
            <FiX size={24} />
          </button>
        </div>
        
        <div className="flex flex-col items-center mb-6">
          <div className="w-32 h-32 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-full flex items-center justify-center mb-4">
            <span className="text-4xl font-bold text-white">
              {musicianName.charAt(0)}
            </span>
          </div>
          <h4 className="text-lg font-semibold text-gray-800 dark:text-white">
            {songTitle}
          </h4>
          <p className="text-gray-600 dark:text-gray-300">
            {musicianName}
          </p>
        </div>
        
        <div className="mb-4">
          <div className="flex justify-between text-sm text-gray-500 dark:text-gray-400 mb-1">
            <span>{formatTime(currentTime)}</span>
            <span>{formatTime(duration)}</span>
          </div>
          <input
            type="range"
            min="0"
            max={duration}
            value={currentTime}
            onChange={handleSeek}
            className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer"
          />
        </div>
        
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <button
              onClick={toggleMute}
              className="text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white mr-2"
            >
              {isMuted ? <FiVolumeX size={20} /> : <FiVolume2 size={20} />}
            </button>
            <input
              type="range"
              min="0"
              max="100"
              value={isMuted ? 0 : volume}
              onChange={handleVolumeChange}
              className="w-20 h-2 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer"
            />
          </div>
          
          <button
            onClick={togglePlay}
            className="w-12 h-12 flex items-center justify-center rounded-full bg-primary-600 text-white hover:bg-primary-700"
          >
            {isPlaying ? <FiPause size={24} /> : <FiPlay size={24} />}
          </button>
          
          <div className="w-24"></div> {/* Spacer for balance */}
        </div>
      </div>
    </div>
  )
}

export default AudioPlayerPopup
