import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { getDefaultLLMNodeRepository } from "@/backend/repositories/llm-node-repository";

export async function GET(request: NextRequest) {
  const llmNodeRepository = await getDefaultLLMNodeRepository();
  const llmNodes = await llmNodeRepository.findAll();
  return NextResponse.json({ llmNodes }, { status: 200 });
}

const requestBodySchema = z.object({
  llmNodes: z.array(
    z.object({
      name: z.string(),
      prompt: z.string(),
    })
  ),
});

export async function POST(request: NextRequest) {
  const body = await request.json();
  const { llmNodes } = requestBodySchema.parse(body);
  const llmNodeRepository = await getDefaultLLMNodeRepository();
  await llmNodeRepository.updateMany(llmNodes);
  return NextResponse.json({ message: "LLM Nodes updated" }, { status: 200 });
}
