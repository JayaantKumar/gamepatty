import * as React from "react";
import {
  Edit,
  SimpleForm,
  NumberInput,
  Toolbar,
  SaveButton,
  useNotify,
  useRedirect
} from 'react-admin';
import { Navigate } from "react-router-dom"; // Import Navigate

// Custom toolbar
const SettingsToolbar = () => (
    <Toolbar>
        <SaveButton alwaysEnable />
    </Toolbar>
);

const SettingsTitle = () => 'Site Settings';

// === 1. ADD THIS NEW COMPONENT ===
// This is a fake "List" that just redirects to the Edit page
export const ConfigList = () => {
    return <Navigate to="/config/siteSettings" replace />;
};
// =================================

export const ConfigEdit = () => {
  const notify = useNotify();
  const redirect = useRedirect();

  const onSuccess = () => {
      notify('Settings saved successfully!');
      redirect(false); 
  };

  return (
    <Edit
      id="siteSettings"
      resource="config"
      title={<SettingsTitle />}
      mutationOptions={{ onSuccess }}
      redirect={false}
    >
      <SimpleForm toolbar={<SettingsToolbar />}>
        <NumberInput
          source="newReleaseLimit"
          label="New Release Game Limit"
          helperText="How many games to show in 'New Releases' (e.g., 3)"
          min={1}
          max={20}
        />
        <NumberInput
          source="newReleaseDays"
          label="New Release Duration (in days)"
          helperText="How long a game is considered 'new' (e.g., 90 days)"
        />
      </SimpleForm>
    </Edit>
  );
};