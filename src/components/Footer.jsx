import React from 'react';
import { Link } from 'react-router-dom';

function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-400 py-16">
      <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* Logo & Social */}
        <div>
          <h3 className="text-2xl font-black text-white uppercase mb-4">
            Studio<span className="text-brand-accent">Logo</span>
          </h3>
          <p className="mb-4">Crafting cinematic worlds.</p>
          {/* Add social icons here */}
          <div className="flex space-x-4">
            <a href="#" className="hover:text-white">FB</a>
            <a href="#" className="hover:text-white">TW</a>
            <a href="#" className="hover:text-white">YT</a>
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h4 className="text-lg font-bold text-white mb-4">Quick Links</h4>
          <ul className="space-y-2">
            <li><Link to="/#games" className="hover:text-white">Our Games</Link></li>
            <li><Link to="/news" className="hover:text-white">News</Link></li>
            <li><a href="#" className="hover:text-white">About Us</a></li>
            <li><a href="#" className="hover:text-white">Careers</a></li>
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h4 className="text-lg font-bold text-white mb-4">Contact Us</h4>
          <p>123 Gaming Street,</p>
          <p>Metropolis, 10001</p>
          <p className="mt-2">
            <a href="mailto:hello@studio.com" className="hover:text-white">
              hello@studio.com
            </a>
          </p>
        </div>

        {/* Newsletter */}
        <div>
          <h4 className="text-lg font-bold text-white mb-4">Join our Newsletter</h4>
          <p className="mb-4">Get the latest updates on our games.</p>
          <form className="flex">
            <input
              type="email"
              placeholder="your@email.com"
              className="bg-gray-800 text-white px-4 py-2 rounded-l-md focus:outline-none focus:ring-2 focus:ring-brand-accent flex-grow"
            />
            <button
              type="submit"
              className="bg-brand-accent text-white font-bold px-4 py-2 rounded-r-md hover:bg-opacity-90"
            >
              Sign Up
            </button>
          </form>
        </div>
      </div>
      <div className="text-center border-t border-gray-800 pt-8 mt-12">
        <p>&copy; {new Date().getFullYear()} StudioLogo. All rights reserved.</p>
      </div>
    </footer>
  );
}

export default Footer;