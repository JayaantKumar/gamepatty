import { useState, useEffect } from 'react';
import { db } from '../firebase';
import { collection, getDocs, query } from 'firebase/firestore';

function useUnderdevelopedGames() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        setLoading(true);
        setError(null);
        
        const projectsCollection = collection(db, 'underdevelopedGames');
        const q = query(projectsCollection);
        const querySnapshot = await getDocs(q);
        
        const projectsList = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
        }));
        
        setProjects(projectsList);
      } catch (err) {
        console.error("Error fetching underdeveloped games: ", err);
        setError('Failed to fetch underdeveloped games.');
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  return { projects, loading, error };
}

export default useUnderdevelopedGames;