import React from 'react';
import './courseheader.css';

const FashionHeader = () => {
  return (
    <div className="container-bggD">
      <div className="glass-cardD">
        <h1 className="titleD">Fashion Supply Chain Management</h1>
        <p className="descriptionD">
          Learn the essential steps to transform your fashion idea into a successful business with proven strategies and real-world examples.
        </p>
        
        <div className="meta-rowD">
          <div className="badgeyD">Intermediate</div>
          
          <div className="statsD">
            <span className="stat-itemD">
              <i className="icon-clock"></i> 48 hours
            </span>
            <span className="stat-itemD">
              <i className="icon-studentD"></i> 12,540
            </span>
            <span className="stat-itemD">
              <span className="starD">★</span> 
              <span className="rating-boldD">4.9</span> 
              <span className="rating-countD">(2,847)</span>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FashionHeader;