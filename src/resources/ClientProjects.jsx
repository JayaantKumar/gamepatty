import * as React from "react";
import {
  List, Datagrid, TextField, UrlField,
  Edit, Create, SimpleForm, TextInput,
  ImageInput, ImageField, SelectInput
} from 'react-admin';

export const ClientProjectList = () => (
  <List>
    <Datagrid rowClick="edit">
      <ImageField source="imageUrl" title="title" label="Image" />
      <TextField source="title" />
      <TextField source="slug" />
      <TextField source="displaySize" />
    </Datagrid>
  </List>
);

const ClientProjectForm = () => (
  <SimpleForm>
    <TextInput source="title" fullWidth />
    <TextInput source="slug" fullWidth />
    <TextInput source="description" multiline fullWidth />
    
    <ImageInput source="imageUrl" label="Project Image (Upload)">
      <ImageField source="src" title="title" />
    </ImageInput>
    
    <TextInput source="clientUrl" label="Client's External URL" fullWidth />
    
    <SelectInput source="displaySize" choices={[
      { id: 'landscape', name: 'Landscape (16:9)' },
      { id: 'portrait', name: 'Portrait (9:16)' },
    ]} />
  </SimpleForm>
);

export const ClientProjectEdit = () => (
  <Edit>
    <ClientProjectForm />
  </Edit>
);

export const ClientProjectCreate = () => (
  <Create>
    <ClientProjectForm />
  </Create>
);