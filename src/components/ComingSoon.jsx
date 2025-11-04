import React from 'react';
import { Link } from 'react-router-dom'; // 1. Import Link
import useComingSoon from '../hooks/useComingSoon';

function ComingSoon() {
  const { games, loading, error } = useComingSoon();

  return (
    <section 
      id="coming-soon" 
      className="py-20 px-6 sm:px-10 md:px-20 bg-gradient-to-b from-[#2b0000] via-[#1a0000] to-black"
    >
      <h2 className="text-4xl sm:text-5xl font-black text-center uppercase mb-16 tracking-wide text-white">
        Coming <span className="text-red-500">Soon</span>
      </h2>

      {loading && <p className="text-center text-lg text-gray-400">Loading upcoming games...</p>}
      {error && <p className="text-center text-red-500 text-xl">{error}</p>}

      {!loading && !error && games.length > 0 && (
        <div className="columns-2 sm:columns-3 lg:columns-4 xl:columns-5 gap-4 space-y-4">
          {games.map((game) => (
            // 2. Change <a> to <Link>
            <Link
              key={game.id}
              to={`/specificgame/${game.slug}`} // 3. Link to the internal detail page
              className="block w-full rounded-2xl shadow-lg border border-red-900 hover:scale-[1.02] hover:opacity-90 transition-all cursor-pointer overflow-hidden"
            >
              <img
                src={game.imageUrl}
                alt={game.title}
                className="w-full h-auto"
              />
            </Link>
          ))}
        </div>
      )}
      
      {!loading && !error && games.length === 0 && (
        <p className="text-center text-lg text-gray-400">More games will be announced soon!</p>
      )}
    </section>
  );
}

export default ComingSoon;