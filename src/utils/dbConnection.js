import { MongoClient, ServerApiVersion } from "mongodb";

const uri = `mongodb+srv://${process.env.MONGODB_USER}:${process.env.MONGODB_PASSWORD}@cluster0.mmqvkcs.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
  tls: true,
});

let connectedClient = null;

export async function dbConnection() {
  try {
    if (!connectedClient) {
      connectedClient = await client.connect();
      console.log("Connected to MongoDB successfully");
    }
    const db = connectedClient.db(process.env.MONGODB_DB);
    return db;
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
    throw error;
  }
}
