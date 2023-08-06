import { Row } from "antd";
import { ProjectDetail } from "src/utils/types";
import { Button } from "../shared/shared";
import styles from "./Projects.module.css"

const ProjectCard = ({ project }: { project: ProjectDetail }) => {
  return (
    <div className={styles.projectCard}>
      <div className="vertical-container">
        <h2>{project.title}</h2>
        <p>{project.description}</p>
      </div>
      <div>
        <img
          className={styles.projectImage}
          src={project.image}
          alt={project.title}
          style={{ width: project?.imageWidth ?? undefined }}
        />
      </div>
      <div className="vertical-container">
        <h4 className="grey" >
          Tech: {project.tech}
        </h4>
        <p className="grey" style={{ fontSize: 16 }}>Since {project.date}</p>

        <Row justify="end">
          <Button text="Visit Project" link={project.url} type="Primary" />
        </Row>
      </div>
    </div>
  );
};

export default ProjectCard;
