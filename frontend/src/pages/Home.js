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
      <div className="overdose-data-section">
        <h2 className="overdose-data-header">
          <span className="overdose">OVERDOSE</span> <span className="data">DATA</span>
        </h2>
        <div className="overdose-statistics">
          <div className="statistics-left">
            <div className="total-overdoses">
              <p>Total Overdoses:</p>
              <h3>107,941</h3>
            </div>
            <div className="opioid-overdoses">
              <p>Opioid Overdoses:</p>
              <h3>81,806</h3>
            </div>
          </div>
          <div className="overdose-chart">
            <img src="Overdose Deaths Chart.svg" alt="Overdose Deaths: 1999-2022" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
