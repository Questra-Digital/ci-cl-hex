'use client'

import { useMutation, gql } from '@apollo/client';
import { useState } from 'react';

const CREATE_PROJECT = gql`
  mutation CreateProject($title: String!, $description: String, $status: String!) {
    createProject(title: $title, description: $description, status: $status) {
      id
      title
      description
      status
    }
  }
`;

const CreateProject = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [status, setStatus] = useState('');

  const [createProject] = useMutation(CREATE_PROJECT);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await createProject({ variables: { title, description, status } });
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <input
        type="text"
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <input
        type="text"
        placeholder="Status"
        value={status}
        onChange={(e) => setStatus(e.target.value)}
      />
      <button type="submit">Create Project</button>
    </form>
  );
};

export default CreateProject;
