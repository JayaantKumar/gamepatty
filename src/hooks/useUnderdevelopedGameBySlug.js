import { useState, useEffect } from 'react';
import { db } from '../firebase';
import { collection, query, where, getDocs, limit } from 'firebase/firestore';

function useUnderdevelopedGameBySlug(slug) {
  const [game, setGame] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!slug) {
      setLoading(false);
      return;
    }

    const fetchGame = async () => {
      try {
        setLoading(true);
        setError(null);
        
        const gamesCollection = collection(db, 'underdevelopedGames');
        const q = query(gamesCollection, where('slug', '==', slug), limit(1));
        const querySnapshot = await getDocs(q);
        
        if (querySnapshot.empty) {
          setError('Game not found.');
          setGame(null);
        } else {
          const gameDoc = querySnapshot.docs[0];
          setGame({ id: gameDoc.id, ...gameDoc.data() });
        }
        
      } catch (err) {
        console.error("Error fetching game: ", err);
        setError('Failed to fetch game data.');
      } finally {
        setLoading(false);
      }
    };

    fetchGame();
  }, [slug]);

  return { game, loading, error };
}

export default useUnderdevelopedGameBySlug;