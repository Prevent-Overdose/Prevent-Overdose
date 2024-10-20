import React from 'react';

const InitiativesSection = () => {
  const initiatives = [
    {
      title: "NARCAN DISTRIBUTION",
      description: "Narcan is a life-saving medication that rapidly reverses opioid overdoses by blocking the effects of opioids on the brain. We prioritize distributing Narcan to at-risk communities, including homeless shelters, halfway houses, recovery centers, pain management clinics, and addiction treatment facilities."
    },
    {
      title: "EDUCATION",
      description: "We offer free harm reduction education events focused on overdose prevention, recognition, and response, as well as combating stigma against people who use drugs. These sessions are tailored to the needs of diverse audiences, including healthcare professionals and community members."
    },
    {
      title: "RESOURCE ALLOCATION",
      description: "We provide wound care and hygiene packages to disadvantaged populations to prevent infections and promote overall health. Additionally, we distribute fentanyl testing strips to help users identify the presence of fentanyl in substances, reducing the risk of accidental overdoses."
    },
    {
      title: "OUTREACH",
      description: "We actively engage with local communities to raise awareness about harm reduction and the resources available. Through outreach events, workshops, and collaborations with other organizations, we strive to build a supportive network for individuals affected by substance use."
    },
    {
      title: "RESEARCH & ADVOCACY",
      description: "We are committed to advancing harm reduction policies and practices through research and advocacy. By partnering with academic institutions and policy makers, we work to influence public health strategies and promote evidence-based approaches to harm reduction."
    }
  ];

  return (
    <div className="initiatives-section">
      <h2 className="initiatives-header">
        OUR <span className="initiatives-highlight">INITIATIVES</span>
      </h2>
      <div className="initiatives-content">
        {initiatives.map((initiative, index) => (
          <Initiative
            key={index}
            title={initiative.title}
            description={initiative.description}
            index={index + 1}
          />
        ))}
      </div>
    </div>
  );
};

const Initiative = ({ title, description, index }) => (
  <div className={`initiative initiative-${index}`}>
    <p className="initiative-title">{title}</p>
    <div className="initiative-description">
      <h3>{title} ?</h3>
      <p>{description}</p>
    </div>
  </div>
);

export default InitiativesSection;