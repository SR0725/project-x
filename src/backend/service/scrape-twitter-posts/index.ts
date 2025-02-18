import puppeteer from "puppeteer-core";
import { Tweet } from "@/models/tweet";
import delay from "@/utils/delay";
import queryAllTweets from "./query-all-tweets";
import queryAvatar from "./query-avatar";

async function scrapeTwitterPosts(
  username: string,
  maxPostsNumber: number = 80
) {
  const browser = await puppeteer.connect({
    browserWSEndpoint: process.env.BROWSERLESS_URL || "",
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
  const posts: Tweet[] = [];
  let lastScrollHeight = 0;
  let currentScrollHeight = 0;
  let avatarUrl = "";
  try {
    await page.goto(`https://x.com/${username}`);

    await delay(3000);
    avatarUrl = await page.evaluate(queryAvatar);
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
  } catch (error) {
    console.error(error);
  } finally {
    await browser.close();
  }

  console.log("posts", posts.length);
  console.log("avatarUrl", avatarUrl);
  return { posts, avatarUrl };
}

export default scrapeTwitterPosts;
