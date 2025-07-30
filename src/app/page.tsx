import Image from "next/image";

export default function Home() {
  return (
    <>
      {/* Desktop View - Only Mobile Message */}
      <div className="hidden md:block min-h-screen relative">
        {/* Background Image Layer */}
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: "url('/assets/welcome/only-mobile.svg')",
          }}
        ></div>

        {/* Gradient Overlay */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(178deg, rgba(217, 217, 217, 0.00) -43.16%, rgba(33, 56, 19, 0.83) 98.45%)",
          }}
        ></div>

        {/* Content Layer */}
        <div className="relative z-10 flex flex-col min-h-screen p-8">
          {/* Main Content - Centered */}
          <div className="flex-1 flex items-center justify-center">
            <div className="text-center text-white w-full">
              <h1
                className="mb-6"
                style={{
                  color: "#FFF",
                  textAlign: "center",
                  fontFamily: "Poppins",
                  fontSize: "36px",
                  fontStyle: "normal",
                  fontWeight: 600,
                  lineHeight: "normal",
                }}
              >
                Greevo hanya tersedia di perangkat mobile.
              </h1>
              <p
                style={{
                  color: "#FFF",
                  textAlign: "center",
                  fontFamily: "Poppins",
                  fontSize: "20px",
                  fontStyle: "normal",
                  fontWeight: 500,
                  lineHeight: "normal",
                }}
              >
                Silakan akses situs ini melalui smartphone Anda untuk pengalaman
                terbaik.
              </p>
            </div>
          </div>

          {/* Footer Logo */}
          <div className="flex justify-center pb-11">
            <Image
              src="/logo/logo-6.svg"
              alt="Greevo Logo"
              width={180}
              height={86}
            />
          </div>
        </div>
      </div>

      {/* Mobile View - Main App */}
      <div
        className="md:hidden min-h-screen"
        style={{
          background:
            "linear-gradient(178deg, rgba(217, 217, 217, 0.00) -43.16%, rgba(33, 56, 19, 0.83) 98.45%)",
        }}
      >
        <div className="flex flex-col items-center justify-center min-h-screen p-6 text-white">
          {/* Logo */}
          <div className="mb-12">
            <Image
              src="/logo-6.svg"
              alt="Greevo Logo"
              width={200}
              height={96}
              className="mx-auto"
            />
          </div>

          {/* Welcome Content */}
          <div className="text-center space-y-6 max-w-sm">
            <h1 className="poppins-bold text-3xl">Welcome to Greevo</h1>

            <p className="poppins-regular text-lg opacity-90">
              Your sustainable companion for a greener lifestyle
            </p>

            <p className="poppins-light text-base opacity-75">
              Discover eco-friendly solutions and track your environmental
              impact
            </p>
          </div>

          {/* Action Buttons */}
          <div className="mt-12 space-y-4 w-full max-w-xs">
            <button className="poppins-semibold w-full bg-white text-green-800 py-4 px-6 rounded-full text-lg hover:bg-gray-100 transition-colors">
              Get Started
            </button>

            <button className="poppins-regular w-full border-2 border-white text-white py-4 px-6 rounded-full text-lg hover:bg-white hover:text-green-800 transition-colors">
              Learn More
            </button>
          </div>

          {/* Bottom Navigation Hint */}
          <div className="mt-8 opacity-60">
            <div className="flex space-x-2">
              <div className="w-2 h-2 bg-white rounded-full"></div>
              <div className="w-2 h-2 bg-white/50 rounded-full"></div>
              <div className="w-2 h-2 bg-white/50 rounded-full"></div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
