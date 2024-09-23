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
      <div className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-br from-purple-600 to-blue-500 p-4">
        <div className="w-full max-w-4xl overflow-hidden rounded-2xl bg-white shadow-2xl">
          <div className="p-8 sm:p-12">
            <h1 className="mb-6 text-center text-4xl font-bold text-gray-800 sm:text-5xl">
              社群職業大解密
            </h1>
            <p className="mb-8 animate-pulse text-center text-xl text-gray-600 sm:text-2xl">
              AI 正在分析中 ...
            </p>
            <section className="space-y-6">
              <Progress
                aria-label="分析中..."
                value={analyzeProgress}
                className="w-full"
              />
            </section>
          </div>
          <Image
            src="/home.png"
            alt="Main Image"
            width={720}
            height={411}
            className="mx-auto"
          />
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-br from-purple-600 to-blue-500 p-4">
      <div className="w-full max-w-4xl overflow-hidden rounded-2xl bg-white shadow-2xl">
        <div className="p-8 sm:p-12">
          <h1 className="mb-6 text-center text-4xl font-bold text-gray-800 sm:text-5xl">
            社群職業大解密
          </h1>
          <p className="mb-8 text-center text-xl text-gray-600 sm:text-2xl">
            {tweetAnalyzeReport?.result}
          </p>
          <section className="space-y-6">
              <p>{tweetAnalyzeReport?.reason}</p>
          </section>
        </div>
        {tweetAnalyzeReport?.image ? (
          <Image
            src={tweetAnalyzeReport.image}
            alt="image"
            width={720}
            height={411}
            className="rounded-lg mx-auto mb-8"
          />
        ) : (
          <Image
            src="/home.png"
            alt="Main Image"
            width={720}
            height={411}
            className="mx-auto"
          />
        )}
      </div>
    </div>
  );
}

export default PageContainer;
