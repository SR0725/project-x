import type { Collection } from "mongodb";
import { MongoClient } from "mongodb";
import { LLMNode } from "@/models/llm-node";
import { TweetAnalyzeReport } from "@/models/tweet-analyze-report";

export interface MongoCollections {
  llmNodeCollection: Collection<LLMNode>;
  tweetAnalyzeReportCollection: Collection<TweetAnalyzeReport>;
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
  const tweetAnalyzeReportCollection = mainDb.collection<TweetAnalyzeReport>(
    "tweet-analyze-reports"
  );

  return {
    llmNodeCollection,
    tweetAnalyzeReportCollection,
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
