import fs from "fs";
import scrapeTwitterPosts from "./service/scrape-twitter-posts";
import dotenv from "dotenv";
dotenv.config();

(async () => {
  const username = "Ray0725TW";
  const posts = await scrapeTwitterPosts(username);
  console.log(`抓取到 ${posts.length} 條推文:`);

  fs.writeFileSync("tweets.json", JSON.stringify(posts, null, 2));
  posts.forEach((post, index) => {
    console.log(`${index + 1}. `, post);
  });
})();
