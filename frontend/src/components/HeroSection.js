import React, { useState, useEffect } from 'react';

const HeroSection = ({ handleArrowClick }) => {
  const motto = "A DIRECT RESPONSE TO A DEADLY PROBLEM.";
  const [displayText, setDisplayText] = useState('');
  const [showContent, setShowContent] = useState(false);

  useEffect(() => {
    let currentIndex = 0;    
    const typeMottoEffect = () => {
      if (currentIndex < motto.length) {
        setDisplayText(motto.substring(0, currentIndex + 1));
        currentIndex++;
        setTimeout(typeMottoEffect, 60);
      } else {
        setShowContent(true);
      }
    };
    typeMottoEffect();
  }, []);

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
    <div className="hero-section">
      <div className="hero-background"></div>
      <div className="hero-content">
        <h1 className="motto">{renderMotto()}</h1>
        <div className={`additional-content ${showContent ? 'show' : ''}`}>
          <a href="/request-narcan" className="request-narcan">
            <img src="Request Narcan.png" alt="Request Narcan" />
          </a>
          <div className="arrow" onClick={handleArrowClick}>➢</div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;