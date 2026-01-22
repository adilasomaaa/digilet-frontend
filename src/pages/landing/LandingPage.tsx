import HeroSection from './components/HeroSection';
import FeaturesSection from './components/FeaturesSection';
import StatsSection from './components/StatsSection';
import CTASection from './components/CTASection';
import LandingNavbar from '@/components/landing/LandingNavbar';
import LandingFooter from '@/components/landing/LandingFooter';

const LandingPage = () => {
  return (
    <>
        <LandingNavbar />
        <HeroSection />
        <FeaturesSection />
        <StatsSection />
        <CTASection />
        <LandingFooter />
    </>
  );
};

export default LandingPage;
