import React from 'react';

const SmartImage = ({ src, alt, className, isBanner = false }) => {
  return (
    <div className={`relative overflow-hidden bg-[#050505] ${className}`}>
      
      {/* 1. Background: Blurred & Zoomed */}
      <div 
        className="absolute inset-0 bg-cover bg-center blur-2xl opacity-40 scale-110"
        style={{ backgroundImage: `url(${src})` }}
      />
      
      {/* Optional: Dark Overlay for Banners to ensure text readability */}
      {isBanner && (
         <div className="absolute inset-0 bg-black/30 z-0"></div>
      )}

      {/* 2. Foreground: The Clean Image */}
      <img 
        src={src} 
        alt={alt} 
        className="relative z-10 w-full h-full object-contain drop-shadow-2xl" 
      />
      
    </div>
  );
};

export default SmartImage;