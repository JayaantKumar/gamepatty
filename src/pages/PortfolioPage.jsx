import React, { useState } from 'react';
import useAllPortfolioItems from '../hooks/useAllPortfolioItems';
import GameDetailModal from '../components/GameDetailModal'; // Reuse the modal!

// Helper for Video Thumbnails
const getEmbedUrl = (url) => {
  if (!url) return "";
  try {
    const videoId = new URL(url).searchParams.get("v");
    if (videoId) {
      return `https://www.youtube.com/embed/${videoId}?autoplay=0&mute=1&loop=1&playlist=${videoId}&controls=0`;
    }
    return "";
  } catch {
    return "";
  }
};

function PortfolioPage() {
  const { items, loading, error } = useAllPortfolioItems();
  // State for the Pop-up
  const [selectedProject, setSelectedProject] = useState(null);

  return (
    <section id="portfolio" className="py-20 px-6 md:px-16 lg:px-24 bg-gradient-to-b from-black via-[#1a0000] to-[#2b0000] min-h-screen">
      <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-center uppercase mb-16 md:mb-24 tracking-wide text-white">
        Full <span className="text-red-500">Portfolio</span>
      </h2>
      
      {loading && (
        <div className="flex justify-center items-center min-h-[400px]">
          <div className="text-center">
            <div className="inline-block w-12 h-12 border-4 border-red-500 border-t-transparent rounded-full animate-spin mb-4"></div>
            <p className="text-xl text-gray-400">Loading gallery...</p>
          </div>
        </div>
      )}
      
      {error && <p className="text-center text-red-500 text-xl font-semibold">{error}</p>}
      
      {!loading && !error && items && items.length > 0 && (
        <div className="max-w-7xl mx-auto columns-1 md:columns-2 lg:columns-3 gap-6 md:gap-8 space-y-6 md:space-y-8">
          {items.map((item) => {
            
            const cardClasses = "group block break-inside-avoid mb-6 md:mb-8 rounded-3xl overflow-hidden border-2 border-red-900/50 shadow-2xl transition-all duration-300 transform hover:scale-[1.02] hover:shadow-red-600/40 hover:border-red-600 bg-black/40 relative cursor-pointer";

            return (
                <div 
                    key={item.id} 
                    className={cardClasses}
                    // === CLICK TO OPEN POP-UP ===
                    onClick={() => setSelectedProject(item.originalData)} 
                >
                  
                  {item.type === 'video' ? (
                     <div className="w-full aspect-video pointer-events-none"> 
                        {/* pointer-events-none ensures clicking video opens modal instead of playing inside grid */}
                        <iframe
                          src={getEmbedUrl(item.src)}
                          title={item.title}
                          className="w-full h-full object-cover"
                          frameBorder="0"
                        ></iframe>
                     </div>
                  ) : (
                    <div className="relative overflow-hidden">
                        <img
                          src={item.src}
                          alt={item.title}
                          className="w-full h-auto object-cover transition-transform duration-500 group-hover:scale-105"
                          loading="lazy"
                        />
                    </div>
                  )}

                  {/* Title Overlay */}
                  <div className="absolute bottom-0 left-0 right-0 p-4 md:p-5 bg-gradient-to-t from-black via-black/80 to-transparent hover:bg-black/90 transition-colors">
                    <h3 className="text-xl font-black text-white text-center tracking-wide drop-shadow-lg group-hover:text-red-500 transition-colors">
                      {item.title} 
                    </h3>
                    <span className="text-xs font-normal text-gray-400 block mt-1 text-center">(Click for Details)</span>
                  </div>

                </div>
            );
          })}
        </div>
      )}
      
      {/* === THE MODAL POP-UP === */}
      {selectedProject && (
        <GameDetailModal
          game={selectedProject} // Pass the full data we saved earlier
          onClose={() => setSelectedProject(null)}
        />
      )}

    </section>
  );
}

export default PortfolioPage;