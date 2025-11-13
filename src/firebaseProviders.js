import { 
  FirebaseDataProvider, 
  FirebaseAuthProvider 
} from 'react-admin-firebase';
import { firebaseConfig } from './firebase';

// Options for the provider
const options = {
  logging: true,
  // This tells it to use the 'games', 'clientProjects', etc. collections
  rootRef: '', 
  // Enable file upload handling automatically
  dontAddId: true, 
};

// Create the providers using your config
export const dataProvider = FirebaseDataProvider(firebaseConfig, options);
export const authProvider = FirebaseAuthProvider(firebaseConfig, options);

// Note: 'react-admin-firebase' handles storage automatically inside dataProvider,
// so we don't need a separate storageProvider export for the <Admin> component.
export const storageProvider = undefined;