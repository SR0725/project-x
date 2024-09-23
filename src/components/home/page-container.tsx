"use client";

import React, { useState } from "react";
import { MdArrowForward } from "react-icons/md";
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
      period: period,
      maxScrapeNumber: maxScrapeNumber,
    });
    router.push(`/analyze/${response.data.id}`);
  };

  return (
    <>
      <div className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-br from-purple-600 to-blue-500 p-4">
        <div className="w-full max-w-4xl overflow-hidden rounded-2xl bg-white shadow-2xl">
          <div className="p-8 sm:p-12">
            <h1 className="mb-6 text-center text-4xl font-bold text-gray-800 sm:text-5xl">
              社群職業大解密
            </h1>
            <p className="mb-8 text-center text-xl text-gray-600 sm:text-2xl">
              找出你被耽誤的真正職業！
            </p>
            <section className="space-y-6">
              <div className="flex flex-col gap-4 sm:flex-row">
                <div className="flex-grow">
                  <Input
                    type="text"
                    label="輸入你的 Twitter 帳號"
                    placeholder="例如：elonmusk"
                    value={twitterUsername}
                    onChange={(e) => setTwitterUsername(e.target.value)}
                  />
                </div>
                <Button
                  type="submit"
                  className="w-full px-6 py-7 text-lg sm:w-auto"
                  onClick={handleAnalyze}
                >
                  揭曉真相 <MdArrowForward className="ml-2" />
                </Button>
              </div>
            </section>
          </div>
          <Image
            src="/home.png"
            alt="Main Image"
            width={720}
            height={411}
            className="mx-auto"
          />

          <div className="flex justify-end pb-2 pr-2">
            <SettingModal
              period={period}
              setPeriod={setPeriod}
              maxScrapeNumber={maxScrapeNumber}
              setMaxScrapeNumber={setMaxScrapeNumber}
            />
          </div>
        </div>
      </div>
    </>
  );
}

export default PageContainer;
