import React from "react";
import { useNavigate } from "react-router-dom";
import "./Ctabttn.css";

const SidebarComp = ({ text, icon, path,image }) => {
  const navigate = useNavigate();
  return (
    <button className="Ctabttnn" onClick={() => navigate(path)}>

      <p className="btn-text">{text}</p>
   
    </button>
  );
};

export default SidebarComp;