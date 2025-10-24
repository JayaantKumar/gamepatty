import React, { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { FaApple, FaGooglePlay } from "react-icons/fa";
import useGames from "../hooks/useGames";
import GameDetailModal from "./GameDetailModal";

const getEmbedUrl = (url) => {
  if (!url) return "";
  try {
    const videoId = new URL(url).searchParams.get("v");
    if (videoId) {
      return `https://www.youtube.com/embed/${videoId}?autoplay=0&mute=1&loop=1&playlist=${videoId}`;
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
      className="py-20 px-6 sm:px-10 md:px-20 bg-gradient-to-b from-black via-[#1a0000] to-[#2b0000]"
    >
      {/* Section Header */}
      <h2 className="text-4xl sm:text-5xl font-black text-center uppercase mb-16 tracking-wide text-white">
        Our <span className="text-red-500">Games</span>
      </h2>

      {/* Loading / Error States */}
      {loading && (
        <p className="text-center text-lg text-gray-400">Loading games...</p>
      )}
      {error && <p className="text-center text-red-500 text-xl">{error}</p>}

      {/* Games List */}
      {!loading &&
        !error &&
        games.map((game, index) => {
          const embedUrl = getEmbedUrl(game.youtubeUrl);
          const reverse = index % 2 !== 0;

          return (
            <div
              key={game.id}
              className={`flex flex-col ${
                reverse ? "md:flex-row-reverse" : "md:flex-row"
              } items-center md:items-stretch mb-24 gap-10 md:gap-16`}
            >
              {/* Left: Video or Image */}
              <div className="md:w-1/2 w-full">
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
              </div>

              {/* Right: Info aligned with video */}
              <div className="md:w-1/2 w-full flex flex-col justify-center text-gray-300 text-[1.05rem] sm:text-[1.15rem] leading-relaxed">
                <h3 className="text-3xl sm:text-4xl font-extrabold text-white mb-5 tracking-wide text-center md:text-left">
                  {game.title}
                </h3>

                <div className="flex flex-wrap gap-2 sm:gap-3 mb-5 justify-center md:justify-start">
                  {game.tags?.map((tag) => (
                    <span
                      key={tag}
                      className="bg-[#1a0000] text-red-400 font-semibold px-3 sm:px-4 py-1.5 sm:py-2 rounded-full text-[0.9rem] sm:text-[0.95rem] border border-red-900"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <p className="text-gray-300 mb-8 text-[1rem] sm:text-[1.1rem] text-center md:text-left">
                  {game.description.length > 220
                    ? game.description.slice(0, 220) + "..."
                    : game.description}
                </p>

                {/* Buttons */}
                <div className="flex flex-col sm:flex-row sm:flex-wrap gap-4 justify-center md:justify-start items-center">
                  {/* View Details */}
                  <Link
                    to={`/specificgame/${game.slug}`}
                    className="bg-red-600 hover:bg-red-500 text-white font-bold px-8 py-3 text-lg rounded-xl transition-all shadow-lg hover:shadow-red-600/30 text-center"
                  >
                    View Details
                  </Link>

                  {/* Animated App Store + Play Store Buttons */}
                  <div className="flex gap-3 sm:gap-5 items-center">
                    {game.iosUrl && (
                      <motion.a
                        href={game.iosUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        whileHover={{
                          scale: 1.05,
                          boxShadow: "0px 0px 15px rgba(255,255,255,0.15)",
                        }}
                        whileTap={{ scale: 0.95 }}
                        className="flex items-center gap-2 bg-[#111111] border border-gray-700 hover:border-gray-500 px-4 py-2 rounded-xl transition-all"
                      >
                        <FaApple size={28} className="text-white" />
                        <div className="flex flex-col text-left leading-tight">
                          <span className="text-xs text-gray-400">
                            Download on the
                          </span>
                          <span className="text-sm font-semibold text-white">
                            App Store
                          </span>
                        </div>
                      </motion.a>
                    )}

                    {game.androidUrl && (
                      <motion.a
                        href={game.androidUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        whileHover={{
                          scale: 1.05,
                          boxShadow: "0px 0px 15px rgba(0,255,100,0.15)",
                        }}
                        whileTap={{ scale: 0.95 }}
                        className="flex items-center gap-2 bg-[#111111] border border-gray-700 hover:border-gray-500 px-4 py-2 rounded-xl transition-all"
                      >
                        <FaGooglePlay size={24} className="text-green-400" />
                        <div className="flex flex-col text-left leading-tight">
                          <span className="text-xs text-gray-400">
                            Get it on
                          </span>
                          <span className="text-sm font-semibold text-white">
                            Google Play
                          </span>
                        </div>
                      </motion.a>
                    )}
                  </div>
                </div>
              </div>
            </div>
          );
        })}

      {/* Masonry Layout – Only Primary Images */}
      {!loading && !error && games.length > 0 && (
        <div className="mt-24">
          <h3 className="text-3xl sm:text-4xl font-bold text-center text-white mb-10">
            All <span className="text-red-500">Games Gallery</span>
          </h3>

          <div className="columns-2 sm:columns-3 lg:columns-4 gap-4 space-y-4">
            {games.map((game) => (
              <img
                key={game.id}
                src={game.imageUrl}
                alt={game.title}
                className="w-full rounded-2xl shadow-lg border border-red-900 hover:scale-[1.02] hover:opacity-90 transition-all cursor-pointer"
                onClick={() => setSelectedGame(game)}
              />
            ))}
          </div>
        </div>
      )}

      {/* Modal */}
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
