import React, { useState } from "react";
import useGames from "../hooks/useGames";
import GameDetailModal from "./GameDetailModal";

const getEmbedUrl = (url) => {
  if (!url) return "";
  try {
    const videoId = new URL(url).searchParams.get("v");
    if (videoId) {
      return `https://www.youtube.com/embed/${videoId}?autoplay=1&mute=1&loop=1&playlist=${videoId}`;
    }
    return "";
  } catch {
    return "";
  }
};

function GamesList() {
  const { games, loading, error } = useGames();
  const [selectedGame, setSelectedGame] = useState(null);

  return (
    <section
      id="games"
      className="py-28 px-[5.5rem] bg-gradient-to-b from-black via-[#1a0000] to-[#2b0000]"
    >
      <h2 className="text-5xl font-black text-center uppercase mb-20 tracking-wide text-white">
        Our <span className="text-red-500">Games</span>
      </h2>

      {loading && <p className="text-center text-lg text-gray-400">Loading games...</p>}
      {error && <p className="text-center text-red-500 text-xl">{error}</p>}

      {!loading &&
        !error &&
        games.map((game, index) => {
          const embedUrl = getEmbedUrl(game.youtubeUrl);
          const imagesToShow =
            game.galleryImages && game.galleryImages.length > 0
              ? game.galleryImages
              : [game.imageUrl];

          const reverse = index % 2 !== 0;

          return (
            <div
              key={game.id}
              className={`flex flex-col md:flex-row ${
                reverse ? "md:flex-row-reverse" : ""
              } items-center mb-32 gap-14`}
            >
              {/* Left side: Video + Images */}
              <div className="md:w-1/2 w-full space-y-5">
                {embedUrl ? (
                  <iframe
                    src={embedUrl}
                    title={game.title}
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className="w-full aspect-video rounded-3xl shadow-2xl border border-red-900"
                  ></iframe>
                ) : (
                  <img
                    src={game.imageUrl}
                    alt={game.title}
                    className="w-full rounded-3xl shadow-2xl border border-red-900 object-cover aspect-video"
                  />
                )}

                {/* Mini Gallery */}
                <div className="grid grid-cols-3 gap-4">
                  {imagesToShow.slice(0, 3).map((img, i) => (
                    <img
                      key={i}
                      src={img}
                      alt={`${game.title} screenshot ${i + 1}`}
                      className="rounded-xl object-cover h-36 w-full cursor-pointer hover:opacity-80 transition transform hover:scale-105 duration-300"
                      onClick={() => setSelectedGame(game)}
                    />
                  ))}
                </div>
              </div>

              {/* Right side: Info */}
              <div className="md:w-1/2 w-full text-gray-300 text-[1.15rem] leading-relaxed">
                <h3 className="text-4xl font-extrabold text-white mb-4 tracking-wide">
                  {game.title}
                </h3>

                <div className="flex flex-wrap gap-3 mb-6">
                  {game.tags?.map((tag) => (
                    <span
                      key={tag}
                      className="bg-[#1a0000] text-red-400 font-semibold px-4 py-2 rounded-full text-[0.95rem] border border-red-900"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <p className="text-gray-300 mb-8 text-[1.1rem]">
                  {game.description.length > 220
                    ? game.description.slice(0, 220) + "..."
                    : game.description}
                </p>

                {/* Buttons */}
                <div className="flex flex-wrap gap-4">
                  <button
                    onClick={() => setSelectedGame(game)}
                    className="bg-red-600 hover:bg-red-500 text-white font-bold px-8 py-3 text-lg rounded-xl transition-all shadow-lg hover:shadow-red-600/30"
                  >
                    View Details
                  </button>

                  {game.androidUrl && (
                    <a
                      href={game.androidUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-green-600 hover:bg-green-500 text-white font-bold px-8 py-3 text-lg rounded-xl shadow-lg hover:shadow-green-500/30 transition-all"
                    >
                      Play on Android
                    </a>
                  )}

                  {game.iosUrl && (
                    <a
                      href={game.iosUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-blue-600 hover:bg-blue-500 text-white font-bold px-8 py-3 text-lg rounded-xl shadow-lg hover:shadow-blue-500/30 transition-all"
                    >
                      Play on iOS
                    </a>
                  )}
                </div>
              </div>
            </div>
          );
        })}

      {/* Masonry Gallery Section - After all detailed game cards */}
      {!loading && !error && games.length > 0 && (
        <div className="mt-32 pt-20 border-t-2 border-red-900/30">
          <h3 className="text-4xl font-black text-center uppercase mb-16 tracking-wide text-white">
            Explore All <span className="text-red-500">Our Games</span>
          </h3>
          
          <div className="max-w-7xl mx-auto columns-1 md:columns-2 lg:columns-3 xl:columns-4 gap-6 md:gap-8 space-y-6 md:space-y-8">
            {games.map((game) => (
              <div
                key={`masonry-${game.id}`}
                onClick={() => setSelectedGame(game)}
                className="group block break-inside-avoid mb-6 md:mb-8 rounded-3xl overflow-hidden border-2 border-red-900/50 shadow-2xl transition-all duration-300 transform hover:scale-[1.02] hover:shadow-red-600/40 hover:border-red-600 bg-black/40 cursor-pointer"
              >
                <div className="relative overflow-hidden">
                  <img
                    src={game.imageUrl}
                    alt={game.title}
                    className="w-full h-auto object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  
                  {/* Bottom gradient for text readability */}
                  <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-black/90 via-black/60 to-transparent"></div>
                  
                  {/* Title at bottom */}
                  <div className="absolute bottom-0 left-0 right-0 p-4 md:p-5">
                    <h4 className="text-xl md:text-2xl font-black text-white text-center tracking-wide drop-shadow-lg">
                      {game.title}
                    </h4>
                  </div>
                </div>
                
                {/* Tags */}
                {game.tags && game.tags.length > 0 && (
                  <div className="p-4 bg-black/60">
                    <div className="flex flex-wrap gap-2 justify-center">
                      {game.tags.slice(0, 3).map((tag) => (
                        <span
                          key={tag}
                          className="bg-[#1a0000] text-red-400 font-semibold px-3 py-1 rounded-full text-xs border border-red-900"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Modal */}
      {selectedGame && (
        <GameDetailModal game={selectedGame} onClose={() => setSelectedGame(null)} />
      )}
    </section>
  );
}

export default GamesList;