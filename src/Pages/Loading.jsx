import { useState, useEffect } from "react";
import logo from "../Assets/logo.svg";

// ─── Constants ───────────────────────────────────────────────────────────────

const MILESTONES = [18, 38, 57, 80, 100];

const STEPS = [
  "Connecting to your workspace…",
  "Loading supplier data…",
  "Fetching active operations…",
  "Preparing your dashboard…",
  "Almost there…",
];

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
  .loader-root {
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
  }

  /* Background grid */
  .loader-root::before {
    content: '';
    position: absolute;
    inset: 0;
    pointer-events: none;
    background-image:
      linear-gradient(rgba(200, 232, 75, 0.03) 1px, transparent 1px),
      linear-gradient(90deg, rgba(200, 232, 75, 0.03) 1px, transparent 1px);
    background-size: 48px 48px;
  }

  /* Center radial glow */
  .loader-root::after {
    content: '';
    position: absolute;
    width: 600px;
    height: 600px;
    border-radius: 50%;
    pointer-events: none;
    background: radial-gradient(circle, rgba(200, 232, 75, 0.06) 0%, transparent 70%);
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
    animation: floatDot 4s ease-in-out infinite;
  }
  .dot-1 { width: 4px; height: 4px; top: 25%; left: 20%;  animation-delay: 0s;   }
  .dot-2 { width: 3px; height: 3px; top: 65%; left: 15%;  animation-delay: 0.8s; }
  .dot-3 { width: 5px; height: 5px; top: 30%; right: 18%; animation-delay: 1.4s; }
  .dot-4 { width: 3px; height: 3px; top: 70%; right: 22%; animation-delay: 0.4s; }
  .dot-5 { width: 4px; height: 4px; top: 45%; left: 8%;   animation-delay: 2s;   }
  .dot-6 { width: 3px; height: 3px; top: 55%; right: 10%; animation-delay: 1s;   }

  /* ── Logo ── */
  .logo-wrap {
    display: flex;
    align-items: center;
    animation: fadeSlideUp 0.7s cubic-bezier(0.22, 1, 0.36, 1) both;
  }

 

  .logo-mark img {
    width: 100%;
    height: 100%;
    object-fit: contain;
  }

  /* ── Tagline ── */
  .tagline {
    margin-top: 14px;
    font-size: 11px;
    font-weight: 400;
    color: #555;
    letter-spacing: 2.5px;
    text-transform: uppercase;
    animation: fadeSlideUp 0.7s 0.15s cubic-bezier(0.22, 1, 0.36, 1) both;
  }

  /* ── Progress ── */
  .progress-wrap {
    margin-top: 52px;
    width: 220px;
    display: flex;
    flex-direction: column;
    gap: 14px;
    animation: fadeSlideUp 0.7s 0.25s cubic-bezier(0.22, 1, 0.36, 1) both;
  }

  .progress-track {
    width: 100%;
    height: 2px;
    border-radius: 99px;
    overflow: hidden;
    background: #252525;
    position: relative;
  }

  .progress-fill {
    height: 100%;
    border-radius: 99px;
    background: linear-gradient(90deg, #9a962e, #EDFE8E);
    transition: width 0.4s cubic-bezier(0.4, 0, 0.2, 1);
    position: relative;
  }

  .progress-fill::after {
    content: '';
    position: absolute;
    right: 0;
    top: 50%;
    transform: translateY(-50%);
    width: 6px;
    height: 6px;
    border-radius: 50%;
    background: #EDFE8E;
    box-shadow: 0 0 8px #EDFE8E;
  }

  .progress-bottom {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .progress-label {
    font-size: 10px;
    font-weight: 500;
    color: #444;
    letter-spacing: 1px;
    text-transform: uppercase;
    transition: opacity 0.3s;
  }

  .progress-pct {
    font-size: 10px;
    font-weight: 600;
    color: #EDFE8E;
    letter-spacing: 0.5px;
  }

  /* ── Fade out ── */
  .loader-root.done {
    animation: fadeOut 0.6s 0.2s cubic-bezier(0.4, 0, 1, 1) forwards;
  }

  /* ── Keyframes ── */
  @keyframes fadeSlideUp {
    from { opacity: 0; transform: translateY(16px); }
    to   { opacity: 1; transform: translateY(0);    }
  }

  @keyframes floatDot {
    0%   { opacity: 0;   transform: translateY(0px);   }
    20%  { opacity: 0.4;                               }
    80%  { opacity: 0.2;                               }
    100% { opacity: 0;   transform: translateY(-28px); }
  }

  @keyframes fadeOut {
    to { opacity: 0; pointer-events: none; }
  }
`;

// ─── Hook ─────────────────────────────────────────────────────────────────────

function useLoadingProgress(onComplete) {
  const [progress, setProgress] = useState(0);
  const [stepIndex, setStepIndex] = useState(0);
  const [done, setDone] = useState(false);

  useEffect(() => {
    let current = 0;

    const advance = () => {
      if (current >= MILESTONES.length) return;

      const target = MILESTONES[current];
      setStepIndex(Math.min(current, STEPS.length - 1));
      current++;

      const ticker = setInterval(() => {
        setProgress((prev) => {
          if (prev >= target) {
            clearInterval(ticker);

            if (target === 100) {
              setTimeout(() => {
                setDone(true);
                setTimeout(() => onComplete?.(), 800);
              }, 400);
            } else {
              setTimeout(advance, 280 + Math.random() * 320);
            }

            return target;
          }
          return prev + 1;
        });
      }, 18);
    };

    const start = setTimeout(advance, 300);
    return () => clearTimeout(start);
  }, []);

  return { progress, stepIndex, done };
}

// ─── Component ────────────────────────────────────────────────────────────────

export default function DabtoLoadingScreen({ onComplete }) {
  const { progress, stepIndex, done } = useLoadingProgress(onComplete);

  return (
    <>
      <style>{styles}</style>

      <div className={`loader-root${done ? " done" : ""}`}>

        {/* Corner accents */}
        <div className="corner corner-tl" />
        <div className="corner corner-tr" />
        <div className="corner corner-bl" />
        <div className="corner corner-br" />

        {/* Floating ambient dots */}
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <div key={i} className={`dot dot-${i}`} />
        ))}

        {/* Logo */}
        <div className="logo-wrap">
          <div className="logo-mark">
            <img src={logo} alt="Dabto" />
          </div>
        </div>

        {/* Tagline */}
        <div className="tagline">Fashion Supply Intelligence</div>

        {/* Progress */}
        <div className="progress-wrap">
          <div className="progress-track">
            <div className="progress-fill" style={{ width: `${progress}%` }} />
          </div>
          <div className="progress-bottom">
            <div className="progress-label">{STEPS[stepIndex]}</div>
            <div className="progress-pct">{progress}%</div>
          </div>
        </div>

      </div>
    </>
  );
}