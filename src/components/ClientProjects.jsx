import React from "react";
import useClientProjects from "../hooks/useClientProjects";

function ClientProjects() {
  const { projects, loading, error } = useClientProjects();

  return (
    <section
      id="client-projects"
      className="py-28 px-[5.5rem] bg-gradient-to-b from-black via-[#1a0000] to-[#2b0000]"
    >
      {/* Heading - matches GamesList */}
      <h2 className="text-5xl font-black text-center uppercase mb-20 tracking-wide text-white">
        Games For <span className="text-red-500">Our Clients</span>
      </h2>

      {loading && <p className="text-center text-lg text-gray-400">Loading projects...</p>}
      {error && <p className="text-center text-red-500 text-xl">{error}</p>}

      {!loading && !error && (
        <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-10">
          {projects.map((project) => (
            <a
              key={project.id}
              href={project.clientUrl}
              target="_blank"
              rel="noopener noreferrer"
              title={project.title}
              className="group block rounded-3xl overflow-hidden border border-red-900 shadow-2xl transition-all transform hover:scale-[1.04] hover:shadow-red-600/30"
            >
              <div className="relative">
                <img
                  src={project.imageUrl}
                  alt={project.title}
                  className="w-full aspect-video object-cover rounded-3xl transition-transform duration-300 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent rounded-3xl"></div>
                <h3 className="absolute bottom-4 left-1/2 -translate-x-1/2 text-center text-2xl font-extrabold text-white tracking-wide px-3">
                  {project.title}
                </h3>
              </div>

              {/* Description (optional brief text) */}
              {project.description && (
                <p className="p-5 text-gray-300 text-[1.1rem] leading-relaxed">
                  {project.description.length > 120
                    ? project.description.slice(0, 120) + "..."
                    : project.description}
                </p>
              )}
            </a>
          ))}
        </div>
      )}
    </section>
  );
}

export default ClientProjects;
