"use client";

import React from "react";
import { MobilePageLayout } from "@/components";

export default function TrashScannerPage() {
  return (
    <MobilePageLayout showNavbar={true} title="">
      <div className="min-h-screen flex flex-col items-center justify-center p-6 bg-white">
        {/* Animated Logo */}
        <div className="mb-8 relative">
          <div className="w-32 h-32 relative animate-bounce">
            <img
              src="/logo/logo-1.svg"
              alt="Greevo Logo"
              className="w-full h-full animate-pulse"
            />
          </div>

          {/* Floating particles */}
          <div
            className="absolute -top-2 -right-2 w-4 h-4 rounded-full animate-ping"
            style={{ backgroundColor: "#375E20" }}
          ></div>
          <div
            className="absolute -bottom-2 -left-2 w-3 h-3 rounded-full animate-ping"
            style={{ backgroundColor: "#375E20", animationDelay: "1s" }}
          ></div>
          <div
            className="absolute top-4 -left-4 w-2 h-2 rounded-full animate-ping"
            style={{ backgroundColor: "#375E20", animationDelay: "2s" }}
          ></div>
        </div>

        {/* Coming Soon Badge */}
        <div className="mb-6">
          <span
            className="px-6 py-3 text-white text-sm font-semibold rounded-full shadow-lg animate-pulse"
            style={{ backgroundColor: "#375E20" }}
          >
            🔬 Segera Hadir
          </span>
        </div>

        {/* Title */}
        <h1
          className="text-3xl font-bold text-center mb-4"
          style={{ color: "#375E20" }}
        >
          Scanner Sampah AI
        </h1>

        {/* Description */}
        <div className="text-center max-w-md mx-auto mb-8">
          <p className="text-lg mb-6" style={{ color: "#375E20" }}>
            Teknologi AI canggih untuk mengidentifikasi dan mengklasifikasi
            sampah dengan akurat
          </p>
        </div>

        {/* Notification CTA */}
        <div className="mt-4">
          <button
            className="px-8 py-4 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
            style={{ backgroundColor: "#375E20" }}
          >
            🔔 Beritahu Saya Saat Tersedia
          </button>
        </div>
      </div>
    </MobilePageLayout>
  );
}
