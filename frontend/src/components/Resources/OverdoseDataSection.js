import React, { useEffect, useRef, useState } from 'react';

const OverdoseDataSection = () => {
  const totalOverdosesRef = useRef(null);
  const opioidOverdosesRef = useRef(null);
  const [animationTriggered, setAnimationTriggered] = useState(false);

  useEffect(() => {
    const handleScroll = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting && !animationTriggered) {
          startCountUpAnimation(totalOverdosesRef.current, 107941);
          startCountUpAnimation(opioidOverdosesRef.current, 81806);
          setAnimationTriggered(true);
        }
      });
    };

    const observer = new IntersectionObserver(handleScroll, {
      threshold: 0.1,
    });

    if (totalOverdosesRef.current) {
      observer.observe(totalOverdosesRef.current);
    }
    if (opioidOverdosesRef.current) {
      observer.observe(opioidOverdosesRef.current);
    }

    return () => {
      if (totalOverdosesRef.current) {
        observer.unobserve(totalOverdosesRef.current);
      }
      if (opioidOverdosesRef.current) {
        observer.unobserve(opioidOverdosesRef.current);
      }
    };
  }, [animationTriggered]);

  const formatNumberWithCommas = (number) => {
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  const startCountUpAnimation = (element, target) => {
    let start = 0;
    const duration = 800;
    const increment = target / (duration / 16.666);

    const step = () => {
      start += increment;
      if (start < target) {
        element.textContent = formatNumberWithCommas(Math.ceil(start));
        requestAnimationFrame(step);
      } else {
        element.textContent = formatNumberWithCommas(target);
      }
    };

    requestAnimationFrame(step);
  };

  return (
    <div className="overdose-data-section">
      <h2 className="overdose-data-header">
        <span className="overdose">NATIONAL OVERDOSE DATA</span> 
      </h2>
      <div className="overdose-statistics">
        <div className="statistics-left">
          <div className="total-overdoses">
            <div className="text-wrapper">
              <p>Total Overdoses:</p>
            </div>
            <p ref={totalOverdosesRef} style={{ color: 'white' }}>0</p>
          </div>
          <div className="opioid-overdoses">
            <div className="text-wrapper">
              <p>Opioid Overdoses:</p>
            </div>
            <p ref={opioidOverdosesRef} style={{ color: 'white' }}>0</p>
          </div>
        </div>
        <div className="overdose-chart">
          <img src="Overdose Deaths Chart.svg" alt="Overdose Deaths: 1999-2022" />
        </div>
      </div>
    </div>
  );
};

export default OverdoseDataSection;