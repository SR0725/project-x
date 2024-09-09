
import generateYourOtherPossible from "@/backend/service/generate-your-other-possible";
import scrapeTwitterPosts from "@/backend/service/scrape-twitter-posts";
import { NextResponse } from "next/server";

export async function GET() {
  const username = "elonmusk";
  const posts = await scrapeTwitterPosts(username);
  console.log(`抓取到 ${posts.length} 條推文:`);

  const result = await generateYourOtherPossible(posts);
  console.log(result);
  return NextResponse.json(
    { message: result },
    { status: 200 }
  );
}
