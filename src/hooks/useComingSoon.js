import { useState, useEffect } from 'react';
import { db } from '../firebase';
import { collection, getDocs, query, where, orderBy } from 'firebase/firestore';

function useComingSoon() {
  const [games, setGames] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchGames = async () => {
      try {
        setLoading(true);
        setError(null);
        
        // This query finds games in the 'games' collection where
        // all three link fields are set to 'null'.
        const gamesCollection = collection(db, 'games');
        const q = query(
          gamesCollection,
          where('androidUrl', '==', null),
          where('iosUrl', '==', null),
          where('liveDemoUrl', '==', null),
          orderBy('releasedAt', 'asc') // Order by release date
        ); 
        
        const querySnapshot = await getDocs(q);
        
        const gamesList = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
        }));
        
        setGames(gamesList);
      } catch (err) {
        console.error("Error fetching coming soon games: ", err);
        setError('Failed to fetch coming soon games. Check Firestore indexes.');
      } finally {
        setLoading(false);
      }
    };

    fetchGames();
  }, []);

  return { games, loading, error };
}

export default useComingSoon;