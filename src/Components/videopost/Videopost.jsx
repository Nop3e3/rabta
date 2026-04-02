import React from 'react';
import './Videopost.css';
import Pfpp from"../../Assets/pfppg.png";
import Vidi from"../../Assets/vidi.png";
const SocialPost = () => {
  return (
    <div className="post-container">
      {/* Header Section */}
      <div className="post-header">
        <img 
          src={Pfpp}
          alt="Profile" 
          className="profile-pic" 
        />
        <div className="header-text">
          <div className="username-row">
            <span className="username">Elite fabric</span>
          </div>
          <div className="meta-data">
            Supplier • 10 Feb 2026
          </div>
        </div>
      </div>

      {/* Content Section */}
      <div className="post-caption">
        Take a look at our new arrivals today !
      </div>

      {/* Video/Image Placeholder */}
      <div className="media-container">
        <div className="video-overlay">
          <div className="play-button">
            <div className="play-icon"></div>
          </div>
        </div>
        <img 
          src={Vidi}
          alt="Fabric arrivals" 
          className="main-media" 
        />
      </div>

      {/* Tags Section */}
      <div className="tags-container">
        <span className="tag">#Fabric</span>
        <span className="tag">#Garments</span>
      </div>

      {/* Interaction Footer */}
        <div className="card-footer">
          <div className="stats">
            <div className="stat-item">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l8.84-8.84 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
              </svg>
              <span>150 Likes</span>
            </div>
            <div className="stat-item">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="22" y1="2" x2="11" y2="13"></line>
                <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
              </svg>
              <span>100 Shares</span>
            </div>
            <div className="stat-item">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
              </svg>
              <span>130 Comments</span>
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
  );
};

export default SocialPost;