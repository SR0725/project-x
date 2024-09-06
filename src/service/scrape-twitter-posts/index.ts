import puppeteer from "puppeteer";
import { Tweet } from "@/models/tweet";
import delay from "@/utils/delay";
import queryAllTweets from "./query-all-tweets";

async function scrapeTwitterPosts(
  username: string,
  maxPostsNumber: number = 100
) {
  const browser = await puppeteer.launch({
    headless: false,
    args: ["--no-sandbox", "--disable-setuid-sandbox"],
    defaultViewport: null,
  });
  const page = await browser.newPage();
  await page.setUserAgent(
    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36"
  );
  // 設定 auth_token cookie
  await page.setCookie({
    name: "auth_token",
    value: process.env.TWITTER_AUTH_TOKEN || "",
    domain: "x.com",
    path: "/",
  });

  await page.goto(`https://x.com/${username}`);

  await delay(3000);
  const posts: Tweet[] = [];
  let lastScrollHeight = 0;
  let currentScrollHeight = 0;

  while (true) {
    const newPosts = await page.evaluate(queryAllTweets);
    newPosts.forEach((post) => {
      if (post && !posts.some((p) => p.content === post.content)) {
        posts.push(post);
      }
    });

    currentScrollHeight = await page.evaluate(() => window.scrollY);

    if (
      posts.length >= maxPostsNumber ||
      (currentScrollHeight === lastScrollHeight && currentScrollHeight !== 0)
    ) {
      break;
    }

    await page.evaluate(() => {
      window.scrollBy(0, window.innerHeight);
    });

    await delay(500);
    lastScrollHeight = currentScrollHeight;
  }

  await browser.close();

  return posts;
}

export default scrapeTwitterPosts;
