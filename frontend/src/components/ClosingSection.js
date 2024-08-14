import React from 'react';

const ClosingSection = () => {
  return (
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
  );
};

export default ClosingSection;