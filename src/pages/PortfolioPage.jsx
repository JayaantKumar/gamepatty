import React from 'react';
import { Link } from 'react-router-dom';
import useAllPortfolioItems from '../hooks/useAllPortfolioItems';

function PortfolioPage() {
  const { projects, loading, error } = useAllPortfolioItems();

  return (
    <section
      id="portfolio"
      className="py-20 px-6 md:px-16 lg:px-24 bg-gradient-to-b from-black via-[#1a0000] to-[#2b0000] min-h-screen"
    >
      <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-center uppercase mb-16 md:mb-24 tracking-wide text-white">
        Full <span className="text-red-500">Portfolio</span>
      </h2>
      
      {loading && (
        <div className="flex justify-center items-center min-h-[400px]">
          {/* ... loading spinner ... */}
        </div>
      )}
      
      {error && (
        <p className="text-center text-red-500 text-xl font-semibold">{error}</p>
      )}
      
      {/* === THIS IS THE FIX ===
        We changed "projects.length" to "projects && projects.length"
        This checks if 'projects' exists *before* trying to read its length.
      */}
      {!loading && !error && projects && projects.length > 0 && (
        <div className="max-w-7xl mx-auto columns-1 md:columns-2 lg:columns-3 gap-6 md:gap-8 space-y-6 md:space-y-8">
          {projects.map((project) => (
            <Link
              key={project.id}
              to={project.linkUrl} 
              title={project.title}
              className="group block break-inside-avoid mb-6 md:mb-8 rounded-3xl overflow-hidden border-2 border-red-900/50 shadow-2xl transition-all duration-300 transform hover:scale-[1.02] hover:shadow-red-600/40 hover:border-red-600 bg-black/40"
            >
              {/* ... rest of the link content ... */}
              <div className="relative overflow-hidden">
                <img
                  src={project.imageUrl}
                  alt={project.title}
                  className="w-full h-auto object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-black/90 via-black/60 to-transparent"></div>
                <div className="absolute bottom-0 left-0 right-0 p-4 md:p-5">
                  <h3 className="text-xl md:text-2xl font-black text-white text-center tracking-wide drop-shadow-lg">
                    {project.title}
                  </h3>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
      
      {/* Empty State */}
      {!loading && !error && projects && projects.length === 0 && (
        <div className="text-center py-20">
          <p className="text-2xl text-gray-400 font-semibold">No projects available yet.</p>
        </div>
      )}
    </section>
  );
}

export default PortfolioPage;