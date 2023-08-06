import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import HomePage from "src/pages/home/home";
import ResumePage from "src/pages/resume/resume";
import AboutPage from "src/pages/about/About";
import "./style/App.css";
import "./style/typography.css";
import "./style/colors.css";


function App() {
  return (
    <Router>
      <div>
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
