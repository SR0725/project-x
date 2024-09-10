import { NextRequest, NextResponse } from "next/server";
import { randomUUID } from "crypto";
import { z } from "zod";
import { getDefaultTweetAnalyzeReportRepository } from "@/backend/repositories/tweet-analyze-report-repository";
import generateYourOtherPossible from "@/backend/service/generate-your-other-possible";
import scrapeTwitterPosts from "@/backend/service/scrape-twitter-posts";
import selectPeriodicTopLikedTweets from "@/backend/service/select-periodic-top-liked-tweets";

const requestSchema = z.object({
  username: z.string(),
  period: z.number().optional().default(7),
  maxScrapeNumber: z.number().optional().default(100),
});

export async function POST(request: NextRequest) {
  const body = await request.json();
  const { username, period, maxScrapeNumber } = requestSchema.parse(body);

  if (!username) {
    return NextResponse.json(
      { message: "username is required" },
      { status: 400 }
    );
  }
  const tweetAnalyzeReportRepository =
    await getDefaultTweetAnalyzeReportRepository();
  const id = randomUUID();

  await tweetAnalyzeReportRepository.create({
    id,
    status: "processing",
    username,
    period,
    maxScrapeNumber,
    posts: [],
    periodicTopPosts: [],
    result: "",
    image: undefined,
  });

  scrapeTwitterPosts(username, maxScrapeNumber)
    .then(async (posts) => {
      const periodicTopPosts = selectPeriodicTopLikedTweets(posts, period);
      const result = await generateYourOtherPossible(periodicTopPosts);
      if (!result) {
        return;
      }
      await tweetAnalyzeReportRepository.update({
        id,
        status: "completed",
        username,
        period,
        maxScrapeNumber,
        posts,
        periodicTopPosts,
        result: `${username} 是被${result.currentJob.title}耽誤的${result.alternativeJob.title}`,
        image: result.image,
      });
    })
    .catch((error) => {
      console.error(error);
    });

  return NextResponse.json({ id }, { status: 200 });
}

export async function GET(request: NextRequest) {
  const tweetAnalyzeReportRepository =
    await getDefaultTweetAnalyzeReportRepository();
  const tweetAnalyzeReports = await tweetAnalyzeReportRepository.findAll();
  return NextResponse.json({ tweetAnalyzeReports }, { status: 200 });
}
