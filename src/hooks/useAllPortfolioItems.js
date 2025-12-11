import { useState, useEffect } from 'react';
import { db } from '../firebase';
import { collection, getDocs, query } from 'firebase/firestore';

function useAllPortfolioItems() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // === 1. SAFETY DATE HELPER ===
  const getSafeDate = (dateField) => {
    if (!dateField) return 0;
    if (typeof dateField.toMillis === 'function') return dateField.toMillis();
    if (typeof dateField.getTime === 'function') return dateField.getTime();
    const parsedDate = new Date(dateField);
    if (!isNaN(parsedDate.getTime())) return parsedDate.getTime();
    return 0;
  };

  // === 2. UNIVERSAL IMAGE EXTRACTOR (THE FIX) ===
  const getImgSrc = (imgField) => {
    if (!imgField) return null;
    
    // Case A: It's an Array (common in React-Admin) -> Take first item
    if (Array.isArray(imgField) && imgField.length > 0) {
      return imgField[0].src?.src || imgField[0].src;
    }
    
    // Case B: It's an Object with a 'src' property
    if (typeof imgField === 'object' && imgField.src) {
        // Sometimes it's nested like { src: { src: "url" } }
        return imgField.src.src || imgField.src;
    }

    // Case C: It's just a String (URL)
    if (typeof imgField === 'string') {
        return imgField;
    }

    return null;
  };
  // ===============================================

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

        // Helper to process a document
        const processDoc = (doc, typePath) => {
          const data = doc.data();
          const projectId = doc.id;
          const projectTitle = data.title;
          const linkUrl = `/${typePath}/${data.slug}`;
          const createdAt = getSafeDate(data.createdAt);
          const generatedItems = [];

          // 1. THE MAIN CARD
          if (data.youtubeUrl) {
             generatedItems.push({
               id: `${projectId}-main-video`,
               type: 'video',
               src: data.youtubeUrl,
               title: projectTitle,
               linkUrl: linkUrl,
               createdAt: createdAt
             });
          } else {
             // Use the Universal Helper here
             const mainSrc = getImgSrc(data.imageUrl) || getImgSrc(data.bannerUrl) || "/assets/placeholder.png";
             
             generatedItems.push({
               id: `${projectId}-main-image`,
               type: 'image',
               src: mainSrc,
               title: projectTitle,
               linkUrl: linkUrl,
               createdAt: createdAt
             });
          }

          // 2. THE GALLERY CARDS
          if (data.galleryImages && Array.isArray(data.galleryImages)) {
            data.galleryImages.forEach((img, index) => {
              const gallerySrc = getImgSrc(img); // Use Helper here too
              if (gallerySrc) {
                generatedItems.push({
                  id: `${projectId}-gallery-${index}`,
                  type: 'image',
                  src: gallerySrc,
                  title: projectTitle,
                  linkUrl: linkUrl,
                  createdAt: createdAt
                });
              }
            });
          }

          return generatedItems;
        };

        // Flatten all collections
        const allItems = [
          ...gamesSnap.docs.flatMap(doc => processDoc(doc, 'specificgame')),
          ...clientSnap.docs.flatMap(doc => processDoc(doc, 'clientproject')),
          ...ghostSnap.docs.flatMap(doc => processDoc(doc, 'ghostproject')),
        ];

        // Sort by Date
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

  return { items, loading, error };
}

export default useAllPortfolioItems;