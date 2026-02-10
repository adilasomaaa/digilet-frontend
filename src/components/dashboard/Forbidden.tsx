import { Button } from "@heroui/react";

const Forbidden = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] text-center p-4">
      <div className="mb-6">
        <svg
          className="mx-auto h-24 w-24 text-red-500"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          aria-hidden="true"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
          />
        </svg>
      </div>
      <h1 className="text-4xl font-extrabold text-gray-900 sm:text-5xl">403</h1>
      <h2 className="mt-2 text-2xl font-bold text-gray-800">Akses Ditolak</h2>
      <p className="mt-4 text-lg text-gray-600 max-w-md">
        Maaf, Anda tidak memiliki izin yang diperlukan untuk mengakses halaman ini.
      </p>
      <div className="mt-8">
        <Button
          onPress={() => window.history.back()} 
        >
          Kembali ke Halaman Sebelumnya
        </Button>
      </div>
    </div>
  );
};

export default Forbidden;