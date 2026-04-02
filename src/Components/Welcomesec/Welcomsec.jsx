import React from 'react';
import './Welcomesec.css';

const Welcomesec = ({ text,name,caption }) => {
  


  return (
<div className="Welcomesec" >
  <div className="thewelc">{text}{name}</div>
  <div className="thecap">{caption}</div>
</div>
  );
};

export default Welcomesec;