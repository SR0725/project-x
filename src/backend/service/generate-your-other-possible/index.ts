import { z } from "zod";
import createLLMNode from "@/backend/utils/llm-node";
import { Tweet } from "@/models/tweet";
import formatTweets from "./format-tweets";
import { generateImage } from "./generate-image";

const generateYourOtherPossibleResponseSchema = z.object({
  reason: z.string(),
  currentJob: z.string(),
  alternativeJob: z.string(),
});

const extractAvatarStyleResponseSchema = z.object({
  style: z.string(),
});

const imageGenerateWithOtherPossibleResponseSchema = z.object({
  prompt: z.string(),
});

async function generateYourOtherPossible(posts: Tweet[], avatarUrl: string) {
  const generateYourOtherPossibleResponse = await createLLMNode(
    "generate-your-other-possible",
    generateYourOtherPossibleResponseSchema,
    formatTweets(posts)
  );
  if (!generateYourOtherPossibleResponse) {
    throw new Error("generateYourOtherPossibleResponse is null");
  }

  const avatarPrompt = await createLLMNode(
    "extract-avatar-style",
    extractAvatarStyleResponseSchema,
    "請判斷以下頭貼",
    avatarUrl
  );

  const imagePrompt = await createLLMNode(
    "image-generate-with-other-possible",
    imageGenerateWithOtherPossibleResponseSchema,
    `這個是該人物的形象，請根據該形象繪圖\n${avatarPrompt?.style || "動漫"}風格\n\n另外以下是他的替代職業\n${generateYourOtherPossibleResponse.alternativeJob}`,
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
