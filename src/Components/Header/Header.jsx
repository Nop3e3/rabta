import React from 'react';
import './Header.css';
import reward from "../../Assets/rewarded_ads.svg";
import money from "../../Assets/money.svg";
import messagee from "../../Assets/message.svg";
import locationIcon from "../../Assets/location.svg";
import Shipwhite from "../Shipwhite/Shipwhite"
const ProfileHeader = ({
  image,
  name,
  rating,
  reviewCount,
  badgeText,
  location,
  memberSince,
  specialization
}) => {
  return (
    <div
      className="profile-container"
      style={{
        backgroundImage: `url(${image})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <div className="profile-overlay" />

      <div className="profile-content">
        <div className="header-main">
          <img 
            src={image} 
            alt={name} 
            className="factory-image" 
          />
          
          <div className="info-section">
            <div className="title-row">
              <h1>{name}</h1>
              <div className="rating">
                <span className="star">★</span>
                <span className="score">{rating}</span>
                <span className="count">({reviewCount})</span>
              </div>
            </div>

            <div className="badge">
              <span className="badge-icon"><img src={reward} alt="" /></span>
              <span>{badgeText}</span>
            </div>

            <div className="metadata">
              <span className="location"><span className="location-icon"><img src={locationIcon} alt="" /></span> {location}</span>
              <span className="member-since">Member since {memberSince}</span>
            </div>

            <p className="specialization">
              Specialized in <span className="underline">{specialization}</span>
            </p>
          </div>
        </div>
    <div className="tab-group">
       
          <Shipwhite text="Overview" />
          <Shipwhite text="Portfolio" />
          <Shipwhite text="Reviews" />
          
   
        </div>
      </div>
    </div>
  );
};

export default ProfileHeader;