import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import useClientProjectBySlug from '../hooks/useClientProjectBySlug';

// 1. Import FaSteam
import { FaApple, FaGooglePlay, FaSteam } from 'react-icons/fa6'; 

function ClientProjectDetailPage() {
  const { slug } = useParams();
  const { project, loading, error } = useClientProjectBySlug(slug);

  if (loading) {
    return <div className="text-center py-40 text-white">Loading project...</div>;
  }
  if (error) {
    return <div className="text-center py-40 text-red-500">{error}</div>;
  }
  if (!project) {
    return <div className="text-center py-40 text-white">Client project not found.</div>;
  }

  // === THE FIX LOGIC ===
  // We determine the correct image source here
  const imageSrc = project.imageUrl?.src || project.imageUrl || "/assets/placeholder.png";

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
            // === APPLYING THE FIX HERE ===
            src={imageSrc}
            alt={project.title}
            className="w-full h-auto object-cover rounded-2xl shadow-xl border border-red-900/50"
          />
        </div>

        {/* Project Description */}
        {project.description && (
          <div className="text-gray-300 text-lg leading-relaxed mb-8 prose prose-invert prose-lg max-w-none">
            <p>{project.description}</p>
          </div>
        )}

        {/* Link to Client's Site/Store */}
        <div className="flex flex-col sm:flex-row sm:flex-wrap gap-4 items-start sm:items-center mt-12">
            
            {/* Existing "View Project Live" Button */}
            {project.clientUrl && (
             <a
              href={project.clientUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block bg-red-600 hover:bg-red-500 text-white font-bold px-8 py-3 text-lg rounded-xl transition-all shadow-lg hover:shadow-red-600/30"
            >
              View Project Live
            </a>
            )}

            {/* === ADD STEAM BUTTON === */}
            {project.steamUrl && (
                <motion.a
                href={project.steamUrl}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.05, boxShadow: "0px 0px 15px rgba(23, 26, 33, 0.5)" }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center gap-2 bg-[#171a21] border border-gray-600 hover:border-gray-400 px-4 py-2 rounded-xl transition-all"
                >
                <FaSteam size={28} className="text-white" />
                <div className="flex flex-col text-left leading-tight">
                    <span className="text-xs text-gray-400">Download on</span>
                    <span className="text-sm font-semibold text-white">Steam</span>
                </div>
                </motion.a>
            )}
            {/* ======================== */}

        </div>
      </div>
    </div>
  );
}

export default ClientProjectDetailPage;
