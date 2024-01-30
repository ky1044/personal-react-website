import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import HomePage from "src/pages/home/home";
import ExperiencePage from "src/pages/resume/ExperiencePage";
import AboutPage from "src/pages/about/about";
import "./style/App.css";
import "./style/typography.css";
import "./style/colors.css";
import { DarkModeProvider } from "./providers/DarkModeProvider";
import ScrollToTop from "./components/shared/ScrollToTop";

function App() {

  return (
    <DarkModeProvider>
      <Router>
        <ScrollToTop/>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/experience" element={<ExperiencePage />} />
          <Route path="/about" element={<AboutPage />} />
        </Routes>
      </Router>
    </DarkModeProvider>
  );
}

export default App;
