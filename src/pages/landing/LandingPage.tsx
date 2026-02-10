import HeroSection from './components/HeroSection';
import FeaturesSection from './components/FeaturesSection';
import QuickLinksSection from './components/StatsSection';
import HelpSection from './components/CTASection';
import LandingNavbar from '@/components/landing/LandingNavbar';
import LandingFooter from '@/components/landing/LandingFooter';

const LandingPage = () => {
  return (
    <>
        <LandingNavbar />
        <HeroSection />
        <FeaturesSection />
        <QuickLinksSection />
        <HelpSection />
        <LandingFooter />
    </>
  );
};

export default LandingPage;
