import { useState, useEffect } from 'react';
import HeroSection from './components/HeroSection';
import FeaturesSection from './components/FeaturesSection';
import QuickLinksSection from './components/StatsSection';
import HelpSection from './components/CTASection';
import LandingNavbar from '@/components/landing/LandingNavbar';
import LandingFooter from '@/components/landing/LandingFooter';
import PageLoader from '@/components/PageLoader';

const LandingPage = () => {
  const [isLoading, setIsLoading] = useState(() => {
    // Only show loader if not visited in this session
    return !sessionStorage.getItem('landing-visited');
  });

  useEffect(() => {
    if (isLoading) {
      // Mark as visited
      sessionStorage.setItem('landing-visited', 'true');
      
      // Always hide loader after timeout
      const timer = setTimeout(() => {
        setIsLoading(false);
      }, 1000);

      return () => clearTimeout(timer);
    }
  }, [isLoading]);

  if (isLoading) {
    return <PageLoader />;
  }

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
