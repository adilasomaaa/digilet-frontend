import { Button } from "@heroui/react";

const CTASection = () => {
  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-6">
        <div className="bg-gradient-to-r from-primary to-secondary rounded-3xl p-8 md:p-16 text-center text-white shadow-2xl overflow-hidden relative">
            {/* Background Pattern */}
             <div className="absolute top-0 right-0 -mr-20 -mt-20 w-64 h-64 bg-white/10 rounded-full blur-3xl" />
             <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-64 h-64 bg-white/10 rounded-full blur-3xl" />
             
            <div className="relative z-10 max-w-3xl mx-auto space-y-6">
                 <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold">
                    Siap Mengoptimalkan Administrasi Anda?
                 </h2>
                 <p className="text-lg md:text-xl text-white/90">
                     Bergabunglah sekarang dan rasakan kemudahan pengelolaan surat menyurat secara digital.
                 </p>
                 <div className="pt-4">
                     <Button size="lg" className="bg-white text-primary font-bold shadow-lg">
                         Daftar Sekarang
                     </Button>
                 </div>
            </div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
