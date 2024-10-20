'use client'

import { useQuery, gql } from '@apollo/client';

const GET_TEAMS = gql`
  query GetTeams {
    teams {
      id
      name
    }
  }
`;

const TeamList = () => {
  const { loading, error, data } = useQuery(GET_TEAMS);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div>
      <h2>Teams</h2>
      <div style={{ display: 'flex', flexWrap: 'wrap' }}>
        {data.teams.map((team: any) => (
          <div key={team.id} style={{ border: '1px solid #ccc', padding: '10px', margin: '10px' }}>
            <h3>{team.name}</h3>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TeamList;
