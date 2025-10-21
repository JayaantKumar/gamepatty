import React from 'react';
import useGames from '../hooks/useGames';
import GameCard from './GameCard';

function GamesList() {
  const { games, loading, error } = useGames();

  return (
    <section id="games" className="py-16">
      <h2 className="text-4xl font-black text-center uppercase mb-12">
        Our <span className="text-brand-accent">Games</span>
      </h2>

      {loading && <p className="text-center">Loading games...</p>}
      {error && <p className="text-center text-red-500">{error}</p>}
      
      {!loading && !error && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {games.map((game) => (
            <GameCard key={game.id} game={game} />
          ))}
        </div>
      )}
    </section>
  );
}

export default GamesList;