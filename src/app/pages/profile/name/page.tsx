"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { MobilePageLayout } from "@/components";

export default function ProfileNamePage() {
  const router = useRouter();
  const [name, setName] = useState("Username");

  const handleSave = () => {
    // Handle save logic
    console.log("Name saved:", name);
    router.back();
  };

  return (
    <MobilePageLayout showNavbar={true}>
      <div className="min-h-screen bg-gray-50 p-6">
        {/* Header */}
        <div className="mb-6">
          <button
            onClick={() => router.back()}
            className="mb-4 flex items-center"
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
            <span className="ml-2">Kembali</span>
          </button>
          <h1 className="text-2xl font-bold" style={{ color: "#375E20" }}>
            Ganti Nama
          </h1>
        </div>

        {/* Form */}
        <div className="space-y-6">
          <div>
            <label
              className="block text-sm font-medium mb-2"
              style={{ color: "#375E20" }}
            >
              Nama Baru
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full p-4 rounded-xl focus:outline-none"
              style={{
                border: "2px solid #375E20",
                color: "#375E20",
              }}
              placeholder="Masukkan nama baru"
            />
          </div>

          {/* Save Button */}
          <button
            onClick={handleSave}
            className="w-full text-white py-4 px-6 rounded-xl font-semibold transition-colors duration-200"
            style={{ backgroundColor: "#375E20" }}
          >
            Simpan Perubahan
          </button>
        </div>
      </div>
    </MobilePageLayout>
  );
}
