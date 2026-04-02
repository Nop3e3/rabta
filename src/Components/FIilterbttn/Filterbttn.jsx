import React from "react";
import { useNavigate } from "react-router-dom";
import "./Filterbttn.css";

const SidebarComp = ({ text,path,image }) => {
  const navigate = useNavigate();
  return (
    <button className="shipf" onClick={() => navigate(path)}>
<img src={image} alt="" />
      <p className="shiptxt">{text}</p>
   
    </button>
  );
};

export default SidebarComp;