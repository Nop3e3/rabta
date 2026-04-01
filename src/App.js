import React from "react";
import { Routes, Route } from "react-router-dom";

import Home from "./Pages/Home"; // example
import Suppliers from "./Pages/Suppliers";
import ErrorPage from "./Pages/ErrorPage";

function App() {
  return (
    <Routes>
      <Route path="/Home" element={<Home />} />
      
      {/* Suppliers page */}
      <Route path="/suppliers" element={<Suppliers />} />

      {/* Catch-all error page */}
      <Route path="*" element={<ErrorPage />} />
    </Routes>
  );
}

export default App;