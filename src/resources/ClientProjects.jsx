import * as React from "react";
import { useEffect } from 'react'; // 1. Import useEffect
import { useWatch, useFormContext } from 'react-hook-form'; // 2. Import hooks for auto-slug
import {
  List, Datagrid, TextField, UrlField, DateField,
  Edit, Create, SimpleForm, TextInput, DateInput,
  ArrayInput, SimpleFormIterator, ImageInput, ImageField,
  SelectInput,
  CloneButton
} from 'react-admin';

// 3. Define the SlugUpdater component
const SlugUpdater = () => {
    const { setValue } = useFormContext();
    // Watch the 'title' field
    const title = useWatch({ name: 'title' });

    useEffect(() => {
        if (title) {
            // Convert title to slug: Lowercase, remove special chars, replace spaces with hyphens
            const slug = title
                .toLowerCase()
                .replace(/[^a-z0-9\s-]/g, '') // Remove weird chars
                .trim()
                .replace(/\s+/g, '-'); // Replace spaces with -
            
            setValue('slug', slug);
        }
    }, [title, setValue]);

    return null; // This component renders nothing visually
};

export const ClientProjectList = () => (
  <List sort={{ field: 'createdAt', order: 'DESC' }}>
    <Datagrid rowClick="edit">
      <ImageField source="imageUrl.src" title="title" label="Cover" />
      <TextField source="title" />
      <TextField source="slug" />
      <TextField source="displaySize" />
      <DateField source="createdAt" label="Created On" />
      
      {/* Add the Duplicate Button here */}
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
    
    <ImageInput source="imageUrl" label="Main Cover Image (Upload)">
      <ImageField source="src" title="title" />
    </ImageInput>
    
    <TextInput source="clientUrl" label="Client's External URL" fullWidth />

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
      clientUrl: null
    }}>
      {/* 4. Add the SlugUpdater inside the Create form */}
      <SlugUpdater />

      <TextInput source="title" fullWidth />
      <TextInput 
        source="slug" 
        fullWidth 
        helperText="Auto-generated from title. You can edit this manually if needed." 
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
      
      <ImageInput source="imageUrl" label="Main Cover Image (Upload)">
        <ImageField source="src" title="title" />
      </ImageInput>
      
      <TextInput source="clientUrl" label="Client's External URL" fullWidth />
    </SimpleForm>
  </Create>
);