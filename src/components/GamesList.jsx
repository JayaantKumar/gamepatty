import React, { useState } from "react";
// 1. Import Link from react-router-dom
import { Link } from "react-router-dom";
import useGames from "../hooks/useGames";
import GameDetailModal from "./GameDetailModal";
import { FaGooglePlay, FaApple } from "react-icons/fa6";

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

                {/* Mini Gallery (still opens modal) */}
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

                <div className="flex flex-wrap gap-4 items-center">
                  {/* 2. CHANGED: This is now a <Link> component */}
                  <Link
                    to={`/specificgame/${game.slug}`}
                    className="bg-red-600 hover:bg-red-500 text-white font-bold px-8 py-3 text-lg rounded-xl transition-all shadow-lg hover:shadow-red-600/30"
                  >
                    View Details
                  </Link>
                  {/* END OF CHANGE */}

                  {game.androidUrl && (
                    <a
                      href={game.androidUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 bg-gray-700 hover:bg-gray-600 text-white font-bold px-6 py-3 text-lg rounded-xl transition-all"
                    >
                      <FaGooglePlay />
                      <span>Play Store</span>
                    </a>
                  )}

                  {game.iosUrl && (
                    <a
                      href={game.iosUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 bg-gray-700 hover:bg-gray-600 text-white font-bold px-6 py-3 text-lg rounded-xl transition-all"
                    >
                      <FaApple />
                      <span>App Store</span>
                    </a>
                  )}
                </div>
              </div>
            </div>
          );
        })}

      {/* Modal (still works for the gallery images) */}
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