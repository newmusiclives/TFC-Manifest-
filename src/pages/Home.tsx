import { useState, useEffect, useRef } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { supabase } from '../lib/supabase'
import MusicianCard from '../components/MusicianCard'
import { FiMusic, FiDollarSign, FiUsers, FiChevronLeft, FiChevronRight } from 'react-icons/fi'
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react'
// Import required modules
import { Autoplay, Pagination, Navigation } from 'swiper/modules'
// Import Swiper types
import type { Swiper as SwiperType } from 'swiper'

const Home = () => {
  const [featuredMusicians, setFeaturedMusicians] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const navigate = useNavigate()
  const swiperRef = useRef<SwiperType | null>(null)
  
  useEffect(() => {
    const fetchFeaturedMusicians = async () => {
      try {
        const { data, error } = await supabase
          .from('musicians')
          .select(`
            *,
            users!inner(*)
          `)
          .limit(5)
        
        if (error) throw error
        
        // Transform the data to match the MusicianCard props
        const musicians = data.map(musician => ({
          id: musician.id,
          name: musician.stage_name || musician.users.name,
          profilePhoto: musician.users.profile_photo,
          genre: musician.genre || ['Music'],
          location: musician.users.location,
          bio: musician.users.bio,
          songCount: Math.floor(Math.random() * 20) + 1 // Mock data
        }))
        
        setFeaturedMusicians(musicians)
      } catch (error) {
        console.error('Error fetching featured music artists:', error)
        
        // Mock data for development - using exact same images as in Artist Profile pages
        setFeaturedMusicians([
          {
            id: '1',
            name: 'Sarah Johnson',
            profilePhoto: 'https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg',
            genre: ['Folk', 'Acoustic'],
            location: 'Portland, OR',
            bio: 'Independent folk artist with a passion for storytelling through music.',
            songCount: 12
          },
          {
            id: '2',
            name: 'The Midnight Echo',
            profilePhoto: 'https://images.pexels.com/photos/2747446/pexels-photo-2747446.jpeg',
            genre: ['Indie Rock', 'Alternative'],
            location: 'Austin, TX',
            bio: 'Four-piece indie rock band creating atmospheric soundscapes.',
            songCount: 8
          },
          {
            id: '3',
            name: 'DJ Pulse',
            profilePhoto: 'https://images.pexels.com/photos/1699161/pexels-photo-1699161.jpeg',
            genre: ['Electronic', 'House'],
            location: 'Miami, FL',
            bio: 'Electronic music producer specializing in melodic house and techno.',
            songCount: 15
          },
          {
            id: '4',
            name: 'Luna Rivers',
            profilePhoto: 'https://images.pexels.com/photos/3756766/pexels-photo-3756766.jpeg',
            genre: ['R&B', 'Soul'],
            location: 'Chicago, IL',
            bio: 'Soulful vocalist blending classic R&B with modern production.',
            songCount: 9
          },
          {
            id: '5',
            name: 'Marcus Rivera',
            profilePhoto: 'https://images.pexels.com/photos/4472061/pexels-photo-4472061.jpeg',
            genre: ['Jazz', 'Fusion'],
            location: 'New Orleans, LA',
            bio: 'Jazz saxophonist pushing the boundaries of traditional and contemporary jazz.',
            songCount: 18
          }
        ])
      } finally {
        setLoading(false)
      }
    }
    
    fetchFeaturedMusicians()
  }, [])
  
  const handleArtistSignup = (e: React.MouseEvent) => {
    e.preventDefault()
    navigate('/artist-signup')
    // Ensure the page scrolls to the top
    window.scrollTo(0, 0)
  }
  
  return (
    <div>
      {/* Hero Section - Fixed to match container width */}
      <section className="mt-16 py-12 px-4 md:py-20 bg-primary-600 rounded-3xl max-w-6xl mx-auto">
        <div className="container mx-auto">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6 text-white">
              Right Now Money and TrueFans Forever
            </h1>
            <div className="text-xl md:text-2xl mb-8 text-white/90">
              <p className="mb-2">
                When your music moves someone, that's when they're most ready to "show you some love". Support you.
              </p>
              <p className="font-medium">
                Not after the show. Not tomorrow. NOW.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/discover" className="btn bg-white text-primary-600 hover:bg-gray-100">
                Discover Music Artists
              </Link>
              <a href="/artist-signup" onClick={handleArtistSignup} className="btn bg-secondary-500 text-white hover:bg-secondary-600">
                Join as a Music Artist
              </a>
            </div>
          </div>
        </div>
      </section>
      
      {/* How It Works Section - Updated with Connect-Support-Thrive */}
      <section className="py-12 md:py-16">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">How It Works</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div className="text-center">
              <div className="w-20 h-20 bg-primary-100 text-primary-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <FiUsers size={32} />
              </div>
              <h3 className="text-2xl font-bold mb-4">Connect</h3>
              <p className="text-gray-600 dark:text-gray-300">
                You create a profile and share your donation links. Fans can then support you and follow your career.
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-20 h-20 bg-secondary-100 text-secondary-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <FiDollarSign size={32} />
              </div>
              <h3 className="text-2xl font-bold mb-4">Support</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Fans can make one time or monthly donations to your live shows, via social media and website.
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-20 h-20 bg-accent-100 text-accent-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <FiMusic size={32} />
              </div>
              <h3 className="text-2xl font-bold mb-4">Thrive</h3>
              <p className="text-gray-600 dark:text-gray-300">
                You receive 80% of all donations, building income and creating your community of TrueFans.
              </p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Featured Music Artists Section - Now with Carousel */}
      <section className="py-12 md:py-16 bg-gray-50 dark:bg-gray-900 rounded-3xl">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-3xl font-bold">Featured Music Artists</h2>
              <Link to="/discover" className="text-primary-600 hover:text-primary-700 dark:text-primary-400 dark:hover:text-primary-300 font-medium">
                View All
              </Link>
            </div>
            
            {loading ? (
              <div className="grid md:grid-cols-3 gap-8">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-4 h-80 animate-pulse">
                    <div className="h-40 bg-gray-200 dark:bg-gray-700 rounded-lg mb-4"></div>
                    <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-3/4 mb-2"></div>
                    <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/2 mb-2"></div>
                    <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-5/6 mb-2"></div>
                    <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/4"></div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="relative featured-carousel">
                {/* Custom navigation buttons */}
                <button 
                  className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white dark:bg-gray-800 rounded-full p-2 shadow-md -ml-4 hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none"
                  onClick={() => swiperRef.current?.slidePrev()}
                  aria-label="Previous slide"
                >
                  <FiChevronLeft size={24} className="text-primary-600 dark:text-primary-400" />
                </button>
                
                <div className="mx-auto max-w-6xl px-4">
                  <Swiper
                    onSwiper={(swiper) => {
                      swiperRef.current = swiper;
                    }}
                    slidesPerView={1}
                    spaceBetween={20}
                    centeredSlides={false}
                    autoplay={{
                      delay: 5000,
                      disableOnInteraction: false,
                    }}
                    pagination={{
                      clickable: true,
                      el: '.swiper-pagination',
                    }}
                    breakpoints={{
                      640: {
                        slidesPerView: 2,
                        spaceBetween: 20,
                      },
                      1024: {
                        slidesPerView: 3,
                        spaceBetween: 30,
                      },
                    }}
                    modules={[Autoplay, Pagination, Navigation]}
                    className="mySwiper"
                  >
                    {featuredMusicians.map((musician) => (
                      <SwiperSlide key={musician.id}>
                        <MusicianCard
                          id={musician.id}
                          name={musician.name}
                          profilePhoto={musician.profilePhoto}
                          genre={musician.genre}
                          location={musician.location}
                          bio={musician.bio}
                          songCount={musician.songCount}
                        />
                      </SwiperSlide>
                    ))}
                  </Swiper>
                </div>
                
                <button 
                  className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white dark:bg-gray-800 rounded-full p-2 shadow-md -mr-4 hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none"
                  onClick={() => swiperRef.current?.slideNext()}
                  aria-label="Next slide"
                >
                  <FiChevronRight size={24} className="text-primary-600 dark:text-primary-400" />
                </button>
                
                {/* Pagination dots */}
                <div className="swiper-pagination mt-6 flex justify-center"></div>
              </div>
            )}
          </div>
        </div>
      </section>
      
      {/* Testimonials Section */}
      <section className="py-12 md:py-16">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">What People Are Saying</h2>
          
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6">
              <div className="flex items-center mb-4">
                <img
                  src="https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
                  alt="Fan testimonial"
                  className="w-12 h-12 rounded-full object-cover mr-4"
                />
                <div>
                  <h4 className="font-semibold">Michael R.</h4>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Music Fan</p>
                </div>
              </div>
              <p className="text-gray-600 dark:text-gray-300">
                "I love being able to directly support the indie artists I discover. Knowing that most of my donation goes straight to them makes me feel good about contributing."
              </p>
            </div>
            
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6">
              <div className="flex items-center mb-4">
                <img
                  src="https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
                  alt="Music Artist testimonial"
                  className="w-12 h-12 rounded-full object-cover mr-4"
                />
                <div>
                  <h4 className="font-semibold">Sarah J.</h4>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Indie Music Artist</p>
                </div>
              </div>
              <p className="text-gray-600 dark:text-gray-300">
                "TrueFans CONNECT™ has changed how I think about my music career. The direct support from fans has allowed me to focus on creating music instead of worrying about how to pay rent."
              </p>
            </div>
          </div>
        </div>
      </section>
      
      {/* CTA Section - Fixed to match container width */}
      <section className="py-12 md:py-16 bg-primary-600 rounded-3xl mt-12 max-w-6xl mx-auto">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-white">
              Ready to Transform How Music Artists Get Paid?
            </h2>
            <p className="text-xl mb-8 text-white/90">
              Support the artists you love directly and earn exclusive benefits in return.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href="/artist-signup" onClick={handleArtistSignup} className="btn bg-white text-primary-600 hover:bg-gray-100">
                Create Your Account
              </a>
              <Link to="/fan-how-it-works" className="btn bg-transparent border-2 border-white text-white hover:bg-white/10" onClick={() => window.scrollTo(0, 0)}>
                TrueFans Find Out More
              </Link>
            </div>
          </div>
        </div>
      </section>
      
      {/* Added whitespace before footer */}
      <div className="py-16 md:py-24"></div>
    </div>
  )
}

export default Home
