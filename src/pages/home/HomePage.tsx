import ProjectsSection from "src/components/projects/ProjectsSection";
import Splash from "./Splash";
import ContextSection from "./ContextSection";
import UpNextSection from "./UpNextSection";

const HomePage = () => {
  return (
    <div className="mt-12">
      <Splash />
      <ContextSection />
      <ProjectsSection />
      <UpNextSection />
    </div>
  );
};

export default HomePage;
