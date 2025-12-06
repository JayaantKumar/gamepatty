import * as React from "react";
import {
  Edit,
  SimpleForm,
  NumberInput,
  TextInput,
  Toolbar,
  SaveButton,
  useNotify,
  useRedirect
} from 'react-admin';
import { Navigate } from "react-router-dom"; 

const SettingsToolbar = () => (
    <Toolbar>
        <SaveButton alwaysEnable />
    </Toolbar>
);

const SettingsTitle = () => 'Site Settings';

export const ConfigList = () => {
    return <Navigate to="/config/siteSettings" replace />;
};

export const ConfigEdit = () => {
  const notify = useNotify();
  const redirect = useRedirect();

  const onSuccess = () => {
      notify('Settings saved successfully!');
      // Do NOT redirect. Stay on the page so you can see the changes.
      redirect(false); 
  };

  return (
    <Edit
      id="siteSettings"
      resource="config"
      title={<SettingsTitle />}
      mutationOptions={{ onSuccess }}
      redirect={false}
      // === ADD THIS LINE ===
      mutationMode="pessimistic"
      // =====================
    >
      <SimpleForm toolbar={<SettingsToolbar />}>
        {/* Game Logic Section */}
        <h3 className="text-xl font-bold mt-4 mb-2">Game Automation</h3>
        <NumberInput
          source="newReleaseLimit"
          label="New Releases Count"
          helperText="How many of the most recent games to display."
          min={1}
          max={20}
        />

        {/* Contact Info Section */}
        <h3 className="text-xl font-bold mt-6 mb-2">Contact Information</h3>
        <TextInput source="contactEmail" label="Contact Email" fullWidth />
        <TextInput source="contactPhone" label="Phone Number" fullWidth />
        <TextInput source="contactAddress1" label="Address Line 1" fullWidth />
        <TextInput source="contactAddress2" label="Address Line 2" fullWidth />

        {/* Social Media Section */}
        <h3 className="text-xl font-bold mt-6 mb-2">Social Media Links</h3>
        <p className="text-sm text-gray-500 mb-4">Leave a field empty to hide the icon.</p>
        
        <TextInput source="socialDiscord" label="Discord URL" fullWidth />
        <TextInput source="socialInstagram" label="Instagram URL" fullWidth />
        <TextInput source="socialLinkedin" label="LinkedIn URL" fullWidth />
        <TextInput source="socialTwitter" label="X (Twitter) URL" fullWidth />
        <TextInput source="socialYoutube" label="YouTube URL" fullWidth />
      </SimpleForm>
    </Edit>
  );
};