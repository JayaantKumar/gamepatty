import React from 'react';
import { Link } from 'react-router-dom';

// 1. Make sure this path to your logo is correct!
import logoImg from '../assets/gamepatty-logo.png'; 

function Header() {
  return (
    // 2. This now uses your 'surface-dark' color
    <header className="bg-surface-dark bg-opacity-80 backdrop-blur-md sticky top-0 z-50">
      <nav className="container mx-auto px-4 py-5 flex justify-between items-center">
        
        <Link to="/">
          <img 
            src={logoImg} 
            alt="GamePatty Logo" 
            className="h-10 w-auto" 
          />
        </Link>
        
        <div className="space-x-6">
          {/* 3. These links now use 'text-light' and 'brand-yellow' for hover */}
          <Link to="/" className="text-text-light hover:text-brand-yellow transition-colors">
            Home
          </Link>
          <Link to="/#games" className="text-text-light hover:text-brand-yellow transition-colors">
            Our Games
          </Link>
          <Link to="/news" className="text-text-light hover:text-brand-yellow transition-colors">
            News
          </Link>
          
          {/* 4. This is the 'Contact' button that was missing. It uses 'brand-red' */}
          <Link
            to="/contact"
            className="bg-brand-red text-white font-bold py-2 px-4 rounded-md hover:bg-brand-orange transition-all"
          >
            Contact
          </Link>
        </div>
      </nav>
    </header>
  );
}

export default Header;