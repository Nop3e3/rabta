import React from "react";
import "./Course2.css";
import Arrwb from "../Arrowbttn/Arrowbttn";
export default function CourseCard({
  courseName = "Course Title",
  level = "Beginner",
  rating = "★★★☆☆",
  path = "#",
  lessons = 0,        // New prop: number of lessons
  duration = "0 mins", // Duration in minutes
  successPct = "0",
  providerName = "Provider",
  bannerImage = "",
  providerLogo = null, // URL of the provider logo
  onEnrollClick = () => {},
}) {
  return (
    <div className="card">

      {/* ── Banner ── */}
      <div
        className="card-banner"
        style={{ backgroundImage: `url(${bannerImage})` }}
      >
        <svg
          className="banner-deco"
          viewBox="0 0 500 130"
          preserveAspectRatio="xMidYMid slice"
          xmlns="http://www.w3.org/2000/svg"
        >
          <circle cx="380" cy="30" r="100" fill="none" stroke="#b5c94a" strokeWidth="0.9" />
          <circle cx="380" cy="30" r="68" fill="none" stroke="#b5c94a" strokeWidth="0.5" />
          <circle cx="380" cy="30" r="148" fill="none" stroke="#b5c94a" strokeWidth="0.4" />
          <line x1="200" y1="0" x2="500" y2="130" stroke="#b5c94a" strokeWidth="0.6" />
          <line x1="260" y1="0" x2="500" y2="95" stroke="#b5c94a" strokeWidth="0.35" />
          <rect x="310" y="55" width="44" height="44" fill="none" stroke="#b5c94a" strokeWidth="0.6" transform="rotate(22 332 77)" />
          <rect x="420" y="72" width="28" height="28" fill="none" stroke="#b5c94a" strokeWidth="0.45" transform="rotate(-14 434 86)" />
          <circle cx="460" cy="100" r="18" fill="none" stroke="#b5c94a" strokeWidth="0.4" />
        </svg>

        <div className="banner-overlay" />

        <div className="banner-content">
          <div className="course-title">{courseName}</div>
          <div className="stars">{rating}</div>
        </div>

        <div className="badge-level">{level}</div>
      </div>

      {/* ── Body ── */}
      <div className="card-body">
        <div className="meta-row">
          <div>
            <div className="provider">
              {providerLogo && (
                <div className="google-icon">
                  <img src={providerLogo} alt={providerName} style={{ width: "20px", height: "20px" }} />
                </div>
              )} <div className="coli"><span className="provider-name">{providerName}</span><div className="lessons-info">{lessons} lessons &bull; {duration}</div>
              
            </div></div>
            {/* Display lessons and duration with a dot between */}
            
          </div>

          <div className="booked-stat">
            <span className="booked-pct">{successPct}%</span>
            <span className="booked-label">Booked</span>
          </div>
        </div>
<div className="btnn">
    <Arrwb text="Enroll"/></div>
      </div>

    </div>
  );
}