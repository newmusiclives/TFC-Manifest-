import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaSearch, FaFilter, FaHeart, FaRegHeart, FaPlay, FaPause } from 'react-icons/fa';

const Discover = () => {
  const [activeFilter, setActiveFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [currentlyPlaying, setCurrentlyPlaying] = useState<string | null>(null);
  const [favorites, setFavorites] = useState<string[]>([]);

  // Mock data for artists
  const artists = [
    {
      id: '1',
      name: 'Electric Pulse',
      genre: 'Electronic',
      location: 'Los Angeles, CA',
      image: 'https://images.pexels.com/photos/1699161/pexels-photo-1699161.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',
      popular: true,
      trending: true,
      featured: true
    },
    {
      id: '2',
      name: 'Midnight Serenade',
      genre: 'Jazz',
      location: 'New Orleans, LA',
      image: 'https://images.pexels.com/photos/4406759/pexels-photo-4406759.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',
      popular: true,
      trending: false,
      featured: true
    },
    {
      id: '3',
      name: 'Velvet Thunder',
      genre: 'Rock',
      location: 'Seattle, WA',
      image: 'https://images.pexels.com/photos/1105666/pexels-photo-1105666.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',
      popular: true,
      trending: true,
      featured: false
    },
    {
      id: '4',
      name: 'Urban Echo',
      genre: 'Hip Hop',
      location: 'Atlanta, GA',
      image: 'https://images.pexels.com/photos/1309240/pexels-photo-1309240.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',
      popular: false,
      trending: true,
      featured: true
    },
    {
      id: '5',
      name: 'Acoustic Dreams',
      genre: 'Folk',
      location: 'Portland, OR',
      image: 'https://images.pexels.com/photos/1644616/pexels-photo-1644616.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',
      popular: false,
      trending: false,
      featured: true
    },
    {
      id: '6',
      name: 'Neon Horizon',
      genre: 'Synthwave',
      location: 'Miami, FL',
      image: 'https://images.pexels.com/photos/1540406/pexels-photo-1540406.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',
      popular: true,
      trending: true,
      featured: false
    },
    {
      id: '7',
      name: 'Soul Collective',
      genre: 'R&B',
      location: 'Chicago, IL',
      image: 'https://images.pexels.com/photos/1460037/pexels-photo-1460037.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',
      popular: true,
      trending: false,
      featured: true
    },
    {
      id: '8',
      name: 'Rhythm Rebels',
      genre: 'Funk',
      location: 'Detroit, MI',
      image: 'https://images.pexels.com/photos/210922/pexels-photo-210922.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',
      popular: false,
      trending: true,
      featured: false
    }
  ];

  // Filter artists based on active filter and search query
  const filteredArtists = artists.filter(artist => {
    const matchesFilter = 
      activeFilter === 'all' || 
      (activeFilter === 'popular' && artist.popular) ||
      (activeFilter === 'trending' && artist.trending) ||
      (activeFilter === 'featured' && artist.featured);
    
    const matchesSearch = 
      searchQuery === '' || 
      artist.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      artist.genre.toLowerCase().includes(searchQuery.toLowerCase()) ||
      artist.location.toLowerCase().includes(searchQuery.toLowerCase());
    
    return matchesFilter && matchesSearch;
  });

  const toggleFavorite = (id: string) => {
    if (favorites.includes(id)) {
      setFavorites(favorites.filter(favId => favId !== id));
    } else {
      setFavorites([...favorites, id]);
    }
  };

  const togglePlay = (id: string) => {
    if (currentlyPlaying === id) {
      setCurrentlyPlaying(null);
    } else {
      setCurrentlyPlaying(id);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-16 pb-12">
      <div className="container mx-auto px-4">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Discover Artists</h1>
          <p className="text-gray-600">Find your next favorite musician</p>
        </div>

        {/* Search and filters */}
        <div className="mb-8">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-grow">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FaSearch className="text-gray-400" />
              </div>
              <input
                type="text"
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
                placeholder="Search by name, genre, or location"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <div className="flex items-center gap-2">
              <div className="p-2 bg-white rounded-md shadow-sm border border-gray-300">
                <FaFilter className="text-gray-500" />
              </div>
              <button
                className={`px-4 py-2 rounded-md ${
                  activeFilter === 'all' ? 'bg-primary-600 text-white' : 'bg-white text-gray-700 border border-gray-300'
                }`}
                onClick={() => setActiveFilter('all')}
              >
                All
              </button>
              <button
                className={`px-4 py-2 rounded-md ${
                  activeFilter === 'popular' ? 'bg-primary-600 text-white' : 'bg-white text-gray-700 border border-gray-300'
                }`}
                onClick={() => setActiveFilter('popular')}
              >
                Popular
              </button>
              <button
                className={`px-4 py-2 rounded-md ${
                  activeFilter === 'trending' ? 'bg-primary-600 text-white' : 'bg-white text-gray-700 border border-gray-300'
                }`}
                onClick={() => setActiveFilter('trending')}
              >
                Trending
              </button>
              <button
                className={`px-4 py-2 rounded-md ${
                  activeFilter === 'featured' ? 'bg-primary-600 text-white' : 'bg-white text-gray-700 border border-gray-300'
                }`}
                onClick={() => setActiveFilter('featured')}
              >
                Featured
              </button>
            </div>
          </div>
        </div>

        {/* Artists grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredArtists.map((artist) => (
            <div key={artist.id} className="bg-white rounded-lg shadow-md overflow-hidden transition-transform hover:transform hover:scale-105">
              <div className="relative h-48 overflow-hidden">
                <img 
                  src={artist.image} 
                  alt={artist.name} 
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex flex-col justify-end p-4">
                  <div className="flex justify-between items-center">
                    <button 
                      onClick={() => togglePlay(artist.id)}
                      className="bg-primary-600 hover:bg-primary-700 text-white p-3 rounded-full shadow-lg transition-colors"
                    >
                      {currentlyPlaying === artist.id ? <FaPause /> : <FaPlay />}
                    </button>
                    <button 
                      onClick={() => toggleFavorite(artist.id)}
                      className="text-white p-2"
                    >
                      {favorites.includes(artist.id) ? 
                        <FaHeart className="text-red-500 text-xl" /> : 
                        <FaRegHeart className="text-white text-xl" />
                      }
                    </button>
                  </div>
                </div>
              </div>
              <div className="p-4">
                <Link to={`/musician/${artist.id}`} className="block">
                  <h3 className="text-lg font-semibold text-gray-900 hover:text-primary-600">{artist.name}</h3>
                </Link>
                <p className="text-sm text-gray-600">{artist.genre}</p>
                <p className="text-xs text-gray-500 mt-1">{artist.location}</p>
                <div className="mt-3 flex flex-wrap gap-2">
                  {artist.popular && (
                    <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">Popular</span>
                  )}
                  {artist.trending && (
                    <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full">Trending</span>
                  )}
                  {artist.featured && (
                    <span className="px-2 py-1 bg-purple-100 text-purple-800 text-xs rounded-full">Featured</span>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredArtists.length === 0 && (
          <div className="text-center py-12">
            <h3 className="text-lg font-medium text-gray-900 mb-2">No artists found</h3>
            <p className="text-gray-600">Try adjusting your search or filters</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Discover;
