import { getDefaultLLMNodeRepository } from "../repositories/llm-node-repository";
import { zodResponseFormat } from "openai/helpers/zod";
import { ZodSchema } from "zod";
import { createOpenAI } from "@/utils/openai";

export async function createLLMNode<T>(
  name: string,
  outputSchema: ZodSchema<T>,
  input: string
): Promise<T | null> {
  const openai = createOpenAI();
  const llmNodeRepository = await getDefaultLLMNodeRepository();
  const llmNode = await llmNodeRepository.findByName(name);

  if (!llmNode) {
    throw new Error(`LLM node ${name} not found`);
  }

  const completion = await openai.beta.chat.completions.parse({
    model: "gpt-4o-mini",
    messages: [
      {
        role: "system",
        content: llmNode.prompt,
      },
      {
        role: "user",
        content: input,
      },
    ],
    response_format: zodResponseFormat(outputSchema, "response"),
  });

  return completion.choices[0]?.message.parsed;
}

export default createLLMNode;
