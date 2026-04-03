import { useEffect, useState, useRef } from "react";

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Lexend+Exa:wght@400;500;600;700;800;900&display=swap');

  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  .progress-wrapper {
    font-family: 'Lexend Exa', sans-serif;
    background: #1a1f1e;
    border-radius: 20px;
    padding: 32px 36px;
    width: 100%;
  border-radius: 20px;
background: linear-gradient(0deg, #141414 -51.88%, #2C2A32 100%);
/* white */
box-shadow: 0 8px 14.3px 0 rgba(255, 255, 255, 0.02);
    color: #fff;
    position: relative;
    overflow: hidden;
  }

  .progress-wrapper::before {
    content: '';
    position: absolute;
    inset: 0;
    background-image: radial-gradient(circle, rgba(255,255,255,0.13) 1px, transparent 1px);
    background-size: 18px 18px;
    mix-blend-mode: overlay;
    pointer-events: none;
    z-index: 0;
  }

  .progress-inner {
    position: relative;
    z-index: 1;
  }

  .progress-title {
    font-size: 22px;
    font-weight: 700;
    color: #ffffff;
    margin-bottom: 4px;
    letter-spacing: -0.02em;
  }

  .progress-subtitle {
    font-size: 12px;
    font-weight: 400;
    color: #ffffff6a;
    letter-spacing: 0.04em;
    margin-bottom: 24px;
  }

  .cards-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 16px;
  }

  .stat-card {
    border-radius: 16px;
    padding: 20px 22px 22px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    min-height: 160px;
    border: 1px solid rgba(255,255,255,0.08);
    position: relative;
    overflow: hidden;
  }

  .stat-card::before {
    content: '';
    position: absolute;
    inset: 0;
    background-image: radial-gradient(circle, rgba(255,255,255,0.10) 1px, transparent 1px);
    background-size: 18px 18px;
    mix-blend-mode: overlay;
    pointer-events: none;
    z-index: 0;
  }

  .card-content {
    position: relative;
    z-index: 1;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    height: 100%;
  }

  .card-hours {
    background: radial-gradient(ellipse at 30% 20%, rgba(182, 241, 147, 0.00) 0%, rgba(0, 201, 80, 0.20) 100%);
  }

  .card-certs {
    background: radial-gradient(ellipse at 50% 30%, rgba(237, 254, 142, 0.00) 0%, rgba(253, 247, 78, 0.20) 100%);
  }

  .card-courses {
    background: radial-gradient(ellipse at 30% 20%, rgba(0, 13, 219, 0.20) 0%, rgba(51, 109, 255, 0.00) 100%), rgba(30, 30, 30, 0.20);
  }

  .card-header {
    display: flex;
    align-items: center;
    justify-content:flex-start;
    gap: 12px;
  }

  .card-icon {
    width: 38px;
    height: 38px;
    border-radius: 10px;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
    margin:0;
  }

  .icon-hours { background: #2d9f5a; }
  .icon-certs { background: #7a8f4a; }
  .icon-courses { background: #3355aa; }

  .card-icon svg {
    width: 20px;
    height: 20px;
    fill: none;
    stroke: #fff;
    stroke-width: 2;
    stroke-linecap: round;
    stroke-linejoin: round;
  }

  .card-label {
    font-size: 13px;
    font-weight: 500;
    color: #cdd9d4;
    letter-spacing: 0.01em;
  }

  .card-value-row {
    display: flex;
    align-items: flex-end;
    gap: 6px;
  }

  .card-value {
    font-size: 72px;
    font-weight: 800;
    line-height: 1;
    color: #ffffff;
    letter-spacing: -0.04em;
  }

  .card-unit {
    font-size: 13px;
    font-weight: 500;
    color: #8a9e96;
    padding-bottom: 10px;
    letter-spacing: 0.02em;
  }
      .card-header {
    display: flex;
    align-items: center;
    padding:0px;
    justify-content:flex-start;
    gap: 12px;
  }
`;

function easeOutExpo(t) {
  return t === 1 ? 1 : 1 - Math.pow(2, -10 * t);
}

function useCountUp(target, duration = 1800, delay = 0) {
  const [value, setValue] = useState(0);
  const rafRef = useRef(null);

  useEffect(() => {
    let startTime = null;

    const timer = setTimeout(() => {
      const step = (timestamp) => {
        if (!startTime) startTime = timestamp;
        const elapsed = timestamp - startTime;
        const progress = Math.min(elapsed / duration, 1);
        setValue(Math.round(easeOutExpo(progress) * target));
        if (progress < 1) rafRef.current = requestAnimationFrame(step);
      };
      rafRef.current = requestAnimationFrame(step);
    }, delay);

    return () => {
      clearTimeout(timer);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [target, duration, delay]);

  return value;
}

function ClockIcon() {
  return (
    <svg viewBox="0 0 24 24">
      <circle cx="12" cy="12" r="9" />
      <polyline points="12 7 12 12 15 15" />
    </svg>
  );
}

function CertIcon() {
  return (
    <svg viewBox="0 0 24 24">
      <circle cx="12" cy="9" r="5" />
      <path d="M9 14l-2 7 5-3 5 3-2-7" />
    </svg>
  );
}

function CheckIcon() {
  return (
    <svg viewBox="0 0 24 24">
      <circle cx="12" cy="12" r="9" />
      <polyline points="8.5 12.5 11 15 15.5 10" />
    </svg>
  );
}

export default function ProgressDashboard() {
  const hours = useCountUp(18, 1600, 0);
  const certs = useCountUp(2, 1200, 200);
  const courses = useCountUp(4, 1400, 400);

  return (
    <>
      <style>{styles}</style>
      <div className="progress-wrapper">
        <div className="progress-inner">
          <h2 className="progress-title">Your Progress Recently</h2>
          <p className="progress-subtitle">You're making great progress!</p>

          <div className="cards-grid">
            <div className="stat-card card-hours">
              <div className="card-content">
                <div className="card-header">
                  <div className="card-icon icon-hours"><ClockIcon /></div>
                  <span className="card-label">Learning Hours</span>
                </div>
                <div className="card-value-row">
                  <span className="card-value">{hours}</span>
                  <span className="card-unit">hr/week</span>
                </div>
              </div>
            </div>

            <div className="stat-card card-certs">
              <div className="card-content">
                <div className="card-header">
                  <div className="card-icon icon-certs"><CertIcon /></div>
                  <span className="card-label">Certificates</span>
                </div>
                <div className="card-value-row">
                  <span className="card-value">{certs}</span>
                </div>
              </div>
            </div>

            <div className="stat-card card-courses">
              <div className="card-content">
                <div className="card-header">
                  <div className="card-icon icon-courses"><CheckIcon /></div>
                  <span className="card-label">Completed Courses</span>
                </div>
                <div className="card-value-row">
                  <span className="card-value">{courses}</span>
                  <span className="card-unit">of 6</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}