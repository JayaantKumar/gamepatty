import * as React from "react";
import { useEffect } from 'react';
import { useWatch, useFormContext } from 'react-hook-form';
import {
  List, Datagrid, TextField, DateField,
  Edit, Create, SimpleForm, TextInput, 
  ImageInput, ImageField
} from 'react-admin';

// Helper to auto-generate slug
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

// 1. The List View
export const PageList = () => (
  <List title="Website Content Pages">
    <Datagrid rowClick="edit">
      <TextField source="title" label="Page Title" />
      <TextField source="slug" label="URL Slug" />
      <DateField source="lastUpdated" label="Last Updated" />
    </Datagrid>
  </List>
);

// 2. The Form Fields (FIXED: Removed <SimpleForm> wrapper)
// Now this just returns the input fields, so it can be reused safely.
const PageForm = () => (
  <>
    <TextInput source="title" label="Page Title (e.g., Privacy Policy)" fullWidth />
    <TextInput source="slug" label="URL Slug" fullWidth helperText="This determines the link (e.g., 'privacy-policy')" />
    
    <ImageInput source="bannerUrl" label="Page Banner Image (Optional)">
      <ImageField source="src" title="title" />
    </ImageInput>

    <TextInput 
        source="content" 
        label="Page Content (Markdown Supported)" 
        multiline 
        fullWidth 
        rows={20} 
        helperText="You can use Markdown here! Use # for Headers, - for bullets, **text** for bold."
    />
  </>
);

// 3. Edit View (FIXED: Added <SimpleForm> here)
export const PageEdit = () => (
  <Edit>
    <SimpleForm>
        <PageForm />
    </SimpleForm>
  </Edit>
);

// 4. Create View (Already had <SimpleForm>, now it works)
export const PageCreate = () => (
  <Create>
    <SimpleForm defaultValues={{ lastUpdated: new Date() }}>
      <SlugUpdater />
      <PageForm />
    </SimpleForm>
  </Create>
);