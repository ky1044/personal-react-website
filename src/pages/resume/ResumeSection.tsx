import { Col, Row } from "antd";
import useWindow from "src/hooks/useWindow";
import styles from "./ResumeSection.module.css";
import { RESUME } from "./resumeData";
import TechTag from "src/components/shared/TechTag";
import { motion } from "framer-motion";
import { animationVariants } from "src/consts/animation";

export default function ResumeSection() {
  const { isMobile } = useWindow();
  return (
    <motion.div
      className={styles.resumeGrid}
      variants={animationVariants.containerQuick}
      initial="hidden"
      animate="show"
      style={{ listStyleType: "none" }}
    >
      {RESUME.map((role, index) => (
        <>
          <motion.div
            className={`${styles.timeline} ${
              index === RESUME.length - 1 ? styles.end : ""
            }`}
            key={index}
            variants={animationVariants.panDown}
          >
            <div className={styles.timelineDot} />
          </motion.div>

          <motion.span
            key={index}
            variants={animationVariants.individualLarge}
            style={{
              display: "grid",
              gridColumn: "2/-1",
              gridTemplateColumns: "subgrid",
            }}
          >
            {!isMobile && (
              <div className={styles.dateAndLocation}>
                <h4>{role.duration}</h4>
                <h4 className={styles.location}>{role.location}</h4>
              </div>
            )}
            <div key={index} className={styles.roleAndDescription}>
              <Row justify="space-between">
                <h2>
                  {role.title}{" "}
                  <span className={styles.noBreak}> @ {role.organization}</span>
                </h2>
              </Row>
              {isMobile && (
                <Col>
                  <h4>{role.duration}</h4>
                  <h4 className={styles.location}>{role.location}</h4>
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
          </motion.span>
        </>
      ))}
    </motion.div>
  );
}
