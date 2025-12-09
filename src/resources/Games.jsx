import * as React from "react";
import { useWatch, useFormContext } from 'react-hook-form';
import { useEffect } from 'react';
import {
  List, Datagrid, TextField, DateField,
  Edit, Create, SimpleForm, TextInput, DateInput,
  ArrayInput, SimpleFormIterator, ImageInput, ImageField,
  CloneButton,
  BooleanInput, // <-- added
} from 'react-admin';

const SlugUpdater = () => {
    const { setValue } = useFormContext();
    const title = useWatch({ name: 'title' });

    useEffect(() => {
        if (title) {
            const slug = title
                .toLowerCase()
                .replace(/[^a-z0-9\s-]/g, '')
                .trim()
                .replace(/\s+/g, '-');
            
            setValue('slug', slug);
        }
    }, [title, setValue]);

    return null;
};

export const GameList = () => (
  <List sort={{ field: 'createdAt', order: 'DESC' }}>
    <Datagrid rowClick="edit">
      <ImageField source="imageUrl.src" title="title" label="Cover" />
      <TextField source="title" />
      <TextField source="slug" />
      <DateField source="newReleaseUntil" label="New Release Until" />
      <DateField source="createdAt" label="Created On" />
      <CloneButton /> 
    </Datagrid>
  </List>
);

const GameForm = () => (
  <SimpleForm>
    {/* === NEW VISIBILITY TOGGLE === */}
    <BooleanInput 
      source="isVisible" 
      label="Show in 'Our Games' Section?" 
      defaultValue={true}
      helperText="If disabled, this game will be hidden from the website but saved in the database."
    />
    {/* ============================= */}

    <TextInput source="title" fullWidth />
    <TextInput 
      source="slug" 
      fullWidth 
      helperText="IMPORTANT: Change the slug if duplicating!" 
    />

    {/* ================= SHORT SUMMARY ================= */}
    <TextInput 
      source="description"
      label="Short Summary (For Home Page Cards)"
      fullWidth
      multiline={false}
      helperText="This appears on the cards on the homepage. Keep it short."
    />

    {/* ================= LONG DESCRIPTION ================= */}
    <TextInput 
      source="longDescription"
      label="Full Detailed Description (Detail Page)"
      fullWidth
      multiline
      rows={10}
      helperText="This appears on the Game Detail Page. New lines are preserved."
    />
    {/* =================================================== */}

    <div style={{ display: 'flex', gap: '20px' }}>
        <DateInput source="releasedAt" label="Original Release Date" />
        <DateInput 
            source="newReleaseUntil" 
            label="Show in 'New Releases' Until" 
            parse={(date) => new Date(date)}
        />
    </div>
    
    {/* === NEW BANNER IMAGE FIELD === */}
    <ImageInput source="bannerUrl" label="Top Banner Image (Optional)">
      <ImageField source="src" title="title" />
    </ImageInput>
    <p style={{ margin: '-10px 0 20px', fontSize: '0.875rem', color: 'rgba(255, 255, 255, 0.7)' }}>
      Recommended aspect ratio: 21:9 (e.g., 2560x1080) for a cinematic look.
    </p>
    {/* ============================== */}

    <ImageInput source="imageUrl" label="Main Cover Image (Box Art)">
      <ImageField source="src" title="title" />
    </ImageInput>
    
    <TextInput source="youtubeUrl" label="YouTube URL" fullWidth />
    <TextInput source="liveDemoUrl" label="Live Demo URL" fullWidth />
    <TextInput source="androidUrl" label="Android Play Store URL" fullWidth />
    <TextInput source="iosUrl" label="Apple App Store URL" fullWidth />
    <TextInput source="steamUrl" label="Steam Store URL" fullWidth />

    <ArrayInput source="tags">
      <SimpleFormIterator>
        <TextInput 
          source="" 
          label="Tag" 
          parse={(value) => value ? value.toLowerCase() : ""}
        />
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
      androidUrl: null,
      iosUrl: null,
      liveDemoUrl: null,
      steamUrl: null,
      isVisible: true, // <--- Default new games to Visible
    }}>
      <SlugUpdater />

      {/* === NEW VISIBILITY TOGGLE === */}
      <BooleanInput 
        source="isVisible" 
        label="Show in 'Our Games' Section?" 
        defaultValue={true}
      />
      {/* ============================= */}

      <TextInput source="title" fullWidth />
      <TextInput 
        source="slug" 
        fullWidth 
        helperText="Auto-generated from title."
      />

      {/* ================= SHORT SUMMARY ================= */}
      <TextInput 
        source="description"
        label="Short Summary (For Home Page Cards)"
        fullWidth
        multiline={false}
        helperText="This appears on the cards on the homepage. Keep it short."
      />

      {/* ================= LONG DESCRIPTION ================= */}
      <TextInput 
        source="longDescription"
        label="Full Detailed Description (Detail Page)"
        fullWidth
        multiline
        rows={10}
        helperText="This appears on the Game Detail Page. New lines are preserved."
      />
      {/* =================================================== */}
      
      <div style={{ display: 'flex', gap: '20px' }}>
        <DateInput source="releasedAt" label="Release Date" />
        <DateInput 
            source="newReleaseUntil" 
            label="Show in 'New Releases' Until" 
            parse={(date) => new Date(date)}
        />
      </div>
      
      {/* === NEW BANNER IMAGE FIELD === */}
      <ImageInput source="bannerUrl" label="Top Banner Image (Optional)">
        <ImageField source="src" title="title" />
      </ImageInput>
      <p style={{ margin: '-10px 0 20px', fontSize: '0.875rem', color: 'rgba(255, 255, 255, 0.7)' }}>
        Recommended aspect ratio: 21:9 (e.g., 2560x1080) for a cinematic look.
      </p>
      {/* ============================== */}

      <ImageInput source="imageUrl" label="Main Cover Image (Box Art)">
        <ImageField source="src" title="title" />
      </ImageInput>
      
      <TextInput source="youtubeUrl" label="YouTube URL" fullWidth />
      <TextInput source="liveDemoUrl" label="Live Demo URL" fullWidth />
      <TextInput source="androidUrl" label="Android Play Store URL" fullWidth />
      <TextInput source="iosUrl" label="Apple App Store URL" fullWidth />
      <TextInput source="steamUrl" label="Steam Store URL" fullWidth />

      <ArrayInput source="tags">
        <SimpleFormIterator>
          <TextInput 
            source="" 
            label="Tag" 
            parse={(value) => value ? value.toLowerCase() : ""} 
          />
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
