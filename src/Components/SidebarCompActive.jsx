import React from 'react';
import './SidebarCompActive.css';

const SidebarCompActive = ({ text ,  icon }) => {
  


  return (
    <button className="SidebarCompActive" >
     
     <img className="icon" src={icon} />
     
      <p className="btn-text">{text}</p>
      
     
    </button>
  );
};

export default SidebarCompActive;