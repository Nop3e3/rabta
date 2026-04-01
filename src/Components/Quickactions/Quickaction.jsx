import React from "react";
import "./Quickaction.css";
import Arrowbttn from "../Arrowbttn/Arrowbttn";

const Quickaction = ({ title, caption, image, button }) => {
  return (
    <div className="quickaction">
     <div className="theettls"> {title && <div className="qattl">{title}</div>}
      {caption && <div className="qacap">{caption}</div>} </div>
      {image && <img className="qaimage" src={image} alt="quick action" />}
      <Arrowbttn text={button} />
    </div>
  );
};

export default Quickaction;