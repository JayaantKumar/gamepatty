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
        
        // Get today's date
        const now = new Date();
        const timestampNow = Timestamp.fromDate(now);

        const gamesCollection = collection(db, 'games');
        
        // LOGIC: Show games where 'newReleaseUntil' is in the FUTURE (greater than Now)
        const q = query(
          gamesCollection,
          where('newReleaseUntil', '>=', timestampNow),
          orderBy('newReleaseUntil', 'asc') // Show games expiring soonest first (or swap to 'desc')
        ); 
        
        const querySnapshot = await getDocs(q);
        
        const gamesList = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
        }));
        
        setGames(gamesList);
      } catch (err) {
        console.error("Error fetching new releases: ", err);
        setError('Failed to fetch new releases. (Check console for Index URL)');
      } finally {
        setLoading(false);
      }
    };

    fetchNewReleases();
  }, []);

  return { games, loading, error };
}

export default useNewReleases;