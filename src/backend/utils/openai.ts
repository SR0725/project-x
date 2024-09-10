import OpenAI from "openai";

export function createOpenAI(
  apiKey: string | undefined = process.env.OPENAI_API_KEY
) {
  if (!apiKey) {
    throw new Error("OPENAI_API_KEY is not set");
  }
  const client = new OpenAI({
    apiKey,
  });
  return client;
}
