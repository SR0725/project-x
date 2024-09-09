import initialLLMNodeData from "../data/initial-llm-node-data";
import type { MongoCollections } from "@/backend/utils/mongo-db";
import { getDefaultMongoClientCollection } from "@/backend/utils/mongo-db";
import type { LLMNode } from "@/models/llm-node";

let defaultLLMNodeRepository: LLMNodeRepository | null = null;

export default class LLMNodeRepository {
  constructor(private collections: MongoCollections) {}

  async init() {
    for (const llmNode of initialLLMNodeData) {
      await this.update(llmNode);
    }
  }

  async findAll() {
    const { llmNodeCollection } = this.collections;
    return llmNodeCollection.find({}).toArray();
  }

  async findByName(name: string) {
    const { llmNodeCollection } = this.collections;
    return llmNodeCollection.findOne({ name });
  }

  async update(llmNode: LLMNode) {
    const { llmNodeCollection } = this.collections;
    return llmNodeCollection.updateOne(
      { name: llmNode.name },
      { $set: llmNode },
      { upsert: true }
    );
  }
}

export async function getDefaultLLMNodeRepository() {
  if (defaultLLMNodeRepository) {
    return defaultLLMNodeRepository;
  }
  const collections = await getDefaultMongoClientCollection();
  defaultLLMNodeRepository = new LLMNodeRepository(collections);
  return defaultLLMNodeRepository;
}
