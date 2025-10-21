import React from 'react';

// You would typically pass props for a dynamic hero image
const heroImageUrl = "https://images.pexels.com/photos/275033/pexels-photo-275033.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1";

function HeroBanner() {
  return (
    <div
      className="relative h-[70vh] min-h-[500px] w-full flex items-center justify-center text-center text-white"
      style={{
        backgroundImage: `url(${heroImageUrl})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      {/* Overlay for readability */}
      <div className="absolute inset-0 bg-black opacity-60"></div>
      
      <div className="relative z-10 p-4">
        <h1 className="text-5xl md:text-7xl font-black uppercase tracking-tight">
          Crafting <span className="text-brand-accent">Cinematic</span> Worlds
        </h1>
        <p className="text-lg md:text-2xl text-gray-200 mt-4 max-w-2xl mx-auto">
          We are an independent studio dedicated to building immersive,
          story-driven experiences.
        </p>
        <a
          href="#games"
          className="mt-8 inline-block bg-brand-accent text-white font-bold py-3 px-8 rounded-lg text-lg uppercase hover:bg-opacity-90 transition-all"
        >
          Explore Our Games
        </a>
      </div>
    </div>
  );
}

export default HeroBanner;