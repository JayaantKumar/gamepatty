import * as React from "react";
import {
  List, Datagrid, TextField, UrlField, DateField,
  Edit, Create, SimpleForm, TextInput, DateInput,
  ArrayInput, SimpleFormIterator, ImageInput, ImageField,
} from 'react-admin';
// 1. Remove the serverTimestamp import, we don't need it here.
// import { serverTimestamp } from 'firebase/firestore'; 

export const GameList = () => (
  <List sort={{ field: 'createdAt', order: 'DESC' }}>
    <Datagrid rowClick="edit">
      <ImageField source="imageUrl" title="title" label="Cover" />
      <TextField source="title" />
      <TextField source="slug" />
      <DateField source="createdAt" label="Created On" />
    </Datagrid>
  </List>
);

// Shared Form for Creating and Editing
const GameForm = () => (
  <SimpleForm>
    <TextInput source="title" fullWidth />
    <TextInput source="slug" fullWidth />
    <TextInput source="description" multiline fullWidth />
    
    <DateInput source="releasedAt" label="Release Date" />
    
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
    {/* 2. THE FIX: 
      Change 'serverTimestamp()' to 'new Date()' 
    */}
    <SimpleForm defaultValues={{ 
      createdAt: new Date(), // <-- THIS IS THE FIX
      androidUrl: null,
      iosUrl: null,
      liveDemoUrl: null
    }}>
      <TextInput source="title" fullWidth />
      <TextInput source="slug" fullWidth />
      <TextInput source="description" multiline fullWidth />
      
      <DateInput source="releasedAt" label="Release Date" />
      
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