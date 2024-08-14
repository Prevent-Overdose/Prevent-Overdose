import React, { useEffect, useState, useRef, lazy, Suspense } from 'react';
import './Home.css';
import 'font-awesome/css/font-awesome.min.css';
import HeroSection from '../components/HeroSection'; // Import HeroSection directly

// Lazy load other components
const MissionSection = lazy(() => import('../components/MissionSection'));
const InitiativesSection = lazy(() => import('../components/InitiativesSection'));
const ImpactSection = lazy(() => import('../components/ImpactSection'));
const ClosingSection = lazy(() => import('../components/ClosingSection'));

const Home = () => {
  const [impactAnimationTriggered, setImpactAnimationTriggered] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const missionSectionRef = useRef(null);

  useEffect(() => {
    document.title = "Home | Prevent Overdose Inc.";
    setIsLoading(false); // Set loading to false after initial render
  }, []);

  const handleArrowClick = () => {
    if (missionSectionRef.current) {
      const headerHeight = document.querySelector('header').offsetHeight;
      const missionSectionTop = missionSectionRef.current.getBoundingClientRect().top;
      const offsetPosition = missionSectionTop + window.pageYOffset - headerHeight;
  
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  if (isLoading) {
    return <div>Loading...</div>; // You can replace this with a more attractive loading indicator
  }

  return (
    <div className="home-container">
      <HeroSection handleArrowClick={handleArrowClick} />
      <Suspense fallback={<div>Loading...</div>}>
        <MissionSection ref={missionSectionRef} />
        <InitiativesSection />
        <ImpactSection 
          impactAnimationTriggered={impactAnimationTriggered}
          setImpactAnimationTriggered={setImpactAnimationTriggered}
        />
        <ClosingSection />
      </Suspense>
    </div>
  );
};

export default Home;