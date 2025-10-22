import React from 'react';
// We no longer need 'useState' or 'Link'

function GameCard({ game, onCardClick }) {
  return (
    // We added an onClick to the whole card
    <div 
      className="bg-gray-900 rounded-lg overflow-hidden shadow-lg transform transition-all duration-300 hover:scale-105 cursor-pointer"
      onClick={onCardClick}
    >
      {/* This is now just a static image, not a video */}
      <img
        src={game.imageUrl || 'assets/placeholder.png'}
        alt={game.title}
        className="w-full h-48 object-cover"
      />

      <div className="p-5">
        <h3 className="text-2xl font-bold mb-2">{game.title}</h3>
        <p className="text-gray-400 mb-4 h-20 overflow-hidden">
          {game.description}
        </p>
        <div className="flex justify-between items-center">
          {/* This button also triggers the modal */}
          <button
            className="text-brand-accent font-semibold hover:text-brand-accent/80"
          >
            Learn More
          </button>
          
          {/* This button can also trigger the modal, or you can remove it */}
          <button
            className="bg-red-600 text-white py-2 px-4 rounded-md text-sm font-bold hover:bg-red-700 transition-colors"
          >
            Watch Trailer
          </button>
        </div>
      </div>
    </div>
  );
}

export default GameCard;