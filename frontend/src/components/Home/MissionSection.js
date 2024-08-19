import React, { forwardRef } from 'react';

const MissionSection = forwardRef((props, ref) => {
  return (
    <div className="mission-section" ref={ref}>
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
  );
});

export default MissionSection;