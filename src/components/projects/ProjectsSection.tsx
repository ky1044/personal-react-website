import ProjectCard from "./ProjectCard";
import { projects } from "./projects";
import styles from "./Projects.module.css"

const ProjectsSection = () => {
  return (
    <div className="vertical-container">
      <h2 className="white">Recent Projects</h2>
      <div className={styles.projectsSection}>
        {projects.map((project, index) => (
          <ProjectCard key={index} project={project} />
        ))}
      </div>
    </div>
  );
};

export default ProjectsSection;
