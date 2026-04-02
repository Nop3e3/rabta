import React from 'react';
import './Ad.css';

const SupportBanner = () => {
  return (
    <div className="banner-container">
      <div className="banner-card">
        <h2 className="banner-title">Still have questions?</h2>
        <p className="banner-subtitle">Our support team is here to help you succeed</p>
        
        <div className="button-group">
          <button className="btn btn-primary">
            <svg 
              className="chat-icon" 
              viewBox="0 0 24 24" 
              fill="none" 
              stroke="currentColor" 
              strokeWidth="2"
            >
              <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
            </svg>
            Live Chat
          </button>
          
          <button className="btn btn-glass">Email Us</button>
          
          <button className="btn btn-glass">Call Us</button>
        </div>
      </div>
    </div>
  );
};

export default SupportBanner;