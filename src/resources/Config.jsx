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
// 1. Import Navigate
import { Navigate } from "react-router-dom"; 

const SettingsToolbar = () => (
    <Toolbar>
        <SaveButton alwaysEnable />
    </Toolbar>
);

const SettingsTitle = () => 'Site Settings';

// === 2. THIS IS THE MISSING EXPORT ===
// This component redirects the "List" view directly to the "Edit" view.
// Without this, AdminApp.jsx crashes because it can't find 'ConfigList'.
export const ConfigList = () => {
    return <Navigate to="/config/siteSettings" replace />;
};
// =====================================

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
          label="New Releases Count"
          helperText="How many of the most recent games to display (e.g., 3 or 5)."
          min={1}
          max={20}
        />
        {/* We removed the duration input as you requested earlier */}
      </SimpleForm>
    </Edit>
  );
};