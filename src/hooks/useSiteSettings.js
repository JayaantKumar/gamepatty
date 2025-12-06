import { useState, useEffect } from 'react';
import { db } from '../firebase';
// 1. Import onSnapshot instead of getDoc
import { doc, onSnapshot } from 'firebase/firestore';

function useSiteSettings() {
  const [settings, setSettings] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    
    // Reference to the specific document
    const docRef = doc(db, 'config', 'siteSettings');

    // 2. Open a Real-Time Subscription
    const unsubscribe = onSnapshot(docRef, (docSnap) => {
      if (docSnap.exists()) {
        setSettings(docSnap.data());
      } else {
        // Fallback defaults if document is missing
        setSettings({
          contactEmail: 'hello@gamepatty.com',
          contactAddress1: '123 Gaming Street',
          contactAddress2: 'Metropolis, 10001',
        });
      }
      setLoading(false);
    }, (error) => {
      console.error("Error listening to site settings:", error);
      setLoading(false);
    });

    // 3. Cleanup function (stops listening when you leave the site)
    return () => unsubscribe();
  }, []);

  return { settings, loading };
}

export default useSiteSettings;