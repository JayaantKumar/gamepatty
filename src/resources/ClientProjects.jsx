import * as React from "react";
import { useEffect } from 'react';
import { useWatch, useFormContext } from 'react-hook-form';
import {
  List, Datagrid, TextField, DateField,
  Edit, Create, SimpleForm, TextInput, DateInput,
  ImageInput, ImageField, SelectInput, CloneButton,
  ArrayInput, SimpleFormIterator
} from 'react-admin';

// Slug Helper
const SlugUpdater = () => {
    const { setValue } = useFormContext();
    const title = useWatch({ name: 'title' });

    useEffect(() => {
        if (title) {
            const slug = title.toLowerCase().replace(/[^a-z0-9\s-]/g, '').trim().replace(/\s+/g, '-');
            setValue('slug', slug);
        }
    }, [title, setValue]);
    return null;
};

export const ClientProjectList = () => (
  <List sort={{ field: 'createdAt', order: 'DESC' }}>
    <Datagrid rowClick="edit">
      <ImageField source="imageUrl.src" title="title" label="Cover" />
      <TextField source="title" />
      <TextField source="slug" />
      <TextField source="displaySize" />
      <DateField source="createdAt" label="Created On" />
      <CloneButton />
    </Datagrid>
  </List>
);

// === SHARED FORM FIELDS (No SimpleForm Wrapper) ===
const ClientProjectFormFields = () => (
  <>
    <TextInput source="title" fullWidth />
    <TextInput source="slug" fullWidth helperText="Auto-generated from title." />
    
    {/* Short Summary */}
    <TextInput 
      source="description" 
      label="Short Summary (For Cards)" 
      fullWidth 
      multiline={false} 
    />

    {/* Long Description (Markdown) */}
    <TextInput 
      source="longDescription" 
      label="Full Detailed Description (Markdown)" 
      multiline 
      fullWidth 
      rows={10}
      helperText="Supports Markdown! Use # for Headers, **bold**, etc."
    />
    
    <div style={{ display: 'flex', gap: '20px' }}>
        <DateInput source="releasedAt" label="Release Date" />
        <DateInput 
            source="newReleaseUntil" 
            label="Show in 'New Releases' Until" 
            parse={(date) => new Date(date)}
        />
    </div>
    
    {/* Client Project Specific Field */}
    <SelectInput 
      source="displaySize" 
      choices={[
        { id: 'landscape', name: 'Landscape (16:9)' },
        { id: 'portrait', name: 'Portrait (9:16)' },
      ]} 
      helperText="How this image should appear in the masonry layout."
      defaultValue="landscape"
    />

    <ImageInput source="bannerUrl" label="Top Banner Image (Optional 21:9)">
      <ImageField source="src" title="title" />
    </ImageInput>
    
    <ImageInput source="imageUrl" label="Main Cover Image (Box Art)">
      <ImageField source="src" title="title" />
    </ImageInput>
    
    {/* === ALL URL FIELDS (Matches Games) === */}
    <TextInput source="youtubeUrl" label="YouTube URL" fullWidth />
    <TextInput source="liveDemoUrl" label="Live Demo URL" fullWidth />
    <TextInput source="clientUrl" label="Client's External URL (Specific to Projects)" fullWidth />
    <TextInput source="androidUrl" label="Android Play Store URL" fullWidth />
    <TextInput source="iosUrl" label="Apple App Store URL" fullWidth />
    <TextInput source="steamUrl" label="Steam Store URL" fullWidth />

    <ArrayInput source="tags">
      <SimpleFormIterator>
        <TextInput source="" label="Tag" parse={(value) => value ? value.toLowerCase() : ""} />
      </SimpleFormIterator>
    </ArrayInput>
    
    {/* === GALLERY IMAGES (Matches Games) === */}
    <ArrayInput source="galleryImages">
      <SimpleFormIterator>
        <ImageInput source="src" label="Upload Gallery Image">
           <ImageField source="src" title="title" />
        </ImageInput>
      </SimpleFormIterator>
    </ArrayInput>
  </>
);

export const ClientProjectEdit = () => (
  <Edit>
    <SimpleForm>
        <ClientProjectFormFields />
    </SimpleForm>
  </Edit>
);

export const ClientProjectCreate = () => (
  <Create>
    <SimpleForm defaultValues={{ 
      createdAt: new Date(),
      displaySize: 'landscape',
      clientUrl: null,
      liveDemoUrl: null,
      androidUrl: null,
      iosUrl: null,
      steamUrl: null
    }}>
      <SlugUpdater />
      <ClientProjectFormFields />
    </SimpleForm>
  </Create>
);