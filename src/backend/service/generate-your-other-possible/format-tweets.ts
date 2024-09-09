import { Tweet } from "@/models/tweet";

export function formatTweets(tweets: Tweet[]): string {
  return tweets
    .map((tweet, index) => {
      const formattedDate = new Date(tweet.date).toLocaleDateString("zh-TW", {
        year: "numeric",
        month: "long",
        day: "numeric",
      });

      return `推文 #${index + 1}
作者：${tweet.author}
日期：${formattedDate}
內容：${tweet.content}
喜歡：${tweet.likes} | 轉推：${tweet.retweets} | 回覆：${tweet.replies}
---`;
    })
    .join("\n\n");
}

export default formatTweets;
