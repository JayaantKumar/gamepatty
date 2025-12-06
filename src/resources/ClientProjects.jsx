import * as React from "react";
import { useEffect } from "react";
import { useWatch, useFormContext } from "react-hook-form";

import {
  List, Datagrid, TextField, DateField,
  Edit, Create, SimpleForm, TextInput, DateInput,
  ArrayInput, SimpleFormIterator, ImageInput, ImageField,
  SelectInput,
  CloneButton
} from "react-admin";

// -------------------------
// AUTO SLUG GENERATION
// -------------------------
const SlugUpdater = () => {
  const { setValue } = useFormContext();
  const title = useWatch({ name: "title" });

  useEffect(() => {
    if (!title) return;

    const slug = title
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, "")
      .trim()
      .replace(/\s+/g, "-");

    setValue("slug", slug);
  }, [title]);

  return null;
};

// -------------------------
// LIST VIEW
// -------------------------
export const ClientProjectList = () => (
  <List sort={{ field: "createdAt", order: "DESC" }}>
    <Datagrid rowClick="edit">
      <ImageField source="imageUrl.src" label="Cover" />
      <TextField source="title" />
      <TextField source="slug" />
      <TextField source="displaySize" />
      <DateField source="createdAt" />
      <CloneButton />
    </Datagrid>
  </List>
);

// -------------------------
// SHARED FORM (EDIT)
// -------------------------
const ClientProjectForm = () => (
  <SimpleForm>
    <TextInput source="title" fullWidth />
    <TextInput
      source="slug"
      fullWidth
      helperText="IMPORTANT: Change slug when duplicating!"
    />

    <TextInput source="description" multiline fullWidth />

    <DateInput source="releasedAt" label="Release Date" />

    <SelectInput
      source="displaySize"
      choices={[
        { id: "landscape", name: "Landscape (16:9)" },
        { id: "portrait", name: "Portrait (9:16)" },
      ]}
      defaultValue="landscape"
    />

    <ImageInput source="imageUrl" label="Main Cover Image">
      <ImageField source="src" />
    </ImageInput>

    <TextInput source="clientUrl" label="Client's External URL" fullWidth />

    {/* === NEW STEAM FIELD === */}
    <TextInput source="steamUrl" label="Steam Store URL" fullWidth />

    <DateInput source="createdAt" style={{ display: "none" }} />
  </SimpleForm>
);

// -------------------------
// EDIT
// -------------------------
export const ClientProjectEdit = () => (
  <Edit>
    <ClientProjectForm />
  </Edit>
);

// -------------------------
// CREATE
// -------------------------
export const ClientProjectCreate = () => (
  <Create>
    <SimpleForm
      defaultValues={{
        createdAt: new Date(),
        displaySize: "landscape",
        clientUrl: null
      }}
    >
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

      {/* === NEW STEAM FIELD === */}
      <TextInput source="steamUrl" label="Steam Store URL" fullWidth />

    </SimpleForm>
  </Create>
);
