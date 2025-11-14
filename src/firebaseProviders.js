import { firebaseConfig } from './firebase';
// 1. Import from 'react-admin-firebase', the library that IS installed
import * as ReactAdminFirebase from 'react-admin-firebase';

const options = {
  logging: true,
  rootRef: '', 
  dontAddId: true, 
};

// 2. Safely extract the providers from the new library
const FirebaseDataProvider = 
  ReactAdminFirebase.default?.FirebaseDataProvider || 
  ReactAdminFirebase.FirebaseDataProvider;

const FirebaseAuthProvider = 
  ReactAdminFirebase.default?.FirebaseAuthProvider || 
  ReactAdminFirebase.FirebaseAuthProvider;

// 3. Export the initialized providers
export const dataProvider = FirebaseDataProvider(firebaseConfig, options);
export const authProvider = FirebaseAuthProvider(firebaseConfig, options);

// 4. Export 'undefined' for storageProvider, as this library handles it automatically
export const storageProvider = undefined;