import { Tweet } from "@/models/tweet";

function selectPeriodicTopLikedTweets(posts: Tweet[], periodInDays: number): Tweet[] {
  const topTweets: Tweet[] = [];
  const periodInMs = periodInDays * 24 * 60 * 60 * 1000; // 將天數轉換為毫秒

  // 按日期排序推文
  const sortedPosts = posts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  let currentPeriodStart = new Date(sortedPosts[0].date).getTime();
  let currentPeriodTopTweet = sortedPosts[0];

  for (const post of sortedPosts) {
    const postDate = new Date(post.date).getTime();
    
    if (currentPeriodStart - postDate > periodInMs) {
      topTweets.push(currentPeriodTopTweet);
      currentPeriodStart = postDate;
      currentPeriodTopTweet = post;
    } else if (post.likes > currentPeriodTopTweet.likes) {
      currentPeriodTopTweet = post;
    }
  }

  // 添加最後一個週期的最高讚推文
  topTweets.push(currentPeriodTopTweet);

  return topTweets;
}

export default selectPeriodicTopLikedTweets;