import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaDiscord, FaInstagram, FaLinkedin, FaXTwitter, FaYoutube } from 'react-icons/fa6';

function ContactPage() {
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    
    // Simulate sending (just a demo)
    setTimeout(() => {
        alert("Form submitted (this is a demo)");
        setLoading(false);
        e.target.reset(); 
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-black text-white pt-24 pb-20 px-6">
      <div className="max-w-6xl mx-auto">
        
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-6xl font-black uppercase tracking-wide mb-4">
            Get in <span className="text-red-600">Touch</span>
          </h1>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Have a project in mind? Want to collaborate on a game? Or just want to say hi? 
            Fill out the form below or reach out directly.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
          
          {/* Left: Contact Form */}
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-[#111] p-8 md:p-10 rounded-3xl border border-gray-800 shadow-2xl"
          >
            <h2 className="text-2xl font-bold mb-6 text-white">Send a Message</h2>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              
              <div>
                <label className="block text-gray-400 text-sm font-bold mb-2 uppercase tracking-wider">Your Name</label>
                <input 
                  type="text" 
                  required
                  placeholder="John Doe"
                  className="w-full bg-[#0a0a0a] border border-gray-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-red-600 transition-colors"
                />
              </div>

              <div>
                <label className="block text-gray-400 text-sm font-bold mb-2 uppercase tracking-wider">Your Email</label>
                <input 
                  type="email" 
                  required
                  placeholder="john@example.com"
                  className="w-full bg-[#0a0a0a] border border-gray-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-red-600 transition-colors"
                />
              </div>

              <div>
                <label className="block text-gray-400 text-sm font-bold mb-2 uppercase tracking-wider">Message</label>
                <textarea 
                  required
                  rows="5"
                  placeholder="Tell us about your project..."
                  className="w-full bg-[#0a0a0a] border border-gray-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-red-600 transition-colors resize-none"
                ></textarea>
              </div>

              <button 
                type="submit" 
                disabled={loading}
                className={`w-full bg-red-600 hover:bg-red-700 text-white font-bold py-4 rounded-xl transition-all uppercase tracking-widest shadow-lg ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
              >
                {loading ? 'Sending...' : 'Send Message'}
              </button>
            </form>
          </motion.div>

          {/* Right: Contact Info */}
          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="flex flex-col justify-center space-y-10"
          >
            {/* Info Cards */}
            <div className="space-y-8">
                <div>
                    <h3 className="text-xl font-bold text-white mb-2">Address</h3>
                    <p className="text-gray-400 text-lg">Street 32 Sector 4<br/>Bhilai, Chhattisgarh, India 490001</p>
                </div>
                <div>
                    <h3 className="text-xl font-bold text-white mb-2">Email</h3>
                    <a href="mailto:developer.sbgames@gmail.com" className="text-red-500 text-lg hover:underline">developer.sbgames@gmail.com</a>
                </div>
            </div>

            {/* Social Links */}
            <div>
                <h3 className="text-xl font-bold text-white mb-6">Follow Us</h3>
                <div className="flex gap-4">
                    <a href="#" className="w-12 h-12 bg-[#1a1a1a] rounded-full flex items-center justify-center text-gray-400 hover:bg-red-600 hover:text-white transition-all"><FaDiscord size={24} /></a>
                    <a href="#" className="w-12 h-12 bg-[#1a1a1a] rounded-full flex items-center justify-center text-gray-400 hover:bg-red-600 hover:text-white transition-all"><FaInstagram size={24} /></a>
                    <a href="#" className="w-12 h-12 bg-[#1a1a1a] rounded-full flex items-center justify-center text-gray-400 hover:bg-red-600 hover:text-white transition-all"><FaLinkedin size={24} /></a>
                    <a href="#" className="w-12 h-12 bg-[#1a1a1a] rounded-full flex items-center justify-center text-gray-400 hover:bg-red-600 hover:text-white transition-all"><FaXTwitter size={24} /></a>
                    <a href="#" className="w-12 h-12 bg-[#1a1a1a] rounded-full flex items-center justify-center text-gray-400 hover:bg-red-600 hover:text-white transition-all"><FaYoutube size={24} /></a>
                </div>
            </div>
          </motion.div>

        </div>
      </div>
    </div>
  );
}

export default ContactPage;