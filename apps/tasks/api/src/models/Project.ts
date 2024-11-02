import { Schema, model, Document } from 'mongoose';

// Define TypeScript interface for the Project document
export interface IProject extends Document {
  title: string;
  description?: string;
  status: string;
}

// Define Mongoose Schema
const projectSchema = new Schema<IProject>({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  status: {
    type: String,
    required: true,
  },
});

// Create the Mongoose model
const Project = model<IProject>('Project', projectSchema);

export default Project;
