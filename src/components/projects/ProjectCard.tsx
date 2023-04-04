import React from "react";
import { ProjectDetail } from "src/utils/types";

const ProjectCard = ({ project }: { project: ProjectDetail }) => {
  return (
    <div className="project-card">
      <h2>{project.title}</h2>
      <p>{project.date}</p>
      <div className="project-card-middle">
        <img
          className="project-image"
          src={project.image}
          alt={project.title}
          style={{ width: project?.imageWidth ?? undefined }}
        />
      </div>
      <div className="project-card-bottom">
        <p className="project-description">{project.description}</p>
        <a
          className="project-button"
          href={project.url}
          target="_blank"
          rel="noreferrer"
        >
          Visit Project
        </a>
      </div>
    </div>
  );
};

export default ProjectCard;
