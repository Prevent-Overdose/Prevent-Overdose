import React, { useEffect, useState, useRef, lazy, Suspense } from 'react';
import './Home.css';
import 'font-awesome/css/font-awesome.min.css';

// Lazy load components
const HeroSection = lazy(() => import('../components/HeroSection'));
const MissionSection = lazy(() => import('../components/MissionSection'));
const InitiativesSection = lazy(() => import('../components/InitiativesSection'));
const ImpactSection = lazy(() => import('../components/ImpactSection'));
const ClosingSection = lazy(() => import('../components/ClosingSection'));

const Home = () => {
  const [impactAnimationTriggered, setImpactAnimationTriggered] = useState(false);
  const missionSectionRef = useRef(null);

  useEffect(() => {
    document.title = "Home | Prevent Overdose Inc.";
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

  return (
    <div className="home-container">
      <Suspense fallback={<div>Loading...</div>}>
        <HeroSection handleArrowClick={handleArrowClick} />
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