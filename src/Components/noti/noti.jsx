import React from 'react';
import './noti.css';

const Card = ({ label, value }) => {
  return (
    <div className="stati-card">
      <h2 className="stati-label">{label}</h2>
      <div className="stati-value">{value}</div>
    </div>
  );
};

export default Card;