import { useState } from "react";
import "./coursecard.css";

/* ── Icons ── */

function ArrowIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
      <path
        d="M5 12h14M13 5l7 7-7 7"
        stroke="white"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function StarIcon({ filled }) {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24">
      <path
        d="M12 17.3l6.18 3.7-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"
        fill={filled ? "#FFD700" : "none"}
        stroke="#FFD700"
        strokeWidth="1"
      />
    </svg>
  );
}

/* ── Component ── */

export default function CourseCard({
  title,
  provider,
  lessons,
  duration,
  rating,
  difficulty,
  bookedPercent,
  image,
  providerLogo,
  buttonText,
}) {
  const [hovered, setHovered] = useState(false);

  return (
    <div className="bmc-wrapper">
      <div
        className={`bmc-card ${hovered ? "bmc-card--hovered" : ""}`}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        {/* Background */}
        <div
          className={`bmc-bg ${hovered ? "bmc-bg--hovered" : ""}`}
          style={{
            backgroundImage: `url(${image})`,
          }}
        />

        {/* Overlay */}
        <div className="bmc-overlay" />

        {/* Button */}
        <div className="bmc-enroll">
          {buttonText}
          <div className="bmc-enroll-icon">
            <ArrowIcon />
          </div>
        </div>

        {/* Content */}
        <div className="bmc-content">
          <h2 className="bmc-title">{title}</h2>

          {/* Rating */}
          <div className="bmc-rating-row">
            <div className="bmc-stars">
              {[...Array(5)].map((_, i) => (
                <StarIcon key={i} filled={i < rating} />
              ))}
            </div>
            <span className="bmc-easy-badge">{difficulty}</span>
            
          </div>

          <div className="bmc-divider" />

          {/* Footer */}
          <div className="bmc-footer">
            <div className="bmc-provider">
              <div className="bmc-provider-name-row">
                <div className="bmc-google-wrap">
                  <img
                    className="icon"
                    src={providerLogo}
                    alt={provider}
                  />
                </div>
                <span className="bmc-provider-name">{provider}</span>
              </div>

              <span className="bmc-lessons">
                {lessons} lessons • {duration} total
              </span>
            </div>

            <div className="bmc-booked">
              <div className="bmc-booked-pct">{bookedPercent}%</div>
              <div className="bmc-booked-label">Booked</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}