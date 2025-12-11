import { useState, useEffect } from 'react';
import { db } from '../firebase';
import { collection, getDocs, query, orderBy, doc, getDoc } from 'firebase/firestore';

function useGames() {
  const [games, setGames] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        // 1. Fetch the Limit from Site Settings
        const settingsRef = doc(db, 'config', 'siteSettings');
        const settingsSnap = await getDoc(settingsRef);
        // Default to 10 if setting is not found
        const limitCount = settingsSnap.exists() && settingsSnap.data().ourGamesLimit 
          ? settingsSnap.data().ourGamesLimit 
          : 10; 

        // 2. Fetch All Games
        const gamesRef = collection(db, 'games');
        const q = query(gamesRef, orderBy('createdAt', 'desc'));
        const querySnapshot = await getDocs(q);

        const gamesList = querySnapshot.docs
          .map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }))
          // 3. Filter Hidden Games
          .filter((game) => game.isVisible !== false)
          // 4. Apply the Limit
          .slice(0, limitCount);

        setGames(gamesList);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching games:", err);
        setError("Failed to load games.");
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return { games, loading, error };
}

export default useGames;