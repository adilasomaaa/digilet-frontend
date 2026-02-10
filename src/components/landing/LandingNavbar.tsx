import { Navbar, NavbarBrand, NavbarContent, NavbarItem, Button, Link, Image } from "@heroui/react";
import Logo from "../../assets/logo.png";
import LogoUmgo from "../../assets/umgo_logo.png";

const LandingNavbar = () => {
  return (
    <Navbar maxWidth="xl" className="bg-background/70 backdrop-blur-md border-b border-divider">
      <NavbarBrand>
        <div className="flex items-center gap-2">
            <Image src={LogoUmgo} alt="Logo" className="h-10" />
            <Image src={Logo} alt="Logo" className="h-10" />
        </div>
      </NavbarBrand>
      
      <NavbarContent className="hidden sm:flex gap-8" justify="center">
        <NavbarItem>
          <Link color="foreground" href="#" className="font-medium hover:text-primary transition-colors">
            Fitur
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link color="foreground" href="#" className="font-medium hover:text-primary transition-colors">
            Tentang
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link color="foreground" href="#" className="font-medium hover:text-primary transition-colors">
            Kontak
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
  );
};

export default LandingNavbar;
