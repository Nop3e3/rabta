import React from "react";
import { useNavigate } from "react-router-dom";
import "./SidebarCompActive.css";

const SidebarCompActive = ({ text, icon, path }) => {
  const navigate = useNavigate();
  return (
    <button className="SidebarCompActive" onClick={() => navigate(path)}>
      <img className="icon" src={icon} alt={text} />
      <p className="btn-texttt">{text}</p>
    </button>
  );
};

export default SidebarCompActive;