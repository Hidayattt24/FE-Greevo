"use client";

import { useMobileDetection } from "@/hooks/useMobileDetection";
import { MobileLayoutProps } from "@/types";
import Image from "next/image";

export default function MobileLayout({ children }: MobileLayoutProps) {
  const { isMobile, isClient } = useMobileDetection();

  // Prevent hydration mismatch by not rendering anything until client-side
  if (!isClient) {
    return <>{children}</>;
  }

  if (!isMobile) {
    return (
      <div className="min-h-screen relative">
        {/* Background Image Layer */}
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: "url('/assets/welcome/only-mobile.svg')",
          }}
        />

        {/* Gradient Overlay */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(178deg, rgba(217, 217, 217, 0.00) -43.16%, rgba(33, 56, 19, 0.83) 98.45%)",
          }}
        />

        {/* Content Layer */}
        <div className="relative z-10 flex flex-col min-h-screen p-8">
          {/* Main Content - Centered */}
          <div className="flex-1 flex items-center justify-center">
            <div className="text-center text-white w-full">
              <h1
                className="mb-6"
                style={{
                  color: "#FFF",
                  textAlign: "center",
                  fontFamily: "Poppins",
                  fontSize: "36px",
                  fontStyle: "normal",
                  fontWeight: 600,
                  lineHeight: "normal",
                }}
              >
                Greevo hanya tersedia di perangkat mobile.
              </h1>
              <p
                style={{
                  color: "#FFF",
                  textAlign: "center",
                  fontFamily: "Poppins",
                  fontSize: "20px",
                  fontStyle: "normal",
                  fontWeight: 500,
                  lineHeight: "normal",
                }}
              >
                Silakan akses situs ini melalui smartphone Anda untuk pengalaman
                terbaik.
              </p>
            </div>
          </div>

          {/* Footer Logo */}
          <div className="flex justify-center pb-11">
            <Image
              src="/logo/logo-6.svg"
              alt="Greevo Logo"
              width={180}
              height={86}
            />
          </div>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}
