import React from 'react';
import { Link } from 'react-router-dom';
import useComingSoon from '../hooks/useComingSoon';

function ComingSoon() {
  const { games, loading, error } = useComingSoon();

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[400px] bg-[#0a0a0a]">
        <div className="text-center">
          <div className="inline-block w-12 h-12 border-4 border-red-500 border-t-transparent rounded-full animate-spin mb-4"></div>
          <p className="text-xl text-gray-400">Loading upcoming games...</p>
        </div>
      </div>
    );
  }

  if (error) {
    console.error("Coming Soon Error:", error);
    return null;
  }

  if (games.length === 0) {
    return null;
  }

  return (
    <section 
      id="coming-soon" 
      className="py-20 px-6 md:px-16 lg:px-24 bg-gradient-to-t from-[#0a0a0a] via-[#1a0000] to-[#2b0000] min-h-screen"
    >
      <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-center uppercase mb-16 md:mb-24 tracking-wide text-white">
        Coming <span className="text-red-500">Soon</span>
      </h2>

      {/* Masonry Layout */}
      <div className="max-w-7xl mx-auto columns-1 md:columns-2 lg:columns-3 gap-6 md:gap-8 space-y-6 md:space-y-8">
        {games.map((game) => {
            // Logic to handle image source (Object vs String)
            const imageSrc = game.imageUrl?.src || game.imageUrl || "/assets/placeholder.png";

            return (
              <Link
                key={game.id}
                to={`/specificgame/${game.slug}`}
                title={game.title}
                className="group block break-inside-avoid mb-6 md:mb-8 rounded-3xl overflow-hidden border-2 border-red-900/50 shadow-2xl transition-all duration-300 transform hover:scale-[1.02] hover:shadow-red-600/40 hover:border-red-600 bg-black/40"
              >
                <div className="relative overflow-hidden w-full h-full">
                  <img
                    src={imageSrc}
                    alt={game.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  
                  {/* Bottom gradient */}
                  <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-black/90 via-black/60 to-transparent"></div>
                  
                  {/* Title at bottom */}
                  <div className="absolute bottom-0 left-0 right-0 p-4 md:p-5">
                    <h3 className="text-xl md:text-2xl font-black text-white text-center tracking-wide drop-shadow-lg">
                      {game.title}
                    </h3>
                  </div>
                </div>
              </Link>
            );
        })}
      </div>
    </section>
  );
}

export default ComingSoon;