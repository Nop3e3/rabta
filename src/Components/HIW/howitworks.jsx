import React from 'react';
import './HIW.css';

const CapabilitiesCard = () => {
  const steps = [
    {
      number: 1,
      title: "Browse Mentors",
      description: "Explore experienced mentors in your area of interest"
    },
    {
      number: 2,
      title: "Book a Session",
      description: "Choose a time that works for both of you"
    },
    {
      number: 3,
      title: "Get Guidance",
      description: "Meet via video call and accelerate your growth"
    }
  ];

  return (
    <div className="card">
      <h2 className="title">Specializations & Capabilities</h2>
      <div className="card-outer">
        <div className="card-inner">
          {steps.map((step) => (
            <div key={step.number} className="step-row">
              <div className="number-badge">{step.number}</div>
              <div className="text-content">
                <h3 className="step-title">{step.title}</h3>
                <p className="step-description">{step.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CapabilitiesCard;