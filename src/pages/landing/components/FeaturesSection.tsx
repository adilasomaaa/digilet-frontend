import { Card, CardBody, CardHeader } from "@heroui/react";

const guides = [
  {
    title: "Cara Mengajukan Surat",
    description: "Login ke sistem, pilih jenis surat yang ingin diajukan, isi formulir dengan lengkap, dan submit untuk diproses.",
    icon: (
      <svg className="w-6 h-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
      </svg>
    ),
  },
  {
    title: "Melacak Status Surat",
    description: "Akses menu 'Riwayat Surat' untuk melihat status pengajuan Anda secara real-time dari pending hingga approved.",
    icon: (
      <svg className="w-6 h-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
      </svg>
    ),
  },
  {
    title: "Verifikasi Tanda Tangan",
    description: "Scan QR Code pada surat untuk memverifikasi keaslian tanda tangan digital dan validitas dokumen.",
    icon: (
      <svg className="w-6 h-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v1m6 11h2m-6 0h-2v4m0-11v3m0 0h.01M12 12h4.01M16 20h4M4 12h4m12 0h.01M5 8h2a1 1 0 001-1V5a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1zm12 0h2a1 1 0 001-1V5a1 1 0 00-1-1h-2a1 1 0 00-1 1v2a1 1 0 001 1zM5 20h2a1 1 0 001-1v-2a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1z" />
      </svg>
    ),
  },
  {
    title: "Mengakses Arsip",
    description: "Gunakan menu 'Arsip' untuk menyimpan, mencari, dan mengelola seluruh dokumen surat dalam penyimpanan digital.",
    icon: (
      <svg className="w-6 h-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" />
      </svg>
    ),
  },
];

const FeaturesSection = () => {
  return (
    <section id="panduan" className="py-20 bg-content1/50">
      <div className="container mx-auto px-6">
        <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Panduan Penggunaan</h2>
            <p className="text-default-500">
                Pelajari cara menggunakan sistem Digilet untuk mengelola persuratan digital dengan mudah dan efisien.
            </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {guides.map((guide, index) => (
            <Card key={index} className="border-none shadow-md hover:shadow-xl transition-shadow duration-300">
              <CardHeader className="flex gap-3 pt-6 px-6">
                <div className="p-3 bg-primary/10 rounded-xl">
                  {guide.icon}
                </div>
              </CardHeader>
              <CardBody className="px-6 pb-6">
                <h3 className="text-xl font-semibold mb-2">{guide.title}</h3>
                <p className="text-default-500 text-sm leading-relaxed">
                  {guide.description}
                </p>
              </CardBody>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
