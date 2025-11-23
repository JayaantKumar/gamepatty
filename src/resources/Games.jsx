import * as React from "react";
import {
  List, Datagrid, TextField, UrlField, DateField,
  Edit, Create, SimpleForm, TextInput, DateInput,
  ArrayInput, SimpleFormIterator, ImageInput, ImageField,
} from 'react-admin';

// Helper to get a date 3 months in the future
const getDefaultExpiryDate = () => {
  const date = new Date();
  date.setMonth(date.getMonth() + 3); // Add 3 months
  return date;
};

export const GameList = () => (
  <List sort={{ field: 'createdAt', order: 'DESC' }}>
    <Datagrid rowClick="edit">
      <ImageField source="imageUrl" title="title" label="Cover" />
      <TextField source="title" />
      <TextField source="slug" />
      {/* Show the expiry date in the list so client can check easily */}
      <DateField source="newReleaseUntil" label="New Release Until" />
      <DateField source="createdAt" label="Created On" />
    </Datagrid>
  </List>
);

const GameForm = () => (
  <SimpleForm>
    <TextInput source="title" fullWidth />
    <TextInput source="slug" fullWidth />
    <TextInput source="description" multiline fullWidth />
    
    <div style={{ display: 'flex', gap: '20px' }}>
        <DateInput source="releasedAt" label="Original Release Date" />
        {/* THIS IS THE NEW CONTROL FIELD */}
        <DateInput 
            source="newReleaseUntil" 
            label="Show in 'New Releases' Until" 
            helperText="The game will stay in the 'New Releases' section until this date."
            // ADDED: This ensures it saves as a Date/Timestamp, not a string
            parse={(date) => new Date(date)}
        />
    </div>
    
    <ImageInput source="imageUrl" label="Main Cover Image (Upload)">
      <ImageField source="src" title="title" />
    </ImageInput>
    
    <TextInput source="youtubeUrl" label="YouTube URL" fullWidth />
    <TextInput source="liveDemoUrl" label="Live Demo URL" fullWidth />
    <TextInput source="androidUrl" label="Android Play Store URL" fullWidth />
    <TextInput source="iosUrl" label="Apple App Store URL" fullWidth />

    <ArrayInput source="tags">
      <SimpleFormIterator>
        <TextInput source="" label="Tag" />
      </SimpleFormIterator>
    </ArrayInput>
    
    <ArrayInput source="galleryImages">
      <SimpleFormIterator>
        <ImageInput source="src" label="Upload Gallery Image">
           <ImageField source="src" title="title" />
        </ImageInput>
      </SimpleFormIterator>
    </ArrayInput>
  </SimpleForm>
);

export const GameEdit = () => (
  <Edit>
    <GameForm />
  </Edit>
);

export const GameCreate = () => (
  <Create>
    <SimpleForm defaultValues={{ 
      createdAt: new Date(),
      newReleaseUntil: getDefaultExpiryDate(), // Defaults to 3 months from now
      androidUrl: null,
      iosUrl: null,
      liveDemoUrl: null
    }}>
      <TextInput source="title" fullWidth />
      <TextInput source="slug" fullWidth />
      <TextInput source="description" multiline fullWidth />
      
      <div style={{ display: 'flex', gap: '20px' }}>
        <DateInput source="releasedAt" label="Release Date" />
        {/* NEW FIELD */}
        <DateInput 
            source="newReleaseUntil" 
            label="Show in 'New Releases' Until" 
            helperText="Defaults to 3 months, but you can change it."
            // ADDED: This ensures it saves as a Date/Timestamp, not a string
            parse={(date) => new Date(date)}
        />
      </div>
      
      <ImageInput source="imageUrl" label="Main Cover Image (Upload)">
        <ImageField source="src" title="title" />
      </ImageInput>
      
      <TextInput source="youtubeUrl" label="YouTube URL" fullWidth />
      <TextInput source="liveDemoUrl" label="Live Demo URL" fullWidth />
      <TextInput source="androidUrl" label="Android Play Store URL" fullWidth />
      <TextInput source="iosUrl" label="Apple App Store URL" fullWidth />

      <ArrayInput source="tags">
        <SimpleFormIterator>
          <TextInput source="" label="Tag" />
        </SimpleFormIterator>
      </ArrayInput>
      
      <ArrayInput source="galleryImages">
        <SimpleFormIterator>
          <ImageInput source="src" label="Upload Gallery Image">
             <ImageField source="src" title="title" />
          </ImageInput>
        </SimpleFormIterator>
      </ArrayInput>
    </SimpleForm>
  </Create>
);