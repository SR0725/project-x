import { NextRequest, NextResponse } from "next/server";
import generateYourOtherPossible from "@/backend/service/generate-your-other-possible";
import scrapeTwitterPosts from "@/backend/service/scrape-twitter-posts";
import selectPeriodicTopLikedTweets from "@/backend/service/select-periodic-top-liked-tweets";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const username = searchParams.get("username");
  const period = Number(searchParams.get("period"));
  const maxScrapeNumber = Number(searchParams.get("maxScrapeNumber"));
  if (!username) {
    return NextResponse.json(
      { message: "username is required" },
      { status: 400 }
    );
  }
  const posts = await scrapeTwitterPosts(username, maxScrapeNumber);
  const periodicTopPosts = selectPeriodicTopLikedTweets(posts, period);
  const result = await generateYourOtherPossible(periodicTopPosts);
  return NextResponse.json(
    { result: result, posts: posts, periodicTopPosts: periodicTopPosts },
    { status: 200 }
  );
}
