import ProjectCard from "./ProjectCard";
import { projects } from "./projects";
import styles from "./Projects.module.css";

const ProjectsSection = () => {
  return (
    <div className="top-level-container">
      <h1 className="blue">PROJECTS</h1>
      <div className={styles.projectsSection}>
        {projects.map((project, index) => (
          <ProjectCard key={index} project={project} />
        ))}
      </div>
    </div>
  );
};

export default ProjectsSection;
