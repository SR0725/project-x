import { NextRequest, NextResponse } from "next/server";
import { getDefaultLLMNodeRepository } from "@/backend/repositories/llm-node-repository";
import { LLMNode } from "@/models/llm-node";

export async function PUT(
  request: NextRequest,
  context: { params: { name: string } }
) {
  const llmNodeRepository = await getDefaultLLMNodeRepository();
  const newLLMNode = (await request.json()) as LLMNode;
  const oldLlmNode = await llmNodeRepository.findByName(context.params.name);
  if (!oldLlmNode) {
    return NextResponse.json(
      { message: "LLM Node not found" },
      { status: 404 }
    );
  }
  if (newLLMNode.name !== context.params.name) {
    return NextResponse.json(
      { message: "LLM Node name is not allowed to be changed" },
      { status: 400 }
    );
  }
  const llmNode = await llmNodeRepository.update({
    ...oldLlmNode,
    ...newLLMNode,
  });
  return NextResponse.json({ llmNode }, { status: 200 });
}
