import { useState } from "react";
import "./Accordion.css";

export default function Accordion({ question, answer }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className={`accordion-item ${isOpen ? "open" : ""}`}>
      <button
        className="accordion-trigger"
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
      >
        <span className="accordion-question">
          {question}
        </span>

        <span className="accordion-icon" aria-hidden="true">
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <polyline points="6 9 12 15 18 9" />
          </svg>
        </span>
      </button>

      <div className="accordion-body">
        <div className="accordion-inner">
          <div className="linecon">
            <p className="accordion-answer">
              {answer}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}