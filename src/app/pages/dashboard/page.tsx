"use client";

import React, { useState, useEffect } from "react";
import { MobilePageLayout } from "@/components";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function DashboardPage() {
  const router = useRouter();
  const [currentTime, setCurrentTime] = useState(new Date());
  const [showEXP, setShowEXP] = useState(false);
  const [showBadgeModal, setShowBadgeModal] = useState(false);
  const [isClosing, setIsClosing] = useState(false);
  const [userEXP, setUserEXP] = useState(0);
  const [hasNewNotifications, setHasNewNotifications] = useState(false);
  const [hasNewBadge, setHasNewBadge] = useState(false);

  // Sample data
  const username = "Username";

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  // Load EXP from localStorage
  useEffect(() => {
    const savedEXP = localStorage.getItem("userEXP");
    const savedNotificationStatus = localStorage.getItem("hasNewNotifications");
    const savedBadgeStatus = localStorage.getItem("hasNewBadge");

    if (savedEXP) {
      setUserEXP(parseInt(savedEXP));
    } else {
      // Set dummy initial EXP for testing
      setUserEXP(50);
      localStorage.setItem("userEXP", "50");
    }

    // Load notification status
    if (savedNotificationStatus !== null) {
      setHasNewNotifications(savedNotificationStatus === "true");
    } else {
      // Set initial notification for demo
      setHasNewNotifications(true);
      localStorage.setItem("hasNewNotifications", "true");
    }

    // Load badge status
    if (savedBadgeStatus !== null) {
      setHasNewBadge(savedBadgeStatus === "true");
    }
  }, []);

  // Check for new badge when EXP changes
  useEffect(() => {
    if (userEXP > 0) {
      const savedLastBadgeId = localStorage.getItem("lastBadgeId");
      const currentBadge =
        badges.find(
          (badge) => userEXP >= badge.minEXP && userEXP <= badge.maxEXP
        ) || badges[0];

      if (savedLastBadgeId) {
        const lastBadgeId = parseInt(savedLastBadgeId);
        if (currentBadge.id > lastBadgeId) {
          setHasNewBadge(true);
          localStorage.setItem("hasNewBadge", "true");
        }
      }

      // Update last badge ID
      localStorage.setItem("lastBadgeId", currentBadge.id.toString());
    }
  }, [userEXP]);

  // Update EXP when page becomes visible (when user returns from contribution page)
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (!document.hidden) {
        const savedEXP = localStorage.getItem("userEXP");
        if (savedEXP) {
          const newEXP = parseInt(savedEXP);
          const currentBadge = getCurrentBadge();
          const newBadge =
            badges.find(
              (badge) => newEXP >= badge.minEXP && newEXP <= badge.maxEXP
            ) || badges[0];

          // Check if user earned a new badge
          if (newBadge.id > currentBadge.id) {
            setHasNewBadge(true);
          }

          setUserEXP(newEXP);
        }
      }
    };

    const handleFocus = () => {
      // Also update when window gets focus (user returns to tab)
      const savedEXP = localStorage.getItem("userEXP");
      if (savedEXP) {
        const newEXP = parseInt(savedEXP);
        const currentBadge = getCurrentBadge();
        const newBadge =
          badges.find(
            (badge) => newEXP >= badge.minEXP && newEXP <= badge.maxEXP
          ) || badges[0];

        // Check if user earned a new badge
        if (newBadge.id > currentBadge.id) {
          setHasNewBadge(true);
        }

        setUserEXP(newEXP);
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);
    window.addEventListener("focus", handleFocus);

    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      window.removeEventListener("focus", handleFocus);
    };
  }, []);

  // Polling untuk update data secara berkala
  useEffect(() => {
    const interval = setInterval(() => {
      const savedEXP = localStorage.getItem("userEXP");
      if (savedEXP && parseInt(savedEXP) !== userEXP) {
        const newEXP = parseInt(savedEXP);
        const currentBadge = getCurrentBadge();
        const newBadge =
          badges.find(
            (badge) => newEXP >= badge.minEXP && newEXP <= badge.maxEXP
          ) || badges[0];

        // Check if user earned a new badge
        if (newBadge.id > currentBadge.id) {
          setHasNewBadge(true);
        }

        setUserEXP(newEXP);
      }
    }, 1000); // Check every second

    return () => clearInterval(interval);
  }, [userEXP]);

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

  // Badge system configuration
  const badges = [
    { id: 1, name: "Hijau Muda", minEXP: 0, maxEXP: 100, color: "#4CAF50" },
    { id: 2, name: "Pemula Eco", minEXP: 101, maxEXP: 300, color: "#2196F3" },
    {
      id: 3,
      name: "Penggerak Hijau",
      minEXP: 301,
      maxEXP: 600,
      color: "#9C27B0",
    },
    {
      id: 4,
      name: "Pahlawan Bumi",
      minEXP: 601,
      maxEXP: 1000,
      color: "#FF9800",
    },
    {
      id: 5,
      name: "Legenda Greevo",
      minEXP: 1001,
      maxEXP: Infinity,
      color: "#8B4513",
    },
  ];

  // Get current user badge
  const getCurrentBadge = () => {
    return (
      badges.find(
        (badge) => userEXP >= badge.minEXP && userEXP <= badge.maxEXP
      ) || badges[0]
    );
  };

  // Handle badge modal close with animation
  const handleCloseBadgeModal = () => {
    setIsClosing(true);
    // Mark badge as seen when modal is opened
    setHasNewBadge(false);
    setTimeout(() => {
      setShowBadgeModal(false);
      setIsClosing(false);
    }, 300);
  };

  // Handle notification click
  const handleNotificationClick = () => {
    setHasNewNotifications(false); // Mark notifications as seen
    localStorage.setItem("hasNewNotifications", "false");
    router.push("/pages/dashboard/notifications");
  };

  // Handle badge click
  const handleBadgeClick = () => {
    setHasNewBadge(false); // Mark badge as seen
    localStorage.setItem("hasNewBadge", "false");
    setShowBadgeModal(true);
  };

  // Check if badge is earned
  const isBadgeEarned = (badgeIndex: number) => {
    const badge = badges[badgeIndex];
    return userEXP >= badge.minEXP;
  };

  // Simulasi notifikasi baru setelah beberapa waktu untuk demo
  useEffect(() => {
    const timer = setTimeout(() => {
      // Hanya set notifikasi baru jika belum ada
      const currentNotificationStatus = localStorage.getItem(
        "hasNewNotifications"
      );
      if (currentNotificationStatus !== "true") {
        setHasNewNotifications(true);
        localStorage.setItem("hasNewNotifications", "true");
      }
    }, 30000); // 30 seconds untuk demo

    return () => clearTimeout(timer);
  }, []);

  return (
    <MobilePageLayout showNavbar={true}>
      <div
        className="p-4 space-y-4 max-w-sm mx-auto"
        style={{ fontFamily: "Poppins, sans-serif" }}
      >
        {/* Header Section */}
        <div className="flex items-start justify-between mb-6">
          {/* Notification Icon */}
          <button
            onClick={handleNotificationClick}
            className="relative flex items-center justify-center"
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
            {/* Red notification dot */}
            {hasNewNotifications && (
              <div
                className="absolute bg-red-500 rounded-full animate-pulse"
                style={{
                  width: "10px",
                  height: "10px",
                  top: "4px",
                  right: "4px",
                  border: "2px solid white",
                  boxShadow: "0 2px 4px rgba(0,0,0,0.2)",
                }}
              />
            )}
          </button>

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
              {/* Badge Logo - Dynamic based on user's highest earned badge */}
              <button
                onClick={handleBadgeClick}
                className="absolute -bottom-2 -right-2 transition-transform active:scale-95"
                style={{ width: "32px", height: "32px" }}
              >
                <Image
                  src={`/pages/dashboard/lencana-${getCurrentBadge().id}.svg`}
                  alt="Lencana"
                  width={32}
                  height={32}
                  className="drop-shadow-lg"
                />
                {/* Red badge notification dot */}
                {hasNewBadge && (
                  <div
                    className="absolute bg-red-500 rounded-full animate-pulse"
                    style={{
                      width: "8px",
                      height: "8px",
                      top: "-2px",
                      right: "-2px",
                      border: "1px solid white",
                      boxShadow: "0 2px 4px rgba(0,0,0,0.2)",
                    }}
                  />
                )}
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
            <h2
              className={`text-4xl font-bold transition-all duration-500 ${
                showEXP ? "opacity-100" : "opacity-100"
              }`}
            >
              {showEXP ? `EXP ${userEXP}` : "EXP ****"}
            </h2>
            {/* Hide/Show EXP Button - positioned inline with EXP text */}
            <button
              onClick={() => setShowEXP(!showEXP)}
              className="text-white ml-4 transition-transform active:scale-95"
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
            onClick={() => router.push("/pages/dashboard/history")}
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
          <button
            onClick={() => router.push("/pages/dashboard/contribution")}
            className="relative p-4 text-white flex flex-col justify-between flex-1 text-left"
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
          </button>

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
            <button
              onClick={() => router.push("/pages/dashboard/history")}
              className="text-sm text-white underline opacity-80 hover:opacity-100"
            >
              Lihat Detail →
            </button>
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
                  strokeDasharray={`${
                    Math.min(userEXP / 2000, 1) * 408.4
                  } 408.4`}
                  strokeLinecap="round"
                />
              </svg>
              <div
                className="absolute inset-0 flex items-center justify-center text-4xl font-bold"
                style={{ color: "#213813" }}
              >
                {Math.floor(userEXP / 20)}
              </div>
            </div>
          </div>
        </div>

        {/* Badge Modal */}
        {showBadgeModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-end justify-center">
            <div
              className={`bg-white w-full mx-4 mb-4 rounded-t-3xl transition-all duration-300 ease-out transform flex flex-col ${
                isClosing
                  ? "translate-y-full opacity-0"
                  : "translate-y-0 opacity-100"
              }`}
              style={{
                maxWidth: "390px",
                height: "80vh",
                animation: isClosing
                  ? "slideDown 0.3s ease-out"
                  : "slideUp 0.3s ease-out",
              }}
            >
              {/* Header */}
              <div className="flex justify-between items-center p-6 border-b border-gray-200 flex-shrink-0">
                <h3
                  className="text-xl font-semibold"
                  style={{ color: "#213813" }}
                >
                  Lencana
                </h3>
                <button
                  onClick={handleCloseBadgeModal}
                  className="p-2 rounded-full hover:bg-gray-100 transition-colors"
                  style={{ color: "#213813" }}
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

              {/* Scrollable Content */}
              <div className="flex-1 overflow-y-auto">
                {/* Badge Grid */}
                <div className="p-6">
                  <div className="grid grid-cols-2 gap-8 justify-items-center">
                    {badges.map((badge, index) => (
                      <div
                        key={badge.id}
                        className="flex flex-col items-center"
                        style={{
                          width: "132px",
                          minHeight: "180px",
                        }}
                      >
                        {/* Badge Image Container */}
                        <div className="relative mb-3">
                          <Image
                            src={`/pages/dashboard/lencana-${badge.id}.svg`}
                            alt={badge.name}
                            width={80}
                            height={80}
                            className={`transition-all duration-300 ${
                              isBadgeEarned(index)
                                ? "opacity-100 saturate-100"
                                : "opacity-50 saturate-0 grayscale"
                            }`}
                          />
                          {/* Badge Achievement Indicator */}
                          {isBadgeEarned(index) && (
                            <div className="absolute -top-2 -right-2 bg-green-500 rounded-full p-1">
                              <svg
                                width="16"
                                height="16"
                                viewBox="0 0 24 24"
                                fill="white"
                              >
                                <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
                              </svg>
                            </div>
                          )}
                        </div>

                        {/* Badge Name */}
                        <h4
                          className={`text-sm font-medium text-center mb-1 ${
                            isBadgeEarned(index)
                              ? "text-gray-900"
                              : "text-gray-400"
                          }`}
                          style={{
                            fontSize: "12px",
                            color: isBadgeEarned(index) ? "#213813" : "#9CA3AF",
                          }}
                        >
                          {badge.name}
                        </h4>

                        {/* EXP Range */}
                        <p
                          className={`text-xs text-center mb-2 ${
                            isBadgeEarned(index)
                              ? "text-gray-600"
                              : "text-gray-400"
                          }`}
                          style={{ fontSize: "10px" }}
                        >
                          {badge.minEXP === 0
                            ? `0-${badge.maxEXP} EXP`
                            : badge.maxEXP === Infinity
                            ? `${badge.minEXP}+ EXP`
                            : `${badge.minEXP}-${badge.maxEXP} EXP`}
                        </p>

                        {/* Progress Bar for Current Badge */}
                        {getCurrentBadge().id === badge.id &&
                          userEXP < badge.maxEXP && (
                            <div className="w-full mt-4">
                              <div className="bg-gray-200 rounded-full h-1.5">
                                <div
                                  className="bg-green-500 h-1.5 rounded-full transition-all duration-500"
                                  style={{
                                    width: `${Math.min(
                                      ((userEXP - badge.minEXP) /
                                        (badge.maxEXP - badge.minEXP)) *
                                        100,
                                      100
                                    )}%`,
                                  }}
                                />
                              </div>
                            </div>
                          )}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Add CSS for animations */}
        <style jsx>{`
          @keyframes slideUp {
            from {
              transform: translateY(100%);
              opacity: 0;
            }
            to {
              transform: translateY(0);
              opacity: 1;
            }
          }

          @keyframes slideDown {
            from {
              transform: translateY(0);
              opacity: 1;
            }
            to {
              transform: translateY(100%);
              opacity: 0;
            }
          }
        `}</style>
      </div>
    </MobilePageLayout>
  );
}
