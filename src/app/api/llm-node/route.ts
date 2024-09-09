import { NextRequest, NextResponse } from "next/server";
import { getDefaultLLMNodeRepository } from "@/backend/repositories/llm-node-repository";

export async function GET(request: NextRequest) {
  const llmNodeRepository = await getDefaultLLMNodeRepository();
  const llmNodes = await llmNodeRepository.findAll();
  return NextResponse.json({ llmNodes }, { status: 200 });
}
