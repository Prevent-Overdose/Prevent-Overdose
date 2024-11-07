import React from 'react';

const CertificationsSection = () => {
  return (
    <div className="certifications-section">
      <h2 className="certifications-header">CERTIFICATIONS</h2>
      <div className="certifications-content">
        <a
          href="https://www.redcross.org/take-a-class/classes/first-aid-for-severe-bleeding-online/a6R0V0000015EvD.html"
          target="_blank"
          rel="noopener noreferrer"
          className="certification-button"
        >
          First Aid for Severe Bleeding Online
        </a>
        <a
          href="https://www.redcross.org/take-a-class/classes/first-aid-for-opioid-overdoses-online/a6R0V0000015ETH.html"
          target="_blank"
          rel="noopener noreferrer"
          className="certification-button"
        >
          First Aid for Opioid Overdoses Online
        </a>
        <a
          href="https://www.redcross.org/take-a-class/classes/adult-cpr%2Faed-online/a6R3o000001vv3C.html"
          target="_blank"
          rel="noopener noreferrer"
          className="certification-button"
        >
          Adult CPR
          <br></br>
          AED Online
        </a>
      </div>
    </div>
  );
};

export default CertificationsSection;
