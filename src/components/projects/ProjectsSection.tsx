import { animationVariants } from "src/consts/animation";
import ProjectCard from "./ProjectCard";
import { projects } from "./projects";
import { motion } from "framer-motion";

const ProjectsSection = () => {
  return (
    <div className="max-w-[1200px] mx-auto mt-12 px-4">
      <h1 className="text-primary-blue">PROJECTS</h1>
      <div className="flex flex-col items-stretch justify-center gap-8 my-4">
        {projects.map((project, index) => (
          <motion.div
            key={index}
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
};

export default ProjectsSection;
