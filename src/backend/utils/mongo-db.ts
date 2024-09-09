import type { Collection } from "mongodb";
import { MongoClient } from "mongodb";
import { LLMNode } from "@/models/llm-node";

export interface MongoCollections {
  llmNodeCollection: Collection<LLMNode>;
}

export let defaultMongoCollections: MongoCollections | null = null;

async function createMongoClientCollection(): Promise<MongoCollections> {
  const connectionString = process.env.MONGODB_CONNECTION_STRING;

  const mainDbName = process.env.MAIN_DB_NAME;

  if (!connectionString || !mainDbName) {
    throw new Error("MONGODB_CONNECTION_STRING or mainDbName is not set");
  }

  const client = await MongoClient.connect(connectionString);

  const mainDb = client.db(mainDbName);
  const llmNodeCollection = mainDb.collection<LLMNode>("llm-nodes");

  return {
    llmNodeCollection,
  };
}

export async function getDefaultMongoClientCollection() {
  if (defaultMongoCollections) {
    return defaultMongoCollections;
  }
  console.log("Creating default mongo collections");
  defaultMongoCollections = await createMongoClientCollection()!;
  return defaultMongoCollections;
}

export default createMongoClientCollection;
