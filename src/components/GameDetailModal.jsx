import React from 'react';

/**
 * Converts a standard YouTube "watch" URL into an "embed" URL
 * for use in an iframe with autoplay.
 */
const getEmbedUrl = (url) => {
  if (!url) return '';
  try {
    const videoId = new URL(url).searchParams.get('v');
    if (videoId) {
      // Autoplay, mute (required), and loop the video
      return `https://www.youtube.com/embed/${videoId}?autoplay=1&mute=1&loop=1&playlist=${videoId}`;
    }
    return '';
  } catch (e) {
    console.error("Invalid YouTube URL provided:", url);
    return '';
  }
};

function GameDetailModal({ game, onClose }) {
  if (!game) return null;

  const embedUrl = getEmbedUrl(game.youtubeUrl);

  // Use the new 'galleryImages' field, or fall back to the main 'imageUrl'
  const imagesToShow = game.galleryImages && game.galleryImages.length > 0 
    ? game.galleryImages 
    : [game.imageUrl];

  return (
    // Full-screen overlay
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-80"
      onClick={onClose} // Close modal when clicking the background
    >
      {/* Modal Content Box */}
      <div 
        className="bg-gray-900 text-white rounded-lg shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()} // Stop click from bubbling to the overlay
      >
        {/* Close Button */}
        <button 
          onClick={onClose} 
          className="absolute top-4 right-4 text-white text-3xl hover:text-brand-accent"
        >
          &times;
        </button>

        {/* Video Player */}
        <div className="w-full aspect-video">
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
            <img src={game.imageUrl} alt={game.title} className="w-full h-full object-cover" />
          )}
        </div>

        {/* Game Details */}
        <div className="p-8">
          <h2 className="text-4xl font-bold mb-3">{game.title}</h2>
          
          {/* Tags */}
          <div className="flex flex-wrap gap-2 mb-4">
            {game.tags?.map((tag) => (
              <span key={tag} className="bg-gray-800 text-brand-accent font-semibold px-3 py-1 rounded-full text-sm">
                {tag}
              </span>
            ))}
          </div>

          <p className="text-gray-300 text-lg mb-6">{game.description}</p>

          {/* Image Gallery */}
          <div>
            <h3 className="text-2xl font-bold mb-4">Gallery</h3>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {imagesToShow.map((imgUrl, index) => (
                <img 
                  key={index}
                  src={imgUrl} 
                  alt={`${game.title} gallery image ${index + 1}`} 
                  className="w-full h-32 object-cover rounded-lg"
                />
              ))}
            </div>
            {/* If gallery is empty, show a message */}
            {imagesToShow.length === 0 && (
              <p className="text-gray-500">No gallery images available.</p>
            )}
          </div>

        </div>
      </div>
    </div>
  );
}

export default GameDetailModal;