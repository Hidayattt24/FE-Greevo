import Link from "next/link";
import Image from "next/image";
import { ROUTES } from "@/lib/constants";

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 to-white">
      <div className="text-center p-8 max-w-md">
        <Image
          src="/logo/logo-2.svg"
          alt="Greevo Logo"
          width={100}
          height={100}
          className="mx-auto mb-6"
        />
        <h2 className="text-3xl font-bold text-gray-800 mb-4">404</h2>
        <h3 className="text-xl font-semibold text-gray-700 mb-4">
          Page Not Found
        </h3>
        <p className="text-gray-600 mb-6">
          The page you are looking for doesn&apos;t exist or has been moved.
        </p>
        <Link
          href={ROUTES.HOME}
          className="inline-block bg-green-600 text-white px-6 py-3 rounded-full hover:bg-green-700 transition-colors"
        >
          Go Home
        </Link>
      </div>
    </div>
  );
}
