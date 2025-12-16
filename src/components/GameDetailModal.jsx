import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaGooglePlay, FaApple, FaPlay, FaXmark, FaChevronLeft, FaChevronRight } from 'react-icons/fa6';
import steamLogo from "../assets/steam.png";
import SmartImage from './SmartImage';

// Helper to handle both Game and Client Project data structures
const getEmbedUrl = (url) => {
  if (!url) return "";
  try {
    const videoId = new URL(url).searchParams.get("v");
    if (videoId) {
      return `https://www.youtube.com/embed/${videoId}?autoplay=0&mute=1&loop=1&playlist=${videoId}`;
    }
    return "";
  } catch {
    return "";
  }
};

function GameDetailModal({ game, onClose }) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  if (!game) return null;

  // 1. DATA NORMALIZATION (Fixes missing images)
  const videoId = game.youtubeUrl ? new URL(game.youtubeUrl).searchParams.get("v") : null;
  const embedUrl = videoId ? `https://www.youtube.com/embed/${videoId}?autoplay=0&mute=1&loop=1&playlist=${videoId}` : null;
  
  // Handle Main Image (Objects vs Strings)
  const mainCoverSrc = game.imageUrl?.src || game.imageUrl || "/assets/placeholder.png";
  const bannerSrc = game.bannerUrl?.src || game.bannerUrl || null;

  // Handle Gallery Images (The Fix for empty popups)
  const galleryUrls = game.galleryImages?.map(imgObj => {
      // Check all possible nesting levels React-Admin might create
      return imgObj?.src?.src || imgObj?.src || imgObj || "/assets/placeholder.png";
  }) || [];

  const nextImage = (e) => {
    e.stopPropagation();
    setCurrentImageIndex((prev) => (prev + 1) % galleryUrls.length);
  };

  const prevImage = (e) => {
    e.stopPropagation();
    setCurrentImageIndex((prev) => (prev - 1 + galleryUrls.length) % galleryUrls.length);
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm overflow-y-auto"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          className="bg-[#0f0f0f] w-full max-w-6xl rounded-3xl overflow-hidden shadow-2xl border border-red-900/30 relative my-8"
          onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside
        >
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 z-50 bg-black/50 hover:bg-red-600 text-white p-2 rounded-full transition-all"
          >
            <FaXmark size={24} />
          </button>

          {/* === SCROLLABLE CONTENT AREA === */}
          <div className="max-h-[90vh] overflow-y-auto custom-scrollbar">
            
            {/* Banner (If exists) */}
            {bannerSrc && (
                <div className="w-full h-[250px] md:h-[350px] relative">
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0f0f0f] via-transparent to-transparent z-10"></div>
                    <SmartImage src={bannerSrc} alt="Banner" className="w-full h-full" isBanner={true} />
                </div>
            )}

            <div className="p-6 md:p-10 relative z-20">
                {/* Top Section: Media + Info */}
                <div className="flex flex-col lg:flex-row gap-8 mb-10">
                    
                    {/* Left: Media */}
                    <div className="lg:w-3/5">
                        <div className="rounded-2xl overflow-hidden shadow-xl border border-gray-800 aspect-video bg-black relative">
                            {embedUrl ? (
                                <iframe
                                    src={embedUrl}
                                    title={game.title}
                                    className="w-full h-full"
                                    frameBorder="0"
                                    allowFullScreen
                                ></iframe>
                            ) : (
                                <SmartImage src={mainCoverSrc} alt={game.title} className="w-full h-full" />
                            )}
                        </div>
                    </div>

                    {/* Right: Details */}
                    <div className="lg:w-2/5 flex flex-col justify-center">
                        <h2 className="text-3xl md:text-4xl font-black text-white mb-4 uppercase">{game.title}</h2>
                        
                        <div className="flex flex-wrap gap-2 mb-6">
                            {game.tags?.map((tag, i) => (
                                <span key={i} className="px-3 py-1 text-xs font-bold uppercase text-red-200 bg-red-900/50 rounded-full border border-red-500/30">
                                    {tag}
                                </span>
                            ))}
                        </div>

                        {/* Buttons */}
                        <div className="flex flex-wrap gap-3">
                            {/* Logic to show Live Demo OR Client URL */}
                            {(game.liveDemoUrl || game.clientUrl) && (
                                <a
                                    href={game.liveDemoUrl || game.clientUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center gap-2 bg-red-600 hover:bg-red-500 text-white font-bold px-5 py-2.5 rounded-xl transition-all shadow-lg"
                                >
                                    <FaPlay /> {game.liveDemoUrl ? "Play Demo" : "View Live"}
                                </a>
                            )}
                            
                            {/* App Stores */}
                            {game.steamUrl && (
                                <a href={game.steamUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 bg-[#171a21] border border-gray-600 hover:border-gray-400 px-4 py-2 rounded-xl text-white transition-all">
                                    <img src={steamLogo} alt="Steam" className="w-6 h-6 object-contain" /> Steam
                                </a>
                            )}
                            {game.iosUrl && (
                                <a href={game.iosUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 bg-[#1a1a1a] border border-gray-700 hover:border-gray-500 px-4 py-2 rounded-xl text-white transition-all">
                                    <FaApple size={20} /> App Store
                                </a>
                            )}
                            {game.androidUrl && (
                                <a href={game.androidUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 bg-[#1a1a1a] border border-gray-700 hover:border-gray-500 px-4 py-2 rounded-xl text-white transition-all">
                                    <FaGooglePlay size={18} className="text-green-500" /> Google Play
                                </a>
                            )}
                        </div>
                    </div>
                </div>

                {/* Description */}
                <div className="mb-10 text-gray-300 leading-relaxed whitespace-pre-wrap">
                    {game.longDescription || game.description}
                </div>

                {/* Gallery Slideshow */}
                {galleryUrls.length > 0 && (
                    <div className="border-t border-gray-800 pt-8">
                        <h3 className="text-2xl font-bold text-white mb-6 text-center">Gallery</h3>
                        
                        <div className="relative w-full aspect-video max-w-4xl mx-auto bg-black rounded-xl overflow-hidden border border-gray-800">
                             {/* Arrows */}
                             {galleryUrls.length > 1 && (
                                <>
                                <button onClick={prevImage} className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/60 p-3 rounded-full text-white hover:bg-red-600 transition-all z-10"><FaChevronLeft /></button>
                                <button onClick={nextImage} className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/60 p-3 rounded-full text-white hover:bg-red-600 transition-all z-10"><FaChevronRight /></button>
                                </>
                             )}
                             
                             {/* Image */}
                             <img 
                                src={galleryUrls[currentImageIndex]} 
                                alt="Gallery" 
                                className="w-full h-full object-contain"
                             />

                             <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/70 px-3 py-1 rounded-full text-white text-xs">
                                {currentImageIndex + 1} / {galleryUrls.length}
                             </div>
                        </div>

                        {/* Thumbnails */}
                        <div className="flex gap-2 overflow-x-auto mt-4 pb-2 justify-center">
                            {galleryUrls.map((src, idx) => (
                                <button 
                                    key={idx} 
                                    onClick={() => setCurrentImageIndex(idx)}
                                    className={`w-20 h-12 rounded-lg overflow-hidden border-2 transition-all flex-shrink-0 ${currentImageIndex === idx ? 'border-red-600 opacity-100' : 'border-transparent opacity-50 hover:opacity-100'}`}
                                >
                                    <img src={src} className="w-full h-full object-cover" alt="thumb" />
                                </button>
                            ))}
                        </div>
                    </div>
                )}
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

export default GameDetailModal;