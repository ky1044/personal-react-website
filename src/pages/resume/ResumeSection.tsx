import { Col, Row } from "antd";
import useWindow from "src/hooks/useWindow";
import { RESUME } from "./resumeData";
import TechTag from "src/components/shared/TechTag";
import { motion } from "framer-motion";
import { animationVariants } from "src/consts/animation";

export default function ResumeSection() {
  const { isMobile } = useWindow();
  return (
    <motion.div
      className="grid w-full grid-cols-[40px_1fr_6fr] max-[680px]:grid-cols-[40px_1fr]"
      variants={animationVariants.containerQuick}
      initial="hidden"
      animate="show"
      style={{ listStyleType: "none" }}
    >
      {RESUME.map((role, index) => (
        <>
          <motion.div
            className={`w-[6px] ml-[12x] relative ${
              index === RESUME.length - 1
                ? "bg-[linear-gradient(180deg,rgb(30,144,255)_65%,rgba(30,144,255,0)_90%)]"
                : "bg-primary-blue"
            }`}
            key={index}
            variants={animationVariants.panDown}
          >
            <div className="w-6 h-6 rounded-full border-[5px] border-solid border-primary-blue bg-background-primary absolute left-[-9px] top-[-1px]" />
          </motion.div>

          <motion.span
            key={index}
            variants={animationVariants.introduceDown}
            style={{
              display: "grid",
              gridColumn: "2/-1",
              gridTemplateColumns: "subgrid",
            }}
          >
            {!isMobile && (
              <div className="mr-4 mb-8">
                <h4>{role.duration}</h4>
                <h4 className="text-content-secondary">{role.location}</h4>
              </div>
            )}
            <div key={index} className="mb-4">
              <Row justify="space-between">
                <h2>
                  {role.title}{" "}
                  <span className="whitespace-nowrap">
                    {" "}
                    @ {role.organization}
                  </span>
                </h2>
              </Row>
              {isMobile && (
                <Col>
                  <h4>{role.duration}</h4>
                  <h4 className="text-content-secondary">{role.location}</h4>
                </Col>
              )}

              <ul>
                {role.bullets.map((bullet, idx) => (
                  <li key={idx} className="list-disc ml-6">
                    {bullet}
                  </li>
                ))}
              </ul>
              {role.tech && (
                <div className="flex flex-row flex-wrap gap-1 ml-6 mb-4">
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
