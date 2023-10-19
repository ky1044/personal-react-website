import { useEffect, useState } from "react";
import { NavBar } from "src/components/nav/NavBar";

import ProjectsSection from "src/components/projects/ProjectsSection";
import SketchesSection from "src/components/p5/SketchesSection";
import Splash from "./Splash";
import ContextSection from "./ContextSection";

const HomePage = () => {
  return (
    <div className="body">
      <NavBar />
      <Splash />

      <ContextSection />
      <ProjectsSection />
    </div>
  );
};

export default HomePage;
