import { motion } from "framer-motion";
import TechTag from "src/components/shared/TechTag";
import { animationVariants } from "src/consts/animation";
import useWindow from "src/hooks/useWindow";
import { RESUME } from "./resumeData";
import React from "react";

export default function ResumeSection() {
  const { isMobile } = useWindow();
  return (
    <motion.div
      className="grid w-full grid-cols-[40px_1fr] sm:grid-cols-[40px_1fr_6fr]"
      variants={animationVariants.containerQuick}
      initial="hidden"
      animate="show"
      style={{ listStyleType: "none" }}
    >
      {RESUME.map((role, index) => (
        <React.Fragment key={role.title}>
          <motion.div
            className={`w-[6px] ml-[12x] relative ${
              index === RESUME.length - 1
                ? "bg-[linear-gradient(180deg,rgb(30,144,255)_65%,rgba(30,144,255,0)_90%)]"
                : "bg-primary-blue"
            }`}
            variants={animationVariants.panDown}
          >
            <div className="w-6 h-6 rounded-full border-[5px] border-solid border-primary-blue bg-background-primary absolute left-[-9px] top-[-1px]" />
          </motion.div>

          <motion.span
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
            <div className="mb-8">
              <div className="flex  justify-between">
                <h2>
                  {role.title}{" "}
                  <span className="whitespace-nowrap">
                    {" "}
                    @ {role.organization}
                  </span>
                </h2>
              </div>
              {isMobile && (
                <div>
                  <h4>{role.duration}</h4>
                  <h4 className="text-content-secondary">{role.location}</h4>
                </div>
              )}

              <ul>
                {role.bullets.map((bullet, idx) => (
                  <li key={idx} className="list-disc ml-6">
                    {bullet}
                  </li>
                ))}
              </ul>
              {role.tech && (
                <div className="flex flex-row flex-wrap gap-1 ml-6 mt-2">
                  {role.tech?.map((tech, idx) => (
                    <TechTag name={tech} key={tech + idx} />
                  ))}
                </div>
              )}
            </div>
          </motion.span>
        </React.Fragment>
      ))}
    </motion.div>
  );
}
