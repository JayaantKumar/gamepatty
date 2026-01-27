import React, { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { FaDiscord, FaInstagram, FaLinkedin, FaXTwitter, FaYoutube } from 'react-icons/fa6';
// 1. Import EmailJS
import emailjs from '@emailjs/browser';

// === CONFIGURE YOUR EMAILJS KEYS HERE ===
const SERVICE_ID = "YOUR_SERVICE_ID";   // e.g. service_m9p...
const TEMPLATE_ID = "YOUR_TEMPLATE_ID"; // e.g. template_23d...
const PUBLIC_KEY = "YOUR_PUBLIC_KEY";   // e.g. user_82j...
// ========================================

function ContactPage() {
  const form = useRef(); // Create a reference to the form
  const [loading, setLoading] = useState(false);

  const sendEmail = (e) => {
    e.preventDefault();
    setLoading(true);

    emailjs.sendForm(SERVICE_ID, TEMPLATE_ID, form.current, PUBLIC_KEY)
      .then((result) => {
          console.log(result.text);
          alert("Message Sent Successfully! We will get back to you soon.");
          setLoading(false);
          e.target.reset(); // Clear the form
      }, (error) => {
          console.log(error.text);
          alert("Failed to send message. Please try again later.");
          setLoading(false);
      });
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
            
            {/* 2. Attach ref={form} and onSubmit={sendEmail} */}
            <form ref={form} onSubmit={sendEmail} className="space-y-6">
              
              <div>
                <label className="block text-gray-400 text-sm font-bold mb-2 uppercase tracking-wider">Your Name</label>
                <input 
                  type="text" 
                  name="from_name" // Must match EmailJS template variable
                  required
                  placeholder="John Doe"
                  className="w-full bg-[#0a0a0a] border border-gray-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-red-600 transition-colors"
                />
              </div>

              <div>
                <label className="block text-gray-400 text-sm font-bold mb-2 uppercase tracking-wider">Your Email</label>
                <input 
                  type="email" 
                  name="from_email" // Must match EmailJS template variable
                  required
                  placeholder="john@example.com"
                  className="w-full bg-[#0a0a0a] border border-gray-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-red-600 transition-colors"
                />
              </div>

              <div>
                <label className="block text-gray-400 text-sm font-bold mb-2 uppercase tracking-wider">Message</label>
                <textarea 
                  name="message" // Must match EmailJS template variable
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