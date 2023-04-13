import { useEffect, useState } from "react";
import { NavBar } from "src/components/nav/NavBar";

import ProjectsSection from "src/components/projects/ProjectsSection";
import SketchesSection from "src/components/p5/SketchesSection";

const SplashSection = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    function handleScroll() {
      if (window.pageYOffset > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    }

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div>
      <div
        style={{
          height: "100vh",
          width: "100vw",
          position: "fixed",
          backgroundColor: "white",
          zIndex: -1,
        }}
      />
      <div>
        <img
          className={`splash-background ${isScrolled ? "large " : ""}`}
          src="splash/splashBackground.svg"
          alt="splash image background"
        />
      </div>
      <div style={{ height: "100vh" }}>
        <img className="splash" src="splash/splash.svg" alt="splash image" />
      </div>
    </div>
  );
};

const HomePage = () => {
  return (
    <div>
      <SplashSection />

      <div className="body">
        <NavBar />
        <div className="top-level-container">
          <ProjectsSection />
        </div>
        <div className="top-level-container">
          <SketchesSection />
        </div>
      </div>
    </div>
  );
};

export default HomePage;
