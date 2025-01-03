import { useEffect, useState } from "react";
import { NavBar } from "src/components/skeleton/NavBar/NavBar";

import ProjectsSection from "src/components/projects/ProjectsSection";
import Splash from "./Splash";
import ContextSection from "./ContextSection";
import { Footer } from "src/components/skeleton/Footer";
import UpNextSection from "./UpNextSection";

const HomePage = () => {
  return (
    <div className="page-content">
      <NavBar />
      <Splash />
      <ContextSection />
      <ProjectsSection />
      <div className="spacer-md" />
      <UpNextSection />
      <div className="spacer-xs" />
      <Footer />
    </div>
  );
};

export default HomePage;
