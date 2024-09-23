import { Tweet } from "./tweet";

export interface TweetAnalyzeReport {
  id: string;
  status: "processing" | "completed" | "failed";
  username: string;
  period: number;
  maxScrapeNumber: number;
  posts: Tweet[];
  periodicTopPosts: Tweet[];
  result: string;
  reason: string;
  image: string | undefined;
}
