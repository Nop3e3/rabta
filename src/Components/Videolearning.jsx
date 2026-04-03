import { useState, useEffect, useRef } from "react";
import Cta from "./Ctabttn/Ctabttn";
const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Lexend+Exa:wght@100..900&display=swap');

  .card-wrapperr {
    width: 100%;
    display: flex;
    justify-content: center;
    overflow: visible;
    align-items: center;
    height: fit-content;
  }

  .card {
    border-radius: 20px;
    width: 100%;
    height: fit-content;
    transform: rotateX(0deg) rotateY(0deg);
    transition: transform 0.1s ease, box-shadow 0.3s ease;
    will-change: transform;
    animation: cardEntrance 0.9s cubic-bezier(0.16, 1, 0.3, 1) both;
  }

  @keyframes cardEntrance {
    from {
      opacity: 0;
      transform: translateY(40px) rotateX(8deg) scale(0.95);
    }
    to {
      opacity: 1;
      transform: translateY(0) rotateX(0deg) scale(1);
    }
  }

  .card:hover {
    box-shadow:
      0 0 0 1px rgba(255,255,255,0.1),
      0 60px 100px rgba(0,0,0,0.7),
      0 0 160px rgba(130,150,80,0.15);
  }

  /* Thumbnail */
  .thumbnail {
    position: relative;
    width: 100%;
    height: 300px;
    overflow: hidden;
    border-radius: 24px;
    cursor: pointer;
    background: #0e0f0c;
  }

  .thumbnail-img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
    filter: brightness(0.6) saturate(0.85);
    transition: filter 0.5s ease, transform 0.6s cubic-bezier(0.16,1,0.3,1);
  }

  .thumbnail:hover .thumbnail-img {
    filter: brightness(0.75) saturate(1.1);
    transform: scale(1.04);
  }

  .swatch-overlay {
    position: absolute;
    inset: 0;
    background: linear-gradient(
      135deg,
      rgba(180,160,40,0.18) 0%,
      transparent 40%,
      rgba(60,90,160,0.12) 70%,
      transparent 100%
    );
    pointer-events: none;
    animation: shimmer 6s ease-in-out infinite alternate;
  }

  @keyframes shimmer {
    from { opacity: 0.5; }
    to   { opacity: 1; }
  }

  .thumbnail::after {
    content: '';
    position: absolute;
    inset: 0;
    background: radial-gradient(ellipse at center, transparent 30%, rgba(0,0,0,0.65) 100%);
    pointer-events: none;
  }

  .play-btn {
    position: absolute;
    inset: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 2;
  }

  .play-circle {
    width: 72px;
    height: 72px;
    border-radius: 50%;
    background: rgba(20,22,18,0.82);
    backdrop-filter: blur(12px);
    border: 1.5px solid rgba(255,255,255,0.15);
    display: flex;
    align-items: center;
    justify-content: center;
    transition: transform 0.3s cubic-bezier(0.34,1.56,0.64,1), background 0.3s ease, border-color 0.3s ease;
    animation: pulseBorder 3s ease-in-out infinite;
  }

  @keyframes pulseBorder {
    0%, 100% { box-shadow: 0 0 0 0 rgba(148,168,90,0); }
    50%       { box-shadow: 0 0 0 10px rgba(148,168,90,0.15); }
  }

  .thumbnail:hover .play-circle {
    transform: scale(1.12);
    background: rgba(130,150,70,0.9);
    border-color: rgba(255,255,255,0.3);
  }

  .play-triangle {
    width: 0;
    height: 0;
    border-top: 12px solid transparent;
    border-bottom: 12px solid transparent;
    border-left: 20px solid rgba(255,255,255,0.9);
    margin-left: 4px;
    transition: border-left-color 0.3s ease;
  }

  .thumbnail:hover .play-triangle {
    border-left-color: #fff;
  }

  .duration-badge {
    position: absolute;
    bottom: 14px;
    right: 14px;
    z-index: 3;
    background: rgba(10,11,8,0.78);
    backdrop-filter: blur(8px);
    border: 1px solid rgba(255,255,255,0.1);
    border-radius: 6px;
    padding: 3px 10px;
    font-family: 'Lexend Exa', sans-serif;
    font-size: 11px;
    font-weight: 300;
    color: rgba(255,255,255,0.75);
    letter-spacing: 0.04em;
    animation: fadeUp 1s 0.5s cubic-bezier(0.16,1,0.3,1) both;
  }

  .card-body {
    padding: 28px 28px 24px;
    animation: fadeUp 0.8s 0.25s cubic-bezier(0.16,1,0.3,1) both;
  }

  @keyframes fadeUp {
    from { opacity: 0; transform: translateY(16px); }
    to   { opacity: 1; transform: translateY(0); }
  }

  .tag-row {
    display: flex;
    gap: 8px;
    margin-bottom: 12px;
    animation: fadeUp 0.8s 0.35s cubic-bezier(0.16,1,0.3,1) both;
  }

  .tag {
    font-family: 'Lexend Exa', sans-serif;
    font-size: 9px;
    font-weight: 500;
    letter-spacing: 0.12em;
    text-transform: uppercase;
    color: #a8b870;
    background: rgba(148,168,90,0.12);
    border: 1px solid rgba(148,168,90,0.22);
    border-radius: 100px;
    padding: 4px 12px;
  }

  .title {
    font-family: 'Lexend Exa', sans-serif;
    font-size: 22px;
    font-weight: 700;
    color: #edeee8;
    letter-spacing: -0.02em;
    line-height: 1.2;
    margin-bottom: 22px;
    animation: fadeUp 0.8s 0.4s cubic-bezier(0.16,1,0.3,1) both;
  }

  .progress-section {
    animation: fadeUp 0.8s 0.5s cubic-bezier(0.16,1,0.3,1) both;
  }

  .progress-meta {
    display: flex;
    justify-content: space-between;
    align-items: baseline;
    margin-bottom: 10px;
  }

  .progress-label {
    font-family: 'Lexend Exa', sans-serif;
    font-size: 10px;
    font-weight: 300;
    letter-spacing: 0.06em;
    color: rgba(255,255,255,0.38);
    text-transform: uppercase;
  }

  .progress-modules {
    font-family: 'Lexend Exa', sans-serif;
    font-size: 10px;
    font-weight: 300;
    letter-spacing: 0.06em;
    color: rgba(255,255,255,0.38);
  }

  .progress-track {
    position: relative;
    height: 6px;
    background: rgba(255,255,255,0.08);
    border-radius: 100px;
    overflow: visible;
    margin-bottom: 20px;
  }

  .progress-fill {
    height: 100%;
    border-radius: 100px;
    background: linear-gradient(90deg, #6b7c3a 0%, #a8bc5a 100%);
    width: 0%;
    transition: width 1.4s cubic-bezier(0.16,1,0.3,1);
    position: relative;
    box-shadow: 0 0 12px rgba(148,180,80,0.4);
  }

  .progress-thumb {
    position: absolute;
    right: -14px;
    top: 50%;
    transform: translateY(-50%);
    width: 48px;
    height: 48px;
    border-radius: 50%;
    background: #1a1c18;
    border: 2px solid #a8bc5a;
    display: flex;
    align-items: center;
    justify-content: center;
    box-shadow: 0 4px 4px 0 rgba(0, 0, 0, 0.25);
    backdrop-filter: blur(2px);
  }

  .progress-pct {
    font-family: 'Lexend Exa', sans-serif;
    font-size: 12px;
    font-weight: 600;
    color: #a8bc5a;
    letter-spacing: -0.02em;
  }

  .card-footer {
    display: flex;
    align-items: center;
    justify-content: space-between;
    animation: fadeUp 0.8s 0.6s cubic-bezier(0.16,1,0.3,1) both;
  }

  .next-up {
    display: flex;
    flex-direction: column;
    gap: 2px;
  }

  .next-up-label {
    font-family: 'Lexend Exa', sans-serif;
    font-size: 9px;
    font-weight: 300;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    color: rgba(255,255,255,0.28);
  }

  .next-up-text {
    font-family: 'Lexend Exa', sans-serif;
    font-size: 11px;
    font-weight: 500;
    color: rgba(255,255,255,0.55);
    letter-spacing: 0.01em;
  }

  .cta-btn {
    font-family: 'Lexend Exa', sans-serif;
    font-size: 11px;
    font-weight: 500;
    letter-spacing: 0.04em;
    color: #edeee8;
    background: linear-gradient(135deg, #6b7c3a 0%, #8fa048 100%);
    border: none;
    border-radius: 100px;
    padding: 13px 28px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
    transition: transform 0.25s cubic-bezier(0.34,1.56,0.64,1), box-shadow 0.3s ease;
    box-shadow: 0 4px 20px rgba(130,160,60,0.25), inset 0 1px 0 rgba(255,255,255,0.15);
  }

  .cta-btn::before {
    content: '';
    position: absolute;
    inset: 0;
    background: linear-gradient(135deg, rgba(255,255,255,0.12) 0%, transparent 60%);
    border-radius: inherit;
    pointer-events: none;
  }

  .cta-btn::after {
    content: '';
    position: absolute;
    top: 50%;
    left: 50%;
    width: 0;
    height: 0;
    background: rgba(255,255,255,0.15);
    border-radius: 50%;
    transform: translate(-50%, -50%);
    transition: width 0.5s ease, height 0.5s ease, opacity 0.5s ease;
    opacity: 0;
  }

  .cta-btn:hover {
    transform: translateY(-2px) scale(1.03);
    box-shadow: 0 8px 32px rgba(130,160,60,0.4), inset 0 1px 0 rgba(255,255,255,0.2);
  }

  .cta-btn:active::after {
    width: 200px;
    height: 200px;
    opacity: 0;
  }

  .cta-btn:active {
    transform: translateY(0) scale(0.98);
  }

  .divider {
    height: 1px;
    background: linear-gradient(90deg, transparent, rgba(255,255,255,0.07), transparent);
    margin: 0 0 20px;
    animation: fadeUp 0.8s 0.55s cubic-bezier(0.16,1,0.3,1) both;
  }
`;

export default function FashionCourseCard() {
  const [progress, setProgress] = useState(0);
  const cardRef = useRef(null);

  useEffect(() => {
    const t = setTimeout(() => setProgress(40), 600);
    return () => clearTimeout(t);
  }, []);

  const handleMouseMove = (e) => {
    const card = cardRef.current;
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    const dx = (e.clientX - cx) / (rect.width / 2);
    const dy = (e.clientY - cy) / (rect.height / 2);
    card.style.transform = `rotateX(${-dy * 5}deg) rotateY(${dx * 7}deg)`;
  };

  const handleMouseLeave = () => {
    const card = cardRef.current;
    if (!card) return;
    card.style.transition = "transform 0.6s cubic-bezier(0.16,1,0.3,1), box-shadow 0.3s ease";
    card.style.transform = "rotateX(0deg) rotateY(0deg)";
    setTimeout(() => {
      if (card) card.style.transition = "transform 0.1s ease, box-shadow 0.3s ease";
    }, 600);
  };

  return (
    <>
      <style>{styles}</style>
      <div className="card-wrapperr" onMouseMove={handleMouseMove} onMouseLeave={handleMouseLeave}>
        <div className="card" ref={cardRef}>
          {/* Thumbnail */}
          <div className="thumbnail">
            <img
              className="thumbnail-img"
              src="https://images.unsplash.com/photo-1607746882042-944635dfe10e?auto=format&fit=crop&w=580&q=80"
              alt="Fashion course thumbnail"
            />
            <div className="swatch-overlay" />
            <div className="play-btn">
              <div className="play-circle">
                <div className="play-triangle" />
              </div>
            </div>
            <div className="duration-badge">48 min</div>
          </div>

          {/* Body */}
          <div className="card-body">
            <div className="tag-row">
              <span className="tag">Fashion</span>
              <span className="tag">Supply Chain</span>
            </div>
            <h2 className="title">Fashion Supply Chain<br />Management</h2>

            {/* Progress */}
            <div className="progress-section">
              <div className="progress-meta">
                <span className="progress-label">Your progress</span>
                <span className="progress-modules">modules 4 of 10</span>
              </div>
              <div className="progress-track">
                <div className="progress-fill" style={{ width: `${progress}%` }}>
                  <div className="progress-thumb">
                    <span className="progress-pct">{progress}%</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="divider" />

            {/* Footer */}
            <div className="card-footer">
              <div className="next-up">
                <span className="next-up-label">Next up</span>
                <span className="next-up-text">Module 5 · Sourcing Ethics</span>
              </div>
              <Cta text="Go to course"/>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}