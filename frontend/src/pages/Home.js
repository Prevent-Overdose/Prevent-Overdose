import React, { useEffect, useState, useRef } from 'react';
import './Home.css';
import 'font-awesome/css/font-awesome.min.css';
import Footer from '../components/Footer';

const Home = () => {
  const motto = "A DIRECT RESPONSE TO A DEADLY PROBLEM.";
  const [displayText, setDisplayText] = useState(motto);
  const [showButton, setShowButton] = useState(false);
  const [animationTriggered, setAnimationTriggered] = useState(false);
  const [impactAnimationTriggered, setImpactAnimationTriggered] = useState(false);
  const totalOverdosesRef = useRef(null);
  const opioidOverdosesRef = useRef(null);
  const impactRefs = {
    kitsDistributed: useRef(null),
    overdosesReversed: useRef(null),
    carePackagesDispensed: useRef(null),
  };
  const lethalStatsRef = useRef(null);

  useEffect(() => {
    document.title = "Home | Prevent Overdose Inc.";
    let currentIndex = 0;

    if (window.innerWidth < 768) {
      setDisplayText(motto);
      setShowButton(true);
      return;
    } else {
      const typeMottoEffect = () => {
        if (currentIndex < motto.length) {
          setDisplayText(motto.substring(0, currentIndex + 1));
          currentIndex++;
          setTimeout(typeMottoEffect, 80);
        } else {
          setShowButton(true);
        }
      };
      typeMottoEffect();
    }
  }, []);

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

  useEffect(() => {
    const handleImpactScroll = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting && !impactAnimationTriggered) {
          const fixedDuration = 1000; // Fixed duration for all countingUp animations
          startCountUpAnimationWithPlus(impactRefs.kitsDistributed.current, 1000, fixedDuration);
          startCountUpAnimationWithPlus(impactRefs.overdosesReversed.current, 15, fixedDuration);
          startCountUpAnimationWithPlus(impactRefs.carePackagesDispensed.current, 500, fixedDuration);
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
  }, [impactAnimationTriggered]);

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

  const renderMotto = () => {
    const words = displayText.split(" ");
    return words.map((word, index) => {
      if (word === "DIRECT" || word === "DEADLY") {
        return (
          <span key={index} className="bold-effect">
            {word}{" "}
          </span>
        );
      }
      return <span key={index}>{word} </span>;
    });
  };

  

  

  return (
    <div className="home-container">
      <div className="hero-section">
        <div className="hero-background"></div>
        <div className="hero-content">
          <h1 className={`motto ${window.innerWidth < 768 ? "fade-in" : ""}`}>{renderMotto()}</h1>
          {showButton && (
            <a href="/request-narcan" className="request-narcan">
              <img src="Request Narcan.png" alt="Request Narcan" />
            </a>
          )}
          <div className="arrow"> ↓</div>
        </div>
      </div>
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
      <div className="mission-section">
        <div className="mission-left">
          <h2 className="mission-header">
            OUR <span className="mission-highlight">MISSION</span>
          </h2>
        </div>
        <div className="mission-right">
          <div className="mission-text">
            Safeguarding communities through harm reduction education, training, resources, and advocacy.
          </div>
        </div>
      </div>
      <div className="initiatives-section">
        <h2 className="initiatives-header">
          OUR <span className="initiatives-highlight">INITIATIVES</span>
        </h2>
        <div className="initiatives-content">
          <div className="initiative initiative-1">
            <p className="initiative-title">NARCAN DISTRIBUTION</p>
            <div className="initiative-description">
              <h3>What is Narcan?</h3>
              <p>
                Narcan is a life-saving medication that rapidly reverses opioid overdoses by blocking the effects of opioids on the brain.
                We prioritize distributing Narcan to at-risk communities, including homeless shelters, halfway houses, recovery centers,
                pain management clinics, and addiction treatment facilities.
              </p>
            </div>
          </div>
          <div className="initiative initiative-2">
            <p className="initiative-title">EDUCATION</p>
            <div className="initiative-description">
              <h3>Educational Programs</h3>
              <p>
                We offer free harm reduction education events focused on overdose prevention, recognition, and response, as well as
                combating stigma against people who use drugs. These sessions are tailored to the needs of diverse audiences, including
                healthcare professionals and community members.
              </p>
            </div>
          </div>
          <div className="initiative initiative-3">
            <p className="initiative-title">RESOURCE ALLOCATION</p>
            <div className="initiative-description">
              <h3>Allocation Strategies</h3>
              <p>
                We provide wound care and hygiene packages to disadvantaged populations to prevent infections and promote overall health.
                Additionally, we distribute fentanyl testing strips to help users identify the presence of fentanyl in substances, reducing
                the risk of accidental overdoses.
              </p>
            </div>
          </div>
          <div className="initiative initiative-4">
            <p className="initiative-title">OUTREACH</p>
            <div className="initiative-description">
              <h3>Community Outreach</h3>
              <p>
                We actively engage with local communities to raise awareness about harm reduction and the resources available. Through
                outreach events, workshops, and collaborations with other organizations, we strive to build a supportive network for
                individuals affected by substance use.
              </p>
            </div>
          </div>
          <div className="initiative initiative-5">
            <p className="initiative-title">RESEARCH & ADVOCACY</p>
            <div className="initiative-description">
              <h3>Commitment to Advocacy</h3>
              <p>
                We are committed to advancing harm reduction policies and practices through research and advocacy. By partnering with
                academic institutions and policy makers, we work to influence public health strategies and promote evidence-based approaches
                to harm reduction.
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="impact-section">
        <h2 className="impact-header">
          OUR <span className="impact-highlight">IMPACT</span>
        </h2>
        <div className="impact-content">
          <div className="impact-item">
            <h3 className="impact-number" ref={impactRefs.kitsDistributed}>
              0
            </h3>
            <p className="impact-text">Kits of Narcan distributed</p>
          </div>
          <div className="impact-item">
            <h3 className="impact-number" ref={impactRefs.overdosesReversed}>
              0
            </h3>
            <p className="impact-text">Overdoses reversed</p>
          </div>
          <div className="impact-item">
            <h3 className="impact-number" ref={impactRefs.carePackagesDispensed}>
              0
            </h3>
            <p className="impact-text">Hygiene care packages dispensed</p>
          </div>
        </div>
      </div>
      <div className="closing-section">
        <p className="closing-text">Are you or someone you know at risk of experiencing or witnessing an opioid overdose?</p>
        <div className="closing-buttons">
          <a href="/request-narcan" className="closing-button request-narcan-button">
            REQUEST NARCAN
          </a>
          <a href="/report-overdose" className="closing-button report-overdose-button">
            REPORT OVERDOSE
          </a>
        </div>
      </div>
    </div>
  );
};

export default Home;
