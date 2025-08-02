"use client";

import React, { useState } from "react";
import { MobilePageLayout } from "@/components";

interface Achievement {
  id: number;
  title: string;
  description: string;
  icon: string;
  earned: boolean;
  date?: string;
}

const achievements: Achievement[] = [
  {
    id: 1,
    title: "First Scan",
    description: "Melakukan scan pertama",
    icon: "🎯",
    earned: true,
    date: "2025-07-28",
  },
  {
    id: 2,
    title: "Eco Warrior",
    description: "Mencapai 500 poin",
    icon: "🏆",
    earned: true,
    date: "2025-08-01",
  },
  {
    id: 3,
    title: "Social Sharer",
    description: "Berbagi 10 postingan",
    icon: "📢",
    earned: false,
  },
  {
    id: 4,
    title: "Weekly Champion",
    description: "Top 10 mingguan",
    icon: "👑",
    earned: false,
  },
];

export default function ProfilePage() {
  const [activeTab, setActiveTab] = useState("profile");
  const [editMode, setEditMode] = useState(false);
  const [profile, setProfile] = useState({
    name: "John Doe",
    email: "john.doe@email.com",
    phone: "+62 812 3456 7890",
    location: "Jakarta, Indonesia",
    bio: "Pencinta lingkungan yang ingin berkontribusi untuk bumi yang lebih hijau 🌱",
  });

  const stats = {
    totalPoints: 1250,
    totalScans: 47,
    totalShares: 12,
    level: "Eco Warrior",
    rank: 15,
    weeklyPoints: 280,
  };

  const handleSaveProfile = () => {
    setEditMode(false);
    // Here you would typically save to backend
  };

  return (
    <MobilePageLayout title="Profil">
      <div className="p-4 space-y-6">
        {/* Profile Header */}
        <div className="bg-gradient-to-r from-green-500 to-green-600 rounded-xl p-6 text-white">
          <div className="flex items-center space-x-4">
            <div className="w-20 h-20 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
              <span className="text-2xl font-bold text-white">
                {profile.name
                  .split(" ")
                  .map((n) => n[0])
                  .join("")}
              </span>
            </div>
            <div className="flex-1">
              <h2 className="text-xl font-bold">{profile.name}</h2>
              <div className="flex items-center space-x-2 mt-1">
                <span className="px-3 py-1 bg-white bg-opacity-20 rounded-full text-sm">
                  {stats.level}
                </span>
                <span className="text-sm text-green-100">
                  Peringkat #{stats.rank}
                </span>
              </div>
              <p className="text-sm text-green-100 mt-2">{profile.bio}</p>
            </div>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-200 text-center">
            <p className="text-2xl font-bold text-green-600">
              {stats.totalPoints}
            </p>
            <p className="text-sm text-gray-600">Total Poin</p>
          </div>
          <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-200 text-center">
            <p className="text-2xl font-bold text-blue-600">
              {stats.totalScans}
            </p>
            <p className="text-sm text-gray-600">Total Scan</p>
          </div>
          <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-200 text-center">
            <p className="text-2xl font-bold text-purple-600">
              {stats.totalShares}
            </p>
            <p className="text-sm text-gray-600">Berbagi</p>
          </div>
          <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-200 text-center">
            <p className="text-2xl font-bold text-orange-600">
              {stats.weeklyPoints}
            </p>
            <p className="text-sm text-gray-600">Poin Minggu Ini</p>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
          <div className="flex">
            <button
              onClick={() => setActiveTab("profile")}
              className={`flex-1 py-3 px-4 text-sm font-medium transition-colors ${
                activeTab === "profile"
                  ? "bg-green-500 text-white"
                  : "bg-white text-gray-600 hover:bg-gray-50"
              }`}
            >
              Informasi
            </button>
            <button
              onClick={() => setActiveTab("achievements")}
              className={`flex-1 py-3 px-4 text-sm font-medium transition-colors ${
                activeTab === "achievements"
                  ? "bg-green-500 text-white"
                  : "bg-white text-gray-600 hover:bg-gray-50"
              }`}
            >
              Pencapaian
            </button>
            <button
              onClick={() => setActiveTab("settings")}
              className={`flex-1 py-3 px-4 text-sm font-medium transition-colors ${
                activeTab === "settings"
                  ? "bg-green-500 text-white"
                  : "bg-white text-gray-600 hover:bg-gray-50"
              }`}
            >
              Pengaturan
            </button>
          </div>
        </div>

        {/* Tab Content */}
        {activeTab === "profile" && (
          <div className="space-y-4">
            <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold">Informasi Pribadi</h3>
                <button
                  onClick={() => setEditMode(!editMode)}
                  className="text-green-600 hover:text-green-700 text-sm font-medium"
                >
                  {editMode ? "Batal" : "Edit"}
                </button>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm text-gray-600 mb-1">
                    Nama Lengkap
                  </label>
                  {editMode ? (
                    <input
                      type="text"
                      value={profile.name}
                      onChange={(e) =>
                        setProfile({ ...profile, name: e.target.value })
                      }
                      className="w-full p-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                    />
                  ) : (
                    <p className="p-3 bg-gray-50 rounded-lg">{profile.name}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm text-gray-600 mb-1">
                    Email
                  </label>
                  {editMode ? (
                    <input
                      type="email"
                      value={profile.email}
                      onChange={(e) =>
                        setProfile({ ...profile, email: e.target.value })
                      }
                      className="w-full p-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                    />
                  ) : (
                    <p className="p-3 bg-gray-50 rounded-lg">{profile.email}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm text-gray-600 mb-1">
                    Nomor Telepon
                  </label>
                  {editMode ? (
                    <input
                      type="tel"
                      value={profile.phone}
                      onChange={(e) =>
                        setProfile({ ...profile, phone: e.target.value })
                      }
                      className="w-full p-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                    />
                  ) : (
                    <p className="p-3 bg-gray-50 rounded-lg">{profile.phone}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm text-gray-600 mb-1">
                    Lokasi
                  </label>
                  {editMode ? (
                    <input
                      type="text"
                      value={profile.location}
                      onChange={(e) =>
                        setProfile({ ...profile, location: e.target.value })
                      }
                      className="w-full p-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                    />
                  ) : (
                    <p className="p-3 bg-gray-50 rounded-lg">
                      {profile.location}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-sm text-gray-600 mb-1">
                    Bio
                  </label>
                  {editMode ? (
                    <textarea
                      value={profile.bio}
                      onChange={(e) =>
                        setProfile({ ...profile, bio: e.target.value })
                      }
                      rows={3}
                      className="w-full p-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 resize-none"
                    />
                  ) : (
                    <p className="p-3 bg-gray-50 rounded-lg">{profile.bio}</p>
                  )}
                </div>

                {editMode && (
                  <div className="flex space-x-3 pt-4">
                    <button
                      onClick={() => setEditMode(false)}
                      className="flex-1 py-3 px-4 bg-gray-100 text-gray-700 rounded-lg font-medium"
                    >
                      Batal
                    </button>
                    <button
                      onClick={handleSaveProfile}
                      className="flex-1 py-3 px-4 bg-green-500 text-white rounded-lg font-medium"
                    >
                      Simpan
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {activeTab === "achievements" && (
          <div className="space-y-4">
            <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
              <h3 className="text-lg font-semibold mb-4">Pencapaian</h3>
              <div className="grid grid-cols-2 gap-4">
                {achievements.map((achievement) => (
                  <div
                    key={achievement.id}
                    className={`p-4 rounded-lg border text-center ${
                      achievement.earned
                        ? "bg-green-50 border-green-200"
                        : "bg-gray-50 border-gray-200"
                    }`}
                  >
                    <div className="text-3xl mb-2">{achievement.icon}</div>
                    <h4
                      className={`font-medium text-sm mb-1 ${
                        achievement.earned ? "text-green-800" : "text-gray-600"
                      }`}
                    >
                      {achievement.title}
                    </h4>
                    <p
                      className={`text-xs ${
                        achievement.earned ? "text-green-600" : "text-gray-500"
                      }`}
                    >
                      {achievement.description}
                    </p>
                    {achievement.earned && achievement.date && (
                      <p className="text-xs text-green-500 mt-1">
                        {new Date(achievement.date).toLocaleDateString("id-ID")}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Progress to Next Level */}
            <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
              <h3 className="text-lg font-semibold mb-4">Progress Level</h3>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-gray-600">Eco Warrior</span>
                <span className="text-sm text-gray-600">Green Master</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-3 mb-2">
                <div
                  className="bg-green-500 h-3 rounded-full"
                  style={{ width: "65%" }}
                ></div>
              </div>
              <p className="text-xs text-gray-600 text-center">
                325 poin lagi untuk level berikutnya
              </p>
            </div>
          </div>
        )}

        {activeTab === "settings" && (
          <div className="space-y-4">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
              <div className="divide-y divide-gray-200">
                <button className="w-full text-left p-4 hover:bg-gray-50 transition-colors">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                        <svg
                          width="16"
                          height="16"
                          viewBox="0 0 24 24"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M12 22c1.1 0 2-.9 2-2h-4c0 1.1.9 2 2 2zm6-6v-5c0-3.07-1.64-5.64-4.5-6.32V4c0-.83-.67-1.5-1.5-1.5s-1.5.67-1.5 1.5v.68C7.63 5.36 6 7.92 6 11v5l-2 2v1h16v-1l-2-2z"
                            fill="#3B82F6"
                          />
                        </svg>
                      </div>
                      <div>
                        <p className="font-medium">Notifikasi</p>
                        <p className="text-sm text-gray-500">
                          Atur preferensi notifikasi
                        </p>
                      </div>
                    </div>
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M9 18l6-6-6-6"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </div>
                </button>

                <button className="w-full text-left p-4 hover:bg-gray-50 transition-colors">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
                        <svg
                          width="16"
                          height="16"
                          viewBox="0 0 24 24"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"
                            fill="#8B5CF6"
                          />
                        </svg>
                      </div>
                      <div>
                        <p className="font-medium">Privasi</p>
                        <p className="text-sm text-gray-500">
                          Kelola pengaturan privasi
                        </p>
                      </div>
                    </div>
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M9 18l6-6-6-6"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </div>
                </button>

                <button className="w-full text-left p-4 hover:bg-gray-50 transition-colors">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                        <svg
                          width="16"
                          height="16"
                          viewBox="0 0 24 24"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"
                            fill="#10B981"
                          />
                        </svg>
                      </div>
                      <div>
                        <p className="font-medium">Bantuan</p>
                        <p className="text-sm text-gray-500">
                          FAQ dan dukungan
                        </p>
                      </div>
                    </div>
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M9 18l6-6-6-6"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </div>
                </button>

                <button className="w-full text-left p-4 hover:bg-gray-50 transition-colors">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center">
                        <svg
                          width="16"
                          height="16"
                          viewBox="0 0 24 24"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"
                            fill="#F97316"
                          />
                        </svg>
                      </div>
                      <div>
                        <p className="font-medium">Tentang</p>
                        <p className="text-sm text-gray-500">
                          Informasi aplikasi
                        </p>
                      </div>
                    </div>
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M9 18l6-6-6-6"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </div>
                </button>
              </div>
            </div>

            {/* Logout Button */}
            <button className="w-full bg-red-500 hover:bg-red-600 text-white font-medium py-4 px-6 rounded-xl transition-colors">
              Keluar
            </button>
          </div>
        )}
      </div>
    </MobilePageLayout>
  );
}
