import React from "react";
import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer className="bg-gradient-to-t from-[#0a0a0a] via-[#1a0000] to-[#2b0000] text-gray-300 pt-24 pb-14 border-t border-red-900 text-[1.125rem] leading-relaxed">
      <div className="container mx-auto px-[5.5rem] grid grid-cols-1 md:grid-cols-4 gap-14">
        {/* Brand / About */}
        <div>
          <h3 className="text-4xl font-black text-white uppercase mb-6 tracking-wide">
            Studio<span className="text-red-500">Logo</span>
          </h3>
          <p className="mb-6 text-gray-400 text-[1.05rem]">
            Crafting cinematic worlds.
          </p>
          <div className="flex space-x-6 text-lg text-gray-400">
            <a href="#" className="hover:text-red-400 transition-colors">
              FB
            </a>
            <a href="#" className="hover:text-red-400 transition-colors">
              TW
            </a>
            <a href="#" className="hover:text-red-400 transition-colors">
              YT
            </a>
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h4 className="text-2xl font-bold text-white mb-6">Quick Links</h4>
          <ul className="space-y-3 text-[1.1rem]">
            <li>
              <Link to="/#games" className="hover:text-red-400 transition-colors">
                Our Games
              </Link>
            </li>
            <li>
              <Link to="/news" className="hover:text-red-400 transition-colors">
                News
              </Link>
            </li>
            <li>
              <a href="#" className="hover:text-red-400 transition-colors">
                About Us
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-red-400 transition-colors">
                Careers
              </a>
            </li>
          </ul>
        </div>

        {/* Contact Info */}
        <div>
          <h4 className="text-2xl font-bold text-white mb-6">Contact Us</h4>
          <p className="text-[1.05rem]">123 Gaming Street,</p>
          <p className="text-[1.05rem]">Metropolis, 10001</p>
          <p className="mt-3 text-[1.05rem]">
            <a
              href="mailto:hello@studio.com"
              className="hover:text-red-400 transition-colors"
            >
              hello@studio.com
            </a>
          </p>
        </div>

        {/* Newsletter */}
        <div>
          <h4 className="text-2xl font-bold text-white mb-6">
            Join our Newsletter
          </h4>
          <p className="mb-6 text-gray-400 text-[1.05rem]">
            Get the latest updates on our games.
          </p>
          <form className="flex">
            <input
              type="email"
              placeholder="your@email.com"
              className="bg-[#111] text-white placeholder-gray-500 px-5 py-3 text-lg rounded-l-md focus:outline-none focus:ring-2 focus:ring-red-500 flex-grow"
            />
            <button
              type="submit"
              className="bg-red-600 text-white font-bold px-6 py-3 text-lg rounded-r-md hover:bg-red-500 transition-all"
            >
              Sign Up
            </button>
          </form>
        </div>
      </div>

      {/* Footer bottom */}
      <div className="text-center border-t border-red-900 pt-10 mt-16 text-gray-500 text-[1rem]">
        <p>&copy; {new Date().getFullYear()} StudioLogo. All rights reserved.</p>
      </div>
    </footer>
  );
}

export default Footer;
