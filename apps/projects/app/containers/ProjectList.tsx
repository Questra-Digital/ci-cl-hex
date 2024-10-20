'use client'

import { useQuery, gql } from '@apollo/client';

const GET_PROJECTS = gql`
  query GetProjects {
    projects {
      id
      title
      description
      status
    }
  }
`;

const ProjectList = () => {
  const { loading, error, data } = useQuery(GET_PROJECTS);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div>
      <h2>Projects</h2>
      <div style={{ display: 'flex', flexWrap: 'wrap' }}>
        {data.projects.map((project: any) => (
          <div key={project.id} style={{ border: '1px solid #ccc', padding: '10px', margin: '10px' }}>
            <h3>{project.title}</h3>
            <p>{project.description}</p>
            <p>Status: {project.status}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProjectList;
