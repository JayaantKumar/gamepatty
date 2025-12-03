import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  FaDiscord,
  FaInstagram,
  FaLinkedin,
  FaYoutube,
  FaXTwitter,
  FaBars,
  FaXmark,
} from "react-icons/fa6";
import useSiteSettings from "../hooks/useSiteSettings"; // 1. Import Hook

function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { settings } = useSiteSettings(); // 2. Get Settings

  // 3. Helper to generate social links array dynamically (Same as Footer)
  const getSocialLinks = () => {
    if (!settings) return [];
    const links = [];
    if (settings.socialDiscord) links.push({ icon: <FaDiscord />, href: settings.socialDiscord, label: "Discord" });
    if (settings.socialInstagram) links.push({ icon: <FaInstagram />, href: settings.socialInstagram, label: "Instagram" });
    if (settings.socialLinkedin) links.push({ icon: <FaLinkedin />, href: settings.socialLinkedin, label: "LinkedIn" });
    if (settings.socialTwitter) links.push({ icon: <FaXTwitter />, href: settings.socialTwitter, label: "X" });
    if (settings.socialYoutube) links.push({ icon: <FaYoutube />, href: settings.socialYoutube, label: "YouTube" });
    return links;
  };

  const socialLinks = getSocialLinks();

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
  };

  const handleNavigation = (e, sectionId) => {
    e.preventDefault();
    closeMobileMenu();
    if (location.pathname === "/") {
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    } else {
      navigate("/");
      setTimeout(() => {
        const element = document.getElementById(sectionId);
        if (element) {
          element.scrollIntoView({ behavior: "smooth" });
        }
      }, 100);
    }
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

        {/* RIGHT SIDE: Nav Links - Desktop */}
        <div className="hidden lg:flex items-center gap-8 text-lg">
          <Link to="/" className="text-gray-300 hover:text-white transition-colors font-semibold">Home</Link>
          <a href="#new-releases" onClick={(e) => handleNavigation(e, "new-releases")} className="text-gray-300 hover:text-white transition-colors font-semibold cursor-pointer">New Releases</a>
          <a href="#games" onClick={(e) => handleNavigation(e, "games")} className="text-gray-300 hover:text-white transition-colors font-semibold cursor-pointer">Our Games</a>
          <a href="#client-projects" onClick={(e) => handleNavigation(e, "client-projects")} className="text-gray-300 hover:text-white transition-colors font-semibold cursor-pointer">Client's Work</a>
          <a href="#coming-soon" onClick={(e) => handleNavigation(e, "coming-soon")} className="text-gray-300 hover:text-white transition-colors font-semibold cursor-pointer">Coming Soon</a>
          <Link to="/contact" className="bg-[#ff5722] text-white font-bold py-3 px-6 rounded-md hover:bg-[#ff7043] transition-all text-base">Contact</Link>
        </div>

        {/* Mobile Menu Button */}
        <button onClick={toggleMobileMenu} className="lg:hidden text-white text-3xl focus:outline-none" aria-label="Toggle mobile menu">
          {mobileMenuOpen ? <FaXmark /> : <FaBars />}
        </button>
      </nav>

      {/* Mobile Menu Overlay */}
      {mobileMenuOpen && (
        <div className="lg:hidden absolute left-0 right-0 bg-black/98 z-40 border-t border-gray-800">
          <div className="flex flex-col items-center py-8 space-y-6 px-6">
            <Link to="/" onClick={closeMobileMenu} className="text-gray-300 hover:text-white transition-colors font-semibold text-xl">Home</Link>
            <a href="#new-releases" onClick={(e) => handleNavigation(e, "new-releases")} className="text-gray-300 hover:text-white transition-colors font-semibold text-xl cursor-pointer">New Releases</a>
            <a href="#games" onClick={(e) => handleNavigation(e, "games")} className="text-gray-300 hover:text-white transition-colors font-semibold text-xl cursor-pointer">Our Games</a>
            <a href="#client-projects" onClick={(e) => handleNavigation(e, "client-projects")} className="text-gray-300 hover:text-white transition-colors font-semibold text-xl cursor-pointer">Client's Work</a>
            <a href="#coming-soon" onClick={(e) => handleNavigation(e, "coming-soon")} className="text-gray-300 hover:text-white transition-colors font-semibold text-xl cursor-pointer">Coming Soon</a>
            <Link to="/contact" onClick={closeMobileMenu} className="bg-[#ff5722] text-white font-bold py-3 px-6 rounded-md hover:bg-[#ff7043] transition-all text-lg">Contact</Link>

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