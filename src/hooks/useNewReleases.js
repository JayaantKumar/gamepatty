import { useState, useEffect } from 'react';
import { db } from '../firebase';
import { collection, getDocs, query, orderBy } from 'firebase/firestore';

function useNewReleases() {
  const [games, setGames] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchGames = async () => {
      try {
        setLoading(true);
        setError(null);
        
        const gamesCollection = collection(db, 'newReleases');
        // You can change 'title' to a date field if you add one
        const q = query(gamesCollection, orderBy('title', 'asc')); 
        const querySnapshot = await getDocs(q);
        
        const gamesList = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
        }));
        
        setGames(gamesList);
      } catch (err) {
        console.error("Error fetching new releases: ", err);
        setError('Failed to fetch new releases.');
      } finally {
        setLoading(false);
      }
    };

    fetchGames();
  }, []);

  return { games, loading, error };
}

export default useNewReleases;