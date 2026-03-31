import React from 'react';
import './Welcomesec.css';

const Welcomesec = ({ text,name }) => {
  


  return (
<div className="Welcomesec" >
  <div className="thewelc">{text}{name}</div>
  <div className="thecap">Ready to scale your brand today? Here are your latest supplier updates</div>
</div>
  );
};

export default Welcomesec;