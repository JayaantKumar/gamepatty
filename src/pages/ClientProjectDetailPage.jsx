import React from 'react';
import { useParams, Link } from 'react-router-dom';
import useClientProjectBySlug from '../hooks/useClientProjectBySlug'; // Use the new hook

function ClientProjectDetailPage() {
  const { slug } = useParams();
  const { project, loading, error } = useClientProjectBySlug(slug); // Use the new hook

  if (loading) {
    return <div className="text-center py-40 text-white">Loading project...</div>;
  }
  if (error) {
    return <div className="text-center py-40 text-red-500">{error}</div>;
  }
  if (!project) {
    return <div className="text-center py-40 text-white">Client project not found.</div>;
  }

  return (
    <div className="bg-gradient-to-b from-black via-[#1a0000] to-[#2b0000] min-h-screen text-white py-16">
      {/* Back button */}
      <div className="container mx-auto px-6 sm:px-10 md:px-20 mb-8">
        <Link 
          to="/" 
          className="text-gray-400 hover:text-white transition-colors text-lg"
        >
          &larr; Back to home
        </Link>
      </div>

      <div className="container mx-auto px-6 sm:px-10 md:px-20 max-w-4xl">
        {/* Project Title */}
        <h1 className="text-4xl sm:text-5xl font-extrabold mb-8 tracking-wide text-center">
          {project.title}
        </h1>

        {/* Project Image */}
        <div className="w-full mb-8">
          <img
            src={project.imageUrl}
            alt={project.title}
            className="w-full h-auto object-cover rounded-2xl shadow-xl border border-red-900/50"
          />
        </div>

        {/* Project Description (Optional) */}
        {project.description && (
          <div className="text-gray-300 text-lg leading-relaxed mb-8 prose prose-invert prose-lg max-w-none">
            <p>{project.description}</p>
          </div>
        )}

        {/* Link to Client's Site/Store */}
        {project.clientUrl && (
           <div className="text-center mt-12">
             <a
              href={project.clientUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block bg-red-600 hover:bg-red-500 text-white font-bold px-10 py-4 text-xl rounded-xl transition-all shadow-lg hover:shadow-red-600/30"
            >
              View Project Live
            </a>
           </div>
        )}
      </div>
    </div>
  );
}

export default ClientProjectDetailPage;