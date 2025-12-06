import { useState, useEffect } from 'react';
import { db } from '../firebase';
import { collection, getDocs, query } from 'firebase/firestore';

function useAllPortfolioItems() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAllProjects = async () => {
      try {
        setLoading(true);
        setError(null);

        const gamesQuery = query(collection(db, 'games'));
        const clientProjectsQuery = query(collection(db, 'clientProjects'));

        const [gamesSnapshot, clientProjectsSnapshot] = await Promise.all([
          getDocs(gamesQuery),
          getDocs(clientProjectsQuery),
        ]);

        // Map 'games' data
        const gamesList = gamesSnapshot.docs.map(doc => ({
          id: doc.id,
          title: doc.data().title,
          imageUrl: doc.data().imageUrl,
          youtubeUrl: doc.data().youtubeUrl, // <--- ADDED THIS
          linkUrl: `/specificgame/${doc.data().slug}`,
        }));

        // Map 'clientProjects' data
        const clientProjectsList = clientProjectsSnapshot.docs.map(doc => ({
          id: doc.id,
          title: doc.data().title,
          imageUrl: doc.data().imageUrl,
          // Client projects usually don't have youtubeUrl in your setup, 
          // but if you added it, this will grab it.
          youtubeUrl: doc.data().youtubeUrl, // <--- ADDED THIS
          linkUrl: `/clientproject/${doc.data().slug}`,
        }));

        setProjects([...gamesList, ...clientProjectsList]);

      } catch (err) {
        console.error("Error fetching all projects: ", err);
        setError('Failed to fetch project data.');
      } finally {
        setLoading(false);
      }
    };

    fetchAllProjects();
  }, []);

  return { projects, loading, error };
}

export default useAllPortfolioItems;