import { useState, useEffect, useRef } from "react";
import "./Footer.css";

const faqData = [
  {
    q: "What is the Asset Library?",
    a: "The Asset Library is a centralized repository where you can store, manage, and access all your media assets including images, videos, and documents. It seamlessly integrates with all other features.",
  },
  {
    q: "Which integrations are currently supported?",
    a: "We support integrations with major platforms including Shopify, WooCommerce, Salesforce, HubSpot, Zapier, and dozens more. New integrations are added regularly based on user feedback.",
  },
  {
    q: "How does the Media Player work?",
    a: "Our Media Player is an embeddable, fully customizable player that works across all devices and browsers. It supports adaptive bitrate streaming, custom branding, analytics, and interactive hotspots.",
  },
  {
    q: "What are Pages used for?",
    a: "Pages lets you build beautiful, conversion-optimized landing pages directly within the platform — no coding required. Choose from templates or start from scratch with our drag-and-drop editor.",
  },
  {
    q: "What plan includes all features?",
    a: "Our Enterprise plan unlocks all features with unlimited usage, priority support, custom SLAs, and dedicated onboarding. Contact us for a custom quote tailored to your team's needs.",
  },
];

export default function Footer() {
  const [faqOpen, setFaqOpen] = useState(false);
  const [openItem, setOpenItem] = useState(null);
  const footerRef = useRef(null);
  const glowRef = useRef(null);

  // ── Escape key closes FAQ modal
  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === "Escape") setFaqOpen(false);
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, []);

  // ── Magnetic glow cursor + click ripple on nav links
  useEffect(() => {
    const footer = footerRef.current;
    const glow = glowRef.current;
    if (!footer || !glow) return;

    let rafId = null;
    let targetX = 0;
    let targetY = 0;

    const onMove = (e) => {
      const r = footer.getBoundingClientRect();
      targetX = e.clientX - r.left;
      targetY = e.clientY - r.top;
      glow.style.opacity = "1";

      if (rafId) return;
      rafId = requestAnimationFrame(function tick() {
        glow.style.left = targetX + "px";
        glow.style.top = targetY + "px";
        rafId = null;
      });
    };

    const onLeave = () => {
      glow.style.opacity = "0";
    };

    footer.addEventListener("mousemove", onMove);
    footer.addEventListener("mouseleave", onLeave);

    // Ripple on nav links
    const links = footer.querySelectorAll(".nav-link");
    const addRipple = (e) => {
      const link = e.currentTarget;
      const r = link.getBoundingClientRect();
      const size = Math.max(r.width, r.height) * 1.5;
      const el = document.createElement("span");
      el.className = "ripple";
      el.style.cssText = `
        width: ${size}px;
        height: ${size}px;
        left: ${e.clientX - r.left - size / 2}px;
        top: ${e.clientY - r.top - size / 2}px;
      `;
      link.appendChild(el);
      setTimeout(() => el.remove(), 500);
    };

    links.forEach((l) => {
      l.style.position = "relative";
      l.style.overflow = "hidden";
      l.addEventListener("click", addRipple);
    });

    return () => {
      footer.removeEventListener("mousemove", onMove);
      footer.removeEventListener("mouseleave", onLeave);
      links.forEach((l) => l.removeEventListener("click", addRipple));
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const toggleItem = (i) => {
    setOpenItem(openItem === i ? null : i);
  };

  return (
    <>
      {/* ── FAQ Modal ──────────────────────────────────────── */}
      <div
        className={`faq-modal-overlay ${faqOpen ? "active" : ""}`}
        onClick={(e) => e.target === e.currentTarget && setFaqOpen(false)}
      >
        <div className="faq-modal">
          <div className="faq-modal-header">
            <span className="faq-modal-title">Frequently Asked Questions</span>
            <button className="faq-close-btn" onClick={() => setFaqOpen(false)}>
              ×
            </button>
          </div>

          {faqData.map((item, i) => (
            <div key={i} className={`faq-item ${openItem === i ? "open" : ""}`}>
              <button className="faq-question-btn" onClick={() => toggleItem(i)}>
                <span className="faq-question">{item.q}</span>
                <span className="faq-chevron">▾</span>
              </button>
              <div className="faq-answer">
                <p>{item.a}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── Footer ─────────────────────────────────────────── */}
      <footer className="footer" ref={footerRef}>

        {/* Magnetic glow — follows cursor */}
        <div className="glow-cursor" ref={glowRef} />

        {/* Main nav grid */}
        <div className="footer-main">

          {/* Brand */}
          <div className="brand-col">
            <button
              className="scroll-top-btn"
              onClick={scrollToTop}
              aria-label="Scroll to top"
            >
              <svg
                className="arrow-icon"
                width="18"
                height="18"
                viewBox="0 0 18 18"
                fill="none"
              >
                <path
                  d="M9 14V4M9 4L4.5 8.5M9 4L13.5 8.5"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>

            <div className="logo-text">dabta</div>

            <p className="brand-desc">
              The purpose of a FAQ is generally to provide information.
            </p>
          </div>

          {/* Features */}
          <div className="nav-col">
            <span className="nav-col-title">Features</span>
            <a href="#" className="nav-link">Asset Library</a>
            <a href="#" className="nav-link">Integrations</a>
            <a href="#" className="nav-link">Media Player</a>
            <a href="#" className="nav-link">Pages</a>
          </div>

          {/* Use cases */}
          <div className="nav-col">
            <span className="nav-col-title">Use cases</span>
            <a href="#" className="nav-link">DTC and eCom</a>
            <a href="#" className="nav-link">Gaming</a>
            <a href="#" className="nav-link">Agencies</a>
          </div>

          {/* Company */}
          <div className="nav-col">
            <span className="nav-col-title">Company</span>
            <a href="#" className="nav-link">About us</a>
            <a href="#" className="nav-link">Blog</a>
            <button
              className="nav-link faq-link"
              onClick={() => setFaqOpen(true)}
            >
              FAQ
            </button>
            <a href="#" className="nav-link">Pricing</a>
            <a href="#" className="nav-link">Privacy policy</a>
            <a href="#" className="nav-link">Solutions library</a>
          </div>

          {/* Social */}
          <div className="nav-col">
            <span className="nav-col-title">Social</span>
            <a href="https://x.com" target="_blank" rel="noreferrer" className="nav-link">
              X
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noreferrer" className="nav-link">
              Linkedin
            </a>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="footer-bottom">
          <span className="copyright">© 2024 Transparent.</span>
        </div>

      </footer>
    </>
  );
}