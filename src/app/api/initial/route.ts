import { NextRequest, NextResponse } from "next/server";
import { getDefaultLLMNodeRepository } from "@/backend/repositories/llm-node-repository";

export async function GET(request: NextRequest) {
  const llmNodeRepository = await getDefaultLLMNodeRepository();
  llmNodeRepository.init();
  return NextResponse.json({ message: "ok" }, { status: 200 });
}
