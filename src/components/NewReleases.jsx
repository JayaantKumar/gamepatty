import React from 'react';
import { Link } from 'react-router-dom'; // 1. Import Link
import useNewReleases from '../hooks/useNewReleases'; // This hook now fetches from 'games'

function NewReleases() {
  const { games, loading, error } = useNewReleases();

  return (
    <section 
      id="new-releases" 
      className="py-20 px-6 sm:px-10 md:px-20 bg-gradient-to-b from-black via-[#1a0000] to-[#2b0000]"
    >
      <h2 className="text-4xl sm:text-5xl font-black text-center uppercase mb-16 tracking-wide text-white">
        New <span className="text-red-500">Releases</span>
      </h2>

      {loading && <p className="text-center text-lg text-gray-400">Loading new releases...</p>}
      {error && <p className="text-center text-red-500 text-xl">{error}</p>}

      {!loading && !error && games.length > 0 && (
        <div className="columns-2 sm:columns-3 lg:columns-4 xl:columns-5 gap-4 space-y-4">
          {games.map((game) => (
            // 2. Changed from <a> to <Link>
            <Link
              key={game.id}
              to={`/specificgame/${game.slug}`} // 3. Link to the internal game page
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
        <p className="text-center text-lg text-gray-400">No new releases to show right now.</p>
      )}
    </section>
  );
}

export default NewReleases;