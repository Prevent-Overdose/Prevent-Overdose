import React from 'react';

const LethalStatsSection = () => {
  return (
    <div className="lethal-stats-section">
      <div className="conveyor">
        <div className="conveyor-belt">
          <div className="lethal-item">
            <div className="lethal-dose">
              <div className="lethal-dose-header">The Lethal Dose of Fentanyl</div>
              <div className="lethal-dose-image">
                <img src="penny.png" alt="Penny for scale" />
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
                <img src="penny.png" alt="Penny for scale" />
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
  );
};

export default LethalStatsSection;