import puppeteer from "puppeteer";
import { Tweet } from "@/models/tweet";
import delay from "@/utils/delay";

async function queryAllTweet(document: Document): Promise<Tweet[]> {
  const tweets: Tweet[] = [];
  const tweetElements = document.querySelectorAll(
    'article[data-testid="tweet"]'
  );

  tweetElements.forEach((tweet) => {
    const userName = tweet.querySelector("div[data-testid='User-Name']");
    const tweetText = tweet.querySelector("div[data-testid='tweetText']");
    const reply = tweet.querySelector("div[data-testid='reply']");
    const retweet = tweet.querySelector("div[data-testid='retweet']");
    const like = tweet.querySelector("div[data-testid='like']");
    const date = tweet.querySelector("time[datetime]");

    tweets.push({
      author: userName?.textContent || "",
      content: tweetText?.textContent || "",
      likes: like?.textContent || "",
      retweets: retweet?.textContent || "",
      replies: reply?.textContent || "",
      date: date?.textContent || "",
    });
  });

  return tweets;
}

async function scrapeTwitterPosts(username: string) {
  const browser = await puppeteer.launch({
    headless: false,
    args: ["--no-sandbox", "--disable-setuid-sandbox"],
    defaultViewport: null,
  });
  const page = await browser.newPage();
  await page.setUserAgent(
    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36"
  );
  await page.goto(`https://x.com/${username}`);

  await delay(1000);
  const posts: Tweet[] = [];
  let scrollDownTime = 0;
  while (scrollDownTime < 5) {
    page.exposeFunction("queryAllTweet", queryAllTweet);

    const newPosts = await page.evaluate(() => {
      return queryAllTweet(document);
    });
    newPosts.forEach((post) => {
      if (post && !posts.some((p) => p.content === post.content)) {
        posts.push(post);
      }
    });
    console.log(posts);
    await page.evaluate(() => {
      window.scrollBy(0, window.innerHeight);
    });

    await delay(500);
    scrollDownTime++;
  }

  await browser.close();

  return posts;
}

// 使用示例
(async () => {
  const username = "elonmusk";
  const posts = await scrapeTwitterPosts(username);
  console.log(`抓取到 ${posts.length} 條推文:`);
  posts.forEach((post, index) => {
    console.log(`${index + 1}. ${post}`);
  });
})();
