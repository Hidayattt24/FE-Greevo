"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { MobileNavbar } from "@/components";

export default function ProfilePage() {
  const router = useRouter();
  const [profile] = useState({
    name: "Username",
    email: "username@gmail.com",
    photo: "/pages/dashboard/foto-profile.svg",
  });

  const profileCards = [
    {
      id: "photo",
      title: "Ganti\nFoto Profil",
      type: "photo" as const,
      route: "/pages/profile/photo",
    },
    {
      id: "name",
      title: "Ganti\nNama",
      type: "name" as const,
      route: "/pages/profile/name",
    },
    {
      id: "email",
      title: "Ganti\nEmail",
      type: "email" as const,
      route: "/pages/profile/email",
    },
    {
      id: "password",
      title: "Ganti\nKata Sandi",
      type: "password" as const,
      route: "/pages/profile/password",
    },
  ];

  const handleLogout = () => {
    // Handle logout logic
    console.log("User logged out");
  };

  return (
    <div className="fixed inset-0 overflow-hidden">
      {/* Header Section with Profile - Full Width */}
      <div
        className="relative px-6 pt-4 pb-16"
        style={{
          background: "linear-gradient(116deg, #5C754D 17.59%, #213813 82.6%)",
        }}
      >
        {/* Title */}
        <div className="text-center mb-6 pt-4">
          <h1 className="text-white font-bold" style={{ fontSize: "24px" }}>
            Pengaturan
          </h1>
        </div>

        {/* Profile Photo - Overlapping */}
        <div className="flex flex-col items-center">
          <div className="relative">
            <div className="w-32 h-32 bg-white rounded-full flex items-center justify-center shadow-lg">
              <img
                src="/pages/dashboard/foto-profile.svg"
                alt="Profile"
                className="w-28 h-28 rounded-full object-cover"
              />
            </div>
          </div>

          {/* User Identity */}
          <div className="text-center mt-4 mb-6">
            <h2 className="text-xl font-bold text-white">{profile.name}</h2>
            <p className="text-sm text-green-100 mt-1">{profile.email}</p>
          </div>
        </div>
      </div>

      {/* White Content Area */}
      <div className="bg-gray-50 mx-4 -mt-8 rounded-t-3xl px-6 pt-8 pb-32 relative z-10">
        {/* Action Cards Grid - Dashboard Style */}
        <div className="grid grid-cols-2 gap-4 mb-8">
          {profileCards.map((card) => (
            <button
              key={card.id}
              onClick={() => router.push(card.route)}
              className="relative p-4 text-white flex flex-col justify-between text-left transition-transform active:scale-95"
              style={{
                height: "152px",
                borderRadius: "15px",
                background: "linear-gradient(180deg, #5C754D 0%, #213813 100%)",
              }}
            >
              <div>
                <h3
                  className="font-medium italic leading-tight"
                  style={{ fontSize: "24px" }}
                >
                  {card.title}
                </h3>
              </div>
              <div className="flex justify-end">
                <div
                  className="flex items-center justify-center"
                  style={{
                    width: "39px",
                    height: "39px",
                    backgroundColor: "rgba(255,255,255,0.2)",
                    borderRadius: "50%",
                  }}
                >
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M7 17L17 7M17 7H7M17 7V17"
                      stroke="white"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
              </div>
            </button>
          ))}
        </div>

        {/* Logout Button */}
        <button
          onClick={handleLogout}
          className="w-full text-white font-semibold py-4 px-6 rounded-xl transition-colors duration-200 shadow-lg"
          style={{ backgroundColor: "#dc2626" }}
        >
          Keluar
        </button>
      </div>

      {/* Mobile Navbar */}
      <div className="fixed bottom-0 left-0 right-0 z-50">
        <MobileNavbar />
      </div>
    </div>
  );
}
