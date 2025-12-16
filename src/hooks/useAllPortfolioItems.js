import { useState, useEffect } from 'react';
import { db } from '../firebase';
import { collection, getDocs, query } from 'firebase/firestore';

function useAllPortfolioItems() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Safety Date Helper
  const getSafeDate = (dateField) => {
    if (!dateField) return 0;
    if (typeof dateField.toMillis === 'function') return dateField.toMillis();
    if (typeof dateField.getTime === 'function') return dateField.getTime();
    const parsedDate = new Date(dateField);
    if (!isNaN(parsedDate.getTime())) return parsedDate.getTime();
    return 0;
  };

  // Universal Image Helper
  const getImgSrc = (imgField) => {
    if (!imgField) return null;
    if (Array.isArray(imgField) && imgField.length > 0) return imgField[0].src?.src || imgField[0].src;
    if (typeof imgField === 'object' && imgField.src) return imgField.src.src || imgField.src;
    if (typeof imgField === 'string') return imgField;
    return null;
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

        const processDoc = (doc) => {
          const data = doc.data();
          // === KEY CHANGE: Store the Full Data Object ===
          // We need this so the Modal has access to everything (description, tags, etc.)
          const fullData = { id: doc.id, ...data }; 
          // ==============================================
          
          const projectId = doc.id;
          const projectTitle = data.title;
          const createdAt = getSafeDate(data.createdAt);
          const generatedItems = [];

          // 1. Main Card
          if (data.youtubeUrl) {
             generatedItems.push({
               id: `${projectId}-main-video`,
               type: 'video',
               src: data.youtubeUrl,
               title: projectTitle,
               originalData: fullData, // Pass full data
               createdAt: createdAt
             });
          } else {
             const mainSrc = getImgSrc(data.imageUrl) || getImgSrc(data.bannerUrl) || "/assets/placeholder.png";
             generatedItems.push({
               id: `${projectId}-main-image`,
               type: 'image',
               src: mainSrc,
               title: projectTitle,
               originalData: fullData, // Pass full data
               createdAt: createdAt
             });
          }

          // 2. Gallery Cards
          if (data.galleryImages && Array.isArray(data.galleryImages)) {
            data.galleryImages.forEach((img, index) => {
              const gallerySrc = getImgSrc(img);
              if (gallerySrc) {
                generatedItems.push({
                  id: `${projectId}-gallery-${index}`,
                  type: 'image',
                  src: gallerySrc,
                  title: projectTitle,
                  originalData: fullData, // Pass full data
                  createdAt: createdAt
                });
              }
            });
          }

          return generatedItems;
        };

        const allItems = [
          ...gamesSnap.docs.flatMap(doc => processDoc(doc)),
          ...clientSnap.docs.flatMap(doc => processDoc(doc)),
          ...ghostSnap.docs.flatMap(doc => processDoc(doc)),
        ];

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