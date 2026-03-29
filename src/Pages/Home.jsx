import React from "react";
import "./Home.css";
import"../Components/Sidebar";
import Sidebar from "../Components/Sidebar";
export default function App() {
  return (
    <div className="homepage_bg">
<Sidebar/>

      <main className="hero">
        <h2>Welcome to Rabta</h2>
        <p>Your platform for meaningful connections.</p>
        <button>Get Started</button>
      </main>

      <footer className="footer">
        <p>© 2026 Rabta. All rights reserved.</p>
      </footer>
    </div>
  );
}