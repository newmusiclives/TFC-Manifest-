import { useState } from 'react'
import { FiUsers, FiDollarSign, FiLink } from 'react-icons/fi'

const AffiliateProgram = () => {
  const [monthlyDonations, setMonthlyDonations] = useState<number>(1000)
  const [referredArtists, setReferredArtists] = useState<number>(5)
  const [secondTierArtists, setSecondTierArtists] = useState<number>(10)
  const [avgDonationPerArtist, setAvgDonationPerArtist] = useState<number>(500)

  // Calculate earnings
  const directEarnings = (referredArtists * avgDonationPerArtist * 0.025)
  const secondTierEarnings = (secondTierArtists * avgDonationPerArtist * 0.025)
  const totalEarnings = directEarnings + secondTierEarnings
  const totalAnnualEarnings = totalEarnings * 12

  return (
    <div className="container mx-auto px-4 py-12">
      {/* Hero Section */}
      <section className="mb-16">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Affiliate Program</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Earn additional income by referring other music artists to TrueFans CONNECT.
            As a music artist on our platform, you're automatically enrolled in our affiliate program.
          </p>
        </div>

        <div className="bg-gradient-to-br from-primary-50 to-white rounded-3xl p-8 md:p-12 shadow-sm mb-16">
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <FiLink className="text-primary-600" size={28} />
              </div>
              <h3 className="text-xl font-semibold mb-2">Refer Music Artists</h3>
              <p className="text-gray-600">
                Share your unique referral link with other music artists to invite them to join TrueFans CONNECT.
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <FiUsers className="text-primary-600" size={28} />
              </div>
              <h3 className="text-xl font-semibold mb-2">Build Your Network</h3>
              <p className="text-gray-600">
                Grow your network of referred artists. They can also refer others, creating a second tier of referrals for you.
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <FiDollarSign className="text-primary-600" size={28} />
              </div>
              <h3 className="text-xl font-semibold mb-2">Earn Commissions</h3>
              <p className="text-gray-600">
                Earn 2.5% commission on all donations received by your direct referrals and 2.5% from their referrals too.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="mb-16">
        <h2 className="text-3xl font-bold mb-8 text-center">How Our Affiliate Program Works</h2>
        
        <div className="max-w-4xl mx-auto space-y-6">
          <div className="bg-white p-6 rounded-xl shadow-sm">
            <h3 className="text-xl font-semibold mb-2">Automatic Enrollment</h3>
            <p className="text-gray-600">
              All Artists and Venues who join TrueFans CONNECT™ are automatically enrolled in our affiliate program. 
              You'll receive a unique referral link in your dashboard once you sign up.
            </p>
          </div>
          
          <div className="bg-white p-6 rounded-xl shadow-sm">
            <h3 className="text-xl font-semibold mb-2">Two-Tier Commission Structure</h3>
            <p className="text-gray-600">
              <strong>Direct Referrals (Tier 1):</strong> Earn 2.5% commission on all donations received by music artists you directly refer to the platform.
            </p>
            <p className="text-gray-600 mt-2">
              <strong>Indirect Referrals (Tier 2):</strong> Earn an additional 2.5% commission on all donations received by music artists referred by your direct referrals.
            </p>
          </div>
          
          <div className="bg-white p-6 rounded-xl shadow-sm">
            <h3 className="text-xl font-semibold mb-2">Monthly Payments</h3>
            <p className="text-gray-600">
              Commissions are calculated monthly and paid out with your regular earnings through our Manifest Financial API integration.
            </p>
          </div>
          
          <div className="bg-white p-6 rounded-xl shadow-sm">
            <h3 className="text-xl font-semibold mb-2">Transparent Tracking</h3>
            <p className="text-gray-600">
              Track your referrals and earnings in real-time through your dashboard. See exactly how much you're earning from each referred artist.
            </p>
          </div>
        </div>
      </section>

      {/* Real-World Example Section */}
      <section className="mb-16">
        <div className="bg-white p-8 rounded-xl shadow-md max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold mb-6 text-center">How Much Can You Earn?</h2>
          <p className="text-gray-600 mb-6 text-center">
            Let's look at a real-world example
          </p>
          
          <div className="space-y-6">
            <div className="bg-primary-50 p-5 rounded-lg">
              <h3 className="text-lg font-semibold mb-3">Example Scenario</h3>
              <ul className="space-y-2 text-gray-700">
                <li className="flex items-start">
                  <span className="text-primary-600 font-bold mr-2">•</span>
                  <span>You refer a Music Artist to TrueFans CONNECT™</span>
                </li>
                <li className="flex items-start">
                  <span className="text-primary-600 font-bold mr-2">•</span>
                  <span>Their average audience is 50 people per show</span>
                </li>
                <li className="flex items-start">
                  <span className="text-primary-600 font-bold mr-2">•</span>
                  <span>40% of the audience donates (20 people)</span>
                </li>
                <li className="flex items-start">
                  <span className="text-primary-600 font-bold mr-2">•</span>
                  <span>Average donation is $20 per person</span>
                </li>
                <li className="flex items-start">
                  <span className="text-primary-600 font-bold mr-2">•</span>
                  <span>Total donations per show: $400</span>
                </li>
                <li className="flex items-start">
                  <span className="text-primary-600 font-bold mr-2">•</span>
                  <span>Your commission (2.5%): $10 per show</span>
                </li>
                <li className="flex items-start">
                  <span className="text-primary-600 font-bold mr-2">•</span>
                  <span>Artist performs 50 shows per year</span>
                </li>
                <li className="flex items-start font-semibold text-primary-700">
                  <span className="text-primary-600 font-bold mr-2">•</span>
                  <span>Your annual earnings from this artist: $500</span>
                </li>
              </ul>
            </div>
            
            <div className="bg-primary-50 p-5 rounded-lg">
              <h3 className="text-lg font-semibold mb-3">Second-Tier Benefits</h3>
              <ul className="space-y-2 text-gray-700">
                <li className="flex items-start">
                  <span className="text-primary-600 font-bold mr-2">•</span>
                  <span>Your referred artist refers another artist</span>
                </li>
                <li className="flex items-start">
                  <span className="text-primary-600 font-bold mr-2">•</span>
                  <span>This second artist has the same metrics</span>
                </li>
                <li className="flex items-start">
                  <span className="text-primary-600 font-bold mr-2">•</span>
                  <span>50 people audience, 40% donate $20 each</span>
                </li>
                <li className="flex items-start">
                  <span className="text-primary-600 font-bold mr-2">•</span>
                  <span>Total donations per show: $400</span>
                </li>
                <li className="flex items-start">
                  <span className="text-primary-600 font-bold mr-2">•</span>
                  <span>Your commission (2.5%): $10 per show</span>
                </li>
                <li className="flex items-start">
                  <span className="text-primary-600 font-bold mr-2">•</span>
                  <span>Second artist performs 50 shows per year</span>
                </li>
                <li className="flex items-start font-semibold text-primary-700">
                  <span className="text-primary-600 font-bold mr-2">•</span>
                  <span>Your annual earnings from second-tier: $500</span>
                </li>
              </ul>
            </div>
            
            <div className="bg-gray-50 p-5 rounded-lg">
              <div className="flex justify-between items-center mb-2">
                <span className="text-gray-700 font-medium">If you refer 5 artists:</span>
                <span className="font-bold text-primary-700">$2,500/year</span>
              </div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-gray-700 font-medium">If each refers 2 more (10 total):</span>
                <span className="font-bold text-primary-700">$5,000/year</span>
              </div>
              <div className="flex justify-between items-center pt-3 border-t border-gray-200">
                <span className="text-gray-800 font-semibold">Total potential earnings:</span>
                <span className="font-bold text-primary-700 text-xl">$7,500/year</span>
              </div>
              <p className="text-xs text-gray-500 mt-2 text-center">
                Passive income that grows as your network expands
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 2-Tier Affiliate Program Section */}
      <section className="mb-16">
        <div className="bg-white rounded-xl shadow-md p-8 max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold mb-6 text-center">Our 2-Tier Affiliate Program</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto text-center mb-8">
            Earn commissions from artists you refer to TrueFans CONNECT™ and from the artists they refer too.
          </p>
          
          <div className="space-y-8">
            <div className="bg-primary-50 p-6 rounded-xl">
              <h3 className="text-xl font-semibold mb-4">Tier 1: Direct Referrals</h3>
              <p className="text-gray-700 mb-4">
                Earn 2.5% commission on all donations received by music artists you directly refer to TrueFans CONNECT™.
              </p>
              <div className="bg-white p-4 rounded-lg">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-gray-700 font-medium">Example Scenario:</span>
                </div>
                <ul className="space-y-2 text-gray-700 text-sm">
                  <li>• Artist joins TrueFans CONNECT™ for free through your referral</li>
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
              <h3 className="text-xl font-semibold mb-4">Tier 2: Your Referral's Referrals</h3>
              <p className="text-gray-700 mb-4">
                Earn an additional 2.5% commission when artists you've referred bring other musicians to the platform.
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
          
          <div className="bg-primary-100 p-6 rounded-xl mt-8">
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
        <div className="bg-white rounded-xl shadow-md p-8 max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold mb-6 text-center">Earnings Calculator</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto text-center mb-8">
            See how much you could earn through our affiliate program.
          </p>
          
          <div className="space-y-6 bg-gray-50 p-6 rounded-xl mb-8">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Average Monthly Donations Per Artist: <span className="font-bold">${avgDonationPerArtist}</span>
              </label>
              <input
                type="range"
                min="100"
                max="2000"
                step="100"
                value={avgDonationPerArtist}
                onChange={(e) => setAvgDonationPerArtist(parseInt(e.target.value))}
                className="w-full"
              />
              <div className="flex justify-between text-sm text-gray-600">
                <span>$100</span>
                <span>$1000</span>
                <span>$2000</span>
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Number of Artists You Refer: <span className="font-bold">{referredArtists}</span>
              </label>
              <input
                type="range"
                min="1"
                max="20"
                step="1"
                value={referredArtists}
                onChange={(e) => setReferredArtists(parseInt(e.target.value))}
                className="w-full"
              />
              <div className="flex justify-between text-sm text-gray-600">
                <span>1</span>
                <span>10</span>
                <span>20</span>
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Number of Second-Tier Artists: <span className="font-bold">{secondTierArtists}</span>
              </label>
              <input
                type="range"
                min="0"
                max="40"
                step="1"
                value={secondTierArtists}
                onChange={(e) => setSecondTierArtists(parseInt(e.target.value))}
                className="w-full"
              />
              <div className="flex justify-between text-sm text-gray-600">
                <span>0</span>
                <span>20</span>
                <span>40</span>
              </div>
            </div>
          </div>
          
          <div className="bg-primary-50 p-6 rounded-xl">
            <h3 className="text-xl font-semibold mb-4 text-center">Your Potential Earnings</h3>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-white p-4 rounded-lg">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-gray-700">From Direct Referrals:</span>
                  <span className="font-semibold">${directEarnings.toFixed(2)}/month</span>
                </div>
                <p className="text-sm text-gray-600">
                  Based on {referredArtists} artists with ${avgDonationPerArtist} monthly donations each
                </p>
              </div>
              
              <div className="bg-white p-4 rounded-lg">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-gray-700">From Second-Tier Artists:</span>
                  <span className="font-semibold">${secondTierEarnings.toFixed(2)}/month</span>
                </div>
                <p className="text-sm text-gray-600">
                  Based on {secondTierArtists} second-tier artists with ${avgDonationPerArtist} monthly donations each
                </p>
              </div>
            </div>
            
            <div className="mt-6 bg-primary-100 p-4 rounded-lg">
              <div className="flex justify-between items-center">
                <span className="font-medium text-primary-800">Total Monthly Earnings:</span>
                <span className="text-2xl font-bold text-primary-800">${totalEarnings.toFixed(2)}</span>
              </div>
              <div className="flex justify-between items-center mt-2">
                <span className="font-medium text-primary-800">Total Annual Earnings:</span>
                <span className="text-2xl font-bold text-primary-800">${totalAnnualEarnings.toFixed(2)}</span>
              </div>
              <p className="text-sm text-gray-600 mt-2 text-center">
                Passive income that grows as your network expands!
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="bg-primary-600 text-white rounded-3xl p-8 md:p-12">
        <div className="text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Start Earning?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Join TrueFans CONNECT today as a music artist and automatically become part of our affiliate program.
          </p>
          <a href="/signup?type=musician" className="btn bg-white text-primary-600 hover:bg-gray-100 px-8 py-3 text-lg">
            Join Now
          </a>
        </div>
      </section>
    </div>
  )
}

export default AffiliateProgram
