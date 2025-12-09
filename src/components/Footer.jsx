import React from "react";
import { Link } from "react-router-dom";
import {
  FaDiscord,
  FaInstagram,
  FaLinkedin,
  FaYoutube,
  FaXTwitter,
} from "react-icons/fa6";
import useSiteSettings from "../hooks/useSiteSettings"; // 1. Import Hook

function Footer() {
  const { settings } = useSiteSettings(); // 2. Get Settings

  // 3. Helper to generate social links array dynamically
  const getSocialLinks = () => {
    if (!settings) return [];
    const links = [];
    if (settings.socialDiscord)
      links.push({
        icon: <FaDiscord />,
        href: settings.socialDiscord,
        label: "Discord",
      });
    if (settings.socialInstagram)
      links.push({
        icon: <FaInstagram />,
        href: settings.socialInstagram,
        label: "Instagram",
      });
    if (settings.socialLinkedin)
      links.push({
        icon: <FaLinkedin />,
        href: settings.socialLinkedin,
        label: "LinkedIn",
      });
    if (settings.socialTwitter)
      links.push({
        icon: <FaXTwitter />,
        href: settings.socialTwitter,
        label: "X",
      });
    if (settings.socialYoutube)
      links.push({
        icon: <FaYoutube />,
        href: settings.socialYoutube,
        label: "YouTube",
      });
    return links;
  };

  const socialLinks = getSocialLinks();

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
            {/* Use the setting, or fallback to the default if empty */}
            {settings?.siteTagline || "Crafting cinematic worlds."}
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
              <Link
                to="/#games"
                className="hover:text-[#ff5722] transition-colors"
              >
                Our Games
              </Link>
            </li>
            <li>
              <Link
                to="/about"
                className="hover:text-[#ff5722] transition-colors"
              >
                About Us
              </Link>
            </li>
            <li>
              <Link
                to="/privacy-policy"
                className="hover:text-[#ff5722] transition-colors"
              >
                Privacy Policy
              </Link>
            </li>
            <li>
              <Link
                to="/cookie-policy"
                className="hover:text-[#ff5722] transition-colors"
              >
                Cookie Policy
              </Link>
            </li>
            <li>
              <Link
                to="/terms-of-service"
                className="hover:text-[#ff5722] transition-colors"
              >
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
          {/* 4. Use Dynamic Data */}
          <p className="text-[1rem] sm:text-[1.1rem]">
            {settings?.contactAddress1 || "Address Line 1"}
          </p>
          <p className="text-[1rem] sm:text-[1.1rem]">
            {settings?.contactAddress2 || "Address Line 2"}
          </p>

          <p className="mt-4">
            <a
              href={`mailto:${settings?.contactEmail}`}
              className="hover:text-[#ff5722] transition-colors"
            >
              {settings?.contactEmail || "email@example.com"}
            </a>
          </p>

          {settings?.contactPhone && (
            <p className="mt-2">
              <a
                href={`tel:${settings.contactPhone}`}
                className="hover:text-[#ff5722] transition-colors"
              >
                {settings.contactPhone}
              </a>
            </p>
          )}
        </div>
      </div>

      <div className="text-center border-t border-red-900 pt-8 mt-16 text-gray-500 text-[0.95rem] sm:text-[1rem]">
        <p>
          &copy; {new Date().getFullYear()}{" "}
          <span className="text-white font-semibold">GamePatty</span>. All
          rights reserved.
        </p>
        <p className="mt-3">
          Built with ❤️ by{" "}
          <span className="text-[#ff5722] font-semibold">GamePatty Studios</span>
        </p>
      </div>
    </footer>
  );
}

export default Footer;
