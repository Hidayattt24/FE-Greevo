"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { MobilePageLayout } from "@/components";

export default function ProfilePasswordPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const handleSave = () => {
    if (formData.newPassword !== formData.confirmPassword) {
      alert("Password baru tidak cocok!");
      return;
    }
    // Handle save logic
    console.log("Password changed");
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
            Ganti Kata Sandi
          </h1>
        </div>

        {/* Form */}
        <div className="space-y-6">
          <div>
            <label
              className="block text-sm font-medium mb-2"
              style={{ color: "#375E20" }}
            >
              Kata Sandi Saat Ini
            </label>
            <input
              type="password"
              value={formData.currentPassword}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  currentPassword: e.target.value,
                })
              }
              className="w-full p-4 rounded-xl focus:outline-none"
              style={{
                border: "2px solid #375E20",
                color: "#375E20",
              }}
              placeholder="Masukkan kata sandi saat ini"
            />
          </div>

          <div>
            <label
              className="block text-sm font-medium mb-2"
              style={{ color: "#375E20" }}
            >
              Kata Sandi Baru
            </label>
            <input
              type="password"
              value={formData.newPassword}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  newPassword: e.target.value,
                })
              }
              className="w-full p-4 rounded-xl focus:outline-none"
              style={{
                border: "2px solid #375E20",
                color: "#375E20",
              }}
              placeholder="Masukkan kata sandi baru"
            />
          </div>

          <div>
            <label
              className="block text-sm font-medium mb-2"
              style={{ color: "#375E20" }}
            >
              Konfirmasi Kata Sandi Baru
            </label>
            <input
              type="password"
              value={formData.confirmPassword}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  confirmPassword: e.target.value,
                })
              }
              className="w-full p-4 rounded-xl focus:outline-none"
              style={{
                border: "2px solid #375E20",
                color: "#375E20",
              }}
              placeholder="Konfirmasi kata sandi baru"
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
