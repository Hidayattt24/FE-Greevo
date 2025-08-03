"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { MobilePageLayout } from "@/components";

export default function ProfilePhotoPage() {
  const router = useRouter();
  const [currentPhoto, setCurrentPhoto] = useState(
    "/pages/dashboard/foto-profile.svg"
  );

  const handleGallery = () => {
    // Create a file input element
    const input = document.createElement("input");
    input.type = "file";
    input.accept = "image/*";

    input.onchange = (event) => {
      const file = (event.target as HTMLInputElement).files?.[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (e) => {
          if (e.target?.result) {
            setCurrentPhoto(e.target.result as string);
          }
        };
        reader.readAsDataURL(file);
      }
    };

    input.click();
  };

  const handleSave = () => {
    // Handle save logic
    console.log("Photo saved");
    router.back();
  };

  return (
    <MobilePageLayout showNavbar={true}>
      <div className="min-h-screen p-6 bg-white">
        {/* Header */}
        <div className="mb-8">
          <button
            onClick={() => router.back()}
            className="mb-6 flex items-center"
            style={{ color: "#375E20" }}
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
                stroke="#375E20"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <span className="ml-2 font-medium" style={{ color: "#375E20" }}>
              Kembali
            </span>
          </button>
          <h1
            className="font-bold text-center"
            style={{ fontSize: "24px", color: "#375E20" }}
          >
            Ganti Foto Profil
          </h1>
        </div>

        {/* Current Photo Display */}
        <div className="flex justify-center mb-8">
          <div className="w-48 h-48 bg-gray-200 rounded-full flex items-center justify-center shadow-lg">
            <img
              src={currentPhoto}
              alt="Current Profile"
              className="w-44 h-44 rounded-full object-cover"
            />
          </div>
        </div>

        {/* Gallery Button */}
        <div className="space-y-6">
          <button
            onClick={handleGallery}
            className="w-full py-4 px-6 rounded-xl font-semibold transition-colors duration-200 flex items-center justify-center"
            style={{
              backgroundColor: "#375E20",
              color: "white",
            }}
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="mr-2"
            >
              <rect
                x="3"
                y="3"
                width="18"
                height="18"
                rx="2"
                ry="2"
                stroke="white"
                strokeWidth="2"
                fill="none"
              />
              <circle cx="8.5" cy="8.5" r="1.5" fill="white" />
              <path
                d="M21 15L16 10L5 21"
                stroke="white"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            Pilih dari Galeri
          </button>

          {/* Save Button */}
          <button
            onClick={handleSave}
            className="w-full py-4 px-6 rounded-xl font-semibold transition-colors duration-200"
            style={{
              backgroundColor: "#375E20",
              color: "white",
            }}
          >
            Simpan Perubahan
          </button>
        </div>
      </div>
    </MobilePageLayout>
  );
}
