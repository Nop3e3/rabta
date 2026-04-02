import React from 'react';
import './Portfolio.css';

const Portfolio = ({ images }) => {
  return (
    <div className="portfolio-container">
      <div className="portfolio-header">
        <h2 className="portfolio-title">Portfolio</h2>
        <button className="portfolio-btn">View all</button>
      </div>

      <div className="portfolio-grid">
        {images && images.map((img, i) => (
          <div className="portfolio-item" key={i}>
            <img src={img.src} alt={img.alt} loading="lazy" />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Portfolio;