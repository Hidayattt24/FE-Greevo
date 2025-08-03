"use client";

import { useState } from "react";
import SegmentedControl from "@/components/SegmentedControl";
import { locations } from "@/data/locations";

export default function AuthenticationPage() {
  const [selectedTab, setSelectedTab] = useState(0); // 0 = Masuk (default dari get-started)

  // Login state
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
    rememberMe: false,
  });
  const [showLoginPassword, setShowLoginPassword] = useState(false);

  // Register state
  const [formData, setFormData] = useState({
    profilePhoto: null as File | null,
    fullName: "",
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    location: "",
  });
  const [agreeTerms, setAgreeTerms] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [photoPreview, setPhotoPreview] = useState<string | null>(null);

  const [error, setError] = useState("");

  const tabs = ["Masuk", "Daftar"];

  const handleTabChange = (index: number) => {
    // Just update the selected tab, no navigation
    setSelectedTab(index);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Validate file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        setError("Ukuran file maksimal 5MB");
        return;
      }

      // Validate file type
      if (!["image/jpeg", "image/jpg", "image/png"].includes(file.type)) {
        setError("Format file harus JPG atau PNG");
        return;
      }

      setFormData({ ...formData, profilePhoto: file });

      // Create preview
      const reader = new FileReader();
      reader.onload = () => {
        setPhotoPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
      setError("");
    }
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData({ ...formData, [field]: value });
  };

  const handleLoginChange = (field: string, value: string | boolean) => {
    setLoginData({ ...loginData, [field]: value });
  };

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!loginData.email.trim()) {
      setError("Email wajib diisi");
      return;
    }

    if (!loginData.password) {
      setError("Kata sandi wajib diisi");
      return;
    }

    if (!loginData.rememberMe) {
      setError("Anda harus mencentang 'Ingat saya' untuk melanjutkan");
      return;
    }

    console.log("Login attempt:", loginData);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Reset error
    setError("");

    // Validate required fields
    if (!formData.profilePhoto) {
      setError("Foto profil wajib diupload");
      return;
    }

    if (!formData.fullName.trim()) {
      setError("Nama lengkap wajib diisi");
      return;
    }

    if (!formData.username.trim()) {
      setError("Username wajib diisi");
      return;
    }

    if (!formData.email.trim()) {
      setError("Email wajib diisi");
      return;
    }

    if (!formData.password) {
      setError("Kata sandi wajib diisi");
      return;
    }

    if (formData.password.length < 6) {
      setError("Kata sandi minimal 6 karakter");
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setError("Konfirmasi kata sandi tidak sesuai");
      return;
    }

    if (!agreeTerms) {
      setError("Anda harus menyetujui syarat & kebijakan privasi");
      return;
    }

    // Handle register logic here
    console.log("Register attempt:", { ...formData, agreeTerms });
  };

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Background Gradient */}
      <div
        className="absolute inset-0 z-0"
        style={{
          background: "linear-gradient(180deg, #213813 -2.01%, #FFF 100%)",
        }}
      />

      {/* Content */}
      <div className="relative z-10 flex flex-col min-h-screen">
        {/* Header Content */}
        <div className="flex-1 flex flex-col justify-end pb-8 px-6">
          <div className="text-white text-left">
            <h1 className="text-2xl font-semibold mb-4 leading-tight">
              Gabung Bersama Greevo
            </h1>
            <p className="text-base font-light opacity-90 leading-relaxed">
              Bersama Greevo, setiap aksi hijau kamu berarti. Buat akun dan jadi
              bagian dari gerakan perubahan.
            </p>
          </div>
        </div>

        {/* White Rectangle Container */}
        <div
          className="bg-white px-6 pt-8 pb-12"
          style={{
            borderRadius: "40px 40px 0 0",
            height: "75vh",
            maxHeight: "75vh",
          }}
        >
          {/* Segmented Control */}
          <div className="mb-6">
            <SegmentedControl
              options={tabs}
              selectedIndex={selectedTab}
              onSelectionChange={handleTabChange}
            />
          </div>

          {/* Dynamic Form Content */}
          <div
            className="transition-all duration-300 ease-in-out h-full scrollbar-hide"
            style={{
              height: "calc(100% - 80px)", // Subtract segmented control height
              overflowY: "auto",
              scrollbarWidth: "none", // Firefox
              msOverflowStyle: "none", // IE/Edge
            }}
          >
            <style jsx>{`
              .scrollbar-hide::-webkit-scrollbar {
                display: none;
              }
            `}</style>
            {selectedTab === 0 ? (
              // Login Form
              <form onSubmit={handleLoginSubmit} className="space-y-4">
                {/* Error Message */}
                {error && (
                  <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg text-sm">
                    {error}
                  </div>
                )}

                {/* Email Input */}
                <div>
                  <label
                    className="block text-sm font-medium mb-2"
                    style={{ color: "rgba(33, 56, 19, 1)" }}
                  >
                    Email
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center">
                      <svg
                        className="h-5 w-5"
                        style={{ color: "rgba(33, 56, 19, 0.5)" }}
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207"
                        />
                      </svg>
                    </div>
                    <input
                      type="email"
                      value={loginData.email}
                      onChange={(e) =>
                        handleLoginChange("email", e.target.value)
                      }
                      placeholder="greevo@gmail.com"
                      className="w-full pl-10 pr-4 py-3 border focus:ring-2 focus:outline-none"
                      style={{
                        borderRadius: "10px",
                        border: "1px solid #213813",
                        color: "rgba(33, 56, 19, 1)",
                      }}
                      onFocus={(e) => {
                        e.target.style.borderColor = "rgba(33, 56, 19, 1)";
                        e.target.style.boxShadow =
                          "0 0 0 2px rgba(33, 56, 19, 0.2)";
                      }}
                      onBlur={(e) => {
                        e.target.style.borderColor = "#213813";
                        e.target.style.boxShadow = "none";
                      }}
                    />
                  </div>
                </div>

                {/* Password Input */}
                <div>
                  <label
                    className="block text-sm font-medium mb-2"
                    style={{ color: "rgba(33, 56, 19, 1)" }}
                  >
                    Kata Sandi
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center">
                      <svg
                        className="h-5 w-5"
                        style={{ color: "rgba(33, 56, 19, 0.5)" }}
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M15 7a2 2 0 012 2m0 0a2 2 0 012 2m-2-2a2 2 0 00-2 2m2-2V5a2 2 0 00-2-2m0 0H9a2 2 0 00-2 2v2m0 0a2 2 0 102 2m-2-2a2 2 0 002 2m0 0V9a2 2 0 002-2m-2 2H7a2 2 0 00-2 2v6a2 2 0 002 2h10a2 2 0 002-2V9a2 2 0 00-2-2"
                        />
                      </svg>
                    </div>
                    <input
                      type={showLoginPassword ? "text" : "password"}
                      value={loginData.password}
                      onChange={(e) =>
                        handleLoginChange("password", e.target.value)
                      }
                      placeholder="••••••••••••••••"
                      className="w-full pl-10 pr-12 py-3 border focus:ring-2 focus:outline-none"
                      style={{
                        borderRadius: "10px",
                        border: "1px solid #213813",
                        color: "rgba(33, 56, 19, 1)",
                      }}
                      onFocus={(e) => {
                        e.target.style.borderColor = "rgba(33, 56, 19, 1)";
                        e.target.style.boxShadow =
                          "0 0 0 2px rgba(33, 56, 19, 0.2)";
                      }}
                      onBlur={(e) => {
                        e.target.style.borderColor = "#213813";
                        e.target.style.boxShadow = "none";
                      }}
                    />
                    <button
                      type="button"
                      onClick={() => setShowLoginPassword(!showLoginPassword)}
                      className="absolute inset-y-0 right-0 pr-3 flex items-center"
                    >
                      <svg
                        className="h-5 w-5"
                        style={{ color: "rgba(33, 56, 19, 0.5)" }}
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        {showLoginPassword ? (
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L3 3m6.878 6.878L21 21"
                          />
                        ) : (
                          <>
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                            />
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                            />
                          </>
                        )}
                      </svg>
                    </button>
                  </div>
                </div>

                {/* Remember Me Checkbox */}
                <div className="flex items-center mt-6">
                  <input
                    id="remember-me"
                    type="checkbox"
                    checked={loginData.rememberMe}
                    onChange={(e) =>
                      handleLoginChange("rememberMe", e.target.checked)
                    }
                    className="h-4 w-4 rounded focus:ring-2 focus:outline-none"
                    style={{
                      accentColor: "rgba(33, 56, 19, 1)",
                      borderColor: "rgba(33, 56, 19, 1)",
                    }}
                  />
                  <label
                    htmlFor="remember-me"
                    className="ml-2 text-sm"
                    style={{ color: "rgba(33, 56, 19, 1)" }}
                  >
                    Ingat saya
                  </label>
                </div>

                {/* Login Button */}
                <button
                  type="submit"
                  className="w-full text-white py-3 px-4 hover:opacity-90 transition-colors font-medium mt-8"
                  style={{
                    backgroundColor: "#213813",
                    borderRadius: "20px",
                  }}
                >
                  Masuk
                </button>
              </form>
            ) : (
              // Register Form
              <form onSubmit={handleSubmit} className="space-y-4">
                {/* Error Message */}
                {error && (
                  <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg text-sm">
                    {error}
                  </div>
                )}

                {/* Profile Photo Upload */}
                <div>
                  <label
                    className="block text-sm font-medium mb-2"
                    style={{ color: "rgba(33, 56, 19, 1)" }}
                  >
                    Foto Profil <span className="text-red-500">*</span>
                  </label>
                  <div className="flex items-center space-x-4">
                    <div className="flex-shrink-0">
                      {photoPreview ? (
                        <img
                          src={photoPreview}
                          alt="Preview"
                          className="w-24 h-24 rounded-full object-cover border-2"
                          style={{ borderColor: "rgba(33, 56, 19, 1)" }}
                        />
                      ) : (
                        <div
                          className="w-24 h-24 rounded-full border-2 border-dashed flex items-center justify-center"
                          style={{ borderColor: "rgba(33, 56, 19, 0.5)" }}
                        >
                          <svg
                            className="w-10 h-10"
                            style={{ color: "rgba(33, 56, 19, 0.5)" }}
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                            />
                          </svg>
                        </div>
                      )}
                    </div>
                    <div className="flex-1">
                      <input
                        type="file"
                        accept="image/jpeg,image/jpg,image/png"
                        onChange={handleFileChange}
                        className="hidden"
                        id="profile-photo"
                      />
                      <label
                        htmlFor="profile-photo"
                        className="cursor-pointer inline-flex items-center justify-center text-sm font-medium text-white gap-2 w-full"
                        style={{
                          height: "36px",
                          borderRadius: "30px",
                          backgroundColor: "#213813",
                        }}
                      >
                        <svg
                          className="w-4 h-4"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                          />
                        </svg>
                        Pilih Foto
                      </label>
                      <p
                        className="text-xs mt-1"
                        style={{ color: "rgba(33, 56, 19, 0.6)" }}
                      >
                        JPG/PNG, maks 5MB
                      </p>
                    </div>
                  </div>
                </div>

                {/* Full Name */}
                <div>
                  <label
                    className="block text-sm font-medium mb-2"
                    style={{ color: "rgba(33, 56, 19, 1)" }}
                  >
                    Nama Lengkap <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={formData.fullName}
                    onChange={(e) =>
                      handleInputChange("fullName", e.target.value)
                    }
                    placeholder="Contoh: Rina Maulida"
                    className="w-full px-4 py-3 border focus:ring-2 focus:outline-none"
                    style={{
                      borderRadius: "10px",
                      border: "1px solid #213813",
                      color: "rgba(33, 56, 19, 1)",
                    }}
                    onFocus={(e) => {
                      e.target.style.borderColor = "rgba(33, 56, 19, 1)";
                      e.target.style.boxShadow =
                        "0 0 0 2px rgba(33, 56, 19, 0.2)";
                    }}
                    onBlur={(e) => {
                      e.target.style.borderColor = "#213813";
                      e.target.style.boxShadow = "none";
                    }}
                  />
                </div>

                {/* Username */}
                <div>
                  <label
                    className="block text-sm font-medium mb-2"
                    style={{ color: "rgba(33, 56, 19, 1)" }}
                  >
                    Username / Nama Pengguna{" "}
                    <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={formData.username}
                    onChange={(e) =>
                      handleInputChange("username", e.target.value)
                    }
                    placeholder="Contoh: rina_eco"
                    className="w-full px-4 py-3 border focus:ring-2 focus:outline-none"
                    style={{
                      borderRadius: "10px",
                      border: "1px solid #213813",
                      color: "rgba(33, 56, 19, 1)",
                    }}
                    onFocus={(e) => {
                      e.target.style.borderColor = "rgba(33, 56, 19, 1)";
                      e.target.style.boxShadow =
                        "0 0 0 2px rgba(33, 56, 19, 0.2)";
                    }}
                    onBlur={(e) => {
                      e.target.style.borderColor = "#213813";
                      e.target.style.boxShadow = "none";
                    }}
                  />
                  <p
                    className="text-xs mt-1"
                    style={{ color: "rgba(33, 56, 19, 0.6)" }}
                  >
                    Unik, digunakan untuk mention dan leaderboard
                  </p>
                </div>

                {/* Email */}
                <div>
                  <label
                    className="block text-sm font-medium mb-2"
                    style={{ color: "rgba(33, 56, 19, 1)" }}
                  >
                    Email <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleInputChange("email", e.target.value)}
                    placeholder="Contoh: rina@gmail.com"
                    className="w-full px-4 py-3 border focus:ring-2 focus:outline-none"
                    style={{
                      borderRadius: "10px",
                      border: "1px solid #213813",
                      color: "rgba(33, 56, 19, 1)",
                    }}
                    onFocus={(e) => {
                      e.target.style.borderColor = "rgba(33, 56, 19, 1)";
                      e.target.style.boxShadow =
                        "0 0 0 2px rgba(33, 56, 19, 0.2)";
                    }}
                    onBlur={(e) => {
                      e.target.style.borderColor = "#213813";
                      e.target.style.boxShadow = "none";
                    }}
                  />
                </div>

                {/* Password */}
                <div>
                  <label
                    className="block text-sm font-medium mb-2"
                    style={{ color: "rgba(33, 56, 19, 1)" }}
                  >
                    Kata Sandi <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <input
                      type={showPassword ? "text" : "password"}
                      value={formData.password}
                      onChange={(e) =>
                        handleInputChange("password", e.target.value)
                      }
                      placeholder="Minimal 6 karakter"
                      className="w-full px-4 pr-12 py-3 border focus:ring-2 focus:outline-none"
                      style={{
                        borderRadius: "10px",
                        border: "1px solid #213813",
                        color: "rgba(33, 56, 19, 1)",
                      }}
                      onFocus={(e) => {
                        e.target.style.borderColor = "rgba(33, 56, 19, 1)";
                        e.target.style.boxShadow =
                          "0 0 0 2px rgba(33, 56, 19, 0.2)";
                      }}
                      onBlur={(e) => {
                        e.target.style.borderColor = "#213813";
                        e.target.style.boxShadow = "none";
                      }}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute inset-y-0 right-0 pr-3 flex items-center"
                    >
                      <svg
                        className="h-5 w-5"
                        style={{ color: "rgba(33, 56, 19, 0.5)" }}
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        {showPassword ? (
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L3 3m6.878 6.878L21 21"
                          />
                        ) : (
                          <>
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                            />
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                            />
                          </>
                        )}
                      </svg>
                    </button>
                  </div>
                </div>

                {/* Confirm Password */}
                <div>
                  <label
                    className="block text-sm font-medium mb-2"
                    style={{ color: "rgba(33, 56, 19, 1)" }}
                  >
                    Konfirmasi Kata Sandi{" "}
                    <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <input
                      type={showConfirmPassword ? "text" : "password"}
                      value={formData.confirmPassword}
                      onChange={(e) =>
                        handleInputChange("confirmPassword", e.target.value)
                      }
                      placeholder="Ulangi kata sandi"
                      className="w-full px-4 pr-12 py-3 border focus:ring-2 focus:outline-none"
                      style={{
                        borderRadius: "10px",
                        border: "1px solid #213813",
                        color: "rgba(33, 56, 19, 1)",
                      }}
                      onFocus={(e) => {
                        e.target.style.borderColor = "rgba(33, 56, 19, 1)";
                        e.target.style.boxShadow =
                          "0 0 0 2px rgba(33, 56, 19, 0.2)";
                      }}
                      onBlur={(e) => {
                        e.target.style.borderColor = "#213813";
                        e.target.style.boxShadow = "none";
                      }}
                    />
                    <button
                      type="button"
                      onClick={() =>
                        setShowConfirmPassword(!showConfirmPassword)
                      }
                      className="absolute inset-y-0 right-0 pr-3 flex items-center"
                    >
                      <svg
                        className="h-5 w-5"
                        style={{ color: "rgba(33, 56, 19, 0.5)" }}
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        {showConfirmPassword ? (
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L3 3m6.878 6.878L21 21"
                          />
                        ) : (
                          <>
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                            />
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                            />
                          </>
                        )}
                      </svg>
                    </button>
                  </div>
                </div>

                {/* Location */}
                <div>
                  <label
                    className="block text-sm font-medium mb-2"
                    style={{ color: "rgba(33, 56, 19, 1)" }}
                  >
                    Lokasi / Wilayah Domisili (Opsional)
                  </label>
                  <select
                    value={formData.location}
                    onChange={(e) =>
                      handleInputChange("location", e.target.value)
                    }
                    className="w-full px-4 py-3 border focus:ring-2 focus:outline-none"
                    style={{
                      borderRadius: "10px",
                      border: "1px solid #213813",
                      color: "rgba(33, 56, 19, 1)",
                    }}
                    onFocus={(e) => {
                      e.target.style.borderColor = "rgba(33, 56, 19, 1)";
                      e.target.style.boxShadow =
                        "0 0 0 2px rgba(33, 56, 19, 0.2)";
                    }}
                    onBlur={(e) => {
                      e.target.style.borderColor = "#213813";
                      e.target.style.boxShadow = "none";
                    }}
                  >
                    <option value="">Pilih kecamatan/kota</option>
                    {locations.map((location) => (
                      <option
                        key={location}
                        value={location.toLowerCase().replace(/\s+/g, "-")}
                      >
                        {location}
                      </option>
                    ))}
                  </select>
                  <p
                    className="text-xs mt-1"
                    style={{ color: "rgba(33, 56, 19, 0.6)" }}
                  >
                    Untuk leaderboard wilayah
                  </p>
                </div>

                {/* Terms Agreement */}
                <div className="flex items-start mt-6">
                  <input
                    id="agree-terms"
                    type="checkbox"
                    checked={agreeTerms}
                    onChange={(e) => setAgreeTerms(e.target.checked)}
                    className="h-4 w-4 rounded focus:ring-2 focus:outline-none mt-1"
                    style={{
                      accentColor: "rgba(33, 56, 19, 1)",
                      borderColor: "rgba(33, 56, 19, 1)",
                    }}
                  />
                  <label
                    htmlFor="agree-terms"
                    className="ml-2 text-sm leading-relaxed"
                    style={{ color: "rgba(33, 56, 19, 1)" }}
                  >
                    Saya setuju dengan{" "}
                    <a
                      href="#"
                      className="underline hover:no-underline"
                      style={{ color: "rgba(33, 56, 19, 1)" }}
                    >
                      syarat & kebijakan privasi
                    </a>{" "}
                    Greevo.
                  </label>
                </div>

                {/* Register Button */}
                <button
                  type="submit"
                  className="w-full text-white py-3 px-4 hover:opacity-90 transition-colors font-medium mt-8"
                  style={{
                    backgroundColor: "#213813",
                    borderRadius: "20px",
                  }}
                >
                  Daftar
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
