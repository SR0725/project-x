import type { MongoCollections } from "@/backend/utils/mongo-db";
import { getDefaultMongoClientCollection } from "@/backend/utils/mongo-db";
import { TweetAnalyzeReport } from "@/models/tweet-analyze-report";

let defaultTweetAnalyzeReportRepository: TweetAnalyzeReportRepository | null =
  null;

export default class TweetAnalyzeReportRepository {
  constructor(private collections: MongoCollections) {}

  async findById(id: string) {
    const { tweetAnalyzeReportCollection } = this.collections;
    return tweetAnalyzeReportCollection.findOne({ id });
  }

  async findAll() {
    const { tweetAnalyzeReportCollection } = this.collections;
    return tweetAnalyzeReportCollection.find({}).toArray();
  }

  async create(tweetAnalyzeReport: TweetAnalyzeReport) {
    const { tweetAnalyzeReportCollection } = this.collections;
    return tweetAnalyzeReportCollection.insertOne(tweetAnalyzeReport);
  }

  async update(tweetAnalyzeReport: TweetAnalyzeReport) {
    const { tweetAnalyzeReportCollection } = this.collections;
    return tweetAnalyzeReportCollection.updateOne(
      { id: tweetAnalyzeReport.id },
      { $set: tweetAnalyzeReport }
    );
  }
}

export async function getDefaultTweetAnalyzeReportRepository() {
  if (defaultTweetAnalyzeReportRepository) {
    return defaultTweetAnalyzeReportRepository;
  }
  const collections = await getDefaultMongoClientCollection();
  defaultTweetAnalyzeReportRepository = new TweetAnalyzeReportRepository(
    collections
  );
  return defaultTweetAnalyzeReportRepository;
}
