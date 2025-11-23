import React from "react";
import { Link } from "react-router-dom";
import useClientProjects from "../hooks/useClientProjects";

// Helper function simplified for only portrait and landscape
const getAspectRatioClass = (size) => {
  switch (size) {
    case 'portrait':
      return 'aspect-[9/16]'; 
    case 'landscape':
    default: 
      return 'aspect-video'; 
  }
};

function ClientProjects() {
  const { projects, loading, error } = useClientProjects();
  
  return (
    <section
      id="client-projects"
      className="py-20 px-6 md:px-16 lg:px-24 bg-gradient-to-b from-black via-[#1a0000] to-[#2b0000] min-h-screen"
    >
      <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-center uppercase mb-16 md:mb-24 tracking-wide text-white">
        Games For <span className="text-red-500">Our Clients</span>
      </h2>
      
      {loading && (
        <div className="flex justify-center items-center min-h-[400px]">
          <div className="text-center">
            <div className="inline-block w-12 h-12 border-4 border-red-500 border-t-transparent rounded-full animate-spin mb-4"></div>
            <p className="text-xl text-gray-400">Loading projects...</p>
          </div>
        </div>
      )}
      
      {error && (
        <p className="text-center text-red-500 text-xl font-semibold">{error}</p>
      )}
      
      {!loading && !error && projects.length > 0 && (
        <div className="max-w-7xl mx-auto columns-1 md:columns-2 lg:columns-3 gap-6 md:gap-8 space-y-6 md:space-y-8">
          {projects.map((project) => {
            const aspectRatioClass = getAspectRatioClass(project.displaySize);
            
            // === THE FIX IS HERE ===
            // We check if imageUrl is an object (new upload) or string (old upload)
            const imageSrc = project.imageUrl?.src || project.imageUrl || "/assets/placeholder.png";

            return (
              <Link
                key={project.id}
                to={`/clientproject/${project.slug}`}
                title={project.title}
                className={`group block break-inside-avoid mb-6 md:mb-8 rounded-3xl overflow-hidden border-2 border-red-900/50 shadow-2xl transition-all duration-300 transform hover:scale-[1.02] hover:shadow-red-600/40 hover:border-red-600 bg-black/40 ${aspectRatioClass}`}
              >
                <div className="relative overflow-hidden w-full h-full">
                  <img
                    src={imageSrc} // <--- Using the fixed source variable
                    alt={project.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  
                  <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-black/90 via-black/60 to-transparent"></div>
                  
                  <div className="absolute bottom-0 left-0 right-0 p-4 md:p-5">
                    <h3 className="text-xl md:text-2xl font-black text-white text-center tracking-wide drop-shadow-lg">
                      {project.title}
                    </h3>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      )}
      
      {!loading && !error && projects.length === 0 && (
        <div className="text-center py-20">
          <p className="text-2xl text-gray-400 font-semibold">No client projects available yet.</p>
          <p className="text-gray-500 mt-2">Check back soon for exciting new games!</p>
        </div>
      )}
    </section>
  );
}

export default ClientProjects;