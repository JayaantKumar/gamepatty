import { useState, useEffect } from 'react';
import { db } from '../firebase';
import { collection, getDocs, query, orderBy } from 'firebase/firestore';

function useClientProjects() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        setLoading(true);
        setError(null);
        
        const projectsCollection = collection(db, 'clientProjects');
        const q = query(projectsCollection); // You can add orderBy('title', 'asc') if you want
        const querySnapshot = await getDocs(q);
        
        const projectsList = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
        }));
        
        setProjects(projectsList);
      } catch (err) {
        console.error("Error fetching client projects: ", err);
        setError('Failed to fetch client projects.');
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  return { projects, loading, error };
}

export default useClientProjects;