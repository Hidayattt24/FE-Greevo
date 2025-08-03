"use client";

import React from "react";
import { MobilePageLayout } from "@/components";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";

export default function HistoryPage() {
  const router = useRouter();
  const [contributionHistory, setContributionHistory] = useState<
    {
      id: number;
      activityTitle: string;
      exp: number;
      timestamp: string;
      photo: string;
    }[]
  >([]);

  // Load contribution history from localStorage
  useEffect(() => {
    const savedHistory = localStorage.getItem("contributionHistory");
    if (savedHistory) {
      setContributionHistory(JSON.parse(savedHistory));
    }
  }, []);

  // Format relative time function
  const formatRelativeTime = (timestamp: string) => {
    const now = new Date();
    const time = new Date(timestamp);
    const diffInMinutes = Math.floor(
      (now.getTime() - time.getTime()) / (1000 * 60)
    );

    if (diffInMinutes < 1) return "Baru saja";
    if (diffInMinutes < 60) return `${diffInMinutes} menit lalu`;

    const diffInHours = Math.floor(diffInMinutes / 60);
    if (diffInHours < 24) return `${diffInHours} jam lalu`;

    const diffInDays = Math.floor(diffInHours / 24);
    if (diffInDays < 7) return `${diffInDays} hari lalu`;

    return time.toLocaleDateString("id-ID", {
      day: "numeric",
      month: "short",
    });
  };

  const hasContributions = contributionHistory.length > 0;

  return (
    <MobilePageLayout showNavbar={false}>
      <div
        className="p-4 max-w-sm mx-auto"
        style={{ fontFamily: "Poppins, sans-serif" }}
      >
        {/* Header Section */}
        <div
          className="relative flex items-center justify-center mb-8"
          style={{ marginTop: "58px" }}
        >
          <button
            onClick={() => router.back()}
            className="absolute left-0 p-2"
            style={{ marginLeft: "-8px" }}
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M15 18L9 12L15 6"
                stroke="#213813"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
          <h1 className="text-xl font-medium" style={{ color: "#213813" }}>
            Jejak Hijau
          </h1>
        </div>

        {/* History Content */}
        {hasContributions ? (
          <div className="space-y-4">
            {/* Summary Card */}
            <div
              className="p-4 text-white rounded-xl mb-6"
              style={{
                background:
                  "linear-gradient(184deg, #5C754D -3.27%, #213813 143.83%)",
              }}
            >
              <h2 className="text-lg font-semibold mb-2">Total Kontribusi</h2>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-2xl font-bold">
                    {contributionHistory.reduce(
                      (sum, item) => sum + item.exp,
                      0
                    )}{" "}
                    EXP
                  </p>
                  <p className="text-sm opacity-90">
                    {contributionHistory.length} aktivitas selesai
                  </p>
                </div>
                <div className="text-right">
                  <Image
                    src="/logo/logo-7.svg"
                    alt="Achievement"
                    width={40}
                    height={40}
                  />
                </div>
              </div>
            </div>

            {/* History List */}
            <div className="space-y-3">
              <h3
                className="text-lg font-semibold"
                style={{ color: "#213813" }}
              >
                Riwayat Aktivitas
              </h3>
              {contributionHistory.map((contribution, index) => (
                <div
                  key={contribution.id}
                  className="flex items-center p-4 bg-white rounded-xl border border-gray-100 shadow-sm"
                >
                  {/* Icon */}
                  <div className="mr-4">
                    <div
                      className="flex items-center justify-center rounded-full"
                      style={{
                        width: "40px",
                        height: "40px",
                        backgroundColor: "#213813",
                      }}
                    >
                      <Image
                        src="/logo/logo-7.svg"
                        alt="Activity"
                        width={20}
                        height={20}
                      />
                    </div>
                  </div>

                  {/* Content */}
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-1">
                      <h4 className="font-medium" style={{ color: "#213813" }}>
                        {contribution.activityTitle}
                      </h4>
                      <span className="font-bold" style={{ color: "#5C754D" }}>
                        +{contribution.exp} EXP
                      </span>
                    </div>
                    <p className="text-sm text-gray-500">
                      {formatRelativeTime(contribution.timestamp)}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div
            className="flex flex-col items-center justify-center"
            style={{ minHeight: "60vh" }}
          >
            {/* Empty State with Lottie Animation */}
            <div className="mb-6">
              <DotLottieReact
                src="/animation/noData.lottie"
                loop
                autoplay
                style={{ width: "200px", height: "200px" }}
              />
            </div>
            <p
              className="text-center font-medium"
              style={{ color: "#9ca3af", fontSize: "16px" }}
            >
              Belum ada jejak hijau
            </p>
            <p
              className="text-center mt-2"
              style={{ color: "#d1d5db", fontSize: "14px" }}
            >
              Mulai berkontribusi untuk melihat jejak hijau Anda
            </p>
            <button
              onClick={() => router.push("/pages/dashboard/contribution")}
              className="mt-6 px-6 py-3 bg-white font-medium rounded-full border-2"
              style={{
                borderColor: "#213813",
                color: "#213813",
              }}
            >
              Mulai Kontribusi
            </button>
          </div>
        )}
      </div>
    </MobilePageLayout>
  );
}
