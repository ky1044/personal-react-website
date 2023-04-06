import React from "react";
import { ProjectDetail } from "src/utils/types";
import ProjectCard from "./ProjectCard";
import { projects } from "./projects";

const ProjectsSection = () => {
  return (
    <>
      <h2>My Projects</h2>
      <div className="projects-section">
        <div className="projects-container">
          {projects.map((project, index) => (
            <ProjectCard key={index} project={project} />
          ))}
        </div>
      </div>
    </>
  );
};

export default ProjectsSection;