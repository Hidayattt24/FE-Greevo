"use client";

import React, { useState, useRef } from "react";
import { MobilePageLayout } from "@/components";

interface ScanResult {
  type: string;
  material: string;
  recyclable: boolean;
  confidence: number;
  points: number;
  tips: string[];
}

export default function TrashScannerPage() {
  const [isScanning, setIsScanning] = useState(false);
  const [scanResult, setScanResult] = useState<ScanResult | null>(null);
  const [cameraActive, setCameraActive] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleStartScan = () => {
    setCameraActive(true);
    setIsScanning(true);
    setScanResult(null);

    // Simulate scanning process
    setTimeout(() => {
      setIsScanning(false);
      setScanResult({
        type: "Botol Plastik",
        material: "PET (Polyethylene Terephthalate)",
        recyclable: true,
        confidence: 95,
        points: 50,
        tips: [
          "Bersihkan sisa cairan sebelum didaur ulang",
          "Lepaskan tutup botol jika berbeda material",
          "Buang ke tempat sampah daur ulang plastik",
        ],
      });
    }, 3000);
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setCameraActive(false);
      setIsScanning(true);
      setScanResult(null);

      // Simulate scanning process for uploaded image
      setTimeout(() => {
        setIsScanning(false);
        setScanResult({
          type: "Kaleng Aluminium",
          material: "Aluminium",
          recyclable: true,
          confidence: 88,
          points: 75,
          tips: [
            "Kosongkan isi kaleng sepenuhnya",
            "Bilas dengan air untuk menghilangkan sisa makanan/minuman",
            "Kaleng aluminium memiliki nilai daur ulang tinggi",
          ],
        });
      }, 2000);
    }
  };

  const handleReset = () => {
    setIsScanning(false);
    setScanResult(null);
    setCameraActive(false);
  };

  return (
    <MobilePageLayout title="Scanner Sampah">
      <div className="p-4 space-y-6">
        {/* Scanner Area */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          <div className="relative aspect-square bg-gray-100">
            {!cameraActive && !scanResult && (
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <div className="w-20 h-20 bg-gray-300 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg
                      width="40"
                      height="40"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"
                        fill="#9CA3AF"
                      />
                    </svg>
                  </div>
                  <p className="text-gray-600 text-sm">
                    Arahkan kamera ke sampah yang ingin diidentifikasi
                  </p>
                </div>
              </div>
            )}

            {cameraActive && !scanResult && (
              <div className="absolute inset-0 bg-black flex items-center justify-center">
                <div className="text-center text-white">
                  {isScanning ? (
                    <>
                      <div className="w-20 h-20 border-4 border-white border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                      <p>Memindai sampah...</p>
                    </>
                  ) : (
                    <>
                      <div className="w-64 h-64 border-2 border-white rounded-lg relative">
                        <div className="absolute top-0 left-0 w-8 h-8 border-t-4 border-l-4 border-green-400"></div>
                        <div className="absolute top-0 right-0 w-8 h-8 border-t-4 border-r-4 border-green-400"></div>
                        <div className="absolute bottom-0 left-0 w-8 h-8 border-b-4 border-l-4 border-green-400"></div>
                        <div className="absolute bottom-0 right-0 w-8 h-8 border-b-4 border-r-4 border-green-400"></div>
                        <div className="absolute inset-0 flex items-center justify-center">
                          <p className="text-sm">
                            Posisikan sampah di dalam frame
                          </p>
                        </div>
                      </div>
                    </>
                  )}
                </div>
              </div>
            )}

            {scanResult && (
              <div className="absolute inset-0 bg-green-50 flex items-center justify-center">
                <div className="text-center p-6">
                  <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg
                      width="32"
                      height="32"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"
                        fill="white"
                      />
                    </svg>
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    Berhasil Diidentifikasi!
                  </h3>
                  <p className="text-green-600 font-medium">
                    {scanResult.type}
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Scan Results */}
        {scanResult && (
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold">Hasil Identifikasi</h3>
              <div className="flex items-center space-x-2">
                <span className="text-sm text-green-600 font-medium">
                  +{scanResult.points} poin
                </span>
                <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"
                      fill="white"
                    />
                  </svg>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <p className="text-sm text-gray-600 mb-1">Jenis Sampah</p>
                <p className="font-medium">{scanResult.type}</p>
              </div>

              <div>
                <p className="text-sm text-gray-600 mb-1">Material</p>
                <p className="font-medium">{scanResult.material}</p>
              </div>

              <div>
                <p className="text-sm text-gray-600 mb-1">Status Daur Ulang</p>
                <div className="flex items-center space-x-2">
                  <div
                    className={`w-2 h-2 rounded-full ${
                      scanResult.recyclable ? "bg-green-500" : "bg-red-500"
                    }`}
                  ></div>
                  <span
                    className={`text-sm font-medium ${
                      scanResult.recyclable ? "text-green-600" : "text-red-600"
                    }`}
                  >
                    {scanResult.recyclable
                      ? "Dapat Didaur Ulang"
                      : "Tidak Dapat Didaur Ulang"}
                  </span>
                </div>
              </div>

              <div>
                <p className="text-sm text-gray-600 mb-2">Tips Pengelolaan</p>
                <ul className="space-y-1">
                  {scanResult.tips.map((tip: string, index: number) => (
                    <li
                      key={index}
                      className="flex items-start space-x-2 text-sm"
                    >
                      <span className="w-1.5 h-1.5 bg-gray-400 rounded-full mt-2 flex-shrink-0"></span>
                      <span>{tip}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        )}

        {/* Action Buttons */}
        <div className="space-y-3">
          {!cameraActive && !scanResult && (
            <>
              <button
                onClick={handleStartScan}
                className="w-full bg-green-500 hover:bg-green-600 text-white font-medium py-4 px-6 rounded-xl transition-colors flex items-center justify-center space-x-2"
              >
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"
                    fill="currentColor"
                  />
                </svg>
                <span>Mulai Scan dengan Kamera</span>
              </button>

              <div className="text-center">
                <span className="text-gray-500 text-sm">atau</span>
              </div>

              <button
                onClick={() => fileInputRef.current?.click()}
                className="w-full bg-blue-500 hover:bg-blue-600 text-white font-medium py-4 px-6 rounded-xl transition-colors flex items-center justify-center space-x-2"
              >
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M9 16h6v-6h4l-7-7-7 7h4zm-4 2h14v2H5z"
                    fill="currentColor"
                  />
                </svg>
                <span>Upload Gambar</span>
              </button>

              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleFileUpload}
                className="hidden"
              />
            </>
          )}

          {(cameraActive || scanResult) && (
            <button
              onClick={handleReset}
              className="w-full bg-gray-500 hover:bg-gray-600 text-white font-medium py-4 px-6 rounded-xl transition-colors"
            >
              Scan Lagi
            </button>
          )}
        </div>

        {/* Recent Scans */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
          <h3 className="text-lg font-semibold mb-4">Scan Terbaru</h3>
          <div className="space-y-3">
            <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
              <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"
                    fill="#10B981"
                  />
                </svg>
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium">Botol Plastik</p>
                <p className="text-xs text-gray-500">2 jam lalu • +50 poin</p>
              </div>
            </div>

            <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
              <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"
                    fill="#10B981"
                  />
                </svg>
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium">Kaleng Aluminium</p>
                <p className="text-xs text-gray-500">5 jam lalu • +75 poin</p>
              </div>
            </div>

            <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
              <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"
                    fill="#10B981"
                  />
                </svg>
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium">Kardus</p>
                <p className="text-xs text-gray-500">1 hari lalu • +30 poin</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </MobilePageLayout>
  );
}
