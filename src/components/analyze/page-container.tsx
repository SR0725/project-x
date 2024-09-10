"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { Progress } from "@nextui-org/react";
import { TweetAnalyzeReport } from "@/models/tweet-analyze-report";
import axiosInstance from "@/utils/axios";

function PageContainer({ id }: { id: string }) {
  const [tweetAnalyzeReport, setTweetAnalyzeReport] =
    useState<TweetAnalyzeReport | null>(null);

  const [analyzeProgress, setAnalyzeProgress] = useState(0);

  useEffect(() => {
    const fetchTweetAnalyzeReport = async () => {
      const response = await axiosInstance.get<{
        tweetAnalyzeReport: TweetAnalyzeReport;
      }>(`/api/tweet-analyze-report/${id}`);
      const tweetAnalyzeReport = response.data.tweetAnalyzeReport;
      setTweetAnalyzeReport(tweetAnalyzeReport);
      setAnalyzeProgress((prev) => prev + 1);
      if (!tweetAnalyzeReport || tweetAnalyzeReport.status === "processing") {
        setTimeout(fetchTweetAnalyzeReport, 1000);
      }
    };

    fetchTweetAnalyzeReport();
  }, [id]);

  const isProcessing =
    !tweetAnalyzeReport || tweetAnalyzeReport?.status === "processing";

  if (isProcessing) {
    return (
      <div className="mt-32 flex animate-pulse flex-col items-center justify-center gap-8">
        <h1 className="text-4xl font-bold">AI 正在分析中 ...</h1>
        <Progress
          aria-label="分析中..."
          value={analyzeProgress}
          className="max-w-md"
        />
        <div>
          <Image src="/home.png" alt="Main Image" width={720} height={411} />
        </div>
      </div>
    );
  }

  return (
    <div className="mt-32 flex flex-col items-center justify-center gap-8">
      <h1 className="text-4xl font-bold">{tweetAnalyzeReport?.result}</h1>

      {tweetAnalyzeReport?.image && (
        <div>
          <Image
            src={tweetAnalyzeReport.image}
            alt="image"
            width={720}
            height={411}
            className="rounded-lg"
          />
        </div>
      )}
    </div>
  );
}

export default PageContainer;
