import React from "react";
import { Routes, Route } from "react-router-dom";
import Messages from "./Pages/Messages"
import Home from "./Pages/Home";
import Suppliers from "./Pages/Suppliers";
import ErrorPage from "./Pages/ErrorPage";
import EliteAppareal from "./Pages/EliteAppareal";
function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/elite-appareal" element={<EliteAppareal />} />
      <Route path="/Messages" element={<Messages />} />
      <Route path="/suppliers" element={<Suppliers />} />
      <Route path="*" element={<ErrorPage />} />
    </Routes>
  );
}

export default App;