import React, { useState } from 'react';
import { FiPlay, FiPause, FiDownload, FiHeart } from 'react-icons/fi';

interface SongCardProps {
  id: string;
  title: string;
  artist: string;
  genre: string | string[];
  duration: number;
  coverImage?: string;
  onPlay: (id: string, title: string, artist: string) => void;
}

const SongCard: React.FC<SongCardProps> = ({
  id,
  title,
  artist,
  genre,
  duration,
  coverImage,
  onPlay
}) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  
  const handlePlayClick = () => {
    setIsPlaying(!isPlaying);
    if (!isPlaying) {
      onPlay(id, title, artist);
    }
  };
  
  const handleLikeClick = () => {
    setIsLiked(!isLiked);
  };
  
  const formatDuration = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };
  
  // Handle genre as either string or array
  const renderGenres = () => {
    if (Array.isArray(genre)) {
      return genre.map((g, index) => (
        <span 
          key={index}
          className="inline-block bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 text-xs px-2 py-1 rounded mr-1 mb-1"
        >
          {g}
        </span>
      ));
    } else {
      return (
        <span className="inline-block bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 text-xs px-2 py-1 rounded mr-1 mb-1">
          {genre}
        </span>
      );
    }
  };
  
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
      <div className="relative">
        <img 
          src={coverImage || 'https://images.pexels.com/photos/1626481/pexels-photo-1626481.jpeg'} 
          alt={title}
          className="w-full h-48 object-cover"
        />
        <button
          onClick={handlePlayClick}
          className="absolute bottom-4 right-4 w-12 h-12 bg-primary-600 text-white rounded-full flex items-center justify-center shadow-lg hover:bg-primary-700 transition-colors duration-300"
        >
          {isPlaying ? <FiPause size={24} /> : <FiPlay size={24} />}
        </button>
      </div>
      
      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-1">{title}</h3>
        <p className="text-gray-600 dark:text-gray-300 mb-2">{artist}</p>
        
        <div className="flex flex-wrap mb-3">
          {renderGenres()}
        </div>
        
        <div className="flex justify-between items-center">
          <span className="text-sm text-gray-500 dark:text-gray-400">
            {formatDuration(duration)}
          </span>
          
          <div className="flex space-x-2">
            <button
              onClick={handleLikeClick}
              className={`p-2 rounded-full ${
                isLiked 
                  ? 'text-red-500 bg-red-50 dark:bg-red-900/20' 
                  : 'text-gray-400 hover:text-red-500 dark:text-gray-500 dark:hover:text-red-400'
              }`}
            >
              <FiHeart size={18} className={isLiked ? 'fill-current' : ''} />
            </button>
            
            <button className="p-2 rounded-full text-gray-400 hover:text-gray-600 dark:text-gray-500 dark:hover:text-gray-300">
              <FiDownload size={18} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SongCard;
