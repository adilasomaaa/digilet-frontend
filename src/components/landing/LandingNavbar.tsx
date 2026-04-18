import { Navbar, NavbarBrand, NavbarContent, NavbarItem, NavbarMenuToggle, NavbarMenu, NavbarMenuItem, Button, Link, Image } from "@heroui/react";
import { useState } from "react";
import Logo from "../../assets/logo.png";
import LogoUmgo from "../../assets/umgo_logo.png";

const LandingNavbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const menuItems = [
    { label: "Beranda", href: "#beranda" },
    { label: "Fitur", href: "#fitur" },
    { label: "Panduan", href: "#panduan" },
    { label: "Bantuan", href: "#bantuan" },
    { label: "Verifikasi", href: "/verify" },
  ];

  return (
    <div className="fixed top-0 left-0 right-0 z-50 lg:px-28 px-4 pt-4">
      <Navbar 
        maxWidth="xl" 
        className="bg-background/80 backdrop-blur-md border border-divider rounded-2xl shadow-lg"
        onMenuOpenChange={setIsMenuOpen}
        isMenuOpen={isMenuOpen}
      >
        <NavbarContent>
          <NavbarMenuToggle
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
            className="lg:hidden"
          />
          <NavbarBrand>
            <div className="flex items-center gap-2 lg:gap-3">
              <Image src={LogoUmgo} alt="Logo UMGO" className="h-8 lg:h-10" />
              <Image src={Logo} alt="Logo Dinul Islam" className="h-8 lg:h-10" />
            </div>
          </NavbarBrand>
        </NavbarContent>
        
        <NavbarContent className="hidden lg:flex gap-8" justify="center">
          <NavbarItem>
            <Link color="foreground" href="#beranda" className="font-medium hover:text-primary transition-colors">
              Beranda
            </Link>
          </NavbarItem>
          <NavbarItem>
            <Link color="foreground" href="#fitur" className="font-medium hover:text-primary transition-colors">
              Fitur
            </Link>
          </NavbarItem>
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
            <Button 
              as={Link} 
              color="primary" 
              href="/login" 
              variant="shadow" 
              className="font-semibold"
              size="sm"
            >
              Masuk
            </Button>
          </NavbarItem>
        </NavbarContent>

        <NavbarMenu className="pt-6">
          {menuItems.map((item, index) => (
            <NavbarMenuItem key={`${item.label}-${index}`}>
              <Link
                color="foreground"
                className="w-full font-medium hover:text-primary transition-colors py-2"
                href={item.href}
                size="lg"
                onPress={() => setIsMenuOpen(false)}
              >
                {item.label}
              </Link>
            </NavbarMenuItem>
          ))}
          <NavbarMenuItem>
            <Button 
              as={Link} 
              color="primary" 
              href="/login" 
              variant="shadow" 
              className="font-semibold w-full mt-4"
              onPress={() => setIsMenuOpen(false)}
            >
              Masuk
            </Button>
          </NavbarMenuItem>
        </NavbarMenu>
      </Navbar>
    </div>
  );
};

export default LandingNavbar;
