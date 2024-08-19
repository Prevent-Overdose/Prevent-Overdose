import React, { useState, useEffect, lazy, Suspense } from 'react';
import './Resources.css';
import FadeInSection from '../hooks/fadeInSection';

// Lazy load components
const OverdoseDataSection = lazy(() => import('../components/Resources/OverdoseDataSection'));
const DrugInvolvementSection = lazy(() => import('../components/Resources/DrugInvolvementSection'));
const LethalStatsSection = lazy(() => import('../components/Resources/LethalStatsSection'));

const Resources = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    document.title = "Resources | Prevent Overdose Inc.";
    setIsLoading(false);
  }, []);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="resources-container">
      <Suspense fallback={<div>Loading...</div>}>
        <FadeInSection>
          <OverdoseDataSection />
        </FadeInSection>
        <FadeInSection>
          <DrugInvolvementSection />
        </FadeInSection>
        <FadeInSection>
          <LethalStatsSection />
        </FadeInSection>
      </Suspense>
    </div>
  );
};

export default Resources;