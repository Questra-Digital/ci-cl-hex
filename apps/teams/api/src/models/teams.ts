import { Schema, model, Document } from 'mongoose';

// Define TypeScript interface for the Team document
export interface ITeam extends Document {
  name: string;
}

// Define Mongoose Schema
const teamSchema = new Schema<ITeam>({
  name: {
    type: String,
    required: true,
  }
});

// Create the Mongoose model
const Team = model<ITeam>('Team', teamSchema);

export default Team;
