import React from 'react';
import './Welcomesec.css';

const Welcomesec = ({ text,name,caption,title }) => {
  


  return (
<div className="Welcomesec" >
  <div className="thewelc">{text}{name}</div>
 <div className="rww"> <div className="thecap">{caption}</div> <div className="ct">{title}</div></div>
</div>
  );
};

export default Welcomesec;