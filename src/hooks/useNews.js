import { useState, useEffect } from 'react';
import { db } from '../firebase';
import { collection, getDocs, query, orderBy, limit } from 'firebase/firestore';

function useNews(itemLimit = 5) {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        setLoading(true);
        setError(null);
        
        const newsCollection = collection(db, 'news');
        const q = query(
          newsCollection, 
          orderBy('publishedAt', 'desc'),
          limit(itemLimit)
        );
        const querySnapshot = await getDocs(q);
        
        const newsList = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
        }));
        
        setNews(newsList);
      } catch (err) {
        console.error("Error fetching news: ", err);
        setError('Failed to fetch news. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchNews();
  }, [itemLimit]);

  return { news, loading, error };
}

export default useNews;