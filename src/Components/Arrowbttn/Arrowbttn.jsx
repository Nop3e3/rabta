import React from 'react';
import './Arrowbttn.css';
import Arrow from "../../Assets/arrow_outward.svg"
const Arrowbttn = ({text,image}) => {

  return (
<button className="Arrowbttn" >
    {text}
<div className="circle"> <img src={Arrow} alt="" /></div>
</button>
  );
};

export default Arrowbttn;