import { Admin, Resource } from "react-admin";
import { dataProvider, authProvider, storageProvider } from "./firebaseProviders";

// Import all your resource components
import { GameList, GameEdit, GameCreate } from "./resources/Games";
import { ClientProjectList, ClientProjectEdit, ClientProjectCreate } from "./resources/ClientProjects";
import { UnderdevelopedGameList, UnderdevelopedGameEdit, UnderdevelopedGameCreate } from "./resources/UnderdevelopedGames";
import { ConfigEdit } from "./resources/Config"; // For Site Settings

// Import icons for the menu
import GameIcon from '@mui/icons-material/SportsEsports';
import ClientIcon from '@mui/icons-material/BusinessCenter';
import DevIcon from '@mui/icons-material/Build';
import SettingsIcon from '@mui/icons-material/Settings';

function AdminApp() {
  return (
    <Admin
      dataProvider={dataProvider}
      authProvider={authProvider}
      storageProvider={storageProvider}
    >
      {/* Settings Page (no list) */}
      <Resource
        name="config"
        icon={SettingsIcon}
        edit={ConfigEdit}
        options={{ label: 'Site Settings' }}
      />
      
      {/* Main Games Collection */}
      <Resource
        name="games"
        icon={GameIcon}
        list={GameList}
        edit={GameEdit}
        create={GameCreate}
      />
      
      {/* Hidden Client Portal Games */}
      <Resource
        name="underdevelopedGames"
        icon={DevIcon}
        list={UnderdevelopedGameList}
        edit={UnderdevelopedGameEdit}
        create={UnderdevelopedGameCreate}
        options={{ label: 'Under Development' }}
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