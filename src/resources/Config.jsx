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
} from "react-admin";
import { Navigate } from "react-router-dom";

const SettingsToolbar = () => (
  <Toolbar>
    <SaveButton alwaysEnable />
  </Toolbar>
);

const SettingsTitle = () => "Site Settings";

export const ConfigList = () => {
  return <Navigate to="/config/siteSettings" replace />;
};

export const ConfigEdit = () => {
  const notify = useNotify();
  const redirect = useRedirect();

  const onSuccess = () => {
    notify("Settings saved successfully!");
    redirect(false);
  };

  return (
    <Edit
      id="siteSettings"
      resource="config"
      title={<SettingsTitle />}
      mutationOptions={{ onSuccess }}
      redirect={false}
      mutationMode="pessimistic"
    >
      <SimpleForm toolbar={<SettingsToolbar />}>

        {/* General Site Info */}
        <h3 className="text-xl font-bold mt-4 mb-2">General Site Info</h3>
        <TextInput 
          source="siteTagline" 
          label="Footer Tagline" 
          fullWidth 
          helperText="The short text that appears below the logo in the footer."
        />

        {/* === UPDATED GAME AUTOMATION SECTION === */}
        <h3 className="text-xl font-bold mt-6 mb-2">Homepage Display Limits</h3>
        <div style={{ display: 'flex', gap: '20px' }}>

          <NumberInput
            source="newReleaseLimit"
            label="New Releases Count"
            helperText="Max games to show in 'New Releases'."
            min={1}
            max={20}
          />

          {/* === NEW FIELD === */}
          <NumberInput
            source="ourGamesLimit"
            label="Our Games Count"
            helperText="Max games to show in 'Our Games'."
            min={1}
            max={50}
          />
          {/* ================= */}
        </div>

        {/* Contact Info Section */}
        <h3 className="text-xl font-bold mt-6 mb-2">Contact Information</h3>
        <TextInput source="contactEmail" label="Contact Email" fullWidth />
        <TextInput source="contactPhone" label="Phone Number" fullWidth />
        <TextInput source="contactAddress1" label="Address Line 1" fullWidth />
        <TextInput source="contactAddress2" label="Address Line 2" fullWidth />

        {/* Social Media Section */}
        <h3 className="text-xl font-bold mt-6 mb-2">Social Media Links</h3>
        <TextInput source="socialDiscord" label="Discord URL" fullWidth />
        <TextInput source="socialInstagram" label="Instagram URL" fullWidth />
        <TextInput source="socialLinkedin" label="LinkedIn URL" fullWidth />
        <TextInput source="socialTwitter" label="X (Twitter) URL" fullWidth />
        <TextInput source="socialYoutube" label="YouTube URL" fullWidth />

      </SimpleForm>
    </Edit>
  );
};
