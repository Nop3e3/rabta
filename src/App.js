import React from "react";
import { Routes, Route } from "react-router-dom";
import Messages from "./Pages/Messages"
import Home from "./Pages/Home";
import Newenterpenuers from "./Pages/NewEnterpenuers";
import Suppliers from "./Pages/Suppliers";
import Faq from "./Pages/FAQ"

import RequestQuote3 from "./Pages/RequestQuote3.jsx"
import RequestQuote2 from "./Pages/RequestQuote2.jsx"
import RequestQuote1 from "./Pages/RequestQuote1.jsx"
import Mentorship from "./Pages/Mentorship"
import LearningHub from "./Pages/LearningHub.jsx";
import Community from "./Pages/Community";
import ErrorPage from "./Pages/ErrorPage";
import AcceptQuote from "./Pages/AcceptQuote.jsx";
import EliteAppareal from "./Pages/EliteAppareal";
function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/RequestQuote1" element={<RequestQuote1 />} />
      
      <Route path="/AcceptQuote" element={<AcceptQuote />} />
        <Route path="/RequestQuote2" element={<RequestQuote2/>} />
      <Route path="/RequestQuote3" element={<RequestQuote3/>} />
       <Route path="/Mentorship" element={<Mentorship />} />
      <Route path="/Learninghub" element={<LearningHub/>} />
      <Route path="/Faq" element={<Faq />} />
      <Route path="/NewEnterpenuers" element={<Newenterpenuers />} />
      <Route path="/Community" element={<Community />} />
      <Route path="/elite-appareal" element={<EliteAppareal />} />
      <Route path="/Messages" element={<Messages />} />
      <Route path="/suppliers" element={<Suppliers />} />
      <Route path="*" element={<ErrorPage />} />
    </Routes>
  );
}

export default App;