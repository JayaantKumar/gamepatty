import React from 'react';
import { Link } from 'react-router-dom';

function Header() {
  return (
    <header className="bg-brand-dark bg-opacity-80 backdrop-blur-md sticky top-0 z-50">
      <nav className="container mx-auto px-4 py-5 flex justify-between items-center">
        <Link to="/" className="text-2xl font-black text-white uppercase">
          Studio<span className="text-brand-accent">Logo</span>
        </Link>
        <div className="space-x-6">
          <Link to="/" className="text-gray-300 hover:text-white transition-colors">
            Home
          </Link>
          <Link to="/#games" className="text-gray-300 hover:text-white transition-colors">
            Our Games
          </Link>
          <Link to="/news" className="text-gray-300 hover:text-white transition-colors">
            News
          </Link>
          <Link
            to="/contact"
            className="bg-brand-accent text-white font-bold py-2 px-4 rounded-md hover:bg-opacity-90 transition-all"
          >
            Contact
          </Link>
        </div>
      </nav>
    </header>
  );
}

export default Header;