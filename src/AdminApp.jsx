import { Admin, Resource } from "react-admin";
import { dataProvider, authProvider } from "./firebaseProviders"; 

// Import your resource components
import { GameList, GameEdit, GameCreate } from "./resources/Games";
import { ClientProjectList, ClientProjectEdit, ClientProjectCreate } from "./resources/ClientProjects";

// --- 1. YOU ARE MISSING THIS IMPORT ---
import { ConfigEdit } from "./resources/Config"; 

// Import icons for the menu
import GameIcon from '@mui/icons-material/SportsEsports';
import ClientIcon from '@mui/icons-material/BusinessCenter';

// --- 2. YOU ARE MISSING THIS IMPORT ---
import SettingsIcon from '@mui/icons-material/Settings'; 

function AdminApp() {
  return (
    <Admin
      dataProvider={dataProvider}
      authProvider={authProvider}
    >
      {/* --- 3. YOU ARE MISSING THIS ENTIRE RESOURCE BLOCK --- */}
      {/* This is the "Site Settings" page */}
      <Resource
        name="config"
        icon={SettingsIcon}
        edit={ConfigEdit}
        options={{ label: 'Site Settings' }}
      />
      {/* ---------------------------------------------------- */}
      
      {/* Main Games Collection */}
      <Resource
        name="games"
        icon={GameIcon}
        list={GameList}
        edit={GameEdit}
        create={GameCreate}
      />
      
      {/* Client Projects (Masonry) */}
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