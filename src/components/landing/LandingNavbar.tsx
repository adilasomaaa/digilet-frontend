import { Navbar, NavbarBrand, NavbarContent, NavbarItem, Button, Link, Image } from "@heroui/react";
import Logo from "../../assets/logo.png";
import LogoUmgo from "../../assets/umgo_logo.png";

const LandingNavbar = () => {
  return (
    <div className="fixed top-0 left-0 right-0 z-50 px-28 pt-4">
      <Navbar 
        maxWidth="xl" 
        className="bg-background/80 backdrop-blur-md border border-divider rounded-2xl shadow-lg"
      >
        <NavbarBrand>
          <div className="flex items-center gap-3">
            <Image src={LogoUmgo} alt="Logo UMGO" className="h-10" />
            <Image src={Logo} alt="Logo Dinul Islam" className="h-10" />
          </div>
        </NavbarBrand>
        
        <NavbarContent className="hidden sm:flex gap-8" justify="center">
          <NavbarItem>
            <Link color="foreground" href="#panduan" className="font-medium hover:text-primary transition-colors">
              Panduan
            </Link>
          </NavbarItem>
          <NavbarItem>
            <Link color="foreground" href="#bantuan" className="font-medium hover:text-primary transition-colors">
              Bantuan
            </Link>
          </NavbarItem>
          <NavbarItem>
            <Link color="foreground" href="/verify" className="font-medium hover:text-primary transition-colors">
              Verifikasi
            </Link>
          </NavbarItem>
        </NavbarContent>
        
        <NavbarContent justify="end">
          <NavbarItem>
            <Button as={Link} color="primary" href="/login" variant="shadow" className="font-semibold">
              Masuk
            </Button>
          </NavbarItem>
        </NavbarContent>
      </Navbar>
    </div>
  );
};

export default LandingNavbar;
