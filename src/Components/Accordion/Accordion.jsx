import { useState } from "react";
import "./Accordion.css";

export default function Accordion() {
  const [open, setOpen] = useState(false);

  return (
    <div className="scene">
      <div className="acc">
        <button
          className="acc-btn"
          onClick={() => setOpen(!open)}
          aria-expanded={open}
        >
          <div className="acc-label">
            <span className="acc-idx">01</span>
            <span className="acc-title">What is negative space?</span>
          </div>
          <div className={open ? "acc-icon open" : "acc-icon"}>
            <svg viewBox="0 0 12 12">
              <polyline points="2 4 6 8 10 4" />
            </svg>
          </div>
        </button>

        <div className={open ? "acc-divider hidden" : "acc-divider"} />

        <div className={open ? "acc-body open" : "acc-body"} role="region">
          <div className="acc-inner">
            <div className="acc-content">
              <p className="acc-text">
                Negative space is the <em>area surrounding</em> the subject of
                an image — the empty, open space that gives the eye room to
                breathe. Far from wasted, it shapes how we perceive form,
                balance, and intention. The best designs treat silence with the
                same care as sound.
              </p>
              <div className="acc-tags">
                <span className="acc-tag">Design</span>
                <span className="acc-tag">Composition</span>
                <span className="acc-tag">Theory</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}