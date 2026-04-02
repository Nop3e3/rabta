import React from "react";
import { useNavigate } from "react-router-dom";
import "./Ctabttn.css";

const SidebarComp = ({ text, icon, path}) => {
  const navigate = useNavigate();
  return (
    <button className="Ctabttnn" onClick={() => navigate(path)}>
<img src={icon} alt="" />
      <p className="btn-text">{text}</p>
   
    </button>
  );
};

export default SidebarComp;