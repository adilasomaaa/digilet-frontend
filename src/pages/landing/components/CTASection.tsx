import { Card, CardBody } from "@heroui/react";

const HelpSection = () => {
  return (
    <section id="bantuan" className="py-20 bg-content1/50">
      <div className="container mx-auto px-6">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Butuh Bantuan?</h2>
          <p className="text-default-500">
            Kami siap membantu Anda dalam menggunakan sistem Digilet
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          <Card className="border-none shadow-md">
            <CardBody className="text-center p-8 space-y-4">
              <div className="flex justify-center">
                <div className="p-4 bg-primary/10 rounded-full">
                  <svg className="w-8 h-8 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
              </div>
              <div>
                <h3 className="text-xl font-bold mb-2">Email</h3>
                <p className="text-default-500 text-sm mb-3">Hubungi kami via email</p>
                <a href="mailto:support@digilet.com" className="text-primary hover:underline">
                  support@digilet.com
                </a>
              </div>
            </CardBody>
          </Card>

          <Card className="border-none shadow-md">
            <CardBody className="text-center p-8 space-y-4">
              <div className="flex justify-center">
                <div className="p-4 bg-primary/10 rounded-full">
                  <svg className="w-8 h-8 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
              </div>
              <div>
                <h3 className="text-xl font-bold mb-2">FAQ</h3>
                <p className="text-default-500 text-sm mb-3">Pertanyaan yang sering diajukan</p>
                <a href="#panduan" className="text-primary hover:underline">
                  Lihat FAQ
                </a>
              </div>
            </CardBody>
          </Card>

          <Card className="border-none shadow-md">
            <CardBody className="text-center p-8 space-y-4">
              <div className="flex justify-center">
                <div className="p-4 bg-primary/10 rounded-full">
                  <svg className="w-8 h-8 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                  </svg>
                </div>
              </div>
              <div>
                <h3 className="text-xl font-bold mb-2">Dokumentasi</h3>
                <p className="text-default-500 text-sm mb-3">Panduan lengkap penggunaan</p>
                <a href="#panduan" className="text-primary hover:underline">
                  Baca Dokumentasi
                </a>
              </div>
            </CardBody>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default HelpSection;
