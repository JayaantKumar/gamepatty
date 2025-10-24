import React, { useState } from "react";
import { Link } from "react-router-dom"; // Link is already imported, which is great
import {
  FaDiscord,
  FaInstagram,
  FaLinkedin,
  FaYoutube,
  FaXTwitter,
  FaBars,
  FaXmark,
} from "react-icons/fa6";

const socialLinks = [
  { icon: <FaDiscord />, href: "https://discord.com/your-server", label: "Discord" },
  { icon: <FaInstagram />, href: "https://instagram.com/your-profile", label: "Instagram" },
  { icon: <FaLinkedin />, href: "https://linkedin.com/your-profile", label: "LinkedIn" },
  { icon: <FaXTwitter />, href: "https://twitter.com/your-profile", label: "X" },
  { icon: <FaYoutube />, href: "https://youtube.com/your-channel", label: "YouTube" },
];

// Helper function for smooth scrolling in mobile menu
const smoothScrollTo = (id, callback) => {
  callback(); // Close mobile menu
  setTimeout(() => {
    const element = document.querySelector(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  }, 100);
};

function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
  };

  return (
    <header className="bg-black text-white shadow-md sticky top-0 z-50">
      <nav className="container mx-auto px-4 sm:px-6 lg:px-12 py-4 lg:py-6 flex justify-between items-center">
        {/* LEFT SIDE: Logo + Social Icons */}
        <div className="flex items-center gap-4 lg:gap-8">
          <Link to="/" onClick={closeMobileMenu}>
            <img
              src="/assets/gamepatty-logo.png"
              alt="GamePatty Logo"
              className="h-10 sm:h-12 w-auto"
            />
          </Link>

          {/* Social Icons - Hidden on mobile */}
          <div className="hidden lg:flex items-center gap-5">
            {socialLinks.map((social) => (
              <a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={social.label}
                className="text-gray-300 hover:text-[#ff5722] transition-colors text-2xl"
              >
                {social.icon}
              </a>
            ))}
          </div>
        </div>

        {/* === RIGHT SIDE: Nav Links - Desktop (FIXED) === */}
        <div className="hidden lg:flex items-center gap-8 text-lg">
          <Link
            to="/"
            className="text-gray-300 hover:text-white transition-colors font-semibold"
          >
            Home
          </Link>
          {/* Changed from <a> to <Link> and updated 'to' prop */}
          <Link
            to="/#new-releases"
            className="text-gray-300 hover:text-white transition-colors font-semibold"
          >
            New Releases
          </Link>
          {/* Changed from <a> to <Link> and updated 'to' prop */}
          <Link
            to="/#games"
            className="text-gray-300 hover:text-white transition-colors font-semibold"
          >
            Our Games
          </Link>
          {/* Changed from <a> to <Link> and updated 'to' prop */}
          <Link
            to="/#client-projects"
            className="text-gray-300 hover:text-white transition-colors font-semibold"
          >
            Client's Work
          </Link>
          {/* Changed from <a> to <Link> and updated 'to' prop */}
          <Link
            to="/#coming-soon"
            className="text-gray-300 hover:text-white transition-colors font-semibold"
          >
            Coming Soon
          </Link>
          {/* This one was already correct */}
          <Link
            to="/contact"
            className="bg-[#ff5722] text-white font-bold py-3 px-6 rounded-md hover:bg-[#ff7043] transition-all text-base"
          >
            Contact
          </Link>
        </div>
        {/* === END OF FIX === */}

        {/* Mobile Menu Button */}
        <button
          onClick={toggleMobileMenu}
          className="lg:hidden text-white text-3xl focus:outline-none"
          aria-label="Toggle mobile menu"
        >
          {mobileMenuOpen ? <FaXmark /> : <FaBars />}
        </button>
      </nav>

      {/* Mobile Menu Overlay (This was already correct, no changes) */}
      {mobileMenuOpen && (
        <div className="lg:hidden absolute left-0 right-0 bg-black/98 z-40 border-t border-gray-800">
          <div className="flex flex-col items-center py-8 space-y-6 px-6">
            <Link
              to="/"
              onClick={closeMobileMenu}
              className="text-gray-300 hover:text-white transition-colors font-semibold text-xl"
            >
              Home
            </Link>
            <a
              href="#new-releases"
              onClick={() => smoothScrollTo('#new-releases', closeMobileMenu)}
              className="text-gray-300 hover:text-white transition-colors font-semibold text-xl"
            >
              New Releases
            </a>
            <a
              href="#games"
              onClick={() => smoothScrollTo('#games', closeMobileMenu)}
              className="text-gray-300 hover:text-white transition-colors font-semibold text-xl"
            >
              Our Games
            </a>
            <a
              href="#client-projects"
              onClick={() => smoothScrollTo('#client-projects', closeMobileMenu)}
              className="text-gray-300 hover:text-white transition-colors font-semibold text-xl"
            >
              Client's Work
            </a>
            <a
              href="#coming-soon"
              onClick={() => smoothScrollTo('#coming-soon', closeMobileMenu)}
              className="text-gray-300 hover:text-white transition-colors font-semibold text-xl"
            >
              Coming Soon
            </a>
            <Link
              to="/contact"
              onClick={closeMobileMenu}
              className="bg-[#ff5722] text-white font-bold py-3 px-6 rounded-md hover:bg-[#ff7043] transition-all text-lg"
            >
              Contact
            </Link>

            {/* Mobile Social Icons */}
            <div className="flex items-center gap-5 pt-6 border-t border-gray-700 w-full justify-center">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  className="text-gray-300 hover:text-[#ff5722] transition-colors text-2xl"
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>
        </div>
      )}
    </header>
  );
}

export default Header;