import { Button } from "@heroui/react";
import { Link } from "react-router";

const NotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] px-6 text-center">
      <h1 className="text-9xl font-black text-gray-200">404</h1>

      <p className="text-2xl font-bold tracking-tight text-gray-900 sm:text-4xl mt-4">
        Uh-oh!
      </p>

      <p className="mt-4 text-gray-500">
        Halaman yang Anda cari tidak dapat ditemukan.
      </p>

      <Link to="/">
        <Button color="primary" className="mt-6">
          Kembali ke Beranda
        </Button>
      </Link>
    </div>
  );
};

export default NotFound;