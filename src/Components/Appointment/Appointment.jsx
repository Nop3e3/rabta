import React from 'react';
import './Appointment.css';
import Ctas from "../SecondaryCtabttn/SecondaryCtabttn"
import vc from "../../Assets/vc.svg";
import cal from "../../Assets/cal.svg";
import verified from "../../Assets/VERIFIED.svg";
import mentor from "../../Assets/courtney-cook-TSZo17r3m0s-unsplash.jpg";
const AppointmentCard = () => {
  return (
    <div className="cc-card">
      {/* Header Section */}
      <div className="contop">
        <div className="cc-top">
        <img 
          src={mentor}
          alt="Sarah Al-Mansoori" 
          className="avatar" 
        />
        <div className="header-info">
          <div className="name-row">
            <span className="ribbon-icon"><img src={verified} alt="" /></span>
            Sarah Al-Mansoori
          </div>
          <p className="subtitle">Fashion Business Consultant</p>
        </div></div>
      </div>

      {/* Content Section */}
      <div className="card-content">
        <h3>Topic</h3>
        <p className="description">
          Fashion Business strategy and marketing plan for brand awareness 
          Campaain set-up with influencers
        </p>
      </div>

      {/* Footer Section */}
      <div className="card-footer">
        <div className="footer-details">
          <span className="icon-text"><img src={cal} alt="" /> Tomorrow, Feb 9 at 10:00 AM</span>
          <span className="separator">•</span>
          <span className="icon-text"><img src={vc} alt="" /> Video Call (60 minutes)</span>
        </div>
     <Ctas text="Rescheduele"/>
      </div>
    </div>
  );
};

export default AppointmentCard;