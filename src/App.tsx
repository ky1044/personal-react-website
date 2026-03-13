import { BrowserRouter as Router } from "react-router-dom";
import HomePage from "src/pages/home/HomePage";
import "./style/App.css";
import "./style/typography.css";
import "./style/colors.css";
import { DarkModeProvider } from "./providers/DarkModeProvider";
import { SiteDataProvider } from "./providers/SiteDataProvider";
import SiteLayout from "./components/shared/SiteLayout";

function App() {
  return (
    <DarkModeProvider>
      <SiteDataProvider>
        <Router>
          <SiteLayout>
            <HomePage />
          </SiteLayout>
        </Router>
      </SiteDataProvider>
    </DarkModeProvider>
  );
}

export default App;
