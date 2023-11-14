import { Col, Row } from "antd";
import useWindow from "src/hooks/useWindow";
import styles from "./ResumeSection.module.css";
import { RESUME } from "./resumeData";
import TechTag from "src/components/shared/TechTag";

export default function ResumeSection() {
  const { isMobile } = useWindow();
  return (
    <div className={styles.resumeGrid}>
      {RESUME.map((role, index) => (
        <>
          <div
            className={`${styles.timeline} ${
              index === RESUME.length - 1 ? styles.end : ""
            }`}
            key={index}
          >
            <div className={styles.timelineDot} />
          </div>
          {!isMobile && (
            <div className={styles.dateAndLocation}>
              <h4>{role.duration}</h4>
              <h4 className="grey">{role.location}</h4>
            </div>
          )}
          <div key={index} className={styles.roleAndDescription}>
            <Row justify="space-between">
              <h2>
                {role.title} @ {role.organization}
              </h2>
            </Row>
            {isMobile && (
              <Col>
                <h4>{role.duration}</h4>
                <h4 className="grey">{role.location}</h4>
              </Col>
            )}

            <ul>
              {role.bullets.map((bullet, idx) => (
                <li key={idx}>{bullet}</li>
              ))}
            </ul>
            {role.tech && (
              <div className={styles.techList}>
                {role.tech?.map((tech) => (
                  <TechTag name={tech} key={tech} />
                ))}
              </div>
            )}
          </div>
        </>
      ))}
    </div>
  );
}
