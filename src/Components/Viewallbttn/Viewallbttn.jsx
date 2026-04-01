import React from "react";
import { useNavigate } from "react-router-dom";
import "./Viewallbttn.css";

const SidebarComp = ({ text, path}) => {
  const navigate = useNavigate();
  return (
    <button className="viwallbtnttnn" onClick={() => navigate(path)}>

      <p className="btn-text">{text}</p>
   
    </button>
  );
};

export default SidebarComp;