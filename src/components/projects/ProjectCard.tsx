import { ProjectDetail } from "src/utils/types";
import TechTag from "../shared/TechTag";
import { TextLink } from "../shared/TextLink";
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
          <div className={styles.bottomContainer}>
            <div className={styles.techList}>
              {project.tech.map((tech) => (
                <TechTag name={tech} key={tech} />
              ))}
            </div>
            <div className={styles.projectLinks}>
              <TextLink
                text="Visit Project"
                link={project.url}
                linkType="external"
              />
            </div>
          </div>
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
