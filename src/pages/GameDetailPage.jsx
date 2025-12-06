import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { FaGooglePlay, FaApple, FaPlay, FaXmark, FaChevronLeft, FaChevronRight } from 'react-icons/fa6';
import useGameBySlug from '../hooks/useGameBySlug';
import steamLogo from "../assets/steam.png";
import SmartImage from '../components/SmartImage';

function GameDetailPage() {
  const { slug } = useParams();
  const { game, loading, error } = useGameBySlug(slug);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  if (loading) return <div className="min-h-screen flex items-center justify-center text-white">Loading...</div>;
  if (error || !game) return <div className="min-h-screen flex items-center justify-center text-red-500">Game not found.</div>;

  const videoId = game.youtubeUrl ? new URL(game.youtubeUrl).searchParams.get("v") : null;
  const embedUrl = videoId ? `https://www.youtube.com/embed/${videoId}?autoplay=0&mute=1&loop=1&playlist=${videoId}` : null;

  const mainCoverSrc = game.imageUrl?.src || game.imageUrl || "/assets/placeholder.png";

  const bannerSrc = game.bannerUrl?.src || game.bannerUrl || null;

  const openLightbox = (index) => {
    setCurrentImageIndex(index);
    setLightboxOpen(true);
  };

  const closeLightbox = () => setLightboxOpen(false);
  
  const nextImage = (e) => {
    e.stopPropagation();
    setCurrentImageIndex((prev) => (prev + 1) % game.galleryImages.length);
  };

  const prevImage = (e) => {
    e.stopPropagation();
    setCurrentImageIndex((prev) => (prev - 1 + game.galleryImages.length) % game.galleryImages.length);
  };

  return (
    <div className="bg-[#0a0a0a] text-gray-100 min-h-screen pb-20">
        
      {bannerSrc && (
        <div className="w-full h-[300px] md:h-[450px] relative mb-8">
          <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-transparent to-transparent z-10"></div>
          <SmartImage src={bannerSrc} alt={`${game.title} Banner`} className="w-full h-full" isBanner={true} />
        </div>
      )}

      <div className="container mx-auto px-4 max-w-6xl">
        
        <Link to="/" className="inline-flex items-center gap-2 text-gray-400 hover:text-white transition-colors mb-8 group">
            <FaChevronLeft className="group-hover:-translate-x-1 transition-transform"/> Back to Games
        </Link>

        <div className="flex flex-col lg:flex-row gap-10 mb-16">
            
            <div className="lg:w-3/5 flex-shrink-0">
                <div className="rounded-3xl overflow-hidden shadow-2xl border border-red-900/50 aspect-video relative bg-black">
                    {embedUrl ? (
                        <iframe
                            src={embedUrl}
                            title={game.title}
                            frameBorder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                            className="w-full h-full"
                        ></iframe>
                    ) : (
                        <SmartImage src={mainCoverSrc} alt={game.title} className="w-full h-full" />
                    )}
                </div>
            </div>

            <div className="lg:w-2/5 flex flex-col justify-center">
                <h1 className="text-4xl md:text-5xl font-black text-white mb-6 tracking-wide uppercase drop-shadow-lg">{game.title}</h1>
                
                <div className="flex flex-wrap gap-3 mb-8">
                    {game.tags?.map((tag, index) => (
                        <span key={index} className="px-4 py-1.5 text-sm font-bold uppercase tracking-wider text-red-100 bg-red-900/80 rounded-full border border-red-500/30">
                            {tag}
                        </span>
                    ))}
                </div>

                {/* 🔥 UPDATED DESCRIPTION SECTION */}
                <div className="text-lg text-gray-300 leading-relaxed mb-10 whitespace-pre-wrap font-light">
                  {game.longDescription || game.description}
                </div>
                {/* -------------------------------- */}

                <div className="flex flex-col sm:flex-row sm:flex-wrap gap-4 items-start sm:items-center">
                    
                    {game.liveDemoUrl && (
                      <motion.a
                        href={game.liveDemoUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        whileHover={{ scale: 1.05, backgroundColor: '#dc2626' }}
                        whileTap={{ scale: 0.95 }}
                        className="flex items-center gap-2 bg-red-600 text-white font-bold px-6 py-3 rounded-xl shadow-lg shadow-red-600/20 transition-all"
                      >
                        <FaPlay size={20} /> Play Live Demo
                      </motion.a>
                    )}

                    {game.steamUrl && (
                      <motion.a
                        href={game.steamUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        whileHover={{ scale: 1.05, boxShadow: "0px 0px 15px rgba(23, 26, 33, 0.5)" }}
                        whileTap={{ scale: 0.95 }}
                        className="flex items-center gap-2 bg-[#171a21] border border-gray-600 hover:border-gray-400 px-4 py-2 rounded-xl transition-all"
                      >
                        <img src={steamLogo} alt="Steam" className="w-7 h-7 object-contain" />
                        <div className="flex flex-col text-left leading-tight">
                          <span className="text-xs text-gray-400">Download on</span>
                          <span className="text-sm font-semibold text-white">Steam</span>
                        </div>
                      </motion.a>
                    )}

                    {game.iosUrl && (
                      <motion.a
                        href={game.iosUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        whileHover={{ scale: 1.05, boxShadow: "0px 0px 15px rgba(255,255,255,0.1)" }}
                        whileTap={{ scale: 0.95 }}
                        className="flex items-center gap-2 bg-[#1a1a1a] border border-gray-700 hover:border-gray-500 px-4 py-2 rounded-xl transition-all"
                      >
                        <FaApple size={28} />
                        <div className="flex flex-col text-left leading-tight">
                          <span className="text-xs text-gray-400">Download on</span>
                          <span className="text-sm font-semibold">App Store</span>
                        </div>
                      </motion.a>
                    )}
                    
                    {game.androidUrl && (
                      <motion.a
                        href={game.androidUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        whileHover={{ scale: 1.05, boxShadow: "0px 0px 15px rgba(0,255,100,0.1)" }}
                        whileTap={{ scale: 0.95 }}
                        className="flex items-center gap-2 bg-[#1a1a1a] border border-gray-700 hover:border-gray-500 px-4 py-2 rounded-xl transition-all"
                      >
                        <FaGooglePlay size={26} className="text-green-500" />
                        <div className="flex flex-col text-left leading-tight">
                          <span className="text-xs text-gray-400">Get it on</span>
                          <span className="text-sm font-semibold">Google Play</span>
                        </div>
                      </motion.a>
                    )}
                </div>
            </div>
        </div>

        {game.galleryImages && game.galleryImages.length > 0 && (
            <div className="mb-16">
                <h2 className="text-3xl font-bold text-white mb-8 tracking-wide text-center"><span className="text-red-500">Gameplay</span> Gallery</h2>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
                    {game.galleryImages.map((imgObj, index) => {
                         const imgSrc = imgObj?.src?.src || imgObj?.src || "/assets/placeholder.png";
                         return (
                        <motion.div 
                            key={index}
                            whileHover={{ scale: 1.03 }}
                            className="aspect-video rounded-2xl overflow-hidden border border-red-900/30 shadow-lg cursor-pointer bg-black/50 relative group"
                            onClick={() => openLightbox(index)}
                        >
                            <img src={imgSrc} alt={`Screenshot ${index + 1}`} className="w-full h-full object-cover group-hover:opacity-80 transition-opacity" />
                            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors"></div>
                        </motion.div>
                         )
                    })}
                </div>
            </div>
        )}
      </div>

      <AnimatePresence>
        {lightboxOpen && (
            <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center p-4 backdrop-blur-sm"
                onClick={closeLightbox}
            >
                <button className="absolute top-6 right-6 text-gray-400 hover:text-white transition-colors">
                    <FaXmark size={32} />
                </button>

                <div className="relative w-full max-w-5xl aspect-video" onClick={e => e.stopPropagation()}>
                    {game.galleryImages.length > 1 && (
                        <>
                        <button className="absolute left-4 top-1/2 -translate-y-1/2 p-2 bg-black/50 hover:bg-red-600/80 rounded-full text-white transition-all z-10" onClick={prevImage}>
                            <FaChevronLeft size={24} />
                        </button>
                        <button className="absolute right-4 top-1/2 -translate-y-1/2 p-2 bg-black/50 hover:bg-red-600/80 rounded-full text-white transition-all z-10" onClick={nextImage}>
                            <FaChevronRight size={24} />
                        </button>
                        </>
                    )}

                    <img 
                        src={game.galleryImages[currentImageIndex]?.src?.src || game.galleryImages[currentImageIndex]?.src} 
                        alt={`Gallery Image ${currentImageIndex + 1}`} 
                        className="w-full h-full object-contain rounded-lg shadow-2xl border border-gray-800"
                    />

                    <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-gray-400 text-sm bg-black/60 px-3 py-1 rounded-full">
                        {currentImageIndex + 1} / {game.galleryImages.length}
                    </div>
                </div>
            </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default GameDetailPage;
