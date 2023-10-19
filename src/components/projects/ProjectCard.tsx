import { Row } from "antd";
import { ProjectDetail } from "src/utils/types";
import { Button, TextLink } from "../shared/shared";
import styles from "./Projects.module.css";

const ProjectCard = ({ project }: { project: ProjectDetail }) => {
  return (
    <div className={styles.projectCard}>
      <div className={styles.projectSummary}>
        <div>
          <h2>{project.title}</h2>
          <p className="grey" style={{ fontSize: 16 }}>
            Since {project.date}
          </p>
        </div>
        <p>{project.description}</p>
        <div>
          <Row justify={"space-between"} align={"middle"}>
            <h4 className="grey">Tech: {project.tech}</h4>
            <div className={styles.projectLinks}>
              <TextLink
                text="Visit Project"
                link={project.url}
                linkType="external"
              />
            </div>
          </Row>
        </div>
      </div>
      <div className={styles.imageContainer}>
        <img
          className={styles.projectImage}
          src={project.image}
          alt={project.title}
          style={{ width: project?.imageWidth ?? undefined }}
        />
      </div>
    </div>
  );
};

export default ProjectCard;
