import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import HomePage from "src/pages/home/HomePage";
import ExperiencePage from "src/pages/resume/ExperiencePage";
import AboutPage from "src/pages/about/AboutPage";
import "./style/App.css";
import "./style/typography.css";
import "./style/colors.css";
import { DarkModeProvider } from "./providers/DarkModeProvider";
import ScrollToTop from "./components/shared/ScrollToTop";
import { SiteDataProvider } from "./providers/SiteDataProvider";
import SiteLayout from "./components/shared/SiteLayout";

function App() {
  return (
    <DarkModeProvider>
      <SiteDataProvider>
        <Router>
          <SiteLayout>
            <ScrollToTop />
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/experience" element={<ExperiencePage />} />
              <Route path="/about" element={<AboutPage />} />
            </Routes>
          </SiteLayout>
        </Router>
      </SiteDataProvider>
    </DarkModeProvider>
  );
}

export default App;
