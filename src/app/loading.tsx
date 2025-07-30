import Image from "next/image";

export default function Loading() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 to-white">
      <div className="text-center">
        <div className="animate-pulse">
          <Image
            src="/logo/logo-2.svg"
            alt="Greevo Logo"
            width={120}
            height={120}
            className="mx-auto mb-4"
          />
        </div>
        <div className="flex space-x-2 justify-center">
          <div
            className="w-2 h-2 bg-green-600 rounded-full animate-bounce"
            style={{ animationDelay: "0ms" }}
          ></div>
          <div
            className="w-2 h-2 bg-green-600 rounded-full animate-bounce"
            style={{ animationDelay: "150ms" }}
          ></div>
          <div
            className="w-2 h-2 bg-green-600 rounded-full animate-bounce"
            style={{ animationDelay: "300ms" }}
          ></div>
        </div>
      </div>
    </div>
  );
}
