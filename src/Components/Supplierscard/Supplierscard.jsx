import { useState } from "react";
import "./Supplierscard.css";
import reward from "../../Assets/rewarded_ads.svg";
import money from "../../Assets/money.svg";
import Cta from "../Ctabttn/Ctabttn.jsx";
import SCta from "../SecondaryCtabttn/SecondaryCtabttn.jsx";

import messagee from "../../Assets/message.svg";
import locationIcon from "../../Assets/location.svg";

function ClothingImage({ image }) {
  if (!image) return null;
  return (
    <div className="supplier-image">
      <img src={image} alt="supplier" />
    </div>
  );
}

export default function SuppliersCard({
  name,
  rating,
  reviews,
  badge,
  location,
  memberSince,
  specialization,
  priceRange,
  projects,
  tags = [],
  minOrder,
  leadTime,
  available,
  image,
  onClick,
}) {
  const [wishlisted, setWishlisted] = useState(false);

  return (
    <div className="scard" onClick={onClick}>
      <div className="topcony">
        <div className="scard-top">
          <ClothingImage image={image} />

          <div className="supplier-info">
            <div className="name-row">
              <span className="supplier-name">{name}</span>
              <div className="rating-row">
                <span className="rating-value">{rating}</span>
                <span className="rating-count">({reviews})</span>
              </div>
            </div>

            <div className="badge-row">
              <span className="badge-icon"><img src={reward} alt="" /></span>
              <span className="badge-text">{badge}</span>
            </div>

            <div className="location-row">
              <span className="location-icon"><img src={locationIcon} alt="" /></span>
              <span className="location-text">{location}</span>
              <span className="member-since">Member since {memberSince}</span>
            </div>

            <div className="specialization">
              Specialized in <a href="#">{specialization}</a>
            </div>
          </div>
        </div>

        <button
          onClick={(e) => {
            e.stopPropagation();
            setWishlisted(!wishlisted);
          }}
          className={`like-button ${wishlisted ? "active" : ""}`}
          aria-label={wishlisted ? "Remove from wishlist" : "Add to wishlist"}
        >
          <svg
            viewBox="0 0 24 24"
            width="24"
            height="24"
            stroke="currentColor"
            strokeWidth="2"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
          </svg>
        </button>
      </div>

      <div className="divider-section">
        <div className="stats-row">
          <div className="stat-item">
            <span className="stat-label"><img src={money} alt="" /></span>
            <span className="stat-value">{priceRange}</span>
          </div>

          <div className="stat-item">
            <span className="stat-label">Projects:&nbsp;</span>
            <span className="stat-value">{projects}</span>
          </div>
        </div>

        <div className="tags-row">
          {tags.map((tag, index) => (
            <span key={index} className="taggg">{tag}</span>
          ))}
        </div>
      </div>

      <div className="meta-section">
        <div className="meta-item">
          <span className="meta-text">
            Minimum order: <strong>{minOrder}</strong>
          </span>
        </div>

        <div className="meta-item">
          <span className="meta-text">
            Lead time: <strong>{leadTime}</strong>
          </span>
        </div>
      </div>

      <div className="bottom-row">
        <div className="availability">
          <div className="availability-dot-wrap">
            <div className="availability-dot" />
          </div>
          <span className="availability-text">
            {available ? "Available now" : "Unavailable"}
          </span>
        </div>

        <div className="action-buttons">
          <SCta
            text="Message"
            icon={messagee}
            onClick={(e) => e.stopPropagation()}
          />
          <Cta
            text="Request a Qoute"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      </div>
    </div>
  );
}