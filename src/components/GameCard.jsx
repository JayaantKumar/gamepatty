import React, { useState } from 'react';
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
  // 1. Create a state variable to track if the card is hovered
  const [isHovered, setIsHovered] = useState(false);

  // 2. Prepare the different URLs
  const baseEmbedUrl = getEmbedUrl(game.youtubeUrl);
  
  // 3. Create a special URL for autoplay
  // We add 'autoplay=1' to play, 'mute=1' (REQUIRED by browsers),
  // and 'controls=0' to hide the YouTube UI for a clean look.
  const autoplayUrl = `${baseEmbedUrl}?autoplay=1&mute=1&controls=0&loop=1&playlist=${baseEmbedUrl.split('/').pop()}`;


  return (
    <div 
      className="bg-gray-900 rounded-lg overflow-hidden shadow-lg flex flex-col"
      // 4. Set the hover state when the mouse enters or leaves
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="w-full aspect-video bg-black">
        {/* 5. CONDITIONAL RENDERING:
          If hovered AND we have a valid URL, show the iframe.
          Otherwise, show the static image.
        */}
        {isHovered && autoplayUrl ? (
          <iframe
            src={autoplayUrl}
            title={game.title}
            frameBorder="0"
            // Note the addition of "autoplay" to the allow attribute
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="w-full h-full pointer-events-none" // 'pointer-events-none' makes the iframe "un-clickable" so the hover-off works properly
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
        
        <div className="flex justify-between items-center mt-auto">
          <Link
            to={`/games/${game.slug}`}
            className="text-brand-accent font-semibold hover:text-brand-accent/80"
          >
            Learn More
          </Link>
          {/* I've re-added the trailer button in case they want to see it with sound */}
          <a
            href={game.youtubeUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-red-600 text-white py-2 px-4 rounded-md text-sm font-bold hover:bg-red-700 transition-colors"
          >
            Watch Trailer
          </a>
        </div>
      </div>
    </div>
  );
}

export default GameCard;