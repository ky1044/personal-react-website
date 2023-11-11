import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import HomePage from "src/pages/home/home";
import ResumePage from "src/pages/resume/ResumePage";
import AboutPage from "src/pages/about/about";
import "./style/App.css";
import "./style/typography.css";
import "./style/colors.css";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/resume" element={<ResumePage />} />
        <Route path="/about" element={<AboutPage />} />
      </Routes>
    </Router>
  );
}

export default App;
