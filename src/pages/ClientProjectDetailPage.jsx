import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion'; 
import useClientProjectBySlug from '../hooks/useClientProjectBySlug';
import { FaApple, FaGooglePlay, FaChevronLeft } from 'react-icons/fa6'; 
import steamLogo from "../assets/steam.png";
import SmartImage from '../components/SmartImage';

function ClientProjectDetailPage() {
  const { slug } = useParams();
  const { project, loading, error } = useClientProjectBySlug(slug);

  if (loading) return <div className="min-h-screen flex items-center justify-center text-white bg-[#0a0a0a]">Loading...</div>;
  if (error || !project) return <div className="min-h-screen flex items-center justify-center text-red-500 bg-[#0a0a0a]">Project not found.</div>;

  // Handle old string images vs new object images
  const mainCoverSrc = project.imageUrl?.src || project.imageUrl || "/assets/placeholder.png";
  // === NEW: Handle Banner Image ===
  const bannerSrc = project.bannerUrl?.src || project.bannerUrl || null;
  // ================================
  const isPortrait = project.displaySize === 'portrait';

  return (
    <div className="bg-[#0a0a0a] text-gray-100 min-h-screen pb-20">
        
      {/* === NEW: FULL WIDTH BANNER === */}
      {bannerSrc && (
        <div className="w-full h-[300px] md:h-[450px] relative mb-8">
           <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-transparent to-transparent z-10"></div>
           {/* replaced with SmartImage */}
           <SmartImage src={bannerSrc} alt={`${project.title} Banner`} className="w-full h-full" isBanner={true} />
        </div>
      )}
      {/* ============================== */}

      <div className="container mx-auto px-4 max-w-6xl">
        {/* Back Button */}
        <Link to="/#client-projects" className="inline-flex items-center gap-2 text-gray-400 hover:text-white transition-colors mb-12 group">
            <FaChevronLeft className="group-hover:-translate-x-1 transition-transform"/> Back to Projects
        </Link>

        <div className="flex flex-col lg:flex-row gap-12 lg:gap-16">
            
            {/* Left: Main Visual (Cover Image) */}
            <div className="lg:w-1/2 flex-shrink-0 flex justify-center lg:justify-start">
                <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className={`relative rounded-[2.5rem] overflow-hidden shadow-2xl border-2 border-red-900/30 bg-black ${isPortrait ? 'w-full max-w-sm aspect-[2/3]' : 'w-full aspect-video'}`}
                >
                    {/* replaced with SmartImage */}
                    <SmartImage src={mainCoverSrc} alt={project.title} className="w-full h-full" />
                     <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent pointer-events-none"></div>
                </motion.div>
            </div>

            {/* Right: Project Details */}
            <div className="lg:w-1/2 flex flex-col justify-center">
                <motion.div
                     initial={{ opacity: 0, x: 20 }}
                     animate={{ opacity: 1, x: 0 }}
                     transition={{ duration: 0.6, delay: 0.2 }}
                >
                    <h1 className="text-4xl md:text-5xl font-black text-white mb-6 tracking-wide uppercase drop-shadow-lg leading-none">
                        {project.title}
                    </h1>
                    
                    <div className="w-20 h-2 bg-red-600 rounded-full mb-8"></div>

                    <p className="text-xl text-gray-300 leading-relaxed mb-10">
                        {project.description}
                    </p>

                    {/* Links */}
                    <div className="flex flex-col sm:flex-row sm:flex-wrap gap-4 items-start sm:items-center mt-8">
                        
                        {project.clientUrl && (
                         <a
                          href={project.clientUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-block bg-red-600 hover:bg-red-500 text-white font-bold px-8 py-3 text-lg rounded-xl transition-all shadow-lg hover:shadow-red-600/30 border-2 border-transparent hover:border-red-300"
                        >
                          View Project Live
                        </a>
                        )}

                        {project.steamUrl && (
                        <motion.a
                            href={project.steamUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            whileHover={{ scale: 1.05, boxShadow: "0px 0px 15px rgba(23, 26, 33, 0.5)" }}
                            whileTap={{ scale: 0.95 }}
                            className="flex items-center gap-2 bg-[#171a21] border border-gray-600 hover:border-gray-400 px-4 py-2 rounded-xl transition-all"
                        >
                            <img src={steamLogo} alt="Steam" className="w-7 h-7 object-contain" />
                            <div className="flex flex-col text-left leading-tight">
                            <span className="text-xs text-gray-400">Download on</span>
                            <span className="text-sm font-semibold text-white">Steam</span>
                            </div>
                        </motion.a>
                        )}

                    </div>
                </motion.div>
            </div>
        </div>
      </div>
    </div>
  );
}

export default ClientProjectDetailPage;
