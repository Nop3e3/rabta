import React, { useState } from 'react';
import './Poll.css';

const PollPost = () => {
  const [selectedOption, setSelectedOption] = useState(null);
  const [voted, setVoted] = useState(false);

  const options = [
    { id: 1, text: 'Quality consistency', percentage: 45 },
    { id: 2, text: 'Pricing negotiations', percentage: 30 },
    { id: 3, text: 'Communication', percentage: 25 },
  ];

  const handleVote = (id) => {
    if (!voted) {
      setSelectedOption(id);
      setVoted(true);
    }
  };

  return (
    <div className="post-container">
      <div className="poll-card">
        {/* Header */}
        <div className="poll-header">
          <img 
            src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop" 
            alt="Momen Hady" 
            className="avatar" 
          />
          <div className="user-info">
            <span className="user-name">Momen Hady</span>
            <span className="post-meta">Supplier • 10 Feb 2026</span>
          </div>
        </div>

        {/* Question */}
        <h2 className="poll-question">What's your biggest challenge in finding suppliers?</h2>

        {/* Options */}
        <div className="poll-options-list">
          {options.map((option) => (
            <button
              key={option.id}
              className={`option-button ${voted ? 'voted' : ''} ${selectedOption === option.id ? 'selected' : ''}`}
              onClick={() => handleVote(option.id)}
              disabled={voted}
            >
              <div 
                className="progress-bar" 
                style={{ width: voted ? `${option.percentage}%` : '0%' }}
              ></div>
              <div className="option-content">
                <span className="option-text">{option.text}</span>
                {voted && <span className="percentage-label">{option.percentage}%</span>}
              </div>
            </button>
          ))}
        </div>

        {/* Votes Badge */}
        <div className="votes-badge">
          156 total votes • Poll closes in 2 days
        </div>

        {/* Footer Actions */}
  <div className="card-footer">
          <div className="stats">
            <div className="stat-item">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l8.84-8.84 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
              </svg>
              <span>100 Likes</span>
            </div>
            <div className="stat-item">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="22" y1="2" x2="11" y2="13"></line>
                <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
              </svg>
              <span>70 Shares</span>
            </div>
            <div className="stat-item">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
              </svg>
              <span>20 Comments</span>
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

export default PollPost;