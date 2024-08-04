import React, { useEffect, useRef, useState } from 'react';
import './Resources.css';
import 'font-awesome/css/font-awesome.min.css';

const Resources = () => {
  const totalOverdosesRef = useRef(null);
  const opioidOverdosesRef = useRef(null);
  const [animationTriggered, setAnimationTriggered] = useState(false);

  useEffect(() => {
    document.title = "Resources | Prevent Overdose Inc.";

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
    const duration = 800; // Global CountUp duration
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
    <div className="resources-container">
      <div className="overdose-data-section">
        <h2 className="overdose-data-header">
          <span className="overdose">NATIONAL OVERDOSE</span> <span className="data">DATA</span>
        </h2>
        <div className="overdose-statistics">
          <div className="statistics-left">
            <div className="total-overdoses">
              <div className="text-wrapper">
                <p>Total Overdoses:</p>
              </div>
              <h3 ref={totalOverdosesRef}>0</h3>
            </div>
            <div className="opioid-overdoses">
              <div className="text-wrapper">
                <p>Opioid Overdoses:</p>
              </div>
              <h3 ref={opioidOverdosesRef}>0</h3>
            </div>
          </div>
          <div className="overdose-chart">
            <img src="Overdose Deaths Chart.svg" alt="Overdose Deaths: 1999-2022" />
          </div>
        </div>
      </div>
      <div className="drug-involvement-section">
        <h2 className="drug-involvement-header">DRUG INVOLVEMENT IN OVERDOSE FATALITIES</h2>
        <div className="drug-involvement-content">
          <div className="drug-involvement-text">
            <p>
              This bubble chart presents the 2022 fatal overdose data for various drugs in the United States, as sourced from the CDC.
              Bubble size correlates with overdose fatalities involving each drug, with red bubbles signifying opioids and white bubbles
              denoting non-opioid substances. The prevalence of poly-drug involvement complicates the attribution of fatalities to a single substance, highlighting
              the complexity of the overdose epidemic.
            </p>
          </div>
          <div className="bubble-chart">
            <div className="bubble opioid fentanyl" data-deaths="73838">
              <span className="bubble-name">Fentanyl</span>
              <span className="bubble-number">73,838</span>
            </div>
            <div className="bubble opioid heroin" data-deaths="5871">
              <span className="bubble-name">Heroin</span>
              <span className="bubble-number">5,871</span>
            </div>
            <div className="bubble opioid oxycodone" data-deaths="11871">
              <span className="bubble-name">Oxycodone</span>
              <span className="bubble-number">11,871</span>
            </div>
            <div className="bubble non-opioid cocaine" data-deaths="27569">
              <span className="bubble-name">Cocaine</span>
              <span className="bubble-number">27,569</span>
            </div>
            <div className="bubble opioid methadone" data-deaths="3334">
              <span className="bubble-name">Methadone</span>
              <span className="bubble-number">3,334</span>
            </div>
            <div className="bubble non-opioid benzodiazepines" data-deaths="10964">
              <span className="bubble-name">Benzodiazepines</span>
              <span className="bubble-number">10,964</span>
            </div>
            <div className="bubble non-opioid psychostimulants" data-deaths="34022">
              <span className="bubble-name">Psychostimulants</span>
              <span className="bubble-number">34,022</span>
            </div>
            <div className="bubble non-opioid cannabis" data-deaths="1161">
              <span className="bubble-name">Cannabis</span>
              <span className="bubble-number">1,161</span>
            </div>
          </div>
        </div>
      </div>
      <div className="lethal-stats-section">
        <div className="conveyor">
          <div className="conveyor-belt">
            <div className="lethal-item">
              <div className="lethal-dose">
                <div className="lethal-dose-header">The Lethal Dose of Fentanyl</div>
                <div className="lethal-dose-image">
                  <img src="penny.png" />
                </div>
              </div>
            </div>
            <div className="lethal-item">
              <div className="stat">
                <h2>36%</h2>
                <p>of opioid overdoses are fatal within seconds or minutes</p>
              </div>
            </div>
            <div className="lethal-item">
              <div className="stat">
                <h2>42%</h2>
                <p>of illegally obtained pills are laced with fentanyl</p>
              </div>
            </div>
            <div className="lethal-item">
              <div className="stat">
                <h2>60%</h2>
                <p>of fentanyl-laced pills contain a lethal dose (&gt;2mg)</p>
              </div>
            </div>
            <div className="lethal-item">
              <div className="stat">
                <h2>75.8%</h2>
                <p>of all overdoses involve opioids</p>
              </div>
            </div>
            <div className="lethal-item">
              <div className="stat">
                <h2>94.9%</h2>
                <p>of opioid overdoses are preventable</p>
              </div>
            </div>
            {/* Duplicate slides to create continuous loop effect */}
            <div className="lethal-item">
              <div className="lethal-dose">
                <div className="lethal-dose-header">The Lethal Dose of Fentanyl</div>
                <div className="lethal-dose-image">
                  <img src="penny.png" />
                </div>
              </div>
            </div>
            <div className="lethal-item">
              <div className="stat">
                <h2>36%</h2>
                <p>of opioid overdoses are fatal within seconds or minutes</p>
              </div>
            </div>
            <div className="lethal-item">
              <div className="stat">
                <h2>42%</h2>
                <p>of illegally obtained pills are laced with fentanyl</p>
              </div>
            </div>
            <div className="lethal-item">
              <div className="stat">
                <h2>60%</h2>
                <p>of fentanyl-laced pills contain a lethal dose (&gt;2mg)</p>
              </div>
            </div>
            <div className="lethal-item">
              <div className="stat">
                <h2>75.8%</h2>
                <p>of all overdoses involve opioids</p>
              </div>
            </div>
            <div className="lethal-item">
              <div className="stat">
                <h2>94.9%</h2>
                <p>of opioid overdoses are preventable</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Resources;
