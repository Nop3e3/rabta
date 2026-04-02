import React from 'react';
import './Specifications.css';
import stars from "../../Assets/stars.svg";

const Specializations = () => {
  const capabilities = [
    { title: "Cotton Manufacturing", desc: "Expert in 100% cotton and cotton blends for fashion wear" },
    { title: "Polyester Production", desc: "Advanced polyester weaving for sportswear and casual fashion" },
    { title: "Quality Control", desc: "ISO 9001 certified with strict quality standards" },
    { title: "Custom Solutions", desc: "Tailored manufacturing based on client specifications" },
  ];

  return (
    <div className="sscontainer">
 
      <div className="sscard">
        {capabilities.map((item, index) => (
          <div key={index} className="capability-item">
            <img src={stars} alt="star" className="star-icon" />
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