import * as React from "react";
import {
  List, Datagrid, TextField, UrlField, DateField,
  Edit, Create, SimpleForm, TextInput, DateInput,
  ArrayInput, SimpleFormIterator, ImageInput, ImageField,
} from 'react-admin';

export const UnderdevelopedGameList = () => (
  <List>
    <Datagrid rowClick="edit">
      <ImageField source="imageUrl" title="title" label="Cover" />
      <TextField source="title" />
      <TextField source="slug" />
      <UrlField source="liveDemoUrl" />
    </Datagrid>
  </List>
);

// This is the shared Form component (identical to the 'games' form)
const UnderdevelopedGameForm = () => (
  <SimpleForm>
    <TextInput source="title" fullWidth />
    <TextInput source="slug" fullWidth />
    <TextInput source="description" multiline fullWidth />
    
    <DateInput source="releasedAt" label="Projected Release" />
    
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

export const UnderdevelopedGameEdit = () => (
  <Edit>
    <UnderdevelopedGameForm />
  </Edit>
);

export const UnderdevelopedGameCreate = () => (
  <Create>
    <UnderdevelopedGameForm />
  </Create>
);