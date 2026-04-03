import React, { useEffect, useState } from 'react';
import './QuoteForm.css';

const ProgressBar = ({ 
  fillPercent = 0,   // Controls the width of the yellow fill
  height = '14px',   // The thickness of the bar
  text = '',         // Main label (e.g., "Step 1")
  caption = '',      // Sub-label (e.g., "Personal Info")
  className = '' 
}) => {
  const [animatedWidth, setAnimatedWidth] = useState(0);

  useEffect(() => {
    // Trigger animation
    const timer = setTimeout(() => setAnimatedWidth(fillPercent), 100);
    return () => clearTimeout(timer);
  }, [fillPercent]);

  return ( 
    <div className="maincony">
      {/* Label Section */}
      <div className="prindicator-labels"> 
        <div className="prindicator-text">{text}</div> 
        <div className="prindicator-caption">{caption}</div> 
      </div>

      {/* Progress Track */}
      <div className="progress-track" style={{ height: height }}>
        <div 
          className="progress-fill" 
          style={{ width: `${animatedWidth}%` }}
        />
      </div>
    </div>
  );
};

export default ProgressBar;