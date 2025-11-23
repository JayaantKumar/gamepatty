import * as React from "react";
import {
  List, Datagrid, TextField, UrlField, DateField,
  Edit, Create, SimpleForm, TextInput, DateInput,
  ArrayInput, SimpleFormIterator, ImageInput, ImageField,
  SelectInput
} from 'react-admin';

// 1. List View
export const ClientProjectList = () => (
  <List sort={{ field: 'createdAt', order: 'DESC' }}>
    <Datagrid rowClick="edit">
      {/* Handles both object (new) and string (old) image formats */}
      <ImageField source="imageUrl.src" title="title" label="Cover" />
      <TextField source="title" />
      <TextField source="slug" />
      <TextField source="displaySize" />
      <DateField source="createdAt" label="Created On" />
    </Datagrid>
  </List>
);

// 2. Shared Form
const ClientProjectForm = () => (
  <SimpleForm>
    <TextInput source="title" fullWidth />
    <TextInput source="slug" fullWidth />
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

    {/* Hidden created at field for editing */}
    <DateInput source="createdAt" style={{ display: 'none' }} />
  </SimpleForm>
);

// 3. Edit View (Exported)
export const ClientProjectEdit = () => (
  <Edit>
    <ClientProjectForm />
  </Edit>
);

// 4. Create View (Exported) <-- This was likely missing or broken
export const ClientProjectCreate = () => (
  <Create>
    <SimpleForm defaultValues={{ 
      createdAt: new Date(), // Use new Date() to prevent Firebase errors
      displaySize: 'landscape',
      clientUrl: null
    }}>
      <TextInput source="title" fullWidth />
      <TextInput source="slug" fullWidth />
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