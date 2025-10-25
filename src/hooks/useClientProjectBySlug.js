import { useState, useEffect } from 'react';
import { db } from '../firebase';
import { collection, query, where, getDocs, limit } from 'firebase/firestore';

function useClientProjectBySlug(slug) {
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!slug) {
      setLoading(false);
      return; // Don't run if there's no slug
    }

    const fetchProject = async () => {
      try {
        setLoading(true);
        setError(null);
        
        // Query the 'clientProjects' collection
        const projectsCollection = collection(db, 'clientProjects');
        const q = query(projectsCollection, where('slug', '==', slug), limit(1));
        const querySnapshot = await getDocs(q);
        
        if (querySnapshot.empty) {
          setError('Client project not found.');
          setProject(null);
        } else {
          const projectDoc = querySnapshot.docs[0];
          setProject({ id: projectDoc.id, ...projectDoc.data() });
        }
        
      } catch (err) {
        console.error("Error fetching client project: ", err);
        setError('Failed to fetch client project data.');
      } finally {
        setLoading(false);
      }
    };

    fetchProject();
  }, [slug]); // Rerun this hook if the slug changes

  return { project, loading, error };
}

export default useClientProjectBySlug;