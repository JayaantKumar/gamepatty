import React from 'react';
import { Link } from 'react-router-dom';

/**
 * Converts a standard YouTube "watch" URL into an "embed" URL
 * for use in an iframe.
 * @param {string} url - The standard YouTube URL
 * @returns {string} The embeddable URL
 */
const getEmbedUrl = (url) => {
  if (!url) return '';
  try {
    // Create a URL object to easily get the 'v' parameter
    const videoId = new URL(url).searchParams.get('v');
    if (videoId) {
      return `https://www.youtube.com/embed/${videoId}`;
    }
    return '';
  } catch (e) {
    console.error("Invalid YouTube URL provided:", url);
    return '';
  }
};

function GameCard({ game }) {
  // Get the embed URL for the iframe
  const embedUrl = getEmbedUrl(game.youtubeUrl);

  return (
    <div className="bg-gray-900 rounded-lg overflow-hidden shadow-lg flex flex-col">
      {/* NEW VIDEO SECTION:
        We use 'aspect-video' to maintain a 16:9 ratio.
      */}
      <div className="w-full aspect-video bg-black">
        {embedUrl ? (
          <iframe
            src={embedUrl}
            title={game.title}
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="w-full h-full"
          ></iframe>
        ) : (
          <img
            src={game.imageUrl || 'assets/placeholder.png'}
            alt={game.title}
            className="w-full h-full object-cover"
          />
        )}
      </div>

      <div className="p-5 flex-grow flex flex-col">
        <h3 className="text-2xl font-bold mb-2">{game.title}</h3>
        <p className="text-gray-400 mb-4 h-20 overflow-hidden">
          {game.description}
        </p>
        
        {/* We can hide the old "Watch Trailer" button since the video is embedded */}
        <div className="flex justify-between items-center mt-auto">
          <Link
            to={`/games/${game.slug}`}
            className="text-brand-accent font-semibold hover:text-brand-accent/80"
          >
            Learn More
          </Link>
          {/* You could keep this button or remove it.
            <a
              href={game.youtubeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-red-600 text-white py-2 px-4 rounded-md text-sm font-bold hover:bg-red-700 transition-colors"
            >
              Watch Trailer
            </a>
          */}
        </div>
      </div>
    </div>
  );
}

export default GameCard;