import React, { useState, useEffect } from "react";
import "./Statscomp.css";
import Arrowbttn from "../Arrowbttn/Arrowbttn";

const BAR_COLORS = [
  {
    base: "linear-gradient(0deg, rgba(0,0,0,0.20), rgba(102,102,102,0.20)), linear-gradient(0deg, #FDF74E, #F6F47C)",
    hover: "linear-gradient(0deg, rgba(0,0,0,0.10), rgba(102,102,102,0.10)), linear-gradient(0deg, #FFFF8A, #F9F7A0)",
    glow: "rgba(253,247,78,0.4)",
    accent: "#FDF74E",
    accentDim: "#4a4810",
    textColor: "#454200",
  },
  {
    base: "linear-gradient(0deg, rgba(0,0,0,0.20), rgba(102,102,102,0.20)), linear-gradient(0deg, #FFF344, rgba(251,248,86,0.90))",
    hover: "linear-gradient(0deg, rgba(0,0,0,0.10), rgba(102,102,102,0.10)), linear-gradient(0deg, #FFF875, #FCFABA)",
    glow: "rgba(255,243,68,0.4)",
    accent: "#FFF344",
    accentDim: "#555010",
    textColor: "#454000",
  },
  {
    base: "linear-gradient(180deg, rgba(0,0,0,0.20), rgba(102,102,102,0.20)), linear-gradient(180deg, rgba(253,252,180,0.90), #FEFA90)",
    hover: "linear-gradient(180deg, rgba(0,0,0,0.10), rgba(102,102,102,0.10)), linear-gradient(180deg, #FFFED1, #FFFCA8)",
    glow: "rgba(254,250,144,0.4)",
    accent: "#FEFA90",
    accentDim: "#5a5820",
    textColor: "#4a4800",
  },
];

const data = [
  { label: "Cash on hand", value: 15000, percent: 40, max: 25000 },
  { label: "Inventory", value: 18000, percent: 45, max: 25000 },
  { label: "Receivables", value: 10350, percent: 15, max: 25000 },
];

const yTicks = [0, 5000, 10000, 15000, 20000, 25000];
const BASE_HEIGHT = 400; 
const HOVER_HEIGHT = 420;

function formatK(v) {
  return v === 0 ? "0" : v >= 1000 ? `${v / 1000}K` : v;
}

function AnimatedBar({ item, index, hovered, setHovered, mounted }) {
  const isHovered = hovered === index;
  const color = BAR_COLORS[index];
  const currentMaxHeight = isHovered ? HOVER_HEIGHT : BASE_HEIGHT;
  const barWidth = isHovered ? "85%" : "70%";
  const fillHeight = mounted ? `${(item.value / item.max) * currentMaxHeight}px` : "0px";

  return (
    <div className="bar-wrapper" onMouseEnter={() => setHovered(index)} onMouseLeave={() => setHovered(null)}>
      <div className="bar-shell" style={{ width: barWidth, height: currentMaxHeight, boxShadow: isHovered ? `0 0 40px ${color.glow}` : "none" }}>
        <div className="bar-fill" style={{ height: fillHeight, background: isHovered ? color.hover : color.base, transition: mounted ? "height 1.2s cubic-bezier(0.25,1,0.5,1), background 0.3s ease" : "none" }}>
          <span className="bar-percent" style={{ color: color.textColor, opacity: mounted ? 1 : 0 }}>{item.percent}%</span>
          <div className="bar-texture" />
        </div>
      </div>
      <div className="bar-underline" style={{ width: isHovered ? "60%" : "40%", background: isHovered ? color.accent : color.accentDim }} />
      <span className="bar-label" style={{ color: isHovered ? color.accent : "#555" }}>{item.label}</span>
    </div>
  );
}

export default function Graph({ image }) {
  const [mounted, setMounted] = useState(false);
  const [hovered, setHovered] = useState(null);
  const [valueCount, setValueCount] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => setMounted(true), 100);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!mounted) return;
    const target = 45000;
    const duration = 1200;
    const startTime = performance.now();
    function animateCount(now) {
      const progress = Math.min((now - startTime) / duration, 1);
      const easeOut = 1 - Math.pow(1 - progress, 3);
      setValueCount(Math.floor(easeOut * target));
      if (progress < 1) requestAnimationFrame(animateCount);
    }
    requestAnimationFrame(animateCount);
  }, [mounted]);

  return (
    <div className="dashboard">
      <div className="left-panel">
        <div className="stats-block">
          <p className="stats-label">Total Business Value</p>
          <div className="stats-growth"><span className="stats-growth-arrow">↗</span><span>+ 12% in the last month</span></div>
          <div className="stats-value">{valueCount.toLocaleString()}</div>
          <div className="stats-currency">EGP</div>
        </div>
        <div className="tip-block">
          <div className="tip-header"><div className="rafiq"></div><span className="tip-name">Rafiq's tip</span></div>
          <div className="tip-card"><p className="rafiqs-advice">You have 15% unallocated capital. Investing it in Linen now could save you 5% before the summer rush.</p></div>
        </div>
        <div className="btn-block">
           <Arrowbttn text="check your Business"  />
        </div>
      </div>
      <div className="chart-panel">
        <div className="y-ticks">{[...yTicks].reverse().map((t) => (<span key={t} className="y-tick">{formatK(t)}</span>))}</div>
        <div className="y-label">Value (EGP)</div>
        <div className="bars-area">
          <div className="grid-lines">{yTicks.map((t) => (<div key={t} className="grid-line" />))}</div>
          {data.map((item, i) => (<AnimatedBar key={i} item={item} index={i} hovered={hovered} setHovered={setHovered} mounted={mounted} />))}
        </div>
      </div>
    </div>
  );
}