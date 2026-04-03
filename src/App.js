import React from "react";
import { Routes, Route } from "react-router-dom";
import Messages from "./Pages/Messages"
import Home from "./Pages/Home";
import Newenterpenuers from "./Pages/NewEnterpenuers";
import Suppliers from "./Pages/Suppliers";
import Faq from "./Pages/FAQ"
import Mentorship from "./Pages/Mentorship"
import LearningHub from "./Pages/LearningHub.jsx";
import Community from "./Pages/Community";
import ErrorPage from "./Pages/ErrorPage";
import EliteAppareal from "./Pages/EliteAppareal";
function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
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