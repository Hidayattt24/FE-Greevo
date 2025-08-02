"use client";

import React from "react";
import { MobilePageLayout } from "@/components";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";

export default function NotificationsPage() {
  const router = useRouter();

  // Define notification type
  interface Notification {
    id: number;
    message: string;
    date: string;
  }

  // Sample notification data - you can replace with real data
  const notifications: Notification[] = [
    // Add notifications here when available
  ];

  const hasNotifications = notifications.length > 0;

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
            Notifikasi
          </h1>
        </div>

        {/* Notifications Content */}
        {hasNotifications ? (
          <div className="space-y-4">
            {notifications.map((notification) => (
              <div
                key={notification.id}
                className="flex items-center p-4 text-white"
                style={{
                  width: "364px",
                  height: "72px",
                  borderRadius: "10px",
                  background: "#213813",
                }}
              >
                {/* Logo */}
                <div className="mr-3">
                  <Image
                    src="/logo/logo-4.svg"
                    alt="Notification"
                    width={32}
                    height={32}
                  />
                </div>

                {/* Content */}
                <div className="flex-1">
                  <p className="text-white mb-1" style={{ fontSize: "10px" }}>
                    {notification.message}
                  </p>
                  <p
                    className="text-white font-medium italic"
                    style={{ fontSize: "10px" }}
                  >
                    {notification.date}
                  </p>
                </div>
              </div>
            ))}
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
              Tidak ada notifikasi
            </p>
            <p
              className="text-center mt-2"
              style={{ color: "#d1d5db", fontSize: "14px" }}
            >
              Semua notifikasi akan muncul di sini
            </p>
          </div>
        )}
      </div>
    </MobilePageLayout>
  );
}
