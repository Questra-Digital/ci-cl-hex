import { ApolloServer } from 'apollo-server';
import mongoose from 'mongoose';
import { typeDefs, resolvers } from './schema';
import 'dotenv/config'


// MongoDB connection string
const MONGO_DB_URI = `${process.env.MONGO_DB_URI}`;
const clientOptions = { serverApi: { version: <const> '1', strict: true, deprecationErrors: true } };


// Connect to MongoDB
mongoose.connect(MONGO_DB_URI, clientOptions)
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.error('MongoDB connection error:', err));

// Initialize Apollo Server
const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ req }) => ({ req }),
});

// Start the server
server.listen().then(({ url }) => {
  console.log(`🚀 Server ready at ${url}`);
});
