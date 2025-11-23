import React, { useEffect } from 'react';
import { Admin, Resource } from "react-admin";
import { dataProvider, authProvider } from "./firebaseProviders"; 

// Resources
import { GameList, GameEdit, GameCreate } from "./resources/Games";
import { ClientProjectList, ClientProjectEdit, ClientProjectCreate } from "./resources/ClientProjects";
import { ConfigEdit, ConfigList } from "./resources/Config"; 

// Icons
import GameIcon from '@mui/icons-material/SportsEsports';
import ClientIcon from '@mui/icons-material/BusinessCenter';
import SettingsIcon from '@mui/icons-material/Settings'; 

function AdminApp() {
  
  // Fix: Reset body background color when Admin Panel loads
  useEffect(() => {
    document.body.style.backgroundColor = '#fafafa'; // Standard Material UI light gray
    document.body.style.backgroundImage = 'none';    // Remove the game gradient
    document.body.style.color = '#000000';           // Reset text color
    
    // Cleanup: When leaving admin, remove these overrides (optional)
    return () => {
      document.body.style.backgroundColor = '';
      document.body.style.backgroundImage = '';
      document.body.style.color = '';
    };
  }, []);

  return (
    <Admin
      // === THE FIX: REMOVED basename="/admin" ===
      // This switches to HashRouter (e.g. /admin/#/games)
      // which prevents conflicts with your main site.
      dataProvider={dataProvider}
      authProvider={authProvider}
    >
      <Resource
        name="config"
        icon={SettingsIcon}
        list={ConfigList}
        edit={ConfigEdit}
        options={{ label: 'Site Settings' }}
      />
      
      <Resource
        name="games"
        icon={GameIcon}
        list={GameList}
        edit={GameEdit}
        create={GameCreate}
      />
      
      <Resource
        name="clientProjects"
        icon={ClientIcon}
        list={ClientProjectList}
        edit={ClientProjectEdit}
        create={ClientProjectCreate}
        options={{ label: 'Client Projects' }}
      />
    </Admin>
  );
}

export default AdminApp;