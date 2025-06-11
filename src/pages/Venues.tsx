import { useState } from 'react'
import { Link } from 'react-router-dom'
import { FiMusic, FiDollarSign, FiUsers } from 'react-icons/fi'
import VenueSubmissionFormDemo from '../components/VenueSubmissionFormDemo'

const Venues = () => {
  // Calculator states
  const [showAttendees, setShowAttendees] = useState<number>(100)
  const [donationRate, setDonationRate] = useState<number>(50)
  const [avgDonation, setAvgDonation] = useState<number>(20)
  const [referredArtists, setReferredArtists] = useState<number>(5)
  const [secondTierArtists, setSecondTierArtists] = useState<number>(10)
  
  // Calculate potential earnings
  const calculateMonthlyEarnings = () => {
    // Calculate direct earnings from shows
    const donationsPerShow = showAttendees * (donationRate / 100) * avgDonation
    const directEarningsPerShow = donationsPerShow * 0.025
    
    // Calculate monthly earnings from referred artists (assuming 4 shows per month per artist)
    const referredArtistsEarnings = referredArtists * 4 * donationsPerShow * 0.025
    
    // Calculate monthly earnings from second-tier artists (assuming 4 shows per month per artist)
    const secondTierEarnings = secondTierArtists * 4 * donationsPerShow * 0.025
    
    return {
      directEarningsPerShow,
      referredArtistsEarnings,
      secondTierEarnings,
      totalMonthly: referredArtistsEarnings + secondTierEarnings
    }
  }
  
  const earnings = calculateMonthlyEarnings()

  return (
    <div className="container mx-auto px-4 py-12">
      {/* Hero Section */}
      <section className="mb-16">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">For Live Music Venues</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Streamline your live music booking process and earn additional revenue through our affiliate program.
          </p>
        </div>

        <div className="bg-gradient-to-br from-primary-50 to-white rounded-3xl p-8 md:p-12 shadow-sm mb-16">
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <FiMusic className="text-primary-600" size={28} />
              </div>
              <h3 className="text-xl font-semibold mb-2">Streamlined Submissions</h3>
              <p className="text-gray-600">
                Receive organized music submissions through our customizable form that you can embed on your website.
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <FiDollarSign className="text-primary-600" size={28} />
              </div>
              <h3 className="text-xl font-semibold mb-2">Earn Passive Income</h3>
              <p className="text-gray-600">
                Earn 2.5% commission on all donations received by artists who submit to your venue and join TrueFans CONNECT™.
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <FiUsers className="text-primary-600" size={28} />
              </div>
              <h3 className="text-xl font-semibold mb-2">Grow Your Network</h3>
              <p className="text-gray-600">
                Connect with more artists and expand your venue's reach in the music community.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="mb-16">
        <h2 className="text-3xl font-bold mb-8 text-center">How It Works</h2>
        
        <div className="max-w-4xl mx-auto space-y-6">
          <div className="bg-white p-6 rounded-xl shadow-sm">
            <h3 className="text-xl font-semibold mb-2">1. Sign Up for Free</h3>
            <p className="text-gray-600">
              Register your venue with TrueFans CONNECT™ at no cost. It only takes a minute to get started.
            </p>
          </div>
          
          <div className="bg-white p-6 rounded-xl shadow-sm">
            <h3 className="text-xl font-semibold mb-2">2. Customize & Embed Our Submission Form</h3>
            <p className="text-gray-600">
              Add your logo and match your brand colors. Then add our Live Music Submission form to your website with a simple embed code.
              Artists can submit their information directly through this form.
            </p>
          </div>
          
          <div className="bg-white p-6 rounded-xl shadow-sm">
            <h3 className="text-xl font-semibold mb-2">3. Review Submissions</h3>
            <p className="text-gray-600">
              Access all artist submissions in an organized dashboard. Review details, listen to music samples, and decide which artists to book.
            </p>
          </div>
          
          <div className="bg-white p-6 rounded-xl shadow-sm">
            <h3 className="text-xl font-semibold mb-2">4. Earn Through Our Affiliate Program</h3>
            <p className="text-gray-600">
              We automatically follow up with artists who submit to your venue. When they join TrueFans CONNECT™, you earn 2.5% of all donations they receive. Plus, earn 2.5% from artists they refer too!
            </p>
          </div>
        </div>
      </section>
      
      {/* Customizable Form Demo Section */}
      <section className="mb-16 bg-gray-50 py-12 px-4 sm:px-6 rounded-3xl">
        <h2 className="text-3xl font-bold mb-8 text-center">Customizable Submission Form</h2>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto text-center mb-10">
          Tailor the form to match your venue's branding and collect exactly the information you need from artists.
        </p>
        <div className="max-w-4xl mx-auto">
          <VenueSubmissionFormDemo />
        </div>
      </section>
      
      {/* Affiliate Program Section */}
      <section className="mb-16">
        <div className="bg-white rounded-xl shadow-md p-8">
          <h2 className="text-3xl font-bold mb-6 text-center">Our 2-Tier Affiliate Program</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto text-center mb-8">
            Earn commissions from artists who join TrueFans CONNECT™ through your venue's submission form.
          </p>
          
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <div className="bg-primary-50 p-6 rounded-xl">
              <h3 className="text-xl font-semibold mb-4">Tier 1: Direct Submissions</h3>
              <p className="text-gray-700 mb-4">
                Earn 2.5% commission on all donations received by artists who submit to your venue and join TrueFans CONNECT™.
              </p>
              <div className="bg-white p-4 rounded-lg">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-gray-700 font-medium">Example Scenario:</span>
                </div>
                <ul className="space-y-2 text-gray-700 text-sm">
                  <li>• Artist joins TrueFans CONNECT™ for free through your venue</li>
                  <li>• 100 people attend their show</li>
                  <li>• 40% of attendees donate ($20 average donation)</li>
                  <li>• Total donations: $800 per show</li>
                  <li>• Artist receives 80%: $640</li>
                  <li>• <span className="font-semibold">Your commission (2.5%): $20 per show</span></li>
                </ul>
                <div className="mt-4 pt-3 border-t border-gray-100">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-700">Annual earnings per artist:</span>
                    <span className="font-bold text-primary-700">$1,000</span>
                  </div>
                  <p className="text-xs text-gray-500 mt-1">
                    Based on the artist performing 50 shows per year
                  </p>
                </div>
              </div>
            </div>
            
            <div className="bg-primary-50 p-6 rounded-xl">
              <h3 className="text-xl font-semibold mb-4">Tier 2: Artist Referrals</h3>
              <p className="text-gray-700 mb-4">
                Earn an additional 2.5% commission when your referred artists refer other musicians to the platform.
              </p>
              <div className="bg-white p-4 rounded-lg">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-gray-700 font-medium">Example Scenario:</span>
                </div>
                <ul className="space-y-2 text-gray-700 text-sm">
                  <li>• Your referred artist brings in another musician</li>
                  <li>• This second-tier artist plays shows with the same metrics:</li>
                  <li>• 100 attendees, 40% donate $20 each</li>
                  <li>• Total donations: $800 per show</li>
                  <li>• Second-tier artist receives 80%: $640</li>
                  <li>• <span className="font-semibold">Your commission (2.5%): $20 per show</span></li>
                </ul>
                <div className="mt-4 pt-3 border-t border-gray-100">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-700">Annual earnings per second-tier artist:</span>
                    <span className="font-bold text-primary-700">$1,000</span>
                  </div>
                  <p className="text-xs text-gray-500 mt-1">
                    Based on the second-tier artist performing 50 shows per year
                  </p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="bg-primary-100 p-6 rounded-xl mt-8 max-w-4xl mx-auto">
            <h3 className="text-xl font-semibold mb-4 text-center">Potential Annual Earnings</h3>
            <div className="grid md:grid-cols-3 gap-4">
              <div className="bg-white p-4 rounded-lg text-center">
                <p className="text-gray-600 mb-2">If you refer 5 artists</p>
                <p className="text-2xl font-bold text-primary-700">$5,000/year</p>
                <p className="text-xs text-gray-500">From direct referrals</p>
              </div>
              <div className="bg-white p-4 rounded-lg text-center">
                <p className="text-gray-600 mb-2">If each artist refers 2 more</p>
                <p className="text-2xl font-bold text-primary-700">$10,000/year</p>
                <p className="text-xs text-gray-500">From second-tier referrals</p>
              </div>
              <div className="bg-white p-4 rounded-lg text-center">
                <p className="text-gray-600 mb-2">Total potential earnings</p>
                <p className="text-2xl font-bold text-primary-700">$15,000/year</p>
                <p className="text-xs text-gray-500">Passive income from your network</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Earnings Calculator Section */}
      <section className="mb-16">
        <div className="bg-white rounded-xl shadow-md p-8">
          <h2 className="text-3xl font-bold mb-6 text-center">Earnings Calculator</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto text-center mb-8">
            See how much you could earn through our affiliate program based on your venue's shows.
          </p>
          
          <div className="max-w-4xl mx-auto">
            <div className="mb-8">
              <h3 className="text-xl font-semibold mb-6 text-center">Estimate Your Earnings</h3>
              
              <div className="space-y-6 bg-gray-50 p-6 rounded-xl">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Average Attendees Per Show: <span className="font-bold">{showAttendees}</span>
                  </label>
                  <input
                    type="range"
                    min="10"
                    max="500"
                    step="10"
                    value={showAttendees}
                    onChange={(e) => setShowAttendees(parseInt(e.target.value))}
                    className="w-full"
                  />
                  <div className="flex justify-between text-sm text-gray-600">
                    <span>10</span>
                    <span>250</span>
                    <span>500</span>
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Percentage of Attendees Who Donate: <span className="font-bold">{donationRate}%</span>
                  </label>
                  <input
                    type="range"
                    min="10"
                    max="100"
                    step="5"
                    value={donationRate}
                    onChange={(e) => setDonationRate(parseInt(e.target.value))}
                    className="w-full"
                  />
                  <div className="flex justify-between text-sm text-gray-600">
                    <span>10%</span>
                    <span>50%</span>
                    <span>100%</span>
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Average Donation Amount: <span className="font-bold">${avgDonation}</span>
                  </label>
                  <input
                    type="range"
                    min="5"
                    max="50"
                    step="5"
                    value={avgDonation}
                    onChange={(e) => setAvgDonation(parseInt(e.target.value))}
                    className="w-full"
                  />
                  <div className="flex justify-between text-sm text-gray-600">
                    <span>$5</span>
                    <span>$25</span>
                    <span>$50</span>
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Number of Artists You Refer: <span className="font-bold">{referredArtists}</span>
                  </label>
                  <input
                    type="range"
                    min="1"
                    max="50"
                    step="1"
                    value={referredArtists}
                    onChange={(e) => setReferredArtists(parseInt(e.target.value))}
                    className="w-full"
                  />
                  <div className="flex justify-between text-sm text-gray-600">
                    <span>1</span>
                    <span>25</span>
                    <span>50</span>
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Number of Second-Tier Artists: <span className="font-bold">{secondTierArtists}</span>
                  </label>
                  <input
                    type="range"
                    min="0"
                    max="100"
                    step="5"
                    value={secondTierArtists}
                    onChange={(e) => setSecondTierArtists(parseInt(e.target.value))}
                    className="w-full"
                  />
                  <div className="flex justify-between text-sm text-gray-600">
                    <span>0</span>
                    <span>50</span>
                    <span>100</span>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="bg-primary-50 p-6 rounded-xl">
              <h3 className="text-xl font-semibold mb-6 text-center">Potential Monthly Earnings</h3>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-white p-4 rounded-lg">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-gray-700">Per Show Earnings:</span>
                    <span className="font-semibold">${earnings.directEarningsPerShow.toFixed(2)}</span>
                  </div>
                  <p className="text-sm text-gray-600">
                    Based on {showAttendees} attendees, {donationRate}% donation rate, and ${avgDonation} average donation
                  </p>
                </div>
                
                <div className="bg-white p-4 rounded-lg">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-gray-700">From Referred Artists:</span>
                    <span className="font-semibold">${earnings.referredArtistsEarnings.toFixed(2)}/month</span>
                  </div>
                  <p className="text-sm text-gray-600">
                    Based on {referredArtists} artists performing 4 shows per month
                  </p>
                </div>
              </div>
              
              <div className="mt-4 grid md:grid-cols-2 gap-6">
                <div className="bg-white p-4 rounded-lg">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-gray-700">From Second-Tier Artists:</span>
                    <span className="font-semibold">${earnings.secondTierEarnings.toFixed(2)}/month</span>
                  </div>
                  <p className="text-sm text-gray-600">
                    Based on {secondTierArtists} second-tier artists performing 4 shows per month
                  </p>
                </div>
                
                <div className="bg-primary-100 p-4 rounded-lg">
                  <div className="flex justify-between items-center">
                    <span className="font-medium text-primary-800">Total Monthly Earnings:</span>
                    <span className="text-2xl font-bold text-primary-800">${earnings.totalMonthly.toFixed(2)}</span>
                  </div>
                  <p className="text-sm text-gray-600 mt-2">
                    That's <span className="font-bold">${(earnings.totalMonthly * 12).toFixed(2)}</span> per year in passive income!
                  </p>
                </div>
              </div>
              
              <p className="text-sm text-gray-600 text-center mt-6">
                These estimates are based on the parameters you've set and assume each artist performs 4 shows per month.
              </p>
            </div>
          </div>
          
          <div className="text-center mt-8">
            <p className="text-gray-600 mb-4">
              Ready to start earning passive income from the artists who perform at your venue?
            </p>
            <Link to="/venue-signup" className="btn btn-primary px-8 py-3">
              Sign Up Now
            </Link>
          </div>
        </div>
      </section>

      {/* Sign Up CTA Section */}
      <section className="mb-16">
        <div className="bg-white p-8 rounded-xl shadow-md max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold mb-6 text-center">Ready to Get Started?</h2>
          <p className="text-gray-600 mb-6 text-center">
            Sign up your venue today and start receiving organized submissions from artists
          </p>
          
          <div className="text-center">
            <Link to="/venue-signup" className="btn btn-primary py-3 px-8">
              Sign Up Your Venue
            </Link>
            <p className="mt-4 text-sm text-gray-500">
              It's completely free to join and only takes a few minutes
            </p>
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="bg-gradient-to-br from-primary-600 to-primary-700 text-white rounded-3xl p-8 md:p-12">
        <div className="text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Streamline Your Booking Process?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Join TrueFans CONNECT™ today as a venue partner and get your FREE submission form.
          </p>
          <Link to="/venue-signup" className="btn bg-white text-primary-600 hover:bg-gray-100 px-8 py-3 text-lg">
            Sign Up Now
          </Link>
        </div>
      </section>
    </div>
  )
}

export default Venues
