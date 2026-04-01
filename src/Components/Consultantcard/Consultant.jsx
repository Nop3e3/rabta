import React from "react";
import PropTypes from "prop-types";
import CtaBtn from "../Ctabttn/Ctabttn";
import CtaBtn2 from "../SecondaryCtabttn/SecondaryCtabttn";
import "./Consultant.css";
import verified from "../../Assets/VERIFIED.svg";

export default function ConsultantCard({
  avatarUrl,
  name,
  title,
  sessions,
  reviews,
  ratingText,
  tags,
  responseTime,
  experience,
  verifiedLabel,
  onKnowMore,
  onBookSession,
}) {
  return (
    <div className="cc-wrapper">
      <div className="cc-card">

        {/* Top Section */}
       <div className="contop"> <div className="cc-top">
          <img src={avatarUrl} alt={name} className="cc-avatar" />

          <div className="cc-info">
            <div className="cc-name-row">
              {verifiedLabel && (
                <span className="cc-verified">
                  <img src={verified} alt="Verified" />
                </span>
              )}
              <span className="cc-name">{name}</span>
            </div>
            <div className="cc-title">{title}</div>
            <div className="cc-stats-row">
              <span className="cc-sessions">{sessions} sessions</span>
              <span className="cc-dot">•</span>
              <span className="cc-reviews">({reviews})</span>
              {ratingText && (
                <>
                  <span className="cc-dot">•</span>
                  <span className="cc-rating-text">{ratingText}</span>
                </>
              )}
            </div>
          </div></div>
        </div>

        {/* Tags */}
        <div className="cc-tags">
          {tags?.length
            ? tags.map((tag) => (
                <span key={tag} className="cc-tag">{tag}</span>
              ))
            : <span className="cc-tag">No tags</span>}
        </div>

        {/* Bottom Section */}
        <div className="cc-bottom">
          <div className="cc-meta">
            <span>Responds in {responseTime}</span>
            <span className="cc-dot">•</span>
            <span>{experience}</span>
          </div>
          <div className="cc-actions">
            <CtaBtn text="Book Session" onClick={onBookSession} />
            <CtaBtn2 text="Know More" onClick={onKnowMore} />
          </div>
        </div>

      </div>
    </div>
  );
}

ConsultantCard.propTypes = {
  avatarUrl: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  sessions: PropTypes.number.isRequired,
  reviews: PropTypes.number.isRequired,
  ratingText: PropTypes.string,        // e.g. "4.8" — omit to hide
  tags: PropTypes.arrayOf(PropTypes.string).isRequired,
  responseTime: PropTypes.string.isRequired,
  experience: PropTypes.string.isRequired,
  verifiedLabel: PropTypes.string,     // e.g. "Verified" — null hides the badge
  onKnowMore: PropTypes.func.isRequired,
  onBookSession: PropTypes.func.isRequired,
};