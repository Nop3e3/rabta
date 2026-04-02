import React from "react";
import { useNavigate } from "react-router-dom";
import "./About.css";

// Added 'path' to the props destructuring below
const SidebarComp = ({ text, caption, path }) => {
  const navigate = useNavigate();
  
  return (
    <div className="aboutcon" onClick={() => navigate(path || "#")}>
      <p className="titlee">{text}</p>
      <div className="caption">{caption}</div>
    </div>
  );
};

export default SidebarComp;