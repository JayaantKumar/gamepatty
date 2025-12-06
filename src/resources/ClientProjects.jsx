import * as React from "react";
import { useEffect } from 'react';
import { useWatch, useFormContext } from 'react-hook-form';
import {
  List, Datagrid, TextField, DateField,
  Edit, Create, SimpleForm, TextInput, DateInput,
  ImageInput, ImageField, SelectInput, CloneButton
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

const ClientProjectForm = () => (
  <SimpleForm>
    <TextInput source="title" fullWidth />
    <TextInput 
      source="slug" 
      fullWidth 
      helperText="IMPORTANT: Change the slug when duplicating!" 
    />
    <TextInput source="description" multiline fullWidth />
    
    <DateInput source="releasedAt" label="Release Date" />
    
    <SelectInput 
      source="displaySize" 
      choices={[
        { id: 'landscape', name: 'Landscape (16:9)' },
        { id: 'portrait', name: 'Portrait (9:16)' },
      ]} 
      helperText="How this image should appear in the masonry layout."
      defaultValue="landscape"
    />

    {/* === NEW BANNER IMAGE FIELD === */}
    <ImageInput source="bannerUrl" label="Top Banner Image (Optional)">
      <ImageField source="src" title="title" />
    </ImageInput>
    <p style={{ margin: '-10px 0 20px', fontSize: '0.875rem', color: 'rgba(255, 255, 255, 0.7)' }}>
      Recommended aspect ratio: 21:9 (e.g., 2560x1080) cinematic.
    </p>
    {/* ============================== */}
    
    <ImageInput source="imageUrl" label="Main Cover Image (Box Art)">
      <ImageField source="src" title="title" />
    </ImageInput>
    
    <TextInput source="clientUrl" label="Client's External URL" fullWidth />
    <TextInput source="steamUrl" label="Steam Store URL" fullWidth />

    <DateInput source="createdAt" style={{ display: 'none' }} />
  </SimpleForm>
);

export const ClientProjectEdit = () => (
  <Edit>
    <ClientProjectForm />
  </Edit>
);

export const ClientProjectCreate = () => (
  <Create>
    <SimpleForm defaultValues={{ 
      createdAt: new Date(),
      displaySize: 'landscape',
      clientUrl: null,
      steamUrl: null
    }}>
      <SlugUpdater />

      <TextInput source="title" fullWidth />
      <TextInput 
        source="slug" 
        fullWidth 
        helperText="Auto-generated from title." 
      />
      <TextInput source="description" multiline fullWidth />
      
      <DateInput source="releasedAt" label="Release Date" />

      <SelectInput 
        source="displaySize" 
        choices={[
          { id: 'landscape', name: 'Landscape (16:9)' },
          { id: 'portrait', name: 'Portrait (9:16)' },
        ]} 
        helperText="How this image should appear in the masonry layout."
        defaultValue="landscape"
      />

      {/* === NEW BANNER IMAGE FIELD === */}
      <ImageInput source="bannerUrl" label="Top Banner Image (Optional)">
        <ImageField source="src" title="title" />
      </ImageInput>
      <p style={{ margin: '-10px 0 20px', fontSize: '0.875rem', color: 'rgba(255, 255, 255, 0.7)' }}>
        Recommended aspect ratio: 21:9 (e.g., 2560x1080) cinematic.
      </p>
      {/* ============================== */}
      
      <ImageInput source="imageUrl" label="Main Cover Image (Box Art)">
        <ImageField source="src" title="title" />
      </ImageInput>
      
      <TextInput source="clientUrl" label="Client's External URL" fullWidth />
      <TextInput source="steamUrl" label="Steam Store URL" fullWidth />
    </SimpleForm>
  </Create>
);