import { Row } from "antd";
import React from "react";
import { ProjectDetail } from "src/utils/types";

const ProjectCard = ({ project }: { project: ProjectDetail }) => {
  return (
    <div className="project-card">
      <h2>{project.title}</h2>
      <p className="grey">{project.date}</p>
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
        <Row justify="end" >
          <div className="project-button">
            <a
              className="project-button-text"
              href={project.url}
              target="_blank"
              rel="noreferrer"
            >
              Visit Project
            </a>
          </div>
        </Row>
      </div>
    </div>
  );
};

export default ProjectCard;
