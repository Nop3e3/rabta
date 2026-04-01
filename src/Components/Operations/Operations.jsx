import React, { useState, useEffect } from 'react';
import './Operations.css';
import Ctabttn from"../Ctabttn/Ctabttn";

/* ─── PROGRESS TRACK ────────────────────────────────────────── */
const ProgressTrack = ({ labels, fillPercent, ticks, currentLabel }) => (
  <div className="progress-section">
    <div className="progress-labels">
      {labels.map((label, i) => (
        <span
          key={i}
          className={[
            "progress-label",
            label.faint  ? "faint"  : "",
            label.center ? "center" : "",
          ]
            .filter(Boolean)
            .join(" ")}
        >
          {label.text}
        </span>
      ))}
    </div>
 
    {/* Track row — extra top space for the floating indicator */}
    <div className="track-outer">
 
      {/* ── CURRENT POINT INDICATOR ── */}
      <div
        className="current-indicator"
        style={{ "--fill-pos": `${fillPercent}%` }}
      >
        {/* label box */}
        <div className="current-box">
          <span className="current-dot-live" />
          <span className="current-label-text">{currentLabel}</span>
        </div>
        {/* arrow stem */}
        <div className="current-arrow" />
      </div>
 
      {/* ── BAR ── */}
      <div className="track-bg">
        <div
          className="track-fill"
          style={{ "--fill-target": `${fillPercent}%` }}
        />
        {ticks.map((tick, i) => (
          <div
            key={i}
            className={["tick", `tick-${tick.pos}`, tick.active ? "active" : ""].join(" ")}
          />
        ))}
      </div>
    </div>
  </div>
);
 
/* ─── CARD ──────────────────────────────────────────────────── */
const ShipmentCard = ({
  title,
  subtitle,
  tags,
  statusLabel,
  statusClass,
  ctaLabel,
  progressLabels,
  fillPercent,
  ticks,
  currentLabel,
  onCta,
}) => (
  <div className="card">
    <div className="card-header">
      <div className="card-info">
        <h2 className="card-title">{title}</h2>
        <p className="card-subtitle">{subtitle}</p>
 
        <div className="card-tags">
          {tags.map((tag, i) => (
            <span key={i}>
              {i > 0 && <span className="tag-dot" />}
              <span className="tag-text">{tag}</span>
            </span>
          ))}
          <span className={`status-badge ${statusClass}`}>{statusLabel}</span>
        </div>
      </div>
 <Ctabttn text={ctaLabel} />
    
    </div>
 
    <ProgressTrack
      labels={progressLabels}
      fillPercent={fillPercent}
      ticks={ticks}
      currentLabel={currentLabel}
    />
  </div>
);
 
/* ─── DATA ──────────────────────────────────────────────────── */
const CARDS = [
  {
    title:        "Cairo Textile Hub",
    subtitle:     "Summer Clothing Collection",
    tags:         ["100% Cotton", "Graphic", "T-shirts"],
    statusLabel:  "In Transit",
    statusClass:  "status-transit",
    ctaLabel:     "Track Shipment",
    currentLabel: "In Transit",
    progressLabels: [
      { text: "Produced" },
      { text: "Shipped", center: true },
      { text: "Delivered" },
    ],
    fillPercent: 58,
    ticks: [
      { pos: 0,   active: true  },
      { pos: 50,  active: true  },
      { pos: 100, active: false },
    ],
  },
  {
    title:        "Denim Co. Cairo",
    subtitle:     "Summer Clothing Collection",
    tags:         ["100% Cotton", "Jeans"],
    statusLabel:  "Negotiation in Progress",
    statusClass:  "status-negotiation",
    ctaLabel:     "View Counter-Offer",
    currentLabel: "Negotiating",
    progressLabels: [
      { text: "RFQ Sent" },
      { text: "Counter Offer" },
      { text: "Deposit" },
    ],
    fillPercent: 10,
    ticks: [
      { pos: 0,   active: true  },
      { pos: 50,  active: false },
      { pos: 100, active: false },
    ],
  },
];
 
/* ─── APP ───────────────────────────────────────────────────── */
export default function App() {
  return (
    <div className="page-wrapper">
      {CARDS.map((card) => (
        <ShipmentCard
          key={card.title}
          {...card}
          onCta={() => {}}
        />
      ))}
    </div>
  );
}
 