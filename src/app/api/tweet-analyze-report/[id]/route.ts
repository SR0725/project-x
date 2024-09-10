import { NextRequest, NextResponse } from "next/server";
import { getDefaultTweetAnalyzeReportRepository } from "@/backend/repositories/tweet-analyze-report-repository";

export async function GET(
  request: NextRequest,
  context: { params: { id: string } }
) {
  const id = context.params.id;
  const tweetAnalyzeReportRepository =
    await getDefaultTweetAnalyzeReportRepository();
  const tweetAnalyzeReport = await tweetAnalyzeReportRepository.findById(id);
  return NextResponse.json({ tweetAnalyzeReport }, { status: 200 });
}
