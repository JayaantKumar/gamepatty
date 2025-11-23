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

// Custom toolbar with only a Save button
const SettingsToolbar = () => (
    <Toolbar>
        <SaveButton alwaysEnable />
    </Toolbar>
);

// Custom title for the page
const SettingsTitle = () => 'Site Settings';

export const ConfigEdit = () => {
  const notify = useNotify();
  const redirect = useRedirect();

  // Custom save function to show a notification
  const onSuccess = () => {
      notify('Settings saved successfully!');
      redirect(false); // Go back to the main dashboard
  };

  return (
    // It edits the 'siteSettings' document in the 'config' collection
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
          helperText="How many games to show in 'New Releases' (e.Lg., 3)"
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