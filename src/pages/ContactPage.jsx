import React from 'react';
// 1. Import the hook to get data from Firebase
import useSiteSettings from '../hooks/useSiteSettings';

function ContactPage() {
  // 2. Fetch the settings
  const { settings, loading } = useSiteSettings();

  return (
    <div className="py-20 px-6 sm:px-10 md:px-20 bg-gradient-to-b from-black via-[#1a0000] to-[#2b0000] text-white min-h-screen">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl sm:text-5xl font-black text-center uppercase mb-16 tracking-wide text-white">
          Contact <span className="text-red-500">Us</span>
        </h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
          
          {/* Left Side: Contact Form (Static for now) */}
          <form onSubmit={(e) => {
            e.preventDefault();
            alert('Form submitted (this is a demo)');
          }}>
            <div className="mb-6">
              <label htmlFor="name" className="block text-lg font-semibold mb-2 text-gray-300">Your Name</label>
              <input 
                type="text" 
                id="name" 
                name="name"
                className="w-full bg-[#1a0000] border border-red-900 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-red-500"
                placeholder="John Doe"
                required
              />
            </div>
            <div className="mb-6">
              <label htmlFor="email" className="block text-lg font-semibold mb-2 text-gray-300">Your Email</label>
              <input 
                type="email" 
                id="email" 
                name="email"
                className="w-full bg-[#1a0000] border border-red-900 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-red-500"
                placeholder="john@example.com"
                required
              />
            </div>
            <div className="mb-6">
              <label htmlFor="message" className="block text-lg font-semibold mb-2 text-gray-300">Message</label>
              <textarea 
                id="message" 
                name="message"
                rows="6"
                className="w-full bg-[#1a0000] border border-red-900 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-red-500"
                placeholder="Your message..."
                required
              />
            </div>
            <button
              type="submit"
              className="bg-red-600 hover:bg-red-500 text-white font-bold px-8 py-3 text-lg rounded-xl transition-all shadow-lg hover:shadow-red-600/30 w-full"
            >
              Send Message
            </button>
          </form>

          {/* Right Side: Contact Info (DYNAMIC) */}
          <div className="text-gray-300 text-lg">
            <h3 className="text-3xl font-bold text-white mb-6">Get in Touch</h3>
            <p className="mb-8">
              Have a question, a project idea, or just want to say hello? Use the form or contact us directly.
            </p>
            
            <div className="space-y-6">
              {/* Address */}
              <div>
                <h4 className="font-semibold text-white mb-1">Address</h4>
                {loading ? (
                  <p className="text-gray-500 animate-pulse">Loading...</p>
                ) : (
                  <>
                    <p>{settings?.contactAddress1 || "123 Gaming Street"}</p>
                    <p>{settings?.contactAddress2 || "Metropolis, 10001"}</p>
                  </>
                )}
              </div>

              {/* Email */}
              <div>
                <h4 className="font-semibold text-white mb-1">Email</h4>
                {loading ? (
                  <p className="text-gray-500 animate-pulse">Loading...</p>
                ) : (
                  <p>
                    <a 
                      href={`mailto:${settings?.contactEmail}`} 
                      className="text-red-400 hover:text-red-300 transition-colors"
                    >
                      {settings?.contactEmail || "hello@gamepatty.com"}
                    </a>
                  </p>
                )}
              </div>

              {/* Phone (Only shows if added in Admin) */}
              {!loading && settings?.contactPhone && (
                <div>
                  <h4 className="font-semibold text-white mb-1">Phone</h4>
                  <p>
                    <a 
                      href={`tel:${settings.contactPhone}`} 
                      className="text-red-400 hover:text-red-300 transition-colors"
                    >
                      {settings.contactPhone}
                    </a>
                  </p>
                </div>
              )}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}

export default ContactPage;