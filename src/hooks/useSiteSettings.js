import { useState, useEffect } from 'react';
import { db } from '../firebase';
import { doc, getDoc } from 'firebase/firestore';

function useSiteSettings() {
  const [settings, setSettings] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        setLoading(true);
        const docRef = doc(db, 'config', 'siteSettings');
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          setSettings(docSnap.data());
        } else {
          // Default values if no settings exist yet
          setSettings({
            contactEmail: 'hello@gamepatty.com',
            contactAddress1: '123 Gaming Street',
            contactAddress2: 'Metropolis, 10001',
          });
        }
      } catch (err) {
        console.error("Error fetching site settings:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchSettings();
  }, []);

  return { settings, loading };
}

export default useSiteSettings;