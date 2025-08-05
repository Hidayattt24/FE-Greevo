"use client";

import React, { useState, useRef, useEffect } from "react";
import { MobilePageLayout } from "@/components";
import Image from "next/image";
import { useRouter } from "next/navigation";
import confetti from "canvas-confetti";

export default function ContributionPage() {
  const router = useRouter();
  const [showFAQOverlay, setShowFAQOverlay] = useState(false);
  const [isClosing, setIsClosing] = useState(false);
  const [showCameraOverlay, setShowCameraOverlay] = useState(false);
  const [isCameraClosing, setIsCameraClosing] = useState(false);
  const [selectedActivity, setSelectedActivity] = useState<{
    id: number;
    title: string;
    exp: number;
    icon: string;
  } | null>(null);
  const [stream, setStream] = useState<MediaStream | null>(null);
  const [capturedPhoto, setCapturedPhoto] = useState<string | null>(null);
  const [isCapturing, setIsCapturing] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Sample data - replace with actual backend data
  const username = "Username";

  // Handle closing with animation
  const handleCloseOverlay = () => {
    setIsClosing(true);
    setTimeout(() => {
      setShowFAQOverlay(false);
      setIsClosing(false);
    }, 300); // Match animation duration
  };

  // Handle camera overlay closing with animation
  const handleCloseCameraOverlay = () => {
    setIsCameraClosing(true);
    // Stop camera stream
    if (stream) {
      stream.getTracks().forEach((track) => track.stop());
      setStream(null);
    }
    setCapturedPhoto(null);
    setTimeout(() => {
      setShowCameraOverlay(false);
      setIsCameraClosing(false);
      setSelectedActivity(null);
    }, 300);
  };

  // Start camera when overlay opens
  const startCamera = async () => {
    try {
      const mediaStream = await navigator.mediaDevices.getUserMedia({
        video: {
          facingMode: "environment", // Use back camera on mobile
          width: { ideal: 1280 },
          height: { ideal: 720 },
        },
      });
      setStream(mediaStream);
      if (videoRef.current) {
        videoRef.current.srcObject = mediaStream;
      }
    } catch (error) {
      console.error("Error accessing camera:", error);
      alert(
        "Tidak dapat mengakses kamera. Pastikan browser memiliki izin kamera."
      );
    }
  };

  // Capture photo from video stream
  const capturePhoto = () => {
    if (!videoRef.current || !canvasRef.current) return;

    setIsCapturing(true);
    const video = videoRef.current;
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");

    if (context) {
      // Set canvas dimensions to match video
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;

      // Draw video frame to canvas
      context.drawImage(video, 0, 0, canvas.width, canvas.height);

      // Convert to data URL
      const photoDataUrl = canvas.toDataURL("image/jpeg", 0.8);
      setCapturedPhoto(photoDataUrl);

      // Add camera flash effect
      setTimeout(() => setIsCapturing(false), 200);
    }
  };

  // Handle activity card click
  const handleActivityClick = (activity: {
    id: number;
    title: string;
    exp: number;
    icon: string;
  }) => {
    setSelectedActivity(activity);
    setShowCameraOverlay(true);
  };

  // Effect to start camera when overlay opens
  useEffect(() => {
    if (showCameraOverlay && !stream) {
      startCamera();
    }
  }, [showCameraOverlay]);

  // Cleanup camera stream on unmount
  useEffect(() => {
    return () => {
      if (stream) {
        stream.getTracks().forEach((track) => track.stop());
      }
    };
  }, [stream]);

  // Handle confetti animation
  const triggerConfetti = () => {
    const defaults = {
      spread: 360,
      ticks: 50,
      gravity: 0,
      decay: 0.94,
      startVelocity: 30,
      colors: ["#FFE400", "#FFBD00", "#E89400", "#FFCA6C", "#FDFFB8"],
    };

    const shoot = () => {
      confetti({
        ...defaults,
        particleCount: 40,
        scalar: 1.2,
        shapes: ["star"],
      });

      confetti({
        ...defaults,
        particleCount: 10,
        scalar: 0.75,
        shapes: ["circle"],
      });
    };

    setTimeout(shoot, 0);
    setTimeout(shoot, 100);
    setTimeout(shoot, 200);
  };

  // Handle photo capture success
  const handlePhotoSuccess = () => {
    if (!capturedPhoto || !selectedActivity) {
      alert("Silakan ambil foto terlebih dahulu!");
      return;
    }

    // Add EXP to localStorage for testing
    const currentEXP = parseInt(localStorage.getItem("userEXP") || "0");
    const newEXP = currentEXP + selectedActivity.exp;
    localStorage.setItem("userEXP", newEXP.toString());

    // Add to contribution history
    const contributionHistory = JSON.parse(
      localStorage.getItem("contributionHistory") || "[]"
    );
    const newContribution = {
      id: Date.now(),
      activityTitle: selectedActivity.title,
      exp: selectedActivity.exp,
      timestamp: new Date().toISOString(),
      photo: capturedPhoto,
    };
    contributionHistory.unshift(newContribution); // Add to beginning
    localStorage.setItem(
      "contributionHistory",
      JSON.stringify(contributionHistory)
    );

    triggerConfetti();
    // Stop camera stream
    if (stream) {
      stream.getTracks().forEach((track) => track.stop());
      setStream(null);
    }

    setTimeout(() => {
      handleCloseCameraOverlay();
      // Show success message
      alert(
        `Selamat! Anda mendapat +${selectedActivity.exp} EXP dari aktivitas "${selectedActivity.title}"`
      );
      // Here you can send the photo to backend
      console.log("Photo captured for activity:", selectedActivity.title);
      console.log("Photo data:", capturedPhoto);
      console.log("EXP earned:", selectedActivity.exp);
    }, 2000); // Show confetti for 2 seconds before closing
  };

  // Retry photo capture
  const retryPhoto = () => {
    setCapturedPhoto(null);
    // Camera stream should still be active, no need to restart
  };

  // EXP activities data
  const activities = [
    {
      id: 1,
      exp: 10,
      title: "Buang Sampah",
      icon: "/logo/logo-7.svg",
    },
    {
      id: 2,
      exp: 15,
      title: "Pakai Tumbler",
      icon: "/logo/logo-7.svg",
    },
    {
      id: 3,
      exp: 20,
      title: "Tanam tanaman",
      icon: "/logo/logo-7.svg",
    },
    {
      id: 4,
      exp: 10,
      title: "Belanja tanpa plastik",
      icon: "/logo/logo-7.svg",
    },
    {
      id: 5,
      exp: 50,
      title: "Jalan kaki atau bersepeda",
      icon: "/logo/logo-7.svg",
    },
    {
      id: 6,
      exp: 40,
      title: "Gunakan transportasi umum",
      icon: "/logo/logo-7.svg",
    },
  ];

  return (
    <MobilePageLayout showNavbar={false}>
      <style jsx>{`
        @keyframes slideUpCurve {
          0% {
            transform: translateY(100%) scale(0.95);
            opacity: 0;
          }
          50% {
            transform: translateY(-10px) scale(1.02);
            opacity: 0.8;
          }
          100% {
            transform: translateY(0) scale(1);
            opacity: 1;
          }
        }

        @keyframes cameraFlash {
          0% {
            opacity: 0;
          }
          50% {
            opacity: 0.8;
          }
          100% {
            opacity: 0;
          }
        }

        .camera-flash {
          animation: cameraFlash 0.2s ease-out;
        }

        @keyframes captureButton {
          0% {
            transform: scale(1);
          }
          50% {
            transform: scale(0.95);
          }
          100% {
            transform: scale(1);
          }
        }

        .capture-animation {
          animation: captureButton 0.2s ease-out;
        }
      `}</style>
      <div
        className="p-4 max-w-sm mx-auto"
        style={{ fontFamily: "Poppins, sans-serif" }}
      >
        {/* Header Section */}
        <div
          className="relative flex items-center justify-between mb-4"
          style={{ marginTop: "24px" }}
        >
          {/* Back Button */}
          <button
            onClick={() => router.back()}
            className="p-2"
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

          {/* Book Icon */}
          <button
            onClick={() => setShowFAQOverlay(true)}
            className="flex items-center justify-center transition-transform active:scale-95"
            style={{
              width: "53px",
              height: "53px",
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
              <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" fill="white" />
              <path
                d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"
                fill="white"
              />
            </svg>
          </button>
        </div>

        {/* Welcome Text */}
        <div className="space-y-1 mb-4">
          <h1
            className="text-xl font-medium"
            style={{ color: "rgba(33, 56, 19, 1)" }}
          >
            Hai ! {username},
          </h1>
          <p
            className="font-medium"
            style={{
              color: "rgba(33, 56, 19, 1)",
              fontFamily: "Poppins, sans-serif",
              fontSize: "24px",
              lineHeight: "1.2",
            }}
          >
            &quot;Mulai dari kamu,
            <br />
            untuk bumi kita bersama&quot;
          </p>
        </div>

        {/* Activities Grid */}
        <div className="grid grid-cols-2 gap-3">
          {activities.map((activity) => (
            <button
              key={activity.id}
              onClick={() => handleActivityClick(activity)}
              className="relative p-4 text-white flex flex-col justify-between transition-transform active:scale-95"
              style={{
                width: "172px",
                height: "152px",
                borderRadius: "15px",
                background:
                  "linear-gradient(216deg, #5C754D 29.64%, #213813 96.49%)",
              }}
            >
              {/* EXP Text */}
              <div className="mb-2">
                <h3
                  className="font-semibold"
                  style={{ fontSize: "32px", lineHeight: "1" }}
                >
                  + {activity.exp} EXP
                </h3>
              </div>

              {/* Activity Title */}
              <div className="mb-4">
                <p
                  className="font-medium"
                  style={{ fontSize: "13px", lineHeight: "1.2" }}
                >
                  {activity.title}
                </p>
              </div>

              {/* Logo */}
              <div className="flex justify-end">
                <Image
                  src={activity.icon}
                  alt={activity.title}
                  width={32}
                  height={32}
                  className="opacity-80"
                />
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* FAQ Overlay */}
      {showFAQOverlay && (
        <div
          className="fixed inset-0 z-50 flex items-end justify-center"
          style={{ backgroundColor: "rgba(0, 0, 0, 0.5)" }}
          onClick={handleCloseOverlay}
        >
          <div
            className={`bg-white w-full max-w-sm mx-4 mb-4 rounded-t-3xl p-6 shadow-2xl transform transition-all duration-300 ease-out ${
              isClosing
                ? "translate-y-full opacity-0"
                : "translate-y-0 opacity-100"
            }`}
            style={{
              animation:
                !isClosing && showFAQOverlay
                  ? "slideUpCurve 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)"
                  : "",
              maxHeight: "80vh",
              overflowY: "auto",
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
              <h2
                className="text-xl font-semibold"
                style={{
                  color: "rgba(33, 56, 19, 1)",
                  fontFamily: "Poppins, sans-serif",
                }}
              >
                Cara Mendapatkan EXP
              </h2>
              <button
                onClick={handleCloseOverlay}
                className="p-1 rounded-full hover:bg-gray-100 transition-colors"
              >
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M18 6L6 18M6 6L18 18"
                    stroke="#606060"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
            </div>

            {/* FAQ Content */}
            <div className="space-y-4">
              {/* FAQ Item 1 */}
              <div className="bg-gray-50 rounded-xl p-4">
                <h3
                  className="font-medium mb-2"
                  style={{
                    color: "rgba(33, 56, 19, 1)",
                    fontSize: "16px",
                  }}
                >
                  🗑️ Buang Sampah dengan Benar
                </h3>
                <p className="text-sm" style={{ color: "rgba(96, 96, 96, 1)" }}>
                  Buang sampah ke tempat yang tepat sesuai jenisnya. Dapatkan
                  +10 EXP setiap kali melakukan aksi ini.
                </p>
              </div>

              {/* FAQ Item 2 */}
              <div className="bg-gray-50 rounded-xl p-4">
                <h3
                  className="font-medium mb-2"
                  style={{
                    color: "rgba(33, 56, 19, 1)",
                    fontSize: "16px",
                  }}
                >
                  🥤 Gunakan Tumbler
                </h3>
                <p className="text-sm" style={{ color: "rgba(96, 96, 96, 1)" }}>
                  Kurangi penggunaan gelas plastik sekali pakai dengan membawa
                  tumbler sendiri. Dapatkan +15 EXP.
                </p>
              </div>

              {/* FAQ Item 3 */}
              <div className="bg-gray-50 rounded-xl p-4">
                <h3
                  className="font-medium mb-2"
                  style={{
                    color: "rgba(33, 56, 19, 1)",
                    fontSize: "16px",
                  }}
                >
                  🌱 Tanam Tanaman
                </h3>
                <p className="text-sm" style={{ color: "rgba(96, 96, 96, 1)" }}>
                  Berkontribusi untuk lingkungan hijau dengan menanam tanaman di
                  sekitar rumah. Dapatkan +20 EXP.
                </p>
              </div>

              {/* FAQ Item 4 */}
              <div className="bg-gray-50 rounded-xl p-4">
                <h3
                  className="font-medium mb-2"
                  style={{
                    color: "rgba(33, 56, 19, 1)",
                    fontSize: "16px",
                  }}
                >
                  🚲 Transportasi Ramah Lingkungan
                </h3>
                <p className="text-sm" style={{ color: "rgba(96, 96, 96, 1)" }}>
                  Gunakan sepeda, jalan kaki, atau transportasi umum untuk
                  mengurangi emisi karbon. Dapatkan +40-50 EXP.
                </p>
              </div>

              {/* Tips Section */}
              <div
                className="border-t pt-4"
                style={{ borderColor: "rgba(96, 96, 96, 0.2)" }}
              >
                <h3
                  className="font-medium mb-3"
                  style={{
                    color: "rgba(33, 56, 19, 1)",
                    fontSize: "16px",
                  }}
                >
                  💡 Tips Mendapatkan EXP Lebih Banyak:
                </h3>
                <ul className="space-y-2">
                  <li
                    className="text-sm flex items-start"
                    style={{ color: "rgba(96, 96, 96, 1)" }}
                  >
                    <span className="mr-2">•</span>
                    Lakukan aktivitas secara konsisten setiap hari
                  </li>
                  <li
                    className="text-sm flex items-start"
                    style={{ color: "rgba(96, 96, 96, 1)" }}
                  >
                    <span className="mr-2">•</span>
                    Kombinasikan berbagai jenis aktivitas ramah lingkungan
                  </li>
                  <li
                    className="text-sm flex items-start"
                    style={{ color: "rgba(96, 96, 96, 1)" }}
                  >
                    <span className="mr-2">•</span>
                    Ajak teman dan keluarga untuk bergabung
                  </li>
                  <li
                    className="text-sm flex items-start"
                    style={{ color: "rgba(96, 96, 96, 1)" }}
                  >
                    <span className="mr-2">•</span>
                    Bagikan pengalaman di fitur Activity Sharing
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Camera Overlay */}
      {showCameraOverlay && selectedActivity && (
        <div
          className="fixed inset-0 z-50 flex items-end justify-center"
          style={{ backgroundColor: "rgba(0, 0, 0, 0.8)" }}
          onClick={handleCloseCameraOverlay}
        >
          <div
            className={`bg-white w-full max-w-sm mx-4 mb-4 rounded-t-3xl shadow-2xl transform transition-all duration-300 ease-out ${
              isCameraClosing
                ? "translate-y-full opacity-0"
                : "translate-y-0 opacity-100"
            }`}
            style={{
              animation:
                !isCameraClosing && showCameraOverlay
                  ? "slideUpCurve 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)"
                  : "",
              height: "500px",
              maxHeight: "500px",
              overflowY: "auto",
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b border-gray-200">
              <h2
                className="text-lg font-semibold"
                style={{
                  color: "rgba(33, 56, 19, 1)",
                  fontFamily: "Poppins, sans-serif",
                }}
              >
                {selectedActivity.title}
              </h2>
              <button
                onClick={handleCloseCameraOverlay}
                className="p-1 rounded-full hover:bg-gray-100 transition-colors"
              >
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M18 6L6 18M6 6L18 18"
                    stroke="#606060"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
            </div>

            {/* Camera Interface */}
            <div className="flex-1 flex flex-col">
              {/* Camera View */}
              <div
                className="mx-4 mt-4 rounded-2xl relative overflow-hidden"
                style={{
                  backgroundColor: "#000",
                  height: "280px",
                  minHeight: "280px",
                  maxHeight: "280px",
                }}
              >
                {!capturedPhoto ? (
                  <>
                    {/* Video Stream */}
                    <video
                      ref={videoRef}
                      autoPlay
                      playsInline
                      muted
                      className="w-full h-full object-cover"
                      style={{ transform: "scaleX(-1)" }} // Mirror effect
                    />

                    {/* Camera flash overlay */}
                    {isCapturing && (
                      <div className="absolute inset-0 bg-white opacity-70 animate-pulse" />
                    )}

                    {/* Camera UI Overlay */}
                    <div className="absolute inset-0 flex flex-col">
                      {/* Top overlay - removed close button since there's already one in header */}
                      <div className="flex justify-end p-3">
                        {/* Removed redundant close button */}
                      </div>

                      {/* Center guide overlay */}
                      <div className="flex-1 flex items-center justify-center">
                        {/* Clean camera view without guides */}
                      </div>

                      {/* Bottom controls */}
                      <div className="p-4 flex justify-center">
                        {/* Controls moved to bottom action area */}
                      </div>
                    </div>
                  </>
                ) : (
                  <>
                    {/* Captured Photo Preview */}
                    <img
                      src={capturedPhoto}
                      alt="Captured"
                      className="w-full h-full object-cover"
                    />

                    {/* Photo preview overlay */}
                    <div className="absolute inset-0 flex flex-col">
                      {/* Top overlay */}
                      <div className="flex justify-between items-center p-3">
                        <button
                          onClick={retryPhoto}
                          className="px-3 py-1 bg-black bg-opacity-50 rounded-full text-white text-sm"
                        >
                          Ulangi
                        </button>
                        <div className="px-3 py-1 bg-green-600 bg-opacity-90 rounded-full">
                          <span className="text-white text-sm font-medium">
                            ✓ Foto Tersimpan
                          </span>
                        </div>
                      </div>
                    </div>
                  </>
                )}

                {/* Loading state when no stream */}
                {!stream && !capturedPhoto && (
                  <div className="absolute inset-0 flex items-center justify-center bg-gray-900">
                    <div className="text-center text-white">
                      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white mx-auto mb-2"></div>
                      <p className="text-sm">Memuat kamera...</p>
                    </div>
                  </div>
                )}
              </div>

              {/* Hidden canvas for photo capture */}
              <canvas ref={canvasRef} style={{ display: "none" }} />

              {/* EXP Info */}
              <div className="px-4 py-3 bg-gray-50 mx-4 my-4 rounded-xl">
                <div className="flex items-center justify-between">
                  <span
                    className="text-sm font-medium"
                    style={{ color: "rgba(33, 56, 19, 1)" }}
                  >
                    Reward EXP:
                  </span>
                  <span
                    className="text-lg font-semibold"
                    style={{ color: "rgba(33, 56, 19, 1)" }}
                  >
                    +{selectedActivity.exp} EXP
                  </span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="p-4 space-y-3">
                {!capturedPhoto ? (
                  <div className="text-center">
                    <p className="text-sm text-gray-600 mb-3">
                      Ambil foto bukti kegiatan &quot;{selectedActivity.title}
                      &quot;
                    </p>
                    <button
                      onClick={capturePhoto}
                      className="w-full py-4 rounded-2xl font-semibold text-white transition-transform active:scale-95"
                      style={{
                        backgroundColor: "rgba(33, 56, 19, 1)",
                        fontFamily: "Poppins, sans-serif",
                      }}
                    >
                      📸 Ambil Foto
                    </button>
                  </div>
                ) : (
                  <button
                    onClick={handlePhotoSuccess}
                    className="w-full py-4 rounded-2xl font-semibold text-white transition-transform active:scale-95"
                    style={{
                      backgroundColor: "rgba(33, 56, 19, 1)",
                      fontFamily: "Poppins, sans-serif",
                    }}
                  >
                    Konfirmasi & Dapatkan +{selectedActivity.exp} EXP
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </MobilePageLayout>
  );
}
