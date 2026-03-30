import React from 'react';
import './logoutbutton.css';

const logoutbutton = ({ text ,  icon }) => {
  


  return (
    <button className="logoutbutton" >
     
     <img className="icon" src={icon} />
     
      <p className="btn-text">{text}</p>
      
     
    </button>
  );
};

export default logoutbutton;