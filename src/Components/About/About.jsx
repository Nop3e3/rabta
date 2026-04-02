import React from "react";
import { useNavigate } from "react-router-dom";
import "./About.css";

const SidebarComp = ({ text,caption }) => {
  const navigate = useNavigate();
  return (
    <div className="aboutcon" onClick={() => navigate(path)}>

      <p className="titlee">{text}</p>
   < div className="caption">{caption}</div>
    </div>
  );
};

export default SidebarComp;