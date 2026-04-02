import React from "react";
import { useNavigate } from "react-router-dom";
import "./Shipwhite.css";

const SidebarComp = ({ text,path }) => {
  const navigate = useNavigate();
  return (
    <button className="shipw" onClick={() => navigate(path)}>

      <p className="shiptxt">{text}</p>
   
    </button>
  );
};

export default SidebarComp;