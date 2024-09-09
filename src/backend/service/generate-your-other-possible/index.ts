import { z } from "zod";
import createLLMNode from "@/backend/utils/llm-node";
import { Tweet } from "@/models/tweet";
import formatTweets from "./format-tweets";

const responseSchema = z.object({
  currentJob: z.object({
    title: z.string(),
    reason: z.string(),
  }),
  alternativeJob: z.object({
    title: z.string(),
    reason: z.string(),
  }),
});

async function generateYourOtherPossible(posts: Tweet[]) {
  const response = await createLLMNode(
    "generate-your-other-possible",
    responseSchema,
    formatTweets(posts)
  );
  return response;
}

export default generateYourOtherPossible;
