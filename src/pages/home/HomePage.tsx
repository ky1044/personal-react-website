import ProjectsSection from "src/components/projects/ProjectsSection";
import Splash from "./Splash";
import ContextSection from "./ContextSection";
import ExperienceSection from "src/pages/resume/ExperiencePage";
import { AboutPageTop, AboutPageBottom } from "src/pages/about/AboutPage";

const FullWidthDivider = () => (
  <div className="w-screen border-t border-layout-divider relative left-1/2 -translate-x-1/2" />
);

const HomePage = () => {
  return (
    <div className="mt-12">
      <section id="welcome">
        <Splash />
      </section>
      <section id="tech-stack">
        <ContextSection />
      </section>
      <section id="projects">
        <ProjectsSection />
      </section>
      <section id="about">
        <AboutPageTop />
      </section>
      <section id="experience">
        <ExperienceSection />
      </section>
      <FullWidthDivider />
      <section>
        <AboutPageBottom />
      </section>
    </div>
  );
};

export default HomePage;
