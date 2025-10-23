import React from 'react';
import { useParams, Link } from 'react-router-dom';
import useGameBySlug from '../hooks/useGameBySlug';
import { FaGooglePlay, FaApple } from 'react-icons/fa6';

// We need this helper function here too
const getEmbedUrl = (url) => {
  if (!url) return "";
  try {
    const videoId = new URL(url).searchParams.get("v");
    if (videoId) {
      return `https://www.youtube.com/embed/${videoId}?autoplay=1&mute=1&loop=1&playlist=${videoId}`;
    }
    return "";
  } catch (e) {
    console.error("Invalid YouTube URL provided:", url);
    return "";
  }
};

function GameDetailPage() {
  const { slug } = useParams();
  const { game, loading, error } = useGameBySlug(slug);

  if (loading) {
    return <div className="text-center py-40">Loading game...</div>;
  }
  if (error) {
    return <div className="text-center py-40 text-red-500">{error}</div>;
  }
  if (!game) {
    return <div className="text-center py-40">Game not found.</div>;
  }

  // Once we have the game, we can get its data
  const embedUrl = getEmbedUrl(game.youtubeUrl);
  const imagesToShow =
    game.galleryImages && game.galleryImages.length > 0
      ? game.galleryImages
      : [game.imageUrl];

  return (
    <div className="bg-[#111] min-h-screen text-white">
      {/* Back button */}
      <div className="container mx-auto px-4 pt-8">
        <Link 
          to="/" 
          className="text-gray-400 hover:text-white transition-colors"
        >
          &larr; Back to all games
        </Link>
      </div>

      <div className="container mx-auto px-4 py-8 max-w-5xl">
        {/* Video or Main Image */}
        <div className="w-full aspect-video">
          {embedUrl ? (
            <iframe
              src={embedUrl}
              title={game.title}
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="w-full h-full rounded-2xl"
            ></iframe>
          ) : (
            <img
              src={game.imageUrl}
              alt={game.title}
              className="w-full h-full object-cover rounded-2xl"
            />
          )}
        </div>

        {/* Content */}
        <div className="p-8">
          <h1 className="text-5xl font-extrabold mb-4 tracking-wide">
            {game.title}
          </h1>

          {/* Tags */}
          <div className="flex flex-wrap gap-3 mb-6">
            {game.tags?.map((tag) => (
              <span
                key={tag}
                className="bg-[#ff5722]/10 text-[#ff784e] font-semibold px-4 py-1 rounded-full text-sm border border-[#ff784e]/30"
              >
                {tag}
              </span>
            ))}
          </div>

          <p className="text-gray-300 text-lg leading-relaxed mb-8">
            {game.description}
          </p>

          {/* Store Buttons Area */}
          <div className="flex flex-wrap gap-4 items-center mb-8">
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

          {/* Gallery */}
          <div>
            <h3 className="text-3xl font-bold mb-5 text-white">Gallery</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {imagesToShow.map((imgUrl, index) => (
                <div
                  key={index}
                  className="overflow-hidden rounded-2xl shadow-lg"
                >
                  <img
                    src={imgUrl}
                    alt={`${game.title} gallery image ${index + 1}`}
                    className="w-full h-60 object-cover"
                  />
                </div>
              ))}
            </div>

            {imagesToShow.length === 0 && (
              <p className="text-gray-500 mt-4">
                No gallery images available.
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default GameDetailPage;