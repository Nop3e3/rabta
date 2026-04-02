import { useState, useEffect } from "react";
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
  .error-root {
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
    animation: errorEntrance 0.6s cubic-bezier(0.22, 1, 0.36, 1) both;
  }

  /* Background grid */
  .error-root::before {
    content: '';
    position: absolute;
    inset: 0;
    pointer-events: none;
    background-image:
      linear-gradient(rgba(200, 232, 75, 0.03) 1px, transparent 1px),
      linear-gradient(90deg, rgba(200, 232, 75, 0.03) 1px, transparent 1px);
    background-size: 48px 48px;
  }

  /* Center radial glow — red-tinted for error */
  .error-root::after {
    content: '';
    position: absolute;
    width: 600px;
    height: 600px;
    border-radius: 50%;
    pointer-events: none;
    background: radial-gradient(circle, rgba(255, 80, 80, 0.05) 0%, transparent 70%);
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

  /* ── Floating dots — dimmer, slower for error mood ── */
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
  .dot-5 { width: 4px; height: 4px; top: 45%; left: 8%;   animation-delay: 3s;   }
  .dot-6 { width: 3px; height: 3px; top: 55%; right: 10%; animation-delay: 1.5s; }

  /* ── Logo ── */
  .logo-wrap {
    display: flex;
    align-items: center;
    animation: fadeSlideUp 0.7s cubic-bezier(0.22, 1, 0.36, 1) both;
    opacity: 0.5;
  }

  .logo-mark img {
    width: 100%;
    height: 100%;
    object-fit: contain;
    filter: grayscale(0.4);
  }

  /* ── Error icon ── */
  .error-icon-wrap {
    margin-top: 36px;
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    animation: fadeSlideUp 0.7s 0.1s cubic-bezier(0.22, 1, 0.36, 1) both;
  }

  .error-icon-ring {
    width: 56px;
    height: 56px;
    border-radius: 50%;
    border: 1.5px solid rgba(255, 100, 172, 0.25);
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
  }

  /* Pulsing ring */
  .error-icon-ring::before {
    content: '';
    position: absolute;
    inset: -8px;
    border-radius: 50%;
    border: 1px solid rgba(255, 100, 183, 0.1);
    animation: pulseRing 2.4s ease-out infinite;
  }

  .error-icon-ring::after {
    content: '';
    position: absolute;
    inset: -16px;
    border-radius: 50%;
    border: 1px solid rgba(255, 100, 185, 0.05);
    animation: pulseRing 2.4s 0.4s ease-out infinite;
  }

  .error-icon-svg {
    width: 22px;
    height: 22px;
    color: #ff3cae;
  }

  /* ── Error code badge ── */
  .error-code {
    margin-top: 28px;
    font-size: 9px;
    font-weight: 700;
    letter-spacing: 3px;
    text-transform: uppercase;
    color: rgba(255, 100, 172, 0.5);
    animation: fadeSlideUp 0.7s 0.18s cubic-bezier(0.22, 1, 0.36, 1) both;
  }

  /* ── Headline ── */
  .error-headline {
    margin-top: 12px;
    font-size: 18px;
    font-weight: 600;
    color: #e8e8e8;
    letter-spacing: -0.3px;
    text-align: center;
    animation: fadeSlideUp 0.7s 0.22s cubic-bezier(0.22, 1, 0.36, 1) both;
  }

  /* ── Subline ── */
  .error-subline {
    margin-top: 10px;
    font-size: 10px;
    font-weight: 400;
    color: #444;
    letter-spacing: 1px;
    text-align: center;
    max-width: 260px;
    line-height: 1.8;
    animation: fadeSlideUp 0.7s 0.28s cubic-bezier(0.22, 1, 0.36, 1) both;
  }

  /* ── Divider ── */
  .error-divider {
    margin-top: 32px;
    width: 220px;
    height: 1px;
    background: linear-gradient(90deg, transparent, #252525 20%, #252525 80%, transparent);
    animation: fadeSlideUp 0.7s 0.32s cubic-bezier(0.22, 1, 0.36, 1) both;
  }

  /* ── Details row ── */
  .error-details {
    margin-top: 20px;
    width: 220px;
    display: flex;
    flex-direction: column;
    gap: 8px;
    animation: fadeSlideUp 0.7s 0.36s cubic-bezier(0.22, 1, 0.36, 1) both;
  }

  .error-detail-row {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .detail-key {
    font-size: 9px;
    font-weight: 500;
    letter-spacing: 1.5px;
    text-transform: uppercase;
    color: #333;
  }

  .detail-val {
    font-size: 9px;
    font-weight: 600;
    letter-spacing: 0.5px;
    color: #555;
  }

  .detail-val.red {
    color: rgba(255, 79, 170, 0.6);
  }

  /* ── Retry button ── */
  .error-actions {
    margin-top: 32px;
    display: flex;
    gap: 10px;
    animation: fadeSlideUp 0.7s 0.42s cubic-bezier(0.22, 1, 0.36, 1) both;
  }

  .btn {
    font-family: 'Lexend Exa', sans-serif;
    font-size: 9px;
    font-weight: 600;
    letter-spacing: 2px;
    text-transform: uppercase;
    border: none;
    cursor: pointer;
    padding: 11px 22px;
    border-radius: 3px;
    transition: all 0.2s ease;
  }

  .btn-primary {
    background: #EDFE8E;
    color: #141414;
    
  }

  .btn-primary:hover {
    background: #f5ff9f;
    transform: translateY(-1px);
    box-shadow: 0 0 20px rgba(237, 254, 142, 0.2);
  }

  .btn-primary:active {
    transform: translateY(0);
  }

  /* Spinning icon inside button */
  .btn-primary.loading .btn-icon {
    animation: spin 0.8s linear infinite;
  }

  .btn-ghost {
    background: transparent;
    color: #444;
    border: 1px solid #252525;
  }

  .btn-ghost:hover {
    color: #888;
    border-color: #333;
  }

  .btn-icon {
    display: inline-block;
    margin-right: 6px;
    vertical-align: middle;
  }

  /* ── Status bar ── */
  .error-status-bar {
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    height: 2px;
    background: linear-gradient(90deg, transparent, rgba(255, 100, 219, 0.3), transparent);
    animation: scanline 3s ease-in-out infinite;
  }

  /* ── Tagline ── */
  .tagline {
    position: absolute;
    bottom: 40px;
    font-size: 10px;
    font-weight: 400;
    color: #2a2a2a;
    letter-spacing: 2.5px;
    text-transform: uppercase;
  }

  /* ── Keyframes ── */
  @keyframes fadeSlideUp {
    from { opacity: 0; transform: translateY(16px); }
    to   { opacity: 1; transform: translateY(0);    }
  }

  @keyframes errorEntrance {
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

  @keyframes scanline {
    0%   { transform: translateX(-100%); opacity: 0;   }
    20%  { opacity: 1; }
    80%  { opacity: 1; }
    100% { transform: translateX(100%);  opacity: 0;   }
  }

  @keyframes spin {
    from { transform: rotate(0deg);   }
    to   { transform: rotate(360deg); }
  }
`;

// ─── Component ────────────────────────────────────────────────────────────────

export default function DabtoErrorScreen({
  errorCode = "ERR_CONN_REFUSED",
  message = "Unable to reach workspace",
  detail = "The connection to your workspace timed out. Check your network and try again.",
  onRetry,
  onGoHome,
}) {
  const [retrying, setRetrying] = useState(false);
  const [timestamp] = useState(() =>
    new Date().toISOString().replace("T", " ").slice(0, 19)
  );

  const handleRetry = () => {
    if (retrying) return;
    setRetrying(true);
    setTimeout(() => {
      setRetrying(false);
      onRetry?.();
    }, 1800);
  };

  return (
    <>
      <style>{styles}</style>

      <div className="error-root">

        {/* Corner accents */}
        <div className="corner corner-tl" />
        <div className="corner corner-tr" />
        <div className="corner corner-bl" />
        <div className="corner corner-br" />

        {/* Floating ambient dots */}
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <div key={i} className={`dot dot-${i}`} />
        ))}

        {/* Bottom scan line */}
        <div className="error-status-bar" />

        {/* Logo — dimmed */}
        <div className="logo-wrap">
          <div className="logo-mark">
            <img src={logo} alt="Dabto" />
          </div>
        </div>

        {/* Error icon */}
        <div className="error-icon-wrap">
          <div className="error-icon-ring">
            <svg
              className="error-icon-svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="12" y1="8" x2="12" y2="12" />
              <line x1="12" y1="16" x2="12.01" y2="16" />
              <circle cx="12" cy="12" r="10" />
            </svg>
          </div>
        </div>

        {/* Error code */}
        <div className="error-code">{errorCode}</div>

        {/* Headline */}
        <div className="error-headline">{message}</div>

        {/* Subline */}
        <div className="error-subline">{detail}</div>

        {/* Divider */}
        <div className="error-divider" />

        {/* Detail rows */}
        <div className="error-details">
          <div className="error-detail-row">
            <span className="detail-key">Timestamp</span>
            <span className="detail-val">{timestamp}</span>
          </div>
          <div className="error-detail-row">
            <span className="detail-key">Status</span>
            <span className="detail-val red">Unreachable</span>
          </div>
          <div className="error-detail-row">
            <span className="detail-key">Module</span>
            <span className="detail-val">workspace.init</span>
          </div>
        </div>

        {/* Actions */}
        <div className="error-actions">
          <button className={`btn btn-primary${retrying ? " loading" : ""}`} onClick={handleRetry}>
            <span className="btn-icon">
              {retrying ? (
                <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                  <path d="M21 12a9 9 0 1 1-6.219-8.56" />
                </svg>
              ) : (
                <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="23 4 23 10 17 10" />
                  <path d="M20.49 15a9 9 0 1 1-.08-4.82" />
                </svg>
              )}
            </span>
            {retrying ? "Retrying…" : "Retry"}
          </button>

          <button className="btn btn-ghost" onClick={onGoHome}>
            Go home
          </button>
        </div>

        {/* Tagline */}
        <div className="tagline">Fashion Supply Intelligence</div>

      </div>
    </>
  );
}