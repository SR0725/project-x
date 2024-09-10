import axios from "axios";
import { z } from "zod";
import createLLMNode from "@/backend/utils/llm-node";
import { Tweet } from "@/models/tweet";
import formatTweets from "./format-tweets";
import { generateImage } from "./generate-image";

const generateYourOtherPossibleResponseSchema = z.object({
  currentJob: z.object({
    title: z.string(),
    reason: z.string(),
  }),
  alternativeJob: z.object({
    title: z.string(),
    reason: z.string(),
  }),
});

const imageGenerateWithOtherPossibleResponseSchema = z.object({
  prompt: z.string(),
});

async function generateYourOtherPossible(posts: Tweet[]) {
  const generateYourOtherPossibleResponse = await createLLMNode(
    "generate-your-other-possible",
    generateYourOtherPossibleResponseSchema,
    formatTweets(posts)
  );
  if (!generateYourOtherPossibleResponse) {
    throw new Error("generateYourOtherPossibleResponse is null");
  }
  const imagePrompt = await createLLMNode(
    "image-generate-with-other-possible",
    imageGenerateWithOtherPossibleResponseSchema,
    generateYourOtherPossibleResponse.alternativeJob.title
  );
  if (!imagePrompt) {
    throw new Error("imagePrompt is null");
  }
  const image = await generateImage(imagePrompt.prompt);

  return {
    ...generateYourOtherPossibleResponse,
    image,
  };
}

export default generateYourOtherPossible;
