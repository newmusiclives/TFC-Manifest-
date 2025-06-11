import { useState } from 'react'
import { FiChevronDown, FiChevronUp } from 'react-icons/fi'

type FAQItem = {
  question: string
  answer: string
}

const FAQ = () => {
  const [activeArtistIndex, setActiveArtistIndex] = useState<number | null>(null)
  const [activeFanIndex, setActiveFanIndex] = useState<number | null>(null)
  const [activeVenueIndex, setActiveVenueIndex] = useState<number | null>(null)
  const [activeGeneralIndex, setActiveGeneralIndex] = useState<number | null>(null)

  const artistFAQs: FAQItem[] = [
    {
      question: "How do I join TrueFans CONNECT as a music artist?",
      answer: "To join as a music artist, click on the 'Join Now' button in the 'For Music Artists' section of our website. You'll need to create an account, complete your profile with your music information, and set up your payment details to receive donations."
    },
    {
      question: "What fees does TrueFans CONNECT charge?",
      answer: "TrueFans CONNECT takes a 20% platform fee from all donations. This covers payment processing, platform maintenance, customer support, and marketing efforts to help you reach new fans. You receive 80% of all donations directly."
    },
    {
      question: "How quickly will I receive my donations?",
      answer: "Donations are processed and transferred to your account on a monthly basis. Payments are typically made on the 1st of each month for the previous month's donations, provided you've reached the minimum payout threshold of $20."
    },
    {
      question: "What content should I provide to my supporters?",
      answer: "Successful artists on our platform typically share a mix of exclusive music (demos, unreleased tracks), behind-the-scenes content (studio sessions, creative process), personal updates, early access to tickets/merchandise, and direct communication with supporters. The more value you provide, the more likely fans are to continue supporting you."
    },
    {
      question: "Can I see who my supporters are?",
      answer: "Yes, you'll have access to a dashboard showing all your supporters, their donation amounts, and their contact information (if they've opted to share it). This allows you to communicate directly with your most dedicated fans."
    },
    {
      question: "How can I promote my TrueFans CONNECT profile?",
      answer: "We recommend sharing your profile link across all your social media channels, mentioning it during performances, including it in your email newsletters, and highlighting the exclusive content supporters receive. We also provide promotional tools in your dashboard to help you effectively communicate the benefits of supporting you directly."
    },
    {
      question: "Can I offer different tiers of support?",
      answer: "Currently, fans can choose their own donation amount, either as a one-time donation or a monthly subscription. We're working on implementing formal support tiers with different benefits in the near future."
    }
  ]

  const fanFAQs: FAQItem[] = [
    {
      question: "How do I start supporting an artist?",
      answer: "Simply create an account, find the artist you want to support on our Discover page, and choose either a one-time or monthly donation. You can support multiple artists with different amounts."
    },
    {
      question: "Can I cancel my monthly donation?",
      answer: "Yes, you can cancel or modify your donation amount at any time from your account settings. Changes will take effect on your next billing date."
    },
    {
      question: "What payment methods are accepted?",
      answer: "We accept all major credit and debit cards, as well as PayPal. We're working on adding more payment options in the future."
    },
    {
      question: "How do I access exclusive content?",
      answer: "Once you're supporting an artist, you'll automatically get access to their supporter-only content through your dashboard. You'll also receive notifications when new exclusive content is available."
    },
    {
      question: "How do I know my donation is going to the music artist?",
      answer: "Transparency is important to us. You'll receive confirmation when your donation is processed, and 80% of your donation goes directly to the artist. The remaining 20% covers platform fees and payment processing."
    },
    {
      question: "Can I support an artist anonymously?",
      answer: "Yes, you can choose to keep your support anonymous. In your account settings, you can toggle whether you want the artist to see your name and contact information or remain anonymous."
    },
    {
      question: "What happens if an artist I support leaves the platform?",
      answer: "If an artist leaves the platform, your recurring donations to them will automatically be canceled. You'll receive a notification if this happens, and you won't be charged for any future payments to that artist."
    },
    {
      question: "Can I get a refund for my donation?",
      answer: "One-time donations are generally non-refundable as they go directly to supporting the artist. However, if you have concerns about your donation or believe there was an error, please contact our support team within 14 days of the donation."
    }
  ]

  const venueFAQs: FAQItem[] = [
    {
      question: "How can my venue partner with TrueFans CONNECT?",
      answer: "To partner with us, fill out the venue signup form on our Venue Services page. Our team will review your application and contact you to discuss partnership opportunities and how we can help promote artists at your venue."
    },
    {
      question: "What benefits do venues get from partnering with TrueFans CONNECT?",
      answer: "Partner venues receive access to our network of music artists, promotional support for events featuring our artists, co-marketing opportunities, and the ability to participate in our affiliate program to earn commission on new artist and fan signups."
    },
    {
      question: "How does the venue affiliate program work?",
      answer: "As a venue affiliate, you'll earn a 5% commission on all donations made to artists who join through your referral for their first year on the platform. You'll also earn a one-time $10 commission for each fan who signs up through your referral and makes their first donation."
    },
    {
      question: "Is there a cost to join as a partner venue?",
      answer: "No, there is no cost to join as a partner venue. We believe in creating mutually beneficial relationships that help support the local music ecosystem."
    },
    {
      question: "How do you promote partner venues?",
      answer: "We promote partner venues through our artist discovery platform, social media channels, email newsletters, and by encouraging our artists to book shows at partner venues. We also feature partner venues in our 'Venue Spotlight' section."
    },
    {
      question: "Can we host TrueFans CONNECT exclusive events?",
      answer: "Yes! We love working with partner venues to create exclusive events for our artists and their supporters. These events can include meet-and-greets, exclusive performances, or early access to shows for TrueFans supporters."
    }
  ]

  const generalFAQs: FAQItem[] = [
    {
      question: "What is TrueFans CONNECT?",
      answer: "TrueFans CONNECT is a platform that connects music artists directly with their fans, allowing fans to support artists financially while receiving exclusive content and benefits in return. We're building a sustainable ecosystem for independent music."
    },
    {
      question: "How is TrueFans CONNECT different from other platforms?",
      answer: "Unlike streaming platforms that pay fractions of pennies per play, we enable direct financial support from fans to artists. Unlike general crowdfunding platforms, we're specifically designed for ongoing music artist support with features tailored to the music community."
    },
    {
      question: "Is my payment information secure?",
      answer: "Yes, we use industry-standard encryption and secure payment processors. We never store your full credit card information on our servers. All transactions are processed through PCI-compliant payment providers."
    },
    {
      question: "Can I use TrueFans CONNECT in my country?",
      answer: "TrueFans CONNECT is available in most countries worldwide. However, payment options and features may vary by region due to local regulations. Check our Terms of Service for any country-specific limitations."
    },
    {
      question: "How do I contact customer support?",
      answer: "You can reach our support team by emailing support@truefansconnect.com or by using the contact form on our website. We aim to respond to all inquiries within 24-48 hours during business days."
    },
    {
      question: "Does TrueFans CONNECT have a mobile app?",
      answer: "We currently offer a mobile-responsive website that works well on all devices. We're developing dedicated iOS and Android apps that will be available in the near future."
    },
    {
      question: "How can I report inappropriate content or behavior?",
      answer: "If you encounter content or behavior that violates our community guidelines, please use the 'Report' button available on all profiles and content pages, or contact our support team directly. We take all reports seriously and will investigate promptly."
    }
  ]

  const toggleArtistFAQ = (index: number) => {
    setActiveArtistIndex(activeArtistIndex === index ? null : index)
  }

  const toggleFanFAQ = (index: number) => {
    setActiveFanIndex(activeFanIndex === index ? null : index)
  }

  const toggleVenueFAQ = (index: number) => {
    setActiveVenueIndex(activeVenueIndex === index ? null : index)
  }

  const toggleGeneralFAQ = (index: number) => {
    setActiveGeneralIndex(activeGeneralIndex === index ? null : index)
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-16">
      <div className="text-center mb-16">
        <h1 className="text-4xl md:text-5xl font-bold mb-6">Frequently Asked Questions</h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Find answers to common questions about TrueFans CONNECT for both music artists and fans.
        </p>
      </div>

      {/* First Row: For Music Artists and For Fans (side by side on desktop) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
        {/* For Music Artists Section */}
        <div>
          <h2 className="text-3xl font-bold mb-8 pb-4 border-b border-gray-200">For Music Artists</h2>
          <div className="space-y-4">
            {artistFAQs.map((faq, index) => (
              <div 
                key={`artist-faq-${index}`}
                className="border border-gray-200 rounded-lg overflow-hidden"
              >
                <button
                  className="w-full flex justify-between items-center p-5 bg-white hover:bg-gray-50 transition-colors text-left"
                  onClick={() => toggleArtistFAQ(index)}
                >
                  <h3 className="text-lg font-semibold">{faq.question}</h3>
                  {activeArtistIndex === index ? (
                    <FiChevronUp className="flex-shrink-0 ml-2 text-primary-600" />
                  ) : (
                    <FiChevronDown className="flex-shrink-0 ml-2 text-gray-400" />
                  )}
                </button>
                {activeArtistIndex === index && (
                  <div className="p-5 bg-gray-50 border-t border-gray-200">
                    <p className="text-gray-700">{faq.answer}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* For Fans Section */}
        <div>
          <h2 className="text-3xl font-bold mb-8 pb-4 border-b border-gray-200">For Fans</h2>
          <div className="space-y-4">
            {fanFAQs.map((faq, index) => (
              <div 
                key={`fan-faq-${index}`}
                className="border border-gray-200 rounded-lg overflow-hidden"
              >
                <button
                  className="w-full flex justify-between items-center p-5 bg-white hover:bg-gray-50 transition-colors text-left"
                  onClick={() => toggleFanFAQ(index)}
                >
                  <h3 className="text-lg font-semibold">{faq.question}</h3>
                  {activeFanIndex === index ? (
                    <FiChevronUp className="flex-shrink-0 ml-2 text-primary-600" />
                  ) : (
                    <FiChevronDown className="flex-shrink-0 ml-2 text-gray-400" />
                  )}
                </button>
                {activeFanIndex === index && (
                  <div className="p-5 bg-gray-50 border-t border-gray-200">
                    <p className="text-gray-700">{faq.answer}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Second Row: For Venue Owners and General (side by side on desktop) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
        {/* For Venue Owners Section */}
        <div>
          <h2 className="text-3xl font-bold mb-8 pb-4 border-b border-gray-200">For Venue Owners</h2>
          <div className="space-y-4">
            {venueFAQs.map((faq, index) => (
              <div 
                key={`venue-faq-${index}`}
                className="border border-gray-200 rounded-lg overflow-hidden"
              >
                <button
                  className="w-full flex justify-between items-center p-5 bg-white hover:bg-gray-50 transition-colors text-left"
                  onClick={() => toggleVenueFAQ(index)}
                >
                  <h3 className="text-lg font-semibold">{faq.question}</h3>
                  {activeVenueIndex === index ? (
                    <FiChevronUp className="flex-shrink-0 ml-2 text-primary-600" />
                  ) : (
                    <FiChevronDown className="flex-shrink-0 ml-2 text-gray-400" />
                  )}
                </button>
                {activeVenueIndex === index && (
                  <div className="p-5 bg-gray-50 border-t border-gray-200">
                    <p className="text-gray-700">{faq.answer}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* General Section */}
        <div>
          <h2 className="text-3xl font-bold mb-8 pb-4 border-b border-gray-200">General</h2>
          <div className="space-y-4">
            {generalFAQs.map((faq, index) => (
              <div 
                key={`general-faq-${index}`}
                className="border border-gray-200 rounded-lg overflow-hidden"
              >
                <button
                  className="w-full flex justify-between items-center p-5 bg-white hover:bg-gray-50 transition-colors text-left"
                  onClick={() => toggleGeneralFAQ(index)}
                >
                  <h3 className="text-lg font-semibold">{faq.question}</h3>
                  {activeGeneralIndex === index ? (
                    <FiChevronUp className="flex-shrink-0 ml-2 text-primary-600" />
                  ) : (
                    <FiChevronDown className="flex-shrink-0 ml-2 text-gray-400" />
                  )}
                </button>
                {activeGeneralIndex === index && (
                  <div className="p-5 bg-gray-50 border-t border-gray-200">
                    <p className="text-gray-700">{faq.answer}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Contact Section */}
      <div className="mt-16 p-8 bg-gray-50 rounded-xl text-center">
        <h2 className="text-2xl font-bold mb-4">Still have questions?</h2>
        <p className="text-gray-600 mb-6">
          If you couldn't find the answer to your question, feel free to reach out to our support team.
        </p>
        <a 
          href="mailto:support@truefansconnect.com" 
          className="btn btn-primary inline-block"
        >
          Contact Support
        </a>
      </div>
    </div>
  )
}

export default FAQ
