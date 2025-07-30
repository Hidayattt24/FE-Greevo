import Image from "next/image";

export default function Home() {
  return (
    <div className="min-h-screen p-8 pb-20 gap-16 sm:p-20">
      <main className="flex flex-col gap-8 items-center">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="poppins-black text-4xl sm:text-6xl mb-4">
            Welcome to Greevo
          </h1>
          <p className="poppins-light text-lg sm:text-xl text-gray-600">
            Demonstrasi penggunaan font Poppins
          </p>
        </div>

        {/* Font Weight Examples */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-6xl">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
            <h3 className="poppins-semibold text-xl mb-3">
              Font Weights Normal
            </h3>
            <div className="space-y-2">
              <p className="poppins-thin">Poppins Thin (100)</p>
              <p className="poppins-extralight">Poppins Extra Light (200)</p>
              <p className="poppins-light">Poppins Light (300)</p>
              <p className="poppins-regular">Poppins Regular (400)</p>
              <p className="poppins-medium">Poppins Medium (500)</p>
              <p className="poppins-semibold">Poppins Semi Bold (600)</p>
              <p className="poppins-bold">Poppins Bold (700)</p>
              <p className="poppins-extrabold">Poppins Extra Bold (800)</p>
              <p className="poppins-black">Poppins Black (900)</p>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
            <h3 className="poppins-semibold text-xl mb-3">
              Font Weights Italic
            </h3>
            <div className="space-y-2">
              <p className="poppins-thin-italic">Poppins Thin Italic (100)</p>
              <p className="poppins-extralight-italic">
                Poppins Extra Light Italic (200)
              </p>
              <p className="poppins-light-italic">Poppins Light Italic (300)</p>
              <p className="poppins-regular-italic">
                Poppins Regular Italic (400)
              </p>
              <p className="poppins-medium-italic">
                Poppins Medium Italic (500)
              </p>
              <p className="poppins-semibold-italic">
                Poppins Semi Bold Italic (600)
              </p>
              <p className="poppins-bold-italic">Poppins Bold Italic (700)</p>
              <p className="poppins-extrabold-italic">
                Poppins Extra Bold Italic (800)
              </p>
              <p className="poppins-black-italic">Poppins Black Italic (900)</p>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
            <h3 className="poppins-semibold text-xl mb-3">Contoh Penggunaan</h3>
            <div className="space-y-4">
              <div>
                <h4 className="poppins-bold text-lg">Judul Artikel</h4>
                <p className="poppins-regular text-sm">
                  Ini adalah contoh paragraf dengan font Poppins regular.
                </p>
              </div>
              <div>
                <h4 className="poppins-medium text-base">Sub Judul</h4>
                <p className="poppins-light text-sm">
                  Teks dengan weight light untuk konten yang lebih ringan.
                </p>
              </div>
              <div className="text-center">
                <button className="poppins-semibold bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition-colors">
                  Button Example
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Sample Content */}
        <div className="max-w-4xl text-center mt-12">
          <h2 className="poppins-bold text-3xl mb-6">
            Semua Font Sudah Siap Digunakan!
          </h2>
          <p className="poppins-regular text-lg mb-4">
            Sekarang Anda dapat menggunakan class-class CSS yang telah dibuat
            untuk mengatur font weight dan style Poppins di seluruh project
            Greevo.
          </p>
          <p className="poppins-light text-base text-gray-600">
            Gunakan class seperti{" "}
            <code className="poppins-medium bg-gray-200 dark:bg-gray-700 px-2 py-1 rounded">
              poppins-bold
            </code>
            ,
            <code className="poppins-medium bg-gray-200 dark:bg-gray-700 px-2 py-1 rounded ml-2">
              poppins-light-italic
            </code>
            , atau class lainnya sesuai kebutuhan desain Anda.
          </p>
        </div>
      </main>
    </div>
  );
}
