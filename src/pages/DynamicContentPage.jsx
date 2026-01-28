import React, { useState, useEffect } from 'react';
import { db } from '../firebase';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { motion } from 'framer-motion';
import SmartImage from '../components/SmartImage';
import ReactMarkdown from 'react-markdown'; // Assuming you still have this installed

function DynamicContentPage({ pageSlug }) {
  const [pageData, setPageData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPage = async () => {
      try {
        setLoading(true);
        // Query the 'pages' collection for the matching slug
        const q = query(collection(db, 'pages'), where('slug', '==', pageSlug));
        const snapshot = await getDocs(q);

        if (!snapshot.empty) {
          setPageData(snapshot.docs[0].data());
        } else {
          setPageData(null);
        }
      } catch (err) {
        console.error("Error loading page:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchPage();
  }, [pageSlug]); // Re-run if the slug changes

  if (loading) return <div className="min-h-screen bg-black flex items-center justify-center text-white">Loading content...</div>;
  
  if (!pageData) return (
    <div className="min-h-screen bg-black flex flex-col items-center justify-center text-white p-10 text-center">
      <h1 className="text-4xl font-bold text-red-500 mb-4">404</h1>
      <p className="text-xl">Page not found.</p>
      <p className="text-gray-400 mt-2">Please go to the Admin Panel and create a page with slug: <span className="font-mono text-white bg-gray-800 px-2 py-1 rounded">{pageSlug}</span></p>
    </div>
  );

  const bannerSrc = pageData.bannerUrl?.src || pageData.bannerUrl;

  return (
    <div className="min-h-screen bg-black text-white pb-20">
      
      {/* Optional Banner */}
      {bannerSrc ? (
        <div className="w-full h-[300px] md:h-[400px] relative mb-12">
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent z-10"></div>
            <SmartImage src={bannerSrc} className="w-full h-full object-cover" />
            <div className="absolute bottom-0 left-0 w-full p-8 z-20 container mx-auto max-w-4xl">
                <h1 className="text-4xl md:text-6xl font-black uppercase tracking-wide drop-shadow-lg">{pageData.title}</h1>
            </div>
        </div>
      ) : (
        <div className="pt-32 pb-12 container mx-auto max-w-4xl px-6">
            <h1 className="text-4xl md:text-6xl font-black uppercase tracking-wide text-red-600">{pageData.title}</h1>
            <div className="h-1 w-24 bg-white mt-6"></div>
        </div>
      )}

      {/* Content Area */}
      <div className="container mx-auto max-w-4xl px-6">
        <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-gray-300 text-lg leading-relaxed whitespace-pre-wrap markdown-container"
        >
            {/* If you have ReactMarkdown, use it. If not, the text will still show fine because of 'whitespace-pre-wrap' */}
            <ReactMarkdown
                components={{
                    h1: ({node, ...props}) => <h1 className="text-3xl font-bold text-white mt-8 mb-4 border-b border-gray-800 pb-2" {...props} />,
                    h2: ({node, ...props}) => <h2 className="text-2xl font-bold text-red-500 mt-8 mb-4" {...props} />,
                    h3: ({node, ...props}) => <h3 className="text-xl font-bold text-white mt-6 mb-3" {...props} />,
                    p: ({node, ...props}) => <p className="mb-6" {...props} />,
                    ul: ({node, ...props}) => <ul className="list-disc list-inside mb-6 space-y-2 ml-4" {...props} />,
                    li: ({node, ...props}) => <li className="text-gray-300" {...props} />,
                    a: ({node, ...props}) => <a className="text-red-500 hover:underline" {...props} />,
                }}
            >
                {pageData.content}
            </ReactMarkdown>
        </motion.div>
      </div>
    </div>
  );
}

export default DynamicContentPage;