import React from 'react';
import './Scroll-arrows.css';

const ArrowSlider = ({ onPrev, onNext }) => {
  return (
    <div className="slider-container">
      <button className="arrow-button prev" onClick={onPrev} aria-label="Previous">
        <span className="chevron left"></span>
      </button>
      <button className="arrow-button next" onClick={onNext} aria-label="Next">
        <span className="chevron right"></span>
      </button>
    </div>
  );
};

export default ArrowSlider;