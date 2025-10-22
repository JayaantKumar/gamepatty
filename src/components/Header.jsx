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

function Header() {
  return (
    <header className="bg-black text-white shadow-md">
      <nav className="container mx-auto px-9 lg:px-12 py-6 flex justify-between items-center">
        {/* LEFT SIDE: Logo + Social Icons */}
        <div className="flex items-center gap-8 ">
          <Link to="/">
            <img
              src="/assets/gamepatty-logo.png"
              alt="GamePatty Logo"
              className="h-12 w-auto"
            />
          </Link>

          <div className="hidden md:flex items-center gap-5">
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

        {/* RIGHT SIDE: Nav Links */}
        <div className="flex items-center gap-8 text-lg">
          <Link
            to="/"
            className="text-gray-300 hover:text-white transition-colors font-semibold"
          >
            Home
          </Link>
          <Link
            to="/#games"
            className="text-gray-300 hover:text-white transition-colors font-semibold"
          >
            Our Games
          </Link>
          <Link
            to="/news"
            className="text-gray-300 hover:text-white transition-colors font-semibold"
          >
            News
          </Link>
          <Link
            to="/contact"
            className="bg-[#ff5722] text-white font-bold py-3 px-6 rounded-md hover:bg-[#ff7043] transition-all text-base"
          >
            Contact
          </Link>
        </div>
      </nav>
    </header>
  );
}

export default Header;
