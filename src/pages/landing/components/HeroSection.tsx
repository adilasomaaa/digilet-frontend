import { Button, Image } from "@heroui/react";
import MailImage from "@/assets/mail.jpg";

const HeroSection = () => {
  return (
    <section className="relative overflow-hidden bg-background pt-16 pb-20 lg:pt-24 lg:pb-32">
      <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-primary/10 via-background to-background -z-10" />
      <div className="container mx-auto px-6">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
          <div className="flex-1 text-center lg:text-left space-y-8">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight leading-tight">
              Kelola Persuratan <br className="hidden lg:block" />
              <span className="text-primary">Lebih Mudah & Cepat</span>
            </h1>
            <p className="text-lg md:text-xl text-default-500 max-w-2xl mx-auto lg:mx-0">
              Platform modern untuk pengelolaan surat digital yang efisien, aman, dan terintegrasi untuk institusi pendidikan Anda.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
              <Button color="primary" size="lg" variant="shadow" className="font-semibold px-8 w-full sm:w-auto">
                Mulai Sekarang
              </Button>
              <Button color="primary" size="lg" variant="bordered" className="font-semibold px-8 w-full sm:w-auto">
                Pelajari Lebih Lanjut
              </Button>
            </div>
            
            <div className="pt-4 flex items-center justify-center lg:justify-start gap-8 text-default-400">
               <div className="flex items-center gap-2">
                   <div className="p-1 bg-success/10 rounded-full">
                       <svg className="w-4 h-4 text-success" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                   </div>
                   <span className="text-sm font-medium">Terverifikasi</span>
               </div>
               <div className="flex items-center gap-2">
                   <div className="p-1 bg-success/10 rounded-full">
                       <svg className="w-4 h-4 text-success" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                   </div>
                   <span className="text-sm font-medium">Tanda Tangan Digital</span>
               </div>
            </div>
          </div>
          
          <div className="flex-1 relative">
            {/* <div className="relative z-10 rounded-2xl shadow-2xl bg-content1 border border-default-200 p-2 transform rotate-2 hover:rotate-0 transition-transform duration-500">
                <Image
                    src={MailImage}
                    alt="Digilet Dashboard Preview"
                    className="rounded-xl w-full h-auto object-cover"
                />
            </div> */}
            
             {/* Decorative Elements */}
            <div className="absolute -top-10 -right-10 w-40 h-40 bg-primary/20 rounded-full blur-3xl" />
            <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-secondary/20 rounded-full blur-3xl" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
