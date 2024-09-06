import { Tweet } from "@/models/tweet";

async function queryAllTweets(): Promise<Tweet[]> {
  const tweets: Tweet[] = [];
  const tweetElements = document.querySelectorAll(
    'article[data-testid="tweet"]'
  );

  tweetElements.forEach((tweet) => {
    const userNameElement = tweet.querySelector(
      "div[data-testid='User-Name'] span span"
    );
    const tweetTextElement = tweet.querySelector(
      "div[data-testid='tweetText']"
    );
    const replyElement = tweet.querySelector("button[data-testid='reply']");
    const retweetElement = tweet.querySelector("button[data-testid='retweet']");
    const likeElement = tweet.querySelector("button[data-testid='like']");
    const dateElement = tweet.querySelector("time[datetime]");

    try {
      const likes =
        Number(likeElement?.getAttribute("aria-label")?.split(" ")[0]) || 0;
      const retweets =
        Number(retweetElement?.getAttribute("aria-label")?.split(" ")[0]) || 0;
      const replies =
        Number(replyElement?.getAttribute("aria-label")?.split(" ")[0]) || 0;
      const date = dateElement?.getAttribute("datetime") || "";

      tweets.push({
        author: userNameElement?.textContent || "",
        content: tweetTextElement?.textContent || "",
        likes,
        retweets,
        replies,
        date,
      });
    } catch (error) {}
  });

  return tweets;
}

export default queryAllTweets;
