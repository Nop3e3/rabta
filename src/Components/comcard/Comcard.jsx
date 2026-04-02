import React from "react";
import "./Comcard.css";

import posticon from "../../Assets/add_ad.svg";
import Groupicon from "../../Assets/groups.svg";

const Comcard = ({
  bgImage,
  icon,
  title,
  postsToday,
  members,
  buttonText = "Join group",
  onClick, // <- receive the onClick prop
}) => {
  return (
    <div className="card-wrapper" onClick={onClick} style={{ cursor: onClick ? "pointer" : "default" }}>
      {/* Background Image */}
      <img src={bgImage} alt={title} className="bg-image" />

      {/* Dark gradient overlay */}
      <div className="bg-overlay"></div>

      {/* Glassmorphism Overlay */}
      <div className="glass-card">
        <div className="profile-icon">
          {icon ? (
            <img src={icon} alt="icon" className="icon-img" />
          ) : (
            <div className="icon-placeholder" />
          )}
        </div>

        <h1 className="title">{title}</h1>
        <p className="subtitle">Public group</p>

        <div className="stats-row">
          {postsToday !== undefined && (
            <>
              <span className="stat">
                <span className="icon-plus">
                  <img src={posticon} alt="" />
                </span>{" "}
                <div className="fitcon">{postsToday} Posts today</div>
              </span>
              <span className="dot">•</span>
            </>
          )}
          {members !== undefined && (
            <span className="stat">
              <span className="icon-members">
                <img src={Groupicon} alt="" />
              </span>{" "}
              {members} members
            </span>
          )}
        </div>

        <button className="join-btn" onClick={onClick}>
          {buttonText}
        </button>
      </div>
    </div>
  );
};

export default Comcard;