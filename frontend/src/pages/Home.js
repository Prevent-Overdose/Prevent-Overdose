import React, { useEffect, useState, useRef } from 'react';
import './Home.css';
import 'font-awesome/css/font-awesome.min.css';
import Footer from '../components/Footer';

const Home = () => {
  const motto = "A DIRECT RESPONSE TO A DEADLY PROBLEM.";
  const [displayText, setDisplayText] = useState(motto);
  const [showButton, setShowButton] = useState(false);
  const [impactAnimationTriggered, setImpactAnimationTriggered] = useState(false);
  const impactRefs = {
    kitsDistributed: useRef(null),
    overdosesReversed: useRef(null),
    carePackagesDispensed: useRef(null),
  };

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
