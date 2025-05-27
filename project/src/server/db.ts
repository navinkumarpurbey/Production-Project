import { MongoClient, Db } from 'mongodb';

const url = 'mongodb://localhost:27017';
const dbName = 'healthcare_trend';

let client: MongoClient;
let db: Db;

export async function connectDB(): Promise<Db> {
  if (db) {
    return db;
  }

  try {
    client = new MongoClient(url, { useNewUrlParser: true, useUnifiedTopology: true } as any); // cast for options
    await client.connect();
    console.log('✅ MongoDB Connected');
    db = client.db(dbName);
    return db;
  } catch (error) {
    console.error('❌ MongoDB connection failed:', error);
    throw error;
  }
}

export function getDB(): Db {
  if (!db) {
    throw new Error('❌ Database not connected');
  }
  return db;
}
