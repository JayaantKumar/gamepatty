import React from "react";

function GameCard({ game, onCardClick }) {
  return (
    <div
      className="bg-[#111] rounded-2xl overflow-hidden shadow-lg transform transition-all duration-300 hover:scale-105 hover:shadow-[0_0_25px_rgba(255,87,34,0.4)] cursor-pointer"
      onClick={onCardClick}
    >
      <img
        // THE FIX: Check if imageUrl is an object with a .src property.
        // If it is, use .src. If not, treat it as a plain string URL.
        src={game.imageUrl?.src || game.imageUrl || "/assets/placeholder.png"}
        alt={game.title}
        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
      />

      {/* Card Content */}
      <div className="p-6">
        <h3 className="text-3xl font-extrabold mb-3 text-white tracking-wide">
          {game.title}
        </h3>
        <p className="text-gray-400 text-lg mb-6 h-24 overflow-hidden leading-relaxed">
          {game.description}
        </p>

        {/* Buttons */}
        <div className="flex justify-between items-center">
          <button className="text-[#ff5722] font-semibold hover:text-[#ff784e] text-lg transition-all">
            Learn More
          </button>

          <button className="bg-[#ff5722] text-white py-3 px-6 rounded-lg font-bold hover:bg-[#ff784e] text-base transition-all">
            Watch Trailer
          </button>
        </div>
      </div>
    </div>
  );
}

export default GameCard;
