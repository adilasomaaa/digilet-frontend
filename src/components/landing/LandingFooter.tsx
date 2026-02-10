import { Link } from "@heroui/react";

const LandingFooter = () => {
    return (
        <footer className="w-full py-12 px-6 bg-content1 border-t border-divider mt-auto">
            <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
                <div className="flex flex-col gap-2">
                     <div className="flex items-center gap-2">
                        <p className="font-bold text-lg">Digilet</p>
                    </div>
                    <p className="text-default-500 text-sm">© 2024 Digilet. All rights reserved.</p>
                </div>
                
                <div className="flex gap-6">
                    <Link href="#" color="foreground" className="text-sm text-default-500 hover:text-primary">
                        Privacy Policy
                    </Link>
                    <Link href="#" color="foreground" className="text-sm text-default-500 hover:text-primary">
                        Terms of Service
                    </Link>
                </div>
            </div>
        </footer>
    );
};

export default LandingFooter;
