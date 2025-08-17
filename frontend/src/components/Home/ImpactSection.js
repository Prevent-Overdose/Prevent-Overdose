import React, { useEffect, useRef } from 'react';

const ImpactSection = ({ impactAnimationTriggered, setImpactAnimationTriggered }) => {
  const impactRefs = {
    kitsDistributed: useRef(null),
    overdosesReversed: useRef(null),
    carePackagesDispensed: useRef(null),
  };

  useEffect(() => {
    const handleImpactScroll = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting && !impactAnimationTriggered) {
          const fixedDuration = 1000;
          startCountUpAnimationWithPlus(impactRefs.kitsDistributed.current, 8000, fixedDuration);
          startCountUpAnimationWithPlus(impactRefs.overdosesReversed.current, 100, fixedDuration);
          startCountUpAnimationWithPlus(impactRefs.carePackagesDispensed.current, 1000, fixedDuration);
          setImpactAnimationTriggered(true);
        }
      });
    };

    const impactObserver = new IntersectionObserver(handleImpactScroll, {
      threshold: 0.1,
    });

    Object.values(impactRefs).forEach((ref) => {
      if (ref.current) {
        impactObserver.observe(ref.current);
      }
    });

    return () => {
      Object.values(impactRefs).forEach((ref) => {
        if (ref.current) {
          impactObserver.unobserve(ref.current);
        }
      });
    };
  }, [impactAnimationTriggered, setImpactAnimationTriggered]);

  const formatNumberWithCommas = (number) => {
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  const startCountUpAnimationWithPlus = (element, target, duration) => {
    let start = 0;
    const increment = target / (duration / 16.666);

    const step = () => {
      start += increment;
      if (start < target) {
        element.textContent = formatNumberWithCommas(Math.ceil(start)) + "+";
        requestAnimationFrame(step);
      } else {
        element.textContent = formatNumberWithCommas(target) + "+";
      }
    };
    requestAnimationFrame(step);
  };

  return (
    <div className="impact-section">
      <h2 className="impact-header">
        OUR <span className="impact-highlight">IMPACT</span>
      </h2>
      <div className="impact-content">
        <ImpactItem number={1000} text="Kits of Narcan distributed" ref={impactRefs.kitsDistributed} />
        <ImpactItem number={15} text="Overdoses reversed" ref={impactRefs.overdosesReversed} />
        <ImpactItem number={500} text="Hygiene care packages dispensed" ref={impactRefs.carePackagesDispensed} />
      </div>
    </div>
  );
};

const ImpactItem = React.forwardRef(({ number, text }, ref) => (
  <div className="impact-item">
    <h3 className="impact-number" ref={ref}>0</h3>
    <p className="impact-text">{text}</p>
  </div>
));

export default ImpactSection;
