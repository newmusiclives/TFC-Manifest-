import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import { FaCalendarAlt, FaMapMarkerAlt, FaClock, FaTicketAlt, FaUser, FaArrowLeft, FaEdit, FaTrash } from 'react-icons/fa';
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
  organizer_name?: string;
  capacity?: number;
  genre?: string;
  additional_info?: string;
}

const EventDetails = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [event, setEvent] = useState<Event | null>(null);
  const [loading, setLoading] = useState(true);
  const [isOwner, setIsOwner] = useState(false);
  const [deleteConfirm, setDeleteConfirm] = useState(false);

  useEffect(() => {
    fetchEventDetails();
  }, [id]);

  const fetchEventDetails = async () => {
    try {
      setLoading(true);
      
      if (!id) {
        toast.error('Event ID is missing');
        navigate('/events');
        return;
      }
      
      // Fetch event details from Supabase
      const { data, error } = await supabase
        .from('events')
        .select('*')
        .eq('id', id)
        .single();
      
      if (error) {
        throw error;
      }
      
      if (data) {
        setEvent(data as Event);
        
        // Check if current user is the owner of this event
        const { data: { user } } = await supabase.auth.getUser();
        setIsOwner(user?.id === data.user_id);
      } else {
        // If no data found, create a sample event for demo purposes
        const sampleEvent = generateSampleEvent(id);
        setEvent(sampleEvent);
        setIsOwner(true); // For demo purposes
      }
    } catch (error: any) {
      console.error('Error fetching event details:', error);
      toast.error('Failed to load event details');
    } finally {
      setLoading(false);
    }
  };

  // Function to generate a sample event for demo purposes
  const generateSampleEvent = (eventId: string): Event => {
    return {
      id: eventId,
      title: 'Summer Music Festival',
      description: 'A three-day music festival featuring top artists from around the world. Join us for an unforgettable weekend of music, food, and fun. The festival will feature multiple stages with performances from various genres including rock, pop, electronic, hip-hop, and more. There will also be food vendors, art installations, and interactive experiences throughout the venue.',
      date: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0], // 7 days from now
      time: '16:00',
      location: 'Central Park, New York',
      venue_name: 'Main Stage',
      image_url: 'https://images.pexels.com/photos/1105666/pexels-photo-1105666.jpeg',
      price: 75,
      created_at: new Date().toISOString(),
      user_id: '123',
      organizer_name: 'NYC Music Productions',
      capacity: 5000,
      genre: 'Various',
      additional_info: 'Please bring a valid ID for age verification. No outside food or drinks allowed. The event will take place rain or shine.'
    };
  };

  const handleDelete = async () => {
    if (!deleteConfirm) {
      setDeleteConfirm(true);
      return;
    }
    
    try {
      setLoading(true);
      
      // In a real app, you would delete the event from Supabase
      // const { error } = await supabase
      //   .from('events')
      //   .delete()
      //   .eq('id', id);
      
      // if (error) throw error;
      
      // For demo purposes, just show success and navigate
      toast.success('Event deleted successfully');
      navigate('/events');
    } catch (error: any) {
      console.error('Error deleting event:', error);
      toast.error('Failed to delete event');
    } finally {
      setLoading(false);
    }
  };

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

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (!event) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="bg-white p-8 rounded-lg shadow text-center">
          <h3 className="text-lg font-medium text-gray-900 mb-2">Event not found</h3>
          <p className="text-gray-500 mb-4">The event you're looking for doesn't exist or has been removed.</p>
          <Link 
            to="/events" 
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            <FaArrowLeft className="mr-2" />
            Back to Events
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-6">
        <Link 
          to="/events" 
          className="inline-flex items-center text-blue-600 hover:text-blue-800"
        >
          <FaArrowLeft className="mr-2" />
          Back to Events
        </Link>
      </div>
      
      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        {/* Event image */}
        <div className="h-64 md:h-96 w-full relative">
          <img 
            src={event.image_url || 'https://images.pexels.com/photos/1105666/pexels-photo-1105666.jpeg'} 
            alt={event.title} 
            className="w-full h-full object-cover"
          />
          
          {/* Owner actions */}
          {isOwner && (
            <div className="absolute top-4 right-4 flex space-x-2">
              <Link 
                to={`/events/edit/${event.id}`}
                className="bg-white p-2 rounded-full shadow hover:bg-gray-100 transition-colors"
              >
                <FaEdit className="text-blue-600" />
              </Link>
              
              <button 
                onClick={handleDelete}
                className={`bg-white p-2 rounded-full shadow hover:bg-gray-100 transition-colors ${deleteConfirm ? 'bg-red-100' : ''}`}
              >
                <FaTrash className={`${deleteConfirm ? 'text-red-600' : 'text-gray-600'}`} />
              </button>
            </div>
          )}
        </div>
        
        <div className="p-6">
          {/* Event header */}
          <div className="mb-6">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">{event.title}</h1>
            
            <div className="flex flex-wrap items-center text-gray-600 text-sm mb-4">
              <div className="flex items-center mr-6 mb-2">
                <FaCalendarAlt className="mr-2 text-blue-500" />
                <span>{formatDate(event.date)}</span>
              </div>
              
              <div className="flex items-center mr-6 mb-2">
                <FaClock className="mr-2 text-blue-500" />
                <span>{event.time}</span>
              </div>
              
              <div className="flex items-center mb-2">
                <FaMapMarkerAlt className="mr-2 text-blue-500" />
                <span>{event.venue_name}, {event.location}</span>
              </div>
            </div>
            
            <div className="flex items-center">
              <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800">
                <FaTicketAlt className="mr-1" />
                {event.price === 0 ? 'Free' : `$${event.price.toFixed(2)}`}
              </span>
              
              {event.genre && (
                <span className="ml-2 inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-purple-100 text-purple-800">
                  {event.genre}
                </span>
              )}
              
              {event.capacity && (
                <span className="ml-2 inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800">
                  Capacity: {event.capacity}
                </span>
              )}
            </div>
          </div>
          
          {/* Event description */}
          <div className="mb-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-3">About This Event</h2>
            <p className="text-gray-700 whitespace-pre-line">{event.description}</p>
          </div>
          
          {/* Event details */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div>
              <h2 className="text-xl font-semibold text-gray-900 mb-3">Event Details</h2>
              
              <div className="bg-gray-50 p-4 rounded-lg">
                <div className="mb-3">
                  <h3 className="text-sm font-medium text-gray-500">Date and Time</h3>
                  <p className="text-gray-900">{formatDate(event.date)} at {event.time}</p>
                </div>
                
                <div className="mb-3">
                  <h3 className="text-sm font-medium text-gray-500">Location</h3>
                  <p className="text-gray-900">{event.venue_name}</p>
                  <p className="text-gray-900">{event.location}</p>
                </div>
                
                {event.organizer_name && (
                  <div>
                    <h3 className="text-sm font-medium text-gray-500">Organizer</h3>
                    <p className="text-gray-900">{event.organizer_name}</p>
                  </div>
                )}
              </div>
            </div>
            
            {event.additional_info && (
              <div>
                <h2 className="text-xl font-semibold text-gray-900 mb-3">Additional Information</h2>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="text-gray-700 whitespace-pre-line">{event.additional_info}</p>
                </div>
              </div>
            )}
          </div>
          
          {/* CTA */}
          <div className="flex flex-col sm:flex-row justify-center sm:justify-between items-center bg-blue-50 p-6 rounded-lg">
            <div className="mb-4 sm:mb-0 text-center sm:text-left">
              <h3 className="text-lg font-semibold text-gray-900 mb-1">Ready to attend this event?</h3>
              <p className="text-gray-600">Secure your spot now before tickets sell out!</p>
            </div>
            
            <button 
              className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              onClick={() => toast.success('Ticket purchase functionality would go here!')}
            >
              <FaTicketAlt className="mr-2" />
              Get Tickets
            </button>
          </div>
        </div>
      </div>
      
      {/* Related events would go here in a real app */}
    </div>
  );
};

export default EventDetails;
