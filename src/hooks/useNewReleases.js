import { useState, useEffect } from 'react';
import { db } from '../firebase';
import { collection, getDocs, query, orderBy, where, Timestamp } from 'firebase/firestore';

function useNewReleases() {
  const [games, setGames] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchNewReleases = async () => {
      try {
        setLoading(true);
        setError(null);
        
        // 1. Calculate the date 7 days ago
        const sevenDaysAgo = new Date();
        sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
        const timestampSevenDaysAgo = Timestamp.fromDate(sevenDaysAgo);

        // 2. Query the 'games' collection
        const gamesCollection = collection(db, 'games');
        const q = query(
          gamesCollection,
          // 3. Where 'createdAt' is newer than 7 days ago
          where('createdAt', '>=', timestampSevenDaysAgo),
          // 4. Order by 'createdAt' to show newest first
          orderBy('createdAt', 'desc')
        ); 
        
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

    fetchNewReleases();
  }, []);

  return { games, loading, error };
}

export default useNewReleases;