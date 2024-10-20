'use client'

import { useMutation, gql } from '@apollo/client';
import { useState } from 'react';

const CREATE_TEAM = gql`
  mutation CreateTeam($name: String!) {
    createTeam(name: $name) {
      id
      name
    }
  }
`;

const CreateTeam = () => {
  const [name, setName] = useState('');

  const [createTeam] = useMutation(CREATE_TEAM);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await createTeam({ variables: { name } });
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <button type="submit">Create Team</button>
    </form>
  );
};

export default CreateTeam;
