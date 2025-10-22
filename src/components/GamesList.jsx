import React, { useState } from 'react'; // Import useState
import useGames from '../hooks/useGames';
import GameCard from './GameCard';
import GameDetailModal from './GameDetailModal'; // Import the new modal

function GamesList() {
  const { games, loading, error } = useGames();
  
  // 1. Add state to track the selected game
  const [selectedGame, setSelectedGame] = useState(null);

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
            // 2. Pass a function to the card to set the selected game
            <GameCard 
              key={game.id} 
              game={game} 
              onCardClick={() => setSelectedGame(game)} 
            />
          ))}
        </div>
      )}

      {/* 3. Render the modal IF a game is selected */}
      {selectedGame && (
        <GameDetailModal 
          game={selectedGame} 
          onClose={() => setSelectedGame(null)} 
        />
      )}
    </section>
  );
}

export default GamesList;