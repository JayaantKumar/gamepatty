import * as React from "react";
import {
  List, Datagrid, TextField, UrlField, DateField,
  Edit, Create, SimpleForm, TextInput, DateInput,
  ArrayInput, SimpleFormIterator, ImageInput, ImageField,
  SelectInput // 1. Added SelectInput
} from 'react-admin';
import { serverTimestamp } from 'firebase/firestore'; 

export const ClientProjectList = () => (
  // 2. Changed list to match Games.jsx (sort by createdAt)
  <List sort={{ field: 'createdAt', order: 'DESC' }}>
    <Datagrid rowClick="edit">
      <ImageField source="imageUrl" title="title" label="Cover" />
      <TextField source="title" />
      <TextField source="slug" />
      <DateField source="createdAt" label="Created On" />
    </Datagrid>
  </List>
);

// 3. This form is now a copy of your Games form
const ClientProjectForm = () => (
  <SimpleForm>
    <TextInput source="title" fullWidth />
    <TextInput source="slug" fullWidth />
    <TextInput source="description" multiline fullWidth />
    
    <DateInput source="releasedAt" label="Release Date" />
    
    {/* 4. Added displaySize field back in */}
    <SelectInput source="displaySize" choices={[
      { id: 'landscape', name: 'Landscape (16:9)' },
      { id: 'portrait', name: 'Portrait (9:16)' },
    ]} helperText="How this image should appear in the masonry layout."/>
    
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

export const ClientProjectEdit = () => (
  <Edit>
    <ClientProjectForm />
  </Edit>
);

export const ClientProjectCreate = () => (
  <Create>
    {/* 5. Added all the same defaultValues as your Games collection */}
    <SimpleForm defaultValues={{ 
      createdAt: new Date(),
      androidUrl: null,
      iosUrl: null,
      liveDemoUrl: null,
      displaySize: 'landscape' // Default to landscape
    }}>
      <TextInput source="title" fullWidth />
      <TextInput source="slug" fullWidth />
      <TextInput source="description" multiline fullWidth />
      
      <DateInput source="releasedAt" label="Release Date" />

      <SelectInput source="displaySize" choices={[
        { id: 'landscape', name: 'Landscape (16:9)' },
        { id: 'portrait', name: 'Portrait (9:16)' },
      ]} helperText="How this image should appear in the masonry layout."/>
      
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