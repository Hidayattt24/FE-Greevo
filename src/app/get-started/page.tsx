"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import ProgressBar from "@/components/ProgressBar";
import { slides, ROUTES, TIMING } from "@/lib/constants";
import { SlideData } from "@/types";

export default function GetStarted() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const router = useRouter();

  // Auto-advance slides with looping
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => {
        // Loop back to first slide after last slide
        return prev < slides.length - 1 ? prev + 1 : 0;
      });
    }, TIMING.SLIDE_AUTO_DURATION);

    // Cleanup timer on component unmount
    return () => clearInterval(timer);
  }, []);

  const nextSlide = () => {
    router.push(ROUTES.AUTHENTICATION);
  };

  const currentSlideData = slides[currentSlide];

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src={currentSlideData.image}
          alt={`Get Started ${currentSlide + 1}`}
          fill
          className="object-cover"
          priority
        />
        {/* Gradient Overlay */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(178deg, rgba(217, 217, 217, 0.00) -83.19%, rgba(33, 56, 19, 0.83) 98.9%)",
          }}
        />
      </div>

      {/* Content */}
      <div className="relative z-10 flex flex-col min-h-screen">
        {/* Header with Progress Bar */}
        <div className="pt-16 px-6">
          <ProgressBar currentStep={currentSlide} totalSteps={slides.length} />
        </div>

        {/* Main Content */}
        <div className="flex-1 flex flex-col justify-end pb-32 px-6">
          <div className="text-white text-left">
            <h1 className="text-2xl font-semibold mb-4 leading-tight">
              {currentSlideData.title}
            </h1>
            <p className="text-base font-light opacity-90 leading-relaxed">
              {currentSlideData.description}
            </p>
          </div>
        </div>

        {/* Footer with Next Button */}
        <div className="pb-12 px-6">
          <div className="flex justify-center">
            <button
              onClick={nextSlide}
              className="bg-white flex items-center justify-between px-4 shadow-lg active:scale-95 transition-transform relative"
              style={{
                width: "400px",
                height: "44px",
                borderRadius: "20px",
              }}
              aria-label="Get started"
            >
              <div
                className="flex items-center justify-center"
                style={{
                  width: "35px",
                  height: "35px",
                  backgroundColor: "#213813",
                  borderRadius: "50%",
                  flexShrink: 0,
                }}
              >
                <span
                  className="material-symbols-outlined text-white text-lg"
                  style={{ fontSize: "18px" }}
                >
                  arrow_outward
                </span>
              </div>
              <span
                className="font-medium absolute left-1/2 transform -translate-x-1/2"
                style={{
                  color: "rgba(33, 56, 19, 1)",
                  fontSize: "16px",
                }}
              >
                Ayo mulai perjalanan
              </span>
              <div style={{ width: "35px", height: "35px" }}></div>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
