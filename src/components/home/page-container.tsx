"use client";

import React, { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Button, Input } from "@nextui-org/react";
import axiosInstance from "@/utils/axios";
import SettingModal from "./setting-modal";

function PageContainer() {
  const [period, setPeriod] = useState<number>(7);
  const [maxScrapeNumber, setMaxScrapeNumber] = useState<number>(100);
  const [twitterUsername, setTwitterUsername] = useState<string>("");
  const router = useRouter();

  const handleAnalyze = async () => {
    const response = await axiosInstance.post("/api/tweet-analyze-report", {
      username: twitterUsername,
      period: 7,
      maxScrapeNumber: 100,
    });
    router.push(`/analyze/${response.data.id}`);
  };

  return (
    <>
      <div className="mt-32 flex flex-col items-center justify-center gap-8">
        <h1 className="text-4xl font-bold">
          社群職業大解密：找出你被耽誤的真正職業！
        </h1>
        <div className="w-full max-w-[720px]">
          <Input
            type="text"
            label="輸入你的 Twitter 帳號"
            placeholder="例如：elonmusk"
            value={twitterUsername}
            onChange={(e) => setTwitterUsername(e.target.value)}
          />
        </div>
        <div className="flex gap-8">
          <Button onClick={handleAnalyze}>Analyze</Button>
          <SettingModal
            period={period}
            setPeriod={setPeriod}
            maxScrapeNumber={maxScrapeNumber}
            setMaxScrapeNumber={setMaxScrapeNumber}
          />
        </div>
        <div>
          <Image src="/home.png" alt="Main Image" width={720} height={411} />
        </div>
      </div>
    </>
  );
}

export default PageContainer;
