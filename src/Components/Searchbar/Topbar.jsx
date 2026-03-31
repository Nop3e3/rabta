import React from 'react';
import './Topbar.css';
import Pfptopbar from './profile_mail_notifications.jsx';
import Searchbar from './Searchbar.jsx';
const  profiletopbar = () => {
  


  return (
<div className="Toppbarr" >

<Searchbar/>
<Pfptopbar/>
</div>
  );
};

export default profiletopbar;