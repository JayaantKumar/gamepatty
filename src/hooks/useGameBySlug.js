import { useState, useEffect } from 'react';
import { db } from '../firebase';
import { collection, query, where, getDocs, limit } from 'firebase/firestore';

function useGameBySlug(slug) {
  const [game, setGame] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!slug) {
      setLoading(false);
      return; // Don't run if there's no slug
    }

    const fetchGame = async () => {
      try {
        setLoading(true);
        setError(null);
        
        const gamesCollection = collection(db, 'games');
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
  }, [slug]); // Rerun this hook if the slug changes

  return { game, loading, error };
}

export default useGameBySlug;