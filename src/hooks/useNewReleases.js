import { useState, useEffect } from 'react';
import { db } from '../firebase';
import { 
  collection, getDocs, query, orderBy, limit,
  doc, getDoc 
} from 'firebase/firestore';

const DEFAULT_LIMIT = 3;

function useNewReleases() {
  const [games, setGames] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchSettingsAndGames = async () => {
      try {
        setLoading(true);
        setError(null);
        
        // --- Step 1: Fetch the Limit from Site Settings ---
        let gameLimit = DEFAULT_LIMIT;

        try {
          const settingsRef = doc(db, 'config', 'siteSettings');
          const settingsSnap = await getDoc(settingsRef);

          if (settingsSnap.exists()) {
            const settings = settingsSnap.data();
            // Get the number the admin set (or default to 3)
            gameLimit = settings.newReleaseLimit || DEFAULT_LIMIT;
          }
        } catch (settingsError) {
          console.error("Could not fetch settings, using default limit.", settingsError);
        }

        // --- Step 2: Fetch the Most Recent Games ---
        const gamesCollection = collection(db, 'games');
        
        // LOGIC: Get All Games, Sort by Newest, Take Top X
        const q = query(
          gamesCollection,
          orderBy('createdAt', 'desc'), // Newest created games first
          limit(gameLimit) // Cut off at the admin's number
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

    fetchSettingsAndGames();
  }, []);

  return { games, loading, error };
}

export default useNewReleases;