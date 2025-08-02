"use client";

import React, { useState, useEffect } from "react";
import { MobilePageLayout } from "@/components";
import Image from "next/image";

export default function DashboardPage() {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [showEXP, setShowEXP] = useState(false);
  const [showBadgeModal, setShowBadgeModal] = useState(false);

  // Sample data
  const username = "Username";
  const currentEXP = 0;
  const totalContribution = 0;

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString("id-ID", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    });
  };

  const formatDay = (date: Date) => {
    return date.toLocaleDateString("id-ID", { weekday: "long" });
  };

  const formatMonth = (date: Date) => {
    return date.toLocaleDateString("id-ID", { month: "short" }).toUpperCase();
  };

  return (
    <MobilePageLayout showNavbar={true}>
      <div
        className="p-4 space-y-4 max-w-sm mx-auto"
        style={{ fontFamily: "Poppins, sans-serif" }}
      >
        {/* Header Section */}
        <div className="flex items-start justify-between mb-6">
          {/* Notification Icon */}
          <div
            className="flex items-center justify-center"
            style={{
              width: "46px",
              height: "46px",
              backgroundColor: "#213813",
              borderRadius: "50%",
            }}
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M12 22c1.1 0 2-.9 2-2h-4c0 1.1.89 2 2 2zm6-6v-5c0-3.07-1.64-5.64-4.5-6.32V4c0-.83-.67-1.5-1.5-1.5s-1.5.67-1.5 1.5v.68C7.63 5.36 6 7.92 6 11v5l-2 2v1h16v-1l-2-2z"
                fill="white"
              />
            </svg>
          </div>

          {/* Profile Section */}
          <div className="relative">
            {/* Profile Photo */}
            <div className="relative" style={{ width: "76px", height: "76px" }}>
              <Image
                src="/pages/dashboard/foto-profile.svg"
                alt="Profile"
                width={76}
                height={76}
                className="rounded-full"
              />
              {/* Badge Logo */}
              <button
                onClick={() => setShowBadgeModal(true)}
                className="absolute -bottom-2 -right-2"
                style={{ width: "32px", height: "32px" }}
              >
                <Image
                  src="/pages/dashboard/logo-lencana.svg"
                  alt="Lencana"
                  width={32}
                  height={32}
                />
              </button>
            </div>
          </div>
        </div>

        {/* Welcome Text */}
        <div className="space-y-1">
          <h1 className="text-xl font-medium" style={{ color: "#213813" }}>
            Hai ! {username}
          </h1>
          <p className="text-sm font-medium" style={{ color: "#606060" }}>
            aksi kecil, dampak besar, bareng greevo!
          </p>
        </div>

        {/* EXP Balance Card */}
        <div
          className="relative p-6 text-white w-full"
          style={{
            height: "152px",
            borderRadius: "15px",
            background:
              "linear-gradient(184deg, #5C754D -3.27%, #213813 143.83%)",
          }}
        >
          <p className="text-sm font-normal mb-2">Jumlah saldo EXP terkumpul</p>
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-4xl font-bold">
              {showEXP ? `EXP ${currentEXP}` : "EXP ****"}
            </h2>
            {/* Hide/Show EXP Button - positioned inline with EXP text */}
            <button
              onClick={() => setShowEXP(!showEXP)}
              className="text-white ml-4"
            >
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                {showEXP ? (
                  <path
                    d="M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z"
                    fill="white"
                  />
                ) : (
                  <path
                    d="M12 7c2.76 0 5 2.24 5 5 0 .65-.13 1.26-.36 1.83l2.92 2.92c1.51-1.26 2.7-2.89 3.43-4.75-1.73-4.39-6-7.5-11-7.5-1.4 0-2.74.25-3.98.7l2.16 2.16C10.74 7.13 11.35 7 12 7zM2 4.27l2.28 2.28.46.46C3.08 8.3 1.78 10.02 1 12c1.73 4.39 6 7.5 11 7.5 1.55 0 3.03-.3 4.38-.84l.42.42L19.73 22 21 20.73 3.27 3 2 4.27zM7.53 9.8l1.55 1.55c-.05.21-.08.43-.08.65 0 1.66 1.34 3 3 3 .22 0 .44-.03.65-.08l1.55 1.55c-.67.33-1.41.53-2.2.53-2.76 0-5-2.24-5-5 0-.79.2-1.53.53-2.2zm4.31-.78l3.15 3.15.02-.16c0-1.66-1.34-3-3-3l-.17.01z"
                    fill="white"
                  />
                )}
              </svg>
            </button>
          </div>
          <button
            className="w-full bg-white font-medium flex items-center justify-center"
            style={{
              height: "33px",
              borderRadius: "20px",
              color: "#213813",
            }}
          >
            Jejak hijau
          </button>
        </div>

        {/* Two Cards Section */}
        <div className="flex space-x-4">
          {/* Contribution Card */}
          <div
            className="relative p-4 text-white flex flex-col justify-between flex-1"
            style={{
              height: "152px",
              borderRadius: "15px",
              background: "linear-gradient(180deg, #5C754D 0%, #213813 100%)",
            }}
          >
            <div>
              <h3 className="text-lg font-medium italic mb-8">
                Ayo
                <br />
                Kontribusi
              </h3>
            </div>
            <div className="flex justify-end">
              <div
                className="flex items-center justify-center"
                style={{
                  width: "39px",
                  height: "39px",
                  backgroundColor: "rgba(255,255,255,0.2)",
                  borderRadius: "50%",
                }}
              >
                <span
                  className="material-symbols-outlined text-white"
                  style={{ fontSize: "20px" }}
                >
                  arrow_outward
                </span>
              </div>
            </div>
          </div>

          {/* Time Card */}
          <div
            className="p-4 flex flex-col justify-center items-center text-center flex-1"
            style={{
              height: "152px",
              borderRadius: "15px",
              border: "4px solid #213813",
              backgroundColor: "transparent",
            }}
          >
            <p
              className="font-medium italic mb-2"
              style={{
                fontSize: "12px",
                color: "#213813",
              }}
            >
              {formatDay(currentTime)}
            </p>
            <h2
              className="font-medium mb-1"
              style={{
                fontSize: "40px",
                color: "#213813",
                lineHeight: "1",
              }}
            >
              {formatTime(currentTime)}
            </h2>
            <p
              className="font-medium italic"
              style={{
                fontSize: "48px",
                color: "#213813",
                lineHeight: "1",
              }}
            >
              {formatMonth(currentTime)}
            </p>
          </div>
        </div>

        {/* Total Contribution Card */}
        <div
          className="relative p-6 text-white flex items-center justify-between w-full"
          style={{
            height: "201px",
            borderRadius: "15px",
            background: "linear-gradient(180deg, #5C754D 9.45%, #213813 100%)",
          }}
        >
          <div>
            <h3
              className="font-medium italic mb-4"
              style={{ fontSize: "24px" }}
            >
              Total
              <br />
              Kontribusi
            </h3>
          </div>
          <div className="relative">
            {/* Circular Progress Bar */}
            <div
              className="relative flex items-center justify-center"
              style={{ width: "143px", height: "143px" }}
            >
              <svg className="transform -rotate-90" width="143" height="143">
                <circle
                  cx="71.5"
                  cy="71.5"
                  r="65"
                  stroke="rgba(255,255,255,0.2)"
                  strokeWidth="8"
                  fill="transparent"
                />
                <circle
                  cx="71.5"
                  cy="71.5"
                  r="65"
                  stroke="#213813"
                  strokeWidth="8"
                  fill="transparent"
                  strokeDasharray={`${(totalContribution / 100) * 408.4} 408.4`}
                  strokeLinecap="round"
                />
              </svg>
              <div
                className="absolute inset-0 flex items-center justify-center text-4xl font-bold"
                style={{ color: "#213813" }}
              >
                {totalContribution}
              </div>
            </div>
          </div>
        </div>

        {/* Badge Modal */}
        {showBadgeModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg p-6 w-full max-w-sm mx-4">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold">Lencana Anda</h3>
                <button
                  onClick={() => setShowBadgeModal(false)}
                  className="text-gray-500"
                >
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                    <path
                      d="M18 6L6 18M6 6l12 12"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                    />
                  </svg>
                </button>
              </div>
              <div className="grid grid-cols-3 gap-4">
                {[1, 2, 3, 4, 5].map((badge, index) => (
                  <div key={badge} className="text-center">
                    <Image
                      src={`/pages/dashboard/lencana-${badge}.svg`}
                      alt={`Lencana ${badge}`}
                      width={60}
                      height={60}
                      className={currentEXP < badge * 100 ? "grayscale" : ""}
                    />
                    <p className="text-xs mt-1">Level {badge}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </MobilePageLayout>
  );
}
