import React from 'react';
import './Wul.css';

const learningPoints = [
  "Develop a comprehensive business plan for your fashion brand",
  "Understand market research and identify your target customer",
  "Master pricing strategies and financial planning",
  "Launch and market your fashion brand effectively",
  "Build supplier relationships and manage inventory"
];

const FashionLearningCard = () => {
  return (
    <div className="card">
      <h2 className="card-title">What You'll Learn</h2>
      <div className="list-wrapper">
        {learningPoints.map((text, index) => (
          <div key={index} className="list-item">
            <div className="check-icon">
              <svg 
                viewBox="0 0 24 24" 
                fill="none" 
                stroke="currentColor" 
                strokeWidth="2.5" 
                strokeLinecap="round" 
                strokeLinejoin="round"
              >
                <polyline points="20 6 9 17 4 12"></polyline>
              </svg>
            </div>
            <p className="list-text">{text}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FashionLearningCard;