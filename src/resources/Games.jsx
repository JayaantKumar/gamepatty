import * as React from "react";
import { useEffect } from "react";
import { useWatch, useFormContext } from "react-hook-form";

import {
  List, Datagrid, TextField, UrlField, DateField,
  Edit, Create, SimpleForm, TextInput, DateInput,
  ArrayInput, SimpleFormIterator, ImageInput, ImageField,
  CloneButton // 1. Import CloneButton
} from 'react-admin';

// Helper to get a date 3 months in the future
const getDefaultExpiryDate = () => {
  const date = new Date();
  date.setMonth(date.getMonth() + 3);
  return date;
};

// -----------------------------
// Game list
// -----------------------------
export const GameList = () => (
  <List sort={{ field: 'createdAt', order: 'DESC' }}>
    {/* We keep rowClick="edit", but the CloneButton will 
       override the click when specifically clicked.
    */}
    <Datagrid rowClick="edit">
      <ImageField source="imageUrl.src" title="title" label="Cover" />
      <TextField source="title" />
      <TextField source="slug" />
      <DateField source="newReleaseUntil" label="New Release Until" />
      <DateField source="createdAt" label="Created On" />
      
      {/* 2. Add the Duplicate Button here */}
      <CloneButton /> 
    </Datagrid>
  </List>
);

// -----------------------------
// Shared Game form (used by Edit/Create if you prefer)
// -----------------------------
const GameForm = () => (
  <SimpleForm>
    <TextInput source="title" fullWidth />
    <TextInput 
      source="slug" 
      fullWidth 
      helperText="IMPORTANT: You must change the slug when duplicating, or the URLs will conflict!" 
    />
    <TextInput source="description" multiline fullWidth />
    
    <div style={{ display: 'flex', gap: '20px' }}>
      <DateInput source="releasedAt" label="Original Release Date" />
      <DateInput 
        source="newReleaseUntil" 
        label="Show in 'New Releases' Until" 
        helperText="The game will stay in the 'New Releases' section until this date."
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

// -----------------------------
// Edit
// -----------------------------
export const GameEdit = () => (
  <Edit>
    <GameForm />
  </Edit>
);

// -----------------------------
// Slug auto-updater component
// -----------------------------
const SlugUpdater = () => {
  const { setValue } = useFormContext();
  const title = useWatch({ name: 'title' });

  useEffect(() => {
    if (!title) return;

    const slug = title
      .toString()
      .toLowerCase()
      .normalize('NFKD') // normalize accents
      .replace(/[\u0300-\u036f]/g, '') // remove accent marks
      .replace(/[^a-z0-9\s-]/g, '') // remove invalid chars
      .trim()
      .replace(/\s+/g, '-') // spaces -> hyphens
      .replace(/-+/g, '-'); // collapse multiple hyphens

    setValue('slug', slug);
  }, [title, setValue]);

  return null;
};

// -----------------------------
// Create (with SlugUpdater)
// -----------------------------
export const GameCreate = () => (
  <Create>
    <SimpleForm defaultValues={{ 
      createdAt: new Date(),
      newReleaseUntil: getDefaultExpiryDate(),
      androidUrl: null,
      iosUrl: null,
      liveDemoUrl: null
    }}>
      {/* Slug auto-generation — watches title and writes slug */}
      <SlugUpdater />

      <TextInput source="title" fullWidth />
      <TextInput 
        source="slug" 
        fullWidth 
        helperText="Auto-generated from title. You can edit this manually if needed."
      />
      
      <TextInput source="description" multiline fullWidth />
      
      <div style={{ display: 'flex', gap: '20px' }}>
        <DateInput source="releasedAt" label="Release Date" />
        <DateInput 
            source="newReleaseUntil" 
            label="Show in 'New Releases' Until" 
            helperText="Defaults to 3 months, but you can change it."
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
