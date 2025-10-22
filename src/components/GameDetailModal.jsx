import React, { useState } from "react";

const getEmbedUrl = (url) => {
  if (!url) return "";
  try {
    const videoId = new URL(url).searchParams.get("v");
    if (videoId) {
      return `https://www.youtube.com/embed/${videoId}?autoplay=0&mute=1&loop=1&playlist=${videoId}`;
    }
    return "";
  } catch (e) {
    console.error("Invalid YouTube URL provided:", url);
    return "";
  }
};

function GameDetailModal({ game, onClose }) {
  const [lightboxImage, setLightboxImage] = useState(null);
  const [lightboxIndex, setLightboxIndex] = useState(0);

  if (!game) return null;

  const embedUrl = getEmbedUrl(game.youtubeUrl);
  const imagesToShow =
    game.galleryImages && game.galleryImages.length > 0
      ? game.galleryImages
      : [game.imageUrl];

  const openLightbox = (imgUrl, index) => {
    setLightboxImage(imgUrl);
    setLightboxIndex(index);
  };

  const closeLightbox = () => setLightboxImage(null);

  const showPreviousImage = (e) => {
    e.stopPropagation();
    const newIndex =
      (lightboxIndex - 1 + imagesToShow.length) % imagesToShow.length;
    setLightboxIndex(newIndex);
    setLightboxImage(imagesToShow[newIndex]);
  };

  const showNextImage = (e) => {
    e.stopPropagation();
    const newIndex = (lightboxIndex + 1) % imagesToShow.length;
    setLightboxIndex(newIndex);
    setLightboxImage(imagesToShow[newIndex]);
  };

  return (
    <>
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

            {/* 🎮 Play Demo Buttons */}
            <div className="flex gap-5 mb-10">
              {game.androidUrl && (
                <a
                  href={game.androidUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-green-600 hover:bg-green-500 text-white font-bold px-6 py-3 rounded-xl shadow-lg hover:shadow-green-500/30 transition-all"
                >
                  Play on Android
                </a>
              )}
              {game.iosUrl && (
                <a
                  href={game.iosUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-blue-600 hover:bg-blue-500 text-white font-bold px-6 py-3 rounded-xl shadow-lg hover:shadow-blue-500/30 transition-all"
                >
                  Play on iOS
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
                    className="overflow-hidden rounded-2xl shadow-lg transform transition-all duration-300 hover:scale-105 hover:shadow-[0_0_25px_rgba(255,87,34,0.4)] cursor-pointer relative group"
                    onClick={() => openLightbox(imgUrl, index)}
                  >
                    <img
                      src={imgUrl}
                      alt={`${game.title} gallery image ${index + 1}`}
                      className="w-full h-60 object-cover"
                    />
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-all duration-300 flex items-center justify-center">
                      <svg
                        className="w-12 h-12 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7"
                        />
                      </svg>
                    </div>
                  </div>
                ))}
              </div>
              {imagesToShow.length === 0 && (
                <p className="text-gray-500 mt-4">No gallery images available.</p>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Lightbox Modal */}
      {lightboxImage && (
        <div
          className="fixed inset-0 z-[60] flex items-center justify-center bg-black/95 backdrop-blur-sm"
          onClick={closeLightbox}
        >
          <button
            onClick={closeLightbox}
            className="absolute top-4 right-4 text-white text-5xl hover:text-[#ff784e] transition-all z-10"
          >
            &times;
          </button>

          {imagesToShow.length > 1 && (
            <>
              <button
                onClick={showPreviousImage}
                className="absolute left-4 text-white text-5xl hover:text-[#ff784e] transition-all z-10 bg-black/50 rounded-full w-14 h-14 flex items-center justify-center hover:bg-black/70"
              >
                ‹
              </button>
              <button
                onClick={showNextImage}
                className="absolute right-4 text-white text-5xl hover:text-[#ff784e] transition-all z-10 bg-black/50 rounded-full w-14 h-14 flex items-center justify-center hover:bg-black/70"
              >
                ›
              </button>
            </>
          )}

          <div className="absolute top-4 left-1/2 transform -translate-x-1/2 text-white text-lg bg-black/50 px-4 py-2 rounded-full">
            {lightboxIndex + 1} / {imagesToShow.length}
          </div>

          <img
            src={lightboxImage}
            alt="Full size"
            className="max-w-[90vw] max-h-[90vh] object-contain"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}
    </>
  );
}

export default GameDetailModal;
