import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./Pages/Home";
<link href="https://fonts.googleapis.com/css2?family=Lexend+Exa:wght@100;300;400;500;600;700&display=swap" rel="stylesheet"></link>
export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
    </Router>
  );
}