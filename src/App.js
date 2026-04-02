import React from "react";
import { Routes, Route } from "react-router-dom";

import Home from "./Pages/Home";
import Suppliers from "./Pages/Suppliers";
import ErrorPage from "./Pages/ErrorPage";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/suppliers" element={<Suppliers />} />
      <Route path="*" element={<ErrorPage />} />
    </Routes>
  );
}

export default App;