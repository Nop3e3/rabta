import React from 'react';
import './Txtpost.css';

const SocialCard = ({
  profileImg,
  brandName,
  metaData,
  content,
  tags = [],
  likes = 0,
  shares = 0,
  comments = 0,
}) => {
  return (
    <div className="postT-container">
      <div className="card-body">
        {/* Header Section */}
        <div className="card-header">
          <div className="profile-wrapper">
            <div className="profile-image-container">
              <img 
                src={profileImg} 
                alt="Profile Background" 
                className="bg-img"
              />
            </div>
            <div className="header-text">
              <h2 className="brand-name">{brandName}</h2>
              <p className="meta-data">{metaData}</p>
            </div>
          </div>
        </div>

        {/* Content Section */}
        <div className="card-content">
          <p>{content}</p>
        </div>

        {/* Tags Section */}
        <div className="tags-container">
          {tags.map((tag, index) => (
            <span key={index} className="tag">{tag}</span>
          ))}
        </div>

        {/* Footer Section */}
        <div className="card-footer">
          <div className="stats">
            <div className="stat-item">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l8.84-8.84 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
              </svg>
              <span>{likes} Likes</span>
            </div>
            <div className="stat-item">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="22" y1="2" x2="11" y2="13"></line>
                <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
              </svg>
              <span>{shares} Shares</span>
            </div>
            <div className="stat-item">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
              </svg>
              <span>{comments} Comments</span>
            </div>
          </div>
          <div className="save-icon">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"></path>
            </svg>
            <span>Save</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SocialCard;