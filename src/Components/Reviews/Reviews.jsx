import { useState } from "react";
import "./Reviews.css";
import Viewallbttn from "../Viewallbttn/Viewallbttn";
const reviews = [
  {
    id: 1,
    name: "Sara Al-Thani",
    rating: 4,
    time: "2 weeks ago",
    text: "This course completely changed how I approach my fashion business. Sarah's insights on supplier management were invaluable!",
    avatar: "https://randomuser.me/api/portraits/women/44.jpg",
  },
  {
    id: 2,
    name: "Mohammed Khalil",
    rating: 4,
    time: "1 month ago",
    text: "Great communication and flexibility. They worked closely with us to achieve the perfect fabric texture.",
    avatar: "https://randomuser.me/api/portraits/men/32.jpg",
  },
];

function StarRating({ rating, max = 5 }) {
  return (
    <div className="stars">
      {Array.from({ length: max }).map((_, i) => (
        <span key={i} className={`star ${i < rating ? "filled" : "empty"}`}>
          ★
        </span>
      ))}
    </div>
  );
}

function ReviewCard({ name, rating, time, text, avatar }) {
  return (
    <div className="review-card">
      <div className="reviewer-info">
        <img src={avatar} alt={name} className="avatar" />
        <div className="reviewer-meta">
          <span className="reviewer-name">{name}</span>
          <div className="rating-row">
            <StarRating rating={rating} />
            <span className="review-time">{time}</span>
          </div>
        </div>
      </div>
      <p className="review-text">{text}</p>
    </div>
  );
}

export default function Reviews() {
  const [, setClicked] = useState(false);

  return (
    <div className="reviews-wrapper">
      <div className="reviews-container">
        <div className="reviews-header">
          <div className="reviews-title">
            <span className="star-icon">★</span>
            <span className="rating-score">4.8</span>
            <span className="rating-count">(124)</span>
            <span className="reviews-label">Reviews</span>
          </div>
          <Viewallbttn text="View all"/>
           
      
        </div>

        {reviews.map((r) => (
          <ReviewCard key={r.id} {...r} />
        ))}
      </div>
    </div>
  );
}