"use client";

import React from "react";
import { MobileLayout, MobileNavbar } from "@/components";
import { useMobileDetection } from "@/hooks/useMobileDetection";

interface MobilePageLayoutProps {
  children: React.ReactNode;
  title?: string;
  showNavbar?: boolean;
  className?: string;
}

export default function MobilePageLayout({
  children,
  title,
  showNavbar = true,
  className,
}: MobilePageLayoutProps) {
  const { isMobile, isClient } = useMobileDetection();

  return (
    <MobileLayout>
      {isMobile && isClient && (
        <div className={`min-h-screen bg-gray-50 ${className || ""}`}>
          {/* Header */}
          {title && (
            <header className="bg-white shadow-sm border-b border-gray-200 px-4 py-3 safe-area-top">
              <h1 className="text-lg font-semibold text-gray-900 text-center">
                {title}
              </h1>
            </header>
          )}

          {/* Main Content */}
          <main
            className={`flex-1 ${showNavbar ? "pb-28" : "pb-4"} ${
              title ? "pt-0" : "pt-4"
            }`}
          >
            {children}
          </main>

          {/* Mobile Navbar */}
          {showNavbar && <MobileNavbar />}
        </div>
      )}
    </MobileLayout>
  );
}
