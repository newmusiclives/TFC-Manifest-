import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FiSearch, FiFilter, FiMusic, FiMapPin, FiCalendar, FiHeart } from 'react-icons/fi';
import { supabase } from '../lib/supabase';

interface Artist {
  id: string;
  name: string;
  genre: string;
  location: string;
  image_url: string;
  bio: string;
  upcoming_shows: number;
  followers: number;
}

const Artists = () => {
  const [artists, setArtists] = useState<Artist[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedGenre, setSelectedGenre] = useState('');
  const [selectedLocation, setSelectedLocation] = useState('');

  // Mock data for artists
  const mockArtists: Artist[] = [
    {
      id: '1',
      name: 'Sarah Johnson',
      genre: 'Folk',
      location: 'Portland, OR',
      image_url: 'https://images.pexels.com/photos/1699159/pexels-photo-1699159.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      bio: 'Sarah is a folk singer-songwriter known for her heartfelt lyrics and acoustic melodies.',
      upcoming_shows: 3,
      followers: 1250
    },
    {
      id: '2',
      name: 'The Midnight Echoes',
      genre: 'Indie Rock',
      location: 'Seattle, WA',
      image_url: 'https://images.pexels.com/photos/1105666/pexels-photo-1105666.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      bio: 'A four-piece indie rock band with influences ranging from classic rock to modern alternative.',
      upcoming_shows: 5,
      followers: 2800
    },
    {
      id: '3',
      name: 'Marcus Rivera',
      genre: 'Jazz',
      location: 'New Orleans, LA',
      image_url: 'https://images.pexels.com/photos/4406759/pexels-photo-4406759.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      bio: 'Saxophone virtuoso blending traditional jazz with contemporary influences.',
      upcoming_shows: 2,
      followers: 1800
    },
    {
      id: '4',
      name: 'Electronic Dreams',
      genre: 'Electronic',
      location: 'Los Angeles, CA',
      image_url: 'https://images.pexels.com/photos/1763075/pexels-photo-1763075.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      bio: 'Creating immersive electronic soundscapes that transport listeners to another dimension.',
      upcoming_shows: 4,
      followers: 3500
    },
    {
      id: '5',
      name: 'Harmony Heights',
      genre: 'Pop',
      location: 'Nashville, TN',
      image_url: 'https://images.pexels.com/photos/1460037/pexels-photo-1460037.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      bio: 'A pop duo known for their catchy hooks and beautiful harmonies.',
      upcoming_shows: 6,
      followers: 4200
    },
    {
      id: '6',
      name: 'Rhythm Collective',
      genre: 'R&B',
      location: 'Atlanta, GA',
      image_url: 'https://images.pexels.com/photos/1309240/pexels-photo-1309240.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      bio: 'A collective of R&B artists bringing soul back to modern music.',
      upcoming_shows: 3,
      followers: 2900
    },
    {
      id: '7',
      name: 'Mountain Sound',
      genre: 'Bluegrass',
      location: 'Denver, CO',
      image_url: 'https://images.pexels.com/photos/1327430/pexels-photo-1327430.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      bio: 'Traditional bluegrass with a modern twist, featuring virtuosic instrumentals.',
      upcoming_shows: 2,
      followers: 1650
    },
    {
      id: '8',
      name: 'Luna Park',
      genre: 'Alternative',
      location: 'Chicago, IL',
      image_url: 'https://images.pexels.com/photos/1644616/pexels-photo-1644616.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      bio: 'Alternative rock band known for their energetic live performances and thoughtful lyrics.',
      upcoming_shows: 4,
      followers: 3100
    }
  ];

  // Genres and locations for filters
  const genres = ['Folk', 'Indie Rock', 'Jazz', 'Electronic', 'Pop', 'R&B', 'Bluegrass', 'Alternative'];
  const locations = ['Portland, OR', 'Seattle, WA', 'New Orleans, LA', 'Los Angeles, CA', 'Nashville, TN', 'Atlanta, GA', 'Denver, CO', 'Chicago, IL'];

  useEffect(() => {
    // In a real app, we would fetch artists from Supabase
    // const fetchArtists = async () => {
    //   try {
    //     const { data, error } = await supabase
    //       .from('artists')
    //       .select('*');
    //
    //     if (error) throw error;
    //     setArtists(data || []);
    //   } catch (error) {
    //     console.error('Error fetching artists:', error);
    //   } finally {
    //     setLoading(false);
    //   }
    // };
    
    // For demo purposes, use mock data
    const fetchMockArtists = () => {
      setTimeout(() => {
        setArtists(mockArtists);
        setLoading(false);
      }, 800); // Simulate loading delay
    };
    
    fetchMockArtists();
  }, []);

  // Filter artists based on search term and filters
  const filteredArtists = artists.filter(artist => {
    const matchesSearch = artist.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          artist.bio.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesGenre = selectedGenre ? artist.genre === selectedGenre : true;
    const matchesLocation = selectedLocation ? artist.location === selectedLocation : true;
    
    return matchesSearch && matchesGenre && matchesLocation;
  });

  // Handle following an artist
  const handleFollowArtist = (artistId: string) => {
    // In a real app, we would update the database
    // For demo purposes, just update the UI
    setArtists(prevArtists => 
      prevArtists.map(artist => 
        artist.id === artistId 
          ? { ...artist, followers: artist.followers + 1 } 
          : artist
      )
    );
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Discover Artists</h1>
        <p className="text-gray-600">Find and support independent musicians in your area and beyond.</p>
      </div>
      
      {/* Search and Filters */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        <div className="flex flex-col md:flex-row md:items-center space-y-4 md:space-y-0 md:space-x-4">
          <div className="flex-1 relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <FiSearch className="text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Search artists by name or description..."
              className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FiMusic className="text-gray-400" />
              </div>
              <select
                className="block w-full pl-10 pr-10 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                value={selectedGenre}
                onChange={(e) => setSelectedGenre(e.target.value)}
              >
                <option value="">All Genres</option>
                {genres.map((genre) => (
                  <option key={genre} value={genre}>{genre}</option>
                ))}
              </select>
            </div>
            
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FiMapPin className="text-gray-400" />
              </div>
              <select
                className="block w-full pl-10 pr-10 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                value={selectedLocation}
                onChange={(e) => setSelectedLocation(e.target.value)}
              >
                <option value="">All Locations</option>
                {locations.map((location) => (
                  <option key={location} value={location}>{location}</option>
                ))}
              </select>
            </div>
            
            <button
              className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              onClick={() => {
                setSearchTerm('');
                setSelectedGenre('');
                setSelectedLocation('');
              }}
            >
              <FiFilter className="mr-2" />
              Reset Filters
            </button>
          </div>
        </div>
      </div>
      
      {/* Artists Grid */}
      {loading ? (
        <div className="flex justify-center items-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      ) : filteredArtists.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredArtists.map((artist) => (
            <div key={artist.id} className="bg-white rounded-lg shadow-md overflow-hidden transition-transform duration-300 hover:shadow-lg hover:-translate-y-1">
              <div className="relative h-48 overflow-hidden">
                <img 
                  src={artist.image_url} 
                  alt={artist.name} 
                  className="w-full h-full object-cover"
                />
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
                  <h3 className="text-white font-bold text-lg">{artist.name}</h3>
                  <p className="text-white/80 text-sm">{artist.genre}</p>
                </div>
              </div>
              
              <div className="p-4">
                <div className="flex items-center text-gray-600 text-sm mb-2">
                  <FiMapPin className="mr-1" />
                  {artist.location}
                </div>
                
                <p className="text-gray-700 text-sm mb-4 line-clamp-2">
                  {artist.bio}
                </p>
                
                <div className="flex justify-between items-center mb-4">
                  <div className="flex items-center text-gray-600 text-sm">
                    <FiCalendar className="mr-1" />
                    {artist.upcoming_shows} upcoming shows
                  </div>
                  
                  <div className="flex items-center text-gray-600 text-sm">
                    <FiHeart className="mr-1" />
                    {artist.followers.toLocaleString()} followers
                  </div>
                </div>
                
                <div className="flex space-x-2">
                  <Link 
                    to={`/artists/${artist.id}`}
                    className="flex-1 inline-flex justify-center items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                  >
                    View Profile
                  </Link>
                  
                  <button
                    onClick={() => handleFollowArtist(artist.id)}
                    className="inline-flex justify-center items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                  >
                    <FiHeart className="mr-2" />
                    Follow
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="bg-white rounded-lg shadow-md p-8 text-center">
          <h3 className="text-xl font-semibold text-gray-800 mb-2">No artists found</h3>
          <p className="text-gray-600 mb-4">
            We couldn't find any artists matching your search criteria.
          </p>
          <button
            onClick={() => {
              setSearchTerm('');
              setSelectedGenre('');
              setSelectedLocation('');
            }}
            className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Clear Filters
          </button>
        </div>
      )}
      
      {/* Featured Artists Section */}
      {!loading && filteredArtists.length > 0 && searchTerm === '' && !selectedGenre && !selectedLocation && (
        <div className="mt-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Featured Artists</h2>
          
          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-6 shadow-sm">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex flex-col justify-center">
                <span className="text-blue-600 font-semibold mb-2">Featured Artist</span>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">The Midnight Echoes</h3>
                <p className="text-gray-700 mb-4">
                  A four-piece indie rock band with influences ranging from classic rock to modern alternative. Known for their energetic live performances and thoughtful lyrics.
                </p>
                <div className="flex space-x-4 mb-4">
                  <div className="flex items-center text-gray-600">
                    <FiMapPin className="mr-1" />
                    Seattle, WA
                  </div>
                  <div className="flex items-center text-gray-600">
                    <FiCalendar className="mr-1" />
                    5 upcoming shows
                  </div>
                </div>
                <div>
                  <Link 
                    to="/artists/2"
                    className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                  >
                    View Profile
                  </Link>
                </div>
              </div>
              
              <div className="relative h-64 md:h-auto rounded-lg overflow-hidden">
                <img 
                  src="https://images.pexels.com/photos/1105666/pexels-photo-1105666.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" 
                  alt="The Midnight Echoes" 
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      )}
      
      {/* Trending Artists Section */}
      {!loading && filteredArtists.length > 0 && searchTerm === '' && !selectedGenre && !selectedLocation && (
        <div className="mt-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Trending This Week</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {mockArtists.slice(0, 3).map((artist) => (
              <div key={`trending-${artist.id}`} className="bg-white rounded-lg shadow-md overflow-hidden">
                <div className="relative h-40 overflow-hidden">
                  <img 
                    src={artist.image_url} 
                    alt={artist.name} 
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-2 right-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full">
                    Trending
                  </div>
                </div>
                
                <div className="p-4">
                  <h3 className="font-bold text-gray-900">{artist.name}</h3>
                  <p className="text-gray-600 text-sm mb-3">{artist.genre} • {artist.location}</p>
                  
                  <Link 
                    to={`/artists/${artist.id}`}
                    className="text-blue-600 hover:text-blue-800 text-sm font-medium"
                  >
                    View Profile →
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
      
      {/* Join as Artist CTA */}
      <div className="mt-16 bg-gradient-to-r from-blue-600 to-indigo-700 rounded-xl p-8 text-white shadow-lg">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">Are you a musician?</h2>
          <p className="text-lg mb-6 opacity-90">
            Join TrueFans CONNECT™ to showcase your music, connect with fans, and earn direct support through our platform.
          </p>
          <Link 
            to="/register"
            className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-blue-700 bg-white hover:bg-blue-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-blue-700 focus:ring-white"
          >
            Join as an Artist
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Artists;
