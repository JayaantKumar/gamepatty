import { useState, useEffect } from 'react';
import { db } from '../firebase';
import { collection, getDocs, query } from 'firebase/firestore';

function useAllPortfolioItems() {
  const [items, setItems] = useState([]); // Changed from 'projects' to 'items'
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Safety Helper for Dates
  const getSafeDate = (dateField) => {
    if (!dateField) return 0;
    if (typeof dateField.toMillis === 'function') return dateField.toMillis();
    if (typeof dateField.getTime === 'function') return dateField.getTime();
    const parsedDate = new Date(dateField);
    if (!isNaN(parsedDate.getTime())) return parsedDate.getTime();
    return 0;
  };

  useEffect(() => {
    const fetchAllItems = async () => {
      try {
        setLoading(true);
        setError(null);

        const [gamesSnap, clientSnap, ghostSnap] = await Promise.all([
          getDocs(query(collection(db, 'games'))),
          getDocs(query(collection(db, 'clientProjects'))),
          getDocs(query(collection(db, 'ghostCollection'))),
        ]);

        // Helper to process a document into MULTIPLE items
        const processDoc = (doc, typePath) => {
          const data = doc.data();
          const projectId = doc.id;
          const projectTitle = data.title;
          const linkUrl = `/${typePath}/${data.slug}`;
          const createdAt = getSafeDate(data.createdAt);
          const generatedItems = [];

          // 1. THE MAIN CARD (Video or Main Image)
          // We prioritize YouTube. If no YouTube, we use the Main Image.
          if (data.youtubeUrl) {
             generatedItems.push({
               id: `${projectId}-main-video`, // Unique ID
               type: 'video',
               src: data.youtubeUrl,
               title: projectTitle,
               linkUrl: linkUrl,
               createdAt: createdAt
             });
          } else {
             // If no video, create a Main Image card
             const mainSrc = data.imageUrl?.src || data.imageUrl || data.bannerUrl?.src || "/assets/placeholder.png";
             generatedItems.push({
               id: `${projectId}-main-image`,
               type: 'image',
               src: mainSrc,
               title: projectTitle,
               linkUrl: linkUrl,
               createdAt: createdAt
             });
          }

          // 2. THE GALLERY CARDS (Add every single gallery image)
          if (data.galleryImages && Array.isArray(data.galleryImages)) {
            data.galleryImages.forEach((img, index) => {
              const gallerySrc = img?.src || img; // Handle object vs string
              if (gallerySrc) {
                generatedItems.push({
                  id: `${projectId}-gallery-${index}`, // Unique ID
                  type: 'image',
                  src: gallerySrc,
                  title: projectTitle, // Keep same title
                  linkUrl: linkUrl,    // Link to same project
                  createdAt: createdAt // Keep same date so they stay grouped
                });
              }
            });
          }

          return generatedItems;
        };

        // Process all collections and FLATTEN them into one big list
        const allItems = [
          ...gamesSnap.docs.flatMap(doc => processDoc(doc, 'specificgame')),
          ...clientSnap.docs.flatMap(doc => processDoc(doc, 'clientproject')),
          ...ghostSnap.docs.flatMap(doc => processDoc(doc, 'ghostproject')),
        ];

        // Sort by Newest First
        allItems.sort((a, b) => b.createdAt - a.createdAt);

        setItems(allItems);

      } catch (err) {
        console.error("Error fetching portfolio: ", err);
        setError('Failed to fetch portfolio data.');
      } finally {
        setLoading(false);
      }
    };

    fetchAllItems();
  }, []);

  return { items, loading, error }; // Returning 'items' now
}

export default useAllPortfolioItems;