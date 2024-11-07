import React from 'react';

const EducationalVideosSection = () => {
  return (
    <div className="educational-videos-section">
      <h2 className="educational-videos-header">EDUCATIONAL VIDEOS</h2>
      <div className="educational-videos-content">
        <div className="educational-videos-long">
          <iframe 
            width="853" height="480" 
            src="https://www.youtube.com/embed/h-g6hw_YDzY" 
            title="What To Do If Someone Experiences an Opioid Overdose | In Case of Emergency | Mass General Brigham" 
            frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
            referrerpolicy="strict-origin-when-cross-origin" allowfullscreen> 
          </iframe>
        </div>
        <div className="educational-videos-short">
          <iframe 
            width="337" height="599" 
            src="https://www.youtube.com/embed/xMnWqmqY0Fo" 
            title="How to Help Someone Experiencing An Opioid Overdose" 
            frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
            referrerpolicy="strict-origin-when-cross-origin" allowfullscreen>
          </iframe>
          <iframe 
            width="337" height="599" 
            src="https://www.youtube.com/embed/usX16N3oDGA" 
            title="Recognizing an Opioid Overdose" frameborder="0" 
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
            referrerpolicy="strict-origin-when-cross-origin" allowfullscreen>
          </iframe>
        </div>
      </div>
    </div>
  );
};

export default EducationalVideosSection;