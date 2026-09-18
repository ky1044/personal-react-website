import { lazy, Suspense } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import HomePage from "src/pages/home/HomePage";
import "./style/tokens.css";
import "./style/App.css";
import "./style/typography.css";
import { DarkModeProvider } from "./providers/DarkModeProvider";
import { SiteDataProvider } from "./providers/SiteDataProvider";
import SiteLayout from "./components/shared/SiteLayout";

// Split out: the styleguide is a reference page, not part of the visit.
const StyleguidePage = lazy(() => import("src/pages/styleguide/StyleguidePage"));

function App() {
  return (
    <DarkModeProvider>
      <SiteDataProvider>
        <Router>
          <SiteLayout>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route
                path="/styleguide"
                element={
                  <Suspense fallback={null}>
                    <StyleguidePage />
                  </Suspense>
                }
              />
            </Routes>
          </SiteLayout>
        </Router>
      </SiteDataProvider>
    </DarkModeProvider>
  );
}

export default App;
