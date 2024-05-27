import React, { useEffect, useState } from 'react';
import './Home.css';

const Home = () => {
  const motto = "A DIRECT RESPONSE TO A DEADLY PROBLEM.";
  const [displayText, setDisplayText] = useState('');
  const [showButton, setShowButton] = useState(false);

  useEffect(() => {
    document.title = "Prevent Overdose Inc.";
    let currentIndex = 0;

    const typeMottoEffect = () => {
      if (currentIndex < motto.length) {
        setDisplayText(motto.substring(0, currentIndex + 1));
        currentIndex++;
        setTimeout(typeMottoEffect, 80);
      } else {
        setShowButton(true);
      }
    };

    // Check if the screen is mobile size
    if (window.innerWidth < 768) {
      // Fade in the motto immediately
      setDisplayText(motto);
      setShowButton(true);
    } else {
      // Use typing effect for larger screens
      typeMottoEffect();
    }
  }, [motto]);

  const renderMotto = () => {
    const words = displayText.split(' ');
    return words.map((word, index) => {
      if (word === "DIRECT" || word === "DEADLY") {
        return <span key={index} className="bold-effect">{word} </span>;
      }
      return <span key={index}>{word} </span>;
    });
  };

  return (
    <div className="home-container">
      <div className="hero-section">
        {window.innerWidth >= 768 && (
          <div className="hero-background">
            <video autoPlay loop muted className="hero-video">
              <source src="/ambulance.mp4" type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </div>
        )}
        <div className="hero-content">
          <h1 className={`motto ${window.innerWidth < 768 ? 'fade-in' : ''}`}>{renderMotto()}</h1>
          {showButton && (
            <a href="/request-narcan" className="request-narcan">
              <img src="Request Narcan.png" alt="Request Narcan" />
            </a>
          )}
        </div>
      </div>
      <div className="header-section">
        <h1 className="main-header">Join Us in the Fight Against Opioid Overdose!</h1>
        <div className="stat-boxes">
          <div className="stat-box us-stats">
            <h2>In the U.S. ...</h2>
            <p>80,411 opioid overdose deaths in 2021</p>
            <p>Over 16,000 people die of prescription opioid overdoses in 2021</p>
            <p>Emergency response time in the U.S. to rural areas is around 14 minutes</p>
          </div>
          <div className="stat-box fl-stats">
            <h2>In Florida ...</h2>
            <p>6,442 opioid overdose deaths in 2021</p>
            <p>$45 for two doses of narcan in Florida</p>
            <p>90% of the time Florida emergency response takes 17 minutes and 30 seconds to reach the scene</p>
          </div>
        </div>
      </div>
      <div className="mission-statement">
        <p>OUR <strong>MISSION</strong></p>
        <p>Safeguarding communities through Harm Reduction Education, Training, Resources, and.</p>
      </div>
      <div className="prevent-overdose-stats">
        <h2>PREVENT OVERDOSE STATISTICS</h2>
      </div>
    </div>
  );
}

export default Home;
