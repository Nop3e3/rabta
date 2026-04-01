import React from "react";
import { useNavigate } from "react-router-dom";
import "./SecondaryCtabttn.css";

const SidebarComp = ({ text, path }) => {
  const navigate = useNavigate();
  return (
    <button className="Ctabttnn2" onClick={() => navigate(path)}>

      <p className="btn-text2">{text}</p>
   
    </button>
  );
};

export default SidebarComp;