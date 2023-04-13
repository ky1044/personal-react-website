import React from "react";
import { ProjectDetail } from "src/utils/types";
import ProjectCard from "./ProjectCard";
import { projects } from "./projects";

const ProjectsSection = () => {
  return (
    <div className="vertical-container">
      <h2 className="white">Recent Projects</h2>
      <div className="projects-section">
        {projects.map((project, index) => (
          <ProjectCard key={index} project={project} />
        ))}
      </div>
    </div>
  );
};

export default ProjectsSection;
