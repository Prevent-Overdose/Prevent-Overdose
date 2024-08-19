import React from 'react';

const DrugInvolvementSection = () => {
  return (
    <div className="drug-involvement-section">
      <h2 className="drug-involvement-header">DRUG INVOLVEMENT IN OVERDOSE FATALITIES</h2>
      <div className="drug-involvement-content">
        <div className="drug-involvement-text">
          <p>
            This bubble chart presents the 2022 fatal overdose data for various drugs in the United States, as sourced from the CDC.
            Bubble size correlates with overdose fatalities involving each drug, with red bubbles signifying opioids and white bubbles
            denoting non-opioid substances. The prevalence of poly-drug involvement complicates the attribution of fatalities to a single substance, highlighting
            the complexity of the overdose epidemic.
          </p>
        </div>
        <div className="bubble-chart">
          <div className="bubble opioid fentanyl" data-deaths="73838">
            <span className="bubble-name">Fentanyl</span>
            <span className="bubble-number">73,838</span>
          </div>
          <div className="bubble opioid heroin" data-deaths="5871">
            <span className="bubble-name">Heroin</span>
            <span className="bubble-number">5,871</span>
          </div>
          <div className="bubble opioid oxycodone" data-deaths="11871">
            <span className="bubble-name">Oxycodone</span>
            <span className="bubble-number">11,871</span>
          </div>
          <div className="bubble non-opioid cocaine" data-deaths="27569">
            <span className="bubble-name">Cocaine</span>
            <span className="bubble-number">27,569</span>
          </div>
          <div className="bubble opioid methadone" data-deaths="3334">
            <span className="bubble-name">Methadone</span>
            <span className="bubble-number">3,334</span>
          </div>
          <div className="bubble non-opioid benzodiazepines" data-deaths="10964">
            <span className="bubble-name">Benzodiazepines</span>
            <span className="bubble-number">10,964</span>
          </div>
          <div className="bubble non-opioid psychostimulants" data-deaths="34022">
            <span className="bubble-name">Psychostimulants</span>
            <span className="bubble-number">34,022</span>
          </div>
          <div className="bubble non-opioid cannabis" data-deaths="1161">
            <span className="bubble-name">Cannabis</span>
            <span className="bubble-number">1,161</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DrugInvolvementSection;