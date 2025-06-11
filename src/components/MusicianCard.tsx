import { Link } from 'react-router-dom';

interface MusicianCardProps {
  id: string;
  name: string;
  profilePhoto: string;
  genre: string[];
  location: string;
  bio: string;
  songCount: number;
}

const MusicianCard = ({
  id,
  name,
  profilePhoto,
  genre,
  location,
  bio,
  songCount,
}: MusicianCardProps) => {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden h-full transition-transform hover:scale-[1.02] hover:shadow-lg">
      <Link to={`/musician/${id}`} className="block">
        <div className="h-48 overflow-hidden">
          <img
            src={profilePhoto || 'https://images.pexels.com/photos/1699161/pexels-photo-1699161.jpeg'}
            alt={`${name}'s profile`}
            className="w-full h-full object-cover transition-transform hover:scale-105"
          />
        </div>
        <div className="p-4">
          <h3 className="text-xl font-bold mb-1 truncate">{name}</h3>
          <div className="flex flex-wrap gap-1 mb-2">
            {genre.slice(0, 2).map((g, index) => (
              <span
                key={index}
                className="text-xs px-2 py-1 bg-primary-100 dark:bg-primary-900 text-primary-800 dark:text-primary-200 rounded-full"
              >
                {g}
              </span>
            ))}
          </div>
          <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">{location}</p>
          <p className="text-sm text-gray-600 dark:text-gray-300 line-clamp-2 mb-3">{bio}</p>
          <div className="flex justify-between items-center text-sm">
            <span className="text-gray-500 dark:text-gray-400">{songCount} songs</span>
            <span className="text-primary-600 dark:text-primary-400 font-medium">View Profile</span>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default MusicianCard;
