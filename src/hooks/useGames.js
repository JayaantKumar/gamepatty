import { useState, useEffect } from 'react';
import { db } from '../firebase';
import { collection, getDocs, query, orderBy } from 'firebase/firestore';

function useGames() {
  const [games, setGames] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchGames = async () => {
      try {
        const gamesRef = collection(db, 'games');
        // We fetch ALL games first (sorted by date)
        const q = query(gamesRef, orderBy('createdAt', 'desc'));
        const querySnapshot = await getDocs(q);

        const gamesList = querySnapshot.docs
          .map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }))
          // === THE FILTER LOGIC ===
          .filter((game) => {
            // If isVisible is explicitly FALSE, hide it.
            // If it's TRUE or UNDEFINED (old games), show it.
            return game.isVisible !== false;
          });
          // ========================

        setGames(gamesList);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching games:", err);
        setError("Failed to load games.");
        setLoading(false);
      }
    };

    fetchGames();
  }, []);

  return { games, loading, error };
}

export default useGames;