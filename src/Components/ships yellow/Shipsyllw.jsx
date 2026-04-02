import React from "react";
import { useNavigate } from "react-router-dom";
import "./Shipsyllw.css";

const SidebarComp = ({ text,path }) => {
  const navigate = useNavigate();
  return (
    <button className="shipy" onClick={() => navigate(path)}>

      <p className="shiptxt">{text}</p>
   
    </button>
  );
};

export default SidebarComp;