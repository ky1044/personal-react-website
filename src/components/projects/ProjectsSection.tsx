import { animationVariants } from "src/consts/animation";
import ProjectCard from "./ProjectCard";
import { projects } from "./projects";
import { motion } from "framer-motion";

const ProjectsSection = () => {
  return (
    <>
      <div className="max-w-[1200px] mx-auto border-l border-r border-layout-divider">
        <div className="flex flex-row justify-between text-primary-blue px-4 pt-24">
          <h1 className="text-primary-blue">PROJECTS</h1>
          <h1 className="text-background-site leading-none sm:block hidden">
            プロジェクト
          </h1>
        </div>
        <div className="w-screen border-t border-layout-divider relative left-1/2 -translate-x-1/2" />
        <div className="border-layout-divider  relative">
          {Array.from({ length: Math.ceil(projects.length / 2) }).map(
            (_, rowIdx) => {
              const start = rowIdx * 2;
              const rowItems = projects.slice(start, start + 2);
              return (
                <div
                  key={rowIdx}
                  className={`relative p-4 ${
                    rowIdx > 0 ? "md:border-t border-layout-divider" : ""
                  }`}
                >
                  <div className="hidden md:block absolute top-0 bottom-0 left-1/2 border-l border-layout-divider pointer-events-none" />
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {rowItems.map((project, index) => (
                      <motion.div
                        key={start + index}
                        className="h-full"
                        variants={animationVariants.individualLarge}
                        initial="hidden"
                        whileInView="show"
                        viewport={{ once: true }}
                      >
                        <ProjectCard project={project} />
                      </motion.div>
                    ))}
                  </div>
                </div>
              );
            }
          )}
        </div>
      </div>

      <div className="w-screen border-t border-layout-divider relative left-1/2 -translate-x-1/2" />
    </>
  );
};

export default ProjectsSection;
