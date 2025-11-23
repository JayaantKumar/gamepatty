// 1. Import 'storage' from your firebase file
import { firebaseConfig, storage } from './firebase';
import * as ReactAdminFirebase from 'react-admin-firebase';

const options = {
  logging: true,
  rootRef: '', 
  dontAddId: true,
  // 2. PASS THE STORAGE INSTANCE HERE
  // This tells the library exactly where to upload files.
  storage: storage, 
};

// 3. Safely extract the providers
const FirebaseDataProvider = 
  ReactAdminFirebase.default?.FirebaseDataProvider || 
  ReactAdminFirebase.FirebaseDataProvider;

const FirebaseAuthProvider = 
  ReactAdminFirebase.default?.FirebaseAuthProvider || 
  ReactAdminFirebase.FirebaseAuthProvider;

// 4. Export the initialized providers
export const dataProvider = FirebaseDataProvider(firebaseConfig, options);
export const authProvider = FirebaseAuthProvider(firebaseConfig, options);

export const storageProvider = undefined;