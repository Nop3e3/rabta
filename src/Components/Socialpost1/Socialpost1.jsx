import React from 'react';
import './Socialpost1.css';

const SocialPost = ({
  avatarUrl,
  brandName,
  userName,
  postDate,
  caption,
  images = [], // array of 3 images
  likes,
  shares,
  comments,
  saveText = 'Save'
}) => {
  return (
    <div className="post-container">
      {/* Header */}
      <header className="post-header">
        <div className="avatar-container">
          <img src={avatarUrl} className="avatar-img" alt={userName} />
        </div>
        <div className="header-text">
          <h2 className="brand-name">{brandName}</h2>
          <p className="meta-info">{userName} • {postDate}</p>
        </div>
      </header>

      <p className="post-caption">{caption}</p>

<div className="image-grid">
  <div className="main-image">
    <img src={images[0]} alt="Main Work" />
  </div>
  <div className="side-images">
    <div className="side-image">
      <img src={images[1]} alt="Side Work 1" />
    </div>
    <div className="side-image">
      <img src={images[2]} alt="Side Work 2" />
    </div>
  </div>
</div>

      {/* Footer */}
      <footer className="post-footer">
        <div className="stats-group">
          <div className="stat-item">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/>
            </svg>
            <span>{likes} Likes</span>
          </div>
          <div className="stat-item">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="22" y1="2" x2="11" y2="13"></line>
              <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
            </svg>
            <span>{shares} Shares</span>
          </div>
          <div className="stat-item">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
            </svg>
            <span>{comments} Comments</span>
          </div>
        </div>
        <div className="save-action">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="m19 21-7-4-7 4V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v16z"></path>
          </svg>
          <span>{saveText}</span>
        </div>
      </footer>
    </div>
  );
};

export default SocialPost;