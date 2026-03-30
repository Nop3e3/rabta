import React from 'react';
import './SidebarComp.css';

const SidebarComp = ({ text ,  icon }) => {
  


  return (
    <button className="SidebarComp" >
     
     <img className="icon" src={icon} />
     
      <p className="btn-text">{text}</p>
      
     
    </button>
  );
};

export default SidebarComp;