import { Link } from 'react-router-dom'
import { FiMapPin, FiMusic, FiArrowRight } from 'react-icons/fi'

interface MusicianCardProps {
  id: string
  name: string
  profilePhoto?: string
  genre: string[]
  location?: string
  bio?: string
  songCount: number
}

const MusicianCard: React.FC<MusicianCardProps> = ({
  id,
  name,
  profilePhoto,
  genre,
  location,
  bio,
  songCount
}) => {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow">
      <Link to={`/musician/${id}#top`} className="block">
        <div className="h-40 bg-gradient-to-r from-primary-500 to-secondary-500 relative">
          {profilePhoto ? (
            <img
              src={profilePhoto}
              alt={name}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-white text-4xl font-bold">
                {name.charAt(0)}
              </span>
            </div>
          )}
        </div>
        
        <div className="p-4">
          <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-1">{name}</h3>
          
          <div className="flex flex-wrap gap-1 mb-2">
            {genre.map((g, index) => (
              <span 
                key={index}
                className="text-xs bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 px-2 py-1 rounded-full"
              >
                {g}
              </span>
            ))}
          </div>
          
          {location && (
            <p className="text-sm text-gray-600 dark:text-gray-300 flex items-center mb-2">
              <FiMapPin className="mr-1" size={14} />
              {location}
            </p>
          )}
          
          {bio && (
            <p className="text-sm text-gray-600 dark:text-gray-300 mb-3 line-clamp-2">
              {bio}
            </p>
          )}
          
          <div className="flex items-center justify-between">
            <div className="flex items-center text-gray-500 dark:text-gray-400">
              <FiMusic className="mr-1" size={14} />
              <span className="text-xs">{songCount} {songCount === 1 ? 'song' : 'songs'}</span>
            </div>
          </div>
        </div>
      </Link>
      
      {/* View Details button - replaced Support Artist with View Details */}
      <div className="px-4 pb-4">
        <Link 
          to={`/musician/${id}#top`}
          className="w-full py-2 px-4 text-primary-600 hover:text-primary-700 border border-primary-600 hover:border-primary-700 bg-white rounded-md flex items-center justify-center text-sm transition-colors"
        >
          View Details
          <FiArrowRight className="ml-1" />
        </Link>
      </div>
    </div>
  )
}

export default MusicianCard
