import React from "react";

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

function GameDetailModal({ game, onClose }) {
  if (!game) return null;

  const embedUrl = getEmbedUrl(game.youtubeUrl);
  const imagesToShow =
    game.galleryImages && game.galleryImages.length > 0
      ? game.galleryImages
      : [game.imageUrl];

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="relative bg-[#111] text-white rounded-2xl shadow-2xl w-full max-w-5xl max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-white text-4xl hover:text-[#ff784e] transition-all z-10"
        >
          &times;
        </button>

        {/* Video or Main Image */}
        <div className="w-full aspect-video">
          {embedUrl ? (
            <iframe
              src={embedUrl}
              title={game.title}
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="w-full h-full rounded-t-2xl"
            ></iframe>
          ) : (
            <img
              src={game.imageUrl}
              alt={game.title}
              className="w-full h-full object-cover rounded-t-2xl"
            />
          )}
        </div>

        {/* Content */}
        <div className="p-8">
          <h2 className="text-4xl font-extrabold mb-4 tracking-wide">
            {game.title}
          </h2>

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

          {/* Gallery */}
          <div>
            <h3 className="text-3xl font-bold mb-5 text-white">Gallery</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {imagesToShow.map((imgUrl, index) => (
                <div
                  key={index}
                  className="overflow-hidden rounded-2xl shadow-lg transform transition-all duration-300 hover:scale-105 hover:shadow-[0_0_25px_rgba(255,87,34,0.4)]"
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

export default GameDetailModal;
