import React from 'react';
import './Header.css';
import locationIcon from "../../Assets/loca.svg";
import Shipylw from "../ships yellow/Shipsyllw"
import Shipwhite from "../Shipwhite/Shipwhite"
import globe from "../../Assets/globe.svg";
const ProfileHeader = ({
  image,
  name,
  groupType = 'Public group',
  memberSince,
  postsToday,
  location,
  tags = [],
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
            </div>

            <div className="metadataa">
              <span className="public-group">{groupType}</span>
              <span className="member-since">since {memberSince}</span>
            </div>

            <div className="metadata">
              <span><img src={globe} alt="" />{postsToday} Posts today</span>
              <span>•</span>
              <span className="location">
                <span className="location-icon"><img src={locationIcon} alt="" /></span>
                {location}
              </span>
            </div>

            <div className="tag-row">
              
                <span  className="tag-pill">Business Strategy</span>
          <span  className="tag-pill">Supply Chain</span>
            </div>
          </div>
        </div>

        <div className="tab-group">
          <Shipylw text="Feed" active />
          <Shipwhite text="Photos" />
          <Shipwhite text="Members" />
          <Shipwhite text="Mentions" />
        </div>
      </div>
    </div>
  );
};

export default ProfileHeader;