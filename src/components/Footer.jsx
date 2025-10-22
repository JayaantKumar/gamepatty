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
    <footer className="bg-gradient-to-t from-[#0a0a0a] via-[#1a0000] to-[#2b0000] text-gray-300 pt-28 pb-16 border-t border-red-900 text-[1.25rem] leading-relaxed">
      <div className="container mx-auto px-[6rem] grid grid-cols-1 md:grid-cols-4 gap-16">
        
        {/* Brand / About */}
        <div>
          <Link to="/" className="inline-block mb-6">
            <img
              src="/assets/gamepatty-logo.png"
              alt="GamePatty Logo"
              className="h-16 w-auto"
            />
          </Link>
          <p className="mb-8 text-gray-400 text-[1.15rem]">
            Crafting cinematic worlds.
          </p>

          <div className="flex items-center gap-5 text-3xl">
            {socialLinks.map((social) => (
              <a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={social.label}
                className="text-gray-400 hover:text-[#ff5722] transition-colors"
              >
                {social.icon}
              </a>
            ))}
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h4 className="text-3xl font-bold text-white mb-8">Quick Links</h4>
          <ul className="space-y-4 text-[1.2rem]">
            <li>
              <Link to="/#games" className="hover:text-[#ff5722] transition-colors">
                Our Games
              </Link>
            </li>
            <li>
              <Link to="/news" className="hover:text-[#ff5722] transition-colors">
                News
              </Link>
            </li>
            <li>
              <a href="#" className="hover:text-[#ff5722] transition-colors">
                About Us
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-[#ff5722] transition-colors">
                Careers
              </a>
            </li>
          </ul>
        </div>

        {/* Contact Info */}
        <div>
          <h4 className="text-3xl font-bold text-white mb-8">Contact Us</h4>
          <p className="text-[1.15rem]">123 Gaming Street,</p>
          <p className="text-[1.15rem]">Metropolis, 10001</p>
          <p className="mt-4 text-[1.15rem]">
            <a
              href="mailto:hello@gamepatty.com"
              className="hover:text-[#ff5722] transition-colors"
            >
              hello@gamepatty.com
            </a>
          </p>
        </div>

        {/* Newsletter */}
        <div>
          <h4 className="text-3xl font-bold text-white mb-8">
            Join our Newsletter
          </h4>
          <p className="mb-6 text-gray-400 text-[1.15rem]">
            Get the latest updates on our games.
          </p>
          <form className="flex">
            <input
              type="email"
              placeholder="your@email.com"
              className="bg-[#111] text-white placeholder-gray-500 px-6 py-4 text-lg rounded-l-md focus:outline-none focus:ring-2 focus:ring-[#ff5722] flex-grow"
            />
            <button
              type="submit"
              className="bg-[#ff5722] text-white font-bold px-8 py-4 text-lg rounded-r-md hover:bg-[#ff7043] transition-all"
            >
              Sign Up
            </button>
          </form>
        </div>
      </div>

      {/* Footer bottom */}
      <div className="text-center border-t border-red-900 pt-10 mt-20 text-gray-500 text-[1.1rem]">
        <p>&copy; {new Date().getFullYear()} GamePatty. All rights reserved.</p>
      </div>
    </footer>
  );
}

export default Footer;
