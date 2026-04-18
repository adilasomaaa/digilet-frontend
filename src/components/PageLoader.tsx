import { Spinner } from "@heroui/react";
import Logo from "../assets/logo.png";
import LogoUmgo from "../assets/umgo_logo.png";

const PageLoader = () => {
  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-background">
      <div className="flex flex-col items-center gap-6">
        {/* Logos */}
        <div className="flex items-center gap-4 animate-pulse">
          <img src={LogoUmgo} alt="Logo UMGO" className="h-16 lg:h-20" />
          <img src={Logo} alt="Logo Dinul Islam" className="h-16 lg:h-20" />
        </div>
        
        {/* App Name */}
        <div className="text-center">
          <h1 className="text-2xl lg:text-3xl font-bold text-primary mb-2">
            Digilet
          </h1>
          <p className="text-sm text-foreground-500">
            Digital Letter Management System
          </p>
        </div>
        
        {/* Spinner */}
        <Spinner 
          size="lg" 
          color="primary"
          label="Loading..."
          labelColor="primary"
        />
      </div>
    </div>
  );
};

export default PageLoader;
