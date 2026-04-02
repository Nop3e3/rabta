import React from 'react';
import './Verifications.css';


const Specializations = () => {
  const capabilities = [
    {
      title: "Business License Verified",
      desc: "Dubai Trade License #123456",
    },
    {
      title: "Quality Certification",
      desc: "ISO 9001:2015 Certified",
    },
    {
      title: "Insurance Coverage",
      desc: "Comprehensive business insurance",
    }
  ];

  return (
    <div className="dontainer">
      
      <div className="dard">
        {capabilities.map((item, index) => (
          <div key={index} className="capability-itemm">
            <div className="icon-container">
              {/* Simple SVG replacement for the star icon */}
              <svg viewBox="0 0 24 24" className="star-icon">
                <circle cx="12" cy="12" r="10" fill="none" stroke="currentColor" strokeWidth="2" />
                <path d="M12 7l1.5 3.5h3.5l-2.5 2.5 1 4-3.5-2.5-3.5 2.5 1-4-2.5-2.5h3.5z" fill="currentColor" />
              </svg>
            </div>
            <div className="content">
              <h3 className="item-title">{item.title}</h3>
              <p className="item-desc">{item.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Specializations;