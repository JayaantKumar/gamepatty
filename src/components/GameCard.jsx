import React from "react";

function GameCard({ game, onCardClick }) {
  const wideBanner = game.bannerImage?.src || game.bannerUrl?.src;
  const squareIcon = game.imageUrl?.src || game.imageUrl || "/assets/placeholder.png";

  return (
    <div
      className="bg-[#111] rounded-2xl overflow-hidden shadow-lg transform transition-all duration-300 hover:scale-105 hover:shadow-[0_0_25px_rgba(255,87,34,0.4)] cursor-pointer"
      onClick={onCardClick}
    >
      <div className="w-full h-64 sm:h-80 bg-[#111] flex items-center justify-center overflow-hidden p-0">
        {wideBanner ? (
          <img
            src={wideBanner}
            alt={game.title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          />
        ) : (
          <img
            src={squareIcon}
            alt={game.title}
            className="w-auto h-full max-w-full object-contain p-4 transition-transform duration-500 group-hover:scale-110"
          />
        )}
      </div>

      <div className="p-6">
        <h3 className="text-3xl font-extrabold mb-3 text-white tracking-wide">
          {game.title}
        </h3>

        <p className="text-gray-400 text-lg mb-6 h-24 overflow-hidden leading-relaxed">
          {game.description}
        </p>

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