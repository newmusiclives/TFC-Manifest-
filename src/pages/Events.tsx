import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import { FaCalendarAlt, FaMapMarkerAlt, FaClock, FaSearch, FaFilter, FaPlus } from 'react-icons/fa';
import toast from 'react-hot-toast';

// Types
interface Event {
  id: string;
  title: string;
  description: string;
  date: string;
  time: string;
  location: string;
  venue_name: string;
  image_url: string;
  price: number;
  created_at: string;
  user_id: string;
}

const Events = () => {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('all');
  const [sortBy, setSortBy] = useState('date-asc');

  useEffect(() => {
    fetchEvents();
  }, [filterType, sortBy]);

  const fetchEvents = async () => {
    try {
      setLoading(true);
      
      // Start building the query
      let query = supabase
        .from('events')
        .select('*');
      
      // Apply filters
      if (filterType === 'upcoming') {
        query = query.gte('date', new Date().toISOString().split('T')[0]);
      } else if (filterType === 'past') {
        query = query.lt('date', new Date().toISOString().split('T')[0]);
      }
      
      // Apply sorting
      if (sortBy === 'date-asc') {
        query = query.order('date', { ascending: true });
      } else if (sortBy === 'date-desc') {
        query = query.order('date', { ascending: false });
      } else if (sortBy === 'price-asc') {
        query = query.order('price', { ascending: true });
      } else if (sortBy === 'price-desc') {
        query = query.order('price', { ascending: false });
      }
      
      const { data, error } = await query;
      
      if (error) throw error;
      
      // For demo purposes, create some sample events if none exist
      if (!data || data.length === 0) {
        const sampleEvents = generateSampleEvents();
        setEvents(sampleEvents);
      } else {
        setEvents(data as Event[]);
      }
    } catch (error: any) {
      console.error('Error fetching events:', error);
      toast.error('Failed to load events');
    } finally {
      setLoading(false);
    }
  };

  // Function to generate sample events for demo purposes
  const generateSampleEvents = (): Event[] => {
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);
    
    const nextWeek = new Date(today);
    nextWeek.setDate(nextWeek.getDate() + 7);
    
    const lastWeek = new Date(today);
    lastWeek.setDate(lastWeek.getDate() - 7);
    
    return [
      {
        id: '1',
        title: 'Summer Music Festival',
        description: 'A three-day music festival featuring top artists from around the world.',
        date: tomorrow.toISOString().split('T')[0],
        time: '16:00',
        location: 'Central Park, New York',
        venue_name: 'Main Stage',
        image_url: 'https://images.pexels.com/photos/1105666/pexels-photo-1105666.jpeg',
        price: 75,
        created_at: new Date().toISOString(),
        user_id: '123'
      },
      {
        id: '2',
        title: 'Jazz Night',
        description: 'An evening of smooth jazz with local musicians.',
        date: nextWeek.toISOString().split('T')[0],
        time: '20:00',
        location: 'Blue Note, Chicago',
        venue_name: 'Blue Note Jazz Club',
        image_url: 'https://images.pexels.com/photos/4101143/pexels-photo-4101143.jpeg',
        price: 25,
        created_at: new Date().toISOString(),
        user_id: '123'
      },
      {
        id: '3',
        title: 'Rock Concert',
        description: 'A high-energy rock concert featuring local bands.',
        date: today.toISOString().split('T')[0],
        time: '19:30',
        location: 'The Fillmore, San Francisco',
        venue_name: 'The Fillmore',
        image_url: 'https://images.pexels.com/photos/1190297/pexels-photo-1190297.jpeg',
        price: 35,
        created_at: new Date().toISOString(),
        user_id: '123'
      },
      {
        id: '4',
        title: 'Classical Symphony',
        description: 'A night of classical music performed by the city symphony.',
        date: lastWeek.toISOString().split('T')[0],
        time: '18:00',
        location: 'Symphony Hall, Boston',
        venue_name: 'Symphony Hall',
        image_url: 'https://images.pexels.com/photos/995301/pexels-photo-995301.jpeg',
        price: 50,
        created_at: new Date().toISOString(),
        user_id: '123'
      },
      {
        id: '5',
        title: 'Electronic Dance Party',
        description: 'A night of electronic music with top DJs.',
        date: nextWeek.toISOString().split('T')[0],
        time: '22:00',
        location: 'Club Space, Miami',
        venue_name: 'Club Space',
        image_url: 'https://images.pexels.com/photos/1540406/pexels-photo-1540406.jpeg',
        price: 40,
        created_at: new Date().toISOString(),
        user_id: '123'
      }
    ];
  };

  // Filter events based on search term
  const filteredEvents = events.filter(event => 
    event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    event.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
    event.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
    event.venue_name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Format date to be more readable
  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Events</h1>
        <Link 
          to="/events/create" 
          className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          <FaPlus className="mr-2" />
          Create Event
        </Link>
      </div>

      {/* Search and filters */}
      <div className="bg-white p-4 rounded-lg shadow mb-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
          <div className="relative flex-1 max-w-md">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <FaSearch className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              placeholder="Search events..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-4">
            <div className="flex items-center">
              <FaFilter className="mr-2 text-gray-500" />
              <select
                className="block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
                value={filterType}
                onChange={(e) => setFilterType(e.target.value)}
              >
                <option value="all">All Events</option>
                <option value="upcoming">Upcoming</option>
                <option value="past">Past</option>
              </select>
            </div>
            
            <div className="flex items-center">
              <span className="mr-2 text-gray-500">Sort:</span>
              <select
                className="block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
              >
                <option value="date-asc">Date (Earliest)</option>
                <option value="date-desc">Date (Latest)</option>
                <option value="price-asc">Price (Low to High)</option>
                <option value="price-desc">Price (High to Low)</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Events list */}
      {loading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      ) : filteredEvents.length === 0 ? (
        <div className="bg-white p-8 rounded-lg shadow text-center">
          <h3 className="text-lg font-medium text-gray-900 mb-2">No events found</h3>
          <p className="text-gray-500 mb-4">Try adjusting your search or filters, or create a new event.</p>
          <Link 
            to="/events/create" 
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            <FaPlus className="mr-2" />
            Create Event
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredEvents.map((event) => (
            <Link 
              key={event.id} 
              to={`/events/${event.id}`}
              className="bg-white rounded-lg shadow overflow-hidden hover:shadow-lg transition-shadow duration-300"
            >
              <div className="h-48 overflow-hidden">
                <img 
                  src={event.image_url || 'https://images.pexels.com/photos/1105666/pexels-photo-1105666.jpeg'} 
                  alt={event.title} 
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-4">
                <h3 className="text-lg font-semibold text-gray-900 mb-1">{event.title}</h3>
                <p className="text-gray-600 text-sm mb-3 line-clamp-2">{event.description}</p>
                
                <div className="flex items-center text-gray-500 text-sm mb-2">
                  <FaCalendarAlt className="mr-2" />
                  <span>{formatDate(event.date)}</span>
                </div>
                
                <div className="flex items-center text-gray-500 text-sm mb-2">
                  <FaClock className="mr-2" />
                  <span>{event.time}</span>
                </div>
                
                <div className="flex items-center text-gray-500 text-sm mb-3">
                  <FaMapMarkerAlt className="mr-2" />
                  <span>{event.venue_name}, {event.location}</span>
                </div>
                
                <div className="flex justify-between items-center">
                  <span className="text-blue-600 font-semibold">
                    {event.price === 0 ? 'Free' : `$${event.price.toFixed(2)}`}
                  </span>
                  <span className="text-xs text-gray-500">
                    {new Date(event.date) > new Date() ? 'Upcoming' : 'Past'}
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default Events;
