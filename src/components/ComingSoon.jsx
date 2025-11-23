import React from 'react';
import { Link } from 'react-router-dom';
import useComingSoon from '../hooks/useComingSoon';

function ComingSoon() {
  // We use the hook that fetches games with NO links
  const { games, loading, error } = useComingSoon();

  if (loading) {
    return <div className="py-20 text-center text-gray-400 animate-pulse">Loading coming soon games...</div>;
  }

  if (error) {
    // Don't show anything if there's an error (e.g., missing index)
    // to avoid breaking the homepage layout.
    console.error("Coming Soon Error:", error);
    return null;
  }

  // If no games fit the criteria, don't render the section at all.
  if (games.length === 0) {
    return null;
  }

  return (
    <section className="py-20 px-6 md:px-16 lg:px-24 bg-black min-h-[50vh]">
      <h2 className="text-4xl md:text-5xl font-black text-center uppercase mb-16 tracking-wide text-white">
        Coming <span className="text-red-500">Soon</span>
      </h2>

      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {games.map((game) => {
            // === THE FIX IS HERE ===
            // Check if imageUrl is an object (new upload) or string (old upload)
            const imageSrc = game.imageUrl?.src || game.imageUrl || "/assets/placeholder.png";

            return (
              <Link
                key={game.id}
                to={`/game/${game.slug}`}
                className="group relative block h-[400px] rounded-[2rem] overflow-hidden border-4 border-transparent hover:border-red-500 transition-all duration-300 shadow-xl bg-[#111]"
              >
                {/* Image background */}
                <img
                  src={imageSrc} // <--- Using the fixed source variable
                  alt={game.title}
                  className="absolute inset-0 w-full h-full object-cover opacity-60 group-hover:opacity-40 transition-opacity duration-300"
                />
                
                {/* Gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/70 to-transparent"></div>

                {/* Content */}
                <div className="absolute inset-0 flex flex-col justify-end p-8">
                  {/* Tags */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {game.tags?.slice(0, 2).map((tag, index) => (
                      <span 
                        key={index}
                        className="px-3 py-1 text-xs font-bold uppercase tracking-wider text-white bg-red-600 rounded-full"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  
                  {/* Title */}
                  <h3 className="text-3xl font-black text-white mb-2 uppercase tracking-wider drop-shadow-lg group-hover:text-red-400 transition-colors">
                    {game.title}
                  </h3>
                  
                  {/* Release Date Hint */}
                  {game.releasedAt && (
                    <p className="text-gray-300 font-semibold tracking-wide">
                      Expected: {new Date(game.releasedAt.seconds * 1000).toLocaleDateString(undefined, { year: 'numeric', month: 'long' })}
                    </p>
                  )}
                </div>
              </Link>
            );
        })}
      </div>
    </section>
  );
}

export default ComingSoon;