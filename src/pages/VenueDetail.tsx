import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { FiCalendar, FiMapPin, FiMusic, FiUsers, FiDollarSign, FiArrowLeft } from 'react-icons/fi'

// This would typically come from an API call
const mockVenueData = {
  id: '1',
  name: 'The Sound Garden',
  description: 'A premier live music venue featuring local and touring artists in an intimate setting with state-of-the-art sound.',
  address: '123 Music Ave, Nashville, TN 37203',
  capacity: 250,
  imageUrl: 'https://images.pexels.com/photos/1105666/pexels-photo-1105666.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
  amenities: ['Professional sound system', 'Full bar', 'Green room', 'Stage lighting', 'Merchandise area'],
  upcomingShows: [
    {
      id: '101',
      artist: 'Midnight Serenade',
      date: '2023-11-15T20:00:00',
      ticketLink: '#'
    },
    {
      id: '102',
      artist: 'The Resonators',
      date: '2023-11-18T21:00:00',
      ticketLink: '#'
    },
    {
      id: '103',
      artist: 'Echo Chamber',
      date: '2023-11-22T19:30:00',
      ticketLink: '#'
    }
  ],
  submissionRequirements: [
    'EPK or website link',
    'At least 3 original songs',
    'Social media following information',
    'Availability for the next 3 months'
  ],
  contactEmail: 'bookings@soundgarden.com',
  submissionFormUrl: '/venue-submission/1'
}

const VenueDetail = () => {
  const { id } = useParams()
  const [venue, setVenue] = useState(mockVenueData)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    // Simulate API call
    const fetchVenueData = async () => {
      try {
        // In a real app, you would fetch data from an API
        // const response = await fetch(`/api/venues/${id}`)
        // const data = await response.json()
        
        // Using mock data for now
        setVenue(mockVenueData)
        setLoading(false)
      } catch (err) {
        setError('Failed to load venue details')
        setLoading(false)
      }
    }

    fetchVenueData()
  }, [id])

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-12 flex justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-600"></div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-12">
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
          {error}
        </div>
      </div>
    )
  }

  // Format date for upcoming shows
  const formatShowDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('en-US', { 
      weekday: 'short', 
      month: 'short', 
      day: 'numeric',
      year: 'numeric'
    }) + ' at ' + 
    date.toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true
    })
  }

  return (
    <div className="container mx-auto px-4 py-12">
      {/* Back button */}
      <Link to="/venues" className="inline-flex items-center text-primary-600 hover:text-primary-700 mb-6">
        <FiArrowLeft className="mr-2" />
        Back to Venues
      </Link>
      
      {/* Hero Section */}
      <div className="relative rounded-xl overflow-hidden h-64 md:h-96 mb-8">
        <img 
          src={venue.imageUrl} 
          alt={venue.name} 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end">
          <div className="p-6 md:p-8 text-white">
            <h1 className="text-3xl md:text-4xl font-bold mb-2">{venue.name}</h1>
            <div className="flex items-center">
              <FiMapPin className="mr-2" />
              <span>{venue.address}</span>
            </div>
          </div>
        </div>
      </div>
      
      {/* Venue Details */}
      <div className="grid md:grid-cols-3 gap-8 mb-12">
        <div className="md:col-span-2">
          <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
            <h2 className="text-2xl font-bold mb-4">About This Venue</h2>
            <p className="text-gray-700 mb-6">{venue.description}</p>
            
            <div className="flex flex-wrap gap-4 mb-6">
              <div className="flex items-center bg-gray-50 px-4 py-2 rounded-lg">
                <FiUsers className="text-primary-600 mr-2" />
                <span><strong>Capacity:</strong> {venue.capacity}</span>
              </div>
            </div>
            
            <h3 className="text-xl font-semibold mb-3">Amenities</h3>
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-2 mb-6">
              {venue.amenities.map((amenity, index) => (
                <li key={index} className="flex items-center">
                  <span className="w-2 h-2 bg-primary-600 rounded-full mr-2"></span>
                  {amenity}
                </li>
              ))}
            </ul>
          </div>
          
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h2 className="text-2xl font-bold mb-4">Upcoming Shows</h2>
            {venue.upcomingShows.length > 0 ? (
              <div className="space-y-4">
                {venue.upcomingShows.map(show => (
                  <div key={show.id} className="border-b border-gray-100 pb-4 last:border-0 last:pb-0">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-semibold text-lg">{show.artist}</h3>
                        <div className="flex items-center text-gray-600">
                          <FiCalendar className="mr-2" />
                          <span>{formatShowDate(show.date)}</span>
                        </div>
                      </div>
                      <a 
                        href={show.ticketLink} 
                        className="btn btn-sm btn-primary"
                      >
                        Get Tickets
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-600">No upcoming shows at this time.</p>
            )}
          </div>
        </div>
        
        <div>
          <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
            <h2 className="text-xl font-bold mb-4">Submission Requirements</h2>
            <ul className="space-y-2 mb-6">
              {venue.submissionRequirements.map((req, index) => (
                <li key={index} className="flex items-start">
                  <span className="text-primary-600 mr-2">•</span>
                  <span>{req}</span>
                </li>
              ))}
            </ul>
            
            <div className="space-y-4">
              <div>
                <h3 className="font-medium mb-1">Contact Email</h3>
                <a 
                  href={`mailto:${venue.contactEmail}`} 
                  className="text-primary-600 hover:text-primary-700"
                >
                  {venue.contactEmail}
                </a>
              </div>
              
              <Link 
                to={venue.submissionFormUrl} 
                className="btn btn-primary w-full flex items-center justify-center"
              >
                <FiMusic className="mr-2" />
                Submit Your Music
              </Link>
            </div>
          </div>
          
          <div className="bg-primary-50 rounded-xl p-6">
            <h2 className="text-xl font-bold mb-4 flex items-center">
              <FiDollarSign className="mr-2 text-primary-600" />
              Affiliate Program
            </h2>
            <p className="text-gray-700 mb-4">
              This venue participates in our affiliate program. When artists join TrueFans CONNECT™ through this venue, the venue earns 2.5% commission on all donations.
            </p>
            <Link 
              to="/affiliate" 
              className="text-primary-600 hover:text-primary-700 font-medium"
            >
              Learn more about our affiliate program
            </Link>
          </div>
        </div>
      </div>
      
      {/* Similar Venues Section */}
      <div className="mb-12">
        <h2 className="text-2xl font-bold mb-6">Similar Venues</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[1, 2, 3].map(i => (
            <div key={i} className="bg-white rounded-xl shadow-sm overflow-hidden">
              <div className="h-48 overflow-hidden">
                <img 
                  src={`https://images.pexels.com/photos/167491/pexels-photo-167491.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2`} 
                  alt={`Similar Venue ${i}`}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-4">
                <h3 className="font-bold text-lg mb-1">Music Hall {i}</h3>
                <p className="text-gray-600 text-sm mb-3">Nashville, TN</p>
                <Link to={`/venues/${i + 1}`} className="text-primary-600 hover:text-primary-700 text-sm font-medium">
                  View Details
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      {/* CTA Section */}
      <div className="bg-gradient-to-br from-primary-600 to-primary-700 text-white rounded-xl p-8 text-center">
        <h2 className="text-2xl font-bold mb-4">Are You a Musician?</h2>
        <p className="text-lg mb-6 max-w-2xl mx-auto">
          Submit your music to venues like {venue.name} and start building your fan base with TrueFans CONNECT™.
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <Link to="/artist-signup" className="btn bg-white text-primary-600 hover:bg-gray-100">
            Sign Up as an Artist
          </Link>
          <Link to="/how-it-works" className="btn btn-outline-white">
            Learn How It Works
          </Link>
        </div>
      </div>
    </div>
  )
}

export default VenueDetail
