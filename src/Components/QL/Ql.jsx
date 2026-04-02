import React from 'react';
import './Ql.css';

const UserGuideCard = ({ title, description, icon }) => {
  return (
    <div className="card-containerrr">
      {/* Image Icon */}
      <img src={icon} alt={title} className="card-icon" />

      <h2 className="card-title">{title}</h2>
      <p className="card-description">{description}</p>
    </div>
  );
};

export default UserGuideCard;