import { Button } from "@heroui/react";

const HeroSection = () => {
  return (
    <section className="relative overflow-hidden bg-background pt-16 pb-20 lg:pt-[12rem] lg:pb-32">
      <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-primary/10 via-background to-background -z-10" />
      <div className="container mx-auto px-6">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
          <div className="flex-1 text-center lg:text-left space-y-8">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight leading-tight">
              Selamat Datang di <br className="hidden lg:block" />
              <span className="text-primary">Digilet</span>  - Dinul Islam
            </h1>
            <p className="text-lg md:text-xl text-default-500 max-w-2xl mx-auto lg:mx-0">
              Sistem informasi pengelolaan surat digital untuk Universitas Muhammadiyah Gorontalo. Kelola persuratan dengan mudah, aman, dan terverifikasi.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
              <Button 
                as="a"
                href="/login"
                color="primary" 
                size="lg" 
                variant="shadow" 
                className="font-semibold px-8 w-full sm:w-auto"
              >
                Login ke Sistem
              </Button>
              <Button 
                color="primary" 
                size="lg" 
                variant="bordered" 
                className="font-semibold px-8 w-full sm:w-auto"
                onPress={() => document.getElementById('panduan')?.scrollIntoView({ behavior: 'smooth' })}
              >
                Lihat Panduan
              </Button>
            </div>
            
            <div className="pt-4 flex items-center justify-center lg:justify-start gap-8 text-default-400">
               <div className="flex items-center gap-2">
                   <div className="p-1 bg-success/10 rounded-full">
                       <svg className="w-4 h-4 text-success" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg>
                   </div>
                   <span className="text-sm font-medium">Aman & Terverifikasi</span>
               </div>
               <div className="flex items-center gap-2">
                   <div className="p-1 bg-success/10 rounded-full">
                       <svg className="w-4 h-4 text-success" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" /></svg>
                   </div>
                   <span className="text-sm font-medium">Tanda Tangan Digital</span>
               </div>
            </div>
          </div>
          
          <div className="flex-1 relative">
            {/* <div className="relative z-10 rounded-2xl shadow-2xl bg-content1 border border-default-200 p-2 transform rotate-2 hover:rotate-0 transition-transform duration-500">
                <Image
                    src={MailImage}
                    alt="Lettera Dashboard Preview"
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
