import { gql } from 'apollo-server';
import Project, { IProject } from './models/Project';

// GraphQL Schema Definition
export const typeDefs = gql`
  type Project {
    id: ID!
    title: String!
    description: String
    status: String!
  }

  type Query {
    projects: [Project!]!
    project(id: ID!): Project
  }

  type Mutation {
    createProject(title: String!, description: String, status: String!): Project!
    updateProject(id: ID!, title: String, description: String, status: String): Project!
    deleteProject(id: ID!): Boolean!
  }
`;

// Define the resolvers with type safety
export const resolvers = {
  Query: {
    projects: async (): Promise<IProject[]> => {
      return await Project.find();
    },
    project: async (parent: any, { id }: { id: string }): Promise<IProject | null> => {
      return await Project.findById(id);
    },
  },
  Mutation: {
    createProject: async (
      parent: any,
      { title, description, status }: { title: string; description?: string; status: string }
    ): Promise<IProject> => {
      const newProject = new Project({ title, description, status });
      return await newProject.save();
    },
    updateProject: async (
      parent: any,
      { id, title, description, status }: { id: string; title?: string; description?: string; status?: string }
    ): Promise<IProject | null> => {
      return await Project.findByIdAndUpdate(
        id,
        { title, description, status },
        { new: true }
      );
    },
    deleteProject: async (parent: any, { id }: { id: string }): Promise<boolean> => {
      const result = await Project.findByIdAndDelete(id);
      return !!result;
    },
  },
};
