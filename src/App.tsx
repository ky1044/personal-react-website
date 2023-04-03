import React from "react";
import "./App.css";
import { P5Sketch } from "src/components/p5/starField/sketch";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ResumePage from "src/pages/resume/resume";
import HomePage from "src/pages/home/home";
import { Row } from "antd";
import { NavBar } from "./components/nav/NavBar";
import AboutPage from "./pages/about/about";

function App() {
  return (
    <Router>
      <div className="App">
        <NavBar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/resume" element={<ResumePage />} />
          <Route path="/about" element={<AboutPage />} />

        </Routes>
      </div>
    </Router>
  );
}

export default App;
