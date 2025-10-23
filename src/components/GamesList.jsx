import React, { useState } from "react";
import useGames from "../hooks/useGames";
import GameDetailModal from "./GameDetailModal";

const getEmbedUrl = (url) => {
  if (!url) return "";
  try {
    const videoId = new URL(url).searchParams.get("v");
    return videoId
      ? `https://www.youtube.com/embed/${videoId}?autoplay=1&mute=1&loop=1&playlist=${videoId}`
      : "";
  } catch {
    return "";
  }
};

function GamesList() {
  const { games, loading, error } = useGames();
  const [selectedGame, setSelectedGame] = useState(null);

  return (
    <section id="games" className="py-20 px-5 sm:px-10 md:px-[5.5rem] bg-gradient-to-b from-black via-[#1a0000] to-[#2b0000]">
      <h2 className="text-4xl sm:text-5xl font-black text-center uppercase mb-12 tracking-wide text-white">
        Our <span className="text-red-500">Games</span>
      </h2>

      {loading && <p className="text-center text-gray-400">Loading games...</p>}
      {error && <p className="text-center text-red-500">{error}</p>}

      {!loading && !error && games.map((game, index) => {
        const embedUrl = getEmbedUrl(game.youtubeUrl);
        const imagesToShow = game.galleryImages?.length ? game.galleryImages : [game.imageUrl];
        const reverse = index % 2 !== 0;

        return (
          <div key={game.id} className={`flex flex-col ${reverse ? "md:flex-row-reverse" : "md:flex-row"} items-center mb-20 gap-10`}>
            <div className="md:w-1/2 w-full space-y-4">
              {embedUrl ? (
                <iframe src={embedUrl} title={game.title} allowFullScreen
                  className="w-full aspect-video rounded-2xl shadow-2xl border border-red-900" />
              ) : (
                <img src={game.imageUrl} alt={game.title} className="w-full aspect-video object-cover rounded-2xl shadow-2xl border border-red-900" />
              )}
              <div className="grid grid-cols-3 gap-3">
                {imagesToShow.slice(0, 3).map((img, i) => (
                  <img key={i} src={img} alt={`${game.title}-${i}`} className="rounded-xl h-24 sm:h-32 w-full object-cover cursor-pointer hover:scale-105 transition"
                    onClick={() => setSelectedGame(game)} />
                ))}
              </div>
            </div>

            <div className="md:w-1/2 w-full text-gray-300">
              <h3 className="text-3xl sm:text-4xl font-extrabold text-white mb-3">{game.title}</h3>
              <div className="flex flex-wrap gap-2 mb-4">
                {game.tags?.map((tag) => (
                  <span key={tag} className="bg-[#1a0000] text-red-400 px-3 py-1 rounded-full text-sm border border-red-900">
                    {tag}
                  </span>
                ))}
              </div>
              <p className="text-sm sm:text-base mb-6">{game.description.slice(0, 220)}...</p>

              <div className="flex flex-wrap gap-3">
                <button onClick={() => setSelectedGame(game)} className="bg-red-600 hover:bg-red-500 text-white font-bold px-6 py-2 rounded-lg text-sm sm:text-base">View Details</button>
                {game.androidUrl && (
                  <a href={game.androidUrl} target="_blank" rel="noopener noreferrer"
                    className="bg-green-600 hover:bg-green-500 text-white font-bold px-6 py-2 rounded-lg text-sm sm:text-base">Play on Android</a>
                )}
              </div>
            </div>
          </div>
        );
      })}

      {selectedGame && <GameDetailModal game={selectedGame} onClose={() => setSelectedGame(null)} />}
    </section>
  );
}

export default GamesList;
