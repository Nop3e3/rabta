import { useEffect, useRef } from "react";
import { Link } from "react-router-dom"; // ✅ Import Link
import "./Footer.css";
import Logo from "../../Assets/logo white.svg";

export default function Footer() {
  const footerRef = useRef(null);
  const glowRef = useRef(null);

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
      rafId = requestAnimationFrame(() => {
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

    // Ripple effect on nav links
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

  return (
    <footer className="footer" ref={footerRef}>

      {/* Magnetic glow */}
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

          <img src={Logo} alt="" />

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

          {/* ✅ FAQ LINK TO PAGE */}
          <Link to="/faq" className="nav-link">
            FAQ
          </Link>

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
  );
}