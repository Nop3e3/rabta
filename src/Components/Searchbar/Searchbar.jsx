import React from 'react';
import './Searchbar.css';
import search from "../../Assets/search icon.svg";
import mic from "../../Assets/Mic_icon.svg";
const  Searchbar = () => {
  


  return (
<div className="Searchbar" >
  
    <img src={search} alt="" /> 
    <div className="searchttl">Search</div>
    <img src={mic} alt="" />
</div>
  );
};

export default Searchbar;