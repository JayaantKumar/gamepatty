import * as React from "react";
import { useEffect } from 'react';
import { useWatch, useFormContext } from 'react-hook-form';
import {
  List, Datagrid, TextField, DateField,
  Edit, Create, SimpleForm, TextInput, DateInput,
  ImageInput, ImageField, SelectInput, CloneButton,
  ArrayInput, SimpleFormIterator
} from 'react-admin';

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

export const GhostList = () => (
  <List sort={{ field: 'createdAt', order: 'DESC' }} title="Ghost / Misc Portfolio">
    <Datagrid rowClick="edit">
      <ImageField source="imageUrl.src" title="title" label="Cover" />
      <TextField source="title" />
      <TextField source="slug" />
      <DateField source="createdAt" label="Created On" />
      <CloneButton />
    </Datagrid>
  </List>
);

// === FIX: REMOVED <SimpleForm> WRAPPER HERE ===
// Now this component ONLY contains the input fields
const GhostForm = () => (
  <>
    <TextInput source="title" fullWidth />
    <TextInput source="slug" fullWidth helperText="Auto-generated." />
    
    <TextInput source="description" label="Short Summary" fullWidth multiline={false} />
    <TextInput source="longDescription" label="Full Details (Markdown)" multiline fullWidth rows={10} />
    
    <DateInput source="releasedAt" label="Release Date" />

    <ImageInput source="bannerUrl" label="Top Banner Image (Optional 21:9)">
      <ImageField source="src" title="title" />
    </ImageInput>
    
    <ImageInput source="imageUrl" label="Main Cover Image (Box Art)">
      <ImageField source="src" title="title" />
    </ImageInput>
    
    <TextInput source="youtubeUrl" label="YouTube URL (For Video Card)" fullWidth />
    <TextInput source="clientUrl" label="External URL" fullWidth />
    
    <ArrayInput source="tags">
      <SimpleFormIterator>
        <TextInput source="" label="Tag" parse={(value) => value ? value.toLowerCase() : ""} />
      </SimpleFormIterator>
    </ArrayInput>
    
    <ArrayInput source="galleryImages">
      <SimpleFormIterator>
        <ImageInput source="src" label="Gallery Image">
           <ImageField source="src" title="title" />
        </ImageInput>
      </SimpleFormIterator>
    </ArrayInput>
  </>
);
// ==============================================

// === FIX: ADDED <SimpleForm> WRAPPER HERE ===
export const GhostEdit = () => (
  <Edit>
    <SimpleForm>
        <GhostForm />
    </SimpleForm>
  </Edit>
);

export const GhostCreate = () => (
  <Create>
    <SimpleForm defaultValues={{ createdAt: new Date() }}>
      <SlugUpdater />
      <GhostForm />
    </SimpleForm>
  </Create>
);