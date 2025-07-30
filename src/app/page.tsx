"use client";

import Image from "next/image";
import { useSplashScreen } from "@/hooks/useSplashScreen";

export default function Home() {
  const { isTransitioning } = useSplashScreen();

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center bg-gradient-to-br from-green-50 to-white transition-all duration-500 ease-out ${
        isTransitioning ? "opacity-0 scale-95" : "opacity-100 scale-100"
      }`}
    >
      <div className="text-center">
        <div className="animate-logo-entrance">
          <Image
            src="/logo/logo-2.svg"
            alt="Greevo Logo"
            width={200}
            height={200}
            className="mx-auto"
          />
        </div>
      </div>

      <style jsx global>{`
        @keyframes logo-entrance {
          0% {
            transform: scale(0.3);
            opacity: 0;
          }
          50% {
            transform: scale(1.1);
            opacity: 0.8;
          }
          100% {
            transform: scale(1);
            opacity: 1;
          }
        }

        .animate-logo-entrance {
          animation: logo-entrance 1.2s cubic-bezier(0.34, 1.56, 0.64, 1)
            forwards;
        }
      `}</style>
    </div>
  );
}
