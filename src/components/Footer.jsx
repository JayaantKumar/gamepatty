import React from "react";
import { Link } from "react-router-dom";
import {
  FaDiscord,
  FaInstagram,
  FaLinkedin,
  FaYoutube,
  FaXTwitter,
} from "react-icons/fa6";

const socialLinks = [
  { icon: <FaDiscord />, href: "https://discord.com/your-server", label: "Discord" },
  { icon: <FaInstagram />, href: "https://instagram.com/your-profile", label: "Instagram" },
  { icon: <FaLinkedin />, href: "https://linkedin.com/your-profile", label: "LinkedIn" },
  { icon: <FaXTwitter />, href: "https://twitter.com/your-profile", label: "X" },
  { icon: <FaYoutube />, href: "https://youtube.com/your-channel", label: "YouTube" },
];

function Footer() {
  return (
    <footer className="bg-gradient-to-t from-[#0a0a0a] via-[#1a0000] to-[#2b0000] text-gray-300 pt-24 pb-12 border-t border-red-900 text-[1.1rem] leading-relaxed">
      <div className="container mx-auto px-6 sm:px-10 md:px-20 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-12 sm:gap-16">
        
        {/* Brand / About */}
        <div className="flex flex-col items-center md:items-start text-center md:text-left">
          <Link to="/" className="inline-block mb-6">
            <img
              src="/assets/gamepatty-logo.png"
              alt="GamePatty Logo"
              className="h-14 sm:h-16 w-auto"
            />
          </Link>
          <p className="mb-8 text-gray-400 text-[1rem] sm:text-[1.05rem]">
            Crafting cinematic worlds.
          </p>

          <div className="flex items-center justify-center md:justify-start gap-5 text-2xl sm:text-3xl">
            {socialLinks.map((social) => (
              <a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={social.label}
                className="text-gray-400 hover:text-[#ff5722] transition-colors duration-300"
              >
                {social.icon}
              </a>
            ))}
          </div>
        </div>

        {/* Quick Links */}
        <div className="text-center md:text-left">
          <h4 className="text-2xl sm:text-3xl font-bold text-white mb-6 sm:mb-8">
            Quick Links
          </h4>
          <ul className="space-y-3 sm:space-y-4 text-[1rem] sm:text-[1.1rem]">
            <li>
              <Link to="/#games" className="hover:text-[#ff5722] transition-colors">
                Our Games
              </Link>
            </li>
            {/* === REMOVED "News" === */}
            <li>
              {/* === CHANGED "About Us" to a page link === */}
              <Link to="/about" className="hover:text-[#ff5722] transition-colors">
                About Us
              </Link>
            </li>
            {/* === REMOVED "Careers" === */}
            <li>
              <Link to="/privacy-policy" className="hover:text-[#ff5722] transition-colors">
                Privacy Policy
              </Link>
            </li>
            <li>
              <Link to="/cookie-policy" className="hover:text-[#ff5722] transition-colors">
                Cookie Policy
              </Link>
            </li>
            <li>
              {/* === FIXED LINK === */}
              <Link to="/terms-of-service" className="hover:text-[#ff5722] transition-colors">
                Terms of Service
              </Link>
            </li>
          </ul>
        </div>

        {/* Contact Info */}
        <div className="text-center md:text-left">
          <h4 className="text-2xl sm:text-3xl font-bold text-white mb-6 sm:mb-8">
            Contact Us
          </h4>
          <p className="text-[1rem] sm:text-[1.1rem]">123 Gaming Street,</p>
          <p className="text-[1rem] sm:text-[1.1rem]">Metropolis, 10001</p>
          <p className="mt-4">
            <a
              href="mailto:hello@gamepatty.com"
              className="hover:text-[#ff5722] transition-colors"
            >
              hello@gamepatty.com
            </a>
          </p>
          <p className="mt-2">
            <a
              href="tel:+917880006228"
              className="hover:text-[#ff5722] transition-colors"
            >
              +91 7880006228
            </a>
          </p>
        </div>
      </div>

      {/* Footer bottom */}
      <div className="text-center border-t border-red-900 pt-8 mt-16 text-gray-500 text-[0.95rem] sm:text-[1rem]">
        <p>
          &copy; {new Date().getFullYear()} <span className="text-white font-semibold">GamePatty</span>. All rights reserved.
        </p>
        <p className="mt-3">
          Built with ❤️ by <span className="text-[#ff5722] font-semibold">GamePatty Studios</span>
        </p>
      </div>
    </footer>
  );
}

export default Footer;