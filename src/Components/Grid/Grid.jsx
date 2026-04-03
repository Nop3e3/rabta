import React from 'react';
import './Grid.css';

// Importing the actual image files
import m1 from "../../Assets/m1.png";
import m2 from "../../Assets/m2.png";
import m3 from "../../Assets/m3.png";
import m4 from "../../Assets/m4.png";
import m5 from "../../Assets/m5.png";
import m6 from "../../Assets/m6.png";

const cardData = [
  { title: "Product Development & Production", image: m1 },
  { title: "Sourcing & Material Management", image: m2 },
  { title: "Fashion Business & Operations", image: m3 },
  { title: "Logistics & Supply Chain", image: m4 },
  { title: "Ethical & Sustainable Fashion", image: m5 },
  { title: "Fashion Marketing & Brand Identity", image: m6 },
];

const FashionGrid = () => {
  return (
    <div className="containerg">
      <div className="grid-wrapperg">
        {cardData.map((item, index) => (
          <div 
            key={index} 
            className="cardg" 
            style={{ 
              backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(${item.image})` 
            }}
          >
            <h2 className="card-titleg">{item.title}</h2>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FashionGrid;