import React, { useEffect, useState } from 'react';
import './Home.css';



const Home = () => {
  const motto = "A DIRECT RESPONSE TO A DEADLY PROBLEM.";
  const requestPrompt = "Save lives with Narcan.";
  const [displayText, setDisplayText] = useState('');
  const [displayRequestText, setDisplayRequestText] = useState('');
  const [showButton, setShowButton] = useState(false);
  
  useEffect(() => {
    document.title = "PREVENT OVERDOSE - Fighting the Opioid Crisis";
    let currentIndex = 0;

    const typeMottoEffect = () => { // PreventOD motto
      if (currentIndex < motto.length) {
        setDisplayText(motto.substring(0, currentIndex + 1));
        currentIndex++;
        setTimeout(typeMottoEffect, 100); // 2nd parameter adjusts typing speed
      } else {
        typeRequestEffect();
      }
    };

    const typeRequestEffect = () => { // Request Narcan prompt
      let requestIndex = 0;
      const typeEffect = () => {
        if (requestIndex < requestPrompt.length) {
          setDisplayRequestText(requestPrompt.substring(0, requestIndex + 1));
          requestIndex++;
          setTimeout(typeEffect, 100); //2nd parameter adjusts typing speeed
        }
         else {
        setShowButton(true); // Starts the button fade animation only when the request narcan prompt is fully typed
        }
      };
      typeEffect();
    };

    typeMottoEffect();
  }, [motto, requestPrompt]);

  const renderMotto = () => { // Bold effect for "DIRECT" and "DEADLY" in the motto
    const words = displayText.split(' ');
    return words.map((word, index) => {
      if (word === "DIRECT" || word === "DEADLY") {
        return <span key={index} className="bold-effect">{word} </span>;
      }
      return `${word} `;
    });
  };

  return (
    <div className="home-container">
      <div className="hero-section">
        <div className="hero-background">
          <img src="/ambulance.jpg" className="hero-image" alt='ambulance'/>
        </div>
        <div className="hero-content">
        <h1 className="motto">{renderMotto()}</h1>
        <p className="request-prompt">{displayRequestText} </p>
        {showButton && (
            <a href="/request-narcan" className="btn btn-primary fade-in">Request Narcan</a>
          )}
        </div>
      </div>
      <div className="header-section">
        <h1 className="main-header">
        Join Us in the Fight Against Opioid Overdose!
        </h1>
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