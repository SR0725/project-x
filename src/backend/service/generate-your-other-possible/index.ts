
import { Document, VectorStoreIndex } from "llamaindex";
import { Tweet } from "@/models/tweet";
import selectPeriodicTopLikedTweets from "./select-periodic-top-liked-tweets";

async function generateYourOtherPossible(posts: Tweet[]) {
  const periodicTopPosts = selectPeriodicTopLikedTweets(posts, 7);
  console.log(periodicTopPosts);
  const index = await VectorStoreIndex.fromDocuments(
    periodicTopPosts
      .filter((post) => post.content.length > 0)
      .map((post) => new Document({ text: post.content }))
  );
  const queryEngine = index.asQueryEngine();
  const { response, sourceNodes } = await queryEngine.query({
    query: "請幫我找出任何可以跟可以判斷出此人性格的推文",
  });
  return response;
}

export default generateYourOtherPossible;
