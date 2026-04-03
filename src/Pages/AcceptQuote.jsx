import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"; // Assuming React Router
import logo from "../Assets/logo.svg";

// ─── Styles ───────────────────────────────────────────────────────────────────

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Lexend+Exa:wght@300;400;500;600;700;800&display=swap');

  *, *::before, *::after {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  body {
    background: #141414;
    font-family: 'Lexend Exa', sans-serif;
  }

  /* ── Root ── */
  .success-root {
    position: fixed;
    inset: 0;
    z-index: 9999;
    overflow: hidden;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background: #141414;
    font-family: 'Lexend Exa', sans-serif;
    animation: successEntrance 0.6s cubic-bezier(0.22, 1, 0.36, 1) both;
  }

  /* Background grid */
  .success-root::before {
    content: '';
    position: absolute;
    inset: 0;
    pointer-events: none;
    background-image:
      linear-gradient(rgba(237, 254, 142, 0.03) 1px, transparent 1px),
      linear-gradient(90deg, rgba(237, 254, 142, 0.03) 1px, transparent 1px);
    background-size: 48px 48px;
  }

  /* Center radial glow — Green/Yellow for success */
  .success-root::after {
    content: '';
    position: absolute;
    width: 600px;
    height: 600px;
    border-radius: 50%;
    pointer-events: none;
    background: radial-gradient(circle, rgba(237, 254, 142, 0.05) 0%, transparent 70%);
  }

  /* ── Corner accents ── */
  .corner {
    position: absolute;
    width: 24px;
    height: 24px;
    opacity: 0.2;
    animation: fadeSlideUp 1s 0.5s both;
  }
  .corner-tl { top: 32px;    left: 32px;  border-top:    1.5px solid #EDFE8E; border-left:  1.5px solid #EDFE8E; }
  .corner-tr { top: 32px;    right: 32px; border-top:    1.5px solid #EDFE8E; border-right: 1.5px solid #EDFE8E; }
  .corner-bl { bottom: 32px; left: 32px;  border-bottom: 1.5px solid #EDFE8E; border-left:  1.5px solid #EDFE8E; }
  .corner-br { bottom: 32px; right: 32px; border-bottom: 1.5px solid #EDFE8E; border-right: 1.5px solid #EDFE8E; }

  /* ── Floating dots ── */
  .dot {
    position: absolute;
    border-radius: 50%;
    background: #EDFE8E;
    opacity: 0;
    animation: floatDot 6s ease-in-out infinite;
  }
  .dot-1 { width: 4px; height: 4px; top: 25%; left: 20%;  animation-delay: 0s;   }
  .dot-2 { width: 3px; height: 3px; top: 65%; left: 15%;  animation-delay: 1.2s; }
  .dot-3 { width: 5px; height: 5px; top: 30%; right: 18%; animation-delay: 2.1s; }
  .dot-4 { width: 3px; height: 3px; top: 70%; right: 22%; animation-delay: 0.6s; }

  /* ── Logo ── */
  .logo-wrap {
    display: flex;
    align-items: center;
    animation: fadeSlideUp 0.7s cubic-bezier(0.22, 1, 0.36, 1) both;
    opacity: 0.6;
  }
  .logo-mark img { width: 80px; height: auto; filter: brightness(1.2); }

  /* ── Success icon ── */
  .success-icon-wrap {
    margin-top: 36px;
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    animation: fadeSlideUp 0.7s 0.1s cubic-bezier(0.22, 1, 0.36, 1) both;
  }

  .success-icon-ring {
    width: 64px;
    height: 64px;
    border-radius: 50%;
    border: 1.5px solid rgba(237, 254, 142, 0.3);
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
  }

  .success-icon-ring::before {
    content: '';
    position: absolute;
    inset: -8px;
    border-radius: 50%;
    border: 1px solid rgba(237, 254, 142, 0.15);
    animation: pulseRing 2.4s ease-out infinite;
  }

  .success-icon-svg {
    width: 28px;
    height: 28px;
    color: #EDFE8E;
  }

  /* ── Status Badge ── */
  .status-code {
    margin-top: 28px;
    font-size: 9px;
    font-weight: 700;
    letter-spacing: 3px;
    text-transform: uppercase;
    color: rgba(237, 254, 142, 0.6);
    animation: fadeSlideUp 0.7s 0.18s cubic-bezier(0.22, 1, 0.36, 1) both;
  }

  .success-headline {
    margin-top: 12px;
    font-size: 18px;
    font-weight: 600;
    color: #e8e8e8;
    letter-spacing: -0.3px;
    text-align: center;
    animation: fadeSlideUp 0.7s 0.22s cubic-bezier(0.22, 1, 0.36, 1) both;
  }

  .success-subline {
    margin-top: 10px;
    font-size: 10px;
    font-weight: 400;
    color: #777;
    letter-spacing: 1px;
    text-align: center;
    max-width: 280px;
    line-height: 1.8;
    animation: fadeSlideUp 0.7s 0.28s cubic-bezier(0.22, 1, 0.36, 1) both;
  }

  .success-divider {
    margin-top: 32px;
    width: 220px;
    height: 1px;
    background: linear-gradient(90deg, transparent, #252525 20%, #252525 80%, transparent);
    animation: fadeSlideUp 0.7s 0.32s cubic-bezier(0.22, 1, 0.36, 1) both;
  }

  .detail-row {
    margin-top: 20px;
    width: 220px;
    display: flex;
    justify-content: space-between;
    animation: fadeSlideUp 0.7s 0.36s cubic-bezier(0.22, 1, 0.36, 1) both;
  }

  .detail-key { font-size: 9px; color: #444; text-transform: uppercase; letter-spacing: 1px; }
  .detail-val { font-size: 9px; color: #EDFE8E; font-weight: 600; }

  /* ── Redirect Progress ── */
  .redirect-notice {
    margin-top: 40px;
    font-size: 8px;
    color: #444;
    text-transform: uppercase;
    letter-spacing: 2px;
    animation: fadeSlideUp 0.7s 0.45s both;
  }

  .progress-bar-container {
    margin-top: 12px;
    width: 180px;
    height: 2px;
    background: #1a1a1a;
    border-radius: 2px;
    overflow: hidden;
  }

  .progress-bar-fill {
    height: 100%;
    background: #EDFE8E;
    transition: width 1s linear;
  }

  /* ── Keyframes ── */
  @keyframes fadeSlideUp {
    from { opacity: 0; transform: translateY(16px); }
    to   { opacity: 1; transform: translateY(0);    }
  }

  @keyframes successEntrance {
    from { opacity: 0; }
    to   { opacity: 1; }
  }

  @keyframes floatDot {
    0%   { opacity: 0;   transform: translateY(0px);   }
    20%  { opacity: 0.15;                              }
    80%  { opacity: 0.08;                              }
    100% { opacity: 0;   transform: translateY(-28px); }
  }

  @keyframes pulseRing {
    0%   { transform: scale(1);   opacity: 1; }
    100% { transform: scale(1.6); opacity: 0; }
  }
`;

export default function RequestAcceptedPage() {
  const navigate = useNavigate();
  const [countdown, setCountdown] = useState(5);
  const totalSeconds = 5;

  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          navigate("/"); // Redirect to home
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [navigate]);

  return (
    <>
      <style>{styles}</style>

      <div className="success-root">
        {/* Decorative Elements */}
        <div className="corner corner-tl" />
        <div className="corner corner-tr" />
        <div className="corner corner-bl" />
        <div className="corner corner-br" />
        {[1, 2, 3, 4].map((i) => <div key={i} className={`dot dot-${i}`} />)}

        {/* Branding */}
        <div className="logo-wrap">
          <div className="logo-mark">
            <img src={logo} alt="Dabto" />
          </div>
        </div>

        {/* Success Visual */}
        <div className="success-icon-wrap">
          <div className="success-icon-ring">
            <svg
              className="success-icon-svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <polyline points="20 6 9 17 4 12" />
            </svg>
          </div>
        </div>

        <div className="status-code">Request accepted</div>
        <h1 className="success-headline">Processing Confirmed</h1>
        <p className="success-subline">
          Your request has been successfully validated and is now being processed by the intelligence engine.
        </p>

        <div className="success-divider" />

        {/* Details */}
        <div className="detail-row">
          <span className="detail-key">Action</span>
          <span className="detail-val">Synchronize</span>
        </div>
        <div className="detail-row" style={{ marginTop: '8px' }}>
          <span className="detail-key">Status</span>
          <span className="detail-val">Active</span>
        </div>

        {/* Redirect Logic */}
        <div className="redirect-notice">
          Redirecting in {countdown}s
        </div>
        <div className="progress-bar-container">
          <div 
            className="progress-bar-fill" 
            style={{ width: `${(countdown / totalSeconds) * 100}%` }} 
          />
        </div>
      </div>
    </>
  );
}