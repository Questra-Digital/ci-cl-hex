import { gql } from 'apollo-server';
import Team, { ITeam } from './models/teams';

// GraphQL Schema Definition
export const typeDefs = gql`
  type Team {
    id: ID!
    name: String!
  }

  type Query {
    teams: [Team!]!
    team(id: ID!): Team
  }

  type Mutation {
    createTeam(name: String!): Team!
    updateTeam(id: ID!, name: String): Team!
    deleteTeam(id: ID!): Boolean!
  }
`;

// Define the resolvers with type safety
export const resolvers = {
  Query: {
    teams: async (): Promise<ITeam[]> => {
      return await Team.find();
    },
    team: async (parent: any, { id }: { id: string }): Promise<ITeam | null> => {
      return await Team.findById(id);
    },
  },
  Mutation: {
    createTeam: async (
      parent: any,
      { name }: { name: string; }
    ): Promise<ITeam> => {
      const newTeam = new Team({ name });
      return await newTeam.save();
    },
    updateTeam: async (
      parent: any,
      { id, name }: { id: string; name?: string; }
    ): Promise<ITeam | null> => {
      return await Team.findByIdAndUpdate(
        id,
        { name },
        { new: true }
      );
    },
    deleteTeam: async (parent: any, { id }: { id: string }): Promise<boolean> => {
      const result = await Team.findByIdAndDelete(id);
      return !!result;
    },
  },
};
