import React from 'react';
import './ExpertiseGrid.css';

const ExpertiseGrid = () => {
  const expertiseData = [
    { title: 'Business Strategy', count: 24 },
    { title: 'Manufacturing', count: 18 },
    { title: 'Marketing & Branding', count: 32 },
    { title: 'Financial Planning', count: 15 },
  ];

  return (
    <div className="card">  <div className="containeri">
  <h2 className="title">Browse by Expertise</h2>
      <div className="list-wrapper">
        {expertiseData.map((item, index) => (
          <div key={index} className="cardi">
            <div className="cardi-content">
              <span className="cardi-title">{item.title}</span>
              <span className="cardi-count">{item.count} mentors</span>
            </div>
            <div className="arrow-icon">
              <svg 
                width="24" 
                height="24" 
                viewBox="0 0 24 24" 
                fill="none" 
                stroke="currentColor" 
                strokeWidth="2" 
                strokeLinecap="round" 
                strokeLinejoin="round"
              >
                <polyline points="9 18 15 12 9 6"></polyline>
              </svg>
            </div>
          </div>
        ))}
      </div>
    </div></div>  
  );
};

export default ExpertiseGrid;